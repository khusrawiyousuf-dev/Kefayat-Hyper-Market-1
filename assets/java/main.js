// ============================================
// MAIN — Navbar, Drawers, Search, Homepage logic
// ============================================
document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar scroll state ----------
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if(!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ---------- Mobile menu ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open'); hamburger?.classList.remove('open');
  }));

  // ---------- Drawers ----------
  const cartDrawer = document.getElementById('cartDrawer');
  const wishDrawer = document.getElementById('wishlistDrawer');
  const closeDrawers = () => {
    cartDrawer?.classList.remove('open');
    wishDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('cartBtn')?.addEventListener('click', () => {
    closeDrawers(); cartDrawer?.classList.add('open'); document.body.style.overflow = 'hidden';
  });
  document.getElementById('wishlistBtn')?.addEventListener('click', () => {
    closeDrawers(); wishDrawer?.classList.add('open'); document.body.style.overflow = 'hidden';
  });
  document.querySelectorAll('.drawer [data-close]').forEach(b => b.addEventListener('click', closeDrawers));

  // ---------- Search Overlay ----------
  const searchOverlay = document.getElementById('searchOverlay');
  const globalSearch = document.getElementById('globalSearch');
  const searchResults = document.getElementById('searchResults');

  document.getElementById('searchBtn')?.addEventListener('click', () => {
    searchOverlay?.classList.add('open');
    setTimeout(() => globalSearch?.focus(), 200);
  });
  searchOverlay?.addEventListener('click', (e) => {
    if(e.target === searchOverlay || e.target.closest('[data-close]')){
      searchOverlay.classList.remove('open');
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){ searchOverlay?.classList.remove('open'); closeDrawers(); }
  });

  globalSearch?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if(!searchResults) return;
    if(!q){ searchResults.innerHTML = ''; return; }
    const hits = (window.KefayatProducts || []).filter(p =>
      p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    ).slice(0, 6);
    searchResults.innerHTML = hits.length
      ? hits.map(p => `
        <a class="search-result" href="products.html#${p.id}">
          <img src="${p.image}" alt="${p.name}">
          <div>
            <h5>${p.name}</h5>
            <p>${p.cat} · $${p.price.toFixed(2)}</p>
          </div>
        </a>`).join('')
      : `<div class="empty-state" style="padding:30px"><p>No results found</p></div>`;
  });

  // ---------- Homepage content ----------
  const featuredGrid = document.getElementById('featuredGrid');
  if(featuredGrid && window.KefayatProducts){
    featuredGrid.innerHTML = KefayatProducts.slice(0, 8).map(productCardHTML).join('');
  }

  // Homepage categories
  const homeCats = document.getElementById('homeCategories');
  if(homeCats){
    const cats = [
      {name:'Groceries', icon:'fa-wheat-awn', count:820},
      {name:'Fruits & Vegetables', icon:'fa-apple-whole', count:340},
      {name:'Dairy Products', icon:'fa-cheese', count:210},
      {name:'Meat & Chicken', icon:'fa-drumstick-bite', count:180},
      {name:'Beverages', icon:'fa-mug-hot', count:290},
      {name:'Snacks', icon:'fa-cookie-bite', count:420},
      {name:'Bakery', icon:'fa-bread-slice', count:160},
      {name:'Household', icon:'fa-spray-can-sparkles', count:380},
      {name:'Electronics', icon:'fa-headphones', count:140},
      {name:'Personal Care', icon:'fa-spa', count:260},
      {name:'Baby Products', icon:'fa-baby', count:120},
      {name:'Stationery', icon:'fa-pen-fancy', count:190},
    ];
    homeCats.innerHTML = cats.map(c => `
      <a href="categories.html#${encodeURIComponent(c.name)}" class="cat-card">
        <div class="cat-icon"><i class="fa-solid ${c.icon}"></i></div>
        <div class="cat-name">${c.name}</div>
        <div class="cat-count">${c.count}+ items</div>
      </a>
    `).join('');
  }

  // Reviews
  const reviewsTrack = document.getElementById('reviewsTrack');
  if(reviewsTrack){
    const reviews = [
      {text:'Kefayat has completely changed how I shop. The quality of fresh produce is unmatched, and delivery is always on time.', name:'Sarah Mitchell', role:'Verified Customer', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'},
      {text:'I love the interface — smooth, elegant and intuitive. It feels like shopping at a premium international brand.', name:'Ahmed Hassan', role:'Loyal Member', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'},
      {text:'The best prices in town without ever compromising on quality. My family shops here every single week.', name:'Priya Sharma', role:'Verified Customer', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'},
    ];
    reviewsTrack.innerHTML = reviews.map(r => `
      <div class="review-card">
        <span class="review-quote">"</span>
        <p class="review-text">${r.text}</p>
        <div class="review-user">
          <img src="${r.img}" alt="${r.name}">
          <div>
            <h5>${r.name}</h5>
            <p>${r.role}</p>
            <div class="review-stars">★★★★★</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(!en.isIntersecting) return;
      const el = en.target;
      if(el.dataset.done) return;
      el.dataset.done = '1';
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = target / 60;
      const tick = () => {
        current += step;
        if(current >= target){ el.textContent = target + suffix; return; }
        el.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(tick);
      };
      tick();
    });
  }, {threshold:.4});
  counters.forEach(c => countObserver.observe(c));

  // ---------- Countdown ----------
  const cdTarget = new Date();
  cdTarget.setDate(cdTarget.getDate() + 7);
  const tickCountdown = () => {
    const now = Date.now();
    let diff = cdTarget - now;
    if(diff < 0) diff = 0;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const set = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = String(v).padStart(2, '0'); };
    set('cdDays', d); set('cdHours', h); set('cdMins', m); set('cdSecs', s);
  };
  if(document.getElementById('countdown')){ tickCountdown(); setInterval(tickCountdown, 1000); }

  // ---------- Newsletter ----------
  const newsForm = document.getElementById('newsForm');
  newsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsEmail');
    const msg = document.getElementById('newsMsg');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    msg.className = 'form-msg ' + (ok ? 'ok' : 'err');
    msg.textContent = ok ? 'Thanks! You are subscribed.' : 'Please enter a valid email.';
    if(ok) email.value = '';
  });

  // ---------- GSAP scroll reveals ----------
  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {trigger: el, start: 'top 88%'}
      });
    });
  }

  // ---------- Magnetic buttons ----------
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ---------- Product card 3D tilt ----------
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.p-card');
    if(!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.p-card');
    if(card) card.style.transform = '';
  });

});