$(document).ready(function() {
  
  var gameId = $('#addToCart').data('id');

  function updateCart() {
    var cartText = localStorage.getItem('cart');
    var cart = cartText ? JSON.parse(cartText) : [];
    
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
      totalItems += cart[i].qty;
    }
    $('#cartBadge').text(totalItems);
  }

  $('#addToCart').on('click', function() {
    var idGame = $(this).data('id');
    var nameGame = $(this).data('name');
    var priceGame = parseInt($(this).data('price'));

    var cartText = localStorage.getItem('cart');
    var cart = cartText ? JSON.parse(cartText) : [];

    //MODIFIKACIJA
    let reviews = JSON.parse(localStorage.getItem("reviews_" + idGame)) || [];
    let {sum, cnt} = reviews.reduce((i,j)=>{
      if(j.rating>0){
        i.sum+=j.rating;
        i.cnt++;
      }
      return i;
    },{sum :0, cnt :0});
    let average = cnt > 0 ? sum / cnt : 0;
    if(cart.find(i=>i.rating === average))
      return;
    

    var found = false;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === idGame) {
        cart[i].qty += 1;
        found = true;
      }
    }
    
    if (found === false) {
      cart.push({ id: idGame, name: nameGame, price: priceGame, qty: 1, rating: average });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    $('#cartMsg').text('✓ Dodato u korpu');
  });

  updateCart();

  var selectedRating = 0;

  $('#starInput span').on('mouseenter', function() {
    var ratingHover = $(this).data('v');
    $('#starInput span').each(function(index) {
      if (index < ratingHover) {
        $(this).addClass('hl');
      } else {
        $(this).removeClass('hl');
      }
    });
  });

  $('#starInput').on('mouseleave', function() {
    $('#starInput span').each(function(index) {
      if (index < selectedRating) {
        $(this).addClass('hl');
      } else {
        $(this).removeClass('hl');
      }
    });
  });

  $('#starInput span').on('click', function() {
    selectedRating = $(this).data('v');
    $('#ratingLabel').text(selectedRating + ' / 5');
  });

  function renderReviews() {
    var reviewsText = localStorage.getItem('reviews_' + gameId);
    var reviews = reviewsText ? JSON.parse(reviewsText) : [];
    
    var $list = $('#reviewList').empty();
    
    if (reviews.length === 0) {
      $('#avgStars').html('');
      $('#avgText').text('Još uvek nema ocena');
      $('#summary').text('Budite prvi koji će oceniti ovu igru.');
      $list.append('<p class="text-muted">Nema komentara.</p>');
      return;
    }

    var sumRating = 0;
    var countRating = 0;
    
    for (var k = 0; k < reviews.length; k++) {
      if (reviews[k].rating > 0) {
        sumRating += reviews[k].rating;
        countRating++;
      }
    }

    if (countRating > 0) {
      var average = sumRating / countRating;
      var starsAvgHtml = '';
      
      for (var z = 1; z <= 5; z++) {
        if (z <= Math.round(average)) {
          starsAvgHtml += '<span class="on">★</span>';
        } else {
          starsAvgHtml += '<span>★</span>';
        }
      }
      
      $('#avgStars').html(starsAvgHtml);
      $('#avgText').text(average.toFixed(1) + ' / 5 (' + countRating + ')');
      $('#summary').text('Prosečna ocena: ' + average.toFixed(1) + ' od 5 — na osnovu ' + countRating + ' ocena i ' + reviews.length + ' recenzija.');
    } else {
      $('#summary').text('Nema brojčanih ocena, samo komentari.');
    }

    for (var i = reviews.length - 1; i >= 0; i--) {
      var r = reviews[i];
      var starsHtml = '';
      
      if (r.rating > 0) {
        for (var j = 1; j <= 5; j++) {
          if (j <= r.rating) {
            starsHtml += '<span class="on">★</span>';
          } else {
            starsHtml += '<span>★</span>';
          }
        }
        starsHtml = '<div class="stars mb-2">' + starsHtml + '</div>';
      }

      var card = '<div class="card review-card mb-2">' +
                    '<div class="card-body py-3">' +
                      '<div class="d-flex justify-content-between align-items-center mb-1">' +
                        '<strong>' + r.author + '</strong>' +
                        '<small class="text-muted">' + r.date + '</small>' +
                      '</div>' +
                      starsHtml +
                      '<p class="mb-0">' + r.comment + '</p>' +
                    '</div>' +
                  '</div>';
                  
      $list.append(card);
    }
  }

  $("#removeComments").on("click",function(){
    localStorage.setItem("reviews_" + gameId, JSON.stringify([]))
  })

  $('#submitReview').on('click', function() {
    var author = $('#author').val().trim();
    var comment = $('#commentText').val().trim();

    if (author === '') {
      author = 'Anonimni korisnik';
    }

    if (selectedRating === 0 && comment === '') {
      $('#formError').text('Unesite ocenu ili napišite komentar.');
      return;
    }

    var reviewsText = localStorage.getItem('reviews_' + gameId);
    var reviews = reviewsText ? JSON.parse(reviewsText) : [];

    var todayDate = new Date().toLocaleDateString('sr-RS');
    if(!(reviews.find(i=>i.author === author && i.author!=='Anonimni korisnik')))
    reviews.push({
      rating: selectedRating,
      comment: comment,
      author: author,
      date: todayDate
    });

    localStorage.setItem('reviews_' + gameId, JSON.stringify(reviews));

    selectedRating = 0;
    $('#starInput span').removeClass('hl');
    $('#ratingLabel').text('');
    $('#author').val('');
    $('#commentText').val('');
    $('#formError').text('');

    renderReviews();
  });

  renderReviews();

});