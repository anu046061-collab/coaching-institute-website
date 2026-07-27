import { addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
window.getData = async function(){
  let roll = document.getElementById("roll").value;
  let password = document.getElementById("password").value;

  const querySnapshot = await getDocs(collection(db, "students"));

  let found = false;

  querySnapshot.forEach((doc) => {
    let data = doc.data();

    if(data.roll == roll && data.password == password){
      found = true;
      await addDoc(collection)(db,"admit_logs"),

      document.getElementById("card").innerHTML = `
        <h3>Admit Card</h3>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Course:</b> ${data.course}</p>
        <p><b>Roll No:</b> ${data.roll}</p>
      `;
    }
  });

  if(!found){
    document.getElementById("card").innerHTML = "Invalid Roll or Password ❌";
  }
}