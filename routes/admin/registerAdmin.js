import { authenticate } from '../authenticate';

Router.route('/admin/register-user',{
	name: 'registerAdmin',
	template: 'registerAdmin',
	before: [ authenticate.loggedIn, authenticate.admin ],
	data: {
		timezones() {
			return Modules.both.timezoneList;
		}
	}
});