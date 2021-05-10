import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// const firebaseConfigTesting = {
  // apiKey: "AIzaSyBksV0TkGc1M2fL2Oy9AgPJNRdB5d7l5gY",
  // authDomain: "testing-589ca.firebaseapp.com",
  // projectId: "testing-589ca",
  // storageBucket: "testing-589ca.appspot.com",
  // messagingSenderId: "1097126930110",
  // appId: "1:1097126930110:web:607a26fd9598d190b020ef",
// };

// if (process.env.NODE_ENV === "test") {
//   //db for testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   //db for development & production
//   firebase.initializeApp(firebaseConfig);
// }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
