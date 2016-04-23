var Sequences = {};
var Questions = {};
var sequencesLoaded = false;
$(document).ready( function(){
	
});

function loadJSON(eventType){
	$.getJSON("questionFiles/" + eventType.id + ".json", function(data){
		generateModals(data);

	});


}

function generateModals(data){
	console.log(data);
	Questions = data.Questions;
	for (int i = 0; )
}

function nextQuestion(){

}

function previousQuestion(){

}