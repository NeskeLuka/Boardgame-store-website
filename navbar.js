const pages = [
  { key: 'index',   rs: 'index.html',   en: 'index-en.html',   labelRs: 'Početna',       labelEn: 'Home',         path: [] },
  { key: 'gallery', rs: 'gallery.html', en: 'gallery-en.html', labelRs: 'Galerija',      labelEn: 'Gallery',      path: ["index"] },
  { key: 'catalog', rs: 'catalog.html', en: 'catalog-en.html', labelRs: 'Katalog igara', labelEn: 'Game Catalog',                          path: ["index"] },
  { key: 'cart',    rs: 'cart.html',    en: 'cart-en.html',    labelRs: 'Moj nalog',     labelEn: 'My Account',   path: ["index"] },
  { key: 'oNama',   rs: 'oNama.html',   en: 'oNama-en.html',   labelRs: 'O nama',        labelEn: 'About Us',     path: ["index"] },

  { key: 'avalon',          rs: '../pagesRS/avalon.html',             en: '../pagesEN/avalon-en.html',              labelRs: 'Avalon',              labelEn: 'Avalon',            path: ["index", "catalog", "family"] },
  { key: 'azul',            rs: '../pagesRS/azul.html',               en: '../pagesEN/azul-en.html',                labelRs: 'Azul',                labelEn: 'Azul',              path: ["index", "catalog", "party"] },
  { key: 'catan',           rs: '../pagesRS/catan.html',              en: '../pagesEN/catan-en.html',               labelRs: 'Catan',               labelEn: 'Catan',             path: ["index", "catalog", "strategy"] },
  { key: 'coveceNeLjutiSe', rs: '../pagesRS/coveceNeLjutiSe.html',    en: '../pagesEN/coveceNeLjutiSe-en.html',     labelRs: 'Čoveče ne ljuti se',  labelEn: 'Ludo',              path: ["index", "catalog", "party"] },
  { key: 'druzinaOstrice',  rs: '../pagesRS/druzinaOstrice.html',     en: '../pagesEN/druzinaOstrice-en.html',      labelRs: 'Družina oštrice',     labelEn: 'Blade fellowship',  path: ["index", "catalog", "party"] },
  { key: 'memory',          rs: '../pagesRS/memory.html',             en: '../pagesEN/memory-en.html',              labelRs: 'Igra memorije',       labelEn: 'Memory',            path: ["index", "catalog", "family"] },
  { key: 'monopol',         rs: '../pagesRS/monopol.html',            en: '../pagesEN/monopol-en.html',             labelRs: 'Monopol',             labelEn: 'Monopoly',          path: ["index", "catalog", "family"] },
  { key: 'riziko',          rs: '../pagesRS/riziko.html',             en: '../pagesEN/riziko-en.html',              labelRs: 'Riziko',              labelEn: 'Risk',              path: ["index", "catalog", "strategy"] },
  { key: 'sah',             rs: '../pagesRS/sah.html',                en: '../pagesEN/sah-en.html',                 labelRs: 'Šah',                 labelEn: 'Chess',             path: ["index", "catalog", "strategy"] },

  { key: 'family',    rs: '../catalogs/family.html',    en: '../catalogs/family-en.html',     labelRs: 'Porodične igre',    labelEn: 'Family games',    path: ["index", "catalog"] },
  { key: 'party',     rs: '../catalogs/party.html',     en: '../catalogs/party-en.html',      labelRs: 'Zabavne igre',      labelEn: 'Party games',     path: ["index", "catalog"] },
  { key: 'strategy',  rs: '../catalogs/strategy.html',  en: '../catalogs/strategy-en.html',   labelRs: 'Strateške igre',    labelEn: 'Strategy games',  path: ["index", "catalog"] }
];

function isCatalogPage(key) {
  return ['family', 'party', 'strategy', 'catalog'].includes(key)
}

function getCurrPage() {
  let file = window.location.pathname.split('/').pop() || 'index.html'
  let page = file.split(".")[0].replace('-en', '')
  let curr = pages.find(p => p.key == page)
  return curr
}

function getPrefix() {
  const path = window.location.pathname;
  return (path.includes('/pagesRS/') || path.includes('/pagesEN/') || path.includes('/catalogs/')) ? '../' : '';
}

function navLink(currPage, linkPage, lang) {
  const isActive = currPage.key == linkPage.key
  let navLinkHTML = `
    <li class="nav-item">
      <a class="nav-link ${isActive ? "active" : ""}" ${isActive ? 'aria-current="page"' : ''} href="${getPrefix()}${lang == 'en' ? linkPage.en : linkPage.rs}">${label(linkPage.key, lang)}</a>
    </li>
  `
  return navLinkHTML
}

function getPage(pageKey) {
  return pages.find(p => p.key == pageKey)
}

function href(pageKey, lang) {
  const p = getPage(pageKey);
  return lang == 'en' ? p.en : p.rs;
}

function label(pageKey, lang) {
  const p = getPage(pageKey);
  return lang == 'en' ? p.labelEn : p.labelRs;
}

function addBreadCrumb() { 
  const lang = document.documentElement.lang == 'en' ? 'en' : 'rs'
  const page = getCurrPage()
  const prefix = getPrefix()

  $('nav.breadcrumb').remove()

  if (!page || page.path.length == 0) return

  let breadcrumb = $('<nav class="breadcrumb" aria-label="breadcrumb"></nav>')
  let inner = $('<ol class="breadcrumb"></ol>')

  page.path.forEach(path => {
    let li = $(`<li class="breadcrumb-item"><a href="${prefix}${isCatalogPage(path) ? 'catalogs/' : ''}${href(path, lang)}">${label(path, lang)}</a></li>`)
    inner.append(li);
  });

  inner.append($(`<li class="breadcrumb-item active" aria-current="page">${label(page.key, lang)}</li>`))

  breadcrumb.append(inner)
  $(breadcrumb).insertAfter('nav.navbar');
}

function showNavbar() { 
    const lang = document.documentElement.lang == 'en' ? 'en' : 'rs'
    const page = getCurrPage()
    const prefix = getPrefix()

    const navbarHTML = `
      <div class="container-fluid">

      <a class="navbar-brand" href="${prefix}${href('index', lang)}">
        <img src="${prefix}img/logo.svg" alt="Logo" width="75" height="60" class="d-inline-block align-text-center">
        Kocka
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
        </span>
      </button>

      <div class="collapse navbar-collapse align-center" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto">
          ${navLink(page, getPage('index'), lang)}
          ${navLink(page, getPage('gallery'), lang)}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle ${isCatalogPage(page.key) ? "active" : ""}" ${isCatalogPage(page.key) ? 'aria-current="page"' : ''} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${label('catalog', lang)}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="${prefix}catalogs/${href('family', lang)}">${label('family', lang)}</a></li>
              <li><a class="dropdown-item" href="${prefix}catalogs/${href('strategy', lang)}">${label('strategy', lang)}</a></li>
              <li><a class="dropdown-item" href="${prefix}catalogs/${href('party', lang)}">${label('party', lang)}</a></li>
            </ul>
          </li>
          ${navLink(page, getPage('cart'), lang)}
          ${navLink(page, getPage('oNama'), lang)}
        </ul>

        <div class="icons-cont">
          <div class="lang-check">
            <span>RS</span>
            <div class="form-check form-switch">
              <input class="form-check-input lang-switch" id="lang-${page.key}-${lang}" type="checkbox" role="switch" ${lang == 'en' ? 'checked' : ''}>
            </div>
            <span>EN</span>
          </div>

          <div class="cart-cont">
            <span class="position-relative">
              <a href="${prefix}${href('cart', lang)}" style="text-decoration: none">
                <span class="cart-icon">🛒</span>
              </a>
              <span id="cartBadge"
                class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">0</span>
            </span>
          </div>
        </div>

      </div>

    </div>
    `

    $('nav.navbar').html(navbarHTML);
}

const footerText = {
  rs: 'Copyright 2026, Огњен Ракић и Лука Нешић, Одсек за софтверско инжењерство Електротехничког факултета Универзитета у Београду',
  en: 'Copyright 2026, Ognjen Rakic i Luka Nesic, Department of Software Engineering, School of Electrical Engineering, University of Belgrade'
};

const bannerTitle = {
  rs: 'Партнерски сајтови',
  en: 'Partner sites'
};

const banners = [
  { href: 'https://boardgamegeek.com',        label: 'BoardGameGeek',  img: 'img/bgg.png' },
  { href: 'https://www.gmtgames.com/',        label: 'Gmt games',      img: 'img/gmt.png' },
  { href: 'https://www.asmodee.com',          label: 'Asmodee',        img: 'img/asmodee.png' },
  { href: 'https://wsbgvegas.com/',           label: 'WSBG',           img: 'img/wsbg.png' }
];

function showFooter() {
  const lang = document.documentElement.lang == 'en' ? 'en' : 'rs';
  const prefix = getPrefix();

  const bannersHTML = banners.map(b => `
    <a class="footer-banner" href="${b.href}" target="_blank" rel="noopener">
      <img src="${prefix}${b.img}" alt="${b.label}" height="40">
    </a>
  `).join('');

  $('body').append(`
    <footer class="site-footer">
      <div class="container-fluid text-center py-3">
        <div class="footer-banners">
          <span class="footer-banners-title">${bannerTitle[lang]}</span>
          <div class="footer-banners-list">
            ${bannersHTML}
          </div>
        </div>
        <small><i>${footerText[lang]}</i></small>
      </div>
    </footer>
  `);
}

function updateBadge() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  $('#cartBadge').text(cart.reduce((s, i) => s + i.qty, 0));
}


$(document).ready(function () {
    showNavbar()
    addBreadCrumb()
    showFooter()
    updateBadge()
});