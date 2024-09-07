from flask import Blueprint, jsonify, request, make_response
from config import db
from datetime import datetime
from auth.jwt_bp import jwt_required
import os
from models import PublicUser, Events

event_bp = Blueprint('event_bp', __name__)

# Define routes within the blueprint
@event_bp.route('/api/test_event', methods=['GET'])
@jwt_required
def feature_route():
    return jsonify({
        "message": "This is a feature-specific API endpoint.",
        "status": "success"
    }), 200

@jwt_required
@event_bp.route('/create', methods=['POST'])
def create_event():
    user_id = 123
    title = request.form.get('title')
    description = request.form.get('description')
    datetime_str = request.form.get('datetime')
    location = request.form.get('location')
    tags = request.form.getlist('tags')
    poster = request.files.get('poster')

    event_datetime = datetime.strptime(datetime_str, '%Y-%m-%dT%H:%M:%S')

    # Save the poster file (if any)
    poster_url = None
    if poster:
        poster_filename = f"{title}_{poster.filename}"
        poster.save(os.path.join('static/uploads', poster_filename))
        poster_url = f'/static/uploads/{poster_filename}'

    # Create a new event
    new_event = Events(
        title=title,
        description=description,
        datetime=event_datetime,
        location=location,
        tags=tags,
        # poster_filename=poster_filename
    )

    db.session.add(new_event)
    db.session.commit()

    return make_response(jsonify({"event_id": new_event.id}), 201)

@jwt_required
@event_bp.route('/admin/approve', methods=['GET'])
def get_pending_events():
    pending_events = Events.query.filter_by(status='pending').all()

    events_list = []
    for event in pending_events:
        events_list.append({
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "datetime": event.datetime.isoformat(),
            "location": event.location,
            "tags": event.tags,
            "poster_url": event.poster_url,
            "approval_status": event.status
        })

    return make_response(jsonify(events_list), 200)