Template.schedule.helpers({
	lowCredits() {
		let currentUser = Meteor.userId(),
			creditAmount = Accounts.users.findOne(currentUser).profile.credits;

		if (creditAmount < 5){
			return 'credit-warning';
		}	
	}
});