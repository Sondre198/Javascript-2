import { getCurrentUser } from "./module.user.js";

export async function getPosts(filterByTag) {

    const user = getCurrentUser();

    if (!user)
        // If there is no user corrently signed in
        return []

    // Filter by tag if applicable
    const filter = filterByTag ? `&_tag=${encodeURIComponent(filterByTag)}` : ''

    // Request the feed from the API.
    const response = await fetch(`https://api.noroff.dev/api/v1/social/posts?_author=true${filter}`, {
        headers: { "Authorization": `Bearer ${user.accessToken}` }
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
        ? ["PUT",  `https://api.noroff.dev/api/v1/social/posts/${post.id}`]
        : ["POST", `https://api.noroff.dev/api/v1/social/posts`]

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
    await fetch(`https://api.noroff.dev/api/v1/social/posts/${post.id}`, {
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
    const response = await fetch(`https://api.noroff.dev/api/v1/social/posts/${id}?_author=true`, {
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