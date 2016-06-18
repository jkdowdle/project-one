Template.pageNotFound.events({
	'click .link-back': event => {
		event.preventDefault();
		history.back();
	}
});