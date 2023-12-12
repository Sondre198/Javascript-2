import { register } from "./modules/user.js"

// Try to create an account whenever the user clicks the submit button.
document.getElementById("submit").onclick = async event => {

    // Stop the form from submitting.
    event.preventDefault()

    // Try to create a new account
    const success = await register({
        name: document.getElementById("name").value, 
        email: document.getElementById("email").value, 
        password: document.getElementById("password").value, 
        avatar: document.getElementById("avatar").value
    })

    if (success) {
        // If the account creation was successful,
        // navigate to the login
        location.href = "./"
    }
    else {
        // Notify the user that account creation failed.
        alert("Could not create account.")
    }
}