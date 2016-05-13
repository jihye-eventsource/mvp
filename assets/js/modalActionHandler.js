$(document).ready(function(){
	//This is for radio
	$('.modal-body').each(function() {
		var radios = $(this);
		radios.find('input:radio').click(function() {
			if ($(this).hasClass('trigger')) {
				radios.find('.content').hide();
				radios.find('.' + $(this).data('rel')).show();
			}
			else {
				radios.find('.content').hide();
				radios.find('.' + $(this).data('rel')).hide();	
			}
		});
	});
});

function addTextBoxListener(){
	$('.modal-body').each(function() {
		var radios = $(this);
		radios.find('input:radio').click(function() {
			if ($(this).hasClass('trigger')) {
				radios.find('.content').hide();
				radios.find('.' + $(this).data('rel')).show();
			}
			else {
				radios.find('.content').hide();
				radios.find('.' + $(this).data('rel')).hide();	
			}
		});
	});
	$('.datetimepicker-calendar').datetimepicker({
		inline: true,
		format: 'YYYY-MM-DD'
	});

	$('form').submit(function(ev) {
		nextQuestion();
		return false;
	});
}