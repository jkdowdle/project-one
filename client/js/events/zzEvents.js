/*
Template.register.events({
	'submit form': function (event) {
		event.preventDefault();

		var emailInput = $('[name=register-email]').val();
		var skypeInput = $('[name=register-skypeid]').val();
		var passwordInput = $('[name=register-password]').val();
		var passwordVerify = $('[name=register-password-verify]').val();
		var timezoneInput = $('[name=register-timezone] option:selected').val();
		var accountTypeInput = $('[name=account-type] option:selected').val();

		if( passwordVerify == passwordInput){
			if (accountTypeInput == 'student'){
				Meteor.call('createNewStudent', emailInput, skypeInput, passwordInput, timezoneInput, accountTypeInput);
			}
			else if ( accountTypeInput == 'teacher'){
				Meteor.call('createNewTeacher', emailInput, skypeInput, passwordInput, timezoneInput, accountTypeInput); 
			}
			else 
				window.alert("Account type is not set");
		} else {
			window.alert("The passwords do not match");
		}
	}
});

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

Template.navigation.events({
	'click .logout-btn': function (event) {
		event.preventDefault();

		Meteor.logout();

		Router.go('home');
	}
});

Template.editMyAccount.events({
	'submit form': function (event) {
		event.preventDefault();

		var currentUser = Meteor.userId();

		var editName = $('[name=editName]').val();
		var editTimezone = $('[name=editTimezone]').val();
		var editSkypeid = $('[name=editSkypeid]').val();
		var editGender = $('[name=editGender]:checked').val();

		Meteor.call('editAccountData', editName, editTimezone, editSkypeid, editGender);

		Router.go('myAccount');

	}
});

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
*/	/*
	}
});

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

Template.changeStudentsTeacher.events({
	'submit form': function (event) {
		event.preventDefault();

		var studentsId = $('[name=studentsId]').val();
		var changeTeacherTo = $('[name=editTeacher] option:selected').attr('data-teacherId');
		var newRosterId = TeachersRosters.findOne({ teacherId: changeTeacherTo })._id;

		Meteor.call('adminChangeTeacher', studentsId, changeTeacherTo, newRosterId);
		console.log('new Teacher ' + changeTeacherTo + ' students id ' + studentsId + ' new roster Id ' + newRosterId);
	}
});

*/