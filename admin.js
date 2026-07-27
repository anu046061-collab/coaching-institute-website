// Firebase imports (v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzPpC_kncdMoAy9i9Km989R1jGHiLRYWU",
  authDomain: "coaching-institute--website.firebaseapp.com",
  projectId: "coaching-institute--website",
  storageBucket: "coaching-institute--website.firebasestorage.app",
  messagingSenderId: "889564120620",
  appId: "1:889564120620:web:f82b1476fb6573105e7389",
  measurementId: "G-EKKR3TLVC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
window.login = function(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        document.getElementById("message").innerText = "Login Successful ✅";

        // Dashboard page open (next step)
        setTimeout(()=>{
            window.location.href = "dashboard.html";
        },1000);
    })
    .catch((error) => {
        document.getElementById("message").innerText = "Login Failed ❌";
    });
}