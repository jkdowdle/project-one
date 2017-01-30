import { authenticate } from './authenticate';

Router.route('/schedule', {
	name: 'schedule',
	template: 'schedule',
	data: function() {
		let currentUser = Meteor.userId();
		return Accounts.users.findOne(currentUser);
	},
	waitOn: function () {
		let currentUser = Meteor.userId(),
			roles = Accounts.users.findOne(currentUser)
				&& Accounts.users.findOne(currentUser).roles;

		let student = $.inArray('student', roles),
			teacher = $.inArray('teacher', roles),
			admin = $.inArray('admin', roles);

		if (student == 0){
			return [
				Meteor.subscribe('events', 'student', currentUser),
				Meteor.subscribe('teachers')
			];
		}

		if (teacher == 0){
			let	rosterId = Meteor.users.findOne(currentUser)
					&& Meteor.users.findOne(currentUser).profile
					&& Meteor.users.findOne(currentUser).profile.rosterId;

			return [
				Meteor.subscribe('events', 'teacher', currentUser),
				Meteor.subscribe('teachersStudents', rosterId)
			];
		}

		if (admin == 0) {
			return [
				Meteor.subscribe('events', 'admin', currentUser),
				Meteor.subscribe('adminGetAll', 'teacher'),
				Meteor.subscribe('adminGetAll', 'student')
			]
		}
	},
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Flueint Appointment Manager | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Manage your appoinments through the Flueint Scheduler."
		});
	},
	before: [ authenticate.loggedIn ]
});
