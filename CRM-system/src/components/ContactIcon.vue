<template>
    <button class="contacts__icon btn-reset tooltip-icon">
        <div class="tooltip__text">{{ this.value }}</div>
        <img :src="imgSrc" />
    </button>
</template>

<script>
export default {
    name: "ContactsIcon",
    props: ["type", "value"],
    computed: {
        imgSrc: function () {
            return `/img/svg/${this.type}.svg`;
        },
    },
};
</script>

<style scoped>
.tooltip-icon {
    position: relative;
    display: inline-block;
}

.tooltip__text {
    width: 150px;
    background-color: #333333;
    color: #fff;
    font-size: 12px;
    text-align: center;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 123%;
    right: -72px;
    visibility: hidden;
}

.tooltip__text::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    border-style: solid;
    border-color: #273342 transparent transparent transparent;
    margin-left: -5px;
    border-width: 5px;
}

.tooltip-icon:hover .tooltip__text {
    visibility: visible;
}

.contacts__icon {
    margin-right: 7px;
}

@media screen and (width: 320px) {
    .tooltip__text {
        width: 120px;
        font-size: 10px;
    }
}
</style>
