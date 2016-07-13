Template.buyCredits.helpers({
	showCredits() {
		let currentUser = Meteor.userId(),
			lowCredits = "",
			creditCount = Accounts.users.findOne(currentUser) 
				&& Accounts.users.findOne(currentUser).profile.credits;

		if (creditCount < 5) {
			lowCredits = 'credit-warning';
		}

		return {
			amount: creditCount,
			warning: lowCredits
		}
	}
});