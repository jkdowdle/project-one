Template.login.events({
	'submit form': function (event) {
		event.preventDefault();

		var emailInput = $('[name=login-email]').val();
		var passwordInput = $('[name=login-password]').val();

		Meteor.loginWithPassword(emailInput, passwordInput, function(error){
			if(error){
				console.log(error.reason);
			} else {
				$('.login-modal').modal('hide');
				$('[name=login-email]').val('');
				$('[name=login-password]').val('');
			}
		});

	}
});