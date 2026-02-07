import gsap from 'gsap';

export function useIntroAnimation() {
  const playIntro = (refs) => {
    const { zygzak, title, cardContainer, text1, text2, cat, btnContainer } = refs;
    const tl = gsap.timeline({ defaults: { force3D: true } });

    gsap.set(cardContainer, { autoAlpha: 0, y: 50 }); 
    gsap.set(zygzak, { x: -800, scale: 0.8 });

    tl.to(zygzak, { x: 0, duration: 1.5, ease: "power3.out" })
      .to(title, { autoAlpha: 1, y: 0, rotation: 360, duration: 1.2, ease: "back.out(1.7)" }, "-=0.8")
      .to(cardContainer, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.2")
      .to(text1, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.3")
      .to([zygzak, title], { x: "120vw", autoAlpha: 0, duration: 1.8, ease: "power2.inOut", delay: 2 })
      .to(cardContainer, { y: "-12rem", duration: 1.8, ease: "power2.inOut" }, "-=1.8")
      .to(text2, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(cat, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.3")
      .to(btnContainer, { autoAlpha: 1, y: -20, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");
      
    return tl;
  };

  return { playIntro };
}