// hub.tmpls.main.js


$(function () {

    var catObj = {
        value: '',
        changed() {
            window.location.href = window.location.pathname + '#category=' + this.value;
            $('.category-box').hide();
            $('.' + this.value).show();
            $('ul.topic-list > li').removeClass('is-active');
            $('#' + this.value + '-category').addClass('is-active');
            $('#categoryName').text($('#' + this.value + '-category').text());
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

    $('ul.topic-list > li').click(function(){ 
        catObj.category = $(this).attr('data-category-slug');
    });
});