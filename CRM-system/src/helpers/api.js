const BASE_URL = "http://localhost:3000";
const ADD_ERROR_TEXT = 'Не удалось добавить клиента';
const UPDATE_ERROR_TEXT = 'Не удалось изменить клиента';
export class Api {
    static async getClients(search) {
        const response = await fetch(
            BASE_URL + "/api/clients" + (search ? `?search=${search}` : "")
        );
        return await response.json();
    }

    static async deleteClient(id) {
        const response = await fetch(BASE_URL + "/api/clients/" + id, {
            method: "DELETE",
        });
        return response.ok;
    }

    static async addClient(name, surname, lastName, id, contacts) {
        try {
            const response = await fetch(BASE_URL + "/api/clients", {
                method: "POST",
                body: JSON.stringify({ name, surname, lastName, contacts }),
            });
            return response.ok || response.status === 422
                ? await response.json()
                : await fetchError(ADD_ERROR_TEXT);
        } catch (e) {
            return await fetchError(ADD_ERROR_TEXT);
        }
    }

    static async updateClient(name, surname, lastName, id, contacts) {
        try {
            const response = await fetch(BASE_URL + "/api/clients/" + id, {
                method: "PATCH",
                body: JSON.stringify({ name, surname, lastName, contacts }),
            });
            return response.ok || response.status === 422
                ? await response.json()
                : await fetchError(UPDATE_ERROR_TEXT);
        } catch (e) {
            return await fetchError(UPDATE_ERROR_TEXT);
        }
    }
}

function fetchError(text) {
    return Promise.resolve({errors: [{field: 'fetch', message: text}]})
}
