<template>
  <div class="">
    <v-container class="px-4" fill-hight align-center>
      <div class="text-center pt-12 mt-12">
        <div class="pa-4">
          <span class="font-weight-light title grey--text text--darken-2">login to </span> <span class="text-uppercase grey--text">
            <span class="headline font-weight-light">pr</span>
            <span class="headline">easy</span>
          </span>
        </div>
      </div>
      <div class="">
        <v-text-field v-model="email" label="Email" outlined dense required color="green accent-4"
        :rules="rules.required"></v-text-field>
        <v-text-field v-model="password" label="Password" outlined dense required color="green accent-4"
        :rules="rules.required" type="password"></v-text-field>
      </div>
      <div class="text-center pa-6">
        <p class="grey--text"></p>
        <v-btn class="green accent-4" large block rounded dark @click="loginUser">Log in</v-btn>
        <br>
        <div class="text-center">
          <v-row align="center">
            <v-col class="text-center" cols="12">
              <span class="overline grey--text text--darken-2">Don't have an account?</span>
              <v-btn class="green--text text--accent-4" text rounded to="register">Sign up</v-btn>
            </v-col>
          </v-row>

        </div>
      </div>

    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      wrongCred: false, // activates appropriate message if set to true
      rules: {
        required: [val => (val || '').length > 0 || 'This field is required'],

      },
    }
  },

  mounted() {
    this.$store.dispatch('urlanalyticsTrigger', 'login page mounted')
  },

  methods: {
    loginUser() { // call loginUser action
      this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.wrongCred = false
          this.$router.push({
            name: 'home'
          })
        })
        .catch(() => {
          // console.log(err)
          this.wrongCred = true // if the credentials were wrong set wrongCred to true
        })
    },

  }
}
</script>

<style scoped>

</style>
