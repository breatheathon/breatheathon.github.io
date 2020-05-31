jQuery( window ).on('resize load',function(){
	if ( jQuery(window).width() > 960 ) {
		var beyondBreath = jQuery('.what-you-will-discover-sec .div_html_component .html-component .beyond-death').width();
		var parentWidth = jQuery('.what-you-will-discover-sec .div_html_component .html-component .beyond-death').closest('.row-inner').width();
		var beyondBreath1 = (parentWidth / 2) - (beyondBreath / 2);
		jQuery('.what-you-will-discover-sec .div_html_component .html-component .beyond-death').css('left',beyondBreath1);
	}
})