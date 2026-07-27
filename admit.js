import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.getData = function(){
  alert("Button working");
}


  let roll = document.getElementById("roll").value.trim;
  let password = document.getElementById("password").value.trim;

  const querySnapshot = await getDocs(collection(db, "students"));

  let found = false;

  querySnapshot.forEach(async (doc) => {
    let data = doc.data();

    if(data.roll == roll && data.password == password){
      found = true;

      // tracking
      await addDoc(collection(db, "admit_logs"), {
        roll: data.roll,
        time: new Date().toLocaleString()
      });

      document.getElementById("card").innerHTML = `
        <h3>Admit Card</h3>
        <p><b>Name: ${data.name}</p>
        <p><b>Course: ${data.course}</p>
        <p><b>Roll: ${data.roll}</p>
      `;
    }
  });

  if(!found){
    document.getElementById("card").innerHTML = "Invalid ❌";
  }
