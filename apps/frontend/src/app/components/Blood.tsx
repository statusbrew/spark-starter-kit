import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


interface VitalData {
hemoglobin?: string;
packedCellVolume?: string;
rbcCount?: string;
mcv?: string;
lymphocytesDiff?: string;
lymphocytes?: string;
date?: string;
[key: string]: any; 
}

export const ImageUploaderblood: React.FC = () => {
    const [images, setImages] = useState<File[]>([]); 
    const [extractedData, setExtractedData] = useState<VitalData[] | null>(null);
    const [summary, setSummary] = useState<string | null>(null); 

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setImages(acceptedFiles); // Allow multiple files
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });
    const clickhandler=async()=>{

    }
    const handleUpload = async () => {
        const formData = new FormData();
        images.forEach((image) => {
        formData.append('image', image);
        });

        try {
        const response = await fetch('http://localhost:3000/api/v1/user/uploadblood', {
            method: 'POST',
            body: formData,
        });

        const data: VitalData[] = await response.json();
        setExtractedData(data);
        } catch (error) {
        console.error('Error uploading and processing images:', error);
        }
    };

    // Handler for updating vital inputs
    const handleInputChange = (index: number, key: string, value: string) => {
        if (extractedData) {
        const updatedData = [...extractedData];
        updatedData[index][key] = value;
        setExtractedData(updatedData);
        }
    };
    const handleSummarization = async () => {
        try {
        const response = await fetch('http://localhost:3000/api/v1/user/bloodsummarize', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(extractedData), 
        });

        const summary = await response.json();
        setSummary(summary);
        console.log('Summarization Result:', summary); // Handle the summarization result here
        } catch (error) {
        console.error('Error during summarization:', error);
        }
    };

    return (
        <div>
        <div {...getRootProps()} style={{ border: '2px dashed #aaa', padding: '20px', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop one or more images here, or click to select</p>
        </div>

        {images.length > 0 && (
            <div>
            <h3>Selected Images:</h3>
            <ul>
                {images.map((image, index) => (
                <li key={index}>{image.name}</li>
                ))}
            </ul>
            <button onClick={handleUpload}>Upload and Process</button>
            </div>
        )}

        {extractedData && (
            <div>
            <h3>Confirm or Edit Extracted Data:</h3>
            {extractedData.map((data, index) => (
                <div key={index}>
                <h4>Image {index + 1}:</h4>
                <form>
                    {Object.entries(data).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '10px' }}>
                        <label>
                        <strong>{key}:</strong>
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleInputChange(index, key, e.target.value)}
                            style={{ marginLeft: '10px', padding: '5px' }}
                        />
                        </label>
                    </div>
                    ))}
                </form>
                </div>
            ))}
            <button onClick={handleSummarization} style={{ marginTop: '20px' }}>
                Summarize All Vitals
            </button>
            </div>
        )}
        {summary && (
            <div style={{ marginTop: '20px' }}>
            <h3>Summary:</h3>
            <p>{summary}</p>
            </div>
        )}
        </div>
    );
};

export default ImageUploaderblood;
