(function($){ 
  
  Drupal.behaviors.social = {};
  Drupal.behaviors.social.attach = function(context) {
    Socialite.load('.social_container');
  }
})(jQuery);