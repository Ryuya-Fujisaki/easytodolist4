import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACA_GQCru-pqH-xmGdA7OYU-1HFONTE48",
    authDomain: "react-auth-35692.firebaseapp.com",
    projectId: "react-auth-35692",
    storageBucket: "react-auth-35692.appspot.com",
    messagingSenderId: "510461704376",
    appId: "1:510461704376:web:822410315e9411a6011c4d"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const addTodoToFirestore = async (title: string) => {
    try {
        const todoCollection = collection(db, 'todo'); // 正しいコレクション名を指定
        await addDoc(todoCollection, { title });
    } catch (error) {
        console.error('Error adding todo:', error);
    }
};
