let games = [
    {
        id: "avalon",
        name_en: "The Resistance: Avalon",
        name_rs: "Avalon",
        price: 2799,
        rating: 0,
        category: 'family',
        desc_en: 'A social deduction game of hidden loyalty set in the court of King Arthur. Loyal servants of Arthur fight to defeat the minions of Mordred hiding among them.',
        desc_rs: 'Drustvena igra skrivene lojalnosti smestena na dvoru kralja Artura. Verni sledbenici Artura bore se da poraze Mordredove sluge skrivene medju njima.',
        players:10
    },
    {
        id: "azul",
        name_en: "Azul",
        name_rs: "Azul",
        price: 3999,
        rating: 0,
        category: 'party',
        desc_en: 'An abstract tile-laying game where players draft colourful tiles to decorate the walls of the Royal Palace of Evora. Plan carefully to score the most points.',
        desc_rs: 'Apstraktna igra slaganja plocica u kojoj igraci biraju sarene plocice da ukrase zidove Kraljevske palate u Evori. Planirajte pazljivo da osvojite najvise poena.',
        players:4
    },
    {
        id: "catan",
        name_en: "Catan",
        name_rs: "Catan",
        price: 3499,
        rating: 0,
        category: 'strategy',
        desc_en: 'A strategy game of trading and building settlements on the island of Catan. Gather resources, build roads and cities, and outwit your opponents.',
        desc_rs: 'Strateska igra trgovine i izgradnje naselja na ostrvu Catan. Skupljajte sirovine, gradite puteve i gradove i nadmudrite protivnike.',
        players:4
    },
    {
        id: "coveceNeLjutiSe",
        name_en: "Ludo",
        name_rs: "Čoveče ne ljuti se",
        price: 999,
        rating: 0,
        category: 'party',
        desc_en: 'A classic family race game. Move your four pawns around the board and be the first to bring them all home, knocking out opponents along the way.',
        desc_rs: 'Klasicna porodicna igra trke. Pomerajte svoje cetiri figure oko table i budite prvi koji ce ih sve dovesti kuci, izbacujuci protivnike usput.',
        players:4
    },
    {
        id: "druzinaOstrice",
        name_en: "Blade Fellowship",
        name_rs: "Družina oštrice",
        price: 4599,
        rating: 0,
        category: 'party',
        desc_en: 'A cooperative adventure game where a fellowship of heroes journeys across a perilous land, battling foes and uncovering secrets together.',
        desc_rs: 'Kooperativna avanturisticka igra u kojoj druzina junaka putuje kroz opasnu zemlju, boreci se sa neprijateljima i otkrivajuci tajne zajedno.',
        players:5
    },
    {
        id: "memory",
        name_en: "Memory",
        name_rs: "Memorija",
        price: 799,
        rating: 0,
        category: 'family',
        desc_en: 'A simple and fun memory game for all ages. Flip cards two at a time and find matching pairs. The player with the most pairs wins.',
        desc_rs: 'Jednostavna i zabavna igra memorije za sve uzraste. Okrećite karte dve po dve i pronalazite parove. Igrač sa najviše pronađenih parova pobeđuje.',
        players:6
    },
    {
        id: "monopol",
        name_en: "Monopoly",
        name_rs: "Monopol",
        price: 2999,
        rating: 0,
        category: 'family',
        desc_en: 'The classic game of buying, renting and trading properties. Bankrupt your opponents and become the wealthiest player to win.',
        desc_rs: 'Klasicna igra kupovine, iznajmljivanja i trgovine nekretninama. Dovedite protivnike do bankrota i postanite najbogatiji igrac da biste pobedili.',
        players:6
    },
    {
        id: "riziko",
        name_en: "Risk",
        name_rs: "Riziko",
        price: 3299,
        rating: 0,
        category: 'strategy',
        desc_en: 'A game of global domination and strategy. Command your armies, conquer territories and eliminate your rivals to rule the world.',
        desc_rs: 'Igra globalne dominacije i strategije. Komandujte svojim armijama, osvajajte teritorije i eliminisite rivale da biste zavladali svetom.',
        players:6
    },
    {
        id: "sah",
        name_en: "Chess",
        name_rs: "Šah",
        price: 1499,
        rating: 0,
        category: 'strategy',
        desc_en: 'The timeless game of strategy for two players. Outmanoeuvre your opponent and checkmate their king on the 64-square board.',
        desc_rs: 'Bezvremenska strateska igra za dva igraca. Nadmudrite protivnika i matirajte njegovog kralja na tabli od 64 polja.',
        players:2
    }
]

const lang = document.documentElement.lang == 'en' ? 'en' : 'rs'
let searchVal = '';

function createGameCard(game) {
    const link = `../pages${lang.toUpperCase()}/${game.id}${lang == 'en' ? '-en' : ''}.html`
    const imgLink = `../img/${game.id}-1.jpg`

    let gameCardHTML = `
            <a href="${link}">
                <div class="game-card">
                    <div class="game-img-cont">
                        <img src="${imgLink}" class="game-img">
                    </div>
                    <div class="game-card-body">
                        <div class="game-card-header">
                            <h5 class="display-6 game-name">${lang == 'en' ? game.name_en : game.name_rs}</h5>
                            <p class="game-price text-uppercase">${game.price} RSD</p>
                        </div>
                        <small class="text-muted game-description fs-5">
                           ${lang == 'en' ? game.desc_en : game.desc_rs} 
                        </small>
                    </div>
                </div>
            </a>
    `
    return $(gameCardHTML)
}

const sortOptions = {
  priceAsc:   (a, b) => a.price - b.price,
  priceDesc:  (a, b) => b.price - a.price,
  nameAsc:    (a, b) => lang == 'en' ? a.name_en.localeCompare(b.name_en) : a.name_rs.localeCompare(b.name_rs),
  nameDesc:   (a, b) => lang == 'en' ? b.name_en.localeCompare(a.name_en) : b.name_rs.localeCompare(a.name_rs),
  playersAsc:(a,b)=>a.players - b.players,
  playersDesc:(a,b)=>b.players - a.players
};

let sortOption = sortOptions.nameAsc

function displayCards(games) {
    $('.games-cont').empty();
    let gamesSorted = games.sort(sortOption)
    gamesSorted.forEach(game => {
        $('.games-cont').append(createGameCard(game))
    });
}

function search(games) {
    let searchOption = $('#search-by').val()
    return games.filter(g => lang == 'en' ? g.name_en.toLowerCase().includes(searchVal) : g.name_rs.toLowerCase().includes(searchVal))
}

function priceFilter(games) {
    let low = parseInt($('#price-range-low').val())
    let high =  parseInt($('#price-range-high').val())

    if (low > high) {
        let tmp = low
        low = high
        high = tmp
    }
    $('#price-range-display').text(`${low} - ${high} RSD`)

    return games.filter(g => g.price >= low && g.price <= high)
}

function playersFilter(games) {
    let low = parseInt($('#players-range-low').val())
    let high =  parseInt($('#players-range-high').val())

    if (low > high) {
        let tmp = low
        low = high
        high = tmp
    }
    $('#players-range-display').text(`${low} - ${high} 👥`)

    return games.filter(g => g.players >= low && g.players <= high)
}

function getFilteredGames() {
    return search(priceFilter(games.filter(g => g.category == $('body').attr('id')))).sort(sortOption);
}

$(document).ready(function () {
    const lang = document.documentElement.lang == 'en' ? 'en' : 'rs'
    const category = $('body').attr('id');
    let gamesFiltered = games.filter(g => g.category == category)

    displayCards(gamesFiltered)

    $('#sort-by').on('change', function() {
        sortOption = sortOptions[$(this).val()]
        displayCards(search(priceFilter(gamesFiltered)))
    })

    $('#search').on('input', function() {
        searchVal = $(this).val()
        displayCards(search(priceFilter(gamesFiltered)))
    })

    let minPrice = Math.min(...gamesFiltered.map(g=>g.price))
    let maxPrice = Math.max(...gamesFiltered.map(g=>g.price))
    $('#price-range-display').text(`${minPrice} - ${maxPrice} RSD`)

    $('.price-range').attr('min', minPrice)
    $('.price-range').attr('max', maxPrice)

    $('#price-range-low').attr('value', minPrice)
    $('#price-range-high').attr('value', maxPrice)

    $('.price-range').on('input', function() {
        displayCards(search(priceFilter(gamesFiltered)))
    })

    let minPl = Math.min(...gamesFiltered.map(g=>g.players))
    let maxPl = Math.max(...gamesFiltered.map(g=>g.players))
    $('#players-range-display').text(`${minPl} - ${maxPl} 👥`)

    $('.players-range').attr('min', minPl)
    $('.players-range').attr('max', maxPl)

    $('#players-range-low').attr('value', minPl)
    $('#players-range-high').attr('value', maxPl)

    $('.players-range').on('input', function() {
        displayCards(search(playersFilter(gamesFiltered)))
    })


});