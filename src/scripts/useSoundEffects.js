export function useSoundEffects() {
  // Poprawione URL i ścieżki
  const carCrashPath = new URL('../assets/sounds/carcrash.wav', import.meta.url).href;
  const noSoundPath = new URL('../assets/sounds/sus.mp3', import.meta.url).href;

  const yippiePath = new URL('../assets/sounds/yippie.mp3', import.meta.url).href
  const kissPath = new URL('../assets/sounds/kiss.mp3', import.meta.url).href

  const carCrashAudio = new Audio(carCrashPath);
  carCrashAudio.preload = 'auto';
  const noSoundAudio = new Audio(noSoundPath);
  noSoundAudio.preload = 'auto';

  const yippieAudio = new Audio(yippiePath);
  yippieAudio.preload = 'auto';
  const kissAudio = new Audio(kissPath);
  kissAudio.preload = 'auto';

const playNoSound = (count) => {
    // Wybieramy GOTOWY obiekt, a nie ścieżkę
    const audio = count === 0 ? carCrashAudio : noSoundAudio;
    
    audio.currentTime = 0; // Resetuj, żeby można było klikać szybko
    audio.volume = 0.3;
    audio.play().catch(err => console.warn("Audio blocked:", err));
  };

  const playYesSound = (count) => {
    // Wybieramy GOTOWY obiekt
    const audio = count === 3 ? kissAudio : yippieAudio;
    
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play().catch(err => console.warn("Audio blocked:", err));
  };

  return { playNoSound, playYesSound };
}

