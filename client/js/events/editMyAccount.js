Template.editMyAccount.events({
	'submit form': function (event) {
		event.preventDefault();

		let currentUser = Meteor.userId(),
			editName = $('[name=editName]').val(),
			editTimezoneName = $('[name=editTimezone] option:selected').val(),
			editTimezoneOffset = $('[name=editTimezone] option:selected').attr('data-offset'),
			editSkypeid = $('[name=editSkypeid]').val(),
			editGender = $('[name=editGender]:checked').val();

		Meteor.call('editAccountData', editName, editTimezoneName, editTimezoneOffset, editSkypeid, editGender);

		Router.go('myAccount');
	},
	'click .btn-reset-password': () => {
		let confirm = window.confirm('Are you sure you want to reset your password?');

		if (confirm) {
			currentUser = Meteor.userId();
			Meteor.call('resetUsersPassword', currentUser);
		} else {
			console.log('cancel');
		}
	}
});
