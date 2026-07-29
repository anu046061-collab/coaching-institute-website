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

        // show card
        document.getElementById("card").innerHTML = `
  <div style="border:2px solid black; padding:15px; border-radius:10px; background:white;">
    
    <h2 style="text-align:center; color:blue;">
      Krishna Computer Institute
    </h2>

    <hr>

    <p><b>Name:</b> ${data.name}</p>
    <p><b>Course:</b> ${data.course}</p>
    <p><b>Roll No:</b> ${data.roll}</p>

    <p style="text-align:right;">
      Date: ${new Date().toLocaleDateString()}
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