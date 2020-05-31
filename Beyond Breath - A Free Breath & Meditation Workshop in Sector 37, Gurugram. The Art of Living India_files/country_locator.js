(function ($) {

$(document).ready(function() {

    if(jQuery(".country-locator-phase2 .country-chapters").length > 0){
        showcenter();
    }
    $("#current_country").on('click', function(e) {
      selectContinent(1);
      $("#CountrySelectorDropdown ").menuAim({
           activate: function(row) {
             $(row).parent().find('.DropdownDivColumn').removeClass('active');
             $(row).addClass("active"); 
           },
           rowSelector: ".DropdownDivColumn",
           tolerance: 20,
           width: 165,
      });
      $('.unity_plus_country_locator.unity > #CountrySelectorDropdown').slideToggle();
      if($('.unity_plus_country_locator.unity2 > #CountrySelectorDropdown').css('display') == 'block')
      	$('.unity_plus_country_locator.unity2 > #CountrySelectorDropdown').slideToggle();
      $('.unity_plus_country_locator.unity2 > .current-country-holder > .center-changer').slideToggle();
    });
    $('#bt-close').on('click', function(e) {
      e.preventDefault();      
      $(this).parent().slideToggle();
      $('.gl-bg-overlay').hide();
    });
    $('.search-btn').click(function(){
       if (window.innerWidth < 768) {
         $(".gl-bg-overlay").remove();
         $('.region').prepend('<div class="gl-bg-overlay"></div>');
         $('.gl-bg-overlay').show();
         selectContinent(1);
         $('#CountrySelectorDropdown').slideToggle();
      }
    });
    jQuery( "body" ).click(function( event ) {
      if(event.target.className == 'gl-bg-overlay'){
        $('#CountrySelectorDropdown').hide();
        $('.gl-bg-overlay').hide();
      }
    });
    $('.LanguageSelection li').not('.Selected').hide();
    $('.LanguageSelection li.Selected a.active').unbind('click').bind('click', function(e) {
      e.preventDefault();
      if ($('.language-popup').length > 0) {
        $('.language-popup').remove();
      }
      else {
        //$('.LanguageSelection').toggleClass('language-popup');
        //$('#block-country-locator-3 .LanguageSelection li').not('.Selected').toggle();
        //var html = $('.LanguageSelection').clone();
        //$(html).addClass('language-popup').find('li').show();
        //$('.LanguageSelection').parent().append(html);
    	$('.unity_plus_country_locator.unity2 > .current-country-holder > .center-changer').hide();
    	$('#CountrySelectorDropdown').hide();
    	var html = $('.LanguageSelection').html();
        $('.LanguageSelection').parent().append('<div class="LanguageSelection1 LanguageDiv language-popup">'+html+'</div>');
        $('.language-popup').find('li').show();
      }
    });

 });
$(document).bind('click', function(e){
    var $target = $(e.target);
    if(!$target.closest('.LanguageSelection').length){
      $('.LanguageSelection1.language-popup').remove();
    }
    
  });


// COUNTRY SELECTOR --------------------------------------------------------------------------

var COUNTRIES_PER_COLUMN = 29;
var COUNTRY_COLUMNS = 5;

var selectedContinent = 1;
var currentCountriesPage = 0;


function showHideCountrySelector() {
    elm = document.getElementById("CountrySelectorDropdown");
    // Show & hide
    if (elm.className == "CountrySelectorShow") {
        elm.className = "CountrySelectorHidden";
    } else {
        elm.className = "CountrySelectorShow";
        showContinent(selectedContinent, 0);
    }
}



/**
* Selects a continent
* @param continentId
**/
function selectContinent(continentId) {
    // Sve last selected continent
    lastContinent = selectedContinent;
    // Select Continent
    selectedContinent = continentId;
    // Hide last one
    hideContinent(lastContinent);
    // Shows a continent
    showContinent(continentId, 0);
    currentCountriesPage = 0;
}

var was = false;

function showContinent(continentId, page) {
  var result = {};
  result.continents = continentCountries;
  var html = _.template(countries_rows_template, result);
  var mobileHtml = _.template(mbl_countries_rows_template, result);
  
  $("#CountrySelectorDropdown").find('.DropdownMenu').html(html);
  $("#CountrySelectorDropdown").find('#mobile-country-list').html(mobileHtml);
  return ;
}

function hideContinent(continentId, page) {
    showContinent(selectedContinent, currentCountriesPage);
}



function showcenter(){
    var result = {};
    result.continents = centerCountries;
    var html = _.template(center_rows_template, result);
    jQuery('.country-locator-phase2 .country-chapters').html('');
    jQuery('.country-locator-phase2 .country-chapters').html(html);
    return ;

}

})(jQuery);