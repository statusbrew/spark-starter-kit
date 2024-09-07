from flask import Blueprint, jsonify, request, make_response
from config import get_db_session
from utils.emergency import store_emergency, trigger_emergency_response, store_emergency_fire_logs
from models import Sensor  # Assuming Sensor is in models.py

fire_sensor_bp = Blueprint('fire_sensor_bp', __name__)


@fire_sensor_bp.route('/fire-detected', methods=['POST'])
def receive_fire_alert():
    data = request.json
    sensor_name = data.get('sensor')
    fire_hazard_level = data.get('level')
    smoke_level = data.get('smoke_level')
    temp_level = data.get('temp_level')

    # Log the fire alert details
    print("Fire detected:", sensor_name, fire_hazard_level, smoke_level, temp_level)

    session = get_db_session()
    try:
        # Fetch the sensor based on sensor_name
        sensor = session.query(Sensor).filter_by(sensor_name=sensor_name).first()

        if not sensor:
            return jsonify({"error": "Sensor not found"}), 404

        sensor_location = sensor.location  # Get the location of the sensor

        # Store emergency using the sensor's location
        store_emergency(session, sensor_location, 'fire', sensor_id=sensor.id)

        # Store fire emergency details in the session
        store_emergency_fire_logs(session, sensor.id, fire_hazard_level, smoke_level, temp_level)

        # Trigger fire emergency response
        trigger_emergency_response(sensor_location, 'fire')

        session.commit()

        return make_response(jsonify({"message": "Fire alert received and emergency response triggered."}), 201)
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
