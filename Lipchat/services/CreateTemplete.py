from flask import Flask, request, jsonify
import requests
import uuid
from Lipchat.config import API_KEY,LIPACHAT_TEMPLATE_MESSAGE_API_URL  # Make sure these are defined in your config

app = Flask(__name__)

# Define common headers for Lipachat API
headers = {
    "apiKey": API_KEY,
    "Content-Type": "application/json"
}

import uuid
import requests
from flask import Flask, request, jsonify
from Lipchat.config import LIPACHAT_TEMPLATE_MESSAGE_API_URL, API_KEY  # Ensure these are set

app = Flask(__name__)

# Common headers for Lipachat API
headers = {
    "apiKey": API_KEY,
    "Content-Type": "application/json"
}


def create_lipachat_template(template_name, language, category, components, example_payload):
    """
    Builds and sends a template creation request to the Lipachat API.

    Parameters:
      - template_name: The name of the template.
      - language: The language code, e.g., "en".
      - category: The template category, e.g., "MARKETING".
      - components: A dictionary that contains header and body components.
      - example_payload: An example payload (list) for dynamic replacement.

    Returns:
      - The JSON response from the Lipachat API.
    """

    import uuid

    payload = {
        "name": template_name,
        "language": "en",
        "category": category,
        "component": {
            "header": {
                "format": "TEXT",
                "text": "{{1}} registration",
                "example": "July"
            },
            "body": {
                "text": "Hi {{1}}, we have a new user registered click {{2}} to view.",
                "examples": [
                    "John",
                    "http://lipachat.com/offers/ASHSH"
                ]
            }
        },
        "templateId": str(uuid.uuid4())
    }


    try:
        # Log the request payload for debugging
        print("Lipachat Template Request Payload:", payload)
        response = requests.post(LIPACHAT_TEMPLATE_MESSAGE_API_URL, json=payload, headers=headers)
        print("Lipachat API Response:", response.status_code, response.text)
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Request Error:", e)
        return {"error": "Failed to create template", "details": str(e)}


