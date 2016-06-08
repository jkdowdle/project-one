Router.route('/admin/teachers/:_id/students-of', {
	name: 'adminTeachersStudents',
	template: 'adminTeachersStudents',
	data: function() {
		var teacherId = this.params._id;
		var currentTeacher = Accounts.users.findOne({_id: teacherId});
		return currentTeacher;
	}
});