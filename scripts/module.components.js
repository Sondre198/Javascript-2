export function createPostElement(post, options = {}) {
    const container = document.createElement("article")
    container.className = "post"
    container.setAttribute("data-id", post.id)
    container.onclick = () => options.onClick?.(post)

    const header = document.createElement("section")
    header.className = "post__header"
    container.append(header)

    const title = document.createElement("h1")
    title.className = "post__title"
    title.innerText = post.title
    header.append(title)

    const actions = document.createElement("div")
    actions.className = "post__actions"
    header.append(actions)

    if (options.canEdit) {
        const deleteButton = document.createElement("button")
        deleteButton.className = "post__action post__action--delete"
        deleteButton.innerText = "Delete"
        deleteButton.onclick = e => { e.stopPropagation(); options?.onDelete?.(post) }
        actions.append(deleteButton)

        const editButton = document.createElement("button")
        editButton.className = "post__action post__action--edit"
        editButton.innerText = "Edit"
        editButton.onclick = e => { e.stopPropagation(); options?.onEdit?.(post) }
        actions.append(editButton)
    }

    if (post.body) {
        const body = document.createElement("section")
        body.className = "post__body"
        body.innerText = post.body
        container.append(body)
    }

    if (post.media) {
        const media = document.createElement("img")
        media.classList = "post__media"
        media.src = post.media
        container.append(media)
    }

    const footer = document.createElement("section")
    footer.className = "post__footer"
    container.append(footer)

    const tags = document.createElement("div")
    tags.className = "post__tags"
    footer.append(tags)

    for (const value of post.tags) {
        tags.append(createTagElement(value, {
            onClickTag:() => options.onClickTag?.(post, value)
        }))
    }

    const author = document.createElement("div")
    author.className = "post__author"
    author.innerText = post.author.name
    footer.append(author)

    const date = new Date(post.updated)
    const timestamp = document.createElement("div")
    timestamp.className = "post__timestamp"
    timestamp.innerText = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    footer.append(timestamp)

    return container
}

export function createTagElement(value, options = {}) {

    const tag = document.createElement("div")
    tag.className = "post__tag"
    tag.innerText = value
    tag.onclick = e => { e.stopPropagation(); options?.onClickTag?.(value) }
    return tag;
}