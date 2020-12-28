<template>
  <div>
    <h1>Welcome To My App</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: this.$store.state
    };
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
