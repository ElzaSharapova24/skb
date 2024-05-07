import { useEventBus } from "@vueuse/core";

const openDeleteLightboxBus = useEventBus("openDeleteLightbox");

function openDeleteLightbox(client) {
    openDeleteLightboxBus.emit(client);
}

const deleteClientBus = useEventBus("deleteClient");

function deleteClient(id, callbacks) {
    deleteClientBus.emit(id, callbacks);
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
