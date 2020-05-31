/********************
 * fucntions.js
 * version 1.0
 * brantwebdesign
*********************/
(function ($, Drupal, window, document, undefined) {
  
  Drupal.behaviors.unity2 = {}
  Drupal.behaviors.unity2.attach = function(context, newsettings){
//    $('#responsive-menu-button').sidr({
//      name: 'sidr-main',
//      source: '#navigation',
//      onOpen: function() {
//        console.log("here");
//        
//      }
//    });
		var id = $(context).attr('id');
    if ($('.webform-client-form', context).length > 0 && context != document){
      if ($('.webform-client-form', context).hasClass('ajax-fail')){
   			window.VWO = window.VWO || [];
				window.VWO.push(['nls.formAnalysis.markSuccess', $('.webform-client-form', context), 0]);
				if(typeof window.VWO.nls !== 'undefined')
   				delete VWO.nls.formAnalysis.forms[VWO.nls.formAnalysis.getFormName($('.webform-client-form', context))];    
  		}       
		}
    
    if (!$("body").hasClass("page-page")) {
      if (jQuery(".nav >li > a[href='"+ window.location.pathname +"']").length > 0) {
        jQuery(".nav >li > a[href='"+ window.location.pathname +"']").parent().addClass("mobile_menu_active menu_active");
      }
      else if(jQuery(".nav a[href='"+ window.location.pathname +"']").length > 0) {
        jQuery(".nav a[href='"+ window.location.pathname +"']").addClass('active');
        jQuery(".nav a[href='"+ window.location.pathname +"']")
        .closest('.sub-menu').parent().addClass("mobile_menu_active menu_active");
      } else if(typeof Drupal.settings.aol.taxonomy != 'undefined'){
        Drupal.settings.aol.taxonomy.forEach(function(f) { 
          jQuery('[data-tids*=' + f + ']').addClass("mobile_menu_active menu_active");
        });
  
      }
    }
    
    $('#responsive-menu-button').sidr({
          name: 'sidr-main',
          displace: false,
          source: '#navigation',
          onOpen: function() {
            $('#responsive-menu-button').hide();
            $("#mobile-header").addClass("sidr_menu");
            $('#CountrySelectorDropdown').hide();
            if ($('#edit-center-autocomplete-google2').hasClass("active")){ 
              $('#edit-center-autocomplete-google2').removeClass("active");
              $('.head_right_sec').removeClass('active');
              $('.logo').show();
              $('#current_country').show(); //since it breakes on mobile screen
              $('.search-btn').show();
            }            
          },
          onClose: function() {
            $("#mobile-header").removeClass("sidr_menu");
            $('#responsive-menu-button').show();
          }
        });
    
    
  
  
  // course table fade
  // check table display setting first, if display:block we don't do anything (mobile)
  $('#course-table tr').mouseenter(function(){
    if (($('#course-table').css('display')) === 'table') {
      $(this).find('.detail-hide').fadeIn('400');
      //$(this).find('.detail-hide .course-detail').animate({'line-height': '21px'},150);
      //$(this).find('.detail-hide .course-detail-small').animate({'line-height': '16px'},150);
      //$(this).find('.detail-hide .course-detail-small > span').animate({'line-height': '16px'},150);
    }
  });
  $('#course-table tr').mouseleave(function(){
    if (($('#course-table').css('display')) === 'table') {
      $(this).find('.detail-hide').hide();
      //$(this).find('.detail-hide span').animate({'line-height': 0},100);
    }
  });
  
  
  // Course Slider
  $('.slider_course').each(function() {
    if ($(this).children().length >1)
    $(this).owlCarousel({
      loop: true,
      autoplay: true,
      dots: true,
      dotsEach: true,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        768: {
          items: 1,
          nav: false
        },
        1025: {
          items: 1
        }
      }
    });
  });
    
  if ($('body').hasClass('front')) {
    $('.newsletter_sec.form-inline').show();
  }
   $('.intl-pop').click(function(e){
     e.preventDefault();
     if(!$('.gl-bg-overlay').is(":visible")){
      $('.gl-bg-overlay').remove();
     $('.region').prepend('<div class="gl-bg-overlay"></div>');
     $('.gl-bg-overlay').show();
     $('.unity_plus_country_locator.unity2 > #CountrySelectorDropdown').slideToggle();
     }
   });
    if (window.dataLayer) {
      //Its defined,, no need to redefine it again.
    }else{
      window.dataLayer = window.dataLayer || [];
    }
   
   //This code is for catching user click events data for Google Analytics
   $('.course-register-gte').click(function(){
    var sao_id = $(this).attr('data-sao-id');
    var title = $(this).attr('data-course').trim();
    var page_type = $(this).attr('data-register-page-type');
    catchRegisterButtonEvent(page_type, sao_id, title);
  });
   
  $('.search, #sidr-id-responsive-menu-close-button').click(function(){
    if ($('#sidr-main').is(":visible")) {
      $.sidr('close', 'sidr-main');
    }
  });
  
  function catchRegisterButtonEvent(landing_page_type, sao_id, title){
    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        add: {
          actionField: {
            list: landing_page_type
          },
          products: [{
            id: sao_id,
            name: title,
            category: '4 days',
            variant: 'NA',
            brand: 'The Art Of Living',
            quantity: 1,
          }]
        }
      }
    });
    console.log(dataLayer);
  }  
 }

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.navbar').addClass('nav-up').removeClass('nav-down');
        $('.back-to-top').addClass('stick-this');
        // $('#CountrySelectorDropdown').hide();
        // $("#CountrySelectorDropdown").find('.search-form').find('input').is(":focus"))) {
        //   $('#CountrySelectorDropdown').hide();
        // }
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.navbar').removeClass('nav-up');
            $('.navbar').addClass('nav-down');
            
            if($(this).scrollTop() < 50){
              $('.navbar').removeClass('nav-down');
            }
            
        }
    }
    
    lastScrollTop = st;
    $('.search-btn').show();
    $('.gl-bg-overlay').hide();
    
    if(st < $( window ).height()){
      $('.back-to-top').removeClass('stick-this'); //hide scroll top button when scrolled only device height
    }
}
    
})(jQuery, Drupal, this, this.document);

jQuery('document').ready(function($) {
  var replace_smart_search = Drupal.settings.aol.replace_smart_search;
 $('.back-to-top').click(function(e) {
   e.preventDefault();
//   $(document).scrollTo('0%', 1500 );
   $("html, body").animate({ scrollTop: 0 }, 1500);
 });
  // mobile menu
//  $('#responsive-menu-button').sidr({
//    name: 'sidr-main',
//    source: '#navigation'
//  });
  
  
  // course table fade
  // check table display setting first, if display:block we don't do anything (mobile)
  $('#course-table tr').mouseenter(function(){
    if (($('#course-table').css('display')) === 'table') {
      $(this).find('.detail-hide').fadeIn('400');
      //$(this).find('.detail-hide .course-detail').animate({'line-height': 21},150);
      //$(this).find('.detail-hide .course-detail-small').animate({'line-height': 16},150);
      //$(this).find('.detail-hide .course-detail-small > span').animate({'line-height': 16},150);
    }
  });
  
  $('.same-height:not(.height-fixed)').each(function() {
    var parent_selector = $(this).data('common-parent'),
        parent = $(this).closest(parent_selector),
        max_height = 0;
    $(parent).find('.same-height').each(function() {
      max_height = Math.max($(this).height(), max_height);
    });
    $(parent).find('.same-height').height(max_height).addClass('height-fixed');
  });
  
  $('#course-table tr').mouseleave(function(){
    if (($('#course-table').css('display')) === 'table') {
      $(this).find('.detail-hide').hide();
      //$(this).find('.detail-hide span').animate({'line-height': 0},100);
    }
  });
 // header drop doun county selector scrips TODO move this into some other @unity2 specific file if needed
  $(".search-btn").on('click', function() {
  if(window.innerWidth < 768){
    //$('.continent-select').show();
    $('#CountrySelectorDropdown  .DropdownMenu  h2').click(function(){
      $('#continent-select').val($(this).text());
      $('.country-select').show();
      $(this).next().toggle();
      $('.DropdownDivColumn2 > h2').toggle();
      $('.DropdownDivColumn2 > .global-image').toggle();
  });
  //$('.region-content').toggleClass('gl-bg-overlay');// adds lightbox effect background to global locator for mobile #removed by chinmay
   }
		countryAutoComplete();

  });
  $("#current_country").on('click', function(e) {
  	if(window.innerWidth < 768){
  		countryAutoComplete();
  	}
  });
  
      $('.continent-select').click(function(){
      $('.DropdownDivColumn2 > ul').hide();
      $('.country-select').hide();
      $('.DropdownDivColumn2 > h2').toggle();
      $('.DropdownDivColumn2 > .global-image').toggle();
  });
  
  jQuery(".find-center-talk-teacher-phone").click(function() {
    jQuery(".find-center-talk-teacher-phone-detail").toggle();
  });
  // trigger hide show depending on  country locator click
  jQuery('.change-country-website').click(function(){
    jQuery(this).parent().parent().parent().hide();
    $('.switch-bar').hide();
    jQuery('.change-country-website-selector').show();
  });
  
  jQuery('.International-retreat-center').click(function(){
    jQuery(this).parent().parent().parent().hide();
    $('.switch-bar').hide();
    jQuery('.International-retreat-center-selector').show();
  });
  jQuery('.country-city-chapters').click(function(){
    jQuery(this).parent().hide();
    jQuery('.change-country-chapter-website-selector').show();
  });
  jQuery('.international-options').click(function(){
    jQuery(this).parent().hide();
    jQuery('.international-options-selector').show();
  });
   jQuery('.find-a-course-gl').click(function(){
    if(replace_smart_search == 0){
        jQuery(this).parent().hide();
        jQuery('nav.navbar').addClass('gl-search-course-mobile');
        jQuery('#edit-center-autocomplete-google2').addClass("active");
        jQuery('.country-selector-gl').show();
    }else{
        jQuery(this).parent().hide();
        jQuery('.smart-search-selector').show();
        jQuery('.smart-search-option-list').show();
    }
   });
   jQuery('.search-course-location').click(function(){
        jQuery(this).parent().parent().parent().hide();
        $('.switch-bar').hide();
        jQuery('.search-course-location-selector').show();
  });
  jQuery('.inner-hide-search-selector').click(function(){
    jQuery(this).parent().parent().hide();
    $('.switch-bar').show();
    jQuery('.smart-search-selector').show();
    $('#edit-center-autocomplete-google2').removeClass("active");
  });
  jQuery('.search-course-name').click(function(){
        jQuery(this).parent().parent().parent().hide();
        $('.switch-bar').hide();
        jQuery('.search-course-name-selector').show();
  });
  $(document).on('keypress', '.mobile-search-course-finder', function(e){
    if (e.which === 32 && !this.value.length){
        e.preventDefault();
        return false;
    }
  });
  $(document).on('keyup', '.mobile-search-course-finder', function(e){
    if(e.keyCode == 13){
      e.stopPropagation();
      var path = 'search/course';
      var graduate_path = 'search/graduate';
      var current_url = window.location.href;
      var href = $('.search_autocomplete_course').find('.m_smart_search_li.active').find('a').attr('href');
      window.location.href = href; 
      if(current_url.toLowerCase().indexOf(path) !== -1 || current_url.toLowerCase().indexOf(graduate_path) !== -1){
        window.location.reload();
      }
    }else{
      var search_word =  $(this).val();
      search_word = search_word.trim();
      if (search_word.length  < 1) {
        refresh_search_mobile(search_word, 1);
      } else {  
        refresh_search_mobile(search_word, 0);
      }
    }
  });
  $(document).on('focus', '.mobile-search-course-finder', function(){
    var search_word =  $(this).val();
    search_word = search_word.trim();
    if (search_word.length  < 1) {
      refresh_search_mobile(search_word, 1);
    } else {  
      jQuery('.search_autocomplete_course').show();
    }
  });
  
  function refresh_search_mobile(search_word, display_defalut){
      var html_str ='';
      var search_word_typo = '';
        var course_counts = smartsearchdata.course_counts;
        var location_not_found_text = 'No result found';
        if(display_defalut == 1){
          var course_counts = smartsearchdata.defalut_course_counts;  
          location_not_found_text = 'Type your location and select to see all programs in your location';
        }
        var typo_result = smartsearchdata.typo_result;
        var search_word_low = search_word.toLowerCase();
        /*if(search_word_low in typo_result){
            console.log("strrr",typo_result[search_word_low]);
            search_word = typo_result[search_word_low];
        }*/
        $.each( typo_result , function( key, value ){
          if(key.indexOf(search_word_low) != -1){
            search_word_typo = value;
            return false;
          }
        });
          html_str += '<ul>';
          var course_display_count = 0;
          var parent_id_arr = [];
          var m_search_li_count = 0;
          for (var i = 0; i < course_counts.length; ++i) {
            if((course_counts[i].title.toLowerCase().indexOf(search_word.toLowerCase()) !== -1  || ( search_word_typo.length > 0 &&  course_counts[i].title.toLowerCase().indexOf(search_word_typo.toLowerCase()) !== -1) )&& ($.inArray(course_counts[i].parent_id,parent_id_arr) < 0)){
            //if(course_counts[i].title.toLowerCase().indexOf(search_word.toLowerCase()) !== -1 ){
              parent_id_arr.push(course_counts[i].parent_id);
              m_search_li_count = m_search_li_count +1;
              var title = course_counts[i].display_title;
              var count = course_counts[i].count;
              var country_name = course_counts[i].country_name;
              var m_li_active ='';
              if(m_search_li_count == 1){
                m_li_active =' active';
              }
              title = title.replace(search_word,'<span class="matched">'+search_word+'</span>');
              var sub_title = '<span class ="sub_title">('+count+' upcoming courses in '+country_name+')</span>';
              html_str += '<li class ="search_autocomplete_course_li m_smart_search_li '+m_li_active+'">';
                html_str += '<a href="'+course_counts[i].link+'" ><span>'+title+'</span></br>'+sub_title+'</a>'
              html_str += '</li>';
                course_display_count++;
            }
            if(course_display_count == 3){
              break;
            }  
          }
          if(course_display_count == 0){
            html_str += '<li class = "not_found">'+Drupal.t(location_not_found_text)+'</li>';
          }
          
          html_str += '</ul>';

     jQuery('.search_autocomplete_course').html(html_str);
     jQuery('.search_autocomplete_course').show();
  }
   $('.search-website-gl').click(function(){
     $(this).parent().hide();
     $('.search-webiste-gl-p2').show();
   });
  
  //general functions
  jQuery('.hide-selector').click(function(){
    jQuery(this).parent().parent().hide();
    jQuery('.mobile-country-locator-2').show();
    $('#edit-center-autocomplete-google2').removeClass("active");
  });
  jQuery('.inner-hide-selector').click(function(){
    jQuery(this).parent().parent().hide();
    $('.switch-bar').show();
    jQuery('.international-options-selector').show();
    $('#edit-center-autocomplete-google2').removeClass("active");
  });
  
  $('.close-selector').click(function(){
    $('.country-locator-phase2').hide();
    $('.mobile-country-locator-2').show();
    $('#CountrySelectorDropdown').hide();
    $('#edit-center-autocomplete-google2').removeClass("active");
    $('.gl-bg-overlay').hide();
    $('.search-btn').show();
    //$('#mobile-header').css('float','right');
    $('.logo').removeClass('hidden-xs');
  });
  
  $('.close-selector-top').click(function(){
    $('.gl-bg-overlay').hide();
    $('.search-btn').show();
    $('#CountrySelectorDropdown').hide();
    //$('#mobile-header').css('float','right');
    $('.logo').removeClass('hidden-xs');
  });
  var close_sidr = function () {
    if ($('#sidr-main').is(":visible")) {
      $.sidr('close', 'sidr-main');
    }
  }
  
  $(window).resize(function() {
    if($(window).width() > 1023){
      close_sidr();
    }
  });
  
  $('.search, #sidr-id-responsive-menu-close-button').click(function(){
    close_sidr();
  });
  
	function countryAutoComplete(){
		var list = {
			countries: []
		};
	  jQuery('#mobile-country-list').find('a').each(function(i,mobileCountry) {
	    list.countries.push({
	    "label" : jQuery(this).text(),
	    "value" : jQuery(this).attr('href'),
	   }) // */
	             
		});
		masterList = list.countries.sort(function (a, b) {
	    return a.label.localeCompare( b.label );
	  });
		var termTemplate = "<span class='ui-autocomplete-term'>%s</span>";
	   $("#mobile-country-finder").autocomplete({
	    source: list.countries,
	    open: function(e,ui) {
	    var
	        acData = $(this).data('uiAutocomplete'),
	        styledTerm = termTemplate.replace('%s', acData.term);
	
	    acData
	        .menu
	        .element
	        .find('a')
	        .each(function() {
	            var me = $(this);
	            me.html( me.text().replace(acData.term, styledTerm) );
	        });
	    },
	    select: function( event, ui ) { 
	        window.location.href = ui.item.value;
	    }
		}).focus(function () {
			$(this).autocomplete("search", " ");
		});
	      
	  var chapterList = {
	      countryChapters: []
	  };
	  jQuery('.country-chapters').find('li').each(function(j,countryChapterHolder) {
	    jQuery(countryChapterHolder).find('a').each(function(k,country) {
		      chapterList.countryChapters.push({
		      "label" : jQuery(this).text(),
		      "value" : jQuery(this).attr('href'),
				}) // */
	    });    
	  });
	  
	  jQuery("#mobile-country-chapter-finder").autocomplete({
	    source: chapterList.countryChapters,
	    select: function( event, ui ) { 
	        window.location.href = ui.item.value;
	    },
	  });
	}
});

jQuery(document).ready(function(){
    var window_length = jQuery(window).width();
    pagebreadcrumbupdate();
    // if(jQuery("#hellobar-pusher").length > 0){
        jQuery(document).scroll(function (event) {
            if(jQuery("#hellobar-pusher").length > 0){
            console.log('sa');
            hellobar_header();
            }
        });
    jQuery(document).on('click', ".hellobar-arrow", function(){
        console.log('arrow');
        hellobar_header();
    });
});

(function($) {
    $('.HB-Bar').contents().find('.hb-close-wrapper').click(function(){
        hellobar_header();
    });
})(jQuery);

function hellobar_header(){
    var window_length = jQuery(window).width();
    var height_scroll = jQuery("#hellobar-pusher").css( "height");
    var display = jQuery("#hellobar-pusher").css( "display");
    console.log(display);
    console.log(height_scroll);
    if(height_scroll === "35px" && display !== "none" && height_scroll !== undefined && display !== undefined && height_scroll !== '0px'){
        if(window_length > 1024){
            var scrollhel = true;
            pagebreadcrumbupdate(scrollhel);
            // jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').addClass('unity2-pg-bc-submenu-head');
        }
        if(window_length < 768){
            jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').removeClass('unity2-pg-bc-menu-mb').addClass('unity2-pg-bc-submenu-head-m');
        }
    }else{
        if(window_length > 1024){
            jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').addClass('unity2-pg-bc-submenu').removeClass('unity2-pg-bc-submenu-head').removeClass('unity2-pg-bc-menu-head');
            pagebreadcrumbupdate();
        }else if(window_length < 768){
            jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').addClass('unity2-pg-bc-menu-mb').removeClass('unity2-pg-bc-submenu-head-m');
        }
    }
}

jQuery(window).load(function(){
    var hash = window.location.hash;
    var strfb = '.facebook';
    var strtw = '.twitter';
    var strgm = '.gmail';
    if(hash){
        if(hash.indexOf(strfb) != -1 ){
        var newurl = replaceUrlParam('fbclid','Facebook');
        history.pushState(null, null, newurl);
    }else if(hash.indexOf(strtw) != -1){
        window.location.hash = '';
        var newurl = replaceUrlParam('fbclid','Twitter');
        history.pushState(null, null, newurl);
    }else if(hash.indexOf(strgm) != -1){

        var newurl = replaceUrlParam('fbclid','Gmail');
        history.pushState(null, null, newurl);
    }
    }

});

function replaceUrlParam(paramName, paramValue){
    var url = window.location.href;

    if (paramValue == null) {
        paramValue = '';
    }

    var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
    if (url.search(pattern)>=0) {
        return url.replace(pattern,'$1' + paramValue + '$2');
    }

    url = url.replace(/[?#]$/,'');
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
}

function pagebreadcrumbupdate(scrollhel = false){
    var window_length = jQuery(window).width();
    if(jQuery('.nav.navbar-nav.navbar-left.unity_menu li.mobile_menu_active.menu_active').find('.sub-menu').length !== 0){
        if(jQuery('.nav.navbar-nav.navbar-left.unity_menu li.mobile_menu_active.menu_active').find('div.sub-menu ul.sub-menu-inner').length !== 0 ){
            if(window_length > 1024 && window_length < 1251){
                jQuery('#block-system-main').addClass('sub_menu_overide_image1024');
                if(scrollhel === true){
                    jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').addClass('unity2-pg-bc-submenu-head');
                }
                // jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').addClass('unity2-pg-bc-submenu');
            }
            if(window_length > 1250){
                if(scrollhel === true){
                    jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').addClass('unity2-pg-bc-submenu-head');
                }else{
                    jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').addClass('unity2-pg-bc-submenu');

                }
                jQuery('#block-system-main').addClass('sub_menu_overide_image1250');
                // jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').addClass('unity2-pg-bc-submenu');
            }

        }


    }else{
        if(scrollhel === true){
            jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').removeClass('unity2-pg-bc-submenu-head').addClass('unity2-pg-bc-menu-head');

        }else{
            jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').addClass('unity2-pg-bc-menu');
        }
    }
    if(window_length < 768){

        jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').removeClass('unity2-pg-bc-submenu').addClass('unity2-pg-bc-menu-mb');
    }
    if(jQuery(".element-LocalCenterMenu .div_LocalCenterMenu").find(".local_center_menu ").length !== 0){
        if(window_length > 1024 ){
            jQuery('.unity2-page-breadcrum').removeClass('unity2-pg-bc-menu').addClass('unity2-pg-bc-local-center');
        }
        // .element-LocalCenterMenu .div_LocalCenterMenu .local_center_menu
    }

}

jQuery(document).ready(function () {
    if((jQuery("#webform-component-terms-of-use").length > 0 ) && (jQuery(".captcha").length > 0)){
        jQuery(".captcha.form-wrapper").prependTo("#webform-component-terms-of-use");
    }
    if(jQuery('.captcha.form-wrapper').length == 2){
        jQuery('.captcha.form-wrapper').first().remove();

    }
    var sumbittedUrls =window.location.href;

    var urls = sumbittedUrls.match(/\b(beyond-breath)/g);
    if(urls){
        jQuery('.HB-Bar').addClass('breath_hide_leads');
        jQuery('.HB-Bar').hide();
    }
});

jQuery(document).ready(function () {
    jQuery('body').find('#my-chat-bot').parent().parent().parent().parent().parent().addClass('chatbot_ui_index'); // for chatbot to get index of all
    // jQuery('.chatbot_ui_index').hide();
    // setTimeout(function(){
    //     jQuery('body').find("#chat_wakeup").trigger('click');
    //     jQuery('.chatbot_ui_index').show();
    //     }, 3000);
    // jQuery('#chat_wakeup').trigger("click");
   if(window.location.pathname == '/in-en/search/course'){
       jQuery('.HB-Bar').addClass('hidden');
   }
        var path =  window.location.pathname;
        var matches = path.match('us-en/search');
        if(matches){
            // console.log('display:contents');
            jQuery("body").css({"display":"contents"});
        }
    if(jQuery('.email-phone.field-info-icon').length > 0){
        var path =  window.location.pathname;
        var matches = path.match('si-en');
        var matches2 = path.match('si-sl');
        if(matches || matches2){
            jQuery('.email-phone.field-info-icon').remove();
        }

    }
    if(Drupal.settings.aol.full_language == 'en-us'){
      jQuery('.unity_menu li ').find("a[href$='need-to-talk/']").attr('target','_blank');
    }
});
