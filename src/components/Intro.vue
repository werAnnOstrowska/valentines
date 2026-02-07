<template>
    <div class="start-title">
        <h1 ref="titleRef">Hej bubi!!!</h1>
        <div class="image">
            <img id="zygzak" ref="zygzakRef" alt="zygzak" src="../assets/lightning-mcqueen.svg">
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import gsap from 'gsap';

    const zygzakRef = ref(null);
    const titleRef = ref(null);

    defineExpose({
        zygzak: zygzakRef,
        title: titleRef
    });

</script>

<style scoped>

    .start-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        /* gap: 30px; */
        width: 100%; /* Ważne! */
        margin-top: -8rem;
        /* margin-bottom: 40px; */
        padding: 0;
    }

    .image {
        width: 400px; 
        height: auto;
        position: relative;
    }

    #zygzak {
        width: 100%;
        height: auto;
        transform: scale(1.3); /* To powiększy Zygzaka w środku bez ujemnych marginesów */
    }

    h1 {
        font-size: 4rem; /* Napis odzyska moc */
        white-space: nowrap;
        color: rgb(74, 32, 42);
    }

</style>