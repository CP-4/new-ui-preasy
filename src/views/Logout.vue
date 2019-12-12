<template>
<div class="log">
</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('logoutUser');
    this.$router.push({
      name: 'Login'
    });
  }
}
</script>

<style scoped>
</style>
