(function($) {
  Drupal.behaviors.field_slideshow = {
    attach: function(context) {

      for (i in Drupal.settings.field_slideshow) {
      	
      	console.log("sss",i);
        var settings = Drupal.settings.field_slideshow[i],
          slideshow = $('div.' + i),
          num_slides = slideshow.children().length,
          $this = false;

        if (!slideshow.hasClass('field-slideshow-processed') && slideshow.is(':visible')) {
          slideshow.addClass('field-slideshow-processed');
          var slideshow_div = i;
          // Add padding if needed
          var max_outerWidth = 0;
          var max_outerHeight = 0;
          $('.field-slideshow-slide img', slideshow).each(function() {
            $this = $(this);
            max_outerWidth = Math.max(max_outerWidth, $this.outerWidth(true));
            max_outerHeight = Math.max(max_outerHeight, $this.outerHeight(true));
          });
          $('.field-slideshow-slide a', slideshow).each(function() {
            $this = $(this);
            max_outerWidth = Math.max(max_outerWidth, $this.outerWidth(true));
            max_outerHeight = Math.max(max_outerHeight, $this.outerHeight(true));
          });
          $('.field-slideshow-slide', slideshow).each(function() {
            $this = $(this);
            max_outerWidth = Math.max(max_outerWidth, $this.outerWidth(true));
            max_outerHeight = Math.max(max_outerHeight, $this.outerHeight(true));
          });
          slideshow.css({
            //'padding-right': (max_outerWidth - parseInt(slideshow.css('width'))) + 'px',
            //'padding-bottom': (max_outerHeight - parseInt(slideshow.css('height'))) + 'px'
          });
          
          var slideshow_id = $('#' + i+'-wrapper').attr('data-slide-number');
          if('undefined' != typeof field_slideshow_data['carousel_auto_rotate_speed_' + slideshow_id] && field_slideshow_data['carousel_auto_rotate_speed_' + slideshow_id] != ''){
          	settings.timeout = field_slideshow_data['carousel_auto_rotate_speed_' + slideshow_id];
          }

          if('undefined' != typeof field_slideshow_data['disable_auto_rotate_mobile_' + slideshow_id] && field_slideshow_data['disable_auto_rotate_mobile_' + slideshow_id] == 1 && ($(window).width() < 767)){
          	settings.timeout = 600000;
          }
          
          if(Drupal.settings.aol.country == 'ar'){
          	settings.timeout = 2000;
          }
          if(Drupal.settings.aol.country == 'no'){
          	settings.timeout = 6000;
          }
          // Add options
          var options = {
            resizing: 0,
            fx: settings.fx,
            speed: settings.speed,
            timeout: parseInt(settings.timeout),
            index: i,
            settings: settings
          }
          if($('div.' + i+' .full_carousel_pager').length > 0)
          	options.pager = 'div.' + i+' .full_carousel_pager';

          if (settings.speed == "0" && settings.timeout == "0") options.fastOnEvent = true;
          if (settings.controls) {
            options.prev = "#" + i + "-controls .prev";
            options.next = "#" + i + "-controls .next";
          }
          if (settings.pause) options.pause = true;
console.log("settings.pager",settings)
          if (settings.pager != '') {
            if (settings.pager == 'number' || settings.pager == 'image') options.pager = "#" + i + "-pager";
            if ((settings.pager == 'image' || settings.pager == 'carousel') && num_slides > 1) {
              options.pagerAnchorBuilder = function(idx, slide) {
                return '#' + i + '-pager li:eq(' + idx + ') a';
              };
              if (settings.pager == 'carousel') {
                var carouselops = {
                  visible: parseInt(settings.carousel_visible),
                  scroll: parseInt(settings.carousel_scroll),
                  animation: parseInt(settings.carousel_speed),
                  vertical: settings.carousel_vertical,
                  initCallback: function(carousel) {
                    $(".jcarousel-prev").addClass('carousel-prev');
                    $(".jcarousel-next").addClass('carousel-next');
                    if (carousel.options.visible && num_slides <= carousel.options.visible) {
                      // hide the carousel next and prev if all slide thumbs are displayed
                      $(".carousel-prev, .carousel-next", carousel.container.parent()).addClass("hidden");
                      return false;
                    }
                    $(".carousel-next", carousel.container.parent()).bind('click', function() {
                      carousel.next();
                      return false;
                    });
                    $(".carousel-prev", carousel.container.parent()).bind('click', function() {
                      carousel.prev();
                      return false;
                    });
                  }
                };
                if (!settings.carousel_skin) {
                  carouselops.buttonNextHTML = null;
                  carouselops.buttonPrevHTML = null;
                }
                if (parseInt(settings.carousel_circular)) carouselops.wrap = 'circular';

                $("#" + i + "-carousel").jcarousel(carouselops);
                // the pager is the direct item's parent element
                options.pager = "#" + i + "-carousel .field-slideshow-pager";
              }
            }
          }

          // Configure the cycle.before callback, it's called each time the slide change
          options.before = function(currSlideElement, nextSlideElement, options, forwardFlag) {
            // In this function we access the settins with options.settings
            // since the settings variable will be equal to the last slideshow settings
            // Acessing directly settings may cause issues if there are more than 1 slideshow

            // The options.nextSlide sometimes starts with 1 instead of 0, this is safer
            var nextIndex = $(nextSlideElement).index();

            // Add activeSlide manually for image pager
            if (options.settings.pager == 'image') {
              $('li', options.pager).removeClass("activeSlide");
              $('li:eq(' + nextIndex + ')', options.pager).addClass("activeSlide");
            }

            // If we are using the carousel make it follow the activeSlide
            // This will not work correctly with circular carousel until the version 0.3 of jcarousel
            // is released so we disble this until then
            if (options.settings.pager == 'carousel' && parseInt(options.settings.carousel_follow) && parseInt(options.settings.carousel_circular) == 0) {
              var carousel = $("#" + options.index + "-carousel").data("jcarousel");
              carousel.scroll(nextIndex, true);
            }
          }

          if (num_slides > 1) {

//        	console.log(options);
        	if (options.settings.pagerEvent == 'mouseover' ) {
        		options.pagerEvent = "mouseover";
        	}
        	
        	slideshow.on( 'cycle-post-initialize', function( event, opts ) {
            $(this).addClass("cycle-init");
            console.log("doine");
        	});
        	
        	options.width = 'fit';
        	var initCycle = function () {
          if(!slideshow.find("img").first()[0] != undefined){
        	  if (!slideshow.find("img").first()[0].complete) {
        	    setTimeout(function() {
                initCycle();
              }, 1000 );
              return ;
        	  }
          }

        	  $("." + i).data("slideshow", slideshow);
        	  
        	  $("." + i).hover(function(e) {
        	  	e.preventDefault();
      			  var target_slideshow = $(this).data("slideshow");
      	      //target_slideshow.cycle("pause");
        		  var is_focused = $('.field-slideshow-lp-gallery').find('.form-item').find('input').is(':focus');
        		  if(is_focused){
        			  e.preventDefault();
        			  var target_slideshow = $(this).data("slideshow");
        	          target_slideshow.cycle("pause");
        		  }/*else{
        			  e.preventDefault();
        	    	  var target_slideshow = $(this).data("slideshow");
        	    	  target_slideshow.cycle("resume");
        		  }*/
        	  });  
        	  
            if (settings.start_on_hover) {
                //If start_on_hover is set, stop cycling onload, and only activate
                //on hover
                slideshow.cycle(options).cycle("pause").hover(function() {
                  $(this).cycle('resume');
                },function(){
                  $(this).cycle('pause');
                });
              }
              else {
                // Cycle!
                slideshow.cycle(options);
              }
  
              // After the numeric pager has been built by Cycle, add some classes for theming
              if (settings.pager == 'number') {
                $('.field-slideshow-pager a').each(function(){
                  $this = $(this);
                  $this.addClass('slide-' + $this.html());
                });
              }
              // Keep a reference to the slideshow in the buttons since the slideshow variable
              // becomes invalid if there are multiple slideshows (equal to the last slideshow)
              $("#" + i + "-controls .play, #" + i + "-controls .pause").data("slideshow", slideshow);
              // if the play/pause button is enabled link the events
              $("#" + i + "-controls .play").click(function(e) {
                e.preventDefault();
                var target_slideshow = $(this).data("slideshow");
                target_slideshow.cycle("resume", true);
                $(this).hide();
                $(this).parent().find(".pause").show();
              });
              $("#" + i + "-controls .pause").click(function(e) {
                e.preventDefault();
                var target_slideshow = $(this).data("slideshow");
                target_slideshow.cycle("pause");
                $(this).hide();
                $(this).parent().find(".play").show();
              });
              
              
            }//end function initCycle
        	  
        	initCycle();
        	
          }

        }
        $(window).scroll(function() {
        	console.log("ee", slideshow_div);
        	if(typeof slideshow_div !=  "undefined"){
	    	    var top_of_element = $('.' + slideshow_div).offset().top;
	    	    var bottom_of_element = $('.' + slideshow_div).offset().top + $('.' + slideshow_div).outerHeight();
	    	    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
	    	    var top_of_screen = $(window).scrollTop();
	
	    	    if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
	    	        // the element is visible, do something
	    	    	console.log("visible");
	    	    	slideshow.cycle('resume');
	    	    } else {
	    	        // the element is not visible, do something else
	    	    	 console.log("hidden");
	    	    	 slideshow.cycle('pause');
	    	    }
	        }
        });
      }

      // Recalculate height for responsive layouts
      var rebuild_max_height = function(context) {
        return ;
        var max_height = 0;
        var heights = $('.field-slideshow-slide',context).map(function ()
        {
          return $(this).height();
        }).get(),
        max_height = Math.max.apply(Math, heights);
        if (max_height > 0) {
          context.css("height", max_height);
          context.find('.field-slideshow-processed').css("height", max_height);
        }
      };

      if (jQuery.isFunction($.fn.imagesLoaded)) {
        $('.field-slideshow').each(function() {
          $('img',this).imagesLoaded(function($images) {
            rebuild_max_height($images.parents('.field-slideshow'));
          });
        });
      }
      else {
        $(window).load(function(){
          $('.field-slideshow').each(function(){
            rebuild_max_height($(this))
          })
        });

      }
      $('.field-slideshow-processed, .field-slideshow, .testimonial-items').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
          $("[data-echo]", $(incomingSlideEl).parent()).each(function() {
          var elem = this;
          if (elem.src !== (src = elem.getAttribute('data-echo'))) {
            elem.src = src;
            $(elem).parent().find('.lazyloader-icon').remove();
          }
        });
      });
      $(window).resize(function(){
        $('.field-slideshow').each(function(){
          rebuild_max_height($(this))
        })
      });
      
   // Recalculate height for responsive layouts
      var mobile_rebuild_max_height = function(context) {
        //return ;
        var max_height = 0;
        var heights = $('.field-slideshow-slide.cycle-slide-active',context).map(function ()
        {
          return $(this).height();
        }).get(),
        max_height = Math.max.apply(Math, heights);
        if (max_height > 0) {
          //context.css("height", max_height);
          context.find('.field-slideshow-processed').css("height", max_height);
        }
      };
     $(document).on('click', '.form_button_bt, .form_button_open_arrow', function(e) {
    	/* $(this).closest(".carousel_mob_form").find(".form_button_cont").hide();
    	 $(this).closest(".carousel_mob_form").find(".hidden_carousel_mob_form").show().addClass("active");
    	 $(this).closest(".carousel_mob_form").find(".form_button_close_arrow").show();*/
    	 var form_nid = $(this).attr("form_nid");
    	 if (typeof Drupal.settings.carouselForm == 'undefined') {
         Drupal.settings.carouselForm = new Object();
       }
    	 if (typeof Drupal.settings.carouselForm[form_nid] == 'undefined') {
         Drupal.settings.carouselForm[form_nid] = new Object();
         Drupal.settings.carouselForm[form_nid] = 0;
       }
    	 console.log("form_nid",form_nid);
    	 if(Drupal.settings.carouselForm[form_nid] == 0){
    		 Drupal.settings.carouselForm[form_nid] = 1;
	    	 $(document).find('.carousel_mobpopup_form').remove();
	    	 var form_html = $(this).closest(".carousel_mob_form").find(".hidden_carousel_mob_form_nid_"+form_nid).detach();
	    	 var form_html_data = "<div class='carousel_mobpopup_form'></div>";
	    	 console.log("form_html",form_html);
	    	 $('body').prepend(form_html_data);
	    	 $(document).find('.carousel_mobpopup_form').html(form_html);
    	 }
    	 $('.field-slideshow').each(function(){
    		 mobile_rebuild_max_height($(this))
       })
     });
     $(document).on('click', '.form_button_close_arrow', function(e) {
    	 /*$(this).closest(".carousel_mob_form").find(".form_button_cont").show();
    	 $(".carousel_mob_form").find(".hidden_carousel_mob_form").hide().removeClass("active");
    	 $(".carousel_mob_form").find(".form_button_close_arrow").hide();
    	 $(this).hide();*/
    	var form_nid = $(this).attr("form_nid");
    	var form_html = $(document).find('.carousel_mobpopup_form').find(".hidden_carousel_mob_form_nid_"+form_nid).detach();
    	$(".carousel_mob_form_nid_"+form_nid).append(form_html);
    	$(document).find('.carousel_mobpopup_form').remove();
    	Drupal.settings.carouselForm[form_nid] = 0;
    	 $('.field-slideshow').each(function(){
    		 mobile_rebuild_max_height($(this))
       })
     });
    	 $(document).on('click', '.hidden_carousel_mob_form .ajax-processed', function(e) {
    	 $('.field-slideshow').each(function(){
    		 mobile_rebuild_max_height($(this))
       })
     });
    	 $(document).on('click', '.form_button_bt_hidden', function(e) { 
    	 setTimeout(function() {
		    	 $('.field-slideshow').each(function(){
		    		 mobile_rebuild_max_height($(this))
		       })
			  }, 500);
     });
    }
  }
  
})(jQuery);
