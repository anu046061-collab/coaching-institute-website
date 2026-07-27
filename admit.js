import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔴 Firebase config
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.getData = async function(){

  let roll = document.getElementById("roll").value;
  let password = document.getElementById("password").value;

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
        <p>Name: ${data.name}</p>
        <p>Course: ${data.course}</p>
        <p>Roll: ${data.roll}</p>
      `;
    }
  });

  if(!found){
    document.getElementById("card").innerHTML = "Invalid ❌";
  }
}