// ============================================
// CUSTOM CURSOR
// ============================================
(function(){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if(!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
  });

  const render = () => {
    dotX += (mouseX - dotX) * 0.6;
    dotY += (mouseY - dotY) * 0.6;
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(render);
  };
  render();

  const hoverables = 'a, button, .p-card, .cat-card, .icon-btn, input, textarea, [data-hover]';
  document.addEventListener('mouseover', (e) => {
    if(e.target.closest(hoverables)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if(e.target.closest(hoverables)) ring.classList.remove('hover');
  });
  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup', () => ring.classList.remove('click'));
})();