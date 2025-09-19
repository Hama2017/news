const API_URL = "http://localhost:8000/api";

const get = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, result: { detail: result.detail } };
        }

        return { ok: true, result: result.data };

    } catch (error) {
        return { ok: false, result: { detail: "SERVER_ERROR" } };
    }
};



const getById = async (id:number) => {
    try {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, result: { detail: result.detail } };
        }

        return { ok: true, result: result.data };

    } catch (error) {
        return { ok: false, result: { detail: "SERVER_ERROR" } };
    }
};


export const CategoryService = {
    get, getById
};