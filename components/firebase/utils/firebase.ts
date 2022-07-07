import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let firebaseApp: FirebaseApp
let firestore: Firestore

if (getApps().length === 0) {
  firebaseApp = initializeApp(config)
  firestore = getFirestore(firebaseApp)
}

export { firebaseApp, firestore }
