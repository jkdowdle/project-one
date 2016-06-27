Meteor.methods({
	'contactUsEmail': message => {
		console.log(message);
		
		Email.send({
			to: 'contact-us@flueint.com',
			from: message.email,
			subject: message.name + ' - ' + message.subject,
			text: message.content
		}, error => {
			if (error) {
				Bert.alert(error.reason, 'danger');
			}
		});
	}
});
