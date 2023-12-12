import { BASE_URL } from "./api.js";
import { getCurrentUser } from "./user.js";

export async function getPosts(filterByTag) {

    const user = getCurrentUser();

    if (!user)
        // If there is no user corrently signed in
        return []

    // Filter by tag if applicable
    const filter = filterByTag ? `&_tag=${encodeURIComponent(filterByTag)}` : ''

    // Request the feed from the API.
    const response = await fetch(`${BASE_URL}/social/posts?_author=true${filter}`, {
        headers: {
            "Authorization": `Bearer ${user.accessToken}`
        }
    })

    // Handle if the request failed.
    if (!response.ok) {
        return []
    }

    // Convert the feed to js objects.
    return await response.json();
}

export async function updateOrCreatePost(post) {

    const user = getCurrentUser();

    if (!user)
        // If there is no user corrently signed in
        return []

    const [method, url] = post.id
        ? ["PUT",  `${BASE_URL}/social/posts/${post.id}`]
        : ["POST", `${BASE_URL}/social/posts`]

    // Post the post to the API.
    await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(post)
    })
}

export async function deletePost(post) {

    const user = getCurrentUser();

    if (!user)
        // If there is no user corrently signed in
        return []

    // Delete the post through the API.
    await fetch(`${BASE_URL}/social/posts/${post.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${user.accessToken}`
        }
    })
}

export async function getPost(id) {

    const user = getCurrentUser();

    if (!user)
        // If there is no user corrently signed in
        return []

    // Request the feed from the API.
    const response = await fetch(`${BASE_URL}/social/posts/${id}?_author=true`, {
        headers: {
            "Authorization": `Bearer ${user.accessToken}`
        }
    })

    // Handle if the request failed.
    if (!response.ok) {
        return []
    }

    // Convert the feed to js objects.
    return await response.json();
}