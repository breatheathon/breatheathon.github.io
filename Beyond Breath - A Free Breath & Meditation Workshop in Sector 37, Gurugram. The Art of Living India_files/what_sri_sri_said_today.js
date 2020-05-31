function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document. documentElement.clientWidth) /*or $(window).width() */ &&
        rect.top < (window.innerHeight || document. documentElement.clientHeight) /*or $(window).height() */;
}

(function ($, Drupal, window, document, undefined) {
  
  Drupal.behaviors.WisdomPages = {
      attach: function () {
        $('.expand-all-q-a a.expand-all').click(function(e) {
          e.preventDefault();       
          $('.answer-box').hide();
          $('.answer-box').slideToggle(300);
          $(this).css('display','none');
          $('.expand-all-q-a a.collapse-all').css('display','inline-block');
          $('.question-answer-view').find('.question-box').find('span:first').addClass('expand');   
        });
        
        $('.expand-all-q-a a.collapse-all').click(function(e) {
          e.preventDefault();       
          $('.answer-box').show();
          $('.answer-box').slideToggle(300);  
          $(this).css('display','none');
          $('.expand-all-q-a a.expand-all').css('display','inline-block');
          $('.question-answer-view').find('.question-box').find('span:first').removeClass('expand');  
        });
        
      
        if ($('.what-sri-sri-said ul').size() > 0) {
          $(function() {
            $('.what-sri-sri-said ul').cycle({
              fx:     'fade',
              speed:  'fast',
              timeout: 0, 
              pager:  '#what-sri-sri-said-nav'
            });
          });
        }
        
      //fixing what-sri-sri-said-slider section height
        var height = 0;
        var height2 = 0;        
        jQuery(".what-sri-sri-said-slider .post-data-inner").each(function() {
         height = Math.max(height, jQuery(this).height());        
        });
              
      
        jQuery(".post-data-inner").each(function() {
           jQuery(this).height(height);
           jQuery('.arrow-left').height(height/2 + 30);
           jQuery('.arrow-right').height(height/2 + 30);
           jQuery('.arrow-left').css('padding-top',height/2);
           jQuery('.arrow-right').css('padding-top',height/2);
        });
        jQuery('.arrow-left').hide();
        jQuery('.nextControl').click(function() {
          if(jQuery('li:nth-last-child(2)').hasClass('cycle-slide-active')){
              jQuery('.arrow-right').hide();    
           }else{
             jQuery('.arrow-left').show();
           }
        });
        jQuery('.prevControl').click(function() {
          if(jQuery('li:nth-child(3)').hasClass('cycle-slide-active')){
            jQuery('.arrow-left').hide();    
         }else{
           jQuery('.arrow-right').show();
         }
        });
        
      }
  }
})(jQuery, Drupal, this, this.document);