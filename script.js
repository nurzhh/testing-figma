const services = [
  ['steam', 'Steam'], ['telegram', 'Telegram'], ['roblox', 'Roblox'], ['brawl', 'Brawl Stars'],
  ['pubg', 'PUBG Mob...'], ['appstore', 'App Store'], ['chatgpt', 'ChatGPT'], ['playstation', 'PlayStation'],
  ['tiktok', 'TikTok'], ['mobile', 'Mobile Leg..'], ['more', 'еще 841']
];

document.querySelector('#services').innerHTML = services.map(([image, title], index) => `
  <button class="service ${index === 4 ? 'service--featured' : ''}" type="button">
    <span class="service__icon"><img src="assets/${image}.${image === 'more' ? 'svg' : 'png'}" alt=""></span><span>${title}</span>
  </button>`).join('');

const productCard = () => `
  <article class="product-card">
    <img class="product-card__image" src="assets/product.jpg" alt="PlayerUnknown’s Battlegrounds">
    <div class="product-card__body">
      <h3>💥 DOOM 2016 💀 STEAM KEY 🔑<br>РФ+СНГ</h3>
      <div class="product-card__price"><strong>990 ₽</strong><del>1 990 ₽</del></div>
      <button type="button">Купить</button>
    </div>
  </article>`;

const categories = [
  ['icon-donate.svg', 'Донат'],
  ['icon-subscriptions.svg', 'Подписки'],
  ['icon-items.svg', 'Предметы'],
  ['icon-accounts.svg', 'Аккаунты'],
  ['icon-keys.svg', 'Ключи'],
  ['icon-currency.svg', 'Игровая валюта'],
  ['icon-other.svg', 'Другое']
];
const sections = [
  { title: 'Популярные товары', categories: true },
  { title: 'Рекомендованные товары' },
  { title: 'Другие товары' }
];

document.querySelector('#product-sections').innerHTML = sections.map((section) => `
  <section class="products-section">
    <div class="section-heading">
      <h2>${section.title}</h2>
      ${section.categories ? `<div class="category-pills">${categories.map(([icon, label], i) => `<button class="${i === 0 ? 'is-active' : ''}"><img src="assets/${icon}" alt="">${label}</button>`).join('')}</div>` : '<button>Показать все</button>'}
    </div>
    <div class="product-grid">${Array.from({ length: 5 }, productCard).join('')}</div>
  </section>`).join('');

document.querySelector('#reviews').innerHTML = Array.from({ length: 3 }, () => `
  <article class="review-card">
    <div class="review-card__author"><div class="avatar">B</div><div><strong>Bizidin</strong><span>★★★★★ &nbsp; 5.0</span></div><time>Сегодня в 11:48</time></div>
    <p>Отзывчивый и приятный продавец, помог не только с товаром но и с другим вопросом. Рекомендую!</p>
    <div class="review-card__product"><img src="assets/product.jpg" alt=""><strong>🌸 FunTime | Полностью<br>готовый сервер под ключ ⚡</strong><b>139₽</b></div>
  </article>`).join('');

const catalogData = {
  Steam: ['Игры и DLC', 'Пополнение баланса', 'Подарочные карты', 'Коллекционные карточки', 'Смена региона'],
  PlayStation: ['Игры и DLC', 'Пополнение баланса', 'Новые аккаунты', 'PS Plus', 'EA Play'],
  Xbox: ['Игры и DLC', 'Пополнение баланса', 'Новые аккаунты', 'Xbox Game Pass', 'Услуги'],
  Nintendo: ['Игры и DLC', 'Подарочные карты', 'Новые аккаунты', 'NS Online'],
  'Battle.net': ['World of Warcraft', 'Подарочные карты', 'Прямое пополнение', 'Новые аккаунты', 'Смена региона'],
  Подборки: ['Скидки 90%', 'Популярные издатели', 'Лучшие серии игр', 'Steam Deck', 'Bundle-наборы']
};
document.querySelector('#catalog-columns').innerHTML = Object.entries(catalogData).map(([title, links]) => `<div><h3>${title}<img src="assets/icon-catalog-chevron.svg" alt=""></h3>${links.map(link => `<a href="#">${link}</a>`).join('')}</div>`).join('');

const catalogButton = document.querySelector('.catalog-button');
const catalogMenu = document.querySelector('#catalog-menu');
const setCatalog = (open) => {
  catalogMenu.hidden = !open;
  catalogButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('catalog-open', open);
};
catalogButton.addEventListener('click', (event) => { event.stopPropagation(); setCatalog(catalogMenu.hidden); });
catalogMenu.querySelector('.catalog-menu__inner').addEventListener('click', (event) => event.stopPropagation());
catalogMenu.addEventListener('click', () => setCatalog(false));
document.addEventListener('click', () => setCatalog(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setCatalog(false); });

document.querySelectorAll('.currency-switch button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.currency-switch button').forEach(item => item.classList.remove('is-active'));
  button.classList.add('is-active');
  document.querySelector('.pay-button').textContent = `Оплатить 500${button.dataset.currency}`;
}));

const slides = [...document.querySelectorAll('.hero__slide')];
const dots = document.querySelector('.hero__dots');
let activeSlide = 0;
let sliderTimer;
slides.forEach((_, index) => dots.insertAdjacentHTML('beforeend', `<button aria-label="Слайд ${index + 1}" data-slide="${index}"></button>`));
const showSlide = (index) => {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeSlide));
  [...dots.children].forEach((dot, i) => dot.classList.toggle('is-active', i === activeSlide));
};
const restartSlider = () => { clearInterval(sliderTimer); sliderTimer = setInterval(() => showSlide(activeSlide + 1), 5500); };
document.querySelectorAll('.hero__controls button').forEach(button => button.addEventListener('click', () => { showSlide(activeSlide + Number(button.dataset.direction)); restartSlider(); }));
dots.addEventListener('click', (event) => { if (event.target.dataset.slide) { showSlide(Number(event.target.dataset.slide)); restartSlider(); } });
showSlide(0);
restartSlider();

document.querySelector('.search').addEventListener('submit', (event) => event.preventDefault());
