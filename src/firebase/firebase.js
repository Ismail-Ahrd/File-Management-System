import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCSJ1hY5JhS4zBA7xcMWirpiIViXQatMGo",
    authDomain: "file-management-system-79f7a.firebaseapp.com",
    projectId: "file-management-system-79f7a",
    storageBucket: "file-management-system-79f7a.appspot.com",
    messagingSenderId: "1058126316260",
    appId: "1:1058126316260:web:0581e5f738e534f9c722f1",
    measurementId: "G-3ZGEDZJFNV",
    databaseURL: "https://file-management-system-79f7a-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app);
const storage = getStorage();

export { app, auth, db, storage };