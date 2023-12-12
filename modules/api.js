export const BASE_URL = "https://api.noroff.dev/api/v1"

export async function postJson(url, content) {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    })

    if (!response.ok)
        throw new Error(`Request failed (${response.status} ${response.statusText}): ${response.url}`)

    return await response.json();
}