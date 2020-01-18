<template>
<div>
  <nav>

    <v-app-bar dense flat app class="grey lighten-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="grey--text" />
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">pr</span>
        <span>easy</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed rounded color="grey lighten-2 purple--text" @click="openShopDialog()" v-if="this.$store.getters.loggedIn">{{ shop_name }}</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app dark color="#9652ff">
      <v-list dense>
        <v-list-item link to="/" v-if="this.$store.getters.loggedIn">
          <v-list-item-action>
            <v-icon>mdi-cloud-print-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Print Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="bucket" v-if="this.$store.getters.loggedIn">
          <v-list-item-action>
            <v-icon>mdi-file</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>File Bucket</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="landing" v-if="!this.$store.getters.loggedIn">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="about">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About Us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="this.$store.getters.loggedIn">
        <div class="pa-2">
          <v-btn block to="logout">
            Logout
            <v-icon right>mdi-logout-variant</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>

  <v-dialog fullscreen v-model="showShopDialog">
    <v-card class="grey lighten-2">
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
            <v-btn depressed fab small class="mx-1 blue--text" :href=shop.gmap_url target="_blank" v-on:click="openMap()">
              <v-icon>mdi-google-maps</v-icon>
            </v-btn>
            <v-btn class="grey lighten-2 purple--text" depressed v-on:click="selectShop(shop.id)">Select</v-btn>
          </v-card-title>
          <v-card-subtitle>{{ shop.address }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="caption grey--text">Single Side</div>
                <span>&#8377;{{ shop.price_ss }}/page</span>
              </v-col>
              <v-col>
                <div class="caption grey--text">Double Side</div>
                <span>&#8377;{{ shop.price_ds }}/page</span>
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
      drawer: false,
      shopName: "Select Shop",
      showShopDialog: false,
      shops: [],
      shop: {},

      // TODO: shopName is replaced by shop_name computed value. clean up shopName
    }
  },

  computed: {
    shop_name: {
      get: function() {
        var shop = this.$store.getters.getShop;
        if (shop) {
          return shop.name;
        } else {
          return "select shop";
        }
      }
    }
  },

  mounted() {
    this.getStoreShopId();
  },

  methods: {
    openMap() {
      // alert("no!");
      this.$store.dispatch('urlanalyticsTrigger', 'navbar->open map')
    },

    selectShop(shopId) {
      this.$store.dispatch('urlanalyticsTrigger', 'navbar->shop selected')
      var shop = this.shops.find(shop => shop.id == shopId);
      // console.log(this.shops);
      this.shopName = shop.name;
      this.showShopDialog = false;
      this.$store.dispatch('updateShopId', shop);
    },

    openShopDialog() {

      this.$store.dispatch('urlanalyticsTrigger', 'vanbar->shop dialog')
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

    getStoreShopId() {
      var shopId = this.$store.getters.getShopId;
      var shop;
      if (shopId) {
        axiosBase.get('/file2/shops/' + shopId)
          .then(response => {
            // console.log(response);
            shop = response.data;
            this.shopName = shop.name;
            this.$store.dispatch('updateShopId', shop);
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch('clearShopId');
          });
      }
    },
  }
}
</script>

<style>
</style>
