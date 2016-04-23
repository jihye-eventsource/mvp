var questions = {};
var questionCount = 0;
var currentQuestion = 0;
var progress = 0;
var question_Modal_Map{};
var defaultQuestion;

$(document).ready( function(){
	
});

function loadJSON(eventType){
	$.getJSON("questionFiles/" + eventType.id + ".json", function(data){
		generateModals(data);

	});
}

function generateModals(data){
	defaultQuestion = document.getElementById("modal-content").innerHTML;

	questionCount = data.TotalCount;
	questions = data.Questions;
	questionCount = questions.length;
	for (var q in questions){
		if(q.Type == "SingleWText"){

		}else if ( q.Type == "SingleWOTEXT"){

		}else if( q.Type == "Calendar"){

		}else if( q.Type == "Form"){

		}else if( q.Type == ""){

		}else if( q.Type == ""){

		}else if( q.Type == ""){
			
		}else if( q.Type == ""){
			
		}else if( q.Type == ""){
			
		}
	};

	nextQuestion();
}

function nextQuestion(){
	
	if(questionCount>0 && currentQuestion<questionCount){
		currentQuestion++;
		setProgress();
	};
}

function previousQuestion(){
	if(questionCount>0 && currentQuestion>0){
		currentQuestion--;
		setProgress();
	};
}

function setProgress(){
	progress = currentQuestion/questionCount * 100;	
}


function generateSingleModal(q){
	var innerHTML;
	questionModalMap[key(q)] = innerHTML;
}

function generateCalendarModal(q){
	var innerHTML;
	questionModalMap[key(q)] = innerHTML;
}
function generateMultiModal(q){
	var innerHTML;
	questionModalMap[key(q)] = innerHTML;
}

var key = function(obj){
	return 
}
