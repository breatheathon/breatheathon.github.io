// (function($){
//    Drupal.behaviors.intro_talk_map = {};
   
//    Drupal.behaviors.intro_talk_map.attach = function(context) {
//     var elemID = 'intro-talk-map-parent';
//     if (typeof Drupal.settings.geofieldMapComponent == 'undefined') {
//       Drupal.settings.geofieldMapComponent = new Object();
//     }

//     if (typeof Drupal.settings.geofieldMapComponent[elemID] == 'undefined') {
//       Drupal.settings.geofieldMapComponent[elemID] = new Object();
//       Drupal.settings.geofieldMapComponent[elemID].map = new Object();
//       Drupal.settings.geofieldMapComponent[elemID].geoData = new Object();
//       Drupal.settings.geofieldMapComponent[elemID].lat = new Object();
//       Drupal.settings.geofieldMapComponent[elemID].lng = new Object();
//     }

//     Drupal.settings.geofieldMapComponent[elemID].lat = "40.730610";
//     Drupal.settings.geofieldMapComponent[elemID].lng = "-73.935242";
//     var features = [{
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: [-77.032, 38.913]
//         },
//         properties: {
//           title: 'Mapbox',
//           description: 'Washington, D.C.'
//         }
//       },
//       {
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: [-122.414, 37.776]
//         },
//         properties: {
//           title: 'Mapbox',
//           description: 'San Francisco, California'
//         }
//       }];

//       var geodata = [];
//       geoData = {type : "FeatureCollection", features : features};
//       Drupal.settings.geofieldMapComponent[elemID].geoData = geoData;
//       Drupal.attachBehaviors();
//       console.log("avinash outisde");
//       Drupal.behaviors.geofieldMapComponent = {
//         attach: function(context, settings) {
//           console.log("avinash");
//           function createMapbox(g_map, mapId, layer_type){
//             console.log(mapId,g_map);

            /*mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0b2ZsaXZpbmciLCJhIjoiY2pzYmcwcHRrMGE2MjQ0bWx4amZrYWViaSJ9.NzokMCgsH55e1D7c8Lrrrg';
            var zoom = 9;
            
            var map = new mapboxgl.Map({
              container: mapId,
              style: 'mapbox://styles/mapbox/'+layer_type,
              center: [Drupal.settings.geofieldMapComponent[mapId].lng, Drupal.settings.geofieldMapComponent[mapId].lat],
              zoom: zoom
            });
            Drupal.settings.geofieldMapComponent[mapId].map = map;
            Drupal.settings.geofieldMapComponent[mapId].map.addControl(new mapboxgl.NavigationControl(), 'top-right');*/
            
            /*map.on('load', function () {
              createMapboxLayer(Drupal.settings.geofieldMapComponent[mapId].map);
              map.addControl(new mapboxgl.FullscreenControl());
              
              var view_html = '<div id="mapbox_view_menu" ><div class="mapbox_view_div mapbox_streets-v11" elemID ="'+mapId+'" layerId ="streets-v11" title="Show street map">Map</div><div class="mapbox_view_div mapbox_satellite-streets-v9" elemID ="'+mapId+'" layerId ="satellite-streets-v9" title="Show satellite imagery">Satellite</div></div>'
              $( "#"+mapId ).find("#mapbox_view_menu").remove();
              $( "#"+mapId ).prepend(view_html);
              $(".mapbox_"+layer_type).addClass('active');
              $(".mapboxgl-control-container .mapboxgl-ctrl-attrib").addClass("mapboxgl-compact");
              if(layout == 'take_location_from_course'){
                flyToStore(features[0],Drupal.settings.geofieldMapComponent[mapId].map);
                createPopUp(features[0],Drupal.settings.geofieldMapComponent[mapId].map);
              }
            });*/
            /*map.on('click', function (e) {
              var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
        
              if (!features.length) {
                  return;
              }
        
              var feature = features[0];
              //Use Feature and put your code
              // Populate the popup and set its coordinates
              // based on the feature found.
             flyToStore(feature,Drupal.settings.geofieldMapComponent[mapId].map);
              createPopUp(feature,Drupal.settings.geofieldMapComponent[mapId].map);
            });*/
          // }
      //     createMapbox(Drupal.settings.geofieldMapComponent[elemID].map, elemID, "streets-v11");
          
      //     function createPopUp(currentFeature,c_map) {
      //       var popUps = document.getElementsByClassName('mapboxgl-popup');
      //       // Check if there is already a popup on the map and if so, remove it
      //       if (popUps[0]) popUps[0].remove();
      
      //       var popup = new mapboxgl.Popup({ closeOnClick: false })
      //         .setLngLat(currentFeature.geometry.coordinates)
      //         .setHTML(currentFeature.properties.description )
      //         .addTo(c_map);
      //     }

      //     function flyToStore(currentFeature,f_map) {
      //       f_map.flyTo({
      //         center: currentFeature.geometry.coordinates,
      //         zoom: 11
      //       });
      //     }

      //     function createMapboxLayer(m_map){
      //       console.log(m_map);
      //       m_map.loadImage('/sites/all/themes/unity2/img/icon/mapbox-pin.png', function(error, image) {
      //      if (error) throw error;
      //      m_map.addImage('icon', image);
      //      m_map.addLayer({
      //              "id": "points",
      //              "type": "symbol",
      //              "source": {
      //                  "type": "geojson",
      //                  "data": Drupal.settings.geofieldMapComponent[elemID].geoData
      //              },
      //              "layout": {
      //                  "icon-image": "{icon}",
      //                  "text-field": "",
      //                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      //                  "text-offset": [0, -0.6],
      //                  "text-anchor": "top",
      //                  "icon-allow-overlap": true
      //              }
      //         });
      //      });
      //     }
      //   }
      // }

   //  loadSingleLocation();
   //  function loadSingleLocation(){
   //    mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0b2ZsaXZpbmciLCJhIjoiY2pzYmcwcHRrMGE2MjQ0bWx4amZrYWViaSJ9.NzokMCgsH55e1D7c8Lrrrg';
   //    var map = new mapboxgl.Map({
   //        container: 'intro-talk-map-parent',
   //        style: 'mapbox://styles/mapbox/streets-v11',
   //        center: [17.4951062, 78.4108432],
   //        zoom: 9
   //    });

   //    map.on('load', function() {
   //      map.loadImage(
   //        '/sites/all/themes/unity2/img/icon/mapbox-pin.png',
   //        function(error, image) {
   //            if (error) throw error;
   //              map.addImage('cat', image);
   //              map.addLayer({
   //              'id': 'points',
   //              'type': 'symbol',
   //              'source': {
   //              'type': 'geojson',
   //              'data': {
   //                  'type': 'FeatureCollection',
   //                  'features': [
   //                    {
   //                      'type': 'Feature',
   //                      'geometry': {
   //                        'type': 'Point',
   //                        'coordinates': [17.4951062, 78.4108432]
   //                      }
   //                    }
   //                  ]
   //                }
   //              },
   //              'layout': {
   //                'icon-image': '{icon}',
   //                "text-field": "",
   //                     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
   //                     "text-offset": [0, -0.6],
   //                     "text-anchor": "top",
   //                     "icon-allow-overlap": true
   //                }
   //              });
   //            }
   //        );
   //      });
   //    // map.flyTo({
   //    //     center: [17.4951062,78.4108432],
   //    //     essential: true, // this animation is considered essential with respect to prefers-reduced-motion
   //    //     zoom:10
   //    //   });
   //  }


    // function loadMultiLocation(){
    //   mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0b2ZsaXZpbmciLCJhIjoiY2pzYmcwcHRrMGE2MjQ0bWx4amZrYWViaSJ9.NzokMCgsH55e1D7c8Lrrrg';
    
    // }


    

    // map.on('load', function() {
    //     map.loadImage(
    //     '/sites/all/themes/unity2/img/icon/mapbox-pin.png',
    //     function(error, image) {
    //           if (error) throw error;
    //           map.addImage('Intro Talk', image);
    //           map.addLayer({
    //             'id': 'points',
    //             'type': 'symbol',
    //             'source': {
    //               'type': 'geojson',
    //               'data': {
    //                 'type': 'FeatureCollection',
    //                 'features': [
    //                     {
    //                       'type': 'Feature',
    //                       'properties': {
    //                         'message': 'Foo',
    //                         'iconSize': [60, 60]
    //                       },
    //                       'geometry': {
    //                       'type': 'Point',
    //                       'coordinates': [17.4951062, 78.4108432]
    //                       }
    //                     }
    //                   ]
    //               }
    //             },
    //             'layout': {
    //               'icon-image': 'Intro Talk',
    //               'icon-size': 1
    //             }
    //           });
    //       }
    //     );
    //   });
// }
// })( jQuery );