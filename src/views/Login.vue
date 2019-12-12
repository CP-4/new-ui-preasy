<template>
<section class="hero is-primary is-fullheight grey lighten-4">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="e.g. user@example.com" class="input" required v-model="email">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" required v-model="password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="">
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <v-btn dark class="red accent-3" v-on:click="loginUser">
                      <v-icon left>mdi-login-variant</v-icon>
                      Login
                    </v-btn>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <v-btn dark class="green accent-3" v-on:click="registerUser">
                      <v-icon left>mdi-sign-direction</v-icon>
                      Register
                    </v-btn>
                  </div>
                </div>
              </nav>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      wrongCred: false // activates appropriate message if set to true
    }
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

    registerUser() {
      this.$router.push({
        name: 'register'
      });
    }
  }
}
</script>

<style scoped>

</style>
