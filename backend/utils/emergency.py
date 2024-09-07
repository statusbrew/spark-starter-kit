from models import EmergencyReport, EmergencyFireLogs
from datetime import datetime
from utils.twillo import send_sms
import os

def store_emergency(session, sensor_location, emergency_type, user_id=None, sensor_id=None):
    # Store emergency details in the session (adapt for session-based logic)
    new_emergency = EmergencyReport(
        location=sensor_location,
        emergency_type=emergency_type,
        user_id=user_id,
        sensor_id=sensor_id,
        timestamp=datetime.utcnow()
    )
    session.add(new_emergency)

def store_emergency_fire_logs(session, sensor_id, fire_hazard_level, smoke_level, temp_level):
    new_fire_log = EmergencyFireLogs(
        sensor_id=sensor_id,
        fire_hazard_level=fire_hazard_level,
        smoke_level=smoke_level,
        temp_level=temp_level
    )
    session.add(new_fire_log)

def trigger_emergency_response(sensor_location, emergency_type, fire_hazard_level, smoke_level, temp_level):
    emergency_contact_number = os.getenv("EMERGENCY_CONTACT_NUMBER")

    #Create the message text based on emergency type
    if emergency_type == 'fire':
        message_text = (f"Emergency response triggered for {emergency_type} at {sensor_location}, "
                        f"fire hazard level: {fire_hazard_level}, smoke level: {smoke_level}, "
                        f"temprature: {temp_level}")
    else:
        message_text = f"Triggering response for {emergency_type} at {sensor_location}"

    #Send the SMS with the generated message
    try:
        message_sid = send_sms(emergency_contact_number, message_text)
        print(f"SMS sent successfully, SID: {message_sid}")
    except Exception as e:
        print(f"Failed to send SMS: {str(e)}")