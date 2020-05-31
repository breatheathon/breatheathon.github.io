window.twttr = (function (d,s,id) {
            var t, js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
            js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
            return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
            }(document, "script", "twitter-wjs"));

(function($){
  
  Drupal.behaviors.header_component = {
    'loaded': false,
    'main_html': '',
    'actions': {},
    'loaded_aciton': '',
    'addthis_loaded': false,
    'initial_load': true,
  }
  
  Drupal.header_component = {};
  
  
  Drupal.header_component.do_jump = function () {
    var actions = window.location.hash.split("#");
      if (actions.length == 2 && $('#' + actions[1]).length > 0) {
        $('html,body').animate(
          { scrollTop: $('#' + actions[1]).offset().top },
          500,
          'swing'
        );
      }
      else { 
        $('html,body').animate(
          { scrollTop: 0 },
          500,
          'swing'
        );
      }
  }
  
  Drupal.header_component.replace_content = function() {
    if (false == Drupal.behaviors.header_component.loaded) {
      Drupal.behaviors.header_component.loaded = true;
      var action = Drupal.behaviors.header_component.action,
          data = Drupal.behaviors.header_component.actions[action];
      $('#content-loader').hide();
      if (typeof data != 'undefined' && typeof data.content != 'undefined') {
          $('#landing-pages-content').replaceWith(data.content).css("opacity", '0');
      }
      //$('#landing-pages-content').css('visibility', 'visible');
//      $('#landing-pages-content').fadeTo('fast', 1, function() {
//      });
      
      if (typeof data.header !== 'undefined' && data.header !== "") 
				$('.div_HeaderComponent').replaceWith(data.header);
      if (typeof data.footer != 'undefined' && data.footer !== "" ) {
        $('.div_FooterComponent').replaceWith(data.footer);
      }
      Drupal.header_component.do_jump();
      
      if (typeof data.meta != 'undefined' && typeof data.meta.title != 'undefined' && data.meta.title != '') {
        $('title').text(data.meta.title);
      }
      else {
        $('title').text(Drupal.behaviors.header_component.actions['/'].title);
      }
      
      if (typeof data.meta != 'undefined' && typeof data.meta.description != 'undefined' && data.meta.description != '') {
        $('meta[name=description]').attr('content', data.meta.description);
      }
      else {
        $('meta[name=description]').attr('content', Drupal.behaviors.header_component.actions['/'].description);
      }
      
      if (typeof data.meta != 'undefined' && typeof data.meta.keywords != 'undefined' && data.meta.keywords != '') {
        $('meta[name=keywords]').attr('content', data.meta.keywords);
      }
      else {
        $('meta[name=keywords]').attr('content', Drupal.behaviors.header_component.actions['/'].keywords);
      }
      
      //$('#landing-pages-content').fadeIn('slow', function(){
        Drupal.attachBehaviors();
        Drupal.header_component.do_jump();
      //});
       // $('#landing-pages-content').css({opacity: 0, visibility: "visible"}).fadeTo(550, 1);
    }    
    menu_border();
    ajax_slider_resize();
    picturefillBackground();
    
  };
  
  

  Drupal.header_component.multiple_pages_menu = function() {
    //Drupal.behaviors.header_component.main_html = main_content['content'] ; 
    var path = 'undefined' == typeof main_content['path'] ? '/' : main_content['path'];
    Drupal.behaviors.header_component.action = path;
    //main_content['content'] = $('#landing-pages-content').get(0).outerHTML;
    Drupal.behaviors.header_component.actions[path] = main_content;
    Drupal.behaviors.header_component.actions['/'] = jQuery.extend(true, {}, main_content);
    if (path != '/') {
      Drupal.behaviors.header_component.actions['/'].content = '';
    }
    Drupal.behaviors.header_component.initial_load = false;
//    Drupal.behaviors.header_component.actions['/'].content = main_content;
      //'<div id="landing-pages-content">' + main_content + '</div>';
    Drupal.behaviors.header_component.main_footer = 
      '<div class="div_FooterComponent div_list">' + $('.div_FooterComponent').html() + '</div>';
    Drupal.behaviors.header_component.actions[path].footer = Drupal.behaviors.header_component.main_footer;
    if ('undefined' != typeof Backbone) {
      var AppRouter = Backbone.Router.extend({
          routes: {
              "*actions": "defaultRoute" // matches http://example.com/#anything-here
          }
      });
      // Initiate the router
      var app_router = new AppRouter;

      app_router.on('route:defaultRoute', function(action) {
        $('#mobile-menu #button').attr('checked',false);
        var loaded = Drupal.behaviors.header_component.loaded;
        Drupal.behaviors.header_component.loaded = false;
        action = action == null ? "/" : action;
        if (Drupal.behaviors.header_component.initial_load 
            && typeof Drupal.behaviors.header_component.actions[action] != 'undefined') {
          Drupal.behaviors.header_component.initial_load = false;
          return ;
        }
        
        Drupal.behaviors.header_component.initial_load = false;
        var action_string = action;
        if (!action_string) {
          action_string = '';
        }
        strings = action_string.split("#");
        if (strings.length > 1) {
          action_string = strings[0];
        }
        locations = window.location.href.split("#/");

        if (action_string != "" && Drupal.behaviors.header_component.loaded_aciton == action_string) {
          Drupal.header_component.do_jump();
          return;
        }
        Drupal.behaviors.header_component.loaded_aciton = action_string;
        
        action_string = "#/" + action_string;
        
        $('#Menu a').removeClass('active');
        
        $('a[href="'+ action_string +'"]').addClass('active');
        
        if (action == null) {
          action = '/';
        }
        if (false && action == null) {
          action_string = "";
//          $('#landing-pages-content').html(Drupal.behaviors.header_component.main_html);
//          $('#landing-pages-content').show();
          
          Drupal.header_component.replace_content('#landing-pages-content', Drupal.behaviors.header_component.main_html);
          $('.div_FooterComponent').replaceWith(Drupal.behaviors.header_component.main_footer);
          Drupal.header_component.do_jump();
          menu_border();
          ajax_slider_resize();
        }
        else {
          if ('undefined' != typeof Drupal.behaviors.header_component.actions[action] 
              && Drupal.behaviors.header_component.actions[action].content != '') {
  //          $('#landing-pages-content').replaceWith(Drupal.behaviors.header_component.actions[action]);
  //          $('#landing-pages-content').show();
            //Drupal.header_component.replace_content('#landing-pages-content', Drupal.behaviors.header_component.actions[action].content);
            Drupal.behaviors.header_component.action = action;
            jQuery("#landing-pages-content").css("position", "relative").animate({"left": "-" + jQuery(window).width() + "px"}, {specialEasing: {
              width: "linear",
              height: "easeOutBounce"
            }},550, function() {
            });
            Drupal.header_component.replace_content();
            $('.div_FooterComponent').replaceWith(Drupal.behaviors.header_component.actions[action].footer);
            Drupal.header_component.do_jump();
            menu_border();
            ajax_slider_resize();
          }
          else {
            //$('#landing-pages-content').fadeTo('slow', 0.5, function() {
              //$('#landing-pages-content').css('visibility', 'hidden');
//              $('#landing-pages-content').fadeTo('slow', 0.1, function() {
//                $('#content-loader').show();
//              });
              jQuery("#landing-pages-content").css("position", "relative").animate(
                  {"left": "-" + jQuery(window).width() + "px"}, 
                  {
                    'complete':function() {
                      $('#content-loader').show();
                    } 
                  },550);
              
              var id = Drupal.settings.landing_pages.l_id;
              var options = {data:{'ajax_html_ids[]':[]}};
              Drupal.ajax.prototype.beforeSerialize.call({},{}, options);
              
              var action_path = Drupal.settings.basePath + Drupal.settings.pathPrefix + 'page-inner/';
              if (action.indexOf('node/') === 0) {
                action_path = '/page-inner-node/';
                action = action.substr(5);
              }
              Drupal.behaviors.header_component.action = action;
            
              $.ajax({
                  type: "GET",
                  url: action_path + id +'/' + action,
//                  data: options.data
              })
              .done(function(data) {
                 Drupal.behaviors.header_component.actions[action] = data;
                
                 if (typeof data.add_css != 'undefined') {
                   $(data.add_css).each(function(a) {
                     //check if not already loaded
                     var key = "ajax_page_state[css][" + data.add_css[a].substring(1) +"]";
                     if (typeof options.data[key] != 'undefined' 
                           && options.data[key] == 1) {
                       return; 
                     }
                     $('<style type="text/css">@import url("' + data.add_css[a] + '")</style>')
                       .appendTo("head");
                   });
                 }
                if (typeof data.add_js != 'undefined' && data.add_js != null) {
                  $.getMultiScripts(data.add_js, "", options).done(function() {
                       // all done
                  }).fail(function(error) {
                       // one or more scripts failed to load
                  }).always(function() {
                    Drupal.header_component.replace_content();
                       // always called, both on success and error
                  });
                }
                else {
                  Drupal.header_component.replace_content();
                }
              });
          }
        }
        setTimeout(function(){ $('#content-loader').hide(); }, 600);
        
      });

      // Start Backbone history a necessary step for bookmarkable URL's
      //@todo get it from config 
      var root_path = Drupal.settings.landing_pages.root;
      Backbone.history.start({ pushState: true, root: root_path});
      
      $(document).on("click", "a[href]:not([data-bypass]):not([target=_blank])", function(evt) {
        if ($('#sidr-main').is(":visible")) {
          $.sidr('close', 'sidr-main');
        }
        
        // check if we have root anchor inside link.
        var root_index = $(this).attr("href").indexOf(root_path);
        if (root_index != -1 
             && (root_index < 3 || $(this).attr("href").indexOf(window.location.host) != -1)) {
          var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
//          var root = location.protocol + "//" + location.host +"/" + root_path;
          evt.preventDefault();

          if ($(this).attr("href").indexOf("#/") != -1) {
            Backbone.history.navigate(href.attr.substring($(this).attr("href").indexOf("#")+ 2), true);
          }
          else if ($(this).attr("href").indexOf("#") != -1) {
            Backbone.history.navigate(href.attr.substring($(this).attr("href").indexOf("#")+ 1), true);
          }
          else {
            Backbone.history.navigate(href.attr.substring(root_index + root_path.length+ 1), true);
          }
        }
      });
    }
  }
  
  function menu_border(){
    $('ul li a').removeClass('main-active');
    $('.sub-Menu li').removeClass('sub-active');
    $('.sub-Menu a').each(function(){      
      if($(this).hasClass('active')){
        $(this).parent().parent().parent().children('a').addClass('main-active');
        $(this).parent().addClass('sub-active');
      }
    });
    
    $('#Menu').mouseenter(function(){
      $('.breadcrumb').css( "z-index", 999);
    }).mouseleave(function(){
      $('.breadcrumb').css( "z-index", 1001);
    });
    
  }  
  
  function ajax_slider_resize(){
    if (typeof twttr != 'undefined' && typeof twttr.widgets != 'undefined') {
      twttr.widgets.load();  
    }
    
    if($('ul.half-carousel').length > 0){
      $('ul.half-carousel .half-carousel-li').css('width', '100%');
      var iframes = document.getElementsByTagName('iframe');      
      if($(window).width() < 767){
        for (var i = 0; i < iframes.length; i++) {
          var iframe = iframes[i];
          iframe.style.width = '100%';
          iframe.style.height = '100%';
        }
      }else{
        for (var i = 0; i < iframes.length; i++) {
          var iframe = iframes[i];
          iframe.style.height = '';
          iframe.style.width = '';
        }
      }
    }
    picturefillBackground();
  }
  
  Drupal.header_component.sticky_scroll = function() {
    if ($(this).scrollTop() > 1){
      $('.div_HeaderComponent').addClass("sticky");
    }
    else{
      $('.div_HeaderComponent').removeClass("sticky");
    }
  };     
  
  Drupal.header_component.resize_functions = [];
  
  Drupal.header_component.resize = function () {
    for (i in Drupal.header_component.resize_functions) {
      Drupal.header_component.resize_functions[i].call();
    }
  }
  
  Drupal.header_component.menu_scroll = function() {
    $("#Menu a, #sidr-main a").click(function(event){
      if ($('#sidr-main').is(":visible")) {
        $.sidr('close', 'sidr-main');
      }
      
      var link_hash = this.hash;
      if (typeof link_hash != 'undefined' && link_hash != '') {
        event.preventDefault();
        $('html,body').animate(
          { scrollTop: $(link_hash).offset().top },
          500,
          'swing',
          function() { window.location.hash = link_hash.slice(1); }
        );
      }
    });
  }
  
  $(function(){
    if (!$('body').hasClass('page-admin') && !$('body').hasClass('node-type-landing-pages-node')) {
      if ($('#landing-pages-content').hasClass('single-page') || 'undefined' == typeof main_content || $(main_content['content']).hasClass("single-page")) {
        if ('undefined' != typeof main_content) {
          Drupal.behaviors.header_component.main_html = main_content['content'] ; 
          Drupal.behaviors.header_component.action = '/';
          Drupal.behaviors.header_component.actions['/'] = main_content;
          Drupal.header_component.replace_content();
        }
        Drupal.header_component.menu_scroll();
      } else {
        Drupal.header_component.multiple_pages_menu();
      }
    }
    
    $('.language_main a').each(function(){
      if($(this).hasClass('current-language')){
        $(this).parent().addClass('current-language-parent');
      }
    });
    
    $(window).resize(Drupal.header_component.resize);
    $(window).resize(ajax_slider_resize);
    
    $(window).scroll(function() {
      Drupal.header_component.sticky_scroll.call(this);
    });
    
    
    
  });

  Drupal.behaviors.header_component.attach = function(context) {
    /* ---------------------------------------------------------------
    js/fluidvids.js
    Makes YouTube and Vimeo videos by IFRAME Fluid and responsive
    --------------------------------------------------------------- */
     if (!$("#landing-pages-content").hasClass('template-u2')) {
       if(typeof fluidvids !== 'undefined') {
         fluidvids.init({
           selector: ['iframe', 'object'], // runs querySelectorAll()
           players: ['www.youtube.com', 'player.vimeo.com'] // players to support
         });
       }
     }
     
     
     $('.page-element:not(.added-same)', context).each(function() {
       var classes = $(this).attr('class').split(" ");
       for (i in classes) {
         var ind = classes[i].indexOf("element-");
         if (ind !== false && ind ==0) {
           if ($(this).prev().hasClass(classes[i]) && !$(this).next().hasClass(classes[i])) {
             $(this).addClass("last-of-type");
           } else if (!$(this).prev().hasClass(classes[i]) && $(this).next().hasClass(classes[i])) {
             $(this).addClass("first-of-type");
           } else if ($(this).prev().hasClass(classes[i]) && $(this).next().hasClass(classes[i])) {
             $(this).addClass("middle-of-type");
           } else {
             $(this).addClass("single-of-type").addClass("first-of-type").addClass("last-of-type");
           }
         }
       }
     });

     $("#Menu a", context).one('click', function(event){
       if ($('#sidr-main').is(":visible")) {
         $.sidr('close', 'sidr-main');
       }
       if ($('#mobile-menu > label').is(':visible') && !$(this).hasClass('expanded') && $(this).parent().find('.sub-Menu').length >0 ) {
         event.preventDefault();
         $("#Menu a").removeClass('expanded');
         $(this).addClass('expanded');
         return false;
       }
       else {
         $("#Menu a").removeClass('expanded');
         return true;
       }
       //$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
     });
     
    $(".pager a", context).click( function(event){
      var page_number = $(this).attr('page_number');
      
      if(page_number == undefined){
        var href= $(this).attr('href');
        page_number = 0;
        var current_url_arr = href.split('?');
        if(current_url_arr[1]){
          var dynaUrlPart = current_url_arr[1].split("&");
          for (var i=0;i<dynaUrlPart.length;i++) {
            var tmp = dynaUrlPart[i].split('=');
            if(tmp[0] == 'page'){
              page_number = tmp[1];
            }
          }
        }
      }
      var $parent = $(this).closest('.div_list'),
      split = $parent.attr('id').split('-'),
      element_id = split[1];
      ajax_pager('pagination', page_number, element_id, $(this).attr('href'));      
      return false;
    });
     
     
    $(".date-links a", context).click( function(event){
    
      
      var year = $(this).attr('year');
      var $parent = $(this).closest('.div_list'),
      split = $parent.attr('id').split('-'),
      element_id = split[1];
      var current_url_arr = $(this).attr('href').split('?');
      ajax_pager('year', year, element_id, $(this).attr('href')); 
      $(this).parent().addClass('pager-current');     
      return false;
    });
    
    $("#responsive-menu-button").click(function(event){
       $.sidr('toggle', 'sidr-main');
       //$('#mobile-header').css('float','right');
    });

    // $("#Menu a").click(function(event){
    //   event.preventDefault();
    //   var link_hash = this.hash;
    //   $('html,body').animate(
    //     { scrollTop: $(link_hash).offset().top },
    //     500,
    //     'swing',
    //     function() { window.location.hash = link_hash.slice(1); }
    //   );
    // });
    
    if($('.unity_menu').length){
      var unity_footer_menu = $('.unity_menu').clone();
      unity_footer_menu = unity_footer_menu.html();
      //$(unity_footer_menu).appendTo(".unity_footer_menu");
      $(".unity_footer_menu").html(unity_footer_menu);

      var unity_mobile_footer = $('.unity_menu').find('li.mobile_footer');
      if(unity_mobile_footer != '' && unity_mobile_footer.hasClass('menu_active')){
        var mobile_footer_content = '';
        var mobile_footer_head = unity_mobile_footer.find('a:first').text();
        var mobile_footer = unity_mobile_footer.find('.sub-menu-inner').clone();
        mobile_footer = mobile_footer.html();
        mobile_footer_content += "<li class='first'><span>"+mobile_footer_head+"</span></li>";
        mobile_footer_content += mobile_footer;
        //$(mobile_footer_content).appendTo(".unity_mobile_footer");
        $(".unity_mobile_footer").html(mobile_footer_content);
      }else{
        $(".unity_mobile_footer_main").addClass('no_footer_menu');
      }
    }
    
    if($('.DropdownMenuLink').length){
      $('.DropdownMenuLink').each(function(){      
        if($(this).hasClass('active')){
          $(this).closest('li').addClass('inner-active');
        }
      });
    }
    
    if($('#footer-search-form').length){
      $('#footer-search-form').submit(function(){
        var url = $(this).attr('action');
        if (url.indexOf("search/footer") >= 0)
        	url = url + '?search=' + $(this).find('.form-text').val();
        else
        	url = url + '/' + $(this).find('.form-text').val();
        $(location).attr('href', url);
        return false;
      });
    }
     if($('#site-search-form-mobile').length){
      $('#site-search-form-mobile').bind('submit', function(){
        var url = $(this).attr('action');
        url = url + '/' + $(this).find('.form-text').val();
        $(location).attr('href', url);
        return false;
      });
    }
    if($('#blog-search-form').length){
      $('#blog-search-form').submit(function(){
        var url = $(this).attr('action');
        url = url + '/' + $(this).find('.form-text').val();
        $(location).attr('href', url);
        return false;
      });
    }
  }
  
  function ajax_pager(pager_type, value, element_id, url_params){
          
    var page_id = Drupal.settings.landing_pages.l_id;
    if(pager_type == 'year'){
      var page_number = 0;
      var year = value;
    }else if(pager_type == 'pagination'){
      var page_number = value;
      var year = 0;
    }
    $('#landing-pages-content').fadeTo('slow', 0.5, function() {
      $('#content-loader').show();
      var ajax_url = '';
      var hash_value = '';
      if (Drupal.settings.landing_pages.node) {
        hash_value = Drupal.settings.landing_pages.url + '/';
      }else if(hash_value.substr(hash_value.length - 1) !== '/'){
        hash_value = hash_value+'/';
      }
      
      if ('undefined' == typeof url_params || url_params =='') {
        var url = '';
        
        var paginations = window.location.hash.substr(1);
        var page_url = window.location.href;
        if (Drupal.settings.landing_pages.node)
          if (page_url.indexOf("pagination") >= 0)
            paginations = page_url;
            
        if(paginations === '' || paginations === '/'){
          if(page_number != 0 || year != 0)
            url = 'pagination='+element_id+':'+page_number+':'+year;
        }else{
          if (Drupal.settings.landing_pages.node){
            paginations = page_url;
          }else{
            if(paginations.charAt(0) === '/')
              paginations = paginations.substr(1);
            hash_value = paginations;
          }
          if (paginations.indexOf("pagination") >= 0){
            url = 'pagination=';
            if (Drupal.settings.landing_pages.node){
              paginations = paginations.substring(paginations.indexOf("pagination"));
              paginations = paginations.split('=');
            }else{
              paginations = paginations.split('/');
              hash_value = paginations[0];
              paginations = paginations[1].split('=');
            }
            paginations = paginations[1].split('-');
            var element_id_check = 0;
            $.each(paginations, function(index, value){
              page_value = value.split(':');
              if(url !== 'pagination=')
                url = url+'-';
              if(page_value[0] === element_id){
                element_id_check = 1;
                if(page_number != 0 || year != 0 || page_value[2] != 0){
                  if(pager_type == 'year')
                    url = url+element_id+':'+page_number+':'+year;  
                  else if(pager_type == 'pagination')
                    url = url+element_id+':'+page_number+':'+page_value[2];
                }else{
                  if(url.substr(url.length - 1) === '-')
                    url = url.slice(0,-1);
                }                
              }else{
                url = url+value;
              }
            });
            if(element_id_check === 0 && (page_number !== 0 || year != 0)){
              if(url !== 'pagination=')
                url = url+'-';
              url = url+element_id+':'+page_number+':'+year;
            }
          }else{
            if(page_number != 0 || year != 0)
              url = 'pagination='+element_id+':'+page_number+':'+year;
          }
        }
        if(url === 'pagination=')
          url = '';
          
        
     
        var current_url = window.location.href;
        var pagination_index = current_url.indexOf("pagination");
        if(pagination_index >= 0)
          current_url = current_url.substring(0, pagination_index-1);
        var get_current_url = current_url;
        if(current_url.substr(current_url.length - 1) === '/')
          current_url = current_url + url;
        else
          current_url = current_url + '/' + url;
     
        
        if(hash_value === '' || hash_value === '/')
          ajax_url = Drupal.settings.basePath + Drupal.settings.pathPrefix + 'page-inner/'+page_id+'/'+url;
        else
          ajax_url = Drupal.settings.basePath + Drupal.settings.pathPrefix + 'page-inner/'+page_id+'/'+hash_value+url;
      }
      else {
        ajax_url = url_params +'&inner=true';
        history.pushState({
          id: url_params
        }, jQuery("title").html(), url_params);
      }
      
      action = '';
      $.ajax({
        url:ajax_url
      }).done(function(data){
        if(hash_value === '' || hash_value === '/'){
          if(get_current_url.substr(get_current_url.length - 1) === '/')
            get_current_url = get_current_url.slice(0,-1);
          if(get_current_url.substr(get_current_url.length - 1) === '#')
            get_current_url = get_current_url.slice(0,-1);
          if (Drupal.settings.landing_pages.node)
            current_url = get_current_url + '/' + url;
          else
            current_url = get_current_url + '#/' + data.path + '/' + url;
        }
        window.history.pushState({path:current_url},'',current_url);
        Drupal.behaviors.header_component.actions[action] = data;
        //if (false == Drupal.behaviors.header_component.loaded) {
        Drupal.behaviors.header_component.loaded = true;
        $('#content-loader').hide();
        $('#landing-pages-content').replaceWith(data.content);
        if (typeof data.footer != 'undefined' && data.footer !== "" ) {
          $('.div_FooterComponent').replaceWith(data.footer);
        }
        
        $('#landing-pages-content').fadeIn('slow', function(){
          if ('undefined' != typeof echo) {
            echo.render();
          } 
          Drupal.attachBehaviors();
          Drupal.header_component.do_jump();
        });
        //}
        menu_border();
        ajax_slider_resize();             
      });
    });
   
  }
  
  $('html').click(function(e) {
    var main_menu = $("#menu-main-menu .js-submenu");
    var sub_menu = $("#menu-main-menu .box-sub-menu");
    if (!main_menu.is(e.target) && main_menu.has(e.target).length === 0 && !sub_menu.is(e.target) && sub_menu.has(e.target).length === 0){
      main_menu.removeClass('active');
      $('.menu-item .box-sub-menu').hide();
    }
    
    var unity2_country = $('#current_country');
    var unity2_country_dropdown = $('#CountrySelectorDropdown');
    var mobileCourseSearch = $('#edit-center-autocomplete-google2.form-text.form-control.search.active');
    var searchMagnifier = $('i.location-search-icon');
    var currentCountrySubmenu = $('a.curren-country-sub');
    if (!searchMagnifier.is(e.target) && !unity2_country.is(e.target) && !currentCountrySubmenu.is(e.target) && !mobileCourseSearch.is(e.target) && unity2_country.has(e.target).length === 0 && !unity2_country_dropdown.is(e.target) && unity2_country_dropdown.has(e.target).length === 0){
      $('#CountrySelectorDropdown').hide();
      $('.search-btn').show();
      $('.gl-bg-overlay').hide();
      //$('#mobile-header').css('float','right');
      $('.center-changer').hide();
    }
  });

  
})( jQuery );
jQuery( document ).ready(function() {
    // jQuery(".country-contact-phone-wrapper").find("#country-contact-phone-icon").hover(function(){
      // jQuery(".country-contact-phone-detail").css('visibility', 'visible');
    // });

    jQuery(".country-contact-phone-wrapper").mouseenter(function() {
      jQuery(".country-contact-phone-detail").css('visibility', 'visible');
      jQuery(".country-contact-phone-detail").find(".track_call").show();
  }).mouseleave(function() {
    jQuery(".country-contact-phone-detail").find(".track_call").hide();
      jQuery(".country-contact-phone-detail").css('visibility', 'hidden');
  });

  jQuery(".country-contact-phone-detail").mouseenter(function() {
      jQuery(".country-contact-phone-detail").css('visibility', 'visible');
      jQuery(".country-contact-phone-detail").find(".track_call").show();
  }).mouseleave(function() {
    jQuery(".country-contact-phone-detail").find(".track_call").hide();
      jQuery(".country-contact-phone-detail").css('visibility', 'hidden');
  });

  jQuery(".country-contact-email-wrapper").mouseenter(function() {
      jQuery(".country-contact-email-detail").css('visibility', 'visible');
      jQuery(".country-contact-email-detail").find(".track_call_email-icon-link").show();
  }).mouseleave(function() {
    jQuery(".country-contact-email-detail").find(".track_call_email-icon-link").hide();
      jQuery(".country-contact-email-detail").css('visibility', 'hidden');
  });

  jQuery(".country-contact-email-detail").mouseenter(function() {
      jQuery(".country-contact-email-detail").css('visibility', 'visible');
      jQuery(".country-contact-email-detail").find(".track_call_email-icon-link").show();
  }).mouseleave(function() {
    jQuery(".country-contact-email-detail").find(".track_call_email-icon-link").hide();
      jQuery(".country-contact-email-detail").css('visibility', 'hidden');
  });

 /* jQuery(".find-center-talk-teacher-phone").click(function() {
      jQuery(".find-center-talk-teacher-phone-detail").toggle();
  })*/

  
});




