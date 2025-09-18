

const API_URL = "http://localhost:8000/api/"

const get = async () => {

    try {

        const response = await fetch(`${API_URL}/news`, {
            method: "GET",
            headers: {
                'content-type': 'Application/json',
                // body: JSON.stringify
            }
        });

        const result = await response.json();
        return { ok: response.ok, result: result }

    } catch {
        return { ok: false, result: { detail: "SERVER_ERROR"} }
    }
}


export const NewsService = {
    get
}