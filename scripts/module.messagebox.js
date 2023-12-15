export function showMessageBox({title, details}) {
    const dialog = document.createElement("div")
    dialog.className = "dialog__backdrop"
    dialog.innerHTML = `
    <div class="dialog">
        <h1>${title}</h1>
        <p>${details}</p>
        <button>Ok</button>
    </div>`

    dialog.getElementsByTagName("button")[0].onclick = () => dialog.remove();

    document.body.append(dialog);
}

export function showNetworkError(error) {
    return showMessageBox({
        title: error.status,
        details: error.errors.map(e => e.message).join("<br/>")
    })
}