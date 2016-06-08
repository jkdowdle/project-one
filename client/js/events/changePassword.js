Template.changePassword.events({
	'submit form': function (event) {
		event.preventDefault();

		var currentUser = Meteor.userId();
		var oldPassword = $('[name=oldPassword]').val();
		var newPassword = $('[name=newPassword]').val();
		var verifyPassword = $('[name=verifyNewPassword]').val();

		if (verifyPassword == newPassword) {
			console.log( verifyPassword + newPassword + oldPassword);
			Accounts.changePassword(oldPassword, newPassword);
		} else {
			window.alert("!! passwords do not match!")
		}

		Router.go('myAccount');
	}
});