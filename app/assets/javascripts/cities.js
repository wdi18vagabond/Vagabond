/* Custom ready function is required for jQuery click events to work after page render.  Turbolinks disables full page load.  */
var ready;
var address = $('#city_name h2').text();
var $address_bar = $('#city_name h2');
var vagabond_map = {};
var map;
var markers = [];
var places;
var geocoder;

var $stories_list = $('#stories_list');
var $stories_title = $('#title');
var $stories_body = $('#body');


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
    vagabond_map.current_markers = [];

    var bounds = new google.maps.LatLngBounds();

    self.places.forEach(function (v, i) {
      for(key in v) {
        if (key === "name") {
          vagabond_map.current_markers.push({name : v[key]});
          //console.log(i);
        }
        if (key === "place_id") {
          vagabond_map.current_markers[i].place_id = v[key];
        }
      }
    });

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
        position: place.geometry.location,
        place_id: self.places[i].place_id,
        name: self.places[i].name
      });
      ///////
      google.maps.event.addListener(marker, 'click', function (e) {
        console.log('clicked');
        var that = this;
        console.log(that.position);
        console.log(that.title);
        console.log(that.name);
        console.log(that.place_id);
        var current_place = that.place_id;
        $address_bar.text(that.name);
        $stories_list.text('');

        $.get('/stories', {place_id: that.place_id}, function (res) {
          console.log(res);
          $.each(res, 
            function (i, index) {
              console.log(res[i].place_id);
              if (res[i].place_id === current_place) {

                $stories_list.prepend("<div class='stories_title'>" + res[i].title + "</div>" + "<div class='stories_body'>" + res[i].body + "</div>");

              }
            });
        });
      });

      self.markers.push(marker);
      //finish building vagabond_map.current_markers
      vagabond_map.current_markers[i].position = {};
      vagabond_map.current_markers[i].position['A'] = self.markers[i]["position"]["A"];
      vagabond_map.current_markers[i].position['F'] = self.markers[i]["position"]["F"];
      bounds.extend(place.geometry.location);
    }
    console.log('GOOGLE MAPS BELOW');
    console.log(google.maps);
   
    ///END OF MARKER LOOP
    console.log(vagabond_map.current_markers);
    self.map.fitBounds(bounds);
  }); 
  // END SEARCHBOX ON CHANGE LISTENER

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(vagabond_map.map, 'bounds_changed', function() {
    var bounds = vagabond_map.map.getBounds();
    self.search_box.setBounds(bounds);
  });
}// END map_search




