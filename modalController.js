var questions = {};
var questionCount = 0;
var currentQuestion = 0;
var progress = 0;
var questionInnerHTML = [];
var defaultQuestion;

$(document).ready( function(){
	
});

function loadJSON(eventType){
	$.getJSON("questionFiles/" + eventType.id + ".json", function(data){
		generateModals(data);

	});
}

function generateModals(data){
	defaultQuestion = document.getElementById("modal-body").innerHTML;
	questionInnerHTML = [];
	questionInnerHTML.push(defaultQuestion);

	questionCount = data.TotalCount;
	questions = data.Questions;
	questionCount = questions.length;
	for (var i = 0; i<questions.length; i++){
		console.log(questions[i]);
		if(questions[i].Type == ("SingleWText")){
			console.log("here");
			generateSingleModal(questions[i]);

		}else if(questions[i].Type =="SingleWOTEXT"){

		}else if(questions[i].Type == "Calendar"){

		}else if(questions[i].Type == "Form"){

		};
	};
}

function nextQuestion(){
	
	if(questionCount>0 && currentQuestion<questionCount){
		currentQuestion++;
		document.getElementById("modal-body").innerHTML = questionInnerHTML[currentQuestion];
		setProgress();
	};
}

function previousQuestion(){
	if(questionCount>0 && currentQuestion>0){
		currentQuestion--;
		document.getElementById("modal-body").innerHTML = questionInnerHTML[currentQuestion];
		setProgress();
	};
}

function setProgress(){
	progress = currentQuestion/questionCount * 100;	
}


function generateSingleModal(q){
	var innerHTML = "<form>";
	innerHTML = innerHTML + generateModalTitle(q.Question);
	innerHTML = innerHTML + "<div class=\"funnel-buttons\"><button type=\"button\" class=\"btn btn-default next-button\" onclick=\"nextQuestion()\">Continue</button><p><a class=\"previous-button\" onclick=\"previousQuestion()\">>Previous Question</a></p> </div></form>";
	questionInnerHTML.push(innerHTML);
	console.log(innerHTML);
}

function generateCalendarModal(q){
	var innerHTML;
	questionInnerHTML.push(innerHTML);
}
function generateMultiModal(q){
	var innerHTML;
	questionInnerHTML.push(innerHTML);
}

function generateModalTitle(title){
	var x ="<h4 class=\"funnel-title\">"+ title + "</h4>";
	return x;
}

function generateSingleAnswer(answer){
	var x ="<div class=\"radio-wrapper\"><input type=\"radio\" name=\"rGroup\" value=\"6\" id=\"r6\" /><label class=\"radio\" for=\"r6\"><span>"+ answer + "</span></label></div>";
}