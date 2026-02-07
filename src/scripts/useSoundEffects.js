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
    // Wybieramy dźwięk na podstawie licznika
    const source = count === 0 ? carCrashAudio : noSoundAudio;
    const audio = new Audio(source);
    
    audio.volume = 0.3; // Ustaw głośność, żeby nie ogłuchnąć ;)
    
    audio.play().catch(err => console.warn("Audio blocked:", err));
  };

  const playYesSound = (count) => {
    const source = count === 3 ? kissAudio : yippieAudio;
    const audio = new Audio(source);

    audio.volume = 0.3;

    audio.play().catch(err => console.warn("Audio blocked:", err));
  };

  return { playNoSound, playYesSound };
}