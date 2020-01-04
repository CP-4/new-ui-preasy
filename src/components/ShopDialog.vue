<template lang="html">
<div class="">
  <v-dialog v-model="showShopDialog">
    <v-card>
      <v-card-title class="headline">
        Select a Shop:
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="showShopDialog = !showShopDialog">Close</v-btn>
      </v-card-title>

      <v-card-text>
        <v-card class="mx-auto my-1" outlined v-for="shop in shops" :key="shop.id">
          <v-card-title class="">
            {{ shop.name }}
            <v-spacer></v-spacer>
            <v-btn depressed v-on:click="selectShop(shop.id)">Select</v-btn>
          </v-card-title>
          <v-card-subtitle>{{ shop.address }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="caption grey--text">Single Side</div>
                <span>Rs {{ shop.price_ss }}/page</span>
              </v-col>
              <v-col>
                <div class="caption grey--text">Double Side</div>
                <span>Rs {{ shop.price_ds }}/page</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {
  axiosBase
} from '@/api/axios-base'

export default {
  data() {
    return {
      showShopDialog: false,
      shops: [],
    }
  },

  mounted() {
    this.openShopDialog();
  },

  methods: {
    openShopDialog() {
      this.showShopDialog = true;

      axiosBase.get('/file2/shops/', {
          headers: {
            'Authorization': "bearer " + this.$store.state.accessToken
          },
        }).then(response => this.shops = response.data)
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({
              name: 'logout'
            })
          }
        });
      // console.log(this.shops);
    },
  }

}
</script>

<style lang="css" scoped>
</style>
