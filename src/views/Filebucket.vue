<template lang="html">
  <div class="home">
    <v-container class="pt-8 grey lighten-4">

      <v-card class="my-n5 px-2" v-if="!this.$store.getters.isSetStudentProfile">
        <div class="title is-2 text-center">
          <p>Complete your profile</p>
        </div>
        <div class="title is-5">
          Select:
        </div>
        <v-row class="center my-n5">
          <v-col class="d-flex" cols="4" sm="2" xs="2">
          <v-select
            :items="clg_items"
            v-model="clg_value"
            label="College"
            solo dense chip
          ></v-select>
          </v-col>
          <v-col class="d-flex" cols="4" sm="2" xs="2">
          <v-select
            v-model="branch_value"
            :items="branch_items"
            label="Branch"
            solo dense
          ></v-select>
          </v-col>
          <v-col class="d-flex" cols="4" sm="2" xs="2">
          <v-select
            v-model="year_value"
            :items="year_items"
            label="Year"
            solo dense
          ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="phone_value"
              label="Phone number"
              placeholder="95121XXXXX"
              filled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn block v-on:click="updateStudenProfile()" dark color="deep-purple accent-3">Save</v-btn>

        <v-divider></v-divider>
      </v-card>

      <v-card class="pa-2">
        <div class="subtitle is-6 text-center">
          <p>You can find lab manuals, practicals, study material and other common files here.</p>
        </div>
      </v-card>

      <v-card class="pa-2 my-2" v-if="this.$store.getters.isSetStudentProfile">
        <div class="subtitle is-7 text-center">
          <p class="red--text accent-3">We are collecting files. We will notify you once done!</p>
        </div>
      </v-card>

    </v-container>

  </div>
</template>

<script>

// import {
//   axiosBase
// } from '@/api/axios-base'


export default {
  name: 'filebucket',

  data() {
    return {
      drawer: false,
      clg_items: [
        'GCET',
        // 'other',
      ],
      branch_items: [
        'CI',
        'CP',
        'CH',
        'EC',
        'EE',
        'IT',
        'ME',
        'MH',
      ],
      year_items: [
        'First',
        'Second',
        'Third',
        'Fourth',
      ],
      clg_value: '',
      branch_value: '',
      year_value: '',
      phone_value: '',
    }
  },

  mounted() {
    this.$store.dispatch('urlanalyticsTrigger', 'file bucket')
  },

  methods: {
    updateStudenProfile() {
      this.$store.dispatch('urlanalyticsTrigger', 'update student profile')
      this.$store.dispatch('updateSturentProfile', {
        clg_value: this.clg_value,
        branch_value: this.branch_value,
        year_value: this.year_value,
        phone_value: this.phone_value
      })
    },
  }
}
</script>

<style lang="css" scoped>
</style>
