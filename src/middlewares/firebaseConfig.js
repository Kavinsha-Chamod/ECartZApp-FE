import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyChVWx5DqcfxomFWzRmouMdwatplMCstrQ",
  authDomain: "ecartzapp.firebaseapp.com",
  projectId: "ecartzapp",
  storageBucket: "ecartzapp.appspot.com",
  messagingSenderId: "306460917993",
  appId: "1:306460917993:web:5b1a4ce9a7b64d35cef078",
  measurementId: "G-R1RC74YDXY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth, analytics };