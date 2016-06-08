Template.changeEmail.helpers({
	myEmail() {
		return Meteor.user().emails[0].address;
	}
});