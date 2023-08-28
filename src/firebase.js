// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVyuvG4xaj47_-fW9HYOrKzElK6_PLgMs",
  authDomain: "graham-432a0.firebaseapp.com",
  projectId: "graham-432a0",
  storageBucket: "graham-432a0.appspot.com",
  messagingSenderId: "256407024203",
  appId: "1:256407024203:web:71d9a368f076a9a23d13ce",
  measurementId: "G-G4J57BRKY7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
