import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//config file.
const firebaseConfig = {
    apiKey: "AIzaSyAHgfBVwNGRc65yOdHZ4_n5sXm5v2ddyFM",
    authDomain: "typing-test-website-7d47e.firebaseapp.com",
    projectId: "typing-test-website-7d47e",
    storageBucket: "typing-test-website-7d47e.appspot.com",
    messagingSenderId: "351833959519",
    appId: "1:351833959519:web:25c10aa6073da8e18dffea",
    measurementId: "G-17GWDEDF4N"
};


//connecting the firebase to the react application.

const firebaseApp = firebase.initializeApp(firebaseConfig);

//for authentication and database.
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };