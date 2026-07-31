const cartLang = document.documentElement.lang == 'en' ? 'en' : 'rs'

const cartText = {
    rs: { empty: 'Korpa je prazna.', total: 'Ukupno:', finalize: 'Završi kupovinu',
          history: 'Istorija porudžbina', order: 'Porudžbina', noOrders: 'Nema prethodnih porudžbina.' },
    en: { empty: 'Your cart is empty.', total: 'Total:', finalize: 'Checkout',
          history: 'Order history', order: 'Order', noOrders: 'No previous orders.' }
}[cartLang]

function loadCart() { 
    if (localStorage.getItem('cart') != null)
        return JSON.parse(localStorage.getItem('cart'))
    else
        return []
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function loadOrders(){
    if (localStorage.getItem('orders') != null)
        return JSON.parse(localStorage.getItem('orders'))
    else
        return []
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders))
}

function gameName(id) {
    let g = games.find(x => x.id === id)
    if (!g) return id
    return cartLang == 'en' ? g.name_en : g.name_rs
}

function showPurchases(){
    let list = $(".cart-history").empty()
    let orders = loadOrders()

    $(list).append(`<h3 class="display-6 mb-3">${cartText.history}</h3>`)

    if (orders.length === 0) {
        $(list).append(`<p class="text-muted">${cartText.noOrders}</p>`)
        return
    }

    orders.slice().reverse().forEach(order => {
        let itemsHtml = order.items
            .map(i => `
                <li class="d-flex justify-content-between">
                    <span>${gameName(i.id)} <span class="text-muted">x ${i.qty}</span></span>
                    <span>${i.price * i.qty} RSD</span>
                </li>
            `).join('')

        let orderElem = $(`
            <div class="card mb-3 order-card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <strong>${cartText.order} #${order.id}</strong>
                        <small class="text-muted">${order.date}</small>
                    </div>
                    <ul class="list-unstyled mb-2">${itemsHtml}</ul>
                    <div class="d-flex justify-content-between border-top pt-2">
                        <strong>${cartText.total}</strong>
                        <strong>${order.total} RSD</strong>
                    </div>
                </div>
            </div>
        `)

        $(list).append(orderElem)
    });
}

function showCart() {
    let list = $(".cart-list").empty()
    let cart = loadCart()
    let priceSum = 0

    cart.forEach(game => {
        priceSum += game.price * game.qty
        let gameNameElem = $(`<h5 class="display-6">${gameName(game.id)}</h5>`)
        let gameQtyElem = $(`<span class="game-qty">x ${game.qty}</span>`)
        let gamePriceElem = $(`<span>${game.price * game.qty} RSD</span>`)
        let minusBtn = $(`<button class="btn btn-sm btn-outline-secondary qty-minus" data-id="${game.id}">-</button>`)
        let gameElem = $(`<ul class="game-elem"></ul>`)
            .append(gameNameElem).append(gameQtyElem).append(gamePriceElem).append(minusBtn)
        $(list).append(gameElem);
    });

    if (cart.length === 0) {
        $(list).append(`<ul class="game-elem"><span>${cartText.empty}</span></ul>`)
        return
    }

    let totalElem = $(`<ul class="game-elem"><span>${cartText.total}</span><span>${priceSum} RSD</span></ul>`)
    let finalizeBtn = $(`<ul class="game-elem"><button class="btn btn-primary finalize-btn">${cartText.finalize}</button></ul>`)
    $(list).append(totalElem)
    $(list).append(finalizeBtn)
}

$(document).ready(function () {
    showCart()
    showPurchases()

    $(document).on('click', '.qty-minus', function () {
        let id = $(this).data('id')
        let cart = loadCart()
        let game = cart.find(g => g.id === id)
        if (!game) return

        game.qty -= 1
        if (game.qty <= 0) cart = cart.filter(g => g.id !== id)

        saveCart(cart)
        showCart()
        updateBadge()
    });

    $(document).on('click', '.finalize-btn', function () {
        let cart = loadCart()
        if (cart.length === 0) return

        let orders = loadOrders()
        orders.push({
            id: orders.length + 1,
            date: new Date().toLocaleString(cartLang == 'en' ? 'en-GB' : 'sr-RS'),
            items: cart,
            total: cart.reduce((s, g) => s + g.price * g.qty, 0)
        })

        saveOrders(orders)
        localStorage.removeItem('cart')
        showCart()
        showPurchases()
        updateBadge()
    });
});