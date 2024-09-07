# all imports go here
from flask_cors import CORS
from config import app, db
from flask import request, session, jsonify, g
from event_management.event_bp import event_bp
from fire_sensor.fire_sensor_bp import fire_sensor_bp
from user.user_bp import user_bp
from user_emergency.user_emergency_bp import user_emergency_bp

#demo '/' endpoint
@app.route('/', methods=['GET'])
def index():
    return 'Hello World!'

CORS(app, resources={r"/*": {"origins": "*"}})


# test api route
@app.route("/api/test", methods=["GET"])
def test_api():
    return (
        jsonify({"message": "This is a test API endpoint.", "status": "success"}),
        200,
    )

#fire sensor feature blueprint
app.register_blueprint(fire_sensor_bp, url_prefix='/fire-sensor')

#user emergency feature blueprint
app.register_blueprint(user_emergency_bp, url_prefix='/user-emergency')

#event management feature blueprint
app.register_blueprint(event_bp, url_prefix="/events")

#user tags blueprint
app.register_blueprint(user_bp, url_prefix="/user/dashboard")

# run the app
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)


@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, Exception):
        response = jsonify({"error": str(e)})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
