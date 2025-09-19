import { News } from "@/types/news";

const API_URL = "http://localhost:8000/api";

const get = async () => {
    try {
        const response = await fetch(`${API_URL}/news`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, result: { detail: result.detail } };
        }

        return { ok: true, result: result };
    } catch (error) {
        return { ok: false, result: { detail: "SERVER_ERROR" } };
    }
};

const getById = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/news/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, result: { detail: result.detail } };
        }

        return { ok: true, result: result };
    } catch (error) {
        return { ok: false, result: { detail: "SERVER_ERROR" } };
    }
};

const post = async (newsData: News) => {
    try {
        
        const response = await fetch(`${API_URL}/news`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, result: { detail: result.detail } };
        }

        return { ok: true, result: result };
    } catch (error) {
        return { ok: false, result: { detail: "SERVER_ERROR" } };
    }
};

const update = async (id: number, newsData: News) => {
    try {
        const response = await fetch(`${API_URL}/news/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, result: { detail: result.detail } };
        }

        return { ok: true, result: result };
    } catch (error) {
        return { ok: false, result: { detail: "SERVER_ERROR" } };
    }
};

const remove = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/news/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, result: { detail: result.detail } };
        }

        return { ok: true, result: result };
    } catch (error) {
        return { ok: false, result: { detail: "SERVER_ERROR" } };
    }
};

export const NewsService = {
    get,
    getById,
    post,
    update,
    remove
};