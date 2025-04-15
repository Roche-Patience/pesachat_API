import requests
import uuid
from Lipchat.config import DEFAULT_SENDER, LIPACHAT_MESSAGE_API_URL, API_KEY

headers = {
    "apiKey": API_KEY,
    "Content-Type": "application/json"
}

# Function to send a WhatsApp message
def send_whatsapp_message(to, message):
    # Strip any extra spaces from numbers

    to = to.strip()

    payload = {
        "message": message,
        "messageId": str(uuid.uuid4()),  # Generate a unique message ID
        "to": to,
        "from": DEFAULT_SENDER  # Use sanitized sender number
    }

    try:
        response = requests.post(LIPACHAT_MESSAGE_API_URL, json=payload, headers=headers)
        print("Lipachat API Request:", payload)  # Log request payload
        print("Lipachat API Response:", response.status_code, response.text)  # Log response

        response_data = response.json()

        # Check if Lipachat returned an error about the sender number
        if "message" in response_data and "not found" in response_data["message"]:
            print("Sender number not found. Trying default sender...")
            payload["from"] = DEFAULT_SENDER  # Use default sender from config
            response = requests.post(LIPACHAT_MESSAGE_API_URL, json=payload, headers=headers)
            print("Retry with DEFAULT_SENDER:", DEFAULT_SENDER)
            print("Lipachat API Response:", response.status_code, response.text)

        return response.json()

    except requests.exceptions.RequestException as e:
        print("Request Error:", e)
        return {"error": "Failed to send message"}
