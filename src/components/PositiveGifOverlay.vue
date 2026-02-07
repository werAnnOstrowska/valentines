<script setup>
import { ref, defineExpose } from 'vue';
import gsap from 'gsap';

// Importuj swoje gify
import gif1 from "../assets/yippieCat.gif";
import gif2 from "../assets/GOTJorah.gif";
import gif3 from "../assets/sealFlower.gif";
import gif4 from "../assets/CatKiss.gif";


const gifList = [gif1, gif2, gif3, gif4]; // Tablica z gifami
const activeGifs = ref([]);
let counter = 0;

const spawnGif = (index) => {
  const gifUrl = gifList[index % gifList.length];
  const id = counter++;
  
  // Losowa pozycja startowa (poza ekranem lub w losowym miejscu)
  const randomX = Math.random() * (window.innerWidth - 200);
  const randomY = Math.random() * (window.innerHeight - 200);

  activeGifs.value.push({ id, url: gifUrl, x: randomX, y: randomY });

  // Animacja wlotu i wylotu
  setTimeout(() => {
    const el = document.getElementById(`overlay-gif-${id}`);
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => {
        activeGifs.value = activeGifs.value.filter(g => g.id !== id);
      }
    });

    tl.fromTo(el, 
      { scale: 0, opacity: 0, rotation: -20 }, 
      { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }
    )
    .to(el, { 
      y: "-=50", // Delikatne płynięcie w górę
      duration: 2, 
      ease: "none" 
    })
    .to(el, { 
      scale: 0, 
      opacity: 0, 
      duration: 0.5, 
      ease: "back.in(1.7)" 
    });
  }, 0);
};

defineExpose({ spawnGif });
</script>

<template>
  <div class="gif-overlay-container">
    <div 
      v-for="gif in activeGifs" 
      :key="gif.id"
      :id="'overlay-gif-' + gif.id"
      class="floating-gif"
      :style="{ left: gif.x + 'px', top: gif.y + 'px' }"
    >
      <img :src="gif.url" alt="funny-gif" />
    </div>
  </div>
</template>

<style scoped>
.gif-overlay-container {
  position: fixed;
  inset: 0;
  pointer-events: none; /* Żeby gify nie blokowały klikania przycisków */
  z-index: 50; /* Nad kartą, ale pod serduszkami (które mają 100000) */
}

.floating-gif {
    position: absolute;
    width: 150px;
    height: auto;
    pointer-events: none; /* DODAJ TO TUTAJ */
    user-select: none;
}

.floating-gif img {
  width: 100%;
  border-radius: 15px;
}
</style>