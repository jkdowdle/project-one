//Admin
import { authenticate } from '../authenticate';

Router.route('admin/students/', {
	name: 'listStudents',
	template: 'listStudents',
	data:{ 
		students: function() {
			return Accounts.users.find({"roles":"student"}, {sort: {rosterId: 1} });
		}
	},
	before: [ authenticate.loggedIn, authenticate.admin ]
});