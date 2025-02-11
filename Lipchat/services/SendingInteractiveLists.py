from flask import Flask, request, jsonify
import requests

from Lipchat.config import API_KEY, LIPACHAT_LIST_API_URL

def send_interactive_list(to, from_number):
    headers = {
        "apiKey": API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "headerText": "Welcome to Lipachat",
        "body": "Please choose a product you would like below",
        "buttonText": "Click Here",
        "buttons": [
            {
                "sectionTitle": "Airtime",
                "sectionItems": [
                    {"id": "SAFARICOM_AIRTIME", "title": "Safaricom", "description": "mpesa network"},
                    {"id": "AIRTEL_AIRTIME", "title": "Airtel", "description": "airtel money"}
                ]
            },
            {
                "sectionTitle": "Bill Payment",
                "sectionItems": [
                    {"id": "KPLC", "title": "KPLC", "description": "electricity"},
                    {"id": "NAIROBI_WATER", "title": "Nairobi Water", "description": "county gov water"}
                ]
            }
        ],
        "messageId": "ca739107-4b0d-4581-acb1-4c4af70555de",
        "to": to,
        "from": from_number
    }
    response = requests.post(LIPACHAT_LIST_API_URL, json=payload, headers=headers)
    return response.json()



