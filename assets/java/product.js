// ============================================
// PRODUCT CATALOG + RENDERING
// ============================================
const KefayatProducts = [
  // Fruits & Vegetables
  {id:'p01', name:'Organic Avocado Pack', cat:'Fruits & Vegetables', price:4.99, old:6.99, rating:4.8, reviews:214, image:'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=600&q=80', badge:'-30%', desc:'Creamy, ripe Hass avocados, hand-picked from organic farms.'},
  {id:'p02', name:'Fresh Strawberries 500g', cat:'Fruits & Vegetables', price:5.49, old:0, rating:4.7, reviews:189, image:'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80', badge:'', desc:'Sweet, juicy strawberries picked at peak ripeness.'},
  {id:'p03', name:'Baby Spinach 200g', cat:'Fruits & Vegetables', price:2.99, old:3.99, rating:4.6, reviews:142, image:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80', badge:'-25%', desc:'Tender baby spinach leaves, perfect for salads and smoothies.'},
  {id:'p04', name:'Vine Tomatoes 1kg', cat:'Fruits & Vegetables', price:3.49, old:0, rating:4.5, reviews:96, image:'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80', badge:'', desc:'Sun-ripened vine tomatoes bursting with flavor.'},

  // Dairy
  {id:'p05', name:'Farm Fresh Milk 2L', cat:'Dairy Products', price:3.29, old:0, rating:4.9, reviews:340, image:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80', badge:'', desc:'Whole milk from grass-fed cows, bottled daily.'},
  {id:'p06', name:'Aged Cheddar 250g', cat:'Dairy Products', price:6.99, old:8.99, rating:4.8, reviews:212, image:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&q=80', badge:'-22%', desc:'Sharp, aged cheddar matured for 12 months.'},
  {id:'p07', name:'Greek Yogurt 500g', cat:'Dairy Products', price:4.49, old:0, rating:4.7, reviews:178, image:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80', badge:'', desc:'Thick, creamy Greek yogurt, high in protein.'},

  // Bakery
  {id:'p08', name:'Artisan Sourdough', cat:'Bakery', price:4.99, old:0, rating:4.9, reviews:264, image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', badge:'', desc:'Slow-fermented sourdough with a crispy crust.'},
  {id:'p09', name:'Butter Croissants x4', cat:'Bakery', price:5.99, old:7.49, rating:4.7, reviews:198, image:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80', badge:'-20%', desc:'Flaky, buttery croissants baked fresh every morning.'},

  // Beverages
  {id:'p10', name:'Cold Brew Coffee 1L', cat:'Beverages', price:7.49, old:0, rating:4.6, reviews:154, image:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', badge:'new', desc:'Smooth, slow-steeped cold brew coffee.'},
  {id:'p11', name:'Sparkling Water 6-Pack', cat:'Beverages', price:5.99, old:7.99, rating:4.5, reviews:122, image:'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80', badge:'-25%', desc:'Refreshing sparkling mineral water, zero calories.'},

  // Snacks
  {id:'p12', name:'Dark Chocolate 70%', cat:'Snacks', price:4.29, old:0, rating:4.8, reviews:308, image:'https://images.unsplash.com/photo-1548907040-4d42ba2c1c17?w=600&q=80', badge:'hot', desc:'Rich 70% cocoa dark chocolate, ethically sourced.'},
  {id:'p13', name:'Mixed Nuts 400g', cat:'Snacks', price:9.99, old:12.99, rating:4.7, reviews:186, image:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80', badge:'-23%', desc:'Premium roasted almonds, cashews, and walnuts.'},

  // Meat
  {id:'p14', name:'Free-Range Chicken Breast', cat:'Meat & Chicken', price:11.99, old:0, rating:4.8, reviews:232, image:'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80', badge:'', desc:'Tender, hormone-free chicken breast fillets.'},
  {id:'p15', name:'Grass-Fed Beef Steak', cat:'Meat & Chicken', price:18.99, old:24.99, rating:4.9, reviews:174, image:'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80', badge:'-24%', desc:'Premium grass-fed ribeye steak, aged 28 days.'},

  // Groceries
  {id:'p16', name:'Extra Virgin Olive Oil 1L', cat:'Groceries', price:14.99, old:0, rating:4.9, reviews:296, image:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', badge:'', desc:'Cold-pressed extra virgin olive oil from Tuscany.'},
  {id:'p17', name:'Basmati Rice 5kg', cat:'Groceries', price:16.99, old:19.99, rating:4.7, reviews:188, image:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', badge:'-15%', desc:'Aromatic long-grain basmati rice, aged 12 months.'},

  // Household
  {id:'p18', name:'Eco Dish Soap 750ml', cat:'Household', price:6.99, old:0, rating:4.6, reviews:112, image:'https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?w=600&q=80', badge:'', desc:'Plant-based dish soap, gentle and effective.'},
  {id:'p19', name:'Bamboo Paper Towels', cat:'Household', price:8.49, old:10.99, rating:4.5, reviews:98, image:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80', badge:'-22%', desc:'Sustainable bamboo paper towels, ultra absorbent.'},

  // Personal Care
  {id:'p20', name:'Vitamin C Serum', cat:'Personal Care', price:24.99, old:32.99, rating:4.8, reviews:342, image:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', badge:'-24%', desc:'Brightening vitamin C serum with hyaluronic acid.'},
  {id:'p21', name:'Argan Oil Shampoo', cat:'Personal Care', price:12.99, old:0, rating:4.6, reviews:154, image:'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&q=80', badge:'', desc:'Nourishing argan oil shampoo for silky hair.'},

  // Electronics
  {id:'p22', name:'Wireless Earbuds Pro', cat:'Electronics', price:79.99, old:99.99, rating:4.7, reviews:426, image:'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80', badge:'-20%', desc:'Active noise-cancelling wireless earbuds.'},
  {id:'p23', name:'Smart Watch Series X', cat:'Electronics', price:199.99, old:249.99, rating:4.8, reviews:288, image:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', badge:'-20%', desc:'Fitness tracking, heart rate, and 7-day battery.'},

  // Baby
  {id:'p24', name:'Organic Baby Wipes x3', cat:'Baby Products', price:9.99, old:12.99, rating:4.9, reviews:212, image:'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80', badge:'-23%', desc:'Gentle organic wipes, fragrance-free.'},

  // Stationery
  {id:'p25', name:'Leather Notebook A5', cat:'Stationery', price:14.99, old:0, rating:4.7, reviews:128, image:'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80', badge:'', desc:'Handcrafted leather notebook with premium paper.'},
];

// Expose globally
window.KefayatProducts = KefayatProducts;

// ============================================
// PRODUCT CARD RENDERER
// ============================================
function productCardHTML(p){
  const wished = KefayatStore.isWished(p.id);
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  return `
    <div class="p-card" data-id="${p.id}">
      <div class="p-media">
        ${p.badge ? `<span class="p-badge ${p.badge === 'new' ? 'new' : p.badge === 'hot' ? 'hot' : ''}">${p.badge.startsWith('-') ? p.badge : p.badge.toUpperCase()}</span>` : ''}
        <button class="p-wish ${wished ? 'active' : ''}" data-wish="${p.id}">
          <i class="${wished ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="p-quick">
          <button data-quick="${p.id}">Quick View</button>
        </div>
      </div>
      <div class="p-info">
        <span class="p-cat">${p.cat}</span>
        <h4 class="p-name">${p.name}</h4>
        <div class="p-rating">
          <span class="stars">${stars}</span>
          <span>(${p.reviews})</span>
        </div>
        <div class="p-price">
          <strong>$${p.price.toFixed(2)}</strong>
          ${p.old ? `<s>$${p.old.toFixed(2)}</s>` : ''}
        </div>
        <button class="p-add" data-add="${p.id}">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
      </div>
    </div>
  `;
}

// ============================================
// GLOBAL DELEGATED PRODUCT ACTIONS
// ============================================
document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add]');
  if(addBtn){
    e.preventDefault();
    const p = KefayatProducts.find(x => x.id === addBtn.dataset.add);
    if(p) KefayatStore.addToCart(p, 1);
    return;
  }

  const wishBtn = e.target.closest('[data-wish]');
  if(wishBtn){
    e.preventDefault();
    const p = KefayatProducts.find(x => x.id === wishBtn.dataset.wish);
    if(p){
      const nowWished = KefayatStore.toggleWish(p);
      wishBtn.classList.toggle('active', nowWished);
      wishBtn.querySelector('i').className = nowWished ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    }
    return;
  }

  const quickBtn = e.target.closest('[data-quick]');
  if(quickBtn){
    e.preventDefault();
    const p = KefayatProducts.find(x => x.id === quickBtn.dataset.quick);
    if(p) openQuickView(p);
    return;
  }
});

// ============================================
// QUICK VIEW MODAL
// ============================================
function openQuickView(p){
  const modal = document.getElementById('quickView');
  const inner = document.getElementById('quickInner');
  if(!modal || !inner) return;

  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  inner.innerHTML = `
    <div class="quick-media">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="quick-body">
      <span class="p-cat">${p.cat}</span>
      <h2>${p.name}</h2>
      <div class="p-rating"><span class="stars">${stars}</span> <span>(${p.reviews} reviews)</span></div>
      <div class="p-price"><strong>$${p.price.toFixed(2)}</strong> ${p.old ? `<s>$${p.old.toFixed(2)}</s>` : ''}</div>
      <p class="desc">${p.desc}</p>
      <div class="quick-actions">
        <button class="btn-primary" data-add="${p.id}"><span>Add to Cart</span><i class="fa-solid fa-bag-shopping"></i></button>
        <button class="icon-btn" data-wish="${p.id}"><i class="${KefayatStore.isWished(p.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i></button>
      </div>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Close modals
document.querySelectorAll('.modal-wrap').forEach(m => {
  m.addEventListener('click', (e) => {
    if(e.target === m || e.target.closest('[data-close]')){
      m.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});