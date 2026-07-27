import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Data fetch
async function loadData(){
  const querySnapshot = await getDocs(collection(db, "students"));

  querySnapshot.forEach((doc) => {
    let data = doc.data();

    let row = `
      <tr>
        <td>${data.name}</td>
        <td>${data.phone}</td>
        <td>${data.course}</td>
      </tr>
    `;

    document.getElementById("data").innerHTML += row;
  });
}

loadData();