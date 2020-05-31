
(function ( $ ) {
	
$.getMultiScripts = function(arr, path, options) {
    var _arr = $.map(arr, function(data) {
          switch(data.type) {
                       case 'file':
                         if (typeof options!= 'undefined') {
                           var key = "ajax_page_state[js][" + data.url.substring(1)  +"]";
                           if (typeof options.data[key] != 'undefined' 
                                 && options.data[key] == 1) {
                             return; 
                           }
                         }
                         return $.getScript( data.url );
                       case 'settings':
                         return $.extend(true, Drupal.settings, data.data);
                         
                       case 'inline':
                         return $('<script>')
                          .attr('type', 'text/javascript')
                          .text(data.data)
                          .appendTo('head');
                       }
        
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
  }

}( jQuery ));