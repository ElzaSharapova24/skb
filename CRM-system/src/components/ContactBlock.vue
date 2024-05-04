<template>
    <div class="contacts__block">
        <select
            class="contact__select"
            v-model="selected"
            v-on:change="selectChange"
        >
            <option class="contact__select-val" value="phone">Телефон</option>
            <option class="contact__select-val" value="mail">Email</option>
            <option class="contact__select-val" value="Facebook">
                Facebook
            </option>
            <option class="contact__select-val" value="vk">VK</option>
            <option class="contact__select-val" value="other">Другое</option>
        </select>
        <input
            class="contact__input"
            type="text"
            :value="value"
            v-on:input="inputChange($event.target.value)"
        />
        <button
            class="contact__btn btn-reset tooltip"
            v-on:click="deleteContact()"
        >
            <div class="tooltip-text">Удалить контакт</div>
            <svg
                class="svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g opacity="0.7" clip-path="url(#clip0_121_2305)">
                    <path
                        d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"
                        fill="#B0B0B0"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_121_2305">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "ContactBlock",
    props: {
        type: {
            type: String,
        },
        value: {
            type: String,
        },
    },
    methods: {
        inputChange: function (value) {
            this.$emit("inputChange", value);
        },
        selectChange: function () {
            this.$emit("selectChange", this.selected);
        },
        deleteContact: function () {
            this.$emit("deleteContact");
        },
    },
    data() {
        return {
            selected: this.type,
        };
    },
};
</script>

<style scoped>
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip-text {
    width: 133px;
    background-color: #333333;
    color: #fff;
    font-size: 12px;
    text-align: center;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -39%;
    right: -52px;
    visibility: hidden;
}

.tooltip-text::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    border-style: solid;
    border-color: #273342 transparent transparent transparent;
    margin-left: -5px;
    border-width: 5px;
}

.tooltip:hover .tooltip-text {
    visibility: visible;
}

.contacts__block {
    position: relative;
    margin-bottom: 15px;
}

.contact__select {
    width: 123px;
    height: 40px;
    border: none;
    padding-left: 12px;
    outline: 1px solid #c8c5d1;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    line-height: 17px;
    font-size: 12px;
    background-color: #c8c5d1;
}

.contact__input {
    width: 240px;
    height: 38px;
    border: none;
    background-color: #ffffff;
    outline: 1px solid #c8c5d1;
    padding-left: 12px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    line-height: 17px;
    font-size: 12px;
}

.contact__select-val {
    background-color: #b0b0b0;
}

.contact__btn {
    position: absolute;
    top: 0;
    right: 6px;
    width: 27px;
    height: 40px;
    outline: 1px solid #c8c5d1;
    background-color: #e7e5eb;
    transition: outline 0.3s ease-in-out, fill 0.3s ease-in-out;
}

.contact__btn:hover {
    outline: 1px solid #f06a4d;
}

.contact__btn:hover svg path {
    fill: #f06a4d;
}

.svg {
    fill: #b0b0b0;
    width: 20px;
    height: 20px;
}

@media screen and (width: 320px) {
    .contacts__block {
        display: flex;
    }

    .contact__btn {
        right: 0;
    }

    .tooltip-text {
        width: 53px;
        top: -73%;
        right: -46%;
    }
}
</style>
