<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useCursorHearts } from '@/scripts/useConfettiHearts';

const { startEverything, stopEverything } = useCursorHearts();

onMounted(() => {
  // Uruchamia deszcz i myszkę, gdy showAllButtons zmieni się na false
  startEverything();
});

onUnmounted(() => {
  // Zatrzymuje wszystko, gdyby komponent został usunięty
  stopEverything();
});
</script>

<template>
  <div class="hearts-engine-container"></div>
</template>

<style scoped>
.hearts-engine-container {
  display: none;
}
</style>