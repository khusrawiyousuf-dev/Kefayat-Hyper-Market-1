// ============================================
// PRELOADER
// ============================================
(function(){
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('loaderProgress');
  const pct = document.getElementById('loaderPercent');
  if(!preloader) return;

  let progress = 0;
  const speed = () => Math.random() * 8 + 3;

  const tick = () => {
    progress += speed();
    if(progress > 100) progress = 100;
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress);
    if(progress < 100){
      setTimeout(tick, 80 + Math.random() * 120);
    } else {
      setTimeout(finish, 500);
    }
  };

  const finish = () => {
    preloader.classList.add('hide');
    document.body.classList.remove('preload');
    // Kick off entrance animations
    if(window.gsap){
      gsap.from('.navbar', {y:-30, opacity:0, duration:.8, ease:'power3.out', delay:.2});
      gsap.from('.hero-left > *', {y:30, opacity:0, duration:.9, stagger:.12, ease:'power3.out', delay:.3});
      gsap.from('.hero-right', {scale:.9, opacity:0, duration:1, ease:'power3.out', delay:.5});
    }
    setTimeout(() => preloader.remove(), 900);
  };

  tick();
})();