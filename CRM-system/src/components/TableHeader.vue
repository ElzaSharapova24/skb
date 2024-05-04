<template>
    <div class="list">
        <div class="list__item" v-for="item in items" :key="item.title">
            <table-header-item
                v-bind="item"
                v-bind:sorting-field="this.sortingSettings.sortingField"
            ></table-header-item>
        </div>
    </div>
</template>

<script>
import TableHeaderItem from "./TableHeaderItem.vue";
export default {
    name: "TableHeader",
    components: { TableHeaderItem },
    props: ["sortingSettings"],
    computed: {
        items() {
            return [
                {
                    title: "ID",
                    className: "table__btn",
                    sortingAsc: this.sortingSettings.id,
                    name: "id",
                },
                {
                    title: "Фамилия Имя Отчество",
                    className: "table__btn",
                    sortingAsc: this.sortingSettings.fio,
                    name: "fio",
                },
                {
                    title: "Дата и время создания",
                    className: "table__btn",
                    sortingAsc: this.sortingSettings.created,
                    name: "created",
                },
                {
                    title: "Последние изменения",
                    className: "table__btn",
                    sortingAsc: this.sortingSettings.modified,
                    name: "modified",
                },
                {
                    title: "Контакты",
                    className: "table__btn",
                    sortingAsc: null,
                },
                {
                    title: "Действия",
                    className: "table__btn",
                    sortingAsc: null,
                },
            ];
        },
    },
};
</script>

<style scoped>
.list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 30px;
    padding-left: 18px;
}

.list__item:nth-child(1) {
    grid-column: 1/3;
}

.list__item:nth-child(2) {
    grid-column: 3/5;
}

.list__item:nth-child(3) {
    grid-column: 5/7;
}

.list__item:nth-child(4) {
    grid-column: 7/9;
}

.list__item:nth-child(5) {
    grid-column: 9/11;
}

.list__item:nth-child(6) {
    grid-column: 11/13;
}

.btn-arrow:before {
    content: "";
    position: absolute;
    display: inline-block;
    top: 3px;
    right: -12px;
    background-image: url("/img/svg/arrow_downward.svg");
    width: 12px;
    height: 12px;
    background-repeat: no-repeat;
    background-size: cover;
}

.btn-arrow-btm:before {
    content: "";
    position: absolute;
    display: inline-block;
    top: 3px;
    right: -12px;
    background-image: url("/img/svg/arrow_downward1.svg");
    width: 12px;
    height: 12px;
    background-repeat: no-repeat;
    background-size: cover;
}

.filter {
    padding-left: 8px;
}


@media screen and (width: 320px) {
    .list {
        padding-left: 10px;
        gap: 0;
        grid-template-columns: repeat(6, 1fr);
    }

    .list__item {
        display: none;
    }

    .table-part_first .list__item:nth-child(1) {
        display: block;
        grid-column: 1/4;
    }

    .table-part_first .list__item:nth-child(2) {
        display: block;
        grid-column: 4/7;
    }

    .table-part_second .list__item:nth-child(3) {
        display: block;
        grid-column: 1/4;
    }

    .table-part_second .list__item:nth-child(4) {
        display: block;
        grid-column: 4/7;
    }

    .table-part_third .list__item:nth-child(5) {
        display: block;
        grid-column: 1/4;
    }

    .table-part_third .list__item:nth-child(6) {
        display: block;
        grid-column: 4/7;
    }
}
</style>
