import { authenticate } from '../authenticate';

Router.route('/admin/teachers/:_id/students-of', {
	name: 'adminTeachersStudents',
	template: 'adminTeachersStudents',
	waitOn: function() {
		let teacherId = this.params._id;
		return [
			Meteor.subscribe('adminGetAll', 'teacher'),
			Meteor.subscribe('studentsOf', teacherId)
		];
	},
	data: function() {
		var teacherId = this.params._id;
		var currentTeacher = Accounts.users.findOne({_id: teacherId});
		return currentTeacher;
	},
	before: [ authenticate.loggedIn, authenticate.admin ]
});