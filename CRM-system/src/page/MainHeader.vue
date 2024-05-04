<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <div class="header__logo" >
            <button class="header__btn btn-reset">
                <img class="header__icon" src="/img/svg/logo_skb.svg" alt="Логотип skb.">
            </button>
        </div>
        <form id="form" class="header__form" action="#">
          <input type="text" class="header__input input-reset" id="input" placeholder="Введите запрос" @input="event => change(event.target.value)">
        </form>
      </div>
    </div>
  </header>

</template>

<script>
export default {
    name: 'MainHeader',
    data() {
      return {
          timerId: null
      }
    },
    methods: {
        change: function (value){
            if (typeof value === 'string') {
                clearTimeout(this.timerId);
                this.timerId = setTimeout(() => {
                    this.$emit('print', value)
                }, 300);
            }
        }
    }
}
</script>

<style scoped>
    .header__btn {
        position: relative;
    }
</style>
