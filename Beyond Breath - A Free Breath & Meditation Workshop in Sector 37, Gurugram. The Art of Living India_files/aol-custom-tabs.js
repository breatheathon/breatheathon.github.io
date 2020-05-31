(function( $ ){

  $.fn.aol_custom_tabs = function( options ) {

    //Setting is coming soon
    var settings = $.extend( {
      'tab'     : '.aol-tabs-tab li',
      'console' : '.aol-tabs-content #tabs-content > li',
      'action'  : 'mouseover',
      'callback': function() {}
    }, options);

//    console.log(options);
    return this.each(function() {
      $this = $(this);
      var $tabs = $this.find(options.tab);
      $tab_console = $this.find(options.console);
      $action = (options.action == '' || typeof(options.action)  === "undefined") ? 'mouseover' : options.action;


      $tab_console.hide();
      $tab_console.eq(0).show();
      $tabs.eq(0).addClass('active');

      $(document).on($action,options.tab, function(e){
        e.preventDefault();
        var idx = $(this).index();
        $(options.console).hide();
        $(options.console).eq(idx).show().css('visibility', 'visible');;
        $(options.tab).removeClass('active');
        $(this).addClass('active');
        if(typeof options.callback != "undefined") {
          //console.log(e.target, $tabs, $(e.target).closest($tabs));
          options.callback.call($(e.target).closest(options.tab)[0]);
        }
      });
    });
  };

})( jQuery );