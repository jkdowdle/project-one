import { authenticate } from './authenticate';

Router.route('/account-info/edit', {
	name: 'editAccountInfo',
	template: 'editMyAccount',
	before: authenticate.loggedIn
});