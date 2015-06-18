/* Custom ready function is required for jQuery click events to work after page render.  Turbolinks disables full page load.  */
var ready;
var address = $('#city_name h2').text();
var vagabond_map = {};
var map;
var markers = [];
var places;
var geocoder;

vagabond_map.map = map;
vagabond_map.puppy = "http://www.lindyop.com/ESW/Images/puppy.png";
vagabond_map.markers = markers;
vagabond_map.geocoder = geocoder;
vagabond_map.address = address;
vagabond_map.places = places;
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
  this.map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    minZoom: 10,
    maxZoom: 16,
    zoomControl: false
  });
    this.map.setOptions({styles: this.styles});
    this.codeAddress();
};//END INITIALIZE

vagabond_map.codeAddress = function() {
  counter = 1;
	console.log('coding address' + counter);
  counter = counter + 1;
  console.log(address);
  var self = this;
  this.geocoder.geocode( { 'address': address}, function(results, status) {
      console.log(results);
      console.log(results[0].geometry.location["A"])
      console.log(results[0].geometry.location["F"])
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
  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.input);
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(self.search_box, 'places_changed', function() {
    self.places = self.search_box.getPlaces();

    if (self.places.length == 0) {
      return;
    }

    for (var i = 0, marker; marker = self.markers[i]; i++) {
      marker.setMap(null);
    }
    // For each place, get the icon, place name, and location.
    self.markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = self.places[i]; i++) {
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

      self.markers.push(marker);
      bounds.extend(place.geometry.location);
    }
    self.map.fitBounds(bounds);
    self.gather_places();
  }); // END SEARCHBOX ON CHANGE LISTENER


  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(vagabond_map.map, 'bounds_changed', function() {
    var bounds = vagabond_map.map.getBounds();
    self.search_box.setBounds(bounds);
  });
}// END map_search

vagabond_map.gather_places = function () {
  this.current_place_ids = [];
  this.current_markers = [];
  this.places.forEach(function (v, i) {
    for(key in v) {
      if (key === "name") {
        vagabond_map.current_place_ids.push({name : v[key]});
        //console.log(i);
      }
      if (key === "place_id") {
        vagabond_map.current_place_ids[i].place_id = v[key];
      }
    }
  });
  
  for (var i = 0, place; place = vagabond_map.places[i]; i++) {
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
    self.markers.push(marker);
    vagabond_map.current_markers.push({latitude : self.markers[i]["position"]["A"]});
    vagabond_map.current_markers[i].longitude = self.markers[i]["position"]["F"];
    //Optional for re rendering
    //bounds.extend(place.geometry.location);
  }
  console.log(this.current_place_ids, this.current_place_ids.length);
  console.log(this.current_markers, this.current_markers.length);
};


