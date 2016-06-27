Template.contactUs.events({
	'submit .form-contact-us': event => {
		event.preventDefault();
	}
});

Template.contactUs.onRendered(()=> {
	$('[data-toggle="popover"]').popover({
		trigger: 'focus',
		placement: 'auto left',
		template: '<div class="popover alert alert-danger" role="tooltip"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"><span class="sr-only">Error:</span></span><div class="popover-content"></div><div class="arrow"></div></div>'
	});

	$('.form-contact-us').validate({
		onkeyup: false,
		submitHandler: () => {
			let message = {
				name: $('[name=contactName]').val(),
				email: $('[name=contactEmail]').val(),
				subject: $('[name=contactSubject]').val(),
				content: $('[name=contactMessage]').val()
			};

			Meteor.call('contactUsEmail', message, error => {
				if (error) {
					Bert.alert(error.reason, 'danger');
				} else {
					Bert.alert('Message sent!', 'success');
					$('[name=contactName]').val('');
					$('[name=contactEmail]').val('');
					$('[name=contactSubject]').val('');
					$('[name=contactMessage]').val('');
				}
			}); 
		},
		rules: {
			contactName: {
				required: true
			},
			contactEmail: {
				required: true,
				email: true
			},
			contactSubject: {
				required: true
			},
			contactMessage: {
				required: true
			}
		},
		messages: {
			contactName: {
				required: "Enter your name."
			},
			contactEmail: {
				required: "Enter your email.",
				email: "Must be a valid email"
			},
			contactSubject: {
				required: "Enter a subject for this message."
			},
			contactMessage: {
				required: "Enter your message."
			}
		}
	});
});