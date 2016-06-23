//Admin
import { authenticate } from '../authenticate';

Router.route('admin/students/', {
	name: 'listStudents',
	template: 'listStudents',
	waitOn: function () {
		return Meteor.subscribe('adminGetAll', 'student');
	},
	data:{ 
		students: function() {
			return Accounts.users.find({"roles":"student"}, {sort: {rosterId: 1} });
		}
	},
	before: [ authenticate.loggedIn, authenticate.admin ]
});