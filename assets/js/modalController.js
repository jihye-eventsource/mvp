var QuestionData;

var questions = {};
var questionCount = 0;
var currentQuestion = 0;
var progress = 0;
var questionInnerHTML = [];
var defaultQuestion;
var answers = [];

$(document).ready( function(){
	defaultQuestion = document.getElementById("modal-body").innerHTML;
});

$("#myModal").on('hidden.bs.modal', function(){
	document.getElementById("modal-body").innerHTML = defaultQuestion;
	questionInnerHTML = [];
	currentQuestion = 0;
});

function loadJSON(eventType){
	$.getJSON("assets/jsonFiles/" + eventType.id + ".json", function(data){
		QuestionData=data;
		generateModals(data);
	});
}

function generateModals(data){
	questionInnerHTML = [];
	questionInnerHTML.push(defaultQuestion);
	document.getElementById("modal-body").innerHTML = questionInnerHTML[0];



	questionCount = data.TotalCount;
	questions = data.Questions;
	questionCount = questions.length;
	setProgress();
	currentQuestion = 0;
	for (var i = 0; i<questions.length; i++){
		if(questions[i].Type == ("SingleWText")){
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
	progress = (currentQuestion/questionCount * 100).toFixed(0);	
	var progressString = progress + "% completed";
	//document.getElementById("progBar").width = progress;
	document.getElementById("progBarText").innerHTML = progressString;
}

//============= General functions for all modal generators =============
function generateModalTitle(title){
	var x ="<h4 class=\"funnel-title\">"+ title + "</h4>";
	return x;
}

function generateModalEnding(){
	var x = "<div class=\"funnel-buttons\"><button type=\"button\" class=\"btn btn-default next-button\" onclick=\"nextQuestion()\">Continue</button><p><a class=\"previous-button\" onclick=\"previousQuestion()\">>Previous Question</a></p> </div></form>";
	return x;
}
//============= Functions for generating single answer modals (no textbox)=============
function generateSingleModal(q){
	var innerHTML = "<form>";
	innerHTML = innerHTML + generateModalTitle(q.Question);	
	innerHTML = innerHTML + "<div class=\"funnel-input radios\">";
	for(var i = 0; i<q.Choices.length; i++){
		innerHTML = innerHTML + generateSingleAnswer(q.Choices[i], i);
	}
	innerHTML = innerHTML + "<div class=\"funnel-input radios\">";
	innerHTML = innerHTML + generateModalEnding();
	questionInnerHTML.push(innerHTML);
}


function generateSingleAnswer(answer,number){
	//NEED TO CHANGE RADIO BUTTON IDS TO BE UNIQUE

	var x ="<div class=\"radio-wrapper\">"
	x = x + "<input type=\"radio\" name=\""+ QuestionData.Name+ questions[currentQuestion].OrderId +"\" value=\""+ number +"\" id=\"r" + number + "\" />"
	x = x + "<label class=\"radio\" for=\"r"+number+"\"><span>"+ answer + "</span></label></div>";
	return x;
}

//============= Functions for generating other modals=============

function generateCalendarModal(q){
	var innerHTML;
	questionInnerHTML.push(innerHTML);
}
function generateMultiModal(q){
	var innerHTML;
	questionInnerHTML.push(innerHTML);
}


