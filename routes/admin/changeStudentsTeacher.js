import { authenticate } from '../authenticate';

Router.route('admin/students/:_id/change-students-teacher', {
	name: 'changeStudentsTeacher',
	template: 'changeStudentsTeacher',
	isInRole: 'admin',
	waitOn: function () {
		let studentId = this.params._id;
		return [
			Meteor.subscribe('studentWithTeachers', studentId),
			Meteor.subscribe('adminGetAll', 'teacher'),
			Meteor.subscribe('teachersRosters')
		];
	},
	data: function() {
		var studentId = this.params._id;
		var thisStudent = Accounts.users.findOne({_id: studentId});
		console.log(thisStudent);
		return thisStudent;
	},
	before: [ authenticate.loggedIn, authenticate.admin ]
});