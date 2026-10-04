// ============================================
// CART + WISHLIST (shared across pages)
// ============================================
const KefayatStore = (() => {
  const CART_KEY = 'kefayat_cart_v1';
  const WISH_KEY = 'kefayat_wish_v1';

  const read = (k) => JSON.parse(localStorage.getItem(k) || '[]');
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const getCart = () => read(CART_KEY);
  const getWish = () => read(WISH_KEY);

  const saveCart = (c) => { write(CART_KEY, c); syncUI(); };
  const saveWish = (w) => { write(WISH_KEY, w); syncUI(); };

  const addToCart = (product, qty = 1) => {
    const cart = getCart();
    const found = cart.find(i => i.id === product.id);
    if(found) found.qty += qty;
    else cart.push({...product, qty});
    saveCart(cart);
    toast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (id) => saveCart(getCart().filter(i => i.id !== id));

  const updateQty = (id, delta) => {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) return removeFromCart(id);
    saveCart(cart);
  };

  const cartTotal = () => getCart().reduce((s,i) => s + i.price * i.qty, 0);
  const cartCount = () => getCart().reduce((s,i) => s + i.qty, 0);

  const toggleWish = (product) => {
    const w = getWish();
    const exists = w.find(i => i.id === product.id);
    if(exists){ saveWish(w.filter(i => i.id !== product.id)); }
    else { w.push(product); saveWish(w); toast(`Added "${product.name}" to wishlist`); }
    return !exists;
  };
  const isWished = (id) => getWish().some(i => i.id === id);

  // ---- UI Sync ----
  const syncUI = () => {
    const cc = document.getElementById('cartCount');
    const wc = document.getElementById('wishlistCount');
    if(cc) cc.textContent = cartCount();
    if(wc) wc.textContent = getWish().length;

    // Cart drawer items
    const cartBox = document.getElementById('cartItems');
    if(cartBox){
      const cart = getCart();
      if(!cart.length){
        cartBox.innerHTML = `<div class="empty-state"><i class="fa-solid fa-bag-shopping"></i><p>Your cart is empty</p></div>`;
      } else {
        cartBox.innerHTML = cart.map(i => `
          <div class="cart-item">
            <img src="${i.image}" alt="${i.name}">
            <div class="cart-item-info">
              <h5>${i.name}</h5>
              <p>$${i.price.toFixed(2)}</p>
              <div class="cart-qty">
                <button data-qty="${i.id}" data-delta="-1"><i class="fa-solid fa-minus"></i></button>
                <span>${i.qty}</span>
                <button data-qty="${i.id}" data-delta="1"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
            <button class="cart-remove" data-remove="${i.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        `).join('');
      }
    }
    const total = document.getElementById('cartTotal');
    if(total) total.textContent = '$' + cartTotal().toFixed(2);

    // Wishlist drawer
    const wBox = document.getElementById('wishlistItems');
    if(wBox){
      const w = getWish();
      if(!w.length){
        wBox.innerHTML = `<div class="empty-state"><i class="fa-regular fa-heart"></i><p>Your wishlist is empty</p></div>`;
      } else {
        wBox.innerHTML = w.map(i => `
          <div class="cart-item">
            <img src="${i.image}" alt="${i.name}">
            <div class="cart-item-info">
              <h5>${i.name}</h5>
              <p>$${i.price.toFixed(2)}</p>
              <button class="p-add" style="margin-top:8px;height:34px;font-size:12px" data-move-to-cart="${i.id}">Add to Cart</button>
            </div>
            <button class="cart-remove" data-remove-wish="${i.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        `).join('');
      }
    }
  };

  // Delegated events
  document.addEventListener('click', (e) => {
    const q = e.target.closest('[data-qty]');
    if(q) return updateQty(q.dataset.qty, parseInt(q.dataset.delta));

    const r = e.target.closest('[data-remove]');
    if(r) return removeFromCart(r.dataset.remove);

    const rw = e.target.closest('[data-remove-wish]');
    if(rw){ saveWish(getWish().filter(i => i.id !== rw.dataset.removeWish)); return; }

    const mv = e.target.closest('[data-move-to-cart]');
    if(mv){
      const p = getWish().find(i => i.id === mv.dataset.moveToCart);
      if(p){ addToCart({...p, qty: 1}); saveWish(getWish().filter(i => i.id !== p.id)); }
    }
  });

  // Toast
  const toastEl = document.getElementById('toast');
  let toastTimer;
  const toast = (msg) => {
    if(!toastEl) return;
    toastEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
  };

  return { getCart, addToCart, removeFromCart, updateQty, cartTotal, cartCount,
           toggleWish, isWished, syncUI, toast };
})();

// Auto sync on load
document.addEventListener('DOMContentLoaded', KefayatStore.syncUI);