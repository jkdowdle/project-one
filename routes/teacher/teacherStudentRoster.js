import { authenticate } from '../authenticate';

Router.route('/student-roster/', {
	name: 'teacherStudentRoster',
	template: 'teacherStudentRoster',
	waitOn: function() {
		let userId = Meteor.userId(),
			rosterId = Meteor.users.findOne(userId) 
				&& Meteor.users.findOne(userId).profile 
				&& Meteor.users.findOne(userId).profile.rosterId;

		return Meteor.subscribe('teachersStudents', rosterId);
	},
	before: [ authenticate.loggedIn, authenticate.teacher ]
});