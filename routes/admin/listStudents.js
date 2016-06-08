//Admin
Router.route('admin/students/', {
	name: 'listStudents',
	template: 'listStudents',
	data:{ 
		students: function() {
			return Accounts.users.find({"roles":"student"}, {sort: {rosterId: 1} });
		}
	}
});