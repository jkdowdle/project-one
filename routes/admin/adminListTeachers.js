// Admin Routes
import { authenticate } from '../authenticate';

Router.route('/admin/teachers', {
	name: 'listTeachers',
	template: 'adminListTeachers',
	waitOn: function () {
		return [
			Meteor.subscribe('adminGetAll', 'teacher'),
			Meteor.subscribe('teachersRosters')
		];
	},
	data: {
		teachers: function () {
			return Accounts.users.find({"roles":"teacher"}, { sort: { createdAt: 1 } });
		}
	},
	before: [ authenticate.loggedIn, authenticate.admin ]		
});