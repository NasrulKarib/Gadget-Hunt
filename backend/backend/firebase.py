import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate('backend/credentials/gadget-hunt-8f2b6-firebase-adminsdk-fbsvc-956dad0b7c.json')
firebase_admin.initialize_app(cred)