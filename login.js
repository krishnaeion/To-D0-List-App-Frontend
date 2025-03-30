
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();


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

        const result = await response.text(); // Accept plain text response

        if (response.ok) {
            try {
                const jsonData = JSON.parse(result); // Convert string to JSON if it's valid
                localStorage.setItem("jwtToken", jsonData.token);
                localStorage.setItem("username", username);
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

// Google Sign-In Callback
// function handleCredentialResponse(response) {
//     const idToken = response.credential;
//     console.log(idToken);

//     fetch("http://localhost:8080/api/auth/google-login", { // Backend API URL for Google Sign-In
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({token: idToken })
//     })
//     .then(res => res.text())
//     .then(data => {
//         console.log(data);
//         console.log("Server Response:", data)
//         if (data.token) {
//             localStorage.setItem("jwtToken", data.token);
//             localStorage.setItem("username", data.username);
//             alert("Google Login Successful!");
//             window.location.href = "home.html"; // Redirect to home page
//         } else {
//             alert("Google Login Failed!");
//         }
//     })
//     .catch(error => {
//         console.error("Google Login Error:", error);
//         alert("Google Sign-In failed. Please try again.");
//     });
// }


// function handleCredentialResponse(response) {
//     const idToken = response.credential;
//     console.log("Google ID Token:", idToken);

//     fetch("http://localhost:8080/api/auth/google-login", { // Backend API URL for Google Sign-In
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${idToken}` // Pass Google ID token in Authorization header
//         },
//         body: JSON.stringify({ token: idToken }) // Also send in the body
//     })
//     .then(res => res.json()) // Expect JSON response
//     .then(data => {
//         console.log("Server Response:", data);
//         if (data.token) {
//             localStorage.setItem("jwtToken", data.token);
//             localStorage.setItem("username", data.username);
//             alert("Google Login Successful!");
//             window.location.href = "home.html"; // Redirect to home page
//         } else {
//             alert("Google Login Failed: " + data.message);
//         }
//     })
//     .catch(error => {
//         console.error("Google Login Error:", error);
//         alert("Google Sign-In failed. Please try again.");
//     });
// }

// working
// function handleCredentialResponse(response) {
//     const idToken = response.credential;
//     console.log("Google ID Token:", idToken);

//     fetch("http://localhost:8080/api/auth/google-login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${idToken}` // Optional, token should be in body
//         },
//         body: JSON.stringify({ idToken: idToken })
//     })
//     .then(res => res.text())  // Use `.text()` first, then parse JSON if possible
//     .then(text => {
//         try {
//             const data = JSON.parse(text);  // Try to parse JSON response
//             console.log("Server Response:", data);

//             if (data.token) {
//                 // console.log(data.token);
//                 // console.log(data);
//                 // console.log(data.username);
//                 // console,log(end);
//                 localStorage.setItem("jwtToken", data.token);
//                 localStorage.setItem("username", data.username);
//                 alert("Google Login Successful!");
//                 window.location.href = "home.html";
//             } else {
//                 alert("Google Login Failed: " + data.message);
//             }
//         } catch (error) {
//             console.error("Unexpected Response:", text);  // Log unexpected non-JSON response
//             alert("Google Sign-In failed. Server response: " + text);
//         }
//     })
//     .catch(error => {
//         console.error("Google Login Error:", error);
//         alert("Google Sign-In failed. Please try again.");
//     });
// }


function handleCredentialResponse(response) {
    const idToken = response.credential;
    console.log("Google ID Token:", idToken);

    fetch("http://localhost:8080/api/auth/google-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: idToken })
    })
    .then(res => res.json())  // Directly parse JSON
    .then(data => {
        console.log("Server Response:", data);
        console.log(data.token);
        console.log(data.userName);
        if (data.token && data.userName) {
            localStorage.setItem("jwtToken", data.token);
            localStorage.setItem("username", data.userName);
            alert("Google Login Successful!");
            window.location.href = "home.html";
        } else {
            alert("Google Login Failed: " + (data.message || "Unknown error"));
        }
    })
    .catch(error => {
        console.error("Google Login Error:", error);
        alert("Google Sign-In failed. Please try again.");
    });
}




