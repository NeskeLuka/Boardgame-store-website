let gameRatings = []

function getReviews(gameId) { 
    let key = `reviews_${gameId}`
    let reviews = []
    if (localStorage.getItem(key) == null) {
        localStorage.setItem(key, JSON.stringify(reviews))
    }
    else {
        reviews = JSON.parse(localStorage.getItem(key))
    }
    return reviews
}

function avg(list) { 
    return list.length > 0 ? list.reduce((acc, x) => acc + x.rating, 0) / list.length : 0.0
}

function getRatings() {
    if (gameRatings.length != 0) return
    games.forEach(game => {
        gameRatings.push({key: game.id, rating: avg(getReviews(game.id))})
    });
}

function getTop3() {
    return gameRatings.sort((a,b) => b.rating - a.rating).slice(0,3)
}

function getLast3(){
    return gameRatings.sort((a,b) => a.rating - b.rating).slice(0,3)
}

function addTopGame(gameRating) {
    let game = games.find(g => g.id == gameRating.key)

    const link = `./pages${lang.toUpperCase()}/${game.id}${lang == 'en' ? '-en' : ''}.html`
    const imgLink = `./img/${game.id}-1.jpg`
    const name = lang == 'en' ? game.name_en : game.name_rs
    const desc = lang == 'en' ? game.desc_en : game.desc_rs

    let gameCardHTML = `
        <div class="card">
            <a href="${link}">
              <img src="${imgLink}" class="card-img-top" alt="Avalon">
            </a>
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${desc}</p>
              <p class="card-text">
                <span><strong class="text-success fs-4">${gameRating.rating.toFixed(1)}/5.0</strong></span>
                <span><strong>${game.price} RSD</strong></span>
              </p>
            </div>
        </div>
    `

    $('#top-3-games').append($(gameCardHTML));
}

function addLastGame(gameRating) {
    let game = games.find(g => g.id == gameRating.key)

    const link = `./pages${lang.toUpperCase()}/${game.id}${lang == 'en' ? '-en' : ''}.html`
    const imgLink = `./img/${game.id}-1.jpg`
    const name = lang == 'en' ? game.name_en : game.name_rs
    const desc = lang == 'en' ? game.desc_en : game.desc_rs

    let gameCardHTML = `
        <div class="card">
            <a href="${link}">
              <img src="${imgLink}" class="card-img-top" alt="Avalon">
            </a>
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${desc}</p>
              <p class="card-text">
                <span><strong class="text-success fs-4">${gameRating.rating.toFixed(1)}/5.0</strong></span>
                <span><strong>${game.price} RSD</strong></span>
              </p>
            </div>
        </div>
    `

    $('#last-3-games').append($(gameCardHTML));
}

$(document).ready(function () {
    getRatings()
    $('#top-3-games').empty();
    getTop3().forEach(gameRating => {
        addTopGame(gameRating)
    });
    $("#last-3-games").empty();
    getLast3().forEach(gameRating => {
        addLastGame(gameRating)
    });
});