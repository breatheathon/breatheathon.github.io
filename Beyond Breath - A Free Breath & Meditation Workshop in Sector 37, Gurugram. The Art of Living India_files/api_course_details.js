(function($){
  Drupal.behaviors.course_details = {}
  
  Drupal.behaviors.course_details.refreshForm = function () {
    map = $(self).hasClass("map") ;
		search_flag = false;
    var api_params = {
        'type': "userlocation",
        'language':Drupal.settings.aol.full_language,
        'ctype': lp_courses_minimal,
        'extend_to_limit' : 1,
        'language':Drupal.settings.aol.full_language,
        'limit':1, 
    };
    if(Drupal.settings.aol.country != 'global')
      api_params.country = Drupal.settings.aol.country;
      
    aol = new AOL();
    aol.course.search(api_params, formatCourse);
    $('.details-overlay').hide();
	  
	  function setCourseData(data){
	    renderData(data);
	  }
	    
  	function formatCourse(data){
      if((data.courses.length <= 0 && search_flag == false)){
        search_flag = true;
        api_params.type = 'country';
        aol.course.search(api_params, formatCourse);
        return;
      }
      var tt={rows:data.courses};
      var res={};
      res= {data:tt,type:"courses"};
      
      setCourseData(res);
    }
    
    function renderData(response){
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }
      
      if ('undefined' != typeof response.data && 'undefined' != typeof response.data.rows && response.data.rows.length) {
	      var viewHelpers = {
	         checkForDayNames : function(recur_display){
	           return geoHelper.checkDayNames(recur_display);
	         }
	      }
	      _.extend(response.data.rows[0], viewHelpers);
	      
	      var viewHelpers2 = {
	         checkDateDays : function(start, start_date, end , requestFor, type) {
	           return geoHelper.getCourseDateDays(start, start_date, end , requestFor, type);
	         }
	      }
	      _.extend(response.data.rows[0], viewHelpers2);
	      
	      var viewHelpers3 = {
	         getMonthNames : function(format_date, recur_event) {
	           return geoHelper.getMonthName(format_date, recur_event);
	         }
	      }
	      _.extend(response.data.rows[0], viewHelpers3);
	        
	      var viewHelpers4 = {
	         getCourseDay : function(start_date, end_date) {
	           return geoHelper.getCourseDay(start_date, end_date);
	         }
	      }
	      _.extend(response.data.rows[0], viewHelpers4);
	      
	      var viewHelpers5 = {
	         checkManyDay : function(start_date, end_date) {
	           return geoHelper.checkManyDay(start_date, end_date);
	         }
	      }
	      _.extend(response.data.rows[0], viewHelpers5);
	      
	      if(display_time == 'undefined'){
	        response.data.rows[0].display_time = 0;
	      }else{
	        response.data.rows[0].display_time = display_time;
	      }
	      response.data.rows[0].row = response.data.rows[0];
        $('.details-overlay').html(_.template(map_popup_template, response.data.rows[0]));
        $('.details-overlay').show();
        if (response.data.rows[0].register_url) {
          $('.course-details-register a').attr('href', response.data.rows[0].register_url);
          $('.overlay-find-all').removeClass('no-register');
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
          
          Drupal.settings.geofieldMap[mapID].data.geometries = response.data.rows;
          $('#' + mapID).addClass('geofieldMap').removeClass('geofield-processed-processed');;
          Drupal.attachBehaviors();
          
        }
        //lp_courses[lp_id] = response.data;
        //Drupal.lp_course_list.resize ();
    	}else{
    		//$('.course-details-register').hide();
        $('.overlay-find-all').addClass('no-register');
    	}
  	}
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
