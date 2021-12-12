
$.extend({
    getUrlVars: function(){
      var vars = [], hash, queries;
      var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      var queries = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < queries.length; i++)
      {
        query = queries[i].split('=');
        vars.push(query[0]);
        vars[query[0]] = query[1];
      }
      return vars;
    },
    getUrlVar: function(name){
      return $.getUrlVars()[name];
    }
});
  
$(function () {
  
    var query = $.getUrlVar('q');
    $('input[name=q]').val(query);
    
});

$(document).ready( function() { // Wait until document is fully parsed

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');
    const category = urlParams.get('category');
    
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


});
