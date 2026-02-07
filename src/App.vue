<script setup>
  import stepStart from "./views/stepStart.vue";

</script>

<template>
  <main>
    <stepStart />
  </main>
</template>

<style scoped>
  main {
    display: block; /* Zmieniamy z flex na block */
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden; /* Podwójne zabezpieczenie przed scrollem */
  }
</style>
