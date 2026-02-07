<template>
    <div class="text-container" ref="containerRef" :class="{ 'sad-width': isSad }">
        <p class="one-appear" ref="oneAppear">{{ mainText }}</p>
        
        <p class="two-appear" ref="twoAppear">{{ subText }}</p>
        
        <div class="cat-container">
            <img 
                :src="catGif" 
                alt="cat" 
                id="cat-ask" 
                ref="catAsk" 
                :class="{ 'sad-position': isSad }"
                @mouseenter="startHeartRain" 
                @mouseleave="stopHeartRain">

            <img 
                :src="heartSvg"             
                v-for="heart in hearts" 
                :key="heart.id" 
                class="floating-heart"
                :id="'heart-' + heart.id">
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineExpose, ref, computed } from 'vue';
    import gsap from 'gsap';

    import sadCat from "../assets/sadCat (1).gif";
    import happyCat from "../assets/catWaiting.gif";

    import heart from "../assets/heart.svg";
    import brokenHeart from "../assets/brokenHeart.svg";

    const props = defineProps({
        mainText: String,
        subText: String,
        isSad: Boolean
    });

    const catGif = computed(() => {
        return props.isSad ? sadCat : happyCat;
    });

    const heartSvg = computed(() => {
        return props.isSad ? brokenHeart : heart;
    })

    const hearts = ref([]);
    const containerRef = ref(null);
    let heartCount = 0;
    let heartInterval = null; 

    const oneAppear = ref(null);
    const twoAppear = ref(null);
    const catAsk = ref(null);

    const spawnHeart = () => {
    const id = heartCount++;
    hearts.value.push({ id });

    setTimeout(() => {
        const heartEl = document.querySelector(`#heart-${id}`);
        if (!heartEl) return;

        // Losowe kierunki lotu (rozprysk)
        const destX = (Math.random() - 0.5) * 300; 
        const destY = -300 - Math.random() * 200;

        gsap.to(heartEl, {
            x: destX,
            y: destY,
            opacity: 0,
            rotation: Math.random() * 720,
            scale: Math.random() * 1.5 + 0.5,
            duration: 1.5 + Math.random(),
            ease: "power1.out",
            onComplete: () => {
                hearts.value = hearts.value.filter(h => h.id !== id);
            }
        });
    }, 0);
    };

    const startHeartRain = () => {
        if (heartInterval) return; // Zapobiega dublowaniu
        heartInterval = setInterval(spawnHeart, 100); // Serca co 0.1s
    };

    const stopHeartRain = () => {
        clearInterval(heartInterval);
        heartInterval = null;
    };

    defineExpose({
        container: containerRef, // Poprawiona literówka (było conatiner)
        text1: oneAppear,
        text2: twoAppear,
        cat: catAsk
    });


</script>

<style scoped>

    .floating-heart {
        position: absolute;
        bottom: 40px; /* Start nad kotem */
        right: 80px;  /* Wycentrowane na kocie */
        width: 30px;  /* Rozmiar obrazka serca */
        pointer-events: none; 
        z-index: 100;
    }

    .floating-heart img {
        width: 100%;
        height: auto;
        z-index: 100;
    }

    .one-appear {
        font-size: 2.5rem;
        margin-bottom: 10px;
        visibility: hidden;
        opacity: 0;
        font-weight: bold;
    }

    .one-appear:hover, .two-appear:hover {
        cursor: default;
    }

    #cat-ask:hover {
        cursor: grab;
    }

    .two-appear {
        visibility: hidden;
        opacity: 0;
        font-size: 1.5rem;
        text-align: center;
    }

    #cat-ask {
        position: absolute;
        right: 0;
        height: 220px;
        visibility: hidden;
        opacity: 0;
    }

    .sad-position {
        right: 0;     
        height: 50px;     
        bottom: 0;
    }

    .text-container {
        position: relative;
        background-image: url("@/assets/paperTexture.jpg");
    
        /* Kluczowe właściwości dla jakości: */
        background-size: cover;      /* Rozciągnie zdjęcie tak, by pokryło cały kontener */
        background-position: center; /* Wyśrodkuje teksturę */
        background-repeat: no-repeat;
        
        /* Opcjonalnie: jeśli tekstura jest za ciemna/jasna */
        min-height: 210px;  
        min-width: 700px;         /* Daj kontenerowi wysokość, żeby było widać tło */
        padding: 40px;               /* Oddech dla tekstu wewnątrz tła */
        border-radius: 15px;         /* Ładne zaokrąglenia, jeśli to ma być "kartka" */

        box-shadow:  1rem 1rem 0.5rem rgba(74, 32, 42, 0.7);

        visibility: hidden;
        opacity: 0;
        
        /* Jeśli chcesz, żeby tekstura była ostra na ekranach Retina */
        image-rendering: -webkit-optimize-contrast;
    }

    .sad-width {
        min-height: 250px; 
    }

</style>