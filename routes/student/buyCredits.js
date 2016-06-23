import { authenticate } from '../authenticate';

Router.route('/buy-credits/',{
	name: 'buyCredits',
	template: 'buyCredits',
	before: [authenticate.loggedIn, authenticate.student]
});