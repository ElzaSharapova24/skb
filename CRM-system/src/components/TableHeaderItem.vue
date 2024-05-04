<template>
    <!--    btn-arrow-btm -->
    <button :class="classObject" @click="changeSortClick">
        {{ title }}
    </button>
</template>

<script>
import { changeSort } from "../helpers/eventBus.js";

export default {
    name: "TableHeaderItem",
    props: {
        sortingAsc: {
            type: Boolean,
        },
        title: {
            type: String,
        },
        className: {
            type: String,
        },
        sortingField: {
            type: String,
        },
        name: {
            type: String,
        },
    },
    computed: {
        classObject: function () {
            return {
                "btn-reset": true,
                table__btn: true,
                "btn-arrow": this.sortingAsc === false,
                "btn-arrow-btm": this.sortingAsc === true,
                [this.className]: !!this.className,
                "table__btn-active": this.name === this.sortingField,
            };
        },
    },
    methods: {
        changeSortClick() {
            if (typeof this.sortingAsc === "boolean") {
                changeSort(this.name, !this.sortingAsc);
            }
        },
    },
};
</script>

<style scoped></style>
