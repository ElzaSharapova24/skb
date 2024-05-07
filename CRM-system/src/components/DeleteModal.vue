<template>
    <div v-if="show" class="delete__modal-shadow" @click.self="closeModal">
        <div class="delete__modal">
            <div class="delete__modal-close" @click="closeModal">╳</div>
            <slot name="title">
                <h3 class="delete__modal-title">Удалить клиента</h3>
            </slot>
            <slot name="modal__body">
                <div class="delete__modal-content">
                    Вы&nbsp;действительно хотите удалить данного клиента?
                </div>
                <div class="delete__error" v-if="error">Не удалось удалить клиента</div>
            </slot>
            <slot name="delete__footer">
                <div class="delete__modal-footer">
                    <button
                        class="delete__modal-button btn-reset"
                        @click="this.delete"
                    >
                        Удалить
                    </button>
                    <div class="delete__modal-btn" @click="closeModal">
                        Отмена
                    </div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import { deleteClient, openDeleteLightbox } from "../helpers/eventBus.js";

export default {
    name: "DeleteModal",
    data: function () {
        return {
            show: false,
            error: false,
        };
    },
    props: {
        currentClient: {
            type: Object,
        },
    },
    watch: {
        currentClient: function () {
            this.init();
        },
    },
    methods: {
        closeModal: function () {
            this.show = false;
            this.error = false;
        },
        init() {
            this.id = this.currentClient.id;
        },
        delete() {
            const callbacks = {
                ifSuccess: () => {
                    this.closeModal();
                },
                ifError: () => {
                    this.error = true;
                }
            }
            deleteClient(this.id, callbacks);

        },
    },
};
</script>

<style scoped>
.delete__modal-shadow {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
}

.delete__modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    width: 450px;
    height: auto;
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.delete__modal-close {
    border-radius: 50%;
    color: #b0b0b0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 18px;
    right: 17px;
    width: 28px;
    height: 28px;
    cursor: pointer;
}

.delete__modal-title {
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #333333;
    padding-top: 24px;
    padding-right: 29px;
    margin-bottom: 12px;
}

.delete__modal-content {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #333333;
    width: 275px;
    text-align: center;
    margin-bottom: 26px;
}

.delete__modal-button {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    background-color: #9873ff;
    color: #fff;
    padding: 15px 35px;
    font-size: 14px;
    line-height: 100%;
    margin-bottom: 5px;
    transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.delete__error {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 12px;
    width: 250px;
    text-align: center;
    line-height: 20px;
    color: red;
    margin-bottom: 10px;
}

.delete__modal-footer {
    padding-bottom: 10px;
}

.delete__modal-button:hover {
    background-color: #7b61ff;
}

.delete__modal-button:active {
    background-color: #9873ff;
    border: 3px solid #7b61ff;
}

.delete__modal-btn {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: #333333;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
}

.delete__modal-btn:hover {
    color: #7b61ff;
}
.delete__modal-btn:active {
    color: #9873ff;
}

@media screen and (max-width: 768px) {
    .delete__modal-shadow {
        min-height: 118%;
    }
}

@media screen and (min-width: 320px) {
    .delete__modal {
        width: 300px;
        top: 49%;
    }
}
</style>
