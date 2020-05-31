(function ($) {
  Drupal.behaviors.html_component = {}
  Drupal.behaviors.html_component.attach = function (context) {
    jQuery(window).on("load scroll", function (e) {
      if ($('#element-131316').length) {
        if (!isScrolledIntoView('#element-131316 iframe')) {
          var tmpsrc = jQuery('#element-131316 iframe').attr('src');
          jQuery('#element-131316 iframe').attr('src', '');
          jQuery('#element-131316 iframe').attr('src', tmpsrc);
        }
      }
    });

    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    jQuery.fn.isInViewport = function() {
      var elementTop = jQuery(this).offset().top;
      var elementBottom = elementTop + jQuery(this).outerHeight();
      var viewportTop = jQuery(window).scrollTop();
      var viewportBottom = viewportTop + jQuery(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
      // console.log(elementBottom > viewportTop && elementTop < viewportBottom);
      
    }
    function sticky_relocate() { 
      var window_top = jQuery(window).scrollTop();
      if ($('#happy-sticky-anchor').length) {
        var div_top = jQuery('#happy-sticky-anchor').offset().top; 
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + jQuery(window).height();
        var old_scroll;
        var was = false;
        if (window_top > div_top) {
            jQuery('#happy-sticky-anchor + .happy-sticky').addClass('stick');
            jQuery('#happy-sticky-anchor').height(jQuery('.happy-sticky').outerHeight());
            jQuery('.happy-sticky a').each(function() {
              var element = jQuery(this).attr('href');
              if (jQuery(element).length > 0 && jQuery(element).isInViewport() && old_scroll != element) {
                was = true;
                old_scroll = element;
                jQuery('.happy-sticky a').css('font-weight','normal').removeClass('active');
                jQuery(this).css('font-weight','bold').addClass("active");
                jQuery('.happy-sticky a').on('click',function(event){
                    var target = $(this.getAttribute('href'));
                    if( target.length ) {
                        event.preventDefault();
                        var happy_sticky_height = $('.happy-sticky').outerHeight();
                        if(happy_sticky_height == 'undefined'){
                          happy_sticky_height = 0;
                        }
                        $('html, body').stop().animate({
                            scrollTop: target.offset().top - happy_sticky_height
                        }, 1000);
                    }
                })
              }
            });
        } else { 
          jQuery('.happy-sticky').removeClass('stick');
          jQuery('#happy-sticky-anchor').height(0); 
        }
      }
    }
    var old_scroll;
    jQuery(window).on("scroll resize load", function(){
      sticky_relocate();
    });

    jQuery().ready(function () {
        if($(window).width() >= 767){
            jQuery( "#what.hide_desktop" ).remove();
        }
    });

    jQuery(document).on("click","#dosha form p #submit",function (e) {
        e.preventDefault();
    var formname = jQuery("form#ctest").attr("name");
      calculate(formname);
    });
      function calculate (v_formname) {
          var fields = Array (
              'postuur', 'gewicht', 'typehuid', 'temperatuur', 'hoeveelheidhaar', 'haartype', 'haarkleur', 'gelaatskleur','ogeniris',
              'oogwit', 'tanden', 'kleurgebit', 'uithoudingsvermogen', 'kracht', 'weerstand', 'honger', 'voedseldrank', 'eten',
              'stoelgang', 'seks', 'lopen', 'vrouwpols', 'manpols', 'weer', 'geest', 'geheugen', 'dromen', 'slaap', 'druk', 'stemmingen',
              'kwets', 'ego', 'ambitie', 'affectie', 'geld', 'functie', 'relatie', 'spreken', 'stem');

          var f_form = document.forms[v_formname];

          var totalchecked = 0;
          var vatachecked  = 0;
          var pittachecked = 0;
          var kaphachecked = 0;

          for (i=0; i < fields.length; i++) {
              if (f_form.elements[fields[i]]) {
                  for (n=0; n < f_form.elements[fields[i]].length; n++) {
                      if (f_form.elements[fields[i]][n].checked) {
                          totalchecked++;
                          if (f_form.elements[fields[i]][n].value == 'vata')
                              vatachecked++;
                          else if (f_form.elements[fields[i]][n].value == 'pitta')
                              pittachecked++;
                          else if (f_form.elements[fields[i]][n].value == 'kapha')
                              kaphachecked++;
                      }
                  }
              }
          }

          if (totalchecked != 0) {
              var vataindex  = (vatachecked / totalchecked) * 100;
              f_form.elements['vataindex'].value  = vataindex.toFixed(0);

              var pittaindex = (pittachecked / totalchecked) * 100
              f_form.elements['pittaindex'].value = pittaindex.toFixed(0);

              var kaphaindex = (kaphachecked / totalchecked) * 100
              f_form.elements['kaphaindex'].value = kaphaindex.toFixed(0);
          }
          else {
              alert('Vul a.u.b. de vragen in, anders kan uw constitutie niet worden berekend.');
          }

      }
  }

})(jQuery);
jQuery(document).ready(function () {
    var hashfocus = window.location.hash.substr(1);
    if(jQuery('#'+hashfocus).length > 0){
        jQuery('html,body').animate(
            { scrollTop: jQuery('#'+hashfocus).offset().top +100 },
            500,
            'swing'
        );
    }
})

jQuery(document).ready(function () {
    if (jQuery('#wellness_survey_form').length > 0) {

        var d_result = {
            a: 'CONGRATULATIONS! You are aware of the importance of your overall well being and are putting it into practice.',
            b: 'Your wellness practices are good, but there is scope for further improvement. Even a small change in your wellness practices could result in better well being.',
            c: 'You are taking serious risks with your health. You need to make structured changes in your lifestyle at the earliest.',
            d: 'You need to urgently educate yourself on good wellness practices and implement them.'

        };

        jQuery("#w_submit").click(function (e) {
            e.preventDefault();
            var result = {
                a: 0,
                b: 0,
                c: 0,
                d: 0,
            };
            var count = 0;
            var well_name = new Array();
            jQuery('input').removeClass('well_error_alert');
            jQuery('input').parent().removeClass('well_error_radio');
            jQuery('.w_error').addClass('hidden');
            jQuery("input:radio").each(function (index) {
                well_name[index] = this.name;
                var name = jQuery(this).attr("name");
                if (jQuery("input:radio[name=" + name + "]:checked").length == 0) {
                    var earr = name.split('_');
                    var emsg = 'e_' + earr[1];
                    jQuery("input[name=" + name + "]").parent().addClass('well_error_radio');
                    jQuery('.' + emsg).removeClass('hidden');
                    count++;
                } else {
                    var subcheck = jQuery("input:radio[name=" + name + "]:checked").val();
                    if ((name === 'w_alcohol' || name === 'w_diabetesf') && subcheck === 'd') {
                        var subname = 'w_a_' + name.split('_')[1];
                        var errname = 'e_' + name.split('_')[1]+'_r';
                        var w_a = jQuery("#" + subname).val();
                        if (w_a === '') {
                            wellness_validation(subname, errname);
                            count++
                        }
                    }
                }
            });
            var name = jQuery("#w_name").val().trim();
            if (name === '') {
                wellness_validation('w_name', 'e_name');
                count++
            }
            var age = jQuery("#w_age").val().trim();
            if (age === '') {
                wellness_validation('w_age', 'e_age');
                count++
            }
            var email = jQuery("#w_email").val().trim();
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if(email !== '' && !re.test(email)){
                wellness_validation('w_email', 'e_email');
                count++
            }

            if (count === 0) {
                var thelistunique = well_name.filter(
                    function (a) {
                        if (!this[a]) {
                            this[a] = 1;
                            return a;
                        }
                    },
                    {}
                );
                for (i = 1; i < (thelistunique.length); i++) {
                    var wresult = jQuery("input[name=" + thelistunique[i] + "]:checked").val();
                    result[wresult] = result[wresult] + 1;
                }
                jQuery('#wellness_survey_form').addClass('hidden');
                jQuery('#well_survey_form_result').removeClass('hidden');
                if (((result['a'] / 21) * 100) > 70) {
                    jQuery('.well_result_opt').text(d_result['a']);
                } else if (((result['a'] / 21) * 100) < 70 && ((result['a'] / 21) * 100) > 60) {
                    jQuery('.well_result_opt').text(d_result['b']);
                } else if (((result['a'] / 21) * 100) < 50 && ((result['a'] / 21) * 100) > 40) {
                    jQuery('.well_result_opt').text(d_result['c']);
                } else {
                    jQuery('.well_result_opt').text(d_result['d']);

                }
                // jQuery('html, body').animate({
                //     'scrollTop': jQuery("#well_survey_form_result").position().top //
                // }, 2000);
                  jQuery.scrollTo(jQuery('#well_survey_form_result'), 1000);
            } else {
                jQuery('.all_error').removeClass('hidden');
                // jQuery('html, body').animate({
                //     'scrollTop': jQuery(".all_error").position().top -50
                // }, 2000);
                jQuery.scrollTo(jQuery('.all_error'), 1000);

            }

        });

        jQuery(".well_survey_again").click(function () {
            jQuery(".well_survey_form_result").addClass('hidden');
            jQuery(".well_form_submission").removeClass('hidden');
            jQuery("#survey_form").reset();

        });

        function wellness_validation(data, id) {
            jQuery('#' + data).addClass('well_error_alert');
            jQuery('.' + id).removeClass('hidden');
        }

        jQuery("input:radio").click(function (e) {
            var ermove = 'e_'+ e.target.name.split('_')[1];
            jQuery("input[name=" + e.target.name + "]").parent().removeClass('well_error_radio');
            // jQuery('#' + e.target.name).parent().removeClass('well_error_radio');
            jQuery('.'+ermove).addClass('hidden')
        });


    }
    //code for service project mobile menu start
    jQuery(document).on('click', '.srvice-project-menu-h2, .srvice-project-menu-li a', function(e) {
      jQuery(".srvice-project-menu-ul").toggle();
    });
    if (jQuery('.srvice-project-menu-h2').length > 0) {
      var topFixed = jQuery('.srvice-project-menu-h2').offset().top;
      jQuery(window).scroll(function() {
          var currentScroll = jQuery(window).scrollTop();
          if (currentScroll >= topFixed) {
              jQuery('.srvice-project-menu-h2').addClass('menu-fixed');
              jQuery('.srvice-project-menu-ul').addClass('menu-fixed-ul');
          } else {
              jQuery('.srvice-project-menu-h2').removeClass('menu-fixed');
              jQuery('.srvice-project-menu-ul').removeClass('menu-fixed-ul');
          }
      });
    }
    //code for service project mobile menu end
});

