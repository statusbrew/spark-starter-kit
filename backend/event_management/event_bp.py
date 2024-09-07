from flask import Blueprint, jsonify

from auth.jwt_bp import jwt_required

event_bp = Blueprint('event_bp', __name__)

# Define routes within the blueprint
@event_bp.route('/api/feature', methods=['GET'])
@jwt_required
def feature_route():
    return jsonify({
        "message": "This is a feature-specific API endpoint.",
        "status": "success"
    }), 200
