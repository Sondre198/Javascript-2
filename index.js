import { login } from "./modules/user.js"

// Try to create an account whenever the user clicks the submit button.
document.getElementById("submit").onclick = async event => {

    // Stop the form from submitting.
    event.preventDefault()

    // Try to create a new account
    const success = await login(
        document.getElementById("email").value, 
        document.getElementById("password").value, 
    )

    if (success) {
        // If the login was successful,
        // navigate to the login
        location.href = "./feed.html"
    }
    else {
        // Notify the user that account creation failed.
        alert("Wrong username or password.")
    }
}