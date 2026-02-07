import gsap from 'gsap';
// import heartSvg from "../assets/heart.svg"

export function useHeartBurst() {
const spawnHeart = (x, y) => {
    const heart = document.createElement('div');
    const heartSvg = `data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="%234a202a"/></svg>`;
    
    // Używamy Object.assign, ale uważaj na URL
    Object.assign(heart.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '30px',
      height: '30px',
      // KLUCZOWA ZMIANA: Dodajemy url() wokół zmiennej
      backgroundImage: `url('${heartSvg}')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'none',
      zIndex: '9999',
      display: 'block' // Na wszelki wypadek
    });

    // Object.assign(heart.style, {
    //     position: 'fixed',
    //     top: '0',
    //     left: '0',
    //     width: '30px',
    //     height: '30px',
    //     backgroundColor: 'red', // TEST: Jeśli zobaczysz czerwone kwadraty, logika GSAP jest OK
    //     maskImage: `url(${heartSvg})`, // Nowoczesne podejście: maska zamiast tła
    //     webkitMaskImage: `url(${heartSvg})`,
    //     maskSize: 'contain',
    //     webkitMaskSize: 'contain',
    //     backgroundImage: `url(${heartSvg})`,
    //     backgroundSize: 'contain',
    //     backgroundRepeat: 'no-repeat',
    //     zIndex: '9999',
    // });

    document.body.appendChild(heart);

    // Losowe parametry lotu
    const angle = Math.random() * Math.PI * 2; // Losowy kąt 360 stopni
    const velocity = 200 + Math.random() * 300; // Siła wystrzału
    const destinationX = Math.cos(angle) * velocity;
    const destinationY = Math.sin(angle) * velocity;
    const rotation = (Math.random() - 0.5) * 1000; // Mocne kręcenie się

    // Stan startowy
    gsap.set(heart, {
      x: x - 15, // Centrowanie serca (połowa szerokości)
      y: y - 15,
      scale: 0,
      opacity: 1
    });

    // Animacja lotu
    gsap.to(heart, {
      x: `+=${destinationX}`,
      y: `+=${destinationY}`,
      rotation: rotation,
      scale: Math.random() * 1.5 + 0.5,
      opacity: 0,
      duration: 1.5 + Math.random(),
      ease: "power2.out",
      onComplete: () => heart.remove() // Sprzątanie DOM
    });
  };

  const burst = (event) => {
    // Pobieramy środek przycisku z eventu
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Strzelamy 20 sercami
    for (let i = 0; i < 20; i++) {
      spawnHeart(x, y);
    }
  };

  return { burst };
}