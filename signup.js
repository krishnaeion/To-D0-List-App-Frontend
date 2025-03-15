// signup.js
document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Client-side validation
    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid Gmail address ending with @gmail.com.");
        return;
    }

    const usernamePattern = /^(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{4,}$/;
    if (!usernamePattern.test(username)) {
        alert("Username must be at least 4 characters long and contain at least one number and one special character.");
        return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character.");
        return;
    }

    const userData = { name, email, username, password };

    try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        
        const result = await response.text(); // Accept plain text response
        
        if (response.ok) {
            alert(result); // Show plain text response message
            localStorage.setItem("signupMessage", result);
            window.location.href = "login.html";
        } else {
            alert("Error: " + result);
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("Signup failed. Please try again later.");
    }
});
