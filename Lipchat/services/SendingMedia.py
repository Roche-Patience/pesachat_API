from flask import Flask, request, jsonify
import requests
from Lipchat.config import API_KEY, LIPACHAT_MESSAGE_MEDIA_API_URL

headers = {
    "apiKey": API_KEY,
    "Content-Type": "application/json"
}

def send_media_message(to, from_number, media_type, media_url, caption=""):
    payload = {
        "messageId": "5d3f62c3-eb8f-4150-8941-bdceb0f429bb",
        "to": to,
        "from": from_number,
        "mediaType": media_type,
        "mediaUrl": media_url,
        "caption": caption
    }
    response = requests.post(LIPACHAT_MESSAGE_MEDIA_API_URL, json=payload, headers=headers)
    return response.json()