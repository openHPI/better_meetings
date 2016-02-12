$( document ).ready(function() {
  
	$( "#newMeetingModalSubmit" ).click(function() {

		var title = $("#meeting-title-input").val();
		var description = $("#meeting-description-textarea").val();
		var topics = $("#meeting-topics").children(":checked");
		var startTime = $("meeting-date-input").val();
		var timer = $("meeting-timer-input").val();
		var url = $("meeting-url-input").val();

		$.post( "meeting/create", { title: title, description: description, topics: topics, startTime: startTime, timer: timer, url: url } )
			.done( function( data ) {
				console.log( "Created Meeting: " + data );
			});
	});

	$( "#newMeetingseriesModalSubmit" ).click(function() {

		var title = $("#meeting-title-input").val();
		var description = $("#meeting-description-textarea").val();
		var timer = $("meeting-timer-input").val();
		var url = $("meeting-url-input").val();

		$.post( "meetingseries/create", { title: title, description: description, timer: timer, url: url } )
			.done( function( data ) {
				console.log( "Created Meetingseries: " + data );
			});
	});	

});