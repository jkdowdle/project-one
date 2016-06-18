Template.notAuthorized.events({
	'click .link-back': event => {
		event.preventDefault();
		history.back();
	}
});