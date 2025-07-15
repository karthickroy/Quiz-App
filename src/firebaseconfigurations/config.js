import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ all from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAT1jtV4m9e4NzU9eRnAEF9-jULj85qr3w",
  authDomain: "fir-authentication-d4c25.firebaseapp.com",
  projectId: "fir-authentication-d4c25",
  storageBucket: "fir-authentication-d4c25.appspot.com", // ✅ note: this should be .appspot.com
  messagingSenderId: "529378277943",
  appId: "1:529378277943:web:ff5ef2dec45f8c8d0b1db2",
  measurementId: "G-SCMTFC10FW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
