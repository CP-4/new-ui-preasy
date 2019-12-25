<template lang="html">
  <div class="">
    <v-container>

      <div class="pt-12 mt-12">
        <div class="text-center">
          <div class="headline">
            Stand for things that matter.
          </div>
          <div class=" pl-5 title condensed mt-n2 grey--text text--darken-2 font-weight-light">
            <span>But never again to get your print-outs.</span>
          </div>
        </div>
        <div class="subtitle-1 grey--text text--darken-4 text-center mt-12">
          <p>Print files online and collect them from a print shop next to you.</p>
          <p>Find and share lab manuals, exam notes, practicals, index at one place.</p>
        </div>
      </div>
      <div class="text-center pa-6">
        <p class="grey--text"></p>
        <v-btn class="green accent-4" large block rounded dark to="register">Create account</v-btn>
        <br>
        <p class="overline grey--text text--darken-2">Already a user?</p>
        <v-btn class="white--text mt-n3" large dark block rounded to="login">Log in</v-btn>
      </div>


    </v-container>

    <v-footer absolute class="text-center">
      <v-col class="text-center" cols="12">
        <div class="text-center">
          <v-btn depressed rounded color="grey lighten-2 purple--text" @click="showHowDialog('show how dialog')">
            How it works!
          </v-btn>
        </div>
        <div class="text-center">
          <p class="overline grey--text text--darken-2">Add power instant-tele-printation to your skill!</p>
        </div>
      </v-col>
    </v-footer>

    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title class="headline">How it works!</v-card-title>

        <v-card-text>
          <span class="overline font-weight-bold">Skill: <span class="subtitle-1">Instant-tele-printation</span></span>
          <div class="">
            <span class="overline font-weight-bold">Step 1:</span>
            <br>
            <span class="black--text"><span class="font-weight-bold">Upload file</span> and select print options.</span>
            <br><br>
            <span class="overline font-weight-bold">Step 2:</span>
            <br>
            <span class="black--text"><span class="font-weight-bold">Place Order</span>. The files will be printed automatically at the shop.</span>
            <br><br>
            <span class="overline font-weight-bold">Step 3:</span>
            <br>
            <span class="black--text"><span class="font-weight-bold">Pick Up</span>. Tap 'Here to Pick up' in the app when you reach the shop. A unique <span class="overline">#Fileid</span> is used to identify your file and deliver it to you.</span>
            <br><br>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="hideHowDialog('How.what')">
            What?
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="hideHowDialog('How.okay')">
            Okay!
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'landing',

  data() {
    return {
      showDialog: false,
    }
  },

  mounted() {
    this.$store.dispatch('urlanalyticsTrigger', 'landing page mounted');
  },

  methods: {
    showHowDialog(data) {
      this.urlanalyticsTrigger(data);
      this.showDialog = true;
    },

    hideHowDialog(data) {
      this.showDialog = false;
      this.urlanalyticsTrigger(data);
    },

    urlanalyticsTrigger(data) {
      this.$store.dispatch('urlanalyticsTrigger', data);
    },
  }

}
</script>

<style lang="css" scoped>
</style>
