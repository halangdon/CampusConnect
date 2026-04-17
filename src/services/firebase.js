import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgmmng_NtAlIFA0crvixewSWZQQNtN9Uk",
  authDomain: "campus-connect-41ba2.firebaseapp.com",
  projectId: "campus-connect-41ba2",
  storageBucket: "campus-connect-41ba2.firebasestorage.app",
  messagingSenderId: "31601662860",
  appId: "1:31601662860:web:b739da62a02a957ec794a9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
