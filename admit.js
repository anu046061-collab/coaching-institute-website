// FIREBASE IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG 
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

// 🔥 MAIN FUNCTION
window.getData = async function () {

  let roll = document.getElementById("roll").value.trim();
  let password = document.getElementById("password").value.trim();

  const querySnapshot = await getDocs(collection(db, "students"));

  let found = false;

  querySnapshot.forEach(async (doc) => {

    let data = doc.data();

    if (data.roll == roll && data.password == password) {

      found = true;

      // TRACKING
      await addDoc(collection(db, "admit_logs"), {
        roll: data.roll,
        time: new Date().toLocaleString()
      });

      // 🎯 CARD DESIGN
      let cardHTML = `
      <div style="
        border:2px solid #0a3d62;
        padding:20px;
        border-radius:12px;
        background:white;
        text-align:center;
      ">

        <img src="logo.png" style="
          width:80px;
          height:80px;
          border-radius:50%;
          border:2px solid #0a3d62;
        ">

        <h2 style="color:#0a3d62;">Krishna Computer Institute</h2>

        <p style="color:gray;">Chanda Road, Near PNB Bank</p>

        <hr>

        <img src="${data.photo}" style="
          width:90px;
          height:90px;
          border-radius:50%;
          border:2px solid black;
        ">

        <p><b>Name:</b> ${data.name}</p>
        <p><b>Course:</b> ${data.course}</p>
        <p><b>Roll:</b> ${data.roll}</p>

        <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>

        <div id="qr"></div>

        <button onclick="downloadPDF()">Download PDF</button>

      </div>
      `;

      document.getElementById("card").innerHTML = cardHTML;

      // 🔥 QR CODE
      QRCode.toCanvas(document.getElementById("qr"), data.roll);

    }

  });

  if (!found) {
    document.getElementById("card").innerHTML =
      "<p style='color:red;'>Invalid ❌</p>";
  }

};

// 🔥 PDF DOWNLOAD
window.downloadPDF = function () {

  let content = document.getElementById("card").innerHTML;

  let win = window.open("");
  win.document.write(content);
  win.print();
};