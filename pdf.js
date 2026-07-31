const { jsPDF } = window.jspdf

const categories = [
    {key: 'family',      name_rs: 'Katalog porodicnih igara',      name_en: 'Family Games Catalog'},
    {key: 'strategy',    name_rs: 'Katalog strateskih igara',      name_en: 'Strategy Games Catalog'},
    {key: 'party',       name_rs: 'Katalog zabavnih igara',        name_en: 'Party Games Catalog'},
]

$(document).ready(function () {
    const lang = document.documentElement.lang == 'en' ? 'en' : 'rs'
    const cat = $("body").attr("id")
    const category = categories.find(c => c.key == cat)

    $("#save-pdf").click(function () { 
        let doc = new jsPDF()
        let games = getFilteredGames()
        let pos = 50
        let text1 = ''
        let text2 = ''


        doc.setFontSize(32)
        doc.text(`Kocka - ${lang == 'en' ? category.name_en : category.name_rs}`, 10, 20)
        doc.line(0, 30, 1000, 30)
        doc.setFontSize(20)
        games.forEach(game => {
            if (lang == 'en'){
                text1 = `Game: ${game.name_en}`
                text2 = `price: ${game.price} RSD`
            }
            else {
                text1 = `Igra: ${game.name_rs}`
                text2 = `cena: ${game.price} RSD`
            }
                
            doc.text(text1, 10, pos)
            doc.text(text2, 140, pos)
            pos += 20
        });

        doc.line(0, pos, 1000, pos)
        doc.setFontSize(10)
        doc.text(`${lang == 'en' ? 'Created at' : 'Kreirano u'}: ${(new Date()).toLocaleTimeString()}`, 150, pos + 10)
        doc.save(`${category.key}-${lang}.pdf`)
    });
});