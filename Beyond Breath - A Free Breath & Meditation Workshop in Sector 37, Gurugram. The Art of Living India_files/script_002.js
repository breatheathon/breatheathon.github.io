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

Drupal.aol_zen = {};

function debug() {
  if (window.console && console.log)
    console.log('[aol] ' + Array.prototype.join.call(arguments,' '));
}   

var add_to_any_loaded = nyro_loaded = false;
var windowWidth = window.innerWidth;
var mobile = false;
var mobile_tablet = false;
if  (windowWidth < 620) {
   mobile = true;
}
if  (windowWidth <= 768) {
   mobile_tablet = true;
}

function load_add_to_any() {
  return ;
  if (true == add_to_any_loaded) {
    return;
  }
  add_to_any_loaded = true;
    //Load AddToAny script asynchronously
  var a = document.createElement('script');
  a.type = 'text/javascript';
  a.async = true;
  a.src = 'http://static.addtoany.com/menu/page.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(a, s);
}

function load_nyro() {
  //if (true == nyro_loaded) {
    return;
  //}
  nyro_loaded = true;
    //Load AddToAny script asynchronously
  var a = document.createElement('script');
  a.type = 'text/javascript';
  a.async = true;
  a.src = '/sites/all/libraries/jquery.nyroModal/js/jquery.nyroModal.custom.min.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(a, s);
  
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", '/sites/all/libraries/jquery.nyroModal/styles/nyroModal.css')
  document.getElementsByTagName("head")[0].appendChild(fileref);
  
}

var a2a_config = a2a_config || {};
 a2a_config.no_3p = 1;

 function a2a_add(row) {
   return ;   
   
   if (false == add_to_any_loaded) {
     load_add_to_any();
   }
  
  if ('undefined' != typeof a2a) {
     a2a_config.target = '#adthis-share-email';
    a2a_config.linkurl = 'http://www.artofliving.org' + row.link;
    a2a_config.menu_type = "mail";
    jQuery('#adthis-share-email').attr({href: 'http://www.addtoany.com/share_save'});
    a2a.init('page');
  
  
    a2a_config.menu_type = a2a_config.target = undefined;
    a2a_config.templates = {
        twitter: "${title} at ${link} via @artoflivingnow"
    };
    
    a2a_config.linkname = row.title;
    jQuery('#course-details #adthis-share').attr({href: 'http://www.addtoany.com/share_save'});
    a2a_config.linkurl = 'http://www.artofliving.org' + row.link;
    a2a.init('page');
    jQuery('#course-details #adthis-share').attr({href: jQuery('#course-details #adthis-share').attr('href')});
  }
  else {
    setTimeout(a2a_add, 2000, row);
  }
 }
 
 var loaded = false;
(function ($, Drupal, window, document, undefined) {
  Drupal.aol_zen.promotion_popup = function() {
    if ($('.promotion-popups .promotion-popup-item').length > 0){
      if ($('.promotion-popups-inner li').length > 1) {
      $('.promotion-popups-inner').cycle({
            fx:     'fade',
            speed:  'fast',
            pagerEvent: 'mouseover',
            timeout: 0, 
            pager:  '#promo-popup-nav'
          });
      }
      $(document).scroll(function () {
        if ($.cookie('pp-closed') == 1) {
          $('.promotion-popups').addClass('promotion-popup-closed')
        }
        var y = $(this).scrollTop();
        if (y > 200) {
            $('.promotion-popups').fadeIn();
            $('.social-closed').fadeIn();
        } 
        else{
            $('.promotion-popups').fadeOut();
            $('.social-closed').fadeOut();
        }
      });
      
      $('.close-popup').click(function() {
        $('.promotion-popups').fadeOut();
        $.cookie('pp-closed', 1);
      });
      $('.open-popup').click(function() {
        $('.promotion-popups').removeClass('promotion-popup-closed').fadeIn();
        $.cookie('pp-closed', 0);
      });
    }
    
    if ($('.social-closed').length > 0){
      $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 200) {
            $('.social-closed').fadeIn();
        } 
        else{
            $('.social-closed').fadeOut();
        }
      });
    }
  }
 
Drupal.behaviors.form_component = {
      element: '',
      intro: '',
      items: []
      
  };
 

  $(document).ready(function(){
    if($('.track_call').length){      
      var get_contact = $('.track_call').html();
      if (typeof _googWcmGet !== 'undefined' && $.isFunction(_googWcmGet)) {
        _googWcmGet(track_callback_aol, get_contact);
      }
    }
     //load_nyro();
     var quotes_bg = ['quote-bg-1.jpg', 'quote-bg-2.jpg', 'quote-bg-3.jpg', 'quote-bg-4.jpg', 'quote-bg-5.jpg'];
 //        Drupal.behaviors.form_component.initNyro();
     Drupal.aol_zen.promotion_popup();
     
     
      if (false == mobile) {
        $('#find-center-link a, #center-close').click(function(){ 
          $('#center-search-form').toggle();
        });
      }
      $('.section-carousel-body .QAHidden').append('<p class="read-more"><a href="#" >'+Drupal.t('Read More') + '</a></p>')
      
      jQuery(".nyro-form").nyroModal();
      
      if($('.quote_gallery').length){
        $('.quote_gallery a').nyroModal({
          autoSizable: false,
          resizable: false,
          windowResize: false,
    opacity:0.9,
          width: 640,
          height: 480,
          callbacks: {
            beforeShowCont: function(nm) {
        var url = nm.opener.attr('href');
        var title = nm.opener.attr('title');
        $('.nyroModalImg').append("<ul class='nyro-share-buttons'><li><a id='ref_fb' target='_blank' href='http://www.facebook.com/sharer.php?s=100&amp;p[url]="+url+"&amp;p[images][0]="+url+"' onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600'); return false;'><img src='sites/all/themes/aol-zen/images/social-icons/facebook.svg' alt=''/></a></li><li><a id='ref_tw' target='_blank' href='https://twitter.com/intent/tweet?url="+url+"&amp;text="+title+"&amp;image="+url+"&amp;via=SriSri'  onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');return false;'><img src='sites/all/themes/aol-zen/images/social-icons/twitter.svg' alt=''/></a></li><li><a id='ref_gp' target='_blank' href='https://plus.google.com/share?url="+url+"' onclick='javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');return false'><img src='sites/all/themes/aol-zen/images/social-icons/google.svg' alt=''/></a></li></ul>");
  
  /*var FB_url = "http://www.facebook.com/sharer.php?s=100&p[title]="+(title)+"&p[url]="+encodeURIComponent(url)+"&p[images][0]="+(url);
  $("#ref_fb").attr('href',FB_url);
  
  var TW_url = "http://twitter.com/home?status="+escape(title)+"+"+encodeURIComponent(url);
  $("#ref_tw").attr('href',TW_url);*/
            }
          }
        });
      }

      $(".subscribe_webform").click(function(){
        //$("#quotes_webform").show();
        $("#quotes_webform").nyroModal();
      });
      
      var $el, $ps, $up, totalHeight;

      $(".QAHidden .read-more a").click(function() {
            
        totalHeight = 0
      
        $el = $(this);
        $p  = $el.parent();
        $up = $p.parent();
        $ps = $up.find("> *:not(.read-more)");
        
        
        // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
        $ps.each(function() {
          totalHeight += $(this).outerHeight(true);
        });
        totalHeight = totalHeight ;      
        $up
          .css({
            // Set height to prevent instant jumpdown when max height is removed
            "height": $up.height(),
            "max-height": 9999
          })
          .animate({
            "height": totalHeight
          });
        
        // fade out read-more
        $p.fadeOut();

        // prevent jump-down
        return false;
          
      });
      
      $(".triangle").click(function(){
        $("#question-description").slideToggle("slow");
        $("#expand-button").toggleClass('expand');
      });
      
      $("#main_cats").change(function() {
        window.location = $(this).val();
      });

      $('.wisdom-quotes-categories').mouseover(function(){
    $('.share-buttons').css('visibility', 'hidden');
        $(this).find('.share-buttons').css('visibility', 'visible');  
      }).mouseout(function(){
    $('.share-buttons').css('visibility', 'hidden');
      });
      
      $(".wisdom-quotes-categories").on( {
      'mouseenter':function() { 
      $(this).css({'background-image': 'url(sites/all/themes/aol-zen/images/quotes_bg/' + quotes_bg[Math.floor(Math.random() * quotes_bg.length)] + ')'}); 
    },
      'mouseleave':function() {
      $('.wisdom-quotes-categories').css('background-image', 'none'); 
    }
    });
    
    //responsive table stack style addition
    
    if($('table').hasClass('responsive-table')){  
       $('.responsive-table').stacktable(); 
     }
    if($('table').hasClass('stacktable')){
      processTableToggle();
     }
     
   
  });
   
   Drupal.behaviors.AllPages = {
    attach: function (context) {
      load_add_to_any();
      
      
      if (!$("#landing-pages-content").hasClass('template-u2')) {
        if(typeof fluidvids !== 'undefined') {
         fluidvids.init({
           selector: ['iframe', 'object'], // runs querySelectorAll()
           players: ['www.youtube.com', 'player.vimeo.com'] // players to support
         });
       }
      }
      
      
      /*
      if (false == mobile_tablet) {
        $(window).scroll(function() {
          if ($(this).scrollTop() > 1){  
            $('#header, #navigation').addClass("sticky");
          }
          else{
            $('#header, #navigation').removeClass("sticky");
          }
       });
      }*/
      
      if (mobile_tablet && false == loaded) {
        loaded = true;
         var height = $(window).height() * 0.8;
         $('#course-details, #upcoming-course-mixed-rows').css({"max-height": height});
         $("#course-details").hide();
    //       $(".mobile .show-map-toggle").html("");
         $(document).on('click', '.course-upcoming-row', function(event) {
           var height = $(window).height() * 0.8;
           event.preventDefault();
          // $('#course-details, #upcoming-course-mixed-rows').css({"position":"absolute"})
           $('#course-details, #upcoming-course-mixed-rows').css({"max-height": height});
           $('#course-details, #upcoming-course-mixed-rows').toggle();
           $("#course-details").prepend('<a id="hide-details" href="#">X</a>');
           //mapChange.call($('.aol-tabs-tab li.active'));
          // $(".mobile .show-map-toggle").show();
         });
           $(document).on('click', '#course-details #hide-details', function(event) {
             event.preventDefault();
             $('#course-details, #upcoming-course-mixed-rows').toggle();
           });
        $("#search-block-form").submit(function(e) {
          if (!$("#search-block-form .form-text").is(":visible") || '' == $("#search-block-form .form-text").val()) {
            $("#search-block-form .form-text").show();
            $("#search-block-form").width(185);
            e.preventDefault();
          }
          
        });
        
        //mobile menu
        $(document).on('click', "#Menu > li", function() {
          if(!$(this).parents('.local_center_menus').length)
            $(this).parent().hide();
          var ul;
          if ($(this).find(" > ul > li:first .DropdownDivColumn ").length > 1) {
            ul = $(this).find(" > ul").clone();
          }
          else {
            ul = $(this).find(" > ul ul").clone();
          }
          ul.attr({'id': "menu-1"});
          ul.prepend("<li class='back-menu' data-hide='menu-1' data-show='Menu'> </li>");
          $(this).parent().parent().append(ul);
        });
        
        $(document).on('click', '#menu-1 .DropdownDivColumn', function() {
          $("#menu-1").hide();
          var ul = $(this).find(" > ul").clone();
          ul.attr({'id': "menu-2"});
          ul.prepend("<li class='back-menu' data-hide='menu-2' data-show='menu-1'> </li>");
          $('#mobile-menu').append(ul);
        });
        
        $(document).on('click', '.back-menu', function() {
          $('#' + $(this).attr('data-show')).show();
          $('#' + $(this).attr('data-hide')).remove();
          $(this).remove();
          $('.back-menu').show();
        });
        
        $("#mobile-menu").append("<span id='menu-search'>"+ Drupal.t('Search') + "</span>")
        $("#mobile-menu").append('<ul id="menu-search-block" style="display:none"><li id="main-seach-li"></li></ul>');
        $("#menu-search-block li#main-seach-li").append($("#block-country-locator-5"));
        
        //search menu click
        $(document).on('click', "#menu-search",  function(e) {
          e.preventDefault();
          $('#menu-search-block').toggle();
          $('#mobile-menu input#button').removeAttr('checked');
          $('#mobile-menu ul:not(#menu-search-block)').each(function() {
            if ($(this).is(":visible")) {
              $(this).removeAttr('style');
            }
          });
        });
        
        //menu show/hide
        $(document).on('change', '#button',  function() {
          if (!$('this').attr('checked')) {
            $('#menu-search-block').hide();
          }
          $('#mobile-menu ul').each(function() {
              if ($(this).is(":visible")) {
                $(this).removeAttr('style');
              }
          });
          if ($('#menu-local').length > 1) {
            $('#menu-local').hide();
          }
        });
        
        $(document).on("click", '#find-center-link a', function(){ 
          $("#main-seach-li").hide();

          var ul = $("#centerLocatorSubMenu ul").clone();
          ul.attr({'id': "menu-local"});
          ul.prepend("<li class='back-menu' data-hide='sub-search-li' data-show='main-seach-li'> </li>");
          $("#menu-search-block").append('<li id="sub-search-li"></li>');
          $("#sub-search-li").append(ul).show();
        });
        
        
        
        
      }
      
      $('.tiptip').each(function() {
        var content = false,//default content false, then it will be taken from title
        $content_div = $('#' + $(this).attr('id') + '-tooltip');
        
        if ( $content_div.length> 0) {
          content = $content_div.html();
        }
      
        new $.Zebra_Tooltips($(this), {
          'max_width':    300,
          'close_on_click' : false,
          'content' : content
        });
      });
      
      $('.action-from-anchor').click(function(e) {
        e.preventDefault();
          $(this).next().slideToggle();
      });
      
   
    $(document).bind('click', function(e){
      var $target = $(e.target);
  
      if(!$target.closest('#find-center-link').length){
        $('#center-search-form').hide();
      }
      
      if(!($target.closest('.unity_plus_country_locator').length || $target.closest('.block-country-locator').length || $target.closest('.navbar').find('.mobile-country-locator-2').length )){
       $('#CountrySelectorDropdown').hide();
      }
      
     /* if(!$target.closest('.block-country-locator').length){
        $('#CountrySelectorDropdown').hide(); //removed and combined in above because country locator not working in search course page 
      }*/
      
      if(!$target.closest('#block-country-locator-3').length){
        $('.LanguageSelection.language-popup').remove();
      }
      
    });

    /*
    jQuery(".box-row .pink-images").each(function() {
      var box_height = 0;
      $(this).find('.shadow-box .inner').each(function() {
          box_height = Math.max(box_height, $(this).height());
      });
      $(this).find('.shadow-box .inner').height(box_height);
    });
    
    jQuery(".box-row .grey-images").each(function() {   
      var gey_box_height = 0;
      $(this).find('.gray-box .inner').each(function() {
        gey_box_height = Math.max(gey_box_height, $(this).height());
      });
      $(this).find('.gray-box .inner').height(gey_box_height);
    });
    */
    
    
    $(document).on('mouseenter', '.course-upcoming-row2', function() {
      var i = $('.course-upcoming-row').index(this);
      var html = _.template(upcoming_course_details_template, Drupal.settings.geo_search.all_courses.rows[i]);
      $('#course-details').html(html);
      $('.course-upcoming-row').removeClass('active-course');
      $(this).addClass('active-course');
      
      //a2a_add(Drupal.settings.geo_search.all_courses.rows[i]);
     });
    $(document).on('mouseenter', '#course-details-node .refer-a-friend', function() {
        var $mail_link = $('#mail-link').text();
        var $mail_title = $('#page-title').text();
        var data = {link: $mail_link,title: $mail_title}
        //a2a_add(data);        
     });
    
//     $('#current_country a:not(.binded)').unbind('click').bind('click', function(e) {
//        e.preventDefault();
//        $(this).parent().next().slideToggle();
//      });
//     $('#current_country a').addClass('binded');
     
     $(document).ready(function(){
       $("form").on("invalid-form.validate", function (event, validator) {
           $this = $(this);
           setTimeout(function(){
             console.log($this.parent());
             $this.parent().find(".messages").fadeOut(5000, "linear", function () {
             });
           }, 0);  
       });
       
       setTimeout(function(){
          $(".get_in_touch_form div .messages").fadeOut(10000, "linear", function () {
          });
     
       }, 0);  
       $('.question-answer-view').find('.answer-box:first').show();   
       $('.question-answer-view').find('.question-box:first').find('span:first').addClass('expand');
       
     });
     
  
      $('#block-country-locator-3 .LanguageSelection li').not('.Selected').hide();
      $('#block-country-locator-3 .LanguageSelection li.Selected a.active').unbind('click').bind('click', function(e) {
        e.preventDefault();
        if ($('#block-country-locator-3 .language-popup').length > 0) {
          $('#block-country-locator-3 .language-popup').remove();
        }
        else {
          //$('.LanguageSelection').toggleClass('language-popup');
          //$('#block-country-locator-3 .LanguageSelection li').not('.Selected').toggle();
          var html = $('.LanguageSelection').clone();
          $(html).addClass('language-popup').find('li').show();
          $('.LanguageSelection').parent().append(html);
        }
      });
      
      

      if ($('.testimonials ul.testimonial-items').size() > 0) {
        $(function() {
          $('.testimonials ul.testimonial-items').cycle({
            fx:     'fade',
            speed:  'fast',
            pagerEvent: 'mouseover',
            timeout: 0, 
            pager:  '#testimonial-nav'
          });
        });
      }

      if ($('.spotlights ul.spotlight-items').size() > 0) {
        $(function() {
          $('.spotlights ul.spotlight-items').cycle({
            fx:     'fade',
            speed:  'fast',
            timeout: 0, 
            pagerEvent: 'mouseover',
            pager:  '#spotlights-nav'
          });
        });
      }
      

      $('.notify-form').hide();
      $('.notify-text a').click(function(e) {
        e.preventDefault();
        $(this).parent().next('.notify-form').slideToggle();
      });
      
      $('.share-your-experience-form-anchor a > span').once(function(){
      $('.share-your-experience-form-anchor a').click(function(e) {
      e.preventDefault();
      
        $('.share-your-experience-form-anchor a > span').toggleClass('expand');
          $(this).parent().next().slideToggle();
      
      })
      });
            
      $('.wisdom-search-facetapi h2').click(function(e) {
        e.preventDefault();        
        $('.wisdom-search-facetapi h2 > span').toggleClass('expand');            
        $(this).parent().find('.item-list').find('ul').slideToggle(function () { 
      if($('.wisdom-search-facetapi .item-list ul.facetapi-tagcloud-widget').css('display')=='block'){
        $('.wisdom-search-facetapi .item-list').css('border-bottom', '1px solid #ccc');
      }else{
        $('.wisdom-search-facetapi .item-list').css('border-bottom', '0');
      }
    });
        
       }) 
            
      /*$('.wisdom_tagcloud h2').mouseover(function(e) {
            e.preventDefault();        
            $('.wisdom_tagcloud h2 > span').toggleClass('expand');            
            $(this).parent().find('.item-list').find('ul').slideToggle();
        
       });*/
      
/*      var back_to_top = '<a href="#" class="back-to-top">' + Drupal.t("Back to top") +'</a>';
      if ($('.node-recur-event').length >0 || $('.node-type-landing-pages-node').length > 0) { }
      else if ($('.about-aol-section').length > 0) {
        $('.about-aol-section').before(back_to_top);
      } else if ($('.other-galleries').length > 0) {
        $('.other-galleries').after(back_to_top);
      }
      else if ($('article').size() == 1 && $('article').length > 0) {        
        if($('article .back-to-top').size() < 1){
          $('article').append(back_to_top);
        }
      }
      
      $('.back-to-top').click(function() {
        $(document).scrollTo('0%', 1500 );
      });    
  */    
      $(document).ready(function() {
       $('.section-handbook-header a').trigger('click');
       var url = window.location.href;
       if($('.wisdom-search-facetapi ul li a').hasClass('facetapi-active') || url.indexOf('wisdom-search') != -1){
         $('.wisdom-search-facetapi').find('.item-list').find('ul').slideToggle();        
       }
       
      });
      
      $('.section-handbook-header a').click(function(e) {       
        e.preventDefault();
        var path = "/random-meditation-question/js";
        if (Drupal.settings.pathPrefix) {
          path = "/" + Drupal.settings.pathPrefix + path;
        }
        var params = {'nid': Drupal.settings.cur_nid, 'lang': Drupal.settings.cur_lang };
        $.post(path, params,
          function(response, status){
          $('.section-handbook-header').next().find('.section-handbook-q').html(response.question);
          $('.section-handbook-header').next().find('.section-handbook-a').html(response.answer);
          }
        );
      });
      
      //File field Handling
      if ($('form.webform-client-form .form-managed-file').size() > 0) {
        $('form.webform-client-form .form-managed-file input[type=file]').hide();
        $("<a class='file-placeholder yellow-button' href='#'>" + Drupal.t("Browse") + "</div>").insertBefore("form.webform-client-form .form-managed-file .form-submit.ajax-processed");
        $('form.webform-client-form .form-managed-file .file-placeholder').bind( "click", function(e){
          e.preventDefault();
          $('form.webform-client-form .form-managed-file input[type=file]').one().trigger('click');
        });
        $("<div class='file-selected'></div>").insertBefore("form.webform-client-form .form-managed-file .file-placeholder");
        $('form.webform-client-form .form-managed-file input[type=file]').change(function(){
          var filespath = $(this).val().replace(/.+[\\\/]/, "");
          $('form.webform-client-form .form-managed-file .file-selected').html('Selecetd: ' + filespath);
        });
      }
      
      $("form.webform-client-form .form-managed-file").bind("DOMSubtreeModified",function(){
      if ($('form.webform-client-form .form-managed-file span.file').size() > 0 ) {
      $("form.webform-client-form .form-managed-file .file-placeholder").remove();
      $('form.webform-client-form .form-managed-file .file-selected').remove();
      }
      else {
      if ($("form.webform-client-form .form-managed-file .file-placeholder").size() > 1) {
        $("form.webform-client-form .form-managed-file .file-placeholder").eq(0).remove();
      }
      if ($("form.webform-client-form .form-managed-file .file-selected").size() > 1) {
        $("form.webform-client-form .form-managed-file .file-selected").eq(0).remove();
      }
      }
    });      
      
      $('.experiences .experiance-image').mouseover(function() {
      $('.experiences .experiance-desc').hide();
      $(this).next().show();
    })
    .mouseout(function() {
      $('.experiences .experiance-desc').hide();
    });
    var getHiddenElementHeight = function(element){
      var tempId = 'tmp-'+Math.floor(Math.random()*99999);//generating unique id just in case
      $(element).clone()
      .css('position','absolute')
      .css('height','auto').css('width','800px')
      //inject right into parent element so all the css applies (yes, i know, except the :first-child and other pseudo stuff..
      .appendTo($(element).parent().parent().parent())
      .css('left','-10000em')
      .addClass(tempId).show()
      h = $('.'+tempId).height()
      $('.'+tempId).remove()
      return h;
    }
      
     $(document).ready(function() {
      if (false == mobile) {
        $(".mega-menu-holder .mega-menu").each(function (index, domOb) {
          if ($(domOb).find('.menu-quote').size() > 0) {
            var top_margin = getHiddenElementHeight($(domOb).find('.menu-quote'));
            $(domOb).find('.menu-quote').parent().find('.DropdownDivColumn > ul').css('top', top_margin);
          }
          $(domOb).find('.without-image .mega-menu-content').each(function (i, ob){
            if ($(ob).find('h3.DropdownMenuLink a').size() < 1) {
              $(ob).addClass('without-bottom-border');
            }
          });
        });
      }
      if ($('.testimonials ul.testimonial-items').size() > 0) {
          if($('.testimonials #testimonial-nav span').size() < 2) {
            $('.testimonials #testimonial-nav').hide();
          }
      }
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
      
      if($('#footer-search-form').length){
        $('#footer-search-form').submit(function(){
          var url = $(this).attr('action');
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
      $('.unity_menu li').mouseenter(function(){
        $(this).addClass('active');
      }).mouseleave(function(){
        $(this).removeClass('active');
      });
   });
     var qa_count = -1;
     if ($('.QAQuestionClosed, .QAQuestionOpen').length > 1) {
       $('.QAQuestionClosed, .QAQuestionOpen').each(function() {
         if ($(this).next().hasClass("QAHidden") || $(this).next().hasClass("QAShow")) {
           qa_count++;
           var html = _.template(question_and_answer_template, {"question": $(this).html(), "answer":$(this).next().html(), "id":qa_count});
           
           $(this).next().after(html);
           $(this).next().remove();
           $(this).remove();
         }
       });
       if ($(".QABottom").length > 0) {
          $(".QABottom").remove();
       }
     }
     
       $('.question-box, .QAQuestionClosed, .QAQuestionOpened').click(function(e) {
          e.preventDefault();
          if (e.target.href) {
            window.open(e.target.href);
          }
          $(".accordian-container").each(function(){
            //$(this).css({'min-height': $(this).height()});
          });
          $('.question-answer-container .currentAccordian').removeClass('currentAccordian');
          if($(this).parent().find('.answer-box').css('display') == 'none') {
//            $('.question-answer-container .question-box').find('span').removeClass('expand');
            $('.QAQuestionOpen').removeClass('QAQuestionOpen').addClass('QAQuestionClosed');
            
            $('.answer-box').delay(100).slideUp( 800 ).css( 'zoom', '1' ); 
            //$(this).find('.up-down-arrow span:first').addClass( 'expand' );
            $(this).addClass('QAQuestionOpen');
            $(this).find('.up-down-arrow span:first').addClass( 'currentAccordian' );
            var target = this;
            setTimeout(function() {
                if (!isElementInViewport($('.question-answer-container .currentAccordian').parent().parent()[0])) {
                  $(document).scrollTo($('.question-answer-container .currentAccordian').parent().parent().offset().top-40, 1500 );
                }
            }, 900);
          }else{
            $(this).next('.answer-box').show(); 
            $(this).find('.up-down-arrow span:first').removeClass('expand'); 
          }       
          $(this).parent().find('.answer-box').delay(105).slideToggle(700); 
          $('.expand-all-q-a a.expand-all').css('display','inline-block');
          $('.expand-all-q-a a.collapse-all').css('display','none');
         
          setTimeout(function() {
            $(".accordian-container").each(function(){
//                $(this).animate({'min-height': $(this).find('.accordian-container-inner').height()+50}, 500);
            });
          }, 950);
          
        });
       if (qa_count > -1) {
         $("#qa-0 .question-box").trigger("click");
       }
        
      
    }
  };
   
  Drupal.aol_zen.renderCourseFollowUp = function (data, stat ) {
        
        var viewHelpers = {
           checkForDayNames : function(course){
             return geoHelper.checkDayNames(course);
           }
        }
        _.extend(data, viewHelpers);
        
        var viewHelpers2 = {
           checkDateDays : function(start, start_date, end , requestFor, type) {
             return geoHelper.getCourseDateDays(start, start_date, end , requestFor, type);
           }
        }
        _.extend(data, viewHelpers2);
        
        var viewHelpers3 = {
           getMonthNames : function(format_date, recur_event) {
             return geoHelper.getMonthName(format_date, recur_event);
           }
        }
        _.extend(data, viewHelpers3);
        
        var viewHelpers4 = {
           getCourseDay : function(start_date, end_date) {
             return geoHelper.getCourseDay(start_date, end_date);
           }
        }
        _.extend(data, viewHelpers4);
        
        var viewHelpers5 = {
           checkManyDay : function(start_date, end_date) {
             return geoHelper.checkManyDay(start_date, end_date);
           }
        }
        _.extend(data, viewHelpers5);
        
        var all_course_html = _.template(upcoming_course_template, data);
        if (typeof Drupal.settings.geo_search == 'undefined') {
          Drupal.settings.geo_search = {};
        }

        if(stat == 1) {
          Drupal.settings.geo_search.all_courses = data;
          
          var viewHelpers6 = {
           checkForDayNames : function(course){
             return geoHelper.checkDayNames(course);
           }
	        }
	        _.extend(Drupal.settings.geo_search.all_courses.rows[0], viewHelpers6);
	        
	        var viewHelpers7 = {
	           checkDateDays : function(start, start_date, end , requestFor, type) {
	             return geoHelper.getCourseDateDays(start, start_date, end , requestFor, type);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_courses.rows[0], viewHelpers7);
	        
	        var viewHelpers8 = {
	           getMonthNames : function(format_date, recur_event) {
	             return geoHelper.getMonthName(format_date, recur_event);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_courses.rows[0], viewHelpers8);
	        
	        var viewHelpers9 = {
	           getCourseDay : function(start_date, end_date) {
	             return geoHelper.getCourseDay(start_date, end_date);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_courses.rows[0], viewHelpers9);
	        
	        var viewHelpers10 = {
	           checkManyDay : function(start_date, end_date) {
	             return geoHelper.checkManyDay(start_date, end_date);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_courses.rows[0], viewHelpers10);
          
          $('#local-center-upcoming-courses').html(all_course_html);
          var course_html = _.template(upcoming_course_details_template, Drupal.settings.geo_search.all_courses.rows[0]);
        }
        else if(stat == 2){
          Drupal.settings.geo_search.all_followups = data;
          
          var viewHelpers11 = {
           checkForDayNames : function(course){
             return geoHelper.checkDayNames(course);
           }
	        }
	        _.extend(Drupal.settings.geo_search.all_followups.rows[0], viewHelpers11);
	        
	        var viewHelpers12 = {
	           checkDateDays : function(start, start_date, end , requestFor, type) {
	             return geoHelper.getCourseDateDays(start, start_date, end , requestFor, type);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_followups.rows[0], viewHelpers12);
	        
	        var viewHelpers13 = {
	           getMonthNames : function(format_date, recur_event) {
	             return geoHelper.getMonthName(format_date, recur_event);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_followups.rows[0], viewHelpers13);
	        
	        var viewHelpers14 = {
	           getCourseDay : function(start_date, end_date) {
	             return geoHelper.getCourseDay(start_date, end_date);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_followups.rows[0], viewHelpers14);
	        
	        var viewHelpers15 = {
	           checkManyDay : function(start_date, end_date) {
	             return geoHelper.checkManyDay(start_date, end_date);
	           }
	        }
	        _.extend(Drupal.settings.geo_search.all_followups.rows[0], viewHelpers15);
          
          $('#local-center-follow-ups').html(all_course_html);
          var course_html = _.template(upcoming_course_details_template, Drupal.settings.geo_search.all_followups.rows[0]);
        }
        
        $('#course-details').html(course_html);
        $('.course-upcoming-row').removeClass('active-course');
        $('.course-upcoming-row:first-child').addClass('active-course');
//        a2a_add(data.rows[0]);  
        var acivateDetails = function() {
          idx = $(this).index();
          $('.course-follow-ups-lists .course-follow-ups').eq(idx).find('.course-upcoming-row:first-child').trigger('mouseenter');
        }
        $('.course-follow-ups').aol_custom_tabs({
          'tab'      : '.aol-tabs-tab ul li',
          'console'  : '.course-follow-ups-lists > div',
          'action'   : 'click',
          'callback' : acivateDetails,
        });
      }


  //Place your code here.
  Drupal.behaviors.Tabs = {
    attach: function () {
      $('.aol-bottom-tabs').aol_custom_tabs({
        'tab'     : '.aol-tabs-tab li',
        'console' : '.aol-tabs-content #tabs-content > li'
      });
      
      $('.articles-tab-wrapper').aol_custom_tabs({
        'tab'     : '.articles-tab li',
        'console' : '.articles-tab-content > li',
        'action'  : 'click'
      });
      
      $('.videos-tab-wrapper').aol_custom_tabs({
        'tab'     : '.videos-tab li',
        'console' : '.videos-tab-contnet > .box-show',
        'action'  : 'click'
      });
    }
  };

  /**
  * Attach handler.
  */
  Drupal.behaviors.ArtOfLiving = {
    attach: function (context, settings) {
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

      $(document).on('mouseenter', "#CountrySelectorDropdown .DropdownDivColumn",
        function () {
//          $(this).parent().find('.DropdownDivColumn').removeClass('active');
//          $(this).addClass('active');
        }
      );
      // Run functions on screen resize
      resizeFunctions();
      $(window).resize(resizeFunctions);
      
      
      $('.question-box').each(function(){
      if ($(this).find('.up-down-arrow').length < 1) {
        $(this).append('<div class="up-down-arrow"><span class=""><span class="triangle"></span></span></div>');
      }
    });
    }
  };
  
  var mobileAdded = false;

  function mobileAdd() {
    
    if (Drupal.settings.pathPrefix && Drupal.settings.pathPrefix.indexOf("en") > 1) {
      path = "/" + Drupal.settings.pathPrefix + "apps";
    
      $('#header').prepend('<a href="' + path + '" id="apps"><div class="mobile-apps">' + Drupal.t('Our Mobile Apps') + '</div></a>');
    }
  }
  
  function mobileRemove() {
    $('#header #apps').remove();
  }
  
  
  /**
   * Run functions on screen resize
   *
   * @param {event} e
   *   The resize event.
   */
  function resizeFunctions(e) {
    // Gather the content zones.
    if (document.documentElement.clientWidth < 768 && false == mobileAdded) {
      mobileAdd();
      mobileAdded = true;
    }
    else if(document.documentElement.clientWidth >= 768 && true == mobileAdded) {
      mobileRemove();
      mobileAdded = false;
    }
    processTableToggle();
  }
  
  
  
   function processTableToggle(){
     if($('table').hasClass('stacktable')){
       $('.stacktable.large-only').each(function(){
       stkTable = $('.large-only').width();
       stkContainer = $(this).closest('#content').width();
       //console.clear();
       //console.log('table: '+stkTable+"stkContainer :"+stkContainer);
       if(stkTable < stkContainer ){
         $('.stacktable.large-only').show();
         $('.stacktable.small-only').hide();
       }
       if(stkTable > stkContainer ){
         $('.stacktable.large-only').hide();
         $('.stacktable.small-only').show();
       }
       });
     }//console.log('stakable table resize triggered');
   }
  /**
   * Apply changes to the main menu based on the width of the document.
   */
  function mainMenuProcess() {
//    $(".Menu-outer").hide();
  }
  
  function track_callback_aol(formatted_number, mobile_number){
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
  
})(jQuery, Drupal, this, this.document);
