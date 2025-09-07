// Import the functions you need from the SDKs you need 
 import { initializeApp } from "firebase/app"; 
 import { getAnalytics } from "firebase/analytics"; 
 // TODO: Add SDKs for Firebase products that you want to use 
 // `https://firebase.google.com/docs/web/setup#available-libraries`  
  
 // Your web app's Firebase configuration 
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional 
 const firebaseConfig = { 
   apiKey: "AIzaSyAZE1FmkSK4urgL3-vQh-e2qlFbaWHWKR4", 
   authDomain: "clb-digital-literacy.firebaseapp.com", 
   projectId: "clb-digital-literacy", 
   storageBucket: "clb-digital-literacy.firebasestorage.app", 
   messagingSenderId: "922938553220", 
   appId: "1:922938553220:web:6256bd14a4be1f33a563d1", 
   measurementId: "G-3Q67ZZ53QL" 
 }; 
  
 // Initialize Firebase 
 const app = initializeApp(firebaseConfig); 
 const analytics = getAnalytics(app);