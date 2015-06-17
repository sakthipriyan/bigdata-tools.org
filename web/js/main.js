// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
  var MQL = 1170;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('.navbar-custom').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-visible');
          } else {
            $('.navbar-custom').removeClass('is-visible is-fixed');
          }
        } else {
          //if scrolling down...
          $('.navbar-custom').removeClass('is-visible');
          if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }
});

$(document).ready(function() {

  function getLocation() {
    return encodeURIComponent($(location).attr('href'));
  }

  function getTitle() {
    return escape($(document).find("title").text());
  }

  $('#facebook').click(function(e) {
    //We tell our browser not to follow that link
    e.preventDefault();
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + getLocation(),
      'facebook-share-dialog-1',
      'height=400, width=500,	top=' + ($(window).height() / 2 - 200) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  });

  $('#twitter').click(function(e) {
    e.preventDefault();
    window.open('http://twitter.com/share?url=' + getLocation() + '&text=' + getTitle(),
      'twitter-share-dialog-1',
      'height=400, width=500,	top=' + ($(window).height() / 2 - 200) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  });

  $('#google').click(function(e) {
    e.preventDefault();
    window.open('https://plus.google.com/share?url=' + getLocation(),
      'google-share-dialog-1',
      'height=400, width=500,	top=' + ($(window).height() / 2 - 200) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  });

  $('#linkedin').click(function(e) {
    e.preventDefault();
    window.open('https://www.linkedin.com/shareArticle?mini=true&source=bigdata-tools.org&url=' + getLocation() + '&title=' + getTitle(),
      'google-share-dialog-1',
      'height=400, width=500,	top=' + ($(window).height() / 2 - 200) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  });

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

});
