import {postJson} from "./api.js"

/**
 * Login credentials for an existing user.
 * @typedef {{
* email:string; 
* password:string;
* }} UserCredentials 
*/


/**
 * User account details.
 * @typedef {{
 * name:string; 
 * email:string; 
 * accessToken: string;
 * avatar?:string;
 * }} UserDetails 
 */

/**
 * Signs the user in and returns true if the login was successfull
 * @param {string} email The users email
 * @param {string} password The users password
 * @returns {Promise<boolean>}
 */
export async function login(email, password) {

    try
    {
        // POST to the login url and get account details.
        const details = await postJson('/social/auth/login', {
            email, password
        })
        
        // Save details in session storage.
        sessionStorage.setItem("user", JSON.stringify(details))

        // Return that the login was successful.
        return true
    }
    catch (error)
    {
        // Return that the login failed.
        return false
    }

}

/**
 * Registers a user with the given options.
 * @param {UserDetails & UserCredentials} details User details
 * @returns {Promise<boolean>}
 */
export async function register(details) {

    try
    {
        const test = await postJson('/social/auth/register', details)

        // Registration failed
        return true
    }
    catch (error)
    {
        // Registration was successful
        return false
    }

}

/**
 * Gets the currently signed in user. Null if no user is signed in.
 * @returns {UserDetails | null} Details about the currently signed in user or null.
 */
export function getCurrentUser() {

    // Session storage cache for user details
    const userJson = sessionStorage.getItem("user")

    if (!userJson)
        // There is no user currently signed in
        return null

    // Parse the details to an object
    return JSON.parse(userJson) 
}