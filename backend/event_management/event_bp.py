import uuid
from flask import Blueprint, jsonify, request, make_response
from config import db, get_db_session, engine
from datetime import datetime
from auth.jwt_bp import jwt_required
import os
from models import PublicUser, Events
from utils.r2 import generate_presigned_url, upload_file_to_r2


event_bp = Blueprint("event_bp", __name__)


# Define routes within the blueprint
@event_bp.route("/api/test_event", methods=["GET"])
@jwt_required
def feature_route():
    return (
        jsonify(
            {"message": "This is a feature-specific API endpoint.", "status": "success"}
        ),
        200,
    )


def generate_unique_filename(original_filename):
    _, file_extension = os.path.splitext(original_filename)
    return f"{uuid.uuid4()}{file_extension}"


@event_bp.route("/create", methods=["POST"])
@jwt_required
def create_event():
    user_id = 123
    title = request.form.get("title")
    description = request.form.get("description")
    datetime_str = request.form.get("datetime")
    location = request.form.get("location")
    tags = request.form.getlist("tags")
    poster = request.files.get("poster")

    event_datetime = datetime.strptime(datetime_str, "%Y-%m-%dT%H:%M:%S")

    # Handle poster upload
    poster_filename = None
    if poster:
        unique_filename = generate_unique_filename(poster.filename)
        temp_path = f"/tmp/{unique_filename}"
        poster.save(temp_path)

        upload_result = upload_file_to_r2(temp_path, unique_filename)
        if upload_result:
            poster_filename = unique_filename
        else:
            return jsonify({"error": "Failed to upload poster"}), 500

        os.remove(temp_path)  # Clean up the temporary file

    session = get_db_session()
    try:
        # Create a new event
        new_event = Events(
            title=title,
            description=description,
            datetime=event_datetime,
            location=location,
            tags=tags,
            poster_filename=poster_filename,
        )

        session.add(new_event)
        session.commit()

        return make_response(jsonify({"event_id": new_event.id}), 201)
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()


@jwt_required
@event_bp.route("/admin/approve", methods=["GET"])
def get_pending_events():
    session = get_db_session()
    try:
        pending_events = session.query(Events).filter_by(status="pending").all()

        events_list = [
            {
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "datetime": event.datetime,
                "location": event.location,
                "tags": event.tags,
                "poster_url": generate_presigned_url(event.poster_filename),
                "approval_status": event.approval_status,
            }
            for event in pending_events
        ]

        return jsonify(events_list), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
