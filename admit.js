// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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



// 🔥 Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ MAIN FUNCTION
window.getData = async function () {

  const roll = document.getElementById("roll").value.trim();
  const password = document.getElementById("password").value.trim();

  // validation
  if (!roll || !password) {
    alert("Roll aur Password enter karo!");
    return;
  }

  try {
    const querySnapshot = await getDocs(collection(db, "students"));

    let found = false;

    for (const doc of querySnapshot.docs) {

      const data = doc.data();

      if (data.roll == roll && data.password == password) {

        found = true;

        // tracking (optional)
        await addDoc(collection(db, "admit_logs"), {
          roll: data.roll,
          time: new Date().toLocaleString()
        });

        //final card design working
        document.getElementById("card").innerHTML = `
  <div style="
    border:2px solid #0a3d62;
    padding:20px;
    border-radius:12px;
    background:linear-gradient(to right, rgb(244, 244, 244), #ffffff);
    width:300px;
    margin:auto;
    font-family:Arial;
  ">
  <img src="logo.png" style="
  width:80px;
  height:80px;
  display:block;
  margin:auto;
  border-radius:50%;
  border:3px solid #0a3d62;
  padding:5px;
  background:white;
  box-shadow:0 4px 10 px rgba(0,0,0,0.2);

  " />
  

    <h2 style="
      text-align:center;
      color:#0a3d62;
      margin-bottom:5px;
    ">
      Krishna Computer Institute
    </h2>

    <p style="text-align:center; font-size:12px; color:gray;">
      Chanda Road, Near PNB Bank
    </p>

    <hr>

    <div style="text-align:left; margin-top:10px;">
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Course:</b> ${data.course}</p>
      <p><b>Roll No:</b> ${data.roll}</p>
    </div>

    <hr>

    <div style="display:flex; justify-content:space-between; font-size:12px;">
      <span>Date: ${new Date().toLocaleDateString()}</span>
      <span>Valid</span>
    </div>

    <p style="
      text-align:center;
      margin-top:15px;
      font-size:12px;
      color:green;
      font-weight:bold;
    ">
      ✔ Verified Student
    </p>

  </div>
`;
      }
    }

    if (!found) {
      document.getElementById("card").innerHTML = "Invalid ❌";
    }

  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }

};
window.togglePassword = function () {
  let pass = document.getElementById("password");
  let eye = event.target;

  if (pass.type === "password") {
    pass.type = "text";
    eye.innerText = "🙈";
  } else {
    pass.type = "password";
    eye.innerText = "👁️";
  }
};
