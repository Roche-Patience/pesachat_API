# services/whatsapp_service.py

import requests

from Lipchat.config import LIPACHAT_BUTTONS_API_URL, API_KEY

headers = {
    "apiKey":   API_KEY,
    "Content-Type": "application/json"
}
def send_whatsapp_buttons(from_number,to):
    """Sends an interactive WhatsApp message with buttons."""

    payload = {
        "text": "Hello John Doe, are you interested to learn more about our products?",
        "buttons": [
            {"id": "1", "title": "YES"},
            {"id": "2", "title": "NO"},
            {"id": "3", "title": "Maybe"}
        ],
        "messageId": "9f1a77f0-2240-4027-af00-c8d90469068b",
        "to": to,
        "from": from_number
    }

    response = requests.post(LIPACHAT_BUTTONS_API_URL, json=payload, headers=headers)
    return response.json()

