<template>
  <div class="tire-wrapper" ref="tireRef">
    <img src="../assets/tire.svg" alt="tire">
  </div>
</template>

<script setup>
    import { ref } from 'vue';

    const tireRef = ref(null);

    defineExpose({
        container: tireRef
    });
</script>

<style scoped>
    .tire-wrapper {
        position: fixed; /* Stała pozycja względem okna */
        top: -250px;    /* Start nad ekranem */
        right: -250px;  /* Start poza prawą krawędzią */
        width: 200px;
        z-index: 100;
        pointer-events: none;
        /* Usuwamy stąd visibility: hidden, bo GSAP zajmie się autoAlpha */
    }

    .tire-wrapper img {
        width: 100%;
    }
</style>