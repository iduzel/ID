import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const firebaseConfig = {
  apiKey: process.env.ID_FB_API_KEY,
  authDomain:process.env.ID_FB_AUTH_DOMAIN,
  projectId:process.env.ID_FB_PROJECT_ID,
  storageBucket: process.env.ID_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.ID_FB_MESSAGING_SENDER_ID,
  appId: process.env.ID_FB_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async(email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
}

export default app;