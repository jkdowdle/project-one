Meteor.startup(() => {

	process.env.MAIL_URL = "smtp://postmaster%40sandbox234048e4d3b647c6bfb9615d3a952819.mailgun.org:97420af15ba02c1416320bc1c1d0dea7@smtp.mailgun.org:587";

	if(Meteor.users.find().count() < 1) {
		var id = Accounts.createUser({
		  	email: 'admin@flueint.com',
		  	password: 'admin',
		  	profile: {name: 'Administrator'}
		});
		Roles.addUsersToRoles(id, 'admin');
	}
});
