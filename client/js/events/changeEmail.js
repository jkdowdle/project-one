Template.changeEmail.events({
	'submit form': function (event) {
		event.preventDefault();

		var currentUser = Meteor.userId();
		var emailChangedTo = $('[name=changeEmail]').val();
		var password = $('[name=passwordChangeEmail]').val();
		var verifyPassword = $('[name=verifyChangeEmail]').val();
		var digest = Package.sha.SHA256(password);

		console.log(password+verifyPassword);
/*
		if (verifyPassword == password) {
			Meteor.call('changeEmail', currentUser, emailChangedTo, digest)		
		} else {
			alert('Passwords do not match!');
		}
*/	
	}
});
