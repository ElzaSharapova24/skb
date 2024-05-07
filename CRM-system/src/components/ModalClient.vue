<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <div class="modal__container">
                <div class="modal-close" @click="closeModal">╳</div>
                <slot name="title">
                    <h3 class="modal-title">
                        {{
                            currentClient.id
                                ? "Изменить данные"
                                : "Новый клиент"
                        }}
                    </h3>
                </slot>
                <slot name="body">
                    <div class="modal-content">
                        <form class="modal__form" id="form">
                            <div class="errors" v-if="errors.surname">
                                {{ errors.surname }}
                            </div>
                            <label for="surname" class="modal__label"></label>
                            <input
                                v-model="surname"
                                name="surname"
                                type="text"
                                class="modal__input input-reset"
                                placeholder="Фамилия"
                            />
                            <div class="errors" v-if="errors.name">
                                {{ errors.name }}
                            </div>
                            <label for="name" class="modal__label"></label>
                            <input
                                v-model="name"
                                name="name"
                                type="text"
                                class="modal__input input-reset"
                                placeholder="Имя"
                            />
                            <label for="lastName" class="modal__label"></label>
                            <input
                                v-model="lastName"
                                name="lastName"
                                type="text"
                                class="modal__input input-reset"
                                placeholder="Отчество"
                            />
                        </form>
                        <div class="errors" v-if="errors.contacts">
                            {{ errors.contacts }}
                        </div>
                        <div class="modal__link">
                            <contact-block
                                v-for="contact in contacts"
                                v-bind="contact"
                                :key="contact.type"
                                @inputChange="
                                    (value) =>
                                        changeContactValue(value, contact)
                                "
                                @selectChange="
                                    (type) => changeContactType(type, contact)
                                "
                                @deleteContact="() => deleteContact(contact)"
                            />
                            <a
                                href="#"
                                class="link"
                                @click="addContact"
                                v-if="contacts.length < 10"
                            >
                                <svg
                                    class="svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_121_1874)">
                                        <path
                                            d="M8.00001 4.66665C7.63334 4.66665 7.33334 4.96665 7.33334 5.33331V7.33331H5.33334C4.96668 7.33331 4.66668 7.63331 4.66668 7.99998C4.66668 8.36665 4.96668 8.66665 5.33334 8.66665H7.33334V10.6666C7.33334 11.0333 7.63334 11.3333 8.00001 11.3333C8.36668 11.3333 8.66668 11.0333 8.66668 10.6666V8.66665H10.6667C11.0333 8.66665 11.3333 8.36665 11.3333 7.99998C11.3333 7.63331 11.0333 7.33331 10.6667 7.33331H8.66668V5.33331C8.66668 4.96665 8.36668 4.66665 8.00001 4.66665ZM8.00001 1.33331C4.32001 1.33331 1.33334 4.31998 1.33334 7.99998C1.33334 11.68 4.32001 14.6666 8.00001 14.6666C11.68 14.6666 14.6667 11.68 14.6667 7.99998C14.6667 4.31998 11.68 1.33331 8.00001 1.33331ZM8.00001 13.3333C5.06001 13.3333 2.66668 10.94 2.66668 7.99998C2.66668 5.05998 5.06001 2.66665 8.00001 2.66665C10.94 2.66665 13.3333 5.05998 13.3333 7.99998C13.3333 10.94 10.94 13.3333 8.00001 13.3333Z"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_121_1874">
                                            <rect
                                                width="16"
                                                height="16"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>

                                Добавить контакт
                            </a>
                        </div>
                        <div class="modal__error" v-if="errors.fetch">
                            {{errors.fetch}}
                        </div>
                    </div>
                </slot>
                <slot name="footer">
                    <div class="modal__buttons">
                        <div class="modal-footer">
                            <button
                                class="modal-footer__button btn-reset"
                                @click="submitForm"
                            >
                                Сохранить
                            </button>
                        </div>
                        <div v-if="id" class="modal__delete">
                            <button
                                class="modal-footer__btn btn-reset"
                                @click="deleteClick(currentClient)"
                            >
                                Удалить клиента
                            </button>
                        </div>
                        <div v-if="!id" class="modal__delete">
                            <button
                                class="modal-footer__btn btn-reset"
                                @click="closeModal()"
                            >
                                Отменить
                            </button>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import { openDeleteLightbox } from "../helpers/eventBus.js";
import ContactBlock from "./ContactBlock.vue";
export default {
    props: {
        processClient: {
            type: Function,
        },
        apiRequestFunc: {
            type: Function,
        },
        currentClient: {
            type: Object,
        },
    },
    name: "ModalClient",
    components: { ContactBlock },
    data: function () {
        return {
            show: false,
            id: undefined,
            name: undefined,
            surname: undefined,
            lastName: undefined,
            errors: {},
            contacts: [],
        };
    },
    watch: {
        currentClient: function () {
            this.init();
        },
    },
    methods: {
        init() {
            this.id = this.currentClient.id;
            this.name = this.currentClient.name;
            this.surname = this.currentClient.surname;
            this.lastName = this.currentClient.lastName;
            this.contacts = this.currentClient.contacts || [];
        },
        closeModal: function () {
            this.show = false;
            this.errors = {};
        },
        addContact(event) {
            event.preventDefault();
            this.contacts.push({
                type: "phone",
                value: "",
            });
        },
        deleteContact(contact) {
            this.contacts = this.contacts.filter((item) => item !== contact);
        },
        changeContactValue(value, contact) {
            contact.value = value;
        },
        changeContactType(type, contact) {
            contact.type = type;
        },
        submitForm: async function () {
            const result = await this.apiRequestFunc(
                this.name,
                this.surname,
                this.lastName,
                this.id,
                this.contacts
            );
            if (result.errors) {
                this.errors = result.errors.reduce((a, c) => {
                    a[c.field] = c.message;
                    return a;
                }, {});
            } else {
                this.processClient(result);
                this.closeModal();
            }
        },
        deleteClick(client) {
            openDeleteLightbox(client);
            this.closeModal();
        },
    },
};
</script>

<style scoped>
.errors {
    color: red;
    font-size: 12px;
    padding-top: 5px;
}

.modal-shadow {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
}

.modal__error {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    color: red;
    margin-bottom: 10px;
    padding-right: 30px;
}

.modal {
    background: #fff;
    width: 450px;
    height: auto;
    padding-bottom: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000000;
}

.modal__container {
    padding-top: 23px;
    padding-left: 29px;
}

.modal-close {
    border-radius: 50%;
    color: #b0b0b0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.modal-title {
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #333333;
}

.modal-content {
    margin-bottom: 20px;
}

.modal__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 32px;
}

.modal-footer__button {
    font-family: "Open Sans", sans-serif;
    background-color: #9873ff;
    color: #fff;
    padding: 12px 35px;
    font-size: 14px;
    line-height: 100%;
    font-weight: 600;
    margin-bottom: 5px;
    transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.modal-footer__button:hover {
    background-color: #7b61ff;
    border: 1px solid #9873ff;
}

.modal-footer__button:active {
    background-color: #9873ff;
    border: 1px solid #7b61ff;
}

.modal__form {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
}

.modal__label {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: #b0b0b0;
    padding-top: 15px;
}

.svg {
    margin-right: 5px;
}

svg {
    fill: #9873ff;
}

svg:hover {
    fill: white;
}

.svg:hover {
    background-color: #9873ff;
    border-radius: 10px;
}

.modal__input {
    width: 390px;
    border-bottom: 1px solid #c8c5d1;
    caret-color: #c8c5d1;
    margin-bottom: 25px;
}

::placeholder {
    font-size: 10px;
}

.modal__link {
    position: relative;
    margin-bottom: 31px;
    padding-right: 22px;
    text-align: center;
}

.link:hover,
.svg:hover {
    color: #9873ff;
}

.modal-footer__btn {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: #333333;
    border-bottom: 1px solid #333333;
    transition: color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.modal-footer__btn:hover {
    color: #9873ff;
    border-bottom: 1px solid #9873ff;
}

.modal-footer__btn:active {
    color: #7b61ff;
    border-bottom: 1px solid #7b61ff;
}

.link {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;
    transition: color 0.3s ease-in-out;
}

@media screen and (max-width: 1024px) {
    .modal {
        top: 57%;
        left: 51%;
    }
}

@media screen and (max-width: 768px) {
    .modal-shadow {
        min-height: 118%;
    }
}

@media screen and (width: 320px) {
    .modal {
        width: 300px;
        top: 49%;
    }

    .modal__input {
        width: 270px;
    }

    .modal__container {
        padding-left: 16px;
    }

    .modal__buttons {
        padding-right: 20px;
    }
}
</style>
