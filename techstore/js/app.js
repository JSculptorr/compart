// =============================================
// ОСНОВНАЯ ЛОГИКА ПРИЛОЖЕНИЯ
// =============================================

let currentCategory = 'all';
let currentSort = 'default';
let catalogSearchQuery = '';

// --- НАВИГАЦИЯ ---
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + pageName);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (pageName === 'cart') renderCartPage();
  if (pageName === 'catalog') renderCatalog();
}

function scrollToSection(id) {
  showPage('home');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// --- HEADER ---
function toggleMenu() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  nav.classList.toggle('open');
  burger.classList.toggle('active');
}

function closeMenu() {
  document.getElementById('nav').classList.remove('open');
  document.getElementById('burger').classList.remove('active');
}

function toggleSearch() {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    document.getElementById('search-input').focus();
  }
}

function handleSearch(query) {
  if (!query.trim()) return;
  showPage('catalog');
  catalogSearchQuery = query.trim().toLowerCase();
  renderCatalog();
}

// --- УВЕДОМЛЕНИЯ ---
let notifTimeout;
function showNotification(text) {
  const el = document.getElementById('notification');
  document.getElementById('notification-text').textContent = text;
  el.classList.add('show');
  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => el.classList.remove('show'), 3000);
}

// --- РЕНДЕР КАРТОЧКИ ТОВАРА ---
function renderProductCard(product) {
  const badgeHTML = product.badge
    ? `<span class="product-badge">${product.badge}</span>` : '';
  const oldPriceHTML = product.oldPrice
    ? `<span class="product-old-price">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>` : '';
  const specsHTML = product.specs.slice(0, 3).map(s =>
    `<li>${s}</li>`).join('');

  return `
    <div class="product-card animate-in">
      ${badgeHTML}
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <ul class="product-specs">${specsHTML}</ul>
        <div class="product-footer">
          <div class="product-price-wrap">
            <span class="product-price">${product.price.toLocaleString('ru-RU')} ₽</span>
            ${oldPriceHTML}
          </div>
          <button class="btn-add-cart" onclick="addToCart(${product.id})" aria-label="В корзину">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </div>`;
}

// --- ГЛАВНАЯ: популярные и новинки ---
function renderHomeGrids() {
  const popularEl = document.getElementById('popular-grid');
  const newEl = document.getElementById('new-grid');

  const popular = PRODUCTS.filter(p => p.isPopular).slice(0, 4);
  const newItems = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  if (popularEl) popularEl.innerHTML = popular.map(renderProductCard).join('');
  if (newEl) newEl.innerHTML = newItems.map(renderProductCard).join('');
}

// --- КАТАЛОГ ---
function getFilteredSortedProducts() {
  let items = [...PRODUCTS];

  // Фильтр по категории
  if (currentCategory !== 'all') {
    items = items.filter(p => p.category === currentCategory);
  }

  // Поиск
  if (catalogSearchQuery) {
    items = items.filter(p =>
      p.name.toLowerCase().includes(catalogSearchQuery) ||
      p.specs.some(s => s.toLowerCase().includes(catalogSearchQuery))
    );
  }

  // Сортировка
  if (currentSort === 'price-asc') items.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') items.sort((a, b) => b.price - a.price);

  return items;
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  const countEl = document.getElementById('catalog-count');
  if (!grid) return;

  const items = getFilteredSortedProducts();
  countEl.textContent = `${items.length} товаров`;

  if (items.length === 0) {
    grid.innerHTML = `<div class="catalog-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <p>Товары не найдены</p>
      <button class="btn btn-outline btn-sm" onclick="resetCatalog()">Сбросить фильтры</button>
    </div>`;
    return;
  }

  grid.innerHTML = items.map(renderProductCard).join('');
  triggerAnimations();
}

function filterCatalog(cat, btn) {
  currentCategory = cat;
  catalogSearchQuery = '';
  document.getElementById('catalog-search') && (document.getElementById('catalog-search').value = '');

  // Обновляем активную кнопку
  document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    const target = document.querySelector(`.filter-btn[data-cat="${cat}"]`);
    if (target) target.classList.add('active');
  }

  renderCatalog();
}

function sortCatalog(sort, btn) {
  currentSort = sort;
  document.querySelectorAll('.filter-btn[data-sort]').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCatalog();
}

function handleCatalogSearch(query) {
  catalogSearchQuery = query.toLowerCase();
  renderCatalog();
}

function resetCatalog() {
  currentCategory = 'all';
  currentSort = 'default';
  catalogSearchQuery = '';
  document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active'));
  const allBtn = document.querySelector('.filter-btn[data-cat="all"]');
  if (allBtn) allBtn.classList.add('active');
  document.querySelectorAll('.filter-btn[data-sort]').forEach(b => b.classList.remove('active'));
  const defBtn = document.querySelector('.filter-btn[data-sort="default"]');
  if (defBtn) defBtn.classList.add('active');
  renderCatalog();
}

// --- FAQ ---
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// --- SCROLL ANIMATIONS ---
function triggerAnimations() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in:not(.visible)').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.animate-in').forEach(el => el.classList.add('visible'));
  }
}

// --- HEADER SCROLL ---
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  renderHomeGrids();
  triggerAnimations();

  // Анимация появления секций
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.why-card, .cat-card, .review-card, .promo-card').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.why-section, .categories-section, .reviews-section, .promo-section').forEach(s => {
      sectionObserver.observe(s);
    });
  }
});
