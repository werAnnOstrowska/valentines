<script setup>
import { onMounted, ref, nextTick } from 'vue';
import gsap from 'gsap';

// Komponenty
import Intro from '@/components/Intro.vue';
import ValentineCard from '@/components/ValentineCard.vue';
import Buttons from '@/components/Buttons.vue';
import NoTire from '@/components/noTire.vue';
import Confetti from '@/components/Confetti.vue';
import NegativeGifOverlay from '@/components/NegativeGifOverlay.vue';
import PositiveGifOverlay from '@/components/PositiveGifOverlay.vue';


// Logika zewnętrzna (Composables)
import { useSoundEffects } from '@/scripts/useSoundEffects';

import { useValetineStory } from '@/scripts/useValentineStory';
import { useIntroAnimation } from '@/scripts/useAnimationTimeline';

const { 
    mainText, 
    subText, 
    processNoClick, 
    processYesClick, 
    showNoButton, 
    showAllButtons, 
    isSad, 
    yesBtnText, 
    showTireAnimation,
    noCount,
    yesCount 
} = useValetineStory();

const { playIntro } = useIntroAnimation();

const { playNoSound, playYesSound } = useSoundEffects();

// Referencje do komponentów
const introComp = ref(null);
const cardComp = ref(null);
const btnComp = ref(null);
const tireComp = ref(null);
const ngifComp = ref(null);
const pgifComp = ref(null);

// Stan lokalny dla animacji
const yesScale = ref(1);
const noScale = ref(1);
const tirePlayed = ref(false);

const handleNo = async () => {
    // 1. Dźwięk i Gify (używamy aktualnego noCount.value)
    playNoSound(noCount.value);

    if (ngifComp.value) {
        ngifComp.value.spawnGif(noCount.value);
    }
    
    // 2. LOGIKA ZMIANY TEKSTU (TYLKO RAZ!)
    // To zwiększy noCount.value o 1 w useValentineStory
    processNoClick();

    // 3. Logika animacji opony (zostaje bez zmian)
    if (showTireAnimation.value && !tirePlayed.value) {
        await nextTick();
        if (tireComp.value?.container) {
            const tire = tireComp.value.container;
            tirePlayed.value = true;

            gsap.fromTo(tire, 
                { autoAlpha: 0, x: 0, y: 0, rotation: 0 },
                { 
                    autoAlpha: 1, 
                    x: -400, 
                    y: 500, 
                    rotation: 720, 
                    duration: 1.5, 
                    ease: "bounce.out" 
                }
            );
        }
    }

    // 4. Skalowanie przycisków
    yesScale.value += 0.2;
    noScale.value -= 0.1;

    gsap.to(".yes-button-class", { 
        scale: yesScale.value, 
        duration: 0.3, 
        ease: "back.out(1.7)" 
    });

    const newGap = 3 + (yesScale.value - 1) * 8; 
    if (btnComp.value?.container) {
        gsap.to(btnComp.value.container, { 
            gap: `${newGap}rem`, 
            duration: 0.3 
        });
    }

    // 5. Potrząsanie kartą
    gsap.to(cardComp.value.container, {
        keyframes: [
            { x: -10, duration: 0.05 },
            { x: 10, duration: 0.05 },
            { x: -10, duration: 0.05 },
            { x: 10, duration: 0.05 },
            { x: 0, duration: 0.05 }
        ],
        ease: "none"
    });
};

const handleYes = () => {
    playYesSound(yesCount.value);
    
    if (pgifComp.value) {
        pgifComp.value.spawnGif(yesCount.value);
    }
    processYesClick();
    noScale.value -= 0.1;

    gsap.to(cardComp.value.container, {
        scale: 1.02,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
};

onMounted(() => {
    if (introComp.value && cardComp.value) {
        playIntro({
            zygzak: introComp.value.zygzak,
            title: introComp.value.title,
            cardContainer: cardComp.value.container,
            text1: cardComp.value.text1,
            text2: cardComp.value.text2,
            cat: cardComp.value.cat,
            btnContainer: btnComp.value.container
        });
    }
});
</script>

<template>
    <div class="main-wrapper">
      
      <Intro ref="introComp" />
      <NoTire v-if="showTireAnimation" ref="tireComp"/>

      <NegativeGifOverlay ref="ngifComp" />
      <PositiveGifOverlay ref="pgifComp" />

        <ValentineCard 
            ref="cardComp"
            :mainText="mainText"
            :subText="subText"
            :isSad="isSad"
        />

        <Buttons 
            v-if="showAllButtons"
            ref="btnComp"
            :yesTxt="yesBtnText"
            :noTxt="'Nie...'"
            :isVisible="showAllButtons"
            :canShowNo="showNoButton"
            @yesClicked="handleYes"
            @noClicked="handleNo"
        />

        <Confetti v-else />
    </div>
</template>

<style scoped>
.main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
    gap: 0;
}

/* 1. Gify - muszą być bardzo wysoko */
:deep(.gif-overlay-container) {
    position: fixed !important;
    z-index: 80 !important; /* Wyżej niż opona (zazwyczaj 1-50) */
    pointer-events: none;
}

/* 2. Opona - musi być niżej niż gify */
:deep(.tire-wrapper-class) { /* sprawdź czy Twoja opona ma taką klasę lub użyj refa */
    position: relative;
    z-index: 30 !important;
}

/* 3. Przyciski - absolutny szczyt, żebyś mogła je klikać */
:deep(.btn-wrapper) {
    position: relative;
    z-index: 100 !important;
}
</style>