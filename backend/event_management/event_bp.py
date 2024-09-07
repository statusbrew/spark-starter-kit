from flask import Blueprint, jsonify

event_bp = Blueprint('event_bp', __name__)

# Define routes within the blueprint
@event_bp.route('/api/feature', methods=['GET'])
def feature_route():
    return jsonify({
        "message": "This is a feature-specific API endpoint.",
        "status": "success"
    }), 200
