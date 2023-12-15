import { createPostElement } from "./module.components.js";
import { getPost } from "./module.posts.js";
import { getCurrentUser } from "./module.user.js";

// Navigates to login if the user is not signed in
getCurrentUser()

const postContainer = document.getElementById("container")

const postId = new URL(location.href).searchParams.get("id")

if (!postId) {
    postContainer.innerHTML = `
    <div>
        Missing post Id
    </div>`
}

const post = await getPost(postId)
if (!post) {
    postContainer.innerHTML = `
    <div>
        Can't find post
    </div>`
}

postContainer.append(createPostElement(post))