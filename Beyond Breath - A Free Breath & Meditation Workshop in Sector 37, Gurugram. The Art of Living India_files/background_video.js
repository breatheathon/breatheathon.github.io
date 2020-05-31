
(function($) {

Drupal.behaviors.video_bg = {};

Drupal.behaviors.video_bg.scale = function(min_height) {
 var $parent = $(this).parent(),
          $inner = $parent.find('.row-inner'),
          inner_height =  $inner.height(),
          i = 100;
      $inner.css('transform-origin', 'top');

      while (min_height < inner_height && i > 30) {
        i--;
        var a = '0.' + i;
        $inner.css('transform', 'scale(' + a + ', ' +a+ ')');
        inner_height =  $inner[0].getBoundingClientRect().height;
      }
}

Drupal.behaviors.video_bg.resize = function() {
  $('.background-video-state').each(function() {
    var width = $(this).data('width'),
        height = $(this).data('height'),
        window_ratio = jQuery(window).width() /jQuery(window).height(),
        video_ratio = width / height,
        self = this;
    if ('undefined' != typeof width) {
      if (window_ratio  > video_ratio) {
      	if(typeof $(this).closest('.row-inner-wrapper').css('top') != 'undefined')
        	min_height = Math.min(height * (window_ratio/video_ratio), jQuery(window).height());
        else
        	min_height = Math.min(height * (window_ratio/video_ratio), jQuery(window).height() - $('.element-HeaderComponent').height());
      }
      else {
      	if(typeof $(this).closest('.row-inner-wrapper').css('top') != 'undefined')
        	min_height = Math.min(height , jQuery(window).height());
       	else
        	min_height = Math.min(height , jQuery(window).height() - $('.element-HeaderComponent').height());
      }
      $(this).parent().css('min-height', min_height+"px");
      $(this).parent().css('max-height', min_height+"px");
      if ($(this).parent().width() / $(this).parent().height()  > width/height) {
        $(this).css({height:"auto", width:"100%"});
      }
      else {
        $(this).css({width:"auto", height:"100%"});
      }
      Drupal.behaviors.video_bg.scale.call(this, min_height);
      $("img:not(.video-proccessed)", $(this).parent()).one("load", function() {
        $(this).addClass('video-proccessed');
        Drupal.behaviors.video_bg.scale.call(self, min_height); 
      }).each(function() {
        if(this.complete) $(this).load();
      });
    }else{
    	if(typeof $(this).closest('.row-inner-wrapper').css('top') != 'undefined')
				min_height = Math.min($(this).height() , jQuery(window).height());
			else
				min_height = Math.min($(this).height() , jQuery(window).height() - $('.element-HeaderComponent').height());
			$(this).parent().css('min-height', min_height+"px");
			$(this).parent().css('max-height', min_height+"px");
		}
    
  });
}

Drupal.behaviors.video_bg.attach = function(context) {
  $(window).on('load scroll', function () {
    var scrolled = $(this).scrollTop();
    $('.background-video-parallax').css('transform', 'translate3d(0, ' + (scrolled * 0.55) + 'px, 0)'); // parallax (25% scroll rate)
  });
  
  if(typeof $('.row-inner-wrapper').css('top') != 'undefined')
  	min_height = $(window).height();
 	else
  	min_height = $(window).height() - $('.element-HeaderComponent').height();
  	
	$('.background-video-overlay').css('min-height', min_height+"px");
	$('.background-video-overlay').css('max-height', min_height+"px");
  
  $("video").bind("loadedmetadata", function () {
    var width = this.videoWidth;
    var height = this.videoHeight;
    $(this).data('width', width);
    $(this).data('height', height);
    Drupal.behaviors.video_bg.resize();
  });

  
  $(window).resize(Drupal.behaviors.video_bg.resize);

}
})(jQuery);
