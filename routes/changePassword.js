import { authenticate } from './authenticate';

Router.route('/account-info/edit/change-password', {
	name: 'changePassword',
	template: 'changePassword',
	before: authenticate.loggedIn
});