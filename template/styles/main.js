
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

$(document).ready( function() { // Wait until document is fully parsed

  var query = $.getUrlVar('q');
  $('input[name=q]').val(query);

  function resizeHeaderLogoBg(){
    var leftSpaceAvailable = (($(window).width() - $("header").width())/2) + 50;
    console.log(leftSpaceAvailable);
    $(".header-logo-container").css("width", "" + leftSpaceAvailable + "px");
    $(".header-logo-block").css("width", "" + leftSpaceAvailable + "px");
  }

  resizeHeaderLogoBg();

  $(window).resize(resizeHeaderLogoBg);

});

function copyToClipboard(element, classToFade, textToCopy) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(textToCopy).select();
  document.execCommand("copy");
  $temp.remove();

  $(element).removeClass(classToFade).addClass('fa-check');

  setTimeout(function() {
    $(element).removeClass('fa-check').addClass(classToFade);
  }, 800);
}
