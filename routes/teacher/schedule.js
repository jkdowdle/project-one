import { authenticate } from '../authenticate';

Router.route('/schedule', {
	name: 'schedule',
	template: 'schedule',
	before: [authenticate.loggedIn, authenticate.studentOrTeacher]
});
