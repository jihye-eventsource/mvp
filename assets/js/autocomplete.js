var eventTypeList;

$(document).ready(function(){
	$.getJSON("assets/jsonFiles/eventTypeList.json", function(data){
		eventTypeList=data.EventTypes;
		$('#input-service-autocomplete').typeahead({
			source: eventTypeList
		});
	});
});