<template>
<div class="">
  <v-container class="px-4">
    <div class="text-center pt-12 mt-12">
      <div class="pa-4">
        <span class="font-weight-light title grey--text text--darken-2">sign up with </span> <span class="text-uppercase grey--text">
          <span class="headline font-weight-light">pr</span>
          <span class="headline">easy</span>
        </span>
      </div>
    </div>
    <div class="">
      <v-text-field v-model="student_name" label="Name" outlined dense required color="green accent-4"
      hint="Used to identify you at the shop." :rules="rules.required"></v-text-field>
      <v-text-field v-model="phone" label="Phone number" outlined dense required color="green accent-4"
      hint="" :rules="rules.required" type="number"></v-text-field>
      <v-text-field v-model="email" label="Email" outlined dense required color="green accent-4"
      :rules="rules.required"></v-text-field>
      <v-text-field v-model="password" label="Password" outlined dense required color="green accent-4"
      :rules="rules.required" type="password"></v-text-field>
    </div>
    <div class="text-center pa-6">
      <p class="grey--text"></p>
      <v-btn class="green accent-4" large block rounded dark @click="registerUser">Sign up</v-btn>
      <br>
      <div class="text-center">
        <v-row align="center">
          <v-col class="text-center" cols="12">
            <span class="overline grey--text text--darken-2">Already have an account?</span>
            <v-btn class="green--text text--accent-4" text rounded to="login">Log in</v-btn>
          </v-col>
        </v-row>

      </div>
    </div>

  </v-container>
</div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      student_name: '',
      password: '',
      email: '',
      phone: '',
      wrongCred: false, // activates appropriate message if set to true
      rules: {
        required: [val => (val || '').length > 0 || 'This field is required'],

      },
    }
  },

  mounted() {
    this.$store.dispatch('urlanalyticsTrigger', 'register page mounted')
  },

  methods: {
    registerUser() { // call registerUser action
      this.$store.dispatch('registerUser', {
          student_name: this.student_name,
          email: this.email,
          phone: this.phone,
          password: this.password
        })
        .then(() => {
          this.wrongCred = false
          this.$router.push({
            name: 'home'
          })
        })
        .catch(() => {
          // console..log(err)
          this.wrongCred = true // if the credentials were wrong set wrongCred to true
        })
    }
  }
}
</script>

<style scoped>

</style>
