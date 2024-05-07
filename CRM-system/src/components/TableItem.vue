<template>
    <div class="content">
        <div class="grid">
            <div class="grid__item">{{ id }}</div>
            <div class="grid__item">
                {{ surname }} {{ name }} {{ lastName }}
            </div>
            <div class="grid__item">
                {{ this.formatDate(createdAt) }}
                {{ this.formatTime(createdAt) }}
            </div>
            <div class="grid__item">
                {{ this.formatDate(updatedAt) }}
                {{ this.formatTime(updatedAt) }}
            </div>
            <div class="grid__item">
                <contact-icon
                    v-for="contact in contacts"
                    v-bind="contact"
                    :key="contact.type"
                ></contact-icon>
            </div>
            <div class="grid__item">
                <button
                    class="btn-reset btn change__btn"
                    @click="showEditModal(client)"
                >
                    Изменить
                </button>
                <button
                    class="btn-reset btn delete__btn"
                    @click="deleteClick(client)"
                >
                    Удалить
                </button>
            </div>
        </div>
        <div class="grid-mobile">
            <div class="grid__item-mobile">{{ id }}</div>
            <div class="grid__item-mobile">
                {{ surname }} {{ name }} {{ lastName }}
            </div>
        </div>
        <div class="grid-mobile">
            <div class="grid__item-mobile">
                {{ this.formatDate(createdAt) }}
                {{ this.formatTime(createdAt) }}
            </div>
            <div class="grid__item-mobile">
                {{ this.formatDate(updatedAt) }}
                {{ this.formatTime(updatedAt) }}
            </div>
        </div>
        <div class="grid-mobile">
            <div class="grid__item-mobile">
                <contact-icon
                    v-for="contact in contacts"
                    v-bind="contact"
                    :key="contact.type"
                ></contact-icon>
            </div>
            <div class="grid__item-mobile">
                <button
                    class="btn-reset btn change__btn"
                    @click="showEditModal(client)"
                >
                    Изменить
                </button>
                <button
                    class="btn-reset btn delete__btn"
                    @click="deleteClick(client)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { openDeleteLightbox } from "../helpers/eventBus.js";
import ContactIcon from "./ContactIcon.vue";
export default {
    name: "TableItem",
    components: { ContactIcon },
    props: [
        "id",
        "name",
        "surname",
        "lastName",
        "contacts",
        "id",
        "updatedAt",
        "createdAt",
        "showEditModal",
    ],
    computed: {
        client() {
            return {
                name: this.name,
                surname: this.surname,
                lastName: this.lastName,
                id: this.id,
                contacts: this.contacts,
            };
        },
    },
    methods: {
        padTo2Digits(num) {
            return num.toString().padStart(2, "0");
        },
        formatDate(str) {
            const date = new Date(str);
            return [
                this.padTo2Digits(date.getDate()),
                this.padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join(".");
        },
        formatTime(str) {
            const date = new Date(str);
            return [
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
            ].join(":");
        },
        deleteClick(client) {
            openDeleteLightbox(client);
        },
    },
};
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 30px;
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid #c8c5d1;
}

.grid-mobile {
    display: none;
}

.grid__item:nth-child(1) {
    grid-column: 1/3;
}

.grid__item:nth-child(2) {
    grid-column: 3/5;
}

.grid__item:nth-child(3) {
    grid-column: 5/7;
}

.grid__item:nth-child(4) {
    grid-column: 7/9;
}

.grid__item:nth-child(5) {
    grid-column: 9/11;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
}

.grid__item:nth-child(6) {
    grid-column: 11/13;
}

.grid__item {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #333333;
}

.grid__item-mobile {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #333333;
}

.btn {
    position: relative;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #333333;
    transition: color 0.3s ease-in-out;
}

.change__btn:hover {
    color: #7b61ff;
}

.change__btn:active {
    color: #9873ff;
}

.delete__btn:hover {
    color: #f06a4d;
}

.delete__btn:active {
    color: #f06a4d;
}

.change__btn {
    margin-right: 30px;
}

.change__btn:after {
    content: "";
    position: absolute;
    display: inline-block;
    top: 0;
    left: -17px;
    background-image: url("/img/svg/edit.svg");
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: cover;
}

.change__btn:active:after {
    background-image: url("/img/svg/loadblue.svg");
}

.delete__btn:after {
    content: "";
    position: absolute;
    display: inline-block;
    top: 0;
    left: -17px;
    background-image: url("/img/svg/cancel.svg");
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: cover;
}

.delete__btn:active:after {
    background-image: url("/img/svg/loadred.svg");
}

@media screen and (max-width: 1024px) {
}

@media screen and (max-width: 768px) {
    .grid {
        padding: 10px;
    }

    .grid__item {
        font-size: 12px;
    }
}

@media screen and (width: 320px) {
    .grid {
        display: none;
    }

    .grid-mobile {
        display: none;
        grid-template-columns: repeat(6, 1fr);
        background-color: white;
        padding: 20px 10px;
        border-bottom: 1px solid #c8c5d1;
    }

    .grid__item-mobile {
        font-size: 12px;
    }

    .table-part_first .grid-mobile:nth-child(2) {
        display: grid;
    }

    .table-part_second .grid-mobile:nth-child(3) {
        display: grid;
    }

    .table-part_third .grid-mobile:nth-child(4) {
        display: grid;
    }

    .grid__item-mobile:nth-child(1) {
        grid-column: 1/4;
    }

    .grid__item-mobile:nth-child(2) {
        grid-column: 4/7;
        display: flex;
    }

    .btn {
        font-size: 12px;
    }

}
</style>
