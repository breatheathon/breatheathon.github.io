(function($){
  Drupal.behaviors.testimonial_component = {}
  var mouseIn = false,
      timeOut;
  
  Drupal.behaviors.testimonial_component.attach = function(context){

    jQuery('.testimonial-carousel', context).each(function(){
    
    if (jQuery(this, context).find('.item').length > 1){

      var item_count = jQuery(this, context).closest('.div_TestimonialComponent').hasClass('div_2_1')
                        ? 2 : 3;
      item_count = jQuery(this, context).closest('.div_PageColumn').hasClass('PageColumn_2_of_2_1')
                  || jQuery(this, context).closest('.div_PageInnerRow').length > 0  
        ? 1 : item_count;
      var tablet_item_count = item_count > 2 ? 2 : 1;
      if(jQuery(this).parents('.PageColumn_2_of_2_1').length > 0){
      	var autoplayd = jQuery(this).find('.item').length > 1 ? true : false;
      }else{      	
      	var autoplayd = jQuery(this).find('.item').length > 3 ? true : false;
      }
      var mobile_dots = jQuery(this).find('.item').length > 1 ? true : false;
      var tablet_dots = jQuery(this).find('.item').length > tablet_item_count ? true : false;
      var desktop_dots = jQuery(this).find('.item').length > item_count ? true : false;
      var nav_bar = false;
      var loop_val = false;
      if(jQuery(this).hasClass("carousel_with_one_image")){
        mobile_dots =tablet_dots =desktop_dots =false;
        tablet_item_count=item_count=1;
         nav_bar = true;
        loop_val = true;
      }


      if(jQuery(this).children().length > 1){
        loop_val = true;
      }
      jQuery(this, context).owlCarousel({
        loop: loop_val,
        autoplay: true,
        touchDrag: true,
        dotsEach: false,
        autoplayHoverPause: true,
        autoplayTimeout:8000,
        responsive: {
          0: {
            items: 1,
            nav: nav_bar,
            dots: mobile_dots,
            navText:["",""],
            margin:10
          },
          768: {
            items: tablet_item_count,
            nav: nav_bar,
            dots: tablet_dots,
            stagePadding: 20,
            margin: 45

          },
          1025: {
            nav:nav_bar,
            navText:["",""],
            items: item_count,
            autoplay: autoplayd,
            dots: desktop_dots
          }
        }
      });
    }
    });
  function hidePopup() {
    //we set timer here, hide function will be executed after 500ms
    timeOut = setTimeout(function() {
      //4. this function should not be executed if mouse is over popup
      //but it can happen that clearTimeout is executed after this is called
      // because its async call so we have this mouseIn extra check
      if (false === mouseIn) {
        jQuery('.rest').hide();
      }
    }, 500);
  } 
     
  jQuery('.img-container').mouseover(function() {
      mouseIn = true;    
      clearTimeout(timeOut);
      jQuery('.rest').hide();
      
      jQuery(this).next().show();
      
  })
  jQuery('.rest').mouseover(function() {
    //2. if mouse is on popup we set mouseIn true 
    mouseIn = true;
    //3. and we clear timeout function
    clearTimeout(timeOut);
  });
  //issue is that once popup is showed, mouse leave img-container because its on top of popup
  
  jQuery('.img-container, .rest').mouseout(function() {
        //jQuery('.rest').hide().css({'z-index':'-1','width':'0px','overflow':'hidden'});
        //jQuery('pop-on-hover').css('width','0px');
    mouseIn = false;
    hidePopup();   
        
  });
  jQuery('.close-popup').click(function(){
    //alert('');
    mouseIn = false;
    jQuery('.rest').fadeOut();
  });
  
}

})( jQuery );
