// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require turbolinks
//= require_jquery-readyselector
//= require_tree ./

var ready;

$(document).ready(ready);
$(document).on('page:load', ready);

ready = function() {
	var sideslider = $('[data-toggle=collapse-side]');
	var sel = sideslider.attr('data-target');
	var sel2 = sideslider.attr('data-target-2');
	sideslider.click(function(event){
	  console.log('clicked');
	  $(sel).toggleClass('in');
	  $(sel2).toggleClass('out');
	  });
};

// function initialize() {

// 	var startLat = 37.776427;
// 	var startLong =  -122.424554;
// 	var mapOptions = {
// 	  center: new google.maps.LatLng(startLat, startLong),
// 	  maxZoom: 16,
// 	  minZoom: 12,
// 	  panControl: false,
// 	  scaleControl: false,
// 	  zoomControl: false
// 	}

//   var markers = [];
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   var styles = [
//             {
//               stylers: [
//                 { hue: "#235BA7" },
//                 { saturation: -10 }
//               ]
//             },{
//               featureType: "road",
//               elementType: "geometry",
//               stylers: [
//                 { lightness: 100 },
//                 { visibility: "simplified" }
//               ]
//             },{
//               featureType: "road",
//               elementType: "labels",
//               stylers: [
//                 { visibility: "off" }
//               ]
//             }
//   ];

//   map.setOptions({styles: styles});

//   var defaultBounds = new google.maps.LatLngBounds();

//   var defaultBounds = new google.maps.LatLngBounds(
//       new google.maps.LatLng(startLat, startLong),
//       new google.maps.LatLng(startLat, startLong));
//   map.fitBounds(defaultBounds);

//   // Create the search box and link it to the UI element.
//   var input = /** @type {HTMLInputElement} */(
//       document.getElementById('pac-input'));
//   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

//   var searchBox = new google.maps.places.SearchBox(
//     /** @type {HTMLInputElement} */(input));

//   // Listen for the event fired when the user selects an item from the
//   // pick list. Retrieve the matching places for that item.
//   google.maps.event.addListener(searchBox, 'places_changed', function() {
//     var places = searchBox.getPlaces();

//     if (places.length == 0) {
//       return;
//     }
//     for (var i = 0, marker; marker = markers[i]; i++) {
//       marker.setMap(null);
//     }

//     // For each place, get the icon, place name, and location.
//     markers = [];
//     var bounds = new google.maps.LatLngBounds();
//     for (var i = 0, place; place = places[i]; i++) {
//       var image = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };

//       // Create a marker for each place.
//       var marker = new google.maps.Marker({
//         map: map,
//         icon: image,
//         title: place.name,
//         position: place.geometry.location
//       });

//       markers.push(marker);

//       bounds.extend(place.geometry.location);
//     }

//     map.fitBounds(bounds);
//   });

//   // Bias the SearchBox results towards places that are within the bounds of the
//   // current map's viewport.
//   google.maps.event.addListener(map, 'bounds_changed', function() {
//     var bounds = map.getBounds();
//     searchBox.setBounds(bounds);
//   });
// }
