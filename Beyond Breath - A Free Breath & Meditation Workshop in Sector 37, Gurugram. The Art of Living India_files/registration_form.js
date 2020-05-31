(function($){ 
  Drupal.behaviors.lp_registration_form = {}
  Drupal.behaviors.lp_registration_form.attach = function(context) {
    aol = new AOL();
    Drupal.lp_registration_form.formatCourse = function(){
    }

    Drupal.lp_registration_form.startFunction = function(){
    }
  }
  startFunction();
})
jQuery( document ).ready(function() {
  var page_type = jQuery(".registration_form").find("#intro_page_type").val();
if ( page_type == 'event' && jQuery('.intro_page_children').length) {
  jQuery(".registration_form select:first").parent().hide();
    var event_children = jQuery.parseJSON(jQuery('#intro_page_children').val()); 
    var tempStr = '<option value="">'+Drupal.t('Please select date')+'</option>';
    if(event_children == null){
      tempStr = '<option value="">'+Drupal.t('No future events are present')+'</option>';
    }
    var i = 0;
    for(var key in event_children) {
      if(key == 0 && event_children.length == 1){
        jQuery('.registration_form').find("input[name*='course_nid']" ).val(event_children[key].sao_id);
      }
      if(i <= 4){
        if(event_children[key].is_event_capacity_full == 1){
          tempStr = tempStr + '<option class="capcity-full" value="'+event_children[key].sao_id+'-full">'+event_children[key].value+' (Fully booked)</option>';
        }else{
          tempStr = tempStr + '<option value="'+event_children[key].sao_id+'">'+event_children[key].value+'</option>';
        }
       
      }
      i++;
    } 
    jQuery('.registration_form').find('#edit-submitted-intro-date').html(tempStr);

    jQuery('.registration_form').find('#edit-submitted-intro-date').change(function() {
      var child= jQuery('.registration_form').find('#edit-submitted-intro-date').val();
      if(child.indexOf('-full') != -1){
        jQuery('.registration_form').find('#edit-actions').hide();
        jQuery('.registration_form').find('#edit-submitted-intro-date').addClass('intro-talk-full-event');
      }else{
        jQuery('.registration_form').find('#edit-actions').show();
        jQuery('.registration_form').find('#edit-submitted-intro-date').removeClass('intro-talk-full-event');
        jQuery('.registration_form').find("input[name*='course_nid']" ).val(child);  
      }
      
    });
  }else{
    jQuery(".registration_form select:first").parent().show();
    var multi_location_records_temp = jQuery(".registration_form").find("#intro_multi_location_records").val();
    var multi_location_records = "";
    if(multi_location_records_temp != "null" && multi_location_records_temp != ""){
      multi_location_records = jQuery.parseJSON(multi_location_records_temp);
    }
    var citystr = "";
    var postal_codestr = "";
    var globalChildrenArr = new Array();
    var postal_enable = jQuery('#intro_page_type_enable_zip').val();
    for(var key in multi_location_records.cities) {
      citystr = citystr + multi_location_records.cities[key].value + ',';
    }
    aol = new AOL();
    if(postal_enable == 1 || postal_enable == "1"){
      var postal_code_temp = jQuery('#intro_multi_location_records_zip').val();
      var postal_code = "";
      if(postal_code_temp != "null" && postal_code_temp != ""){
        postal_code = jQuery.parseJSON(postal_code_temp);
      }
      for(var key in postal_code.zips) {
        postal_codestr = postal_codestr + postal_code.zips[key].value + ',';
      } 
      postal_codestr = postal_codestr.replace(" ", "");
      api_params = {
      'postal_code': postal_codestr.slice(0, -1),
      'country': Drupal.settings.aol.country,
      'ctype': postal_code.ctype,
      'language': Drupal.settings.aol.full_language,
      'extend_to_limit': 1,
      'field_childrens':true,
      'type': 'country',
      'limit':10
      };
      if(postal_codestr != ""){
        aol.course.search(api_params, renderLocationDropDown);
      }
    }else{
      api_params = {
      'city': citystr.slice(0, -1),
      'country': Drupal.settings.aol.country,
      'ctype': multi_location_records.ctype,
      'language': Drupal.settings.aol.full_language,
      'extend_to_limit': 1,
      'field_childrens':true,
      'type': 'country',
      'limit':10
      };
      if(citystr != ""){
        aol.course.search(api_params, renderLocationDropDown);    
      }
    }
    

    jQuery('.registration_form').find('#edit-submitted-intro-loc').change(function() {
        var address = jQuery('.registration_form').find('#edit-submitted-intro-loc').val();
        //var multi_location_records = jQuery.parseJSON(jQuery(".registration_form").find("#intro_multi_location_records").val());
        renderDateDropDown(address);
    });

    jQuery('.registration_form').find('#edit-submitted-intro-date').change(function() {
      var child= jQuery('.registration_form').find('#edit-submitted-intro-date').val();
      if(child.indexOf('-full') != -1){
        jQuery('.registration_form').find('#edit-actions').hide();
        jQuery('.registration_form').find('#edit-submitted-intro-date').addClass('intro-talk-full-event');
      }else{
        jQuery('.registration_form').find('#edit-actions').show();
        jQuery('.registration_form').find('#edit-submitted-intro-date').removeClass('intro-talk-full-event');
        jQuery('.registration_form').find("input[name*='course_nid']" ).val(child);  
      }
      jQuery('.registration_form').find("input[name*='course_nid']" ).val(child);
    });
  } 

 
  // function renderLocationDropDown(data){
  //   var tempStr = "";
  //   jQuery('.registration_form').find('#edit-submitted-intro-date').html('<option value="">Please select date</option>');
  //   jQuery('.registration_form').find("input[name*='course_nid']" ).val(data.courses[0].sao_id);
    
  //   tempStr = '<option value="">Please select location</option>';
  //   for(var key in data.courses) {
  //   	if(data.courses[key].is_parent == "1"){
  //   		globalChildrenArr[data.courses[key].sao_id] = data.courses[key].field_childrens;
  //   	}else{
  //       var timeStr = (data.courses[key].weekday_timings != "") ? data.courses[key].weekday_timings.split(" - ")[0] : (data.courses[key].weekend_timings != "") ? data.courses[key].weekend_timings.split(" - ")[0] : "";
  //       globalChildrenArr[data.courses[key].sao_id] = [{'value':data.courses[key].sao_id, 'date':data.courses[key].start_date, 'time':timeStr}];
  //   	}
  //         tempStr = tempStr + '<option value="'+data.courses[key].sao_id+'">'+data.courses[key].address_short+'</option>';
  //   }
  //   jQuery('.registration_form').find('#edit-submitted-intro-loc').html(tempStr);
  // }
  function renderLocationDropDown(data){
  var tempStr = "";
    jQuery('.registration_form').find('#edit-submitted-intro-date').html('<option value="">Please select date</option>');
    var addrArray = [];
    var addrString = [];
    var saoArray = [];
    tempStr = '<option value="">'+Drupal.t('Please select location')+'</option>';
    for(var key in data.courses) {
      if (jQuery.inArray(data.courses[key].address_short, addrArray) != -1)
      {
        var city = data.courses[key].city;
        if(data.courses[key].is_parent == "1" && data.courses[key].field_childrens != undefined){
          for(var k in data.courses[key].field_childrens){
            //globalChildrenArr.push({'value':data.courses[key].field_childrens[k].value, 'date':data.courses[key].field_childrens[k].date, 'time':"", 'city': city, 'address': data.courses[key].address_short});
            //globalChildrenArr.push(data.courses[key].field_childrens);  
            if(data.courses[key].field_childrens[k].is_event_capacity_full != undefined && data.courses[key].field_childrens[k].is_event_capacity_full == 1){
              globalChildrenArr.push({'value':data.courses[key].field_childrens[k].value, 'date':data.courses[key].field_childrens[k].date, 'time':"", 'city': city, 'address': data.courses[key].address_short, 'is_event_capacity_full':1});
            }else{
              globalChildrenArr.push({'value':data.courses[key].field_childrens[k].value, 'date':data.courses[key].field_childrens[k].date, 'time':"", 'city': city, 'address': data.courses[key].address_short});
            }
          }
        }else{
          var timeStr = (data.courses[key].weekday_timings != "") ? data.courses[key].weekday_timings.split(" - ")[0] : (data.courses[key].weekend_timings != "") ? data.courses[key].weekend_timings.split(" - ")[0] : "";
          //globalChildrenArr.push({'value':data.courses[key].sao_id, 'date':data.courses[key].start_date, 'time':timeStr, 'city': city, 'address': data.courses[key].address_short});
          if(data.courses[key].is_event_capacity_full != undefined && data.courses[key].is_event_capacity_full == true){
            globalChildrenArr.push({'value':data.courses[key].sao_id, 'date':data.courses[key].start_date, 'time':"", 'city': city, 'address': data.courses[key].address_short, 'is_event_capacity_full':1});
          }else{
            globalChildrenArr.push({'value':data.courses[key].sao_id, 'date':data.courses[key].start_date, 'time':"", 'city': city, 'address': data.courses[key].address_short});
          }
        }
      }else{
        addrString.push(data.courses[key].address_short);
        //New field is introduced as 'locality', handle both old and new announced events
        if(data.courses[key].event_locality != ""){
          addrArray[data.courses[key].address_short] = data.courses[key].event_locality;
        }else{
          addrArray[data.courses[key].address_short] = data.courses[key].city + ', ' + data.courses[key].state + ', ' + data.courses[key].zip_postal_code;  
        }
        
        var city = data.courses[key].city;
        if(data.courses[key].is_parent == "1" && data.courses[key].field_childrens != undefined){
          for(var k in data.courses[key].field_childrens){
            if(data.courses[key].field_childrens[k].is_event_capacity_full != undefined && data.courses[key].field_childrens[k].is_event_capacity_full == true){
              globalChildrenArr.push({'value':data.courses[key].field_childrens[k].value, 'date':data.courses[key].field_childrens[k].date, 'time':"", 'city': city, 'address': data.courses[key].address_short, 'is_event_capacity_full':1});
            }else{
              globalChildrenArr.push({'value':data.courses[key].field_childrens[k].value, 'date':data.courses[key].field_childrens[k].date, 'time':"", 'city': city, 'address': data.courses[key].address_short});
            }
            
            //globalChildrenArr.push(data.courses[key].field_childrens);  
          }
          //globalChildrenArr.push(data.courses[key].field_childrens);
        }else{
          var timeStr = (data.courses[key].weekday_timings != "") ? data.courses[key].weekday_timings.split(" - ")[0] : (data.courses[key].weekend_timings != "") ? data.courses[key].weekend_timings.split(" - ")[0] : "";
          if(data.courses[key].is_event_capacity_full != undefined && data.courses[key].is_event_capacity_full == 1){
            globalChildrenArr.push({'value':data.courses[key].sao_id, 'date':data.courses[key].start_date, 'time':"", 'city': city, 'address': data.courses[key].address_short, 'is_event_capacity_full':1});
          }else{
            globalChildrenArr.push({'value':data.courses[key].sao_id, 'date':data.courses[key].start_date, 'time':"", 'city': city, 'address': data.courses[key].address_short});
          }
          
        }
      }
    }
    var course_type = jQuery('#intro_course_type').val();
    if(course_type === '815873'){
      tempStr ='';
      tempStr = '<option value="">'+Drupal.t('Online')+'</option>';
    }else{
      for(var key in addrArray) {
        tempStr = tempStr + '<option value="'+key+'">'+addrArray[key]+'</option>';
      }
    }
    jQuery('.registration_form').find('#edit-submitted-intro-loc').html(tempStr); 
 }

 //  function renderDateDropDown(sao_id){
 //    jQuery('.registration_form').find("input[name*='course_nid']" ).val("");
 //    var tempStr = "";
 //    var sao_id = jQuery('.registration_form').find('#edit-submitted-intro-loc').val();
 //    tempStr = '<option value="">Please select date</option>';
 //    for(var key in globalChildrenArr[sao_id]) {
 //      var timeStr = "";
 //      var dateStr = "";
 //      if(typeof globalChildrenArr[sao_id][key].time != undefined && globalChildrenArr[sao_id][key].time != ""){
 //        dateStr = globalChildrenArr[sao_id][key].date;
 //        timeStr = ' @ '+ globalChildrenArr[sao_id][key].time;
 //      }else{
 //        dateStr = globalChildrenArr[sao_id][key].date.split(" ")[0];
 //        timeStr = (globalChildrenArr[sao_id][key].date.split(" ")[1] != '00:00:00') ? ' @ '+ globalChildrenArr[sao_id][key].date.split(" ")[1] : "";
 //      }
 //      date = dateStr.split("-");
	//    tempStr = tempStr + '<option value="'+globalChildrenArr[sao_id][key].value+'">' + date[2] + '.' + date[1] + '.'  + date[0] + ' ' + timeStr + '</option>';
 //    }
	// jQuery('.registration_form').find('#edit-submitted-intro-date').html(tempStr);
	// //jQuery('.registration_form').find("input[name*='course_nid']" ).val(globalChildrenArr[sao_id][0].value);
 //  } 

 function renderDateDropDown(address){
    jQuery('.registration_form').find("input[name*='course_nid']" ).val("");
    var tempStr = "";
    var address = jQuery('.registration_form').find('#edit-submitted-intro-loc').val();
    tempStr = '<option value="">Please select date</option>';
    for(var key in globalChildrenArr) {
      var timeStr = "";
      var dateStr = "";
  if(globalChildrenArr[key].address == address){
      if(typeof globalChildrenArr[key].time != undefined && globalChildrenArr[key].time != ""){
        dateStr = globalChildrenArr[key].date;
        timeStr = timeTo12HrFormat(globalChildrenArr[key].time);
      }else{
        dateStr = globalChildrenArr[key].date.split(" ")[0];
        var timeStrTemp = (globalChildrenArr[key].date.split(" ")[1] != '00:00:00') ? timeTo12HrFormat(globalChildrenArr[key].date.split(" ")[1]) : "";
        
        if(timeStrTemp != ""){
          timeStrTemp = timeStrTemp.split(":");
          timeStr = timeStrTemp[0] + ':' + timeStrTemp[1];  
        }else{
          timeStr = "";
        }
        
      }
      date = dateStr.split("-");
      if(globalChildrenArr[key].is_event_capacity_full == 1){
        tempStr = tempStr + '<option class="capcity-full" value="'+globalChildrenArr[key].value+'-full">' + date[2] + '.' + date[1] + '.'  + date[0] + ' ' + timeStr + ' (Fully booked)</option>';
      }else{
        tempStr = tempStr + '<option value="'+globalChildrenArr[key].value+'">' + date[2] + '.' + date[1] + '.'  + date[0] + ' ' + timeStr + '</option>';
      }
    }
}
  jQuery('.registration_form').find('#edit-submitted-intro-date').html(tempStr);
  //jQuery('.registration_form').find("input[name*='course_nid']" ).val(globalChildrenArr[sao_id][0].value);
  }

  function timeTo12HrFormat(time) {
      var time_part_array = time.split(":");
      var ampm = 'AM';

      if (time_part_array[0] >= 12) {
        ampm = 'PM';
      }

      if (time_part_array[0] > 12) {
        //Appending 0 to keep equal format for both AM & PM 
        time_part_array[0] = time_part_array[0] - 12;
        time_part_array[0] = '0' + time_part_array[0];
      }

      formatted_time = ' @ ' + time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;

      return formatted_time;
  }   
}); 
