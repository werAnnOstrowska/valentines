export function useSoundEffects() {
  // Poprawione URL i ścieżki
  const carCrashPath = new URL('../assets/sounds/carcrash.wav', import.meta.url).href;
  const noSoundPath = new URL('../assets/sounds/sus.mp3', import.meta.url).href;

  const yippie = new URL('../assets/sounds/yippie.mp3', import.meta.url).href
  const kiss = new URL('../assets/sounds/kiss.mp3', import.meta.url).href

  const playNoSound = (count) => {
    // Wybieramy dźwięk na podstawie licznika
    const source = count === 0 ? carCrashPath : noSoundPath;
    const audio = new Audio(source);
    
    audio.volume = 0.3; // Ustaw głośność, żeby nie ogłuchnąć ;)
    
    audio.play().catch(err => console.warn("Audio blocked:", err));
  };

  const playYesSound = (count) => {
    const source = count === 3 ? kiss : yippie;
    const audio = new Audio(source);

    audio.volume = 0.3;

    audio.play().catch(err => console.warn("Audio blocked:", err));
  };

  return { playNoSound, playYesSound };
}