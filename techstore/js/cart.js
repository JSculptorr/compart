// =============================================
// КОРЗИНА — управление корзиной через localStorage
// =============================================

let cart = JSON.parse(localStorage.getItem('nexustech_cart')) || [];

function saveCart() {
  localStorage.setItem('nexustech_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-badge').textContent = total;
  document.getElementById('cart-badge').classList.toggle('visible', total > 0);
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }
  saveCart();
  showNotification(`"${product.name}" добавлен в корзину`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCartPage();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    saveCart();
    renderCartPage();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCartPage() {
  const layout = document.getElementById('cart-layout');
  if (!layout) return;

  if (cart.length === 0) {
    layout.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <h3>Корзина пуста</h3>
        <p>Добавьте товары из каталога</p>
        <button class="btn btn-primary" onclick="showPage('catalog')">Перейти в каталог</button>
      </div>`;
    return;
  }

  const itemsHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    const subtotal = product.price * item.qty;
    return `
      <div class="cart-item" id="cart-item-${product.id}">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" loading="lazy" />
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <p class="cart-item-specs">${product.specs[0]}, ${product.specs[1]}</p>
          <span class="cart-item-price">${product.price.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button onclick="changeQty(${product.id}, -1)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${product.id}, 1)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <span class="cart-item-subtotal">${subtotal.toLocaleString('ru-RU')} ₽</span>
          <button class="cart-item-remove" onclick="removeFromCart(${product.id})" aria-label="Удалить">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>`;
  }).join('');

  const total = getCartTotal();
  const count = getCartItemCount();

  layout.innerHTML = `
    <div class="cart-items">${itemsHTML}</div>
    <aside class="cart-summary">
      <h3>Итого</h3>
      <div class="summary-row"><span>Товаров</span><span>${count} шт.</span></div>
      <div class="summary-row summary-row--total"><span>Сумма</span><span>${total.toLocaleString('ru-RU')} ₽</span></div>
      <p class="summary-hint">Бесплатная доставка по городу</p>
      <button class="btn btn-primary btn-wide" onclick="showPage('checkout'); renderCheckoutSummary()">
        Оформить заказ
      </button>
      <button class="btn btn-outline btn-wide" onclick="showPage('catalog')">
        Продолжить покупки
      </button>
    </aside>`;
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkout-summary');
  if (!el) return;
  const total = getCartTotal();
  const itemsHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    return `<div class="summary-item">
      <span>${p.name} × ${item.qty}</span>
      <span>${(p.price * item.qty).toLocaleString('ru-RU')} ₽</span>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div class="checkout-summary-card">
      <h3>Ваш заказ</h3>
      ${itemsHTML}
      <div class="summary-divider"></div>
      <div class="summary-row summary-row--total">
        <span>Итого</span>
        <span>${total.toLocaleString('ru-RU')} ₽</span>
      </div>
    </div>`;
}

// =============================================
// ОФОРМЛЕНИЕ ЗАКАЗА + TELEGRAM
// =============================================

// TELEGRAM НАСТРОЙКИ — вставьте свои данные:
// CHANGE_BOT_TOKEN: замените на ваш токен бота
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
// CHANGE_CHAT_ID: замените на ваш chat_id
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

async function sendToTelegram(orderData) {
  if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') return; // пропускаем если не настроено

  const itemsList = orderData.items.map(i =>
    `• ${i.name} × ${i.qty} = ${(i.price * i.qty).toLocaleString('ru-RU')} ₽`
  ).join('\n');

  const message = `
🛒 *Новый заказ #${orderData.id}*

👤 *Клиент:* ${orderData.name}
📞 *Телефон:* ${orderData.phone}
📍 *Адрес:* ${orderData.address}
💬 *Комментарий:* ${orderData.comment || 'нет'}

*Товары:*
${itemsList}

💰 *Итого: ${orderData.total.toLocaleString('ru-RU')} ₽*
🕐 ${new Date().toLocaleString('ru-RU')}
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  } catch (e) {
    console.warn('Telegram send failed:', e);
  }
}

async function submitOrder() {
  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const comment = document.getElementById('order-comment').value.trim();

  if (!name || !phone || !address) {
    showNotification('Пожалуйста, заполните все обязательные поля');
    return;
  }

  const orderId = 'NX-' + Date.now().toString().slice(-6);

  const orderItems = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return { name: p.name, qty: item.qty, price: p.price };
  });

  const orderData = {
    id: orderId,
    name, phone, address, comment,
    items: orderItems,
    total: getCartTotal(),
    date: new Date().toISOString()
  };

  // Сохраняем в localStorage
  const orders = JSON.parse(localStorage.getItem('nexustech_orders') || '[]');
  orders.push(orderData);
  localStorage.setItem('nexustech_orders', JSON.stringify(orders));

  // Выводим в консоль
  console.log('📦 Новый заказ:', orderData);

  // Отправляем в Telegram
  await sendToTelegram(orderData);

  // Очищаем корзину
  cart = [];
  saveCart();

  // Показываем страницу успеха
  document.getElementById('success-order-id').textContent = `Номер вашего заказа: ${orderId}`;
  showPage('success');
}

// Инициализация при загрузке
updateCartBadge();
