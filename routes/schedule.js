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
			teacher = $.inArray('teacher', roles);

		if (student == 0){
			return Meteor.subscribe('events', 'student', currentUser);
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
	},
	before: [authenticate.loggedIn, authenticate.studentOrTeacher]
});