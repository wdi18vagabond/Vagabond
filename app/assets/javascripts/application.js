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
//= require_tree ./
//= require_jquery-readyselector

/* Custom ready function is required for jQuery click events to work after page render.  Turbolinks disables full page load.  */
var ready;
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

$(document).ready(ready);
$(document).on('page:load', ready);