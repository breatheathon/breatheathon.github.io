(function($){
  Drupal.behaviors.course_details = {}
  
  Drupal.behaviors.course_details.refreshForm = function () {
    path = "course-search/ajax",
    map = $(self).hasClass("map") ;

    if (Drupal.settings.pathPrefix) {
      path = "/" + Drupal.settings.pathPrefix +path;
    }else {
      path = "/" +path;
    }
    var params = {
        'limit':1, 
        'use_my_ip': 1, 
        'extend_to_limit' : 1, 
        'no_center': 1,
        'preselected_course_types':lp_courses_minimal, 
        'center_autocomplete_google_lat':0,
        'center_autocomplete_google_lng': 0,
        'center_autocomplete_google_country': Drupal.settings.aol.country, 'no_center': 1,
        'center_autocomplete_google': 'hello',
        'center_id': 1234};

    
    $.post(
      path,
      params,
      function(response, status){
        //geoHelper.getFormParamsFromUrl(response.url.replace('acol', 'noacol'));
        if (typeof response == 'string') {
          response = $.parseJSON(response);
        }
        
        if ('undefined' != typeof response.data && 'undefined' != typeof response.data.rows) {
	        $('.details-overlay').html(_.template(map_popup_template, response.data.rows[0]));
	        
	        if (response.data.rows[0].register) {
	          $('.course-details-register a').attr('href', response.data.rows[0].register);
	        }
	        else {
	          $('.course-details-register').remove();
	        }
        
          //lp_course_list  = response.data;
          if (map) {
            mapID = 'geosearch-map';
            if (typeof Drupal.settings.geofieldMap == 'undefined') {
              Drupal.settings.geofieldMap = {};
            }
            if (typeof Drupal.settings.geofieldMap[mapID] == 'undefined') {
              Drupal.settings.geofieldMap[mapID] = new Object();
              Drupal.settings.geofieldMap[mapID].data = new Object();
            }
            
            //format data for map
            for (var i2 = 0; i2 < response.data.rows.length; i2++) {
              if ('undefined' == typeof response.data.rows[i2].properties) {
                response.data.rows[i2].properties = new Object();
              }
              response.data.rows[i2].properties.description = _.template(map_popup_template, response.data.rows[i2]);
    
            }
            console.log("map");
            Drupal.settings.geofieldMap[mapID].data.geometries = response.data.rows;
            $('#' + mapID).addClass('geofieldMap').removeClass('geofield-processed-processed');;
            Drupal.attachBehaviors();
            
          }
          lp_courses[lp_id] = response.data;
          Drupal.lp_course_list.resize ();
        }                
      });
  }
  
  Drupal.behaviors.course_details.attach = function(context){
    if ('undefined' != typeof lp_courses_minimal) {
      Drupal.behaviors.course_details.refreshForm();
    }
  	if( $('.minimal_overlay_main', context).length){
	  	var minimal_mob =  $('.minimal_overlay_main').clone();
	  	$("<div class='minimal_overlay_mob'></div>").insertAfter($('.minimal_overlay_main').closest('.div_PageRow'));
			$('.minimal_overlay_mob').html(minimal_mob);
	   }
	}

})( jQuery );
