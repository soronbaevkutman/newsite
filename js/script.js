$(function() {
  "use strict";
  var cfg = {		
		defAnimation   : "fadeInUp",    // default css animation		
		scrollDuration : 800,           // smoothscroll duration
		statsDuration  : 4000           // stats animation duration
	}
  var WIN = $(window);
  var ssMenu = function() {
    var hamburger = $('#header-hamburger');

    WIN.on('scroll', function() {
      if(WIN.scrollTop() > 150 ) {
        hamburger.addClass('open');
      }else {
        hamburger.removeClass('open');
      }
    });
  }
  ssMenu();
  var menuSbor = function() {
    var hamburger = $('#header-hamburger');
    var nav       = $('menu-nav-wrap');
    var closeButton = nav.find('.close-button');
    var siteBody =  $('body');
    var mainContents = $('section, footer');

    


    hamburger.on('click', function(e) {
      e.preventDefault();
      hamburger.toggleClass('is-clicked');
      siteBody.toggleClass('menu-is-open');
    });
    closeButton.on('click', function(e) {
      e.preventDefault();
      hamburger.trigger('click');
    });

    siteBody.on('click', function(e) {
      if(!$(e.target).is('#menu-nav-wrap, #header-hamburger, #header-hamburger span')) {
        hamburger.removeClass('is-clicked');
        siteBody.removeClass('menu-is-open');
      }
    });

  };
  menuSbor();
  var ssSmoothScroll = function() {
    $('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	   	

	    	$('html, body').stop().animate({
	       	'scrollTop': $target.offset().top
	      }, cfg.scrollDuration, 'swing').promise().done(function () {

	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
					$('#header-hamburger').trigger('click');
				}

	      	window.location.hash = target;
	      });
	  	});
    
  }
  ssSmoothScroll();
  var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
  };
  ssPlaceholder();

  var ssStatCounter = function() {

    var statSection = $("#stats"),
    stats           = $(".stat-count");

    statSection.waypoint({
      handler: function(direction) {

         if (direction === "down") { 
          stats.each(function () {
            var $this = $(this);

            $({ Counter: 0 }).animate({ Counter: $this.text() }, {
              duration: cfg.statsDuration,
              easing: 'swing',
              step: function (curValue) {
                 $this.text(Math.ceil(curValue));
               }
             });
         });
          } 

          // trigger once only
          this.destroy(); 
     },	
     offset: "90%"	
   });

   };
   ssStatCounter();

   var ssAlertBoxes = function() {

    $('.alert-box').on('click', '.close', function() {
    $(this).parent().fadeOut(500);
  }); 

  };
  ssAlertBoxes();
  var ssAnimations = function() {

		if (!$("html").hasClass('no-cssanimations')) {
			$('.animate-this').waypoint({
				handler: function(direction) {

					var defAnimationEfx = cfg.defAnimation;

					if ( direction === 'down' && !$(this.element).hasClass('animated')) {
						$(this.element).addClass('item-animate');

						setTimeout(function() {
							$('body .animate-this.item-animate').each(function(ctr) {
								var el       = $(this),
								animationEfx = el.data('animate') || null;	

	                  	if (!animationEfx) {
			                 	animationEfx = defAnimationEfx;	                 	
			               }

			              	setTimeout( function () {
									el.addClass(animationEfx + ' animated');
									el.removeClass('item-animate');
								}, ctr * 50);

							});								
						}, 100);
					}

					// trigger once only
	       		this.destroy(); 
				}, 
				offset: '95%'
			}); 
		}

  };
  ssAnimations();
});