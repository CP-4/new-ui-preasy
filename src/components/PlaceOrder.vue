<template lang="html">
  <div class="modal is-active" v-if="showModal === 'help_modal'">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <p class="title">Huh?</p>
        <br>
        <div class="title is-5 has-text-left is-spaced">
          <p>Upload a file you want to print.</p>
          <p>Select the options.</p>
          <p>Inititate the job.</p>
        </div>
        <br>
        <div class="subtitle is-6 has-text-left">
          We will text you to confirm your order. There are no extra charge.
          you can collect your order from nearby print shop.
        </div>
        <br>
        <button class="button is-dark" v-on:click="closeHelpModal()">Cool!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaceOrder',
  // To use props, they must be declared
  props: {
    parentData: Object,
    stringProp: String,
    title: String
  }

}
</script>

<style lang="css" scoped>
</style>
