
$(document).ready(function(){
	"use strict";

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;


	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

 //-------- Active Sticky Js ----------//
     $(".default-header").sticky({topSpacing:0});


     // -------   Active Mobile Menu-----//

    $(".menu-bar").on('click', function(e){
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


    //  video popup

    $('.play-btn').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });



    //  member carusel

    $('.active-member-carousel').owlCarousel({
        items:1,
        loop:true,
        margin: 30,
        dots: true,
    });

    $('.next-trigger').click(function() {
        $(".active-member-carousel").trigger('next.owl.carousel');
    })
        // Go to the previous item
    $('.prev-trigger').click(function() {
        $(".active-member-carousel").trigger('prev.owl.carousel');
    });



    // -------   Mail Send ajax

     $(document).ready(function() {

      const form = document.getElementById('contact-form');
      const submitBtn = $("#submit-btn")
      const submitText = $("#submit-btn-text")
      const alert = $('#alert-msg'); // alert div for show alert message

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        alert.fadeOut();
        const originalSubmitText = submitText.text();
        submitText.text('Sending....'); // change submit button text
        submitBtn.prop('disabled', true);

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                  alert.html("Form submitted successfully").fadeIn();
                } else {
                    console.log(response);
                    alert.html(json.message).fadeIn();
                }
            })
            .catch(error => {
                console.log(error);
                alert.html("Something went wrong!").fadeIn();
            })
            .then(function() {
              form.reset();
              submitText.text(originalSubmitText);
              submitBtn.prop('disabled', false);
              setTimeout(() => {
                alert.fadeOut();
              }, 10000);
        });
      });

    });


 });
