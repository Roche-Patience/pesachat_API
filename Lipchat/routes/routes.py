from flask import request, jsonify, Blueprint

from Lipchat.services.SendingButtons import send_whatsapp_buttons
from Lipchat.services.SendingInteractiveLists import send_interactive_list
from Lipchat.services.SendingMedia import send_media_message
from Lipchat.services.SendingMessages import send_whatsapp_message

lipchat = Blueprint("whatsapp", __name__)


def validate_request(data, required_fields):
    """Helper function to validate request data."""
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return {"error": "Missing required fields", "fields": missing_fields}, 400
    return None


# API Endpoint to send messages
@lipchat.route("/send_message", methods=["POST"])
def send_message():
    data = request.get_json()
    validation_error = validate_request(data, ["to", "from", "message"])
    if validation_error:
        return jsonify(validation_error[0]), validation_error[1]

    response = send_whatsapp_message(data["from"], data["to"], data["message"])
    return jsonify(response)


# API Endpoint to send media
@lipchat.route("/send-media", methods=["POST"])
def send_media():
    data = request.get_json()
    validation_error = validate_request(data, ["to", "from", "mediaType", "mediaUrl"])
    if validation_error:
        return jsonify(validation_error[0]), validation_error[1]

    response = send_media_message(
        data["to"],
        data["from"],
        data["mediaType"],
        data["mediaUrl"],
        data.get("caption")
    )
    return jsonify(response)


# API Endpoint to send buttons
@lipchat.route("/send_buttons", methods=["POST"])
def send_buttons():
    data = request.get_json()
    validation_error = validate_request(data, ["to", "from"])
    if validation_error:
        return jsonify(validation_error[0]), validation_error[1]

    response = send_whatsapp_buttons(data["from"], data["to"])
    return jsonify(response)


# API Endpoint to send an interactive list
@lipchat.route("/send-interactive-list", methods=["POST"])
def send_interactive():
    data = request.get_json()
    validation_error = validate_request(data, ["to", "from"])
    if validation_error:
        return jsonify(validation_error[0]), validation_error[1]

    response = send_interactive_list(data["to"], data["from"])
    return jsonify(response)
