<template>
  <v-app class="grey lighten-4">

    <Navbar/>

    <v-content class="grey lighten-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),

  mounted() {
    this.$store.dispatch('urlanalyticsLinkOpen', 'App loaded')
  }
};
</script>
