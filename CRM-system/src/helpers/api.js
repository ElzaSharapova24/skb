const BASE_URL = "http://localhost:3000";
export class Api {
    static async getClients(search) {
        const response = await fetch(
            BASE_URL + "/api/clients" + (search ? `?search=${search}` : "")
        );
        return await response.json();
    }

    static async deleteClient(id) {
        await fetch(BASE_URL + "/api/clients/" + id, {
            method: "DELETE",
        }).then(e => {
            if (!e.ok) {
                throw new Error("Не удалось удалить клиента")
            }
        });
    }

    static async addClient(name, surname, lastName, id, contacts) {
        const response = await fetch(BASE_URL + "/api/clients", {
            method: "POST",
            body: JSON.stringify({ name, surname, lastName, contacts }),
        });
        return await response.json();
    }

    static async updateClient(name, surname, lastName, id, contacts) {
        const response = await fetch(BASE_URL + "/api/clients/" + id, {
            method: "PATCH",
            body: JSON.stringify({ name, surname, lastName, contacts }),
        });
        return await response.json();
    }
}
