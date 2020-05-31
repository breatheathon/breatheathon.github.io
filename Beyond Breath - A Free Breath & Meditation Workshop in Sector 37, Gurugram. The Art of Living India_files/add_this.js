var addthis_config = addthis_config||{};
if ('undefined' == typeof addthis_config.pubid) {
  if (window.location.toString().indexOf("artofliving.org/us-en") > 0) {
    //addthis_config.pubid = 'ra-4d76860b09ac9d97';
    addthis_config.pubid = 'ra-58fee5e2d86f5409';
  }
  else { 
   addthis_config.pubid = 'ra-58fee5e2d86f5409';
  }
}
console.log(addthis_config);
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.add_this = {}
  Drupal.behaviors.header_component = Drupal.behaviors.header_component || {};
  Drupal.behaviors.header_component.addthis_loaded = Drupal.behaviors.header_component.addthis_loaded || false;
	  
  Drupal.behaviors.add_this.load_addthis = function (context) {
    if(window.location.toString().indexOf("artofliving.org/us-en") > 0)
  		addthis_config.pubid = 'ra-58fee5e2d86f5409';
    if($('.add-this-custom', context).length < 1 && ($('.addthis_sharing_toolbox', context).length || $('.div_WisdomQa').length)){
      if (!Drupal.behaviors.header_component.addthis_loaded) {
        var addthisjs = [{
          "type":"file",
          "url": "//s7.addthis.com/js/300/addthis_widget.js#domready=1",
        }];
        
        $.getMultiScripts(addthisjs).done(function() {
          if($('.addthis_sharing_toolbox', context).length)
          	addthis.toolbox('.addthis_toolbox');
         	else
         		delete addthis.layers;
          if($('.div_WisdomQa').length)
          	addthis.toolbox('.addthis_inline_follow_toolbox');
          Drupal.behaviors.header_component.addthis_loaded = true;
          // all done
        });
      }
      else {
        addthis.toolbox('.addthis_toolbox');
      }
    }
  }  
  
  Drupal.behaviors.add_this.attach = function(context) {
     if ($('.addthis_inline_share_toolbox_9cf2').length < 1) {
console.log("ladingaddthis");
      Drupal.behaviors.add_this.load_addthis (context);
    }
  }
	  
})(jQuery, Drupal, this, this.document);
