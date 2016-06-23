Template.buyCredits.events({
	'submit form': event => {
		event.preventDefault();

		let creditAmmount = $('[name=creditAmount]').val();

		Meteor.call('buyCredits', creditAmmount);
	}
})