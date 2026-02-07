import gsap from 'gsap';

// Serce Pełne (Ciemne - #4a202a)
const heartFull = `data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="%234a202a"/></svg>`;

// Serce Outline (Jasne/Różowe - #f1738a)
const heartOutline = `data:image/svg+xml;utf8,<svg viewBox="0 0 548.963 548.963" xmlns="http://www.w3.org/2000/svg"><path d="M398.327,30.737c-50.875,0-95.875,31.151-123.452,69.542c-27.577-38.391-72.577-69.542-123.453-69.542c-43.452,0-85.484,19.04-114.168,51.677c-55.221,62.834-43.085,166.366-2.375,233.454c37.014,60.992,93.832,109.188,151.972,149.303c28.091,19.383,57.387,37.902,88.024,53.055c99.891-47.723,210.791-127.301,255.975-231.268c14.211-32.706,20.074-69.187,17.54-104.126C542.588,102.751,492.717,30.737,398.327,30.737z M474.724,262.563c-29.517,67.915-101.28,134.971-198.998,186.739c-16.542-9.498-34.248-20.795-54.119-34.504c-64.682-44.627-107.394-86.15-134.407-130.674c-15.6-25.704-25.049-57.908-25.931-88.342c-0.612-21.188,2.699-51.047,21.958-72.963c16.996-19.333,42.491-30.881,68.202-30.881c31.046,0,58.452,22.754,73.752,44.045c11.5,16.004,30,43.856,49.707,43.856s38.208-27.852,49.707-43.856c15.294-21.291,42.699-44.045,73.752-44.045c26.77,0,47.24,8.36,62.577,25.557c15.013,16.824,24.4,41.598,26.438,69.756C489.203,212.82,484.718,239.564,474.724,262.563z" fill="%23f1738a"/></svg>`;

export function useCursorHearts() {
  let isEnabled = false;
  let rainInterval = null;

  const createHeart = (x, y, isRain = false) => {
    if (!isEnabled) return;

    const heart = document.createElement('div');
    
    // Losowanie rodzaju serca
    const selectedHeart = Math.random() > 0.5 ? heartFull : heartOutline;
    
    Object.assign(heart.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: isRain ? `${Math.random() * 25 + 15}px` : `${Math.random() * 20 + 10}px`,
      aspectRatio: '1',
      backgroundImage: `url('${selectedHeart}')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'none',
      zIndex: '100000', // Ustawione bardzo wysoko, by nic go nie przysłoniło
    });

    document.body.appendChild(heart);

    // Fizyka: Rozrzut boczny i ruch pionowy
    const destinationX = (Math.random() - 0.5) * 350;
    const destinationY = isRain ? window.innerHeight + 100 : Math.random() * 250 + 100;
    const duration = isRain ? 4 + Math.random() * 3 : 1.5 + Math.random();

    gsap.set(heart, { 
      x: x, 
      y: y, 
      scale: isRain ? Math.random() * 0.4 + 0.4 : 0, 
      rotation: Math.random() * 360 
    });

    gsap.to(heart, {
      x: `+=${destinationX}`,
      y: isRain ? destinationY : `+=${destinationY}`,
      rotation: "+=720",
      scale: isRain ? "+=0.3" : 1.2,
      opacity: 0,
      duration: duration,
      ease: isRain ? "none" : "power2.out",
      onComplete: () => heart.remove() // Sprzątanie pamięci
    });
  };

 const startRain = () => {
    if (rainInterval) return;
    rainInterval = setInterval(() => {
      // W każdym cyklu tworzymy 2 serca w różnych miejscach
      for (let i = 0; i < 2; i++) {
        const randomX = Math.random() * window.innerWidth;
        // Dodajemy lekkie losowe opóźnienie startu (Y), żeby nie leciały w idealnych rzędach
        const randomOffsetYSart = -(Math.random() * 100); 
        createHeart(randomX, randomOffsetYSart, true);
      }
    }, 50); // Cykl co 50ms = 40 serc na sekundę
  };

  const handleMouseMove = (e) => {
    if (Math.random() > 0.85) { // Twórz serce tylko co któryś ruch myszki
        createHeart(e.clientX, e.clientY, false);
    }
  };

  const startEverything = () => {
    if (isEnabled) return; // Zapobiega wielokrotnemu odpaleniu
    isEnabled = true;
    window.addEventListener('mousemove', handleMouseMove);
    startRain();
    console.log("🌸 Deszcz serduszek i śledzenie myszki aktywne!");
  };

  const stopEverything = () => {
    isEnabled = false;
    window.removeEventListener('mousemove', handleMouseMove);
    if (rainInterval) {
      clearInterval(rainInterval);
      rainInterval = null;
    }
  };

  return { startEverything, stopEverything };
}