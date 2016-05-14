function sendEmail(sendData){
	var postObj = new Object();
	postObj.api_user = 'azure_f0f9fe015c157571b87092e53fe75ca8@azure.com';
	postObj.api_key = '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'; 
	postObj.to= 'chuan1994@hotmail.com';
	postObj.toname = 'Lachlan Crane';
	postObj.bcc = 'jihye@eventsource.co.nz';
	postObj.subject = 'Event Source Request';
	postObj.text = sendData;
	postObj.from = 'donotreply@eventsource.co.nz'; 

	$.ajax({
		url: "https://api.sendgrid.com/api/mail.send.json",
		type: 'POST',
        data: postObj,
        async: false,
        success: function (data) {
          alert(data)
        },
        crossdomain:true,
        cache: false,
        contentType: false,
        processData: false
	});
}
