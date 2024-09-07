from twilio.rest import Client
import os

def send_sms(to_number, message_text):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=to_number,
        from_=os.getenv("TWILIO_PHONE_NUMBER"),
        body=message_text,
    )

    return message.sid
