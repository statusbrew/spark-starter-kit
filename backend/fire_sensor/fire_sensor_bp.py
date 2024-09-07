from flask import Blueprint, jsonify, request, make_response
from config import get_db_session
from utils.emergency import store_emergency, trigger_emergency_response

fire_sensor_bp = Blueprint('fire_sensor_bp', __name__)


@fire_sensor_bp.route('/fire-detected', methods=['POST'])
def receive_fire_alert():
    data = request.json
    sensor = data.get('sensor')
    value = data.get('value')

    # Log the fire alert details
    print("Fire detected:", sensor, value)

    session = get_db_session()
    try:
        # Assuming `store_emergency` is generalized for different emergency types
        store_emergency(session, "Fire Location", 'fire', sensor_id=sensor)

        # Trigger fire emergency response
        trigger_emergency_response("Fire Location", 'fire')

        session.commit()

        return make_response(jsonify({"message": "Fire alert received and emergency response triggered."}), 201)
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
