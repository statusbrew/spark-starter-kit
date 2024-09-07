from config import app, db
from flask import request, session, jsonify
from event_management.event_bp import event_bp

@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({
        "message": "This is a test API endpoint.",
        "status": "success"
    }), 200

app.register_blueprint(event_bp, url_prefix='/event')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)