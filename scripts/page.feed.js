import { getCurrentUser } from "./module.user.js"
import { deletePost, getPosts, updateOrCreatePost } from "./module.posts.js"
import { createPostElement, createTagElement } from "./module.components.js"

// Get the currently signed in user if any.
const user = getCurrentUser()

document.getElementById("account-name").innerText = user.name

let filterByTag = null;
let editPostId = null;
let searchText = null

await loadFeed();

async function loadFeed() {

    // Get a reference to the feed container element
    const feedContainer = document.getElementById("feed")
    
    // Let the user know that we are loading the items.
    feedContainer.innerHTML = `
    <div>
        Loading...
    </div>
    `
    let feed = await getPosts(filterByTag);

    if (searchText) {
        feed = feed.filter(post => 
            post?.title?.includes(searchText) ||
            post?.body?.includes(searchText))
    }

    // Clear the placeholder
    feedContainer.innerHTML = ""

    if (filterByTag) {
        const container = document.createElement("div")
        container.className = "filter"
        feedContainer.append(container)

        const text = document.createElement("span")
        text.innerText = "Filtrert på "
        container.append(text)

        const tag = createTagElement(filterByTag, {
            onClickTag: () => {
                filterByTag = null
                loadFeed()
            }
        })
        tag.setAttribute("style", "display:inline")
        tag.setAttribute("title", "Remove filter")
        container.append(tag)
    }

    // Populate the feed
    for (const post of feed)
    {
        feedContainer.append(createPostElement(post, {
            canEdit: post.author.name == user.name,
            
            onClick: () => {
                location.href = "./post.html?id=" + post.id
            },

            onDelete: async () => {
                await deletePost(post)
                await loadFeed()
            },
            onEdit: () => {
                editPostId = post.id
                document.getElementById("post-title").value = post.title
                document.getElementById("post-body").value = post.body
                document.getElementById("post-tags").value = post.tags.join('; ')
                document.getElementById("post-media").value = post.media
            },
            onClickTag: (post, tag) => {
                filterByTag = tag
                loadFeed()
            }
        }))
    }
}

document.querySelector("form").onsubmit = async event => 
{
    event.preventDefault()

    const post = {
        title: document.getElementById("post-title").value,
        body: document.getElementById("post-body").value,
        tags: document.getElementById("post-tags").value.split(';').map(v => v.trim()),
        media: document.getElementById("post-media").value,
        id: editPostId
    }

    await updateOrCreatePost(post)
    await loadFeed()
    document.getElementById("post-clear-btn").onclick()
}

document.getElementById("post-clear-btn").onclick = event =>
{
    document.getElementById("post-title").value = ""
    document.getElementById("post-body").value = ""
    document.getElementById("post-tags").value = ""
    document.getElementById("post-media").value = ""
    editPostId = null
}

document.getElementById("post-search").onchange = event => {
    searchText = document.getElementById("post-search").value
    loadFeed()
}