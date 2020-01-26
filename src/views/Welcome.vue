<template lang="html">
  <div class="">
    <v-container class="">

      <div class="text-center">
        <div class="">
          <div class="headline">
            Skip the queue and get your printouts first.
          </div>
        </div>

        <v-btn bottom rounded depressed class="ma-5" dark color="grey" @click="urlanalyticsTrigger('vvn btn clk')">
          <v-icon dark left>mdi-map-marker</v-icon>
          Vidhyanagar, Anand
        </v-btn>

        <!-- <div class="subtitle-1 grey--text text--darken-4 text-center mt-4">
          <p>Now available in <span class="font-weight-bold">Vidhyanagar</span> across Motabazar, Nanabazar, Bakrol and more.</p>
        </div> -->
      </div>

      <div class=" text-center mt-4 headline condensed grey--text ">
        <span>Sign up to print online and skip the queue.</span>
      </div>

      <div class="">
        <v-container class="">
          <div class="">
            <v-text-field v-model="student_name" label="Full Name" outlined dense required color="green accent-4"
            hint="Used to identify you at the shop." :rules="rules.required"></v-text-field>
            <v-text-field v-model="phone" label="Mobile Number" outlined dense required color="green accent-4"
            hint="" :rules="rules.required" type="number"></v-text-field>
            <v-text-field v-model="email" label="Email" outlined dense required color="green accent-4"
            :rules="rules.required"></v-text-field>
            <v-text-field v-model="password" label="Password" outlined dense required color="green accent-4"
            :rules="rules.required" type="password"></v-text-field>
          </div>
          <div class="text-center mt-n4">
            <p class="grey--text"></p>
            <v-btn class="green accent-4" large block rounded dark @click="registerUser">Sign up</v-btn>
            <br>
            <div class="text-center mt-n4">
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

      <!-- <div class="text-center pa-4">
        <p class="overline grey--text text--darken-2">Create account</p>
        <v-btn class="green accent-4 mt-n3" large block rounded dark to="register">Try now!</v-btn>
      </div> -->



    </v-container>

    <v-container class="grey lighten-4 ">
      <div class="pt-6">
        <v-card flat>
          <v-card-title class="headline">How it works!</v-card-title>
          <v-card-text>
            <div class="">
              <span class="overline font-weight-bold">Step 1:</span>
              <br>
              <span class="black--text subtitle-1"><span class="font-weight-bold">Print online.</span> Upload files and select a shop.</span>
              <br><br>
              <span class="overline font-weight-bold">Step 2:</span>
              <br>
              <span class="black--text subtitle-1"><span class="font-weight-bold"></span>Reach the shop as files get printed.</span>
              <br><br>
              <span class="overline font-weight-bold">Step 3:</span>
              <br>
              <span class="black--text subtitle-1"><span class="font-weight-bold">Grab your files.</span> No waiting. Guranteed ontime delivery</span>
              <br><br>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <div class="headline font-weight-regular mt-4">
        What our customers say:
      </div>
      <div class="subtitle-1 text-center text-justify px-5 mt-6 font-weight-regular">
        <p><span class="font-weight-bold green--text text--accent-3">300+ students</span> and working professionals in Vidhyanagar use PREASY everyday to skip the queue, save time and get hassle free printouts.</p>
      </div>

      <v-carousel cycle height="200" hide-delimiter-background :show-arrows="false" dark continuous delimiter-icon="mdi-minus">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">

          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="body-1  pa-6 font-weight-light white--text">{{ slide }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <br><br><br>
      <div class="text-right">
        <span class="font-weight-light subtitle-1 grey--text text--darken-2">think print think </span>
        <span class="text-uppercase grey--text">
          <span class="subtitle-1 font-weight-light">pr</span>
          <span class="subtitle-1">easy</span>
        </span>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'welcome',

  data() {
    return {
      showDialog: false,
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
        ],
        slides: [
          'I use Preasy to print files while on my way to college and pick my files on the way. It is very simple to use, a must for students. - Khushi Patel',
          "I love this app. Earlier I had to wait at the shop to get printouts and xerox, now I use Preasy to place orders online and grab my files in seconds. - Raj Patel, GCET",
          'Sharing documents on Email and Whatsapp is not safe at all. Preasy is very secure and documents are not shared or stored at shops. - Parshva Oza',
          'I dont like giving my personal number at shops. Preasy\'s strict privacy policy keeps my personal information and files secure. - Aditi Shah',
        ],
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
    this.$store.dispatch('urlanalyticsTrigger', 'landing page mounted');
  },

  methods: {

    urlanalyticsTrigger(data) {
      this.$store.dispatch('urlanalyticsTrigger', data);
    },

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
        .catch(err => {
          console.log(err);
          this.wrongCred = true // if the credentials were wrong set wrongCred to true
        })
    }
  }

}
</script>

<style lang="css" scoped>
</style>
