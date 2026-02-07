import { ref } from "vue";
import { NO_STORY } from "./noStory";
import { YES_STORY } from "./yesStory";

export function useValetineStory() {
    // noCount będzie teraz naszym głównym indeksem postępu w "męczeniu" użytkownika
    const noCount = ref(0);
    const yesCount = ref(0);

    const isSad = ref(false);

    const mainText = ref("Kręcisz mnie jak Zygzak opony...");
    const subText = ref("Dlatego... Czy zostaniesz moją walentynką?");

    const showNoButton = ref(true);
    const showAllButtons = ref(true);

    const yesBtnText = ref("TAK!");
    const showTireAnimation = ref(false);

    const processNoClick = () => {
        // Animacja opony tylko za pierwszym razem, gdy licznik jest na 0
        if (noCount.value === 0) {
            showTireAnimation.value = true;
        }

        if (noCount.value < NO_STORY.length) {
            const step = NO_STORY[noCount.value];
            mainText.value = step.main;
            subText.value = step.sub;
            
            // Zmieniamy tekst przycisku TAK, jeśli krok go definiuje
            yesBtnText.value = step.yesBtn || "TAK!";

            isSad.value = true;
            noCount.value++; // Licznik idzie do przodu

            // Jeśli doszliśmy do końca NO_STORY, chowamy przycisk NIE
            if (noCount.value === NO_STORY.length) {
                showNoButton.value = false;
            }
        }
    };

    const processYesClick = () => {
        // --- KLUCZOWA ZMIANA: USUNĄŁEM noCount.value = 0 ---
        // Teraz, jeśli klikniesz TAK, a potem znowu NIE, 
        // wrócisz do momentu, w którym skończyłaś historię odmowy.

        isSad.value = false;

        if (yesCount.value < YES_STORY.length) {
            const step = YES_STORY[yesCount.value];
            mainText.value = step.main;
            subText.value = step.sub;
            
            yesBtnText.value = step.yesBtn || "TAK!";
            
            yesCount.value++;

            // Jeśli historia YES dojdzie do końca, odpalamy konfetti
            if (yesCount.value === YES_STORY.length) {
                showAllButtons.value = false;
            }
        }
    };

    return {
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
    };
}