
(function ($) {
  $(function(){
    if (document.referrer) {
      url = document.referrer; 
    } else {
      url = window.location.href;
    }
    ref = url.match(/:\/\/(.[^/]+)/)[1];
    val = $.cookie('aol_ref');
    
    if (!val /*|| ref != window.location.hostname*/) {
      $.cookie('aol_ref', url, { expires: 356, domain: ''});
      $.cookie('aol_ref_url', document.URL, { expires: 1, domain:''});
    }
    var utm_source = $.urlParam('utm_source');
    var utm_medium = $.urlParam('utm_medium');
    var utm_campaign = $.urlParam('utm_campaign');
    var utm_content = $.urlParam('utm_content');
    
    if($.trim(utm_source)) {
    	$.cookie('utm_source', utm_source, { expires: 1, domain:''});
    }
    if($.trim(utm_medium)) {
		$.cookie('utm_medium', utm_medium, { expires: 1, domain:''});
    }
    if($.trim(utm_campaign)) {
    	$.cookie('utm_campaign', utm_campaign, { expires: 1, domain:''});
    }
    if($.trim(utm_content)) {
    	$.cookie('utm_content', utm_content, { expires: 1, domain:''});
    }
  })
  
  $.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.href);
    if(results)
    	return results[1] || 0;
  }
  
  Drupal.behaviors.aol_leads = {};
  Drupal.behaviors.aol_leads.attach = function() {    
    if (typeof Drupal.settings.maskinput != 'undefined') {
      var maskinput = Drupal.settings.maskinput;
      if(maskinput['telephone_number'] != undefined){
        var pattern = maskinput['telephone_number'];
        if(jQuery().mask) {
          $("input[name='submitted[telephone_number]']").mask(pattern);
        }
      }
    }
  }
})(jQuery);