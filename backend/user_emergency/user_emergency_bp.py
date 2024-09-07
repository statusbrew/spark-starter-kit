import uuid
from flask import Blueprint, jsonify, request, make_response, g
from auth.jwt_bp import jwt_required
from config import get_db_session
from utils.emergency import store_emergency, trigger_emergency_response

user_emergency_bp = Blueprint('user_emergency_bp', __name__)

@user_emergency_bp.route('/report', methods=['POST'])
@jwt_required
def report_emergency():
    try:
        # Validate and convert user_id to UUID
        user_id = uuid.UUID(g.user_id)  # Retrieve current user from the session
        print(user_id)
    except ValueError:
        # Return an error if user_id is not a valid UUID
        return jsonify({"error": "Invalid user_id format. Must be a valid UUID."}), 400

    data = request.json
    emergency_type = data.get('emergency_type')
    location = data.get('location')

    session = get_db_session()
    try:
        # Save emergency using the utility function
        store_emergency(session, location, emergency_type, user_id)

        # Trigger emergency response
        trigger_emergency_response(location, emergency_type)

        session.commit()

        return make_response(jsonify({"message": "Emergency reported and response triggered."}), 201)
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
