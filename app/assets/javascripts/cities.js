/* Custom ready function is required for jQuery click events to work after page render.  Turbolinks disables full page load.  */
var ready;
var address = $('#city_name h2').text();
var vagabond_map = {};
var map;
var geocoder;

vagabond_map.map = map;
vagabond_map.geocoder = geocoder;
vagabond_map.address = address;
vagabond_map.styles = [
            {
              stylers: [
                { hue: "#235BA7" },
                { saturation: -10 }
              ]
            },{
              featureType: "road",
              elementType: "geometry",
              stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
              ]
            },{
              featureType: "road",
              elementType: "labels",
              stylers: [
                { visibility: "off" }
              ]
            }
  ];

vagabond_map.ready = function() {
  console.log(address, "THIS IS THE ADDRESS")
  vagabond_map.input = (document.getElementById('pac-input'));
  vagabond_map.search_box = new google.maps.places.SearchBox((this.input));
  this.initialize();
};

vagabond_map.initialize = function() {
	this.geocoder = new google.maps.Geocoder();
	var startLat = 37.776427;
	var startLong =  -122.424554;

  this.map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    minZoom: 10,
    maxZoom: 16,
    zoomControl: false
  });

    this.map.setOptions({styles: this.styles});
    this.codeAddress();
    //map_search();
} //END INITIALIZE

vagabond_map.codeAddress = function() {
  counter = 1;
	console.log('coding address' + counter);
  counter = counter + 1;
  console.log(address);
  var self = this;
  this.geocoder.geocode( { 'address': address}, function(results, status) {
      console.log(results);
      self.map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: vagabond_map.map,
          position: results[0].geometry.location
      });
  });
  this.map_search();
};
//////////////////////////////////////////////////////

vagabond_map.map_search = function() {

  var self = this;
  var markers = [];
  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.input);
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(self.search_box, 'places_changed', function() {
    var places = self.search_box.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }
    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: vagabond_map.map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
      //push these into the marker array
      markers.push(marker);
      bounds.extend(place.geometry.location);
    }
    self.map.fitBounds(bounds);
  }); // END SEARCHBOX ON CHANGE LISTENER
  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(vagabond_map.map, 'bounds_changed', function() {
    var bounds = vagabond_map.map.getBounds();
    self.search_box.setBounds(bounds);
  });
}


