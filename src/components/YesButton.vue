<template>
  <button 
    class="yes-btn yes-button-class" 
    @click="handleClick"
  >
    {{ yTxt }}
    <span class="shine-effect"></span>
    <div class="border-shiny-mask">
      <div class="border-shiny-glow"></div>
    </div>
  </button>
</template>

<script setup>

import { useHeartBurst } from '@/scripts/useHeartBurst';

defineProps({
  yTxt: String
});

const emit = defineEmits(['clicked']);
const { burst } = useHeartBurst();

const handleClick = (event) => {
  // 1. Odpal fizyczny wystrzał serc
  burst(event);
  
  // 2. Wyślij zdarzenie do rodzica
  emit('clicked');
};
</script>

<style scoped>
.yes-btn {
    margin: 0;
    font-size: 2rem;
    background: rgb(241, 115, 138);
    padding: 1rem 2rem;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    color: white;
    transition: transform 0.2s;
    position: relative;
    box-shadow: 0.5rem 0.5rem 0.5rem rgba(74, 32, 42, 0.7);
    z-index: 1;
}
.shine-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    overflow: hidden;
    z-index: -1;
}

.shine-effect::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 650ms;
}

.yes-btn:hover .shine-effect::before {
    left: 100%;
}

.yes-btn:hover {
    transform: scale(1.1);
    /* border: solid 4px white; */
}

.yes-btn:active {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2), rgb(241, 115, 138));
}

.border-shiny-mask {
  position: absolute;
  inset: 0;
  border-radius: 50px;
  padding: 2px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box;
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
  
  /* UKRYWAMY NA START */
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 2. Glow musi być wycentrowany i animować się w tle, 
      nawet jeśli go nie widać */
.border-shiny-glow {
    background: conic-gradient(from 0deg, transparent 0%, #fff 10%, transparent 20%);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400%;
    aspect-ratio: 1;
    margin-left: -200%; 
    margin-top: -200%;
    animation: rotateShine 3s linear infinite;
    transform-origin: center;
}

/* 3. KLUCZ: Pokazujemy maskę TYLKO gdy najeżdżamy na PRZYCISK (.yes-btn) */
.yes-btn:hover .border-shiny-mask,
.yes-btn:active .border-shiny-mask {
  opacity: 1;
}

/* Opcjonalnie: Przyspieszamy obrót na hover, żeby efekt był bardziej agresywny */
.yes-btn:hover .border-shiny-glow {
  animation-duration: 1.5s;
}

@keyframes rotateShine {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>