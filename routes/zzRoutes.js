/*
Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	name: 'home',
	template: 'home'
});

Router.route('/account-info/', {
	name: 'myAccount',
	template: 'myAccount'
});

Router.route('/account-info/edit', {
	name: 'editAccountInfo',
	template: 'editMyAccount'
});

Router.route('/account-info/edit/change-email', {
	name: 'changeEmail',
	template: 'changeEmail'
});

Router.route('/account-info/edit/change-password', {
	name: 'changePassword',
	template: 'changePassword'
});

// Teacher Routes

Router.route('/student-roster/', {
	name: 'teacherStudentRoster',
	template: 'teacherStudentRoster'
});

Router.route('/schedule', {
	name: 'schedule',
	template: 'schedule'
})

// Admin Routes

Router.route('/admin/teachers', {
	name: 'listTeachers',
	template: 'adminListTeachers',
	data: {
		teachers: function () {
			return Accounts.users.find({"roles":"teacher"}, { sort: { createdAt: 1 } });
		}
	}		
});

Router.route('/admin/teachers/:_id/students-of', {
	name: 'adminTeachersStudents',
	template: 'adminTeachersStudents',
	data: function() {
		var teacherId = this.params._id;
		var currentTeacher = Accounts.users.findOne({_id: teacherId});
		return currentTeacher;
	}
});

Router.route('admin/students/', {
	name: 'listStudents',
	template: 'listStudents',
	data:{ 
		students: function() {
			return Accounts.users.find({"roles":"student"}, {sort: {rosterId: 1} });
		}
	}
});

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
*/