(function ($, Drupal, window, document, undefined) {
  var ajaxBandaiFormId = 0;
  $(function() {

    var unityUxFormRefresh = function($form, checkboxesChanged, pagination) {
		  var lp_id;
		  if($('.calendar_view-section .search_loader').length)
				$('.calendar_view-section .search_loader').show();
				
			if($('.lp-course-list').length){
	      $('.lp-course-list').each(function() {
			    search_flag = false;
		      if ($(this).hasClass("load-ajax") > 0){
		        $(this).once(function() {
		        	if($(this).closest('.sahaj-upcoming-section').hasClass('calendar_view-section'))
					  		Drupal.lp_course_list.course_layout = 'calendar';
					  	
		        	Drupal.lp_course_list.get_ajax_courses();
      				if ($('input[name="center_autocomplete_google"]').length)
					    	var autocomplete = geoHelper.initializeMap('input[name="center_autocomplete_google"]', Drupal.lp_course_list.get_ajax_courses);
		        });
		      }
		    });
			}
			
			if($form.hasClass('home-page-course-search2')){
	      var lat = $form.find('[name=center_autocomplete_google_lat2]').val();
	      var lng = $form.find('[name=center_autocomplete_google_lng2]').val();
	      var search = $form.find('[name=center_autocomplete_google2]').val();
	      if($('[name="center_autocomplete_distance"]', $form).length)
	      	distance = $('[name="center_autocomplete_distance"]', $form).val();
	     	else
	      	distance = Drupal.settings.aol.default_course_distance;

	      var url = "#distance="+distance+"&sSearch="+search+"&st=&lat="+lat+"&lng="+lng+"&ctype=&acol=0&c=&cc=&d1=&d2=";
		  	path = $('[name=center_autocomplete_google2]', $form).data('redirect') 
		  	        ? $('[name=center_autocomplete_google2]', $form).data('redirect') 
		  	        : 'search/course';
		  	  
		  	pathRedirect =  "/" + Drupal.settings.pathPrefix + path;
		  	window.location.href = pathRedirect+url;
			}
    }
    
    $('input[name=center_autocomplete_google2]').click(function() {
      if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
        $.holdReady(true);
        $.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places&key=AIzaSyBNNEvtSRuTNR00U-t46cAuCkSY1iH-n3k", function() {
             $.holdReady(false);
             if ($('input[name="center_autocomplete_google2"]').length)
               var autocomplete = geoHelper.initializeMap('input[name="center_autocomplete_google2"]', unityUxFormRefresh);
        });
      }
      else {
        var autocomplete = geoHelper.initializeMap($(this)[0], unityUxFormRefresh);
      }
    })
    
    
    if (!$('body').hasClass('page-search-course') 
         && !$('body').hasClass('node-type-course-menu')
         && !$('body').hasClass('page-search')
         && $('#course-followups-wrapper').length <= 0) {
      if ($('input[name="center_autocomplete_google"]').length)
      	geoHelper.initializeMap('input[name="center_autocomplete_google"]', unityUxFormRefresh);
    }
    if ($('input[name="center_autocomplete_google2"]').length)
    	var autocomplete = geoHelper.initializeMap('input[name="center_autocomplete_google2"]', unityUxFormRefresh);
    
    $('.search-btn').click(function(){
      if (window.innerWidth < 768) {
        //$('#CountrySelectorDropdown').show();
        //$('#edit-center-autocomplete-google2').addClass("active");
        //$('.head_right_sec').addClass('active');
        //$('.logo').addClass('hidden-xs');
        //('#current_country').addClass('hidden-xs'); //since it breakes on mobile screen  update by chinmay
        //$('#mobile-header').css('float','left'); // removed by chinmay since it is not in new requirement
        //$(this).hide();        
      	if($('.unity_plus_country_locator.unity2 .center-changer').css('display') == 'block')
        	$('.unity_plus_country_locator.unity2 .center-changer').slideToggle();
      }
      else {
        google.maps.event.trigger(autocomplete, 'place_changed');
      }
      if($(this).hasClass('search_center_submit'))
				$('input[name="center_autocomplete_google2"]').attr('data-redirect',"search/center");
    });
    
    $('.home-page-course-search2 input[name="center_autocomplete_google2"]').keypress(function(event) {
    	if (event.which == 13) {
        event.preventDefault();
       }
    });
   
   $(window).scroll(function(){
        if ($('.sticky-header').css("visibility") != "hidden"){
          if($('.sticky-enabled  .bandai-select-inner').is(":visible")){
            $('.sticky-enabled  .bandai-select-inner').hide();
            $('.sticky-header  .bandai-select-inner').show();
          }
        }
        if ($('.sticky-header').css("visibility") == "hidden"){
          if($('.sticky-header  .bandai-select-inner').is(":visible")){
            $('.sticky-header  .bandai-select-inner').hide();
            $('.sticky-enabled  .bandai-select-inner').show();
          }
        }
       
    })
    
    $('.home-page-course-search2').submit(function(event){
       return false;
    });       
  })
})(jQuery, Drupal, this, this.document);  