<!-- <template>
  <button class="no-btn" @click="$emit('clicked')">
    {{ noTxt }}
  </button>
</template> -->

<template>
  <button 
    class="no-btn no-button-class" 
    @click="$emit('clicked')"
  >
    {{ noTxt }}
    <span class="shine-effect"></span>
    <div class="border-shiny-mask">
      <div class="border-shiny-glow"></div>
    </div>
  </button>
</template>

<script setup>
defineProps({
  noTxt: String
});

// Definiujemy zdarzenie, które przycisk może wysłać
defineEmits(['clicked']);
</script>

<style scoped>
.no-btn {
    font-size: 2rem;
    background: #4a202a;
    padding: 1rem 2rem;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    color: white;
    transition: transform 0.2s;
    max-height: fit-content;
    position: relative;
    box-shadow: 0.5rem 0.5rem 0.5rem rgba(74, 32, 42, 0.7);
    z-index: 1;
}
.no-btn:hover {
    transform: scale(1.1);
}

.border-shiny-mask {
  position: absolute;
  inset: 0;
  border-radius: 50px;
  padding: 2px;
  -webkit-mask: linear-gradient(#f1738a 0 0) content-box, linear-gradient(#f1738a 0 0) border-box;
  mask: linear-gradient(#f1738a 0 0) content-box, linear-gradient(#f1738a 0 0) border-box;
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
    background: conic-gradient(from 0deg, transparent 0%, #f1738a 10%, transparent 20%);
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

/* 3. KLUCZ: Pokazujemy maskę TYLKO gdy najeżdżamy na PRZYCISK (.no-btn) */
.no-btn:hover .border-shiny-mask,
.no-btn:active .border-shiny-mask {
  opacity: 1;
}

/* Opcjonalnie: Przyspieszamy obrót na hover, żeby efekt był bardziej agresywny */
.no-btn:hover .border-shiny-glow {
  animation-duration: 1.5s;
}

@keyframes rotateShine {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

</style>