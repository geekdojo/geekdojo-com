$(document).ready( function() { // Wait until document is fully parsed

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');
    
    $("#header-search-input").val(searchParam);

    $("#header-search-form").on('submit', function(e){
  
        var searchValue = $("#header-search-input").val();
        window.location.href = window.location.protocol + '//' + window.location.host + '/search.html?q=' + encodeURIComponent(searchValue);

        e.preventDefault();
  
    });

    $("#hero-search-input").val(searchParam);

    $("#hero-search-form").on('submit', function(e){

        var searchValue = $("#hero-search-input").val();
        window.location.href = window.location.protocol + '//' + window.location.host + '/search.html?q=' + encodeURIComponent(searchValue);

        e.preventDefault();

    });
  })