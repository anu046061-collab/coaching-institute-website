import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getCountFromServer, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
async function loadData() {
  const querySnapshot = await getDocs(collection(db, "students"));

  querySnapshot.forEach((doc) => {
    let data = doc.data();

    let row = `
      <tr>
        <td>${data.name}</td>
        <td>${data.phone}</td>
        <td>${data.course}</td>
        <td>${data.time}</td>
        <td>${data.roll}</td>
        <td>${data.password}</td>
        <td>
        <button onclick="deleteData('${id}')>Delete</button>
        </td>
      </tr>
    `;

    document.getElementById("data").innerHTML += row;
  });
}

loadData();
async function loadAnalytics(){

  // total students
  const studentSnap = await getCountFromServer(collection(db, "students"));
  document.getElementById("totalStudents").innerText = studentSnap.data().count;

  // total admit views
  const viewSnap = await getCountFromServer(collection(db, "admit_logs"));
  document.getElementById("totalViews").innerText = viewSnap.data().count;
}

loadAnalytics();
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.deleteData = async function (id) {
  let confirmDelete = confirm("Are you sure?");

  if (confirmDelete) {
    await deleteDoc(doc(db, "students", id));
    alert("Deleted Successfully");
    location.reload();
  }
}