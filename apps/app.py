from flask import Flask, render_template, request, jsonify
from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool
import vertexai
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize Vertex AI API
vertexai.init(project="bamboo-basis-434518-f9", location="us-central1")

# Create RagCorpus (assuming this is done once, and corpus name is reused)
embedding_model_config = rag.EmbeddingModelConfig(
    publisher_model="publishers/google/models/text-embedding-004"
)

try:
    rag_corpus = rag.create_corpus(
        display_name="RAG_First_App",
        embedding_model_config=embedding_model_config,
    )
    logging.info(f"RAG Corpus created: {rag_corpus}")
except Exception as e:
    logging.error(f"Failed to create RAG Corpus: {e}")

# Import Files to the RagCorpus (only if needed)
paths = ["gs://rag_app/DATA_1.pdf"]
try:
    response = rag.import_files(
        rag_corpus.name,
        paths,
        chunk_size=512,  # Optional
        chunk_overlap=100,  # Optional
        max_embedding_requests_per_min=900,  # Optional
    )
    logging.info(f"Import Files Response: {response}")
except Exception as e:
    logging.error(f"Failed to import files: {e}")

# Create the Flask app
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.form['prompt']
    try:
        # Define the RAG Retrieval Tool and Model
        rag_retrieval_tool = Tool.from_retrieval(
            retrieval=rag.Retrieval(
                source=rag.VertexRagStore(
                    rag_resources=[
                        rag.RagResource(
                            rag_corpus=rag_corpus.name,
                        )
                    ],
                    similarity_top_k=3,  # Optional
                    vector_distance_threshold=0.5,  # Optional
                ),
            )
        )
        rag_model = GenerativeModel(
            model_name="gemini-1.5-flash-001", tools=[rag_retrieval_tool]
        )

        # Generate content using the input prompt
        response = rag_model.generate_content(prompt)
        logging.info(f"Generated Response: {response.text}")

        return jsonify({'result': response.text})
    
    except Exception as e:
        logging.error(f"Failed to generate content: {e}")
        return jsonify({'result': 'Error generating response'})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)


