Template.blog.helpers({
		usersTimezone() {
			if (Meteor.user()){
				let currentUser = Meteor.userId(),
					timezone = Accounts.users.findOne(currentUser).profile.timezone.name;
				return timezone;
			}			
		}
});