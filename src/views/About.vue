<template>
  <div class="about">
    <div class="pa-4">
      <p class="overline green--text text--accent-4">Our Mission</p>
      <p class="text-justify">Find ways to make the education system more effective.</p>
      <br>
      <p class="overline green--text text--accent-4">What we do?</p>
      <p class="text-justify">Print utility app is a means to an end. A simple way to save time and efforts. What are some other things we are working on you ask?
       Serve files like practicals, exam notes, lab manuals, etc. so you can easily find them at one place.</p>
      <br>
      <p class="overline green--text text--accent-4">Other projects</p>
      <p class="text-justify">Tired of aimlessly writing hundreds of pages? Don't do that anymore. <span class="green--text text--accent-4" @click="urlanalyticsTrigger('Write with ML')"> ... more</span> </p>
      <p class="text-justify">Book club. A platform to find and share books among your club members. <span class="green--text text--accent-4" @click="urlanalyticsTrigger('Book club')"> ... more</span> </p>
      <br>
      <p class="overline green--text text--accent-4">Contact us</p>
      <p class="text-justify">You can write to us at <a href="mailto:writetopreasy@gmail.com" class="green--text text--accent-4" @click="urlanalyticsTrigger('writetopreasy')">writetopreasy@gmail.com</a></p>

      <p class="text-justify">Interested in some of the projects or have some ideas of your own? Write to use.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {

    }
  },

  mounted() {
    this.$store.dispatch('urlanalyticsTrigger', 'about page mounted');
  },

  methods: {
    urlanalyticsTrigger(data) {
      this.$store.dispatch('urlanalyticsTrigger', data);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
