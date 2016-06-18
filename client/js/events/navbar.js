Template.navbar.events({
	'click .logout-btn': function (event) {
		event.preventDefault();

		Meteor.logout();

		Router.go('home');
	}
});