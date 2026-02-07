<template>
  <div class="btn-wrapper" ref="wrapperRef" v-if="isVisible">
    <YesButton class="yes-button-class" :yTxt="yesTxt" @clicked="$emit('yesClicked')" />
    <NoButton  :noTxt="noTxt" v-if="canShowNo"  @clicked="$emit('noClicked')" />
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';
import YesButton from './YesButton.vue';
import NoButton from './NoButton.vue';

// Definiujemy co przyjmujemy od StepStart
defineProps({
    yesTxt: String,
    noTxt: String,
    isVisible: Boolean,
    canShowNo: Boolean
});

// Definiujemy co wysyłamy do StepStart
defineEmits(['yesClicked', 'noClicked']);

const wrapperRef = ref(null);

// Wystawiamy kontener dla GSAP (żeby guziki mogły wjechać razem)
defineExpose({
  container: wrapperRef
});
</script>

<style scoped>
.btn-wrapper {
  display: flex;
  gap: 3rem;
  justify-content: center;
  
  /* ZMIANA: Ujemny margines podciągnie przyciski do góry, bliżej karty */
  margin-top: -3rem; 
  
  /* ZMIANA: Zamiast 100vw dajemy 100%, żeby nie rozwalało layoutu na boki */
  width: 100%; 
  
  position: relative;
  z-index: 10; /* Ważne: żeby przyciski były NAD tłem karty, jeśli na nią wejdą */
  
  visibility: hidden;
  opacity: 0;
}
</style>