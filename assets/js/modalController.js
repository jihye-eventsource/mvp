var QuestionData;

var questions = {};
var questionCount = 0;
var currentQuestion = 0;
var progress = 0;
var questionInnerHTML = [];
var defaultQuestion;
var textBoxes = [];

$(document).ready( function(){

});

$("#myModal").on('hidden.bs.modal', function(){
	questionInnerHTML = [];
	currentQuestion = 0;
});

function loadJSON(eventType){
	$.getJSON("assets/jsonFiles/" + eventType.id + ".json", function(data){
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
	resetAll();
	questions = data.Questions;
	questionCount = questions.length - 1;
	setProgress();
	for (var i = 0; i<questions.length; i++){
		if(questions[i].Type == ("SingleWText")){
			generateSingleModal(questions[i]);
			textBoxes = [];

		}else if(questions[i].Type == "DateTimePicker"){
			generateCalendarModal(questions[i]);

		}else if(questions[i].Type == "ContactInfo"){
			generateContactModal(questions[i]);

		}else if(questions[i].Type == "TextBox"){
			generateTextBoxModal(questions[i]);
		};

		if(i == 0){
			document.getElementById("modal-body").innerHTML = questionInnerHTML[0];
			addTextBoxListener();

		}
	};
}

function nextQuestion(){

	saveAnswer();
	questionInnerHTML[currentQuestion] = document.getElementById("modal-body").innerHTML;

	if(questionCount > 0 && currentQuestion<questionCount){
		currentQuestion++;
		document.getElementById("modal-body").innerHTML = questionInnerHTML[currentQuestion];
		setProgress();
		addTextBoxListener();
	}
	else if (currentQuestion == questionCount) {
		$('#myModal').modal('toggle');
		alert("Thank you for your enquiry! Our friendly event planners will contact you shortly.");

	};
}

function previousQuestion(){
	if(questionCount>0 && currentQuestion>0){
		currentQuestion--;
		document.getElementById("modal-body").innerHTML = questionInnerHTML[currentQuestion];
		setProgress();
		addTextBoxListener();
	};
}

function saveAnswer() {

	var answers = [];

	//Iterate through each radio
	$("form input[type='radio']:checked").each(function(){
		var input = $(this).val();
		if (input) {
			answers.push(input);
		}
	});


	$("form input[type='text']").each(function(){
		var input = $(this).val();
		if (input) {
			answers.push(input);
		}
	});

	$("form textarea").each(function(){
		console.log(this);
		var input = $(this).val();
		if (input) {
			answers.push(input);
		}
	});

	questions[currentQuestion].Answer = answers;
	console.log(answers);
}

function setProgress(){
	progress = (currentQuestion/(questionCount + 1) * 100).toFixed(0);	
	var progressString = progress + "% completed";
	//document.getElementById("progBar").width = progress;progBar
	document.getElementById("progBarText").innerHTML = progressString;
	document.getElementById("progBar").style.width = progress + "%";
}

//============= General functions for all modal generators =============
function generateModalTitle(title){
	var x ="<h4 class='funnel-title'>"+ title + "</h4>";
	return x;
}

function generateModalEnding(){
	var x = "<input type='submit' class='btn btn-default next-button' value='Continue'/><div class='funnel-buttons'><p><a class='previous-button' onclick='previousQuestion()'>Previous Question</a></p> </div></form>";
	return x;
}
//============= Functions for generating single answer modals w/ or w/o textbox=============
function generateSingleModal(q){
	var innerHTML = "<form>";
	innerHTML = innerHTML + generateModalTitle(q.Question);	
	innerHTML = innerHTML + "<div class='funnel-input radios form-group'>";
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
		var x ="<div class='radio-wrapper'>";
		x = x + "<input type='radio' name='" + name +"' value=\""+ answer +"\" id='r" + number + "' required/>";
		x = x + "<label class='radio' for='r"+number+"'><span>"+ answer + "</span></label></div>";
		return x;
	}
	else{
		var newAnswer = answer.split("==")[0];
		textBoxes.push(name);
		var x ="<div class='radio-wrapper'>";
		x = x + "<input type='radio' name='"+ name +"' value='"+ number +"' id='r" + number + "' class='trigger' data-rel='"+ name +"' required/>";
		x = x + "<label class='radio' for='r"+number+"'><span>"+ newAnswer + "</span></label></div>";
		return x;
	};
}

function generateTextBoxes(dataRel){

	var html = ("<div class='funnel-input'>");
	html = html + ("<textarea class='text-input " + dataRel + " content' placeholder='Please explain'></textarea>");
	html = html + ("</div>");
	return html;
}

//============= Functions for generating single answer modals with textbox=============

function generateCalendarModal(q){
	var name = QuestionData.Name+ questions[currentQuestion].OrderId;

	var innerHTML = "<form id='form-" + name + "'><h4 class='funnel-title'>Do you know when your event will be on?</h4><div class='funnel-input radios'><div class='radio-wrapper'>";
	innerHTML = innerHTML + "<input type='radio' name='" + name + "' value='yes' id='ryes' class='trigger' data-rel='radio-yes-calendar' required/>";
	innerHTML = innerHTML + "<label class='radio' for='ryes'><span>Yes</span></label></div><div class='radio-wrapper'>";
	innerHTML = innerHTML + "<input type='radio' name='"+ name +"' value='not-yet' id='rno' /><label class='radio' for='rno'><span>Not yet</span></label>";
	innerHTML = innerHTML + "</div></div> <div class='funnel-input datetimepicker radio-yes-calendar content'><div class='row'>";
	innerHTML = innerHTML + "<div class='form-group col-md-6'><p class='text-big'>Start Date</p><div class='datetimepicker-calendar' id='"+name+"datetimepicker12'></div></div>";
	innerHTML = innerHTML + "<script type='text/javascript'>$function(){$('#"+name+"datetimepicker12').datetimepicker({inline: true,format: 'YYYY-MM-DD'});});</script>";
innerHTML = innerHTML + "<div class='form-group col-md-6'><p class='text-big'>End Date</p><div class='datetimepicker-calendar' id='"+name+"datetimepicker13'></div>";
innerHTML = innerHTML + "</div><script type='text/javascript'>$(function () {$('#"+name+"datetimepicker13').datetimepicker({inline: true,";
	innerHTML = innerHTML + "format: 'YYYY-MM-DD'});});</script></div></div><div class='funnel-buttons'><input type='submit' class='btn btn-default next-button' value='Continue'/>";
innerHTML = innerHTML + "<p><a class='previous-button' onclick='previousQuestion()'>Previous Question</a></p></div></form>";
questionInnerHTML.push(innerHTML);
}

function generateContactModal(q){
	var name = QuestionData.Name+ questions[currentQuestion].OrderId;
	var innerHTML = "<form id='form-" + name + "'>" +
	"<h4 class='funnel-title'>" + generateModalTitle(q.Question) + "</h4>" +
	"<div class='funnel-input'>" +
	"<div class='row'>" +
	"<div class='form-group textbox col-sm-6'>" +
	"<input type='text' placeholder='First name' required/>" +
	"</div>" +
	"<div class='form-group textbox col-sm-6'>" +
	"<input type='text' placeholder='Last name' required/>" +
	"</div>" +
	"</div>" +
	"<div class='row'>" +
	"<div class='form-group textbox col-sm-6'>" +
	"<input type='email' placeholder='Email' required/>" +
	"</div>" +
	"<div class='form-group textbox col-sm-6'>" +
	"<input type='tel' placeholder='Phone' required/>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"<div class='funnel-buttons'>" +
	"<input type='submit' class='btn btn-default next-button' value='Submit'/>" +
	"<p><a class='previous-button' onclick='previousQuestion()'>Previous Question</a></p>" +
	"</div>" +
	"</form>";

	questionInnerHTML.push(innerHTML);
}
function generateTextBoxModal(q){
	var name = QuestionData.Name+ questions[currentQuestion].OrderId;
	var innerHTML = "<form id='form-" + name + "'>" + generateModalTitle(q.Question) + "<div class='funnel-input'><textarea style='display: inline;' class='text-input " + name+" content' placeholder='Please explain' required></textarea></div>";
	innerHTML = innerHTML + generateModalEnding() + "</form>";
	questionInnerHTML.push(innerHTML);
}


