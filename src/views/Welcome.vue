<template lang="html">
  <div class="">
    <v-container class="">

      <div class="">
        <div class="text-center">
          <div class="headline">
            Skip the queue and get your printouts first.
          </div>
          <div class=" text-center mt-4 title condensed grey--text text--darken-2 font-weight-light">
            <span>Use <span class="text-uppercase grey--text">
              <span class="headline font-weight-light">pr</span>
              <span class="headline">easy</span>
            </span> to print online.</span>
          </div>
        </div>

        <div class="subtitle-1 grey--text text--darken-4 text-center mt-4">
          <p>Now available in <span class="font-weight-bold">Vidhyanagar</span> across Motabazar, Nanabazar, Bakrol and more.</p>
        </div>
      </div>

      <div class="pt-6">
        <v-card>
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

      <div class="text-center pa-4">
        <p class="overline grey--text text--darken-2">Create account</p>
        <v-btn class="green accent-4 mt-n3" large block rounded dark to="register">Try now!</v-btn>
      </div>

    </v-container>

    <v-container class="black white--text">
      <div class="headline font-weight-light">
        What our customers say:
      </div>
      <div class="subtitle-1 white--text text-center text-justify px-5 mt-6 font-weight-light">
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
        <span class="font-weight-thin subtitle-1 white--text">think print think </span>
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
    }
  },

  mounted() {
    this.$store.dispatch('urlanalyticsTrigger', 'landing page mounted');
  },

  methods: {

    urlanalyticsTrigger(data) {
      this.$store.dispatch('urlanalyticsTrigger', data);
    },
  }

}
</script>

<style lang="css" scoped>
</style>
