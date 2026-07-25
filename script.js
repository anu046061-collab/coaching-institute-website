function scrollToForm() {
    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("admissionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;

    if(name === "") {
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
        }
    });
});