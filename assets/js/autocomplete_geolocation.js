

function initGeolocationAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
  	/** @type {!HTMLInputElement} */(document.getElementById('input-location-autocomplete')),
  	{types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}
