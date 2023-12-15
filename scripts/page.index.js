import { login } from "./module.user.js"

// Try to create an account whenever the user clicks the submit button.
document.querySelector("form").onsubmit = async event => {

    // Stop the form from submitting.
    event.preventDefault()

    // Try to create a new account
    await login(
        document.getElementById("email").value, 
        document.getElementById("password").value, 
    )
}