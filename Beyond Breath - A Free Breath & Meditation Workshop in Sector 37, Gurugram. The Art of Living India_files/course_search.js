var AOL=(function(){ 
//	this.searchUrl="http://33.33.33.10:8087/courses";
//	this.searchUrl="http://dptest2.artofliving.org:8080/dev-search/courses";
//  this.searchUrl="http://utest.artofliving.org:8083/courses";
//	this.searchUrl="http://34.229.66.182:8080/courses";
  this.searchUrl="https://unity.artofliving.org/csapi/courses";
 // this.searchUrl="http://itest.artofliving.org:8081/courses";
	// constructor
	this.AOL=function(){}
	// functions
	this.getQueryParam=function(option){
		var qureyParam='';
		for (var key in option){
				qureyParam += key +"="+option[key]+"&";
			}
		return qureyParam;
	}
	this.getUrl=function(){
		var urlLen 		= searchUrl.length;
		var lastChar 	= searchUrl.substring(urlLen-1,urlLen);
		if (lastChar=="?"){
			return searchUrl;
		}
		return searchUrl+"?";
	}
	this.doAjax= function(url,option, callback,type){
		
		url =getUrl();
		// checking "?" in url 

		url +=getQueryParam(option);

		var xhttp='';
			if(window.XMLHttpRequest){
				xhttp=new XMLHttpRequest();
			}else{
				xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhttp.onreadystatechange=function(){
				if (xhttp.readyState == 4 && xhttp.status==200 ) {
     	 			res = JSON.parse(xhttp.responseText);
     	 			res.type = option.type;
     	 			if(option.ctype !== 'undefined')
     	 				res.ctype = option.ctype;
     	 			if(option.queue !== 'undefined')
     	 				res.queue = option.queue;
     	 			if(option.distance !== 'undefined')
     	 				res.search_distance = parseInt(option.distance);
     	 		if(option.lp_id !== 'undefined')
   	 				res.api_params = option;
     	 			callback(res);
    			}
			}

			xhttp.open("GET",url,true);
			xhttp.send(option);
	}
	
	
	function consoleError(){
		console.log('Malformed input option object found.');
	}
	// function for all courses in country
	AOL.prototype.course={
		search:function(opt,callback){
			option=JSON.parse(JSON.stringify(opt));
			if (typeof(option)!='object'){
				consoleError();
				return;
			}
			if(typeof(option.type)=="undefined" || option.type==""){
				option.type="country";
			}
			if(typeof(option.ctype)=="undefined" || option.ctype==""){
				option.ctype="courses";
			}
			if(option.type == "center" && Drupal.settings.aol.country == "global")
				delete option.ctype;
			
			if((option.type != 'center' && Drupal.settings.aol.country == "in") || (option.type != 'center' && Drupal.settings.aol.show_online_programs != undefined && Drupal.settings.aol.show_online_programs == 1)){
				option.is_online_event = 1;
			}

			doAjax(searchUrl,option,callback,"courses");
			
			//window[callback](option);
		}
	}
	
	return AOL;
})();

(function($){
  
  Drupal.behaviors.menu_tabs = {
      showing: false
  };

  Drupal.behaviors.menu_tabs.attach = function(context) {
    $('.tab-link', context).click(function() {
      $(this).parent().parent().find('.tab-link').removeClass('active');
      $(this).addClass('active');
      var href = '#' + $(this).attr('target');
      
      $(href).parent().find('> .tab-content').hide();
      $(href).fadeIn('fast');
//      Drupal.attachBehaviors($(href).html());
      
    });
  }
  
})( jQuery );
