function getLang () { 
    return $(".lang-switch").prop('checked') ? 'en' : 'rs'
}

$(document).ready(function () {
    $(".lang-switch").click(function () { 
        let lang = getLang()
        let id = $(this).attr('id').split('-')
        
        let newPage = id[1] + (id[id.length - 1] == 'rs' ? '-en' : '') + '.html'

        if (window.location.pathname.includes('/pagesRS/')) newPage = '../pagesEN/' + newPage
        else if (window.location.pathname.includes('/pagesEN/')) newPage = '../pagesRS/' + newPage

        console.log(newPage)
        window.location.href = newPage;
    });

});