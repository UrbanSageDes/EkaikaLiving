/* Ekaika Living — shared cart, wishlist, search and header wiring.
   Depends on assets/products.js being loaded first. */

const CART_KEY = 'ekaika_cart';
const WISHLIST_KEY = 'ekaika_wishlist';

/* ---------- storage helpers ---------- */

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  syncHeaderCounts();
}

function addToCart(slug, size, qty) {
  qty = qty || 1;
  size = size || '';
  const cart = getCart();
  const line = cart.find(l => l.slug === slug && l.size === size);
  if (line) { line.qty += qty; }
  else { cart.push({ slug, size, qty }); }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function setCartQty(index, qty) {
  const cart = getCart();
  if (!cart[index]) return;
  if (qty <= 0) { cart.splice(index, 1); }
  else { cart[index].qty = qty; }
  saveCart(cart);
}

function clearCart() { saveCart([]); }

function cartCount() {
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, l) => {
    const p = findProduct(l.slug);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);
}

function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch (e) { return []; }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  syncHeaderCounts();
}

function isWishlisted(slug) {
  return getWishlist().includes(slug);
}

function toggleWishlist(slug) {
  const list = getWishlist();
  const i = list.indexOf(slug);
  if (i === -1) { list.push(slug); saveWishlist(list); return true; }
  list.splice(i, 1); saveWishlist(list); return false;
}

/* ---------- header counts ---------- */

function syncHeaderCounts() {
  const bagCount = cartCount();
  const savedCount = getWishlist().length;
  document.querySelectorAll('[data-bag-count]').forEach(el => { el.textContent = bagCount; });
  document.querySelectorAll('[data-saved-count]').forEach(el => { el.textContent = savedCount; });
}

/* ---------- toast ---------- */

function showToast(message) {
  let toast = document.getElementById('ek-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ek-toast';
    toast.className = 'ek-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('ek-toast-visible');
  void toast.offsetWidth;
  toast.classList.add('ek-toast-visible');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('ek-toast-visible'), 2600);
}

/* ---------- quick add-to-bag triggers ----------
   Any element with [data-add-to-bag="slug"] quick-adds the first
   available size (or no size for cushions) and shows a toast. */

function initQuickAddButtons(root) {
  (root || document).querySelectorAll('[data-add-to-bag]').forEach(el => {
    if (el._ekBound) return;
    el._ekBound = true;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slug = el.getAttribute('data-add-to-bag');
      const product = findProduct(slug);
      if (!product) return;
      const size = product.sizes && product.sizes.length ? product.sizes[0] : '';
      addToCart(slug, size, 1);
      showToast(`Added "${product.name}" to your bag`);
    });
  });
}

/* ---------- wishlist heart injection on product cards ---------- */

function heartSvg(filled) {
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="${filled ? '#c4785a' : 'none'}" stroke="${filled ? '#c4785a' : '#3a3632'}" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

function enhanceProductCards(root) {
  (root || document).querySelectorAll('.product-card[data-slug]').forEach(card => {
    const slug = card.dataset.slug;
    const imageWrap = card.querySelector('.product-image, .product-card-image');
    if (imageWrap && !imageWrap.querySelector('.wishlist-toggle')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wishlist-toggle';
      btn.setAttribute('aria-label', 'Save to wishlist');
      btn.innerHTML = heartSvg(isWishlisted(slug));
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nowSaved = toggleWishlist(slug);
        btn.innerHTML = heartSvg(nowSaved);
        showToast(nowSaved ? 'Saved to your wishlist' : 'Removed from wishlist');
      });
      imageWrap.appendChild(btn);
    }

    if (!card._ekCardNav) {
      card._ekCardNav = true;
      card.addEventListener('click', (e) => {
        if (e.target.closest('[data-add-to-bag]') || e.target.closest('.wishlist-toggle') || e.target.closest('a')) return;
        window.location.href = 'product.html?slug=' + encodeURIComponent(slug);
      });
    }
  });
}

/* ---------- search modal ---------- */

function ensureSearchModal() {
  if (document.getElementById('ek-search-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'ek-search-modal';
  modal.className = 'ek-search-modal';
  modal.innerHTML = `
    <div class="ek-search-backdrop" data-search-close></div>
    <div class="ek-search-panel">
      <div class="ek-search-input-row">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="ek-search-input" placeholder="Search bedsheets, quilts, cushions…" autocomplete="off" />
        <button type="button" class="ek-search-close" data-search-close aria-label="Close search">&times;</button>
      </div>
      <div class="ek-search-results" id="ek-search-results">
        <p class="ek-search-hint">Try "jaal", "cushion", or a colour like "maroon".</p>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const input = modal.querySelector('#ek-search-input');
  const results = modal.querySelector('#ek-search-results');

  function render(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = '<p class="ek-search-hint">Try "jaal", "cushion", or a colour like "maroon".</p>';
      return;
    }
    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
    if (!matches.length) {
      results.innerHTML = '<p class="ek-search-hint">No products match your search.</p>';
      return;
    }
    results.innerHTML = matches.map(p => `
      <a class="ek-search-result" href="product.html?slug=${encodeURIComponent(p.slug)}">
        <img src="${productCoverImage(p)}" alt="${p.name}" />
        <span>
          <strong>${p.name}</strong>
          <em>${p.categoryLabel} · ${formatPrice(p.price)}</em>
        </span>
      </a>`).join('');
  }

  input.addEventListener('input', () => render(input.value));

  modal.querySelectorAll('[data-search-close]').forEach(el => {
    el.addEventListener('click', closeSearch);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
}

function openSearch() {
  ensureSearchModal();
  const modal = document.getElementById('ek-search-modal');
  modal.classList.add('ek-search-open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('ek-search-input').focus(), 50);
}

function closeSearch() {
  const modal = document.getElementById('ek-search-modal');
  if (!modal) return;
  modal.classList.remove('ek-search-open');
  document.body.style.overflow = '';
}

function initSearchTriggers() {
  document.querySelectorAll('[data-search-trigger]').forEach(el => {
    if (el._ekBound) return;
    el._ekBound = true;
    el.addEventListener('click', (e) => { e.preventDefault(); openSearch(); });
  });
}

/* ---------- mobile nav ---------- */

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const navLeft = document.querySelector('.nav-left');
  if (!toggle || !navLeft) return;
  toggle.addEventListener('click', () => navLeft.classList.toggle('nav-open'));
  navLeft.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLeft.classList.remove('nav-open')));
  document.addEventListener('click', (e) => {
    if (!navLeft.classList.contains('nav-open')) return;
    if (e.target.closest('.nav-left') || e.target.closest('[data-nav-toggle]')) return;
    navLeft.classList.remove('nav-open');
  });
}

/* ---------- global init ---------- */

document.addEventListener('DOMContentLoaded', () => {
  syncHeaderCounts();
  initQuickAddButtons();
  enhanceProductCards();
  initSearchTriggers();
  initMobileNav();
});

window.addEventListener('storage', syncHeaderCounts);
