var geoHelper = (function ($) {
  
  /*used for mobile*/
  var map_visible = false;
  var active_tab = 0;
  
  function mapVisible(visible) {
    if ('undefined' != typeof visible) {
      map_visible = visible;
    }
    
    return map_visible;
  }
  
  function tabIsActive(active) {
    if ('undefined' != typeof active) {
      active_tab = active;
    }
    
    return active_tab;
  }
  
  
  
  
  function activateTab(id, ajaxBandaiForm, form) {
    $('.coldata').hide();
    $('.not-found').hide();
      //if we have emtpy menu it will be removed and message will be moved
      //to main part
      var move_to_main = false;
      if (
            $('[name=only_center]').length > 0 && $('[name=only_center]').val() == 1 ||
            $('#coldata-' + id).length > 0 || id == 0 || Drupal.settings.aol.is_course_search_ux == 1
          ) {
        if ($('.unity-ux').length ==0) {
          $('#coldata-' + id).show();
        }
        $('#edit-address-wrap').show();
        if ('undefined' != typeof form) {
          $("#geo-search-results").show();
        }
      }
      else {
        $('#edit-address-wrap').hide();
        move_to_main = true;
        $("#geo-search-results").hide();
      }
      tabIsActive(!move_to_main);
      
      $('.extra-content').hide();
      $('.extra-content-' + id).show();
      $('.ulh .active').removeClass('active');
      $('#colheader-' + id).addClass('active');
      $('.b-show-level').val(0);
      $('input[name="coldata['+ id +']"]').val(1);
      if (false == move_to_main && (
          $("#edit-center-autocomplete-google").val() 
          || $('input[name="center_autocomplete_google_lat"]').val()
          || $('input[name="center_id"]').length > 0
          || Drupal.settings.aol.is_course_search_ux == 1
          || 'undefined' != typeof Drupal.settings.pathPrefix && Drupal.settings.pathPrefix)) {
        if ('undefined' != typeof form) {
          ajaxBandaiForm(form);
        }
      }
      else {
        currentUrl = document.location.href.split("#");
        document.location.href = currentUrl[0] + "#acol=" +id;
      }
  
      $('.empty-message').hide();
      $('.views-message').hide();
  
      if ($('#empty-message-' + id).size() > 0) {
        if (move_to_main) {
          $('#empty-message-' + id).insertAfter('#edit-address-wrap');
        }
        $('#empty-message-' + id).show();
      }
      else {
        //$('#empty-message-0').show();
      }
  
      if ($('#views-message-' + id).size() > 0) {
        if (move_to_main) {
          $('#views-message-' + id).insertAfter('#edit-address-wrap');
        }
        $('#views-message-' + id).show();
      }
  
      $('.course-desc').hide();
      if ($('#description-' + id).size() > 0) {
        $('#description-' + id).show();
      }
    
  }
  
  /**
   * 
   */
  function mobileShowHideMap(mapChange, toggle) {
    if ('undefined' == typeof toggle) {
      toggle = false;
    }
    var visible;
    Drupal.settings.aol.no_map_saved = mapVisible();
    if (true == toggle) {
      visible = mapVisible(!mapVisible());
    }
    else {
      visible = mapVisible();
    }
    
    Drupal.settings.aol.no_map = visible;
    
    
    if (!isMobile()) {
      return;
    }
    if ($('.aol-tabs-tab li.active').hasClass('direction')) {
      if (true === visible) {
        $('#directions-panel, #show-map').hide();
        $('#gs-map,#hide-map').show();
        $('#tabs-content').show();
        mapChange.call($('.aol-tabs-tab li.active'));
      }
      else {
        $('#directions-panel, #show-map').show();
        $('#tabs-content').show();
        $('#gs-map,#hide-map').hide();
      }
      $('#mobile-map-toggle').insertBefore('#directions-panel');
    }
    else {
      if (true === visible) {
        $('#tabs-content, #show-map').hide();
        $('#gs-map,#hide-map').show();
        mapChange.call($('.aol-tabs-tab li.active'));
      }
      else {
        $('#tabs-content, #show-map').show();
        $('#gs-map,#hide-map').hide();
      }
      $('#mobile-map-toggle').prependTo('.aol-tabs-content');
    }
  }
  
/**
 * init address autocomplete
 *
 */
  function initializeMap(inputPath, refreshFunction, triggerElement) {
  	var text_limit = 13;
  	if($('.search_courses_filter_date_lang_form').length > 0){
  		text_limit = 22;
    }
  	if(Drupal.settings.aol.use_mapbox_autocomplete == 0){
  		//use google map autocompelete
    var country = Drupal.settings.aol.country;
      if(Drupal.settings.aol.simplified_course_search == 1 && Drupal.settings.aol.simplified_course_search_country != ''){
        var autoOptions = {
          fields: ["name", "geometry", "formatted_address", "address_components"],
        };
      }else if (country != 'global') {
    var autoOptions = {
      componentRestrictions: {country: country},
      fields: ["name", "geometry", "formatted_address", "address_components"],
    };
  } else {
    var autoOptions = {
        fields: ["name", "geometry", "formatted_address", "address_components"],
//        componentRestrictions: {country: 'us'}
    		fields: ["name", "geometry", "formatted_address", "address_components"],
    };
  }
    //limit autocomplete to specific country.
    //if (Drupal.settings.aol.country) {
    //  autoOptions.componentRestrictions = {country: Drupal.settings.aol.country};
    //}
    
    if (typeof google == 'undefined') {
      return ;
    }

    var input = $(inputPath).get(0);
    if ('undefined' != typeof input) {
    	if ($(inputPath).length > 0)
    		var autocomplete = new google.maps.places.Autocomplete(input, autoOptions);
    //autocomplete.bindTo('bounds', map);
//    if ('undefined' != typeof triggerElement && $(triggerElement).length> 0) {
//      $(triggerElement).click(function() {
//        autocomplete
//      });
//    }
    	
    	if ($(".location-finder-name").length == 1) {
        var place = autocomplete.getPlace();
        var place_name =$(inputPath).val();
        if(place_name != ''){
          place_name = place_name.split(",")[0];
          var place_name_length = place_name.length;
          if(place_name_length > text_limit){
            place_name = jQuery.trim(place_name).substring(0, text_limit)+ "...";
          }
          $('.location-finder-name').html(place_name);
          $(".location-finder").removeClass('active');
        }
      }
    //add listiner when location is changed
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      $('input[name="address_changed"]').val(0);
      input.className = '';
      var place = autocomplete.getPlace();
      if ($(".location-finder-name").length == 1) {
        var place_name = place.formatted_address;
        place_name = place_name.split(",")[0];
        var place_name_length = place_name.length;
        if(place_name_length > text_limit){
          place_name = jQuery.trim(place_name).substring(0, text_limit)+ "...";
        }
        $('.location-finder-name').html(place_name);
        $(".location-finder").removeClass('active');
      }
      
      if ('undefined' == typeof place || !place.geometry) {
        
         var firstResult = $(".pac-container .pac-item:first").text();

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({"address":firstResult }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    place = results[0];
                    $('input[name="center_autocomplete_google"]').val(results[0].address_components[0].long_name);
                    $('input[name="center_autocomplete_google2"]').val(results[0].address_components[0].long_name);
                    
                    refreshPlace(place, inputPath, refreshFunction);
                }
                else {
                  if ($('input[name="center_autocomplete_google"]').val() == '') {
                    $('input[name="center_autocomplete_google-lat"]').val('');
                    $('input[name="center_autocomplete_google-lng"]').val('');
                    $('input[name="center_autocomplete_google-obj"]').val('');
                    $('input[name="center_autocomplete_google-state"]').val('');
                    refreshFunction($(input).closest("form"));
                  } else {
                    // Inform the user that the place was not found and return.
                    input.className = 'notfound';
                    if ($("#l-notfound").length < 1) {
                      $(input).after('<div id="l-notfound">' + Drupal.t("Please select location from the list") +"</div>");
                    }
                  }
                    return;
                }
            });
        
      }
      else {
        refreshPlace(place, inputPath, refreshFunction);
      }
      
      return false;
    });
    
    return autocomplete;
    }
    return null;
    
  	}else{
  		//use mapbox autocompelete
  		var country = Drupal.settings.aol.country;
  		var geo_address_elem = document.getElementById("geo_address_autocomplete_country");
      if(typeof geo_address_elem !== null && geo_address_elem !== 'undefined' && geo_address_elem != null) {
        country = document.getElementById("geo_address_autocomplete_country").value;
      }
      /*if (typeof google == 'undefined') {
        return ;
      }*/
      var input = $(inputPath).get(0);
      if ('undefined' != typeof input) {
      	if ($(".location-finder-name").length == 1) {
          var place_name =$(inputPath).val();
          if(place_name != ''){
            place_name = place_name.split(",")[0];
            var place_name_length = place_name.length;
            if(place_name_length > text_limit){
              place_name = jQuery.trim(place_name).substring(0, text_limit)+ "...";
            }
            $('.location-finder-name').html(place_name);
            $(".location-finder").removeClass('active');
          }
        }
      	var language_code = Drupal.settings.aol.language;
      	if(language_code == ""){
      		language_code = "en";
      	}
      	if(country != 'global') {
      		var apiOptions = {
              accessToken: token,
              endpoint: 'https://api.mapbox.com/geocoding/v5/',
              language: language_code,
              width: '100%',
              zindex: '1000',
              country: country,
          }
      	}else{
      		var apiOptions = {
              accessToken: token,
              endpoint: 'https://api.mapbox.com/geocoding/v5/',
              language: language_code,
              width: '100%',
              zindex: '1000',
          }
      	}
      	var inputAddress = $(inputPath).mapboxAutocomplete(apiOptions).on('mapboxAutocomplete.found.address', function (e, object, feature) {
      	$('input[name="address_changed"]').val(0);
        input.className = '';
        $(".gl-bg-overlay").hide();
        if ($(".location-finder-name").length == 1) {
          var place_name = object.formatted_address;
          place_name = place_name.split(",")[0];
          var place_name_length = place_name.length;
          if(place_name_length > text_limit){
            place_name = jQuery.trim(place_name).substring(0, text_limit)+ "...";
          }
          $('.location-finder-name').html(place_name);
          $(".location-finder").removeClass('active');
        }
        	place ={object:object, feature: feature };
        	refreshPlace(place, inputPath, refreshFunction);
        return false;
      });
      
    	var token = Drupal.settings.aol.mapbox_token;
    	var autocomplete = inputAddress.mapboxAutocomplete('options', 'accessToken', token);
      return autocomplete;
      }
      return null;
  	}
  }
  
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  function refreshPlace(place, inputPath, refreshFunction) {
  	if(Drupal.settings.aol.use_mapbox_autocomplete == 0){
  		//use google map autocompelete
    $("#l-notfound").remove();
    var input = $(inputPath).get(0);
      var address_components = [];
      for (var i=0,len=place.address_components.length; i<len; i++) {
        address_components[i] = $.param(place.address_components[i]);
      }
      
      try {
        var northEast = place.geometry.viewport.getNorthEast(),
        southWest = place.geometry.viewport.getSouthWest(),
        distance = Math.round(getDistanceFromLatLonInKm(northEast.lat(), northEast.lng(), southWest.lat(), southWest.lng())/2);
        console.log("distance",distance);
        console.log("default_distance_search",default_distance_search);
        if(distance < default_distance_search)
        	distance = default_distance_search;
        if(Drupal.settings.aol.is_course_search_ux == 0){
        	$('#edit-center-autocomplete-distance').val(distance);
        }
      } catch (e) {
        
      }
      
      var encoded = $.toJSON( place );
      $('input[name="center_autocomplete_google_obj"]').val(encoded);
      $('input[name="center_autocomplete_google_lat"]').val(place.geometry.location.lat());
      $('input[name="center_autocomplete_google_lng"]').val(place.geometry.location.lng());

      $('input[name="center_autocomplete_google_obj2"]').val(encoded);
      $('input[name="center_autocomplete_google_lat2"]').val(place.geometry.location.lat());
      $('input[name="center_autocomplete_google_lng2"]').val(place.geometry.location.lng());
      
      $('input[name="search_course_autocomplete_google_obj"]').val(encoded);
      $('input[name="search_course_autocomplete_google_lat"]').val(place.geometry.location.lat());
      $('input[name="search_course_autocomplete_google_lng"]').val(place.geometry.location.lng());

      $('input[name="geo_address_autocomplete_google_obj"]').val(encoded);
      $('input[name="geo_address_autocomplete_google_lat"]').val(place.geometry.location.lat());
      $('input[name="geo_address_autocomplete_google_lng"]').val(place.geometry.location.lng());
      
      var country = '';
      if (place.address_components) {
        country = place.address_components[place.address_components.length-1].short_name;
      }
      
      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      //$('input[name="center_autocomplete_google').val(address);
      refreshFunction($(input).closest("form"));
      
  	}else{
  		//use mapbox autocompelete
  		$("#l-notfound").remove();
      var input = $(inputPath).get(0);
        
        try {
          distance = Math.round(getDistanceFromLatLonInKm(place.feature.bbox[3], place.feature.bbox[2], place.feature.bbox[1], place.feature.bbox[0])/2);
          console.log("distance",distance);
          console.log("default_distance_search",default_distance_search);
          if(distance < default_distance_search)
          	distance = default_distance_search;
          var temp_arr = ['country'];
          var temp_country_code = ['nl','sw'];
          if(Drupal.settings.aol.is_course_search_ux == 0 || (Drupal.settings.aol.is_course_search_ux == 1 && jQuery.inArray(place.feature.place_type[0], temp_arr) == -1 && jQuery.inArray(Drupal.settings.aol.country, temp_country_code) == -1)){
          	$('#edit-center-autocomplete-distance').val(distance);
          }else{
          	$('#edit-center-autocomplete-distance').val(default_distance_search);
          }
        } catch (e) {
          console.log(e)
        }
        var encoded = JSON.stringify( place );
        $('input[name="center_autocomplete_google_obj"]').val(encoded);
        $('input[name="center_autocomplete_google_lat"]').val(place.object.point.lat);
        $('input[name="center_autocomplete_google_lng"]').val(place.object.point.long);

        $('input[name="center_autocomplete_google_obj2"]').val(encoded);
        $('input[name="center_autocomplete_google_lat2"]').val(place.object.point.lat);
        $('input[name="center_autocomplete_google_lng2"]').val(place.object.point.long);
        
        $('input[name="search_course_autocomplete_google_obj"]').val(encoded);
        $('input[name="search_course_autocomplete_google_lat"]').val(place.object.point.lat);
        $('input[name="search_course_autocomplete_google_lng"]').val(place.object.point.long);
        $('input[name="geo_address_autocomplete_google_obj"]').val(encoded);
        $('input[name="geo_address_autocomplete_google_lat"]').val(place.object.point.lat);
        $('input[name="geo_address_autocomplete_google_lng"]').val(place.object.point.long);
        $('input[name="search_course_autocomplete_google_place_type"]').val(place.feature.place_type[0]); 
        
        var country = '';
        if(place.feature.place_type[0] == "country"){
        	country = place.feature.properties.short_code;
        }else{
        	country = place.object.country;
        }
        $('input[name="search_course_autocomplete_google_country"]').val(country);
        refreshFunction($(input).closest("form"));
  	}
  }

  function getFormParamsFromUrl(customUrl) {
      eventsOff = true;
      var wasParams = false;
      var dynamicUrl = '';
      if(typeof course_search_filter == 'undefined')
      	course_search_filter = 'ctype';
      if ('undefined' == typeof customUrl) {
        url = document.location.href;
      }
      else {
        url = customUrl;
      }

      arr = url.split('#');
     
     var cookieObj = {};
      if (arr[1]) { 
        wasParams = true;
        dynamicUrlPart = arr[1].split("&");
        var smart_ctype_check = 0;
        var universal_ctype_check = 0;
        var center_id_check = 0;
        for (var i=0;i<dynamicUrlPart.length;i++) {
          var tmp = dynamicUrlPart[i].split('=');
          if(tmp[0] == 'smart_search'){
            smart_ctype_check = 1;
          }  
          if(tmp[0] == 'isUniversalSearch'){
          	universal_ctype_check = 1;
          } 
          if(tmp[0] == 'center_id'){
          	center_id_check = 1;
          }
        }
        for (var i=0;i<dynamicUrlPart.length;i++) {
          var tmp = dynamicUrlPart[i].split('=');
          if (tmp[0] != 'paddr') {
            if (dynamicUrl) {
              dynamicUrl += '&';
            }
            dynamicUrl +=dynamicUrlPart[i];
            switch (tmp[0]) {
            case 'ctype':
              var ctype = tmp[1].split(',');
              for (var a=0;a<ctype.length;a++) {
                if (ctype[a] != '') {
                  $('[value*='+ctype[a]+']').attr('checked','checked').trigger('change');
                }
              }
							if(smart_ctype_check == 1){
							  $(".smart-form-checkbox_value").val(tmp[1]);
							}
							if(universal_ctype_check == 1){
							  $(".universal-search-form-checkbox_value").val(tmp[1]);
							}
							if(course_search_filter == 'ctype'){
	              $('.form-checkbox').each(function(){
	              	checkbox_value = $(this).val();
	              	if(tmp[1].indexOf(checkbox_value) >= 0 && $("input[value='"+checkbox_value+"']:checked").length == 0){
	              		$("input[value='"+checkbox_value+"']").attr('checked','checked').trigger('change');
	              	}
	              });
	            }
              
              break;
            case 'center_id':
            	if(center_id_check == 1){
							  $(".center_id_value").val(tmp[1]);
							}
            	break;
            case 'time':
                $(".time_filter_value").val(tmp[1]);
                cookieObj.time = tmp[1];
              break;
            case 'course_language':
                $(".lng_filter_value").val(tmp[1]);
                cookieObj.course_language = tmp[1];
              break;
            case 'lat':
              $('input[name="center_autocomplete_google_lat"]').val(tmp[1]);
              cookieObj.lat = tmp[1];
              break;
            case 'lng':
              $('input[name="center_autocomplete_google_lng"]').val(tmp[1]);
              cookieObj.lng = tmp[1];
              break;
            case 'st':
              $('input[name="center_autocomplete_google_state"]').val(tmp[1]);
              break;
            case 'c':
              $('input[name="center_autocomplete_google_country"]').val(tmp[1]);
              
              break;
            case 'cshort':
              $('input[name="center_autocomplete_google_country_short"]').val(tmp[1]);
              break;
            case 'd1':
              $('input[name="courese_date_start[date]"]').val(tmp[1]);
              break;
            case 'd2':
              $('input[name="courese_date_end[date]"]').val(tmp[1]);
              break;  
            case 'd':
            case 'distance':
              $('#edit-center-autocomplete-distance').val(tmp[1]);
              break;
            case 'local':
              $('input[name="center_autocomplete_local"]').val(tmp[1]);
              
              break;
            case 'search':
            case 'sSearch':
            	if(Drupal.settings.aol.page_type == "center" && Drupal.settings.aol.is_course_search_ux == 1 && !($(window).width() < 767)){
            		var place_name = decodeURIComponent(tmp[1]);
            		if(place_name != ''){
                  var place_name_length = place_name.length;
                  var letter_limit = 43;
                  if ($(window).width() < 1024) {
                  	letter_limit = 34;
                  }
                  if(place_name_length > letter_limit){
                    place_name = jQuery.trim(place_name).substring(0, letter_limit)+ "...";
                  }
                  $('#edit-center-autocomplete-google').val(place_name);
                }
            	}else{
            		$('#edit-center-autocomplete-google').val(decodeURIComponent(tmp[1]));
            	}
              if ($(".location-finder-name").length == 1) {
                var place_name =$("#edit-center-autocomplete-google").val();
                if(place_name != ''){
                  place_name = place_name.split(",")[0];
                  var place_name_length = place_name.length;
                  if(place_name_length > 13){
                    place_name = jQuery.trim(place_name).substring(0, 13)+ "...";
                  }
                  $('.location-finder-name').html(place_name);
                }
              }
              $('#sSearch-location').text(decodeURIComponent(tmp[1]));
              var caret = $("<i class='fa fa-caret-down'></i>");
              $('.search-box').text(decodeURIComponent(tmp[1])+ '  ').append(caret);
              cookieObj.location = tmp[1];
              break;
	    			case 'mctype':
              $('input[name="mctype"]').val(tmp[1]);
              
							if(course_search_filter == 'mctype'){
	              $('.form-checkbox').each(function(){
	              	checkbox_value = $(this).val();
	              	if(tmp[1].indexOf(checkbox_value) >= 0 && $("input[value='"+checkbox_value+"']:checked").length == 0){
	              		$("input[value='"+checkbox_value+"']").attr('checked','checked').trigger('change');
	              	}
	              });
	            }
              break;

            case 'acol':
              activateTab(tmp[1]);
              $('input[name="coldata['+ tmp[1] +']"]').val(1);
              /*
              $('.ulh .active').removeClass('active');
              $('.coldata').hide();
              $('#coldata-'+tmp[1]).show('');
              $('#coldata-'+tmp[1]).css('display', 'block');
              $('#colheader-'+tmp[1]).addClass('active');
              $('.b-show-level').val(0);
              $('input[name="coldata['+ tmp[1] +']"]').val(1);
              $('.course-desc').hide();
              $('#description-' + tmp[1]).show();*/
            }
          }
          else {
            showPopup = true;
          }
        }
        //prepare for cookie call and cakk save cookie
        cookieObj.permenent = false;
        cookieObj.country = Drupal.settings.aol.real_country;
        //console.log(cookieObj);
        save_location_time_language_cookie(cookieObj.lat,cookieObj.lng,cookieObj.location, cookieObj.permenent, cookieObj.country, cookieObj.time, cookieObj.course_language);
        $.cookie('time_filter', cookieObj.time);
        $.cookie('language_filter', cookieObj.course_language);
      }

      eventsOff = false;
      
      return wasParams;
    };

    
  function initDefaultLocation(ajaxBandaiForm, wasParams) {
    var cookie_name = 'latlngloc' + Drupal.settings.aol.real_country;
    
    var savedCookie = get_location_cookie(Drupal.settings.aol.real_country);
    if (/*Drupal.settings.aol.show_courses_on_first == false ||*/ true == wasParams) {
      var lat = $('input[name="center_autocomplete_google_lat"]').val();
      var lng = $('input[name="center_autocomplete_google_lng"]').val();
      var location = $('input[name="center_autocomplete_google"]').val();
      //save location cookie
      save_location_cookie(lat,lng,location, false, Drupal.settings.aol.real_country);
      ajaxBandaiForm($('#bandaid-center-course-locator-course-form'),true);

    }else if(savedCookie){
      
        lat = savedCookie.lat;
        var lng = savedCookie.lng;
        var location = savedCookie.location;
        var country = savedCookie.country; 
        $('input[name="center_autocomplete_google_lat"]').val(lat);
        $('input[name="center_autocomplete_google_lng"]').val(lng);
        $('#edit-center-autocomplete-google').val(location);
       
      $('input[name="from_cookie"]').val(1);
      ajaxBandaiForm($('#bandaid-center-course-locator-course-form'), true);
      $('input[name="from_cookie"]').val(0);
    } else {
      ajaxBandaiForm($('#bandaid-center-course-locator-course-form'), true);

      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          codeLatLng(lat, lng, ajaxBandaiForm);
        });
      }
    }
  }
  
  function codeLatLng(lat, lng, ajaxBandaiForm) {
    var data;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
         var country = '';
         for (var i = 0; i < results[0].address_components.length 
                          && country == ''; i++) {
           if (results[0].address_components[i].types[0] == 'country') {
             country = results[0].address_components[i].short_name;
           }               
         }
         //formatted address
         data = results[0].formatted_address;
         //save location cookie
         save_location_cookie(lat,lng,data, true, country);
         if (country == Drupal.settings.aol.real_country) {
           $('input[name="center_autocomplete_google_lat"]').val(lat);
           $('input[name="center_autocomplete_google_lng"]').val(lng);
           $('#edit-center-autocomplete-google').val(data);
         }
         ajaxBandaiForm($('#bandaid-center-course-locator-course-form'), true);

        }else {
        }
      } else {
      }
    });
  }

  function isMobile() {
    if($('#geo-search-results').hasClass('unity-2-ui') && $('#aol-search-tabs').hasClass('course')){
    return false;
    }
    var windowWidth = window.innerWidth;
    if  (windowWidth < 601) {
      return true;
    }
    else {
      return false;
    }
  }
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    return new Date(Date.UTC(year, month - 1, day));
  }

  function getCourseDateDays(start, start_date, end, requestFor, type){
  	/* check is it a recur event or many day event */
		var englishdays = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
     //var days = Drupal.t('!day-abbreviation SUN|MON|TUE|WED|THU|FRI|SAT', {'!day-abbreviation' :''}).split('|');
     if(current_lang_days !== ""){
	     var days = jQuery.parseJSON(current_lang_days);
	     days = days.current_lang_days;
	   }else{
	   	 var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
	   }
     var weekends_value = jQuery.parseJSON(get_weekends);

     var startdatecheck = formatDate(start_date);
     var enddatecheck = formatDate(end);
     if(startdatecheck.getTime() === enddatecheck.getTime()){
//       return   days[startdatecheck.getDay()];
      return   days[startdatecheck.getUTCDay()];
     }


      if (type != "manyday"){
        /**
         * get the anounced day text using type parameter and check of the days in it by iterationg in to it and store founded days dividing it into catagory
         */
         weekDays = [];
         weekendDays = [];
         //var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
         for(i=0; i<7; i++){
           if(type.toUpperCase().indexOf(days[i]) != -1){
             //if(i == 6 || i == 0){
             if(jQuery.inArray(i, weekends_value) > -1 && typeof days[i] !== "undefined"){
               //weekendDays.push(Drupal.t('!day-abbreviation '+days[i]+', {"!day-abbreviation" :""}' ));
               weekendDays.push(days[i]);
               if(!startDay){ var startDay = i;}
             }else{
               //weekDays.push(Drupal.t('!day-abbreviation '+days[i]+', {"!day-abbreviation" :""}' ));
               if(typeof days[i] !== "undefined")
               	 weekDays.push(days[i]);
               if(!startDay){ var startDay = i;}
             }
             
           }
         }
         /**
          * check the request for weekday or weekend and check is there couce announced for more than 2 days if yes return weekday or else return specific days
          */
         if(requestFor == "weekday"){    
          if(weekDays.length > 2){
            return "Weekdays";
          }
          else {
	        	if(weekDays.length > 1 && $.isArray(weekDays))
	        		weekDays = weekDays.join(', ');
            return weekDays;
          }
        }
        if(requestFor == "weekend"){
        	if(weekendDays.length > 1 && $.isArray(weekendDays))
        		weekendDays = weekendDays.join(', ');
        	return weekendDays;
        }
        if(requestFor == "startday"){ return startDay;} 
       }else{
         /**
          * in this many day event first split the days so that can be converted into date object and iterate from starting date to end date and add the day name to belonging array to display it on list
          */
        if(typeof start !== "undefined" && start != ""){
	        var combinedDates = start.split(" ");
	        if(typeof combinedDates[1] !== 'undefined'){
	          var dates = combinedDates[1].split("-");
	        }else{
	          var dates = combinedDates[0].split("-");
	        }
	        var enddate = end.split(" ");
	        
	        var startDateFormatted = dates[0]+"/"+enddate[0]+"/"+enddate[2];
	        
	        //var startDateObject = new Date(startDateFormatted);
	        var t = startDateFormatted.split(/[- :]/);
          // Apply each element to the Date function
         
          if (t.length < 5 ) {
            var startDateObject = new Date(startDateFormatted);
          } else {
            var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
              var startDateObject = new Date(d);
          }
	    	}
      }
        //var endDateObject = new Date(end);
	      t = end.split(/[- :]/);
	      // Apply each element to the Date function
	      if (t.length < 5 ) {
	        var endDateObject = new Date(end);
	      } else {
	        var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
	          var endDateObject = new Date(d);
	      }
        if(start_date !== ''){
        	//startDateObject = new Date(start_date);
        	var t = start_date.split(/[- :]/);
          // Apply each element to the Date function
         
          if (t.length < 5 ) {
            var startDateObject = new Date(start_date);
          } else {
            var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
              var startDateObject = new Date(d);
          }
        }
        var startDate = startDateObject;
        var oneDay = 24*60*60*1000;
        var diffDays = Math.round(Math.abs((startDateObject.getTime() - endDateObject.getTime())/(oneDay)));
        //var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        weekDays = [];
        weekendDays = [];
        
        if(startDate.getDay() < endDateObject.getDay()){
	        while( startDate.getDay() < endDateObject.getDay()){
	         //if(startDate.getDay() ==6 || startDate.getDay() ==0){
	         if(jQuery.inArray(startDate.getDay(), weekends_value) > -1){ 
						 if(jQuery.inArray(days[startDate.getDay()], weekendDays) == -1 && typeof days[startDate.getDay()] !== "undefined")
	           	 weekendDays.push(days[startDate.getDay()]);
	           if(!startDay){ var startDay = startDate.getDay();}
	         }else{ 
	         	 if(jQuery.inArray(days[startDate.getDay()], weekDays) == -1 && typeof days[startDate.getDay()] !== "undefined")
		         	 weekDays.push(days[startDate.getDay()]);
		         if(!startDay){ var startDay = startDate.getDay();} 
	         }
	         var newDate = startDate.setDate(startDate.getDate() + 1);
	         startDate = new Date(newDate);
	        }
				}else{
					if(!startDay){ var startDay = startDate.getDay();}
					for(i=startDate.getDay(); i<=7; i++){
	        	if(jQuery.inArray(i, weekends_value) > -1){ 
							if(jQuery.inArray(days[i], weekendDays) == -1 && typeof days[i] != 'undefined')
	           		weekendDays.push(days[i]);
	        	}else{
							if(jQuery.inArray(days[i], weekDays) == -1 && typeof days[i] != 'undefined')
	         			weekDays.push(days[i]);
	         	}
					}
					for(i=1; i<=endDateObject.getDay(); i++){
	        	if(jQuery.inArray(i, weekends_value) > -1){ 
							if(jQuery.inArray(days[i], weekendDays) == -1 && typeof days[i] != 'undefined')
	           		weekendDays.push(days[i]);
	        	}else{
							if(jQuery.inArray(days[i], weekDays) == -1 && typeof days[i] != 'undefined')
	         			weekDays.push(days[i]);
	         	}
					}
					
					if(diffDays > 0 && diffDays < 7){
						if(jQuery.inArray(0, weekends_value) > -1){
            	if(jQuery.inArray(days[0], weekendDays) == -1 && typeof days[0] != 'undefined')
              	weekendDays.push(days[0]);
          	}else{
            	if(jQuery.inArray(days[0], weekDays) == -1 && typeof days[0] != 'undefined')
              	weekDays.push(days[0]);
      			}
					}
				}
        
         //if(endDateObject.getDay() ==6 || endDateObject.getDay() ==0){
         if(jQuery.inArray(endDateObject.getDay(), weekends_value) > -1){
         	 if(jQuery.inArray(days[endDateObject.getDay()], weekendDays) == -1 && typeof days[endDateObject.getDay()] !== "undefined")
           	 weekendDays.push(days[endDateObject.getDay()]); 
         }else{
         	 if(jQuery.inArray(days[endDateObject.getDay()], weekDays) == -1 && typeof days[endDateObject.getDay()] !== "undefined")
           	weekDays.push(days[endDateObject.getDay()]); 
         }
  
        if(requestFor == "weekday"){ 
          if(weekDays.length > 2){
            return Drupal.t("Weekdays");
          }
          else {
	        	if(weekDays.length > 1 && $.isArray(weekDays))
	        		weekDays = weekDays.join(', ');
            return weekDays;
          }
        }
        if(requestFor == "weekend"){
        	if(weekendDays.length > 1 && $.isArray(weekendDays))
        		weekendDays = weekendDays.join(', ');
        	return weekendDays;
        }
        if(requestFor == "startday"){ return startDay;} 
        
  }
  
  function checkManyDay(start_date, end_date){
  	var many_day = 0;
  	if(start_date !== '' && end_date !== ''){
    	var startDateObject = new Date(start_date);
  		var endDateObject = new Date(end_date);
	    var oneDay = 24*60*60*1000;
	    var diffDays = Math.round(Math.abs((startDateObject.getTime() - endDateObject.getTime())/(oneDay)));
	    //if(diffDays > 0 && diffDays < 7){
	    if(diffDays > 0){
	    	many_day = 1;
	    }
	    return many_day;
		}
  }
  
  function getCourseDay(start_date, end_date){
  	course_date = "";
  	var eng_days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  	if(current_lang_months !== "")
  		var months = jQuery.parseJSON(current_lang_months);
    if(start_date !== '' && end_date !== ''){
    	//var startDateObject = new Date(start_date);
  //		var endDateObject = new Date(end_date);
      var t = start_date.split(/[- :]/);
      // Apply each element to the Date function
     
      if (t.length < 5 ) {
    	  var startDateObject = new Date(start_date);
      } else {
    	  var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
          var startDateObject = new Date(d);
      }
      
      
      t = end_date.split(/[- :]/);
      // Apply each element to the Date function
      if (t.length < 5 ) {
    	  var endDateObject = new Date(end_date);
      } else {
    	  var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
          var endDateObject = new Date(d);
      }
    	  
        var oneDay = 24*60*60*1000;
	    var diffDays = Math.round(Math.abs((startDateObject.getTime() - endDateObject.getTime())/(oneDay)));
	    course_date_format = Drupal.settings.aol.course_date_format;
	    course_date_format = course_date_format.trim();
	    start_date_year = $.format.date(start_date, "yyyy");
    	end_date_year = $.format.date(end_date, "yyyy");
	    if(typeof course_date_format == 'undefined')
		    course_date_format = 'j M';
	    if(diffDays === 0){
	    	course_date = $.format.date(startDateObject, course_date_format);
	    	course_date += (Drupal.settings.aol.show_year == 1) ? ", "+end_date_year : '';
	    }else{
	    	start_date_day = $.format.date(start_date, "j");
	    	end_date_day = $.format.date(end_date, "j");
	    	start_date_month = $.format.date(start_date, "M");
	    	end_date_month = $.format.date(end_date, "M");

	    	
	    	if(start_date_month == end_date_month){
	    		if(start_date_day == end_date_day){
	    			course_date = $.format.date(startDateObject, course_date_format);
	    		}else{
	    			var date_separator = (Drupal.settings.aol.date_separator == '-') ? Drupal.settings.aol.date_separator : ' '+Drupal.settings.aol.date_separator+' ';
	    			if(course_date_format == 'j M')
	    				course_date = $.format.date(start_date, "j") +date_separator+$.format.date(end_date, "j") + " " +start_date_month;
	    			else
	    				course_date = start_date_month + " " +$.format.date(start_date, "j") +date_separator+$.format.date(end_date, "j");
	    		}
	    		course_date += (Drupal.settings.aol.show_year == 1) ? ", "+end_date_year : '';
	    	}else{
	    		//course_date = $.format.date(start_date, course_date_format) +" - "+$.format.date(end_date, course_date_format);
	    		if(Drupal.settings.aol.show_year == 0){
	    			course_date = $.format.date(startDateObject, course_date_format) +" "+Drupal.settings.aol.date_separator+" "+$.format.date(endDateObject, course_date_format);
	    		}else{
	    			if(start_date_year == end_date_year){
	    				course_date = $.format.date(startDateObject, course_date_format) +" "+Drupal.settings.aol.date_separator+" "+$.format.date(endDateObject, course_date_format)+" "+end_date_year;
	    			}else{
	    				course_date = $.format.date(startDateObject, course_date_format) +" "+start_date_year+" "+Drupal.settings.aol.date_separator+" "+$.format.date(endDateObject, course_date_format)+" "+end_date_year;
	    			}
	    		}
	    	}
	    }
	    course_date = getMonthName(course_date);
	    course_date = Drupal.t(course_date);
	    if(course_date.indexOf('Every') != -1)
	    	course_date = Drupal.t('!repeats_every_interval Every !day_of_week', {'!repeats_every_interval ': '', '!day_of_week': course_date});
	  	current_language_days = Drupal.t('!day-name Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday', {'!day-name' :''}).trim().split('|');
	  	for(i=0; i<7; i++){
	    	if(course_date.indexOf(eng_days[i]) != -1){
	     		course_date = course_date.replace(eng_days[i], current_language_days[i]);
	     	}
	    }
	    if(current_lang_months !== ""){
		    $.each(months,function( index, value ){
	      	if(course_date.indexOf(index) != -1 && course_date.indexOf(value) == -1){
	        	course_date = course_date.replace(index, value);
	     		}
	      });
	  	}
  	}
  	return course_date;
	}
  
	function getRecurDates(course, show_course_date){
		var recur_date = '';
		if(course.recur_event_display != '' && typeof course.recur_event_display != 'undefined'){
			recur_value = course.recur_event_display;
			recur_value = recur_value.replace('T000000','');
			recur_value = recur_value.replace('RRULE:','');
			var recur_freq = recur_value;
			recur_value = RRule.fromString(recur_value);
			recur_dates = recur_value.all();
			
			if(show_course_date == 'show_exact_date' && recur_dates != ''){
				recur_freq = recur_freq.split(';');
				var day_check = 1;
				$.each(recur_freq, function( index, value ){
					value = value.split('=');
		  		if(value[0] == 'FREQ'){
		  			if(value[1] == "WEEKLY")
		  				day_check = 7;	  
		  			else if(value[1] == "MONTHLY")  	
		  				day_check = 30;	  
		  			else if(value[1] == "YEARLY")  
		  				day_check = 365;
		  			return false;
		  		}
		  	});
				var date = new Date(recur_dates[0]);
				var startDate = date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
				var endDate = date.setDate(date.getDate() + 7);
				date = new Date(date.setDate(date.getDate() + 7));
		    var oneDay = 24*60*60*1000;
		    var diffDays = Math.round(Math.abs((startDate - endDate)/(oneDay)));
		    if(diffDays > day_check)
		      recur_date = recur_dates[0].toString();
		 	}else{
				if(recur_dates == ''){
					start_date = new Date(course.start_date);
					recur_date = start_date.toString('MM dd');
				}else{
					recur_date = recur_dates[0].toString();
				}
			}
		}
		
		if(recur_date != ''){
			recur_date = recur_date.split(" ");
			var course_date_format = Drupal.settings.aol.course_date_format;
	    course_date_format = course_date_format.trim();
			if(course_date_format == 'j M')
				recur_date = recur_date[2]+' '+recur_date[1];
			else
				recur_date = recur_date[1]+' '+recur_date[2];
		}
		
		return recur_date;
  }
  
  function checkDayNames(course, recur_date) {
  	if(typeof recur_date != 'undefined')
  	 recur_date = false; 
  	var eng_days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  	var recur_display = '';
  	if(((show_course_date == 'info_sessions' && course.ctype != 344620) || show_course_date == 'all') && recur_date == false){
  		recur_display = getRecurDates(course, show_course_date);
  	}else if(show_course_date == 'show_exact_date' && recur_date == false){
			recur_display = getRecurDates(course, show_course_date);
  	}else{
  		if(typeof course.recur_event_display != 'undefined' && course.recur_event_display != ''){
	  		recur_display = course.recur_event_display;
		  	recur_display = recur_display.replace('T000000Z','');
                        recur_display = recur_display.replace('T000000','');
		  	if(recur_display.indexOf('FREQ') != -1){
                               //console.log(course);
			  	recur_display = RRule.fromString(recur_display.replace('RRULE:',''));
			  	recur_display = recur_display.toText();
			  	recur_display = recur_display.replace('every week on ','every ');
			  	var recur_display_index = recur_display.indexOf('until')-1;

          if(recur_display.indexOf('until') !== -1){
            recur_display = recur_display.substring(0, recur_display_index);
          }else{
            recur_display = recur_display;
          }
          var every_month = Drupal.t('every month');

			  	if(recur_display.indexOf("month") > 1){
            recur_display_split = recur_display.split(/ (.+)/);
            recur_display = Drupal.t('!repeats_every_interval !day_of_week every '+recur_display_split[1].split('on the')[0], {'!repeats_every_interval ': '', '!day_of_week': recur_display_split[1].split('on the')[1]});
            current_language_days = Drupal.t('!day-name Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday', {'!day-name' :''}).trim().split('|');
            var every= Drupal.t('every month');
              for(i=0; i<7; i++){
                if(recur_display.indexOf(eng_days[i]) != -1){
                  var dayname = current_language_days[i];
                  recur_display = recur_display.replace(eng_days[i], current_language_days[i]);
                }
              }
              if(recur_display.indexOf('every month') != -1){
                recur_display = recur_display.replace('every month', every_month);
              }
              var part = recur_display.split(dayname);
              recur_display = part.slice(0,-1).join('') + dayname + part.slice(-1);
          }else{
            recur_display = Drupal.t(recur_display);
            if(!$('body').hasClass('api-course-search')){
              recur_display_split = recur_display.split(/ (.+)/);
              recur_display = Drupal.t('!repeats_every_interval Every !day_of_week', {'!repeats_every_interval ': '', '!day_of_week': recur_display_split[1]});
              current_language_days = Drupal.t('!day-name Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday', {'!day-name' :''}).trim().split('|');
              var j = 0;
              for(i=0; i<7; i++){
                if(recur_display.indexOf(eng_days[i]) != -1){
                  recur_display = recur_display.replace(eng_days[i], current_language_days[i]);
                  j++;
                }
              }
            }
            recur_display = recur_display.charAt(0).toUpperCase() + recur_display.slice(1);
             //These changes are made for multiple days event in a week
             //eg : RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TH,FR;WKST=SU
             if(course.recur_event_display.indexOf("WEEKLY") > 1){
               if(j == 2){
                 recur_display = recur_display.replace(',',' '+Drupal.t('and')+' ');
               }

               if(j > 2){
                 var last_comma_index = recur_display.lastIndexOf(",");
                 // recur_display = recur_display.replace(',',' and ');
                 recur_display = recur_display.substring(0, last_comma_index) + ' '+Drupal.t('and')+' ' + recur_display.substring(last_comma_index + 1);
               }  

               if(j == 7){
                 recur_display = 'Every Day';
               }
             }

             if(course.recur_event_display.indexOf("DAILY") > 1){
               recur_display = Drupal.t('Every day');
             }
          }
          
			  }
		  }
	  }
  	return recur_display;
  }
  
  function getMonthName(format_date, recur_event){
  	if(typeof recur_event === 'undefined')
  		recur_event = false;
  	if(current_lang_months !== ""){
  		var months = jQuery.parseJSON(current_lang_months); 
	  	$.each(months, function( index, value ){
	  		if(format_date.indexOf(index) !== -1){
	  			format_date = format_date.replace(index, value);
	  		}
	  	});
	  }
  	
  	if(recur_event == false){
	  	var course_date_format = Drupal.settings.aol.course_date_format;
	    course_date_format = course_date_format.trim();
	  	format_date = format_date.replace(/\  /g, ' ');
	  	
  		var date_check = format_date.split(' ');
  		format_date_check = "";
  		if(date_check.length == 2){
  			if(!$.isNumeric(date_check[0]) && date_check[0].indexOf('-') == -1){
  				if(course_date_format == 'j M')
  					format_date_check = date_check[1]+' '+date_check[0];
  				else
  					format_date_check = date_check[0]+' '+date_check[1];
  			}else{
  				if(course_date_format == 'j M')
  					format_date_check = date_check[0]+' '+date_check[1];
  				else
  					format_date_check = date_check[1]+' '+date_check[0];
  			}
  		}else if(date_check.length == 5){
  			if(!$.isNumeric(date_check[0])){
  				if(course_date_format == 'j M')
  					format_date_check = date_check[1]+' '+date_check[0];
  				else
  					format_date_check = date_check[0]+' '+date_check[1];
  			}else{
  				if(course_date_format == 'j M')
  					format_date_check = date_check[0]+' '+date_check[1];
  				else
  					format_date_check = date_check[1]+' '+date_check[0];
  			}
  			
  			format_date_check = format_date_check+' - ';
  			
  			if(!$.isNumeric(date_check[3])){
  				if(course_date_format == 'j M')
  					format_date_check = format_date_check+date_check[4]+' '+date_check[3];
  				else
  					format_date_check = format_date_check+date_check[3]+' '+date_check[4];
  			}else{
  				if(course_date_format == 'j M')
  					format_date_check = format_date_check+date_check[3]+' '+date_check[4];
  				else
  					format_date_check = format_date_check+date_check[4]+' '+date_check[3];
  			}
	  	}
	  	if(format_date_check)
	  		format_date = format_date_check;
	  	
	  	/*if(course_date_format == 'j M'){
				if(!$.isNumeric(date_check[0]) && date_check[0].indexOf('-') == -1){
			  	if(format_date.indexOf(' - ') !== -1){
			  		format_date_check = format_date.split(' - ');
			  		format_date_check[0] = format_date_check[0].split(' ');
			  		format_date_check[0] = format_date_check[0][1]+' '+format_date_check[0][0];
			  		format_date_check[1] = format_date_check[1].split(' ');
			  		format_date_check[1] = format_date_check[1][1]+' '+format_date_check[1][0];
			  		format_date_check = format_date_check[0]+' - '+format_date_check[1];
			  	}else{
			  		format_date_check = format_date.split(' ');
			  		format_date_check = format_date_check[1]+' '+format_date_check[0];
			  	}
		  		format_date = format_date_check;
			  }
	  	}*/
	  }
  	if(format_date.indexOf('-') != -1 && Drupal.settings.aol.date_separator != '-'){
  		format_date = format_date.replace(" - ", '-');
  		format_date = format_date.replace("-", ' '+Drupal.settings.aol.date_separator+' ');
  	}
  	return format_date;
  }

  return {
    initializeMap: initializeMap,
    getFormParamsFromUrl: getFormParamsFromUrl,
    initDefaultLocation: initDefaultLocation,
    isMobile: isMobile,
    mapVisible: mapVisible,
    mobileShowHideMap: mobileShowHideMap,
    activateTab: activateTab,
    tabIsActive: tabIsActive,
    getCourseDateDays: getCourseDateDays,
    checkDayNames : checkDayNames,
    getMonthName : getMonthName,
    getCourseDay:getCourseDay,
    checkManyDay:checkManyDay,
  }
})(jQuery);


jQuery.fn.toggleText = function (value1, value2) {
  return this.each(function () {
      var $this = jQuery(this),
          text = $this.text();

      if (text.indexOf(value1) > -1)
          $this.text(text.replace(value1, value2));
      else
          $this.text(text.replace(value2, value1));
  });
};

function initializeDirections(activeMarker) {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var center_view = new google.maps.LatLng(activeMarker.position.lat(), activeMarker.position.lng());
  var mapOptions = {
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: center_view,
  }
  map = new google.maps.Map(document.getElementById('geosearch-directions-map'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));
  return directionsDisplay;
}

function calcRoute(activeMarker, place, directionsService, directionsDisplay, travelMode, source, destination) {
  start = ('undefined' != typeof source) ? source : new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
  end = ('undefined' != typeof destination) ? destination : new google.maps.LatLng(activeMarker.position.lat(), activeMarker.position.lng());

  if ('undefined' != typeof start) {
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode[travelMode]
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });

    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    }
  }

 function directionAuto(id, travelMode, activeMarker, place, directionsService, directionsDisplay) {
  var country = Drupal.settings.aol.country;
  if(country != 'global') {
    var autoOptions = {
      componentRestrictions: {country: country},
      fields: ["name", "geometry", "formatted_address", "address_components"],
  };
  } else {
    var autoOptions = {
        fields: ["name", "geometry", "formatted_address", "address_components"],
//        componentRestrictions: {country: 'us'}
    	fields: ["name", "geometry", "formatted_address", "address_components"],
    };
  }
  var input = jQuery(id).get(0);
  var autocomplete = new google.maps.places.Autocomplete(input, autoOptions);

  //add listiner when location is changed
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    input.className = '';
    place = autocomplete.getPlace();
    if (jQuery('form .travel-mode span.selected').size() > 0) {
      travelMode = jQuery('form .travel-mode span.selected').attr('rel');
    }
    calcRoute(activeMarker, place, directionsService, directionsDisplay, travelMode);
  });
}
function get_location_cookie(country){ 
  var cookie_name = 'latlngloc' + country.toLowerCase();
  if (jQuery.cookie(cookie_name) =='undefined' || jQuery.cookie(cookie_name) =='' || jQuery.cookie(cookie_name) == null){
  
  return 'undefined';
  }
  else{
    //console.log('cookie fetched');
    return JSON.parse(jQuery.cookie(cookie_name));
    }
}
function save_location_cookie(lat,lng,location, permanent, country){
// console.log('params : ','lat : ',lat,'lng : ',lng,'location : ',location, permanent, country);
 if(jQuery.type(lat) != 'undefined'){
 
  var savedCookie = get_location_cookie(country);
  if(typeof savedCookie != 'undefined'  && savedCookie !='' && null != savedCookie){
    var cookieLat = savedCookie.lat;
    var cookieLng = savedCookie.lng;
    var cookieLocation = savedCookie.location;
    var cookieCountry = savedCookie.country; 
  }else{
    var cookieLat = "";
    var cookieLng = "";
    var cookieLocation = "";
    var cookieCountry = ""; 
  }
  
  //compare the saved cookie data with the new data if didnt match replace cookie 
  if(cookieLat != lat || cookieLng != lng || cookieLocation != location || cookieCountry != country)
  {
  var cookie_name = 'latlngloc' + country.toLowerCase();
  var data = {lat: lat, lng: lng, location:location, country: country};
  jQuery.cookie(cookie_name, JSON.stringify(data));
  //console.log('cookie updated');
  };
  };
}

function save_location_time_language_cookie(lat,lng,location, permanent, country, time, course_language){
// console.log('params : ','lat : ',lat,'lng : ',lng,'location : ',location, permanent, country);
 if(jQuery.type(lat) != 'undefined'){
 
  var savedCookie = get_location_cookie(country);
  if(typeof savedCookie != 'undefined'  && savedCookie !='' && null != savedCookie){
    var cookieLat = savedCookie.lat;
    var cookieLng = savedCookie.lng;
    var cookieLocation = savedCookie.location;
    var cookieCountry = savedCookie.country;
    var cookieTime = savedCookie.time;
    var cookieCourseLanguage = savedCookie.course_language; 
  }else{
    var cookieLat = "";
    var cookieLng = "";
    var cookieLocation = "";
    var cookieCountry = "";
    var cookieTime = "";
    var cookieCourseLanguage = ""; 
  }
  
  //compare the saved cookie data with the new data if didnt match replace cookie 
  if(cookieLat != lat || cookieLng != lng || cookieLocation != location || cookieCountry != country || cookieTime != time || cookieCourseLanguage != course_language)
  {
  var cookie_name = 'latlngloc' + country.toLowerCase();
  var data = {lat: lat, lng: lng, location:location, country: country, time: cookieTime, course_language: cookieCourseLanguage};
  jQuery.cookie(cookie_name, JSON.stringify(data));
  //console.log('cookie updated');
  };
  };
}

(function($){
  $( document ).ready(function() {
    var search_li_count = 0; 
    var universal_sea_count = 0;
    var typingTimer;
    var stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
    var do_search = function(search_word, country, callback) {
      search_word = search_word.trim();
      $.ajax({
        url: "/api/mapbox_place_search.php",
        dataType: "json",
        type: 'GET',
        data: 'js=1&search_word='+search_word+'&country='+country+'&language='+Drupal.settings.aol.language , 
        success: callback, 
      });
    
    };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function removeDiacritics(input_data)
    {
    	if('undefined' == typeof input_data || input_data == null || input_data == false){
    		return '';
    	}
    	input_data = input_data.trim();
    	input_data_arr = input_data.split(" ");
    	input_output_arr = [];
    	input_data_arr.forEach((item, index) =>{
    		var input = item;
        var output = "";

        var normalized = input.normalize("NFD");
        var i=0;
        var j=0;

        while (i<input.length)
        {
            output += normalized[j];

            j += (input[i] == normalized[j]) ? 1 : 2;
            i++;
        }
        input_output_arr.push(output);
    	} );
    	return input_output_arr.join(" ");
    }
    
    function refresh_search(search_word, display_defalut) {
      var country = Drupal.settings.aol.country;
      var prefix = Drupal.settings.aol.prefix;
      var cntry_name = Drupal.settings.aol.country_name;
      var default_course_distance = Drupal.settings.aol.default_course_distance;
      var search_word_typo = '';
      do_search(search_word, country, function( response ) {
        var html_str ='';
        var features = response.features;
        var course_counts = smartsearchdata.course_counts;  
        var location_not_found_text = Drupal.t('No result found');
        if(display_defalut == 1){
          var course_counts = smartsearchdata.defalut_course_counts;  
          location_not_found_text = Drupal.t('Type your location and select to see all programs in your location');
        }
        var center_not_found_text = Drupal.t('No result found');
        if(display_defalut == 1){
          var course_counts = smartsearchdata.defalut_course_counts;  
          center_not_found_text = Drupal.t('Type your location and select to see all centers near your location');
        }
        var typo_result = smartsearchdata.typo_result;
        var search_word_low = search_word.toLowerCase();
        
        $.each( typo_result , function( key, value ){
          if(key.indexOf(search_word_low) != -1){
            search_word_typo = value;
            return false;
          }
        });
        
        
          var course_display_count = 0;
          search_li_count = 0;
          var parent_id_arr = [];
          var html_str_temp = ''
          for (var i = 0; i < course_counts.length; ++i) {
            var search_title = course_counts[i].title;
            var diacritics_search_title = removeDiacritics(search_title)
          	if('undefined' != typeof search_title && search_title != null && search_title != false && (search_title.toLowerCase().indexOf(search_word.toLowerCase()) !== -1  || diacritics_search_title.toLowerCase().indexOf(search_word.toLowerCase()) !== -1 ||  ( search_word_typo.length > 0 &&  ((search_title.toLowerCase().indexOf(search_word_typo.toLowerCase()) !== -1) || diacritics_search_title.toLowerCase().indexOf(search_word_typo.toLowerCase()) !== -1 )) )&& ($.inArray(course_counts[i].parent_id,parent_id_arr) < 0)){
            //if(course_counts[i].title.toLowerCase().indexOf(search_word.toLowerCase()) !== -1 ){
              parent_id_arr.push(course_counts[i].parent_id);
              search_li_count = search_li_count+1;
              var title = course_counts[i].display_title;
              var count = course_counts[i].count;
              var country_name = course_counts[i].country_name;
              var li_active ='';
              if(search_li_count == 1){
                li_active =' active';
              }
              
              title = title.replace(search_word,'<span class="matched">'+search_word+'</span>');
              var sub_title = '<span class ="sub_title">(' + Drupal.t('@count upcoming courses in @country', {'@count': count, '@country': country_name}) +')</span>';
              html_str_temp  += '<li class ="search_autocomplete_course_li smart_search_li '+li_active+' smrt_sea_count_'+search_li_count+'" smrt_sea_count="'+search_li_count+'">';
              html_str_temp += '<a href="'+course_counts[i].link+'" ><span>'+title+'<span></br>'+sub_title+'</a>'
              html_str_temp += '</li>';
                course_display_count++;
            }
            if(course_display_count == 3){
              break;
            }  
          }
          /*if(course_display_count == 0){
            html_str += '<li class = "not_found">'+Drupal.t('No result found')+'</li>';
          }*/
          if(course_display_count == 0){
          	var is_break = 0;
          	var smart_search_word_arr = search_word.split(" ");
          	var smart_search_word_arr = smart_search_word_arr.filter((v, i, a) => a.indexOf(v) === i); 
          	var res = [] ;
            for(i=0;i<smart_search_word_arr.length;i++) {
              word_clean = smart_search_word_arr[i].split(".").join("")
              if(!stopwords.includes(word_clean)) {
                  res.push(word_clean)
              }
            }
            smart_search_word_arr = res;
            for (var j = 0; j < smart_search_word_arr.length; ++j) {
          		for (var i = 0; i < course_counts.length; ++i) {
          			var search_title = course_counts[i].title;
                var diacritics_search_title = removeDiacritics(search_title)
          			if('undefined' != typeof search_title && typeof search_title != null && search_title != false && (search_title.toLowerCase().indexOf(smart_search_word_arr[j].toLowerCase()) !== -1 || diacritics_search_title.toLowerCase().indexOf(smart_search_word_arr[j].toLowerCase()) !== -1 ) && ($.inArray(course_counts[i].parent_id,parent_id_arr) < 0)){
          				parent_id_arr.push(course_counts[i].parent_id);
                  search_li_count = search_li_count+1;
                  var title = course_counts[i].display_title;
                  var count = course_counts[i].count;
                  var country_name = course_counts[i].country_name;
                  var li_active ='';
                  if(search_li_count == 1){
                    li_active =' active';
                  }
                  
                  title = title.replace(search_word,'<span class="matched">'+smart_search_word_arr[j]+'</span>');
                  var sub_title = '<span class ="sub_title">(' + Drupal.t('@count upcoming courses in @country', {'@count': count, '@country': country_name}) +')</span>';
                  html_str_temp  += '<li class ="search_autocomplete_course_li smart_search_li '+li_active+' smrt_sea_count_'+search_li_count+'" smrt_sea_count="'+search_li_count+'">';
                  html_str_temp += '<a href="'+course_counts[i].link+'" ><span>'+title+'<span></br>'+sub_title+'</a>'
                  html_str_temp += '</li>';
                    course_display_count++;
          			}
          			if(course_display_count == 3){
          				is_break = 1;
          				break;
                }
          		}
          		if(is_break == 1){
        				break;
              }
            }
          }
          if(course_display_count > 0){
          	html_str += '<div class="search_autocomplete_course">';
	            html_str += '<h4 class="search_auto_course_title">'+Drupal.t('Search by program name')+'</h4>';
	            	html_str += '<ul>';
	            	html_str += html_str_temp;
	            	html_str += '</ul>';
	              html_str +='</div>'
          }
          if(display_defalut == 0){
          if(typeof features != 'undefined' && features.length > 0 ){
          	html_str += '<div class="search_autocomplete_place">';
            html_str += '<h4 class="search_auto_place_title">'+Drupal.t('See all programs located near')+'</h4>';
            html_str += '<ul>';
          	var display_place_count = 0 ;
            for (var i = 0; i < features.length; ++i) {
              var li_active ='';
              search_li_count = search_li_count+1;
              if(search_li_count == 1){
                li_active =' active';
              }
              display_place_count++; 
             var description = features[i].place_name;
             var main_text = features[i].text;
             var place_name  = features[i].place_name;
             main_text = main_text.replace(capitalizeFirstLetter(search_word),'<span class="pac-matched">'+capitalizeFirstLetter(search_word)+'</span>');
             var secondary_text = place_name.replace(main_text+', ','');
             var lat = features[i].geometry.coordinates[1];
             var lng = features[i].geometry.coordinates[0];
             var distance = Drupal.settings.aol.default_course_distance;
             var path = 'search/course';
             var url = "#distance="+distance+"&sSearch="+description+"&st=&lat="+lat+"&lng="+lng+"&ctype=&acol=0&c=&cc=&d1=&d2=&avinash=avinash";
             var pathRedirect =  "/" + Drupal.settings.pathPrefix + path +url;
             
             html_str += '<li class ="search_autocomplete_place_li smart_search_li '+li_active+' smrt_sea_count_'+search_li_count+'" address="'+description+'"  smrt_sea_count="'+search_li_count+'">';
               html_str += '<a class="search_autocomplete_place_a" href="'+pathRedirect+'">'
                 html_str +='<span class="pac-icon pac-icon-marker"></span>';
                 html_str +='<span class="pac-main-text">'+main_text+', </span>';
                 html_str +='<span class="pac-secondary-text">'+secondary_text+'</span>';
               html_str += '</a>'
             html_str += '</li>';
             if(display_place_count == 3){
               break;
             }
            }
            html_str += '</ul>';
            html_str +='</div>';
          }
          }else{
          	html_str += '<div class="search_autocomplete_place">';
            html_str += '<h4 class="search_auto_place_title">'+Drupal.t('See all programs located near')+'</h4>';
            html_str += '<ul>';
            html_str += '<li class = "not_found">'+Drupal.t(location_not_found_text)+'</li>';
            html_str += '</ul>';
            html_str +='</div>';
          }
          
        var center_display_count = 0;
        if(Drupal.settings.aol.hide_centers_frm_smart_sea == 0){
	        var centers_arr =  smartsearchdata.centers_arr;
	        var html_str_center ='';
		        if(display_defalut == 0){
		        	for (var i = 0; i < centers_arr.length; ++i) {
		        		if((centers_arr[i].title.toLowerCase().indexOf(search_word.toLowerCase()) !== -1 )){
		        			search_li_count = search_li_count +1;
		              var title = centers_arr[i].title;
		              var cli_active ='';
		              if(search_li_count == 1){
		                cli_active =' active';
		              }
		              
		              title = title.replace(search_word,'<span class="matched">'+search_word+'</span>')+" "+Drupal.t('Center');
		              var sub_title = '<span class ="pac-secondary-text">'+centers_arr[i].address+'</span>';
		              html_str_center  += '<li class ="search_autocomplete_center_li smart_search_li '+cli_active+' smrt_sea_count_'+search_li_count+'" smrt_sea_count="'+search_li_count+'">';
		              html_str_center += '<a href="'+centers_arr[i].url+'" ><span class="pac-icon pac-icon-marker"></span><span class="pac-main-text">'+title+'</span></br>'+sub_title+'</a>'
		              html_str_center += '</li>';
		                center_display_count++;
		            }
		            if(center_display_count == 3){
		              break;
		            }  
		          }
		          if(center_display_count > 0){
		          	html_str += '<div class="search_autocomplete_center">';
			        	html_str += '<h4 class="search_auto_place_title">'+Drupal.t('Explore Centers')+'</h4>';
			      		html_str += '<ul>';
		            html_str += html_str_center;
		            html_str += '</ul>';
		  		      html_str +='</div>';
		          }
		        }else{
		        	html_str += '<div class="search_autocomplete_center">';
		        	html_str += '<h4 class="search_auto_place_title">'+Drupal.t('Explore Centers')+'</h4>';
		      		html_str += '<ul>';
		          html_str += '<li class = "not_found">'+Drupal.t(center_not_found_text)+'</li>';
		          html_str += '</ul>';
				      html_str +='</div>';
		        }
		        
	      }
        if(typeof features != 'undefined' && features.length == 0 && course_display_count == 0 && center_display_count == 0){
        	if(Drupal.settings.aol.country_name != 'Global'){
        		html_str = '<div class = "place_course_not_found" >'+Drupal.t('No result found. <a href="@link">Click here</a> to see all the programs', {'@link': '/'+prefix+'/search/course#distance='+default_course_distance+'&sSearch='+cntry_name+'&st=&lat=&lng=&ctype=&acol=0&c=&cc=&d1=&d2='})+'</div>';
        	}else{
        		html_str = '<div class = "place_course_not_found" >'+Drupal.t('No result found. <a href="@link">Click here</a> to see all the programs', {'@link': '/search/course#distance='+default_course_distance+''+'&st=&lat=&lng=&ctype=&acol=0&c=&cc=&d1=&d2='})+'</div>';
        	}
        	}
        
        $('.autocomplete_place_course').html(html_str);
        $(".autocomplete_place_course").show();
      });
    }
    
    $(document).on('keypress', '#edit-center-autocomplete-place-course', function(e){
      if (e.which === 32 && !this.value.length){
          e.preventDefault();
          return false;
      }
    });
    
    $(document).on('keyup', '#edit-center-autocomplete-place-course', function(e){
      e.preventDefault();
      var search_word =  $(this).val();
      search_word = search_word.trim();
      if (e.keyCode == 40) {
        //keyup
        var smrt_sea_count = $('.autocomplete_place_course').find('.smart_search_li.active').attr('smrt_sea_count');
        smrt_sea_count = parseInt(smrt_sea_count) +1;
        if(search_li_count < smrt_sea_count){
          smrt_sea_count = 1;
        }
        $('.autocomplete_place_course').find('.smart_search_li.active').removeClass('active');
        $('.autocomplete_place_course').find('.smrt_sea_count_'+smrt_sea_count).addClass('active');
      }else if(e.keyCode == 38){
        //keydown
        var smrt_sea_count = $('.autocomplete_place_course').find('.smart_search_li.active').attr('smrt_sea_count');
        smrt_sea_count = parseInt(smrt_sea_count) -1;
        if(smrt_sea_count < 1){
          smrt_sea_count = search_li_count;
        }
        $('.autocomplete_place_course').find('.smart_search_li.active').removeClass('active');
        $('.autocomplete_place_course').find('.smrt_sea_count_'+smrt_sea_count).addClass('active');
        var SearchInput = $('#edit-center-autocomplete-place-course');
        var strLength= SearchInput.val().length;
        SearchInput.focus();
        SearchInput[0].setSelectionRange(strLength, strLength);
      }else if(e.keyCode == 13){
        if($('.autocomplete_place_course').find('.smart_search_li.active').hasClass('search_autocomplete_place_li')){   
          $(document).find('.autocomplete_place_course').find('.smart_search_li.active').trigger( "click" );
        }else if($('.autocomplete_place_course').find('.smart_search_li.active').hasClass('search_autocomplete_center_li')){ 
          $(document).find('.autocomplete_place_course').find('.smart_search_li.active').trigger( "click" );
        }else{
          e.stopPropagation();
          var path = 'search/course';
          var current_url = window.location.href;
          var href = $('.autocomplete_place_course').find('.smart_search_li.active').find('a').attr('href');
          window.location.href = href; 
          if(current_url.toLowerCase().indexOf(path) !== -1){
            window.location.reload();
          }
        }
      }
      else{
      	clearTimeout(typingTimer);
      	typingTimer = setTimeout(function(){ 
      		search_word =  $('#edit-center-autocomplete-place-course').val().trim();
      		if (search_word.length  < 1) {
            refresh_search(search_word, 1);
          } else {  
            refresh_search(search_word, 0);
          }
        },300);
      }
    });
    $(document).on('keydown', '#edit-center-autocomplete-place-course', function(e){
    	clearTimeout(typingTimer);
    });
    $(document).on('focus', '#edit-center-autocomplete-place-course', function(e){
      var search_word =  $(this).val();
      search_word = search_word.trim();
      if (search_word.length  < 1) {
        refresh_search(search_word, 1);
      } else {  
        $(".autocomplete_place_course").show();
      }
    });
    $("body").click( function(e) {
      var tester = e.target;
      if($(tester).attr('id') != 'edit-center-autocomplete-place-course' && $(tester).attr('id') != 'mobile-search-course-finder'){
        $(".autocomplete_place_course").hide();
      }
      if($(tester).attr('id') != 'edit-universal-search-place-course' && !($(window).width() < 767)){
        $(".universal_search_container").hide();
      }
    });
    /*$(document).on('click', '.search_autocomplete_course_li', function(){
      path = 'search/course';
      var graduate_path = 'search/graduate';
      var current_url = window.location.href;
      if(current_url.toLowerCase().indexOf(path) !== -1 || current_url.toLowerCase().indexOf(graduate_path) !== -1){
        window.location.reload();
      }
    });*/
    $(document).on('click', '.search_autocomplete_place_li, .search_autocomplete_course_li', function(){
    	var path = $(this).find('a').attr('href');
    	window.open(path,"_self");
    	var search_path = 'search/course';
      var graduate_path = 'search/graduate';
      var current_url = window.location.href;
      if(current_url.toLowerCase().indexOf(search_path) !== -1 || current_url.toLowerCase().indexOf(graduate_path) !== -1){
        window.location.reload();
      }
    });
    $(document).on('click', '.search_autocomplete_center_li', function(){
    	var path = $(this).find('a').attr('href');
    	window.open(path,"_self");
      var current_url = window.location.href;
    });
    
    $(document).on('click', '.place_course_not_found a', function(){
    	var path = $(this).attr('href');
    	window.open(path,"_self");
    	var search_path = 'search/course';
      var graduate_path = 'search/graduate';
      var current_url = window.location.href;
      if(current_url.toLowerCase().indexOf(search_path) !== -1 || current_url.toLowerCase().indexOf(graduate_path) !== -1){
        window.location.reload();
      }
    });
    
    // universal search code started
    function universal_default_search() {
    	var universal_search_word = '';
    	var course_counts = universalsearchdata.defalut_course_counts; 
    	var html_str ='';
    	var html_str_temp ='';
    	var course_display_count = 0;
    	search_li_count = 0;
      var parent_id_arr = [];
    	
    	for (var i = 0; i < course_counts.length; ++i) {
    		if($.inArray(course_counts[i].parent_id,parent_id_arr) < 0){
          parent_id_arr.push(course_counts[i].parent_id);
	    		search_li_count = search_li_count+1;
	        var title = course_counts[i].display_title;
	        var count = course_counts[i].count;
	        var country_name = course_counts[i].country_name;
	        var li_active ='';
	        if(search_li_count == 1){
	          li_active =' active';
	        }
	        
	        title = title.replace(universal_search_word,'<span class="matched">'+universal_search_word+'</span>');
	        html_str_temp  += '<li class ="search_autocomplete_course_li universal_search_li '+li_active+' universal_sea_count_'+search_li_count+'" universal_sea_count="'+search_li_count+'">';
	        html_str_temp += '<a href="'+course_counts[i].link+'" ><span>'+title+'<span></a>'
	        html_str_temp += '</li>';
	        course_display_count++;
	        
	        if(course_display_count == 3){
	          break;
	        }  
    		}
      }
    	if(course_display_count > 0){
	    	html_str += '<div class="search_results_mobile_default">';
	    		html_str += '<ul>';
	    			html_str += html_str_temp;
	    			html_str += '</ul>';
	    			html_str += '<div class= "find_courses" >';
	    				html_str += '<div class= "divider" ></div>';
	    				var search_path = "/" + Drupal.settings.pathPrefix+'search/course';
	    				html_str += '<a href="'+search_path+'">'+Drupal.t('Find all programs')+'</a>'
	    			html_str += '</div>'
	    	html_str +='</div>';
	    	$(".universal_search_result").html(html_str);
    	}
    }
    function universal_refresh_search(universal_search_word) {
    	var country = Drupal.settings.aol.country;
      var prefix = Drupal.settings.aol.prefix;
      var cntry_name = Drupal.settings.aol.country_name;
      var default_course_distance = Drupal.settings.aol.default_course_distance;
      var search_word_typo = '';
      do_search(universal_search_word, country, function( response ) {
      	if (($(window).width() < 767)) {
	      	if($("#universal-search-mobile-input").val().trim() != universal_search_word){
	      		return;
	      	}
      	}else{
      		if($("#edit-universal-search-place-course").val().trim() != universal_search_word){
	      		return;
	      	}
      	}
        var html_str ='';
        var features = response.features;
        var course_counts = universalsearchdata.course_counts; 
        
        var typo_result = universalsearchdata.typo_result;
        var search_word_low = universal_search_word.toLowerCase();
        console.log("universalsearchdata",universalsearchdata);
        console.log("typo_result",typo_result);
        $.each( typo_result , function( key, value ){
          if(key.indexOf(search_word_low) != -1){
            search_word_typo = value;
            return false;
          }
        });
        
        html_str += '<div class="search_results_wrapper">';
        universal_sea_count = 1;
        	
        	var course_display_count = 0;
          search_li_count = 0;
          var parent_id_arr = [];
          var html_str_temp = ''
          for (var i = 0; i < course_counts.length; ++i) {
          	var search_title = course_counts[i].title;
            var diacritics_search_title = removeDiacritics(search_title)
          	if('undefined' != typeof search_title && search_title != null && search_title != false && (search_title.toLowerCase().indexOf(universal_search_word.toLowerCase()) !== -1 || diacritics_search_title.toLowerCase().indexOf(universal_search_word.toLowerCase()) !== -1  || ( search_word_typo.length > 0 &&  (search_title.toLowerCase().indexOf(search_word_typo.toLowerCase()) !== -1 || diacritics_search_title.toLowerCase().indexOf(search_word_typo.toLowerCase()) !== -1)) )&& ($.inArray(course_counts[i].parent_id,parent_id_arr) < 0)){
              parent_id_arr.push(course_counts[i].parent_id);
              universal_sea_count = universal_sea_count+1;
              var title = course_counts[i].display_title;
              var count = course_counts[i].count;
              var country_name = course_counts[i].country_name;
              var link = course_counts[i].link+"&universal_search="+universal_search_word;
              title = title.replace(universal_search_word,'<span class="matched">'+universal_search_word+'</span>');
              var sub_title = '<span class ="sub_title">(' + Drupal.t('@count upcoming courses in @country', {'@count': count, '@country': country_name}) +')</span>';
              html_str_temp  += '<li class ="search_autocomplete_course_li universal_sea_count  universal_sea_count_'+universal_sea_count+'" universal_sea_count="'+universal_sea_count+'" universal_sea_type ="course_results" >';
              html_str_temp += '<a href="'+link+'" ><span><span class ="program_name" >'+title+'</span>'+sub_title+'';
              html_str_temp += '</span></a>';
              html_str_temp += '</li>';
                course_display_count++;
            }
            if(course_display_count == 3){
              break;
            }  
          }
          
          
          if(course_display_count == 0){
          	var is_break = 0;
          	var universal_search_word_arr = universal_search_word.split(" ");
          	var universal_search_word_arr = universal_search_word_arr.filter((v, i, a) => a.indexOf(v) === i); 
            
            var res = [] ;
            for(i=0;i<universal_search_word_arr.length;i++) {
              word_clean = universal_search_word_arr[i].split(".").join("")
              if(!stopwords.includes(word_clean)) {
                  res.push(word_clean)
              }
            }
            universal_search_word_arr = res;
          	for (var j = 0; j < universal_search_word_arr.length; ++j) {
          		for (var i = 0; i < course_counts.length; ++i) {
          			var search_title = course_counts[i].title;
                var diacritics_search_title = removeDiacritics(search_title)
          			if('undefined' != typeof search_title && typeof search_title != null && search_title != false && (search_title.toLowerCase().indexOf(universal_search_word_arr[j].toLowerCase()) !== -1  || diacritics_search_title.toLowerCase().indexOf(universal_search_word_arr[j].toLowerCase()) !== -1 ) && ($.inArray(course_counts[i].parent_id,parent_id_arr) < 0)){
          				parent_id_arr.push(course_counts[i].parent_id);
                  universal_sea_count = universal_sea_count+1;
                  var title = course_counts[i].display_title;
                  var count = course_counts[i].count;
                  var country_name = course_counts[i].country_name;
                  var link = course_counts[i].link+"&universal_search="+universal_search_word;
                  title = title.replace(universal_search_word_arr[j],'<span class="matched">'+universal_search_word_arr[j]+'</span>');
                  var sub_title = '<span class ="sub_title">(' + Drupal.t('@count upcoming courses in @country', {'@count': count, '@country': country_name}) +')</span>';
                  html_str_temp  += '<li class ="search_autocomplete_course_li universal_sea_count  universal_sea_count_'+universal_sea_count+'" universal_sea_count="'+universal_sea_count+'" universal_sea_type ="course_results" >';
                  html_str_temp += '<a href="'+link+'" ><span><span class ="program_name" >'+title+'</span>'+sub_title+'';
                  html_str_temp += '</span></a>';
                  html_str_temp += '</li>';
                 course_display_count++;
          			}
          			if(course_display_count == 3){
          				is_break = 1;
          				break;
                }
          		}
          		if(is_break == 1){
        				break;
              }
          	}
          }
          var all_result_cls = '';
          /*if(course_display_count > 0){
          	var all_result_cls = '';
          }else{
          	var all_result_cls = 'hidden';
          }*/
          html_str += '<div class="all_results_info '+all_result_cls+' uni_sea_active universal_sea_count universal_sea_count_'+universal_sea_count+'" universal_sea_type ="all_results" universal_sea_count="'+universal_sea_count+'" >';
          	html_str += '<span class ="icon" ></span>';
          	html_str += '<a href="'+Drupal.settings.aol.all_result_url+'?search='+universal_search_word+'" class="all_results_title">'+Drupal.t('See all results for ')+'<span class ="all_results_input">'+universal_search_word+'</span>';
	    			html_str +='</a>';
	    		html_str +='</div>';
          if(course_display_count > 0){
        	
          	html_str += '<div class="course_search_result_wrap">';
          		html_str += '<span class ="icon" ></span>';
          		html_str += '<div class="course_search_results_subtitle">';
          			html_str += '<h5 class="subtitle">'+ Drupal.t('Upcoming programs on')+'</h5>';
          			html_str += '<i class="arrow_btn"></i>';
          		html_str += '</div>';
          		html_str += '<div class="program-result">';
          			html_str += '<h6 class="program_input">'+universal_search_word+'</h6>';
          			html_str += '<div class="program_view">';
	            		html_str += '<ul>';
	            		html_str += html_str_temp;
	            		html_str += '</ul>';
	            	html_str +='</div>';
	            html_str +='</div>';
	          html_str +='</div>';
          }
          
          if(typeof features != 'undefined' && features.length > 0 ){
          	html_str += '<div class="search_autocomplete_place_wrap">';
          		html_str += '<span class ="icon" ></span>';
          		html_str += '<div class="search_autocomplete_place_subtitle">';
          			html_str += '<h5 class="subtitle">'+ Drupal.t('Programs happening near')+'</h5>';
          			html_str += '<i class="arrow_btn"></i>';
          		html_str += '</div>';
          		html_str += '<div class="search_autocomplete_result">';
        				html_str += '<h6 class="search_autocomplete_input">'+universal_search_word+'</h6>';
        					html_str += '<div class="search_autocomplete_view">';
				            html_str += '<ul>';
				          	var display_place_count = 0 ;
				            for (var i = 0; i < features.length; ++i) {
				            	universal_sea_count = universal_sea_count+1;
				              
				              display_place_count++; 
				             var description = features[i].place_name;
				             var main_text = features[i].text;
				             var place_name  = features[i].place_name;
				             main_text = main_text.replace(capitalizeFirstLetter(universal_search_word),'<span class="pac-matched">'+capitalizeFirstLetter(universal_search_word)+'</span>');
				             var secondary_text = place_name.replace(main_text+', ','');
				             var lat = features[i].geometry.coordinates[1];
				             var lng = features[i].geometry.coordinates[0];
				             var distance = Drupal.settings.aol.default_course_distance;
				             var path = 'search/course';
				             var url = "#distance="+distance+"&sSearch="+description+"&st=&lat="+lat+"&lng="+lng+"&ctype=&acol=0&c=&cc=&d1=&d2=&avinash=avinash";
				             var pathRedirect =  "/" + Drupal.settings.pathPrefix + path +url+"universal_search="+universal_search_word;
				             
				             html_str += '<li class ="search_autocomplete_place_li universal_sea_count universal_sea_count_'+universal_sea_count+'"  address="'+description+'"  universal_sea_count="'+universal_sea_count+'" universal_sea_type ="place_results" >';
				               html_str += '<a class="search_autocomplete_place_a" href="'+pathRedirect+'">'
				                 html_str +='<span class="pac-icon pac-icon-marker"></span>';
				                 html_str +='<span class="pac-main-text">'+main_text+', </span>';
				                 html_str +='<span class="pac-secondary-text">'+secondary_text+'</span>';
				               html_str += '</a>'
				             html_str += '</li>';
				             if(display_place_count == 3){
				               break;
				             }
				            }
				            html_str += '</ul>';
				        html_str +='</div>';
				      html_str +='</div>';
            html_str +='</div>';
          }
          
          universal_sea_count++;
        	html_str += '<div class="articles_on_info universal_sea_count universal_sea_count_'+universal_sea_count+'" universal_sea_type ="articles_on" universal_sea_count="'+universal_sea_count+'">';
        		html_str += '<span class ="icon" ></span>';
        		html_str += '<a href="'+Drupal.settings.aol.article_result_url+'?search='+universal_search_word+'" class="articles_on_title">'+Drupal.t('Articles on')+'<span class ="articles_on_input">'+universal_search_word+'</span>';
      			html_str +='</a>';
      		html_str +='</div>';
      		
      		universal_sea_count++;
      		html_str += '<div class="find_center_info universal_sea_count universal_sea_count_'+universal_sea_count+'" universal_sea_type ="find_center" universal_sea_count="'+universal_sea_count+'">';
    				html_str += '<a href="/'+Drupal.settings.pathPrefix+'search/center#distance=25&sSearch=&st=&lat=&lng=&ctype=&acol=0&c=&cc=&d1=&d2=&universal_search='+universal_search_word+'" class="find_center_title">'+Drupal.t('Find a center');
    				html_str +='</a>';
    			html_str +='</div>';
        	
        html_str +='</div>';
        $(".universal_search_result").html(html_str);
        $(".universal_search_container").show();
      });
    }
    function keyUpDownChange(key_event){
    	var universal_list_count = $('.universal_search_result').find('.universal_sea_count.uni_sea_active').attr('universal_sea_count');
    	if(key_event == "keydown"){
	    	universal_list_count = parseInt(universal_list_count) -1;
	      if(universal_list_count < 1){
	      	universal_list_count = universal_sea_count;
	      }
    	}else{
    		universal_list_count = parseInt(universal_list_count) +1;
        if(universal_sea_count < universal_list_count){
        	universal_list_count = 1;
        }
    	}
      $('.universal_search_result').find('.universal_sea_count.uni_sea_active').removeClass('uni_sea_active');
      $('.universal_search_result').find('.universal_sea_count_'+universal_list_count).addClass('uni_sea_active');
      var universal_sea_type = $('.universal_search_result').find('.universal_sea_count_'+universal_list_count).attr("universal_sea_type");
      if(universal_sea_type == "course_results"){
      	$('.universal_search_result').find(".program_view").show();
      	$('.universal_search_result').find(".search_autocomplete_view").hide();
      	$('.universal_search_result').find(".course_search_result_wrap").addClass("active");
      	$('.universal_search_result').find(".search_autocomplete_place_wrap").removeClass("active");
      }else if(universal_sea_type == "place_results"){
      	$('.universal_search_result').find(".program_view").hide();
      	$('.universal_search_result').find(".search_autocomplete_view").show();
      	$('.universal_search_result').find(".course_search_result_wrap").removeClass("active");
      	$('.universal_search_result').find(".search_autocomplete_place_wrap").addClass("active");
      }else{
      	$('.universal_search_result').find(".program_view").hide();
      	$('.universal_search_result').find(".search_autocomplete_view").hide();
      	$('.universal_search_result').find(".course_search_result_wrap").removeClass("active");
      	$('.universal_search_result').find(".search_autocomplete_place_wrap").removeClass("active");
      }
      if(key_event == "keydown"){
	      var SearchInput = $('#edit-universal-search-place-course');
	      var strLength= SearchInput.val().length;
	      SearchInput.focus();
	      SearchInput[0].setSelectionRange(strLength, strLength);
      }
    }
    $(document).on('focus', '#edit-universal-search-place-course', function(e){
      var universal_search_word =  $(this).val();
      universal_search_word = universal_search_word.trim();
      if (universal_search_word.length  < 1) {
      	$(".universal_search_container").hide();
      } else {  
        $(".universal_search_container").show();
      }
    });
    
    $(document).on('keypress', '#edit-universal-search-place-course', function(e){
      if (e.which === 32 && !this.value.length){
          e.preventDefault();
          return false;
      }
    });
    $(document).on('keyup', '#edit-universal-search-place-course', function(e){
      e.preventDefault();
      var universal_search_word =  $(this).val();
      universal_search_word = universal_search_word.trim();
      if (e.keyCode == 40) {
        //keyup
      	keyUpDownChange("keyup");
        
      }else if(e.keyCode == 38){
        //keydown
      	keyUpDownChange("keydown");
      }else if(e.keyCode == 13){
      	var universal_sea_type = $('.universal_search_result').find('.universal_sea_count.uni_sea_active').attr("universal_sea_type");
      	if(universal_sea_type == "all_results" || universal_sea_type == "articles_on" || universal_sea_type == "find_center"){
      		console.log($(document).find('.universal_search_result').find('.universal_sea_count.uni_sea_active').html());
      		$(document).find('.universal_search_result').find('.universal_sea_count.uni_sea_active a')[0].click();
      	}else if(universal_sea_type == "course_results" || universal_sea_type == "place_results"){
      		$(document).find('.universal_search_result').find('.universal_sea_count.uni_sea_active').trigger( "click" );
      	}
      }
      else{
        if (universal_search_word.length  > 0) {
        	clearTimeout(typingTimer);
          typingTimer = setTimeout(function(){ 
          	universal_refresh_search(universal_search_word, 0);
          	},300);
        } else {  
        	$(".universal_search_container").hide();
        }
      }
    });
    $(document).on('keydown', '#edit-universal-search-place-course, #universal-search-mobile-input', function(e){
    	clearTimeout(typingTimer);
    });
    if(!$(window).width() > 767){
        $(document).on('click', '.universal_search_pad .universal-search-btn', function(e){
            universal_default_search();
            $("#universal-search-mobile-input").val("");
            $(".universal_search_container").toggle();
            $("#universal-search-mobile-input").focus();
          $('body').toggleClass("universal-search-open");
        });
    }
    
    $(document).on('click', '.find_center_info, .all_results_info, .articles_on_info', function(){
    	var path = $(this).find('a').attr('href');
    	window.open(path,"_self");
      var current_url = window.location.href;
      //window.location.reload();
    });
    
    $(document).on('keyup', '#universal-search-mobile-input', function(e){
      var universal_search_word =  $(this).val();
      universal_search_word = universal_search_word.trim();
      if (e.keyCode == 40) {
        //keyup
      	keyUpDownChange("keyup");
        
      }else if(e.keyCode == 38){
        //keydown
      	keyUpDownChange("keydown");
      }else if(e.keyCode == 13){
      	var universal_sea_type = $('.universal_search_result').find('.universal_sea_count.uni_sea_active').attr("universal_sea_type");
      	if(universal_sea_type == "all_results" || universal_sea_type == "articles_on" || universal_sea_type == "find_center"){
      		console.log($(document).find('.universal_search_result').find('.universal_sea_count.uni_sea_active').html());
      		$(document).find('.universal_search_result').find('.universal_sea_count.uni_sea_active a')[0].click();
      	}else if(universal_sea_type == "course_results" || universal_sea_type == "place_results"){
      		$(document).find('.universal_search_result').find('.universal_sea_count.uni_sea_active').trigger( "click" );
      	}
      }
      else{
	      if (universal_search_word.length  > 0) {
	      	clearTimeout(typingTimer);
	        typingTimer = setTimeout(function(){ 
	        	universal_refresh_search(universal_search_word, 0);
	        },300);
	      } else {  
	      	universal_default_search();
	      }
      }
    });
    $(document).on('click', '.universal_search_mobile .mobile_close', function(e){
    	$(".universal_search_container").hide();
      $('body').removeClass("universal-search-open");
    });
    
    if (($(window).width() < 767)) {
    	$(document).on('click', '.course_search_result_wrap .course_search_results_subtitle, .course_search_result_wrap .program_input', function(e){
    		e.stopPropagation();
    		if(!$(".course_search_result_wrap").hasClass('active')){
    			$(".course_search_result_wrap").find('.program_view').show();
        	$(".course_search_result_wrap").addClass('active');
        	$(".search_autocomplete_place_wrap").find('.search_autocomplete_view').hide();
      		$(".search_autocomplete_place_wrap").removeClass('active');
    		}else{
    			$(".course_search_result_wrap").find('.program_view').hide();
        	$(".course_search_result_wrap").removeClass('active');
    		}
    		setTimeout(function(){ 
    			$(".search_autocomplete_course_li a").unbind('click', false);
    		}, 300);
      });
      $(document).on('click', '.search_autocomplete_place_wrap .search_autocomplete_place_subtitle, .search_autocomplete_place_wrap .search_autocomplete_input', function(e){
      	e.stopPropagation();
    		if(!$(".search_autocomplete_place_wrap").hasClass('active')){
    			$(".search_autocomplete_place_wrap").find('.search_autocomplete_view').show();
       	 	$(".search_autocomplete_place_wrap").addClass('active');
       	 	$(".course_search_result_wrap").find('.program_view').hide();
        	$(".course_search_result_wrap").removeClass('active');
    		}else{
    			$(".search_autocomplete_place_wrap").find('.search_autocomplete_view').hide();
       	 	$(".search_autocomplete_place_wrap").removeClass('active');
    		}
       	setTimeout(function(){ 
       		$(".search_autocomplete_place_li .search_autocomplete_place_a").unbind('click', false);
    		}, 300);
       });
    }else{
    	$(document).on('mouseenter', '.course_search_result_wrap', function(e){
     	 //$(this).find('.program_view').delay(200).slideDown(500);
     		$(this).find('.program_view').show();
     		$(".search_autocomplete_place_wrap").removeClass('active');
     		$(".search_autocomplete_place_wrap").find('.search_autocomplete_view').hide();
     		$(this).addClass('active');
     });
     
     $(document).on('mouseleave', '.course_search_result_wrap', function(e){
     	//$(this).find('.program_view').delay(200).slideUp(500);
     	$(this).find('.program_view').hide();
     	$(this).removeClass('active');
     });
     
     $(document).on('mouseenter', '.search_autocomplete_place_wrap', function(e){
    	 //$(this).find('.search_autocomplete_view').delay(200).slideDown(500);
     	$(this).find('.search_autocomplete_view').show();
    	 $(this).addClass('active');
     });
    }
     
    
    /*$(document).on('mouseleave', '.search_autocomplete_place_wrap', function(e){
    	//$(this).find('.search_autocomplete_view').delay(200).slideUp(500);
    	$(this).find('.search_autocomplete_view').hide();
    	$(this).removeClass('active');
    });*/
   
    // universal search code ended
  });
})( jQuery );
