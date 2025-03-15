document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    console.log(password);

    // Client-side validation
    // const usernamePattern = /^(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{4,}$/;
    // if (!usernamePattern.test(username)) {
    //     alert("Username must be at least 4 characters long and contain at least one number and one special character.");
    //     return;
    // }

    // const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,}$/;
    // if (!passwordPattern.test(password)) {
    //     alert("Password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character.");
    //     return;
    // }

    const loginData = { username, password };

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });
        console.log(response);
        
        const result = await response.text(); // Accept plain text response
        
        if (response.ok) {
            alert("Login successful!");
            try {
                const jsonData = JSON.parse(result); // Convert string to JSON if it's valid
                localStorage.setItem("jwtToken", jsonData.token);
                localStorage.setItem("username", username);
                console.log("hello");
                console.log(jsonData);
                window.location.href = "home.html"; // Redirect to home page
            } catch (e) {
                alert("Unexpected response format. Please try again.");
            }
        } else {
            alert("Error: " + result); // Display plain text error message
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again later.");
    }
});