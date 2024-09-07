# all imports go here
from flask_cors import CORS
from config import app, db
from flask import request, session, jsonify, g
from itsdangerous import Signer, BadSignature
from event_management.event_bp import event_bp

CORS(app, resources={r"/*": {"origins": "*"}})


# test api route
@app.route("/api/test", methods=["GET"])
def test_api():
    return (
        jsonify({"message": "This is a test API endpoint.", "status": "success"}),
        200,
    )


# event feature blueprint
app.register_blueprint(event_bp, url_prefix="/events")

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
