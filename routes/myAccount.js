import { authenticate } from './authenticate';

Router.route('/account-info/', {
	name: 'myAccount',
	template: 'myAccount',
	before: authenticate.loggedIn
});