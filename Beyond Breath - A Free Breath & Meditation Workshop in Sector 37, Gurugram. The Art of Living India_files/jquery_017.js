(function ($) {
    var pluginName = "mapboxAutocomplete";
    var defaults = {
        accessToken: '',
        endpoint: 'https://api.mapbox.com/geocoding/v5/',
        mode: 'mapbox.places',
        language: 'fr',
        width: '100%',
        zindex: '1000'
    };

    function Plugin(element, options) {

        this.element = $(element);
        this.$elem = $(this.element);
        this._name = pluginName;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;

        return this.init();
    };

    Plugin.prototype = {

        options: function (option, val) {
            this.settings[option] = val;
        },

        // Constructing Tabs Plugin
        init: function () {
            var input = this.element;
            console.log("input",input[0]['name'])
            var input_name = input[0]['name'];
            if(input[0]['name'] == "submitted[geo_address]"){
                var random_num = Math.floor((Math.random() * 1000) + 1);
            	input_name = input[0]['id']+random_num;
            }
            var id = input[0]['id'];
            var serach_name = input[0]['search_name'];
            if(serach_name == 'undefined'){
            	serach_name = '';
            }
            if(!$( "#"+id ).hasClass("course-list") && !$( "#"+id ).hasClass("geo_address_autocomplete")){
	            setTimeout(function(){
	            	$( "#"+id ).focus();
	            });
            }
            input.wrap('<div class="address-autocomplete-wrapper"></div>');
            var wrapper = $('.address-autocomplete-wrapper');
            input.after('<input hidden name="mbaa-found-address" value="" />');
            input.after('<ul id="mbaa-result-address-autocomplete'+input_name+serach_name+'" class="mbaa-results-list"></ul>');
            var results = $('#mbaa-result-address-autocomplete'+input_name+serach_name);
            var chosen = "";
            var features = null;
            $(document).bind('click', function(e){
              var $target = $(e.target);
              if(!$target.closest('#'+input[0]['id']).length && !($target.parent().hasClass('#mbaa-result-address-autocomplete'+input_name+serach_name))){
                $('#mbaa-result-address-autocomplete'+input_name+serach_name).removeClass('mbaa-fill');
              }
            });
            var parseQuery = function (query, options) {
                query = encodeURI(query);
                var url = options.endpoint + options.mode + '/' + query + '.json';
                if(options.country == 'uk' || options.country == 'UK'){
                	options.country = 'gb';
                }
                if(options.country == undefined){
                	var params = 'access_token=' + options.accessToken + '&language=' + options.language;
                }else{
                	var params = 'access_token=' + options.accessToken + '&language=' + options.language+'&country='+options.country;
                }
                return url + '?' + params;
            };

            var parseResults = function () {
            	
                $.each(features, function (index, feature) {
                	var place_name = feature.place_name;
                	var text = feature.text;
                	var place_name = place_name.replace(text, "<span class='pac-matched' >"+text+"</span>");
                    results.append('<li data-id="' + feature.id + '" class="mbaa"><span class="pac-icon pac-icon-marker"></span>' + place_name + '</li>');
                });

                results.find('li').each(function (index, item) {
                    var li = $(this);
                    parseResultsLi(li);
                });
            };

            var initKeydown = function () {
                input.unbind('keydown').on('keydown', function (e) {
                		if(input.val() == ""){
                			$('#mbaa-result-address-autocomplete'+input_name).removeClass('mbaa-fill');
                		}
                    if (e.keyCode === 40) {
                        if (chosen === "") {
                            chosen = 0;
                        } else if ((chosen + 1) < results.find('li').length) {
                            chosen++;
                        }
                        results.find('li').removeClass('selected');
                        results.find('li:eq(' + chosen + ')').addClass('selected');
                        return false;
                    }
                    if (e.keyCode === 38) {
                        if (chosen === "") {
                            chosen = 0;
                        } else if (chosen > 0) {
                            chosen--;
                        }
                        results.find('li').removeClass('selected');
                        results.find('li:eq(' + chosen + ')').addClass('selected');
                    }
                });
            };

            var parseResultsLi = function (li) {
                li.on('click', function () {
                    var id = $(this).data('id');
                    $.each(features, function (index, feature) {
                        if (feature.id === id) {
                            var object = parseFoundResult(feature);
                            $('input[name="mbaa-found-address"]').val(JSON.stringify(object));
                            results.removeClass('mbaa-fill');
                            input.val(object.formatted_address)
                                .removeClass('mbaa-address-autocomplete')
                                .trigger('mapboxAutocomplete.found.address', [object, feature]);
                        }
                    });
                });
            };

            var initEnter = function () {
                input.on('keydown', function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        var id = results.find('li.mbaa.selected').data('id');
                        if(id == undefined && input.val() != ''){
	                          var input_val = input.val();
	                          $( "li.mbaa" ).each(function( index ) {
	                            var current_text = $( this ).text() ;
	                            if(current_text.search(input_val) != -1){
	                              id = $(this).attr('id');
	                              input.val($( this ).text())
	                              return false;
	                            }
	                          });
	                      }
	                      if(id == undefined && input.val() != ''){
	                          id = results.find('li.mbaa:first').data('id');
	                      }
	                      if(input.val() == ''){
	                      	return false;
	                      }
                        $.each(features, function (index, feature) {
                            if (feature.id === id) {
                                var object = parseFoundResult(feature);
                                $('input[name="mbaa-found-address"]').val(JSON.stringify(object));
                                results.removeClass('mbaa-fill');
                                input.val(object.formatted_address)
                                    .removeClass('mbaa-address-autocomplete')
                                    .trigger('mapboxAutocomplete.found.address', [object, feature]);
                            }
                        });
                    }
                });
            };

            var parseFoundResult = function (feature) {
                var street = feature.place_name.split(', ')[0];
                var street_number = feature.address;
                street = street.replace(street_number + ' ', '');

                var object = {
                    point: {
                        lat: feature.center[1],
                        long: feature.center[0]
                    },
                    formatted_address: feature.place_name,
                    region: '',
                    country: '',
                    city: '',
                    zipcode: '',
                    street: street,
                    number: street_number
                };
                if(feature.context != undefined){
	                $.each(feature.context, function (i, c) {
	                    if (c.id.indexOf("place") >= 0) {
	                        object.city = c.text;
	                    } else if (c.id.indexOf("postcode") >= 0) {
	                        object.zipcode = c.text;
	                    } else if (c.id.indexOf("region") >= 0) {
	                        object.region = c.text;
	                    } else if (c.id.indexOf("country") >= 0) {
	                        object.country_long = c.text;
	                        object.country = c.short_code;
	                    }
	                });
                }
                return object;
            };

            var init = function (options) {
                /*wrapper.css('width', options.width);
                input.css('width', options.width);*/
                results.css('width', options.width);
                wrapper.find('ul.mbaa-results-list').css('z-index', options.zindex);
                input.on('keyup', function (e) {
                    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13) {
                        return;
                    }
                    if(input.val() == ""){
                			$('#mbaa-result-address-autocomplete'+input_name).removeClass('mbaa-fill');
                			return;
                		}
                    chosen = '';
                    var query = $(this).val();
                    var url = parseQuery(query, options);
                    //$.get(url, function (response) {
                    	$.ajax({
                    		crossOrigin: true,
                    		url: url,
                    		success: function(response) {
                    			console.log("response",response);
                        input.addClass('mbaa-address-autocomplete');
                        results.find('li.mbaa').remove();
                        results.addClass('mbaa-fill');

                        if (response.features) {
                            features = response.features;
                            parseResults();
                        }
                    }
                    });
                });
            };

            initKeydown();
            initEnter();
            init(this.settings);
        }
    };

    $.fn[pluginName] = function (options) {
        var args = $.makeArray(arguments),
            after = args.slice(1);

        return this.each(function () {

            var instance = $.data(this, pluginName);

            if (instance) {
                if (instance[options]) {
                    instance[options].apply(instance, after);
                } else {
                   // $.error('Method ' + options + ' does not exist on Plugin ?');
                }
            } else {
                // create the plugin
                var plugin = new Plugin(this, options);

                // Store the plugin instance on the element
                $.data(this, pluginName, plugin);
                return plugin;
            }
        });
    };


})(jQuery);