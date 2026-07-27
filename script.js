import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
// 🔥 FORM SUBMIT CODE 
document.getElementById("admissionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const phone = document.getElementById("phone").value;

    if (name === "" || course === "" || email === "" || phone === "") {
        alert("Please fill all field!");
        return;
    }

    try {
        await addDoc(collection(db, "students"), {
            name: name,
            email: email,
            course: course,
            phone: phone
        });

        alert("Form Submit Successfully ✅");

    } catch (error) {
        console.error(error);
        alert("Error ❌");
    }
});


console.log("JS loaded");
function scrollToForm() {
    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("admissionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;

    if (name === "") {
        alert("Please enter your name");
    } else {
        document.getElementById("message").innerText = "Form Submitted Successfully!";
    }
});
window.addEventListener("scroll", () => {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("nav ul li a");

    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 100;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                document.querySelector("nav ul li a[href*=" + id + "]").classList.add("active");
            });
            function toggleMenu() {
                document.getElementById("navLinks").classList.toggle("show");
            }
        }
    });
});