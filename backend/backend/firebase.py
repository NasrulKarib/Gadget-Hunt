import firebase_admin
from firebase_admin import credentials
import json
import os

def initialize_firebase():
    if firebase_admin._apps:
        return firebase_admin.get_app()
    
    # Check if running in production (Render)
    if os.getenv('FIREBASE_CREDENTIALS'):
        # Load credentials from environment variable
        firebase_creds = json.loads(os.getenv('FIREBASE_CREDENTIALS'))
        cred = credentials.Certificate(firebase_creds)
    else:
        # Load from file for local development
        cred = credentials.Certificate('backend/credentials/gadget-hunt-8f2b6-firebase-adminsdk-fbsvc-956dad0b7c.json')
    
    return firebase_admin.initialize_app(cred)

# Initialize Firebase
initialize_firebase()