import logging
import requests
import uuid
from Lipchat.config import API_KEY, LIPACHAT_MESSAGE_MEDIA_API_URL

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Headers for API requests
HEADERS = {
    "apiKey": API_KEY,
    "Content-Type": "application/json"
}

def send_media_message(to, from_number, media_type, media_url, caption=""):
    """
    Sends a media message via Lipachat API.

    Args:
        to (str): Recipient's phone number.
        from_number (str): Sender's phone number.
        media_type (str): Type of media (e.g., IMAGE, VIDEO, AUDIO).
        media_url (str): URL of the media file.
        caption (str, optional): Caption for the media. Defaults to "".

    Returns:
        dict: Response from Lipachat API.
    """
    if not all([to, from_number, media_type, media_url]):
        logging.error("❌ Missing required parameters.")
        return {"error": "Missing required parameters"}

    payload = {
        "messageId": str(uuid.uuid4()),  # Unique message ID
        "to": to.strip(),
        "from": from_number.strip(),
        "mediaType": media_type.upper(),  # Normalize media type
        "mediaUrl": media_url.strip(),
        "caption": caption.strip() if caption else ""
    }

    try:
        logging.info(f"📤 Sending media message: {payload}")
        response = requests.post(LIPACHAT_MESSAGE_MEDIA_API_URL, json=payload, headers=HEADERS)
        response.raise_for_status()  # Raise an exception for HTTP errors

        logging.info(f"✅ Lipachat API Response: {response.status_code} - {response.text}")
        return response.json()

    except requests.exceptions.RequestException as e:
        logging.error(f"🚨 Request Error: {e}")
        return {"error": "Failed to send media message"}
