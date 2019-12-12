<template>
<div>
  <nav>

    <v-app-bar dense flat app class="grey lighten-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="grey--text" />
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">pr</span>
        <span>easy</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app dark color="#9652ff">
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cloud-print-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Print Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-file</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Assignments</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block to="logout">
            Logout
            <v-icon right>mdi-logout-variant</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>


  </nav>
</div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  }
}
</script>

<style>
</style>
