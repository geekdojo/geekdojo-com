
$(function(){

  var articleTotalCount = $('.all').length;

  var catObj = {
    value: '',
    changed() {
        window.location.href = window.location.pathname + '#category=' + this.value;
        $('.category-box').hide();
        var articleCount = $('.' + this.value).show().length;        
        $('ul.topic-list > li').removeClass('is-active');
        $('#homepage-filter-ddl-btn').text($('#homepage-filter-ddl li a[data-category-slug="' + this.value + '"]').text());
        $('#homepage-article-count').text('' + articleCount + ' of ' + articleTotalCount + ' articles');
    },
    get category() {
      return this.value;
    },
    set category(value) {
      this.value = value;
      this.changed();
    }
  }

  var temp = $.getUrlVar('category');

  // redirect to featured list if no category selected
  if(typeof(temp) !== 'undefined') {
      if(temp === '') {
          temp = 'featured';
      }
  } else {
      temp = 'featured';
  }

  catObj.category = temp;

  $("#homepage-filter-ddl li a").click(function(){

    catObj.category = $(this).attr('data-category-slug');

  });

  $(".category-box-slugs-list li").click(function(){

    catObj.category = $(this).text();

  });


});