from models import EmergencyReport as Emergency
from datetime import datetime
def store_emergency(session, location, emergency_type, user_id=None, sensor_id=None):
    # Store emergency details in the session (adapt for session-based logic)
    new_emergency = Emergency(
        location=location,
        emergency_type=emergency_type,
        user_id=user_id,
        sensor_id=sensor_id,
        timestamp=datetime.utcnow()
    )
    session.add(new_emergency)

def trigger_emergency_response(location, emergency_type):
    # Logic for triggering the emergency response (e.g., Twilio API)
    print(f"Triggering response for {emergency_type} at {location}")
