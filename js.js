const url = 'https://fr.wikipedia.org/w/api.php';
const urlTo = 'https://fr.wikipedia.org/?curid=';

function getSearch(search) {
  $.ajax({
    url: `https://fr.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=8&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${search}&callback=JSON_CALLBACK`,
    type: 'GET',
    dataType: 'jsonp',
    success: function (reponse) {
      const data = reponse.query.pages;
      $('.main').removeClass('full');
      let numD = 9;
      $('li').each(function (t) {
        $('#' + numD + '').slideUp(300, function () {
          $(this).remove();});
        numD--;
      });
      $('.history').append('<li id="' + search + '">' + search + '</li>');
      let num = 0;
      $.each(data, function (i, obj) {
        $('#results').append('<li id="' + num + '"><a href="' + urlTo + obj.pageid + '" targuet="_blank"><h2>' + obj.title + '</h2><p class="extract">' + obj.extract + '</p></a></li>');
        num++;
      });
      $('li').each(function (t) {
        $(this).delay(t * 50).slideDown();
      });
    },
    error: function (jqXHR, status, errorThrown) {
      console.log(jqXHR);
    } });

}

function main() {
  $(document).keypress(function (e) {
    const keycode = e.keyCode;
    if (keycode === 13) {
      let search = $('#search').val();
      if (search !== "") {
        getSearch(search);
      } else {
        let num = 9;
        $('li').each(function (t) {
          $('#' + num + '').slideUp(300, function () {
            $(this).remove();});
          num--;
        });
        $('#results').append(`<p>Entrez un terme dans le champs de recherche.</p>`);
      }
    }
  });
}

$('document').ready(main);
