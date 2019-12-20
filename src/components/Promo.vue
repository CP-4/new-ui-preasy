<template lang="html">
<div class="">
  Promo
</div>
</template>

<script>
export default {
  name: 'promo',

  mounted() {
    this.redirectToHome();
  },

  computed: {
    isActiveMyPrintTray: function() {
      return this.active_tab === 'my_print_tray';
    },
  },

  methods: {
    redirectToHome() {
      var routerPath = this.$route;
      var promoCode = routerPath.path.split('/').slice(-1)[0];

      this.$store.dispatch('urlanalyticsTrigger', promoCode);
      this.$store.dispatch('updatePrmoCode', promoCode)

      this.$router.push({
        name: 'home'
      })
    }
  }

}
</script>

<style lang="css" scoped>
</style>
