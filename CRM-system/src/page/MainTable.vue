<template>
    <main-header @print="(val) => getClients(val)"></main-header>
    <main>
        <section class="table">
            <div class="container">
                <div class="example" v-if="loader">
                    <img class="loader" src="/img/loader.png" />
                </div>
                <div class="table__content" id="table" v-if="!loader">
                    <h1 class="table__title">Клиенты</h1>
                    <div :class="classObject">
                        <table-header
                            v-bind:sorting-settings="sortingSettings"
                        />
                        <table-body
                            v-bind:items="sortedItems"
                            v-bind:showEditModal="showEditModal"
                        />

                        <div class="table__pagination">
                            <a><div class="dot" @click="this.setClassName('table-part_first')"></div></a>&nbsp
                            <a><div class="dot" @click="this.setClassName('table-part_second')"></div></a>&nbsp
                            <a><div class="dot" @click="this.setClassName('table-part_third')"></div></a>&nbsp
                        </div>
                    </div>
                    <div class="button__wrap">
                        <button
                            class="show-modal-button table__button btn-reset"
                            @click="showAddModal"
                        >
                            Добавить клиента
                        </button>
                        <modal-client
                            ref="modal"
                            v-bind:api-request-func="currentRequestFunc"
                            v-bind:current-client="currentClient"
                            v-bind:process-client="currentProcessClient"
                        ></modal-client>
                        <delete-modal
                            ref="deleteModal"
                            v-bind:current-client="currentClient"
                        ></delete-modal>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import TableHeader from "../components/TableHeader.vue";
import DeleteModal from "../components/DeleteModal.vue";
import TableBody from "../components/TableBody.vue";
import MainHeader from "../page/MainHeader.vue";
import modalClient from "../components/ModalClient.vue";
import { Api } from "../helpers/api.js";
import {
    changeSortBus,
    deleteClientBus,
    openDeleteLightboxBus,
} from "../helpers/eventBus.js";

export default {
    name: "MainTable",
    components: {
        TableBody,
        TableHeader,
        DeleteModal,
        MainHeader,
        modalClient,
    },
    methods: {
        setClassName(value) {
          this.className = value;
        },
        async getClients(search) {
            this.searchString = search;
            this.loader = true;
            this.items = await Api.getClients(this.searchString);
            this.loader = false;
        },
        addClient(client) {
            this.items.push(client);
        },
        updateClient(client) {
            this.items = this.items.filter((item) => item.id !== client.id);
            this.addClient(client);
        },
        async addApiRequestFunc(name, surname, lastName, id, contacts) {
            return await Api.addClient(name, surname, lastName, id, contacts);
        },
        async updateApiRequestFunc(name, surname, lastName, id, contacts) {
            return await Api.updateClient(
                name,
                surname,
                lastName,
                id,
                contacts
            );
        },
        openDeleteLightbox: async function (client) {
            this.currentClient = client;
            this.$refs.deleteModal.show = true;
        },
        async deleteClient(id, callbacks) {
            const result = await Api.deleteClient(id);
            if (result) {
                this.items = this.items.filter((item) => item.id !== id);
                callbacks.ifSuccess();
            } else {
                callbacks.ifError();
            }
        },
        showAddModal: function () {
            this.showModal({}, this.addApiRequestFunc, this.addClient);
        },
        showEditModal: function (client) {
            this.showModal(
                client,
                this.updateApiRequestFunc,
                this.updateClient
            );
        },
        showModal: function (
            currentClient,
            currentRequestFunc,
            currentProcessClient
        ) {
            this.currentClient = currentClient;
            this.currentRequestFunc = currentRequestFunc;
            this.currentProcessClient = currentProcessClient;
            this.$refs.modal.show = true;
        },
        async changeSort(field, value) {
            const settings = this.sortingSettings;
            settings.sortingField = field;
            settings[field] = value;
            this.sortingSettings = settings;
        },
    },
    data() {
        return {
            className: 'table-part_first',
            items: [],
            currentClient: {},
            currentRequestFunc: () => {},
            currentProcessClient: () => {},
            searchString: "",
            loader: false,
            sortingSettings: {
                id: true,
                fio: true,
                created: true,
                modified: true,
                sortingField: "id",
            },
            sortingFunctions: {
                id: (e) => e.id,
                fio: (e) =>
                    e.surname +
                    " " +
                    e.name +
                    (e.lastName ? " " + e.lastName : ""),
                created: (e) => e.createdAt,
                modified: (e) => e.updatedAt,
            },
        };
    },
    computed: {
        classObject: function () {
            return {
                "table": true,
                [this.className]: !!this.className,
            };
        },
        pagesCount() {
            return this.items.length > 5 ? Math.ceil(this.items.length / 5) : 0;
        },
        sortedItems() {
            // const hash = window.location.hash ? parseInt(window.location.hash.replace('#', '')) : 1;
            return this.items.sort((a, b) => {
                const sortingFunction =
                    this.sortingFunctions[this.sortingSettings.sortingField];
                return sortingFunction(a) > sortingFunction(b)
                    ? this.sortingSettings[this.sortingSettings.sortingField]
                        ? 1
                        : -1
                    : this.sortingSettings[this.sortingSettings.sortingField]
                    ? -1
                    : 1;
            });
            // .filter((e,i) => i < (hash * 5) && i >= ((hash - 1) * 5))
        },
    },
    created() {
        const openDeleteLightboxListener = (id) => this.openDeleteLightbox(id);
        openDeleteLightboxBus.on(openDeleteLightboxListener);
        const deleteClientListener = (id, callbacks) => this.deleteClient(id, callbacks);
        deleteClientBus.on(deleteClientListener);
        const changeSortListener = (field, value) =>
            this.changeSort(field, value);
        changeSortBus.on(changeSortListener);
    },
    mounted() {
        // window.addEventListener('hashchange', () => {
        //     this.getClients(this.searchString);
        // })
        this.getClients();
    },
};
</script>

<style scoped>
.table__button {
    position: relative;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #9873ff;
    padding: 13px;
    padding-left: 58px;
    padding-right: 27px;
    border: 1px solid #9873ff;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
        border 0.3s ease-in-out;
}

.table__button:hover {
    background-color: #9873ff;
    border: 1px solid #7b61ff;
    color: white;
}

.table__button:focus-visible {
    outline: none;
    background-color: #9873ff;
    color: white;
}

.table__button:active {
    background-color: #7b61ff;
    color: white;
}

.button__wrap {
    display: flex;
    justify-content: center;
    padding-top: 32px;
}

.table__button:after {
    content: "";
    position: absolute;
    display: inline-block;
    top: 15px;
    left: 26px;
    background-image: url("/img/svg/Vector.svg");
    width: 22px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: contain;
    transition: background 0.3s ease-in-out;
}

.table__button:hover:after {
    background-image: url("/img/svg/Vector.png");
}

.table__button:focus-visible:after {
    background-image: url("/img/svg/Vector.png");
}

.table__button:active:after {
    background-image: url("/img/svg/Vector.png");
}

.table__pagination {
    display: none;
}

.dot {
    width: 10px;
    height: 10px;
    background: #9873ff;
    border-radius: 100%;
    margin: 0 10px;
    margin-top: 10px;
    cursor: pointer;
}

.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    animation-name: loader;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@media screen and (max-width: 1024px) {
    .table__content {
        padding-left: 4px;
    }

    .button__wrap {
        padding-right: 0;
        padding-left: 12px;
    }
}

@media screen and (max-width: 576px) {
    .button__wrap {
        padding-right: 0;
        padding-left: 26px;
    }

}

@media screen and (width: 320px) {
    .table__content {
        padding-left: 0;
    }

    .table__button {
        padding-left: 53px;
    }

    .table__button:after {
        left: 22px;
    }

    .table__pagination {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
