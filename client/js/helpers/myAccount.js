Template.myAccount.helpers({
	myAccount() {
		return Meteor.user();
	},
	myEmail() {
		if (Meteor.user()) {
			return Meteor.user().emails[0].address;
		}		
	}
});