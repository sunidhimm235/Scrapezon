import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCdMVDQbGNuddwuxkZ4YGinUJCVb4YLEHs",
    authDomain: "scrapezon.firebaseapp.com",
    projectId: "scrapezon",
    storageBucket: "scrapezon.appspot.com",
    messagingSenderId: "852632889499",
    appId: "1:852632889499:web:8a6d37d9dfbf41ceda7e3e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };