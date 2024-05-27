import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCSJ1hY5JhS4zBA7xcMWirpiIViXQatMGo",
    authDomain: "file-management-system-79f7a.firebaseapp.com",
    projectId: "file-management-system-79f7a",
    storageBucket: "file-management-system-79f7a.appspot.com",
    messagingSenderId: "1058126316260",
    appId: "1:1058126316260:web:0581e5f738e534f9c722f1",
    measurementId: "G-3ZGEDZJFNV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage();

export { app, auth, db, storage };