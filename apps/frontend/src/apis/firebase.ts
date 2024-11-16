import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd_8xlmY-NgFMCRtE8O19Gsxvknt_Ux0U",
  authDomain: "ebuddy-test-84e11.firebaseapp.com",
  projectId: "ebuddy-test-84e11",
  storageBucket: "ebuddy-test-84e11.firebasestorage.app",
  messagingSenderId: "697531624865",
  appId: "1:697531624865:web:bd513b6efee13f24e16fe0",
  measurementId: "G-D5RT2TXYDV",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
