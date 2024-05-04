<template>
    <div>
        <table-item
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            v-bind:showEditModal="showEditModal"
        ></table-item>
    </div>
</template>

<script>
import TableItem from "./TableItem.vue";
export default {
    props: {
        items: {
            type: Array,
            default: [],
        },
        showEditModal: {
            type: Function,
        },
    },
    name: "TableBody",
    components: { TableItem },
};
</script>

<style scoped>
</style>
