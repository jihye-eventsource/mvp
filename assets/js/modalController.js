var QuestionData;

var questions = {};
var questionCount = 0;
var currentQuestion = 0;
var progress = 0;
var questionInnerHTML = [];
var defaultQuestion;
var answers = [];
var textBoxes = [];

$(document).ready( function(){
});

$("#myModal").on('hidden.bs.modal', function(){
	questionInnerHTML = [];
	currentQuestion = 0;
});

function loadJSON(eventType){
	$.getJSON("assets/jsonFiles/" + eventType.id + ".json", function(data){
		console.log("here");
		QuestionData=data;
		generateModals(data);
	});
}

function resetAll(){
	questionInnerHTML = [];
	questionCount = 0;
	progress = 0;
	currentQuestion = 0;
	answers = [];
	textBoxes = [];
}

function generateModals(data){
	generateTextBoxes
	questionCount = data.TotalCount;
	questions = data.Questions;
	questionCount = questions.length;
	setProgress();
	for (var i = 0; i<questions.length; i++){
		if(questions[i].Type == ("SingleWText")){
			generateSingleModal(questions[i]);

		}else if(questions[i].Type =="SingleWOTEXT"){

		}else if(questions[i].Type == "Calendar"){

		}else if(questions[i].Type == "Form"){

		};

		if(i ==0){
			//Load first while rest of questions are still loading
			document.getElementById("modal-body").innerHTML = questionInnerHTML[0];
		}
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
//============= Functions for generating single answer modals w/ or w/o textbox=============
function generateSingleModal(q){
		var innerHTML = "<form>";
	innerHTML = innerHTML + generateModalTitle(q.Question);	
	innerHTML = innerHTML + "<div class=\"funnel-input radios form-group\">";
	for(var i = 0; i<q.Choices.length; i++){
		innerHTML = innerHTML + generateSingleAnswer(q.Choices[i], i);
	}
	if(textBoxes.length > 0){
		innerHTML = innerHTML + "</div>";
	}

	for(var i = 0; i<textBoxes.length; i++){
		innerHTML = innerHTML + (generateTextBoxes(textBoxes[i]));
	}
	innerHTML = innerHTML + "</div>";
	innerHTML = innerHTML + generateModalEnding();
	questionInnerHTML.push(innerHTML);
}

function generateSingleAnswer(answer,number){
	//NEED TO CHANGE RADIO BUTTON IDS TO BE UNIQUE
	var name = QuestionData.Name+ questions[currentQuestion].OrderId;
	name = name.replace(/\s/g, '');

	if(answer.indexOf("==") < 0){
		var x ="<div class=\"radio-wrapper\">";
		x = x + "<input type=\"radio\" name=\""+ name +"\" value=\""+ number +"\" id=\"r" + number + "\" \/>";
		x = x + "<label class=\"radio\" for=\"r"+number+"\"><span>"+ answer + "</span></label></div>";
		return x;
	}
	else{
		var newAnswer = answer.split("==")[0];
		textBoxes.push(name);
		var x ="<div class=\"radio-wrapper\">";
		x = x + "<input type=\"radio\" name=\""+ name +"\" value=\""+ number +"\" id=\"r" + number + "\" class=\"trigger\" data-rel=\""+ name +"\" \/>";
		x = x + "<label class=\"radio\" for=\"r"+number+"\"><span>"+ newAnswer + "</span></label></div>";
		return x;
	};
}

function generateTextBoxes(dataRel){

	var html = ("<div class=\"funnel-input\">");
	html = html + ("<textarea class=\"text-input " + dataRel + " content\" placeholder=\"Please explain\"></textarea>");
	html = html + ("</div>");
	return html;
}

//============= Functions for generating single answer modals with textbox=============





//============= Functions for generating other modals=============

function generateCalendarModal(q){
	var innerHTML;
	questionInnerHTML.push(innerHTML);
}
function generateMultiModal(q){
	var innerHTML;
	questionInnerHTML.push(innerHTML);
}