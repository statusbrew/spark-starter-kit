import uuid
from flask import Blueprint, jsonify, request, make_response, g
from config import get_db_session
from auth.jwt_bp import jwt_required
from models import User

# Create a Blueprint for user routes
user_bp = Blueprint('user_bp', __name__)

# Route to update user tags
@user_bp.route('/tags', methods=['GET'])
@jwt_required  # Require JWT authentication
def update_user_tags():
    # Retrieve the current user's ID from the session (g)
    user_id = g.user_id

    # Get the tags from the form request
    tags_str = request.form.get("tags")
    tags = [tag.strip() for tag in tags_str.split(",")] if tags_str else []  # Process tags

    session = get_db_session()  # Get the database session
    try:
        # Fetch the user by user_id
        user = session.query(User).filter_by(user_id=uuid.UUID(user_id)).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Update the user's tags field with the new tags
        user.tags = tags

        # Commit the changes to the database
        session.commit()

        return jsonify({"message": "Tags updated successfully"}), 200
    except Exception as e:
        session.rollback()  # Rollback the session on error
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()  # Close the session
