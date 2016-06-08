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