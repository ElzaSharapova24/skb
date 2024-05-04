import { useEventBus } from "@vueuse/core";

const openDeleteLightboxBus = useEventBus("openDeleteLightbox");

function openDeleteLightbox(client) {
    openDeleteLightboxBus.emit(client);
}

const deleteClientBus = useEventBus("deleteClient");

async function deleteClient(id, payload) {
    await deleteClientBus.emit(id, payload);
}

const changeSortBus = useEventBus("changeSort");

function changeSort(field, value) {
    changeSortBus.emit(field, value);
}

export {
    openDeleteLightboxBus,
    openDeleteLightbox,
    deleteClientBus,
    deleteClient,
    changeSortBus,
    changeSort,
};
