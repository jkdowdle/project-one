import { authenticate } from './authenticate';

Router.route('/account-info/edit/change-email', {
	name: 'changeEmail',
	template: 'changeEmail',
	before: authenticate.loggedIn
});