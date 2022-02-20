// -----------------------------

//   JS INDEX
/* =================== */
/* 

    ## Type Js
    ## Preloder
    ## smart menu
    ## Stiky menu
    ## Scrool Menu
    ## owl carousl
    ## Smooth Infinit Slider
    ## Wow
    ## Timer Js
    ## Googel Map
    ## Shuffle Js
    ## Ajax

*/

(function($) {
  "use strict"; 

 //**======================Type Js =============**/
if ($('.type').length > 0) {   
   
new Typed('.type', {
  strings: ["New Solution", "New Creation", "Invention", "New Solution"],
  stringsElement: null,
		// typing speed
		typeSpeed: 50,
		// time before typing starts
		startDelay: 1000,
		// backspacing speed
		backSpeed: 30,
		// time before backspacing
		backDelay: 500,
		// loop
		loop: true,
		// false = infinite
    loopCount: 5
});

}
 //**======================End Type Js =============**/
 

//**================== Preloder========================*//
$(window).on('load', function() {
  $('#preloader').fadeOut('slow', function() { $(this).remove(); });
});

//**================= End of Preloder =====================**//

//**================= Smart Menu =====================**//
// SmartMenus init
$(function() {
  $('#main-menu').smartmenus({
    subMenusSubOffsetX: 6,
    subMenusSubOffsetY: -8
  });
});

// SmartMenus mobile menu toggle button
$(function() {
  var $mainMenuState = $('#main-menu-state');
  if ($mainMenuState.length) {
    // animate mobile menu
    $mainMenuState.change(function(e) {
      var $menu = $('#main-menu');
      if (this.checked) {
        $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
      } else {
        $menu.show().slideUp(250, function() { $menu.css('display', ''); });
      }
    });
    // hide mobile menu beforeunload
    $(window).bind('beforeunload unload', function() {
      if ($mainMenuState[0].checked) {
        $mainMenuState[0].click();
      }
    });
  }
});

//**================= End Smart Menu =====================**//

//**================= Sticky =====================**//

$(window).on('scroll', function() {
  if ($(window).scrollTop() > 50) {
      $('.header-area').addClass('nav-fixed');
  } else {
      $('.header-area').removeClass('nav-fixed');
  }
});



//**=================End Sticky =====================**//

//**===================Scroll UP ===================**//

$(document).ready(function () {

  $(window).scroll(function () {
      if ($(this).scrollTop() > 150) {
          $('.scrollup-icon').fadeIn();
      } else {
          $('.scrollup-icon').fadeOut();
      }
  });

  $('.scrollup-icon').click(function () {
      $("html, body").animate({
          scrollTop: 0
      }, 1000);
      return false;
  });

});
//**===================Scroll UP ===================**//


//**================= CounterUp =====================**//
if ($('.counterUp').length > 0) {   
    $('.counterUp').counterUp({
        delay: 10,
        time: 1000
    });
  }
  
  //**================= End CounterUp =====================**//

//*==================nav Click Animation================= *//

   /*---------------------
    smooth scroll
    --------------------- */
    if ($('.smoothscroll').length > 0) {   
      
    $('.smoothscroll').on('click', function(e) {
      e.preventDefault();
      var target = this.hash;

      $('html, body').stop().animate({
          'scrollTop': $(target).offset().top - 80
      }, 1200);
  });
}


//*===============End nav Click Animation==================*//


//*===============Smooth Infinit Slider Js ================*//

$(".default-ticker").ticker();
var newsTicker = $(".news").ticker({
    speed: 100,
    pauseOnHover: !0,
    item: ".news-item"
}).data("ticker");
$("#news-toggle").on("click", function() {
    newsTicker.toggle()
}), $(".speed-test").each(function() {
    $(this).ticker({
        speed: $(this).data("speed") || 180
    })
});

//*===============Smooth Infinit Slider Js ================*//

//*Animation js *//

//**=================== WOW ================================**//
   var wowSel = 'wow';
   var wow = new WOW({
       boxClass: wowSel,
       animateClass: 'animated',
       offset: 0,
       mobile: true,
       live: true,
       callback: function(box) {
       },
       scrollContainer: null
   });
   wow.init();

//**============== End of WOW =============================**//


//**================== Owl Carousl========================*//

if ($('.blog-slide-1').length > 0) {   

$('.blog-slide-1').owlCarousel({

  loop:true,
  margin:30,
  center:true,
  dots:false,
  nav:true,
  autoplay:true,
  autoplayTimeout:3000,
  smartSpeed :2000,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:2
          },
      1000:{
          items:3
      }
  }
  
})

}

   //slider-2

   if ($('.fortfolio-slide-1').length > 0) {   

    $('.fortfolio-slide-1').owlCarousel({
      loop:true,
      margin:30,
      center:true,
      dots:false,
      nav:true,
      autoplay:true,
      autoplayTimeout:3000,
      smartSpeed :2000,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:3
          }
      }
      
    })
    }
//slider 3
    if ($('.fortfolio-slide-2').length > 0) {   
      $('.fortfolio-slide-2').owlCarousel({
        loop:true,
        margin:30,
        center:true,
        dots:true,
        nav:false,
        autoplay:true,
        autoplayTimeout:3000,
        smartSpeed :2000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:4
            },
            1000:{
                items:4
            }
        }        
      })
      }
//slide-4
if ($('.designer-slide').length > 0) {   
  $('.designer-slide').owlCarousel({
    loop:true,
    margin:30,
    center:true,
    dots:false,
    nav:false,
    autoplay:true,
    autoplayTimeout:3000,
    smartSpeed :2000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }   
  })
  }

//slider-5
if ($('.hero4-slide').length > 0) { 
  $('.hero4-slide').owlCarousel({
   
    loop:true,
    margin:0,
    center:true,
    dots:true,
    nav:false,
    autoplay:true,
    autoplayTimeout:5000,
    smartSpeed :2000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
   
  })

  }


  
//slider-6
if ($('.screenshot-slide').length > 0) { 
  $('.screenshot-slide').owlCarousel({
   
    loop:true,
    margin:0,
    center:true,
    dots:true,
    nav:false,
    autoplay:true,
    autoplayTimeout:3000,
    smartSpeed :1000,
    responsive:{
        0:{
            items:1
        },
        400:{
          items:2
      },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
   
  })
  }
  //slider -7
  if ($('.screenshot-slide-2').length > 0) { 
    $('.screenshot-slide-2').owlCarousel({
      loop:true,
      margin:0,
      center:true,
      dots:true,
      nav:false,
      autoplay:true,
      autoplayTimeout:3000,
      smartSpeed :1000,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:5
          }
      }
     
    })
    }
    //slider -8
    if ($('.team-slide-1').length > 0) { 
      $('.team-slide-1').owlCarousel({
        loop:true,
        margin:30,
        center:true,
        dots:true,
        nav:false,
        autoplay:true,
        autoplayTimeout:3000,
        smartSpeed :1000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
       
      })
      }

    // slide-9  
if ($('.releted-post-slide').length > 0) {   

  $('.releted-post-slide').owlCarousel({
  
    loop:true,
    margin:0,
    center:true,
    dots:true,
    nav:false,
    autoplay:true,
    autoplayTimeout:3000,
    smartSpeed :2000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
            },
        1000:{
            items:1
        }
    }
    
  })
  
  }
//**==================End  Owl Carousl========================*//



//*================Portfolio Shuffle ============*//
/*---------------------
    Shuffle Activation    
   --------------------- */
   $(window).on('load', function(e) {
    if ($('body').find('.my-shuffle-container').length !== 0) {
        var Shuffle = window.Shuffle;
        var jQuery = window.jQuery;
        var portFolioShuffle = new Shuffle(document.querySelector('.my-shuffle-container'), {
            itemSelector: '.single-portfolio',
            sizer: '.Ssizer-element',
            buffer: 1,
        });
        $('input[name="shuffle-filter"]').on('change', function(evt) {
            var input = evt.currentTarget;
            if (input.checked) {
                portFolioShuffle.filter(input.value);
            }
        });
    }
});



//*================End Portfolio Shuffle ============*//

    //Timer Js//

    if ($('body').find('#clockdiv').length !== 0) {

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
    
    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');
    
      function updateClock() {
        var t = getTimeRemaining(endtime);
    
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
    
      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }
    
    var deadline = new Date(Date.parse(new Date()) + 25 * 24 * 60 * 60 * 1000);
    initializeClock('clockdiv', deadline);
  }

  //Time Js


}(jQuery));



//**=================== Google Map ==========================**//

if ($('#googleMap').length > 0) { 
var user_lat, user_lng;
    var map;

    function initMap() {
        map = new google.maps.Map(document.getElementById('googleMap'), {
            center: {
                lat: 23.782062,
                lng: 90.416053
            },
            zoom: 15,
            scrollwheel: false
        });
              
      var marker = new google.maps.Marker({
        position:  {  lat: 23.782062, lng: 90.416053},
        map: map,
        icon: "assets/img/map.gif"
      });

          } 
        }
//====================================================================
//map2
var user_lat, user_lng;
    var map;
    var grayStyles = [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]

    function initMap() {
        map = new google.maps.Map(document.getElementById('googleMap2'), {
            center: {
                lat: 23.782062,
                lng: 90.416053
            },
            zoom: 15,
            scrollwheel: false,
            styles: grayStyles
        });
              
     /*  var marker = new google.maps.Marker({
        position:  {  lat: 23.782062, lng: 90.416053},
        map: map,
        icon: "assets/images/gmap.png"
      }); */

          } 
//*================ End Google Map ============*//



/*---------------------
    // Ajax Contact Form
    --------------------- */

   $('.cf-msg').hide();
    $('form#cf button#submit').on('click', function() {
    
        var yourname = $('#yourname').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var phone = $('#phone').val();
        var msg = $('#msg').val();2
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
        if (!regex.test(email)) {
            alert('Please enter valid email');
            return false;
        }
    
        yourname = $.trim(yourname);
        email = $.trim(email);
        msg = $.trim(msg);
    
        if (yourname != '' && email != '' && subject != '' && phone != '' && msg != '') {
            var values = "yourname=" + yourname + "&email=" + email + "&subject=" + subject + "&phone=" + phone + "&msg=" + msg;
            $.ajax({
                type: "POST",
                url: "assets/mail-sender/contact.php",
                data: values,
                success: function() {
                    $('#yourname').val('');
                    $('#email').val('');
                    $('#subject').val('');
                    $('#phone').val('');
                    $('#msg').val('');
    
                   $('.cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                    setTimeout(function() {
                        $('.cf-msg').fadeOut('slow');
                    }, 4000);
                }
            });
        } else {
            $('.cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')   
            $('.cf-msg').fadeOut(2000)
        }
        return false;
    });

// Ajax Contact Form JS END


    
    // Product Cart  Increment

    function increaseValue() {
      var value = parseInt(document.getElementById('number').value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      document.getElementById('number').value = value;
    }
    
    function decreaseValue() {
      var value = parseInt(document.getElementById('number').value, 10);
      value = isNaN(value) ? 0 : value;
      value < 1 ? value = 1 : '';
      value--;
      document.getElementById('number').value = value;
    }

    // Product Cart  Increment End

