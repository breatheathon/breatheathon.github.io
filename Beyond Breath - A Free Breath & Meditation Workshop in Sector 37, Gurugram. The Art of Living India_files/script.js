/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

 function jumponpage(chapter_show,chapter_hide){
      jQuery(window).scrollTop(0);
      jQuery('#'+chapter_show).show();
      jQuery('#'+chapter_hide).hide();
  }

(function ($, Drupal, window, document, undefined) {
 

Drupal.behaviors.landing_pages_global = {};

Drupal.behaviors.landing_pages_global.attach = function(context) {
  
  ///coppied from aol zen for menu aim: 
  //@todo have it in one place
  $(".megamenu.nojs").removeClass('nojs');
  $(".DropdownDivColumn:first-child").addClass("active");
  if(jQuery().menuAim) {
    $(".mega-menu").menuAim({
         activate: function(row) {
           $(row).parent().find('.DropdownDivColumn').removeClass('active');
           $(row).addClass("active");
           if ('undefined' != typeof echo) {
             echo.render();
           } 
         },
         rowSelector: ".DropdownDivColumn",
         tolerance: 20,
         width: 165
    });
  }
  
  $('.mega-menu-holder',context).mouseenter(function() {
    if ('undefined' != typeof echo) {
      echo.render();
    }
  });
  
  //end coppied 
  
  $(".row-inner-wrapper.bg-grey").parent(".div_PageRow").addClass("js-div_PageRow-bg-grey");
  
  $(document).ready(function(){
    if($('.track_call').length){      
      var get_contact = $('.track_call').html();
      if (typeof _googWcmGet !== 'undefined' && $.isFunction(_googWcmGet)) {
        _googWcmGet(track_callback, get_contact);
      }
    }
    $('.nyro-Modal-simple', context).nyroModal();
    $('.nyro-popup, .nyroModal', context).click(function(event){
       event.preventDefault();
      if (!$('.nyroModalCont').length > 0){
        var url = $(this).attr("href");
        var popup_form = false;
        var add_share = false;
        if($(this).hasClass('popup_form_btn')){
          popup_form = true;
        }
        if($(this).hasClass('add-share'))
          add_share = true;
        $.nmManual(url,{
          stack: true,
          callbacks: {
           size:function(nm){
             if ($('.nyroModalCont iframe').length>0 && $('.nyroModalCont article').length>0){
               nm.sizes.w = $('.nyroModalCont iframe').width() + 20;
               nm.sizes.h = nm.sizes.h + 20;
             }
             else if ((url.indexOf("youtube.com") >1 || url.indexOf("vimeo.com") >1) && $('.nyroModalCont iframe').length>0) {
               nm.sizes.w = Math.min($(window).width() * 0.95, 605);
               nm.sizes.h = Math.min($(window).height() * 0.8, 455);               
             	 if(add_share == true){
               	 $('.nyroModalCont iframe')
                   .css('width', (nm.sizes.w - 25) + 'px')
                   .css('height', (nm.sizes.h - 75) + 'px');
             	 }else{
               	 $('.nyroModalCont iframe')
                   .css('width', (nm.sizes.w - 5) + 'px')
                   .css('height', (nm.sizes.h - 5) + 'px')
                   .css('max-width', '100%');
               }
                
             	$('.nyroModalCont iframe').attr("allowFullScreen", "allowFullScreen");
               $('.nyroModalCont').css({"overflow":"visible", "text-align":"center"});
             }
             if(popup_form == true){
               $('.nyroModalCont').parent().addClass('popup_form_wrapper_main');
               $('body').addClass('popup_form_show');
               /*nm.sizes.h = 590;*/
             }
           },
	         afterShowCont: function(nm) {
		       	 var url = nm.opener.attr('href');
		       	 if ($('.nyroModalCont iframe').length>0 && $('.nyroModalCont .nyroModalYoutube').length>0 && add_share == true)
		         	 $('.nyroModalYoutube').append("<ul class='nyro-share-buttons'><li><a class='ref_fb' target='_blank' href='http://www.facebook.com/sharer.php?s=100&amp;p[url]="+url+"&amp;p[images][0]="+url+"' onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600'); return false;'><img src='/sites/all/themes/aol-zen/images/social-icons/facebook.svg' alt=''/></a></li><li><a class='ref_tw' target='_blank' href='https://twitter.com/intent/tweet?url="+url+"&amp;image="+url+"&amp;via=SriSri'  onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');return false;'><img src='/sites/all/themes/aol-zen/images/social-icons/twitter.svg' alt=''/></a></li><li><a class='ref_gp' target='_blank' href='https://plus.google.com/share?url="+url+"' onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');return false'><img src='/sites/all/themes/aol-zen/images/social-icons/google.svg' alt=''/></a></li></ul>");
	         },
           close:function(){
             $('body').removeClass('popup_form_show');
           },
         },

        });
       } 
      });
      
      $('.popup_form_main_close', context).click(function(){
      	if(jQuery.type(jQuery.nmTop())=='object'){
          $.nmTop().close();
      	}
      });
      
      
       /*$(".select-change-city > .change-loc ").click(function(e){
         
         e.preventDefault();
          
          $('.change-loc').remove();
          $('.ce-form-element').show();
       });*/
       
     //responsive table stack style addition
     
     $('table:not(.responsive-processed)', context).each(function() {
       if($(this).hasClass('responsive-table')){  
         $(this).addClass('responsive-processed');
         $(this).stacktable(); 
       }

       if($(this).hasClass('cardtable')){  
         $(this).addClass('responsive-processed');
         $(this).cardtable(); 
       }
     });
//    if($('table', context).hasClass('stacktable')){
//      //$('.responsive-table').stacktable();
//       $('.responsive-table.large-only').each(function(){
//       stkTable = $('.large-only').width();
//       stkContainer = $(this).closest('.row-inner').width();
//       if(stkTable > stkContainer ){
//         $('.responsive-table.large-only').toggle();
//         $('.responsive-table.small-only').toggle();
//       }
//       });//console.log('stakable table triggered');
//     }
     processTableToggle(context);
     $( window ).resize(function() {
        processTableToggle(window);
     });
     
     $('.grid-gallery a').nyroModal({
        autoSizable: false,
        resizable: false,
        windowResize: false,
  			opacity:0.9,
        callbacks: {
          beforeShowCont: function(nm) {
      var url = nm.opener.attr('href');
      var title = nm.opener.attr('title');
      $('.nyroModalImg').append("<ul class='nyro-share-buttons'><li><a class='ref_fb' target='_blank' href='http://www.facebook.com/sharer.php?s=100&amp;p[url]="+url+"&amp;p[images][0]="+url+"' onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600'); return false;'><img src='/sites/all/themes/aol-zen/images/social-icons/facebook.svg' alt=''/></a></li><li><a class='ref_tw' target='_blank' href='https://twitter.com/intent/tweet?url="+url+"&amp;text="+title+"&amp;image="+url+"&amp;via=SriSri'  onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');return false;'><img src='/sites/all/themes/aol-zen/images/social-icons/twitter.svg' alt=''/></a></li><li><a class='ref_gp' target='_blank' href='https://plus.google.com/share?url="+url+"' onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');return false'><img src='/sites/all/themes/aol-zen/images/social-icons/google.svg' alt=''/></a></li><li><a class='download-img' href="+url+" download="+url+"></li></ul>");

/*var FB_url = "http://www.facebook.com/sharer.php?s=100&p[title]="+(title)+"&p[url]="+encodeURIComponent(url)+"&p[images][0]="+(url);
$("#ref_fb").attr('href',FB_url);

var TW_url = "http://twitter.com/home?status="+escape(title)+"+"+encodeURIComponent(url);
$("#ref_tw").attr('href',TW_url);*/
          },
          size:function(nm){
          	if($('.nyroModalCont .nyroModalImage').length>0){
             	nm.sizes.h = nm.sizes.h + 60;
            }
        	},
        }
     });
     
     if(typeof owlCarousel !== 'undefined' && $.isFunction(owlCarousel) ){
     jQuery(".owl-carousel").owlCarousel({
            loop: true,
            autoplay: true,
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    
                },
                768: {
                    items: 1,
                    
                },
                1025: {
                    items: 1
                }
            }
      });
      }
   });
   
   function processTableToggle(context){
     $('table.stacktable').each(function() {
         stkTable = $(this).width();
         stkContainer = $(this).closest('.row-inner').width();
         //console.clear();
         //console.log('table: '+stkTable+"stkContainer :"+stkContainer);
         if(stkTable < stkContainer ){
           $(this).parent().find('.stacktable.large-only').show();
           $(this).parent().find('.stacktable.small-only').hide();
         }
         if(stkTable > stkContainer ){
           $(this).parent().find('.stacktable.large-only').hide();
           $(this).parent().find('.stacktable.small-only').show();
         }
     });
   }
  
  $(".div_PageRow").each(function() {
    if ($(this).next().hasClass('div_PageRow') 
        && ($(this).find('.row-inner-wrapper').hasClass("bg-grey") && $(this).next().find('.row-inner-wrapper').hasClass("bg-grey") 
           || !$(this).find('.row-inner-wrapper').hasClass("bg-grey") && !$(this).next().find('.row-inner-wrapper').hasClass("bg-grey")
          )
      ) {
        $(this).addClass("next-has-same-bg");
      }
  });
  
  $('.scroll-to-section').click(function(){
  	$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
  });
  
  $(window).load(function() {
    if ($(window).width() > 1023) {
      $('.div_PageInnerRow', context).each(function() {
        var height = 0;
        $(this).find('.text-component').each(function(){
          height = $(this).outerHeight() > height ? $(this).outerHeight() : height; 
        });
        
        $(this).find('.text-component').each(function(){
          var padding = parseInt($(this).css('padding-top'), 10) + parseInt($(this).css('padding-bottom'), 10);
          $(this).height(height - padding); 
        });
      });
    }
    
    var current_active, current_hover, target, navTimers;
    $(document).on('mouseenter', '.unity_menu li', function() {
		if(!$(this).hasClass('sub-item')){
			target = $( this );
			current_hover = target.index();
      		navTimers = setTimeout( function() {
				$('.unity_menu li').removeClass('active');
                target.addClass('active');
				if(!target.hasClass('sub-item')){
                	current_active = target.index();
				}
			}, 500 );
		}else{
			$(this).addClass('active');
		}
    });
    $(document).on('mouseleave', '.unity_menu li', function() {
		if(typeof target !== 'undefined'){
			navTimers = setTimeout( function() {
				if(!target.find(':hover')){
	                target.removeClass('active');
	        	}
	     	}, 500 );
		}else{
			$(this).removeClass('active');
		}
	});
    
    /*if($('.unity_menu li.menu_active').length){
      var active_menu = $('.unity_menu li.menu_active');
      var active_menu_offset = active_menu.offset();
      var active_menu_width = active_menu.find("a").width();
      active_menu_width = active_menu_width / 2;
      active_menu_offset = parseInt(active_menu_offset.left) + parseInt(active_menu_width);
      active_menu.find('ul.sub-menu').css('padding-left', active_menu_offset+'px');
    }*/
   
    $('.tooltip .info').mouseenter(function(){
      $('.tooltip_text').hide();
      $(this).next('.tooltip_text').show();
    }).mouseleave(function(){
      $('.tooltip_text').hide();
    });
    
    $('.tooltip_main_close').click(function(){
      $(this).parent().parent().hide();
    });
    $('.tooltip .info').click(function(){
      $('.tooltip_text').hide();
      $(this).next('.tooltip_text').show();
    });
    
    testimonialHeight();
    tourScheduleWidth();
    
  });
    
	// return;
	// var carousel_img;
	var social_wraps_with_carousel;
	setSocialIconsOnCarouselTop();
	testimonialHeight();
	$(window).resize(setSocialIconsOnCarouselTop);
  $(window).resize(testimonialHeight);
  $(window).resize(tourScheduleWidth);
  
  function track_callback(formatted_number, mobile_number){
    // formatted_number: number to display, in the same format as
    // the number passed to _googWcmGet().
    // (in this case, '1-800-123-4567')
    // mobile_number: number formatted for use in a clickable link
    // with tel:-URI (in this case, '+18001234567')
    var get_phone = '';
    if($('.track_call').length){      
      get_phone = '';
      $('.track_call').each(function() {
        get_phone = $(this);
        get_phone.href = "tel:" + mobile_number;
        get_phone.empty();
        get_phone.append(formatted_number);
      });
    }
    if($('.sidr-class-track_call').length){      
      get_phone = '';
      $('.sidr-class-track_call').each(function() {
        get_phone = $(this);
        get_phone.href = "tel:" + mobile_number;
        get_phone.empty();
        get_phone.append(formatted_number);
      });
    }
  };
  
  function tourScheduleWidth() {
    if($('.tour-schedule-scroll').length){
      if($(window).width() < 768){
        var scroll_width = $('.tour-schedule-scroll').attr('scroll_width');
        $('.tour-schedule-scroll').css('width', scroll_width+'px');
      }else{
        $('.tour-schedule-scroll').css('width', '');
      }
    }
  }

	function init_setSocialIconsOnCarouselTop() {
//		social_wraps_with_carousel = $(".social_wrap").filter(function(){
//				return $(".div_CarouselComponent", $(this).parent()).length > 0;
//		});
//		setSocialIconsOnCarouselTop();
	}

	function setSocialIconsOnCarouselTop() {
	  $('.skrollable').each(function() {
	    var innerOuterHeight = $(this).find('> .row-inner').outerHeight();
	    if (innerOuterHeight > $(this).outerHeight()) {
	      $(this).height(innerOuterHeight);
	    }
	  });
	  return ;
		social_wraps_with_carousel.each(function(){
			// alert(this);
			// console.log(this);
			// console.log(carousel);
			// $(this).css("cssText", "position: absolute !important;"); //right: 0
			// $(this).css("opacity", 0, "transition", "opacity 3s");
			var carousel = $(".div_CarouselComponent", $(this).parent()).eq(0);
			var carousel_img = $(".field-slideshow-image", carousel).eq(0);
			var carousel_img_height = carousel_img.height();
			// alert(carousel_img_height - 35 + "px");
			$(this).css("top", carousel_img_height - 62 + "px");
			// $(this).css("opacity", 1);
		});
	}
	
	function testimonialHeight(){    
    if($('.div_TestimonialComponent').length > 0){
      var testi_height = $('.div_TestimonialComponent').height();
      testi_height = parseInt(testi_height) + 50; 
      //testi_height = testi_height + "px !important";
      //$('.div_TestimonialComponent').parents('.row-inner').height(testi_height);  // removed by note of durvesh
      //$('.div_TestimonialComponent').parents('.row-inner-wrapper').css("cssText", "height: "+testi_height);
    }
	}

};
   
})(jQuery, Drupal, this, this.document);
