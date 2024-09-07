from config import app, db
from flask import request, session, jsonify

@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({
        "message": "This is a test API endpoint.",
        "status": "success"
    }), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)