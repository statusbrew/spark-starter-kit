import uuid
from flask import Blueprint, g, jsonify, request, make_response
from config import db, get_db_session, engine
from datetime import datetime
from auth.jwt_bp import jwt_required
import os
from models import User, Events
from utils.r2 import delete_file_from_r2, generate_presigned_url, upload_file_to_r2
from sqlalchemy import UUID, func

# Blueprint for the event routes
event_bp = Blueprint("event_bp", __name__)


# Test API endpoint to ensure the JWT authentication is working
@event_bp.route("/api/test_event", methods=["GET"])
@jwt_required
def feature_route():
    # Return a simple JSON response
    return (
        jsonify(
            {"message": "This is a feature-specific API endpoint.", "status": "success"}
        ),
        200,
    )


# Function to generate a unique filename for uploaded files using UUID
def generate_unique_filename(original_filename):
    _, file_extension = os.path.splitext(original_filename)  # Extract file extension
    return f"{uuid.uuid4()}{file_extension}"  # Append a UUID to the file extension


# Route to create a new event
@event_bp.route("/create", methods=["POST"])
@jwt_required
def create_event():
    # Get the current user ID from the JWT token
    user_id = g.user_id

    # Extract form data from the request
    title = request.form.get("title")
    description = request.form.get("description")
    datetime_str = request.form.get("datetime")
    location = request.form.get("location")
    tags_str = request.form.get("tags")
    tags = [tag.strip() for tag in tags_str.split(",")] if tags_str else []
    poster = request.files.get("poster")

    print(user_id)  # Debugging: print the user_id

    # datetime string to datetime object
    event_datetime = datetime.fromisoformat(datetime_str.replace("Z", "+00:00"))

    poster_filename = None
    if poster:
        # Generate a unique filename for the poster
        unique_filename = generate_unique_filename(poster.filename)
        temp_path = f"/tmp/{unique_filename}"
        poster.save(temp_path)  # Save file temporarily

        # Upload the file to R2 (cloud storage)
        upload_result = upload_file_to_r2(temp_path, unique_filename)
        if upload_result:
            poster_filename = unique_filename  # If upload successful, save the filename

        os.remove(temp_path)  # Remove the temporary file after uploaded

    session = get_db_session()
    try:
        # Create a new event instance
        new_event = Events(
            title=title,
            description=description,
            datetime=event_datetime,
            location=location,
            tags=tags,  # This will be stored as a list in the database
            poster_filename=poster_filename,
            user_id=uuid.UUID(user_id),
            approval_status="pending",
        )

        session.add(new_event)
        session.commit()

        # Return a success response with the new event ID
        return make_response(jsonify({"event_id": new_event.id}), 201)
    except Exception as e:
        session.rollback()  # Rollback the transaction if there is an error
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()


@event_bp.route("/", methods=["GET"])
@jwt_required
def get_user_events():
    session = get_db_session()
    try:
        user_id = g.user_id
        events = session.query(Events).filter_by(approval_status="approved").all()
        events_list = [
            {
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "datetime": event.datetime,
                "location": event.location,
                "tags": event.tags,
                "poster_url": (
                    generate_presigned_url(event.poster_filename)
                    if event.poster_filename
                    else None
                ),
                "user_id": event.user_id,
                "approval_status": event.approval_status,
            }
            for event in events
        ]
        return jsonify(events_list), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()


@event_bp.route("/event/<event_id>", methods=["GET"])
def get_event(event_id):
    session = get_db_session()
    try:
        event = session.query(Events).get(event_id)
        if not event:
            return jsonify({"error": "Event not found"}), 404

        event_data = {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "datetime": event.datetime,
            "location": event.location,
            "tags": event.tags,
            "poster_url": (
                generate_presigned_url(event.poster_filename)
                if event.poster_filename
                else None
            ),
            "user_id": event.user_id,
            "approval_status": event.approval_status,
        }

        return jsonify(event_data), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()


@event_bp.route("/event/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    session = get_db_session()
    try:
        event = session.query(Events).get(event_id)
        if not event:
            return jsonify({"error": "Event not found"}), 404

        if event.poster_filename:
            delete_file_from_r2(event.poster_filename)

        session.delete(event)
        session.commit()

        return jsonify({"message": "Event deleted successfully"}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()


# Route to get all events
@jwt_required
@event_bp.route("/admin", methods=["GET"])
def get_all_events():
    session = get_db_session()
    try:
        # Query all events from the database
        events = session.query(Events).all()

        # Create a list of event dictionaries for the response
        events_list = [
            {
                "id": str(event.id),  # Convert UUID to string
                "title": event.title,
                "description": event.description,
                "datetime": event.datetime.isoformat(),  # Convert datetime to ISO format string
                "location": event.location,
                "tags": event.tags,
                "poster_filename": event.poster_filename,
                "user_id": str(event.user_id),  # Convert UUID to string
                "approval_status": event.approval_status,
            }
            for event in events
        ]
        return jsonify(events_list), 200  # Return the list of events as JSON
    except Exception as e:
        session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500  # Return an error response
    finally:
        session.close()  # Close the session


# Route to get all pending events (those with 'pending' status)
@jwt_required
@event_bp.route("/admin/pending", methods=["GET"])
def get_pending_events():
    session = get_db_session()  # Get the database session
    try:
        # Query for events with the 'pending' status
        pending_events = (
            session.query(Events).filter_by(approval_status="pending").all()
        )

        # Create a list of event dictionaries for the response
        events_list = [
            {
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "datetime": event.datetime,
                "location": event.location,
                "tags": event.tags,
                "poster_url": (
                    generate_presigned_url(event.poster_filename)
                    if event.poster_filename
                    else None
                ),
                "approval_status": event.approval_status,
            }
            for event in pending_events
        ]

        return jsonify(events_list), 200  # Return the list of pending events
    except Exception as e:
        session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500  # Return an error response
    finally:
        session.close()


@jwt_required
@event_bp.route("/admin/approve/<event_id>", methods=["POST"])
def approve_event(event_id):
    session = get_db_session()
    try:
        event = session.query(Events).get(event_id)
        if not event:
            return jsonify({"error": "Event not found"}), 404

        # Get users with tags that match any of the event tags
        users_with_matching_tags = (
            session.query(User).filter(User.tags.op("&&")(event.tags)).all()
        )

        # Log or process the users with matching tags
        for user in users_with_matching_tags:
            print(f"User {user.name} ({user.email}) matches event tags")

        event.approval_status = "approved"
        session.commit()

        return jsonify({"message": "Event approved successfully"}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
