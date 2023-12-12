import { createPostElement } from "./modules/components.js";
import { getPost } from "./modules/posts.js";
import { getCurrentUser } from "./modules/user.js";

const user = getCurrentUser()

if (!user)
{
    // Go to login
    location.href = "./"
}

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