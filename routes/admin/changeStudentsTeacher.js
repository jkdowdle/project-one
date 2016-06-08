Router.route('admin/students/:_id/change-students-teacher', {
	name: 'changeStudentsTeacher',
	template: 'changeStudentsTeacher',
	data: function() {
		var studentId = this.params._id;
		var thisStudent = Accounts.users.findOne({_id: studentId});
		console.log(thisStudent);
		return thisStudent;
	}
});
