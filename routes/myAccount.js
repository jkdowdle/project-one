import { authenticate } from './authenticate';

Router.route('/account-info/', {
	name: 'myAccount',
	template: 'myAccount',
	before: authenticate.loggedIn,
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('My Account | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Your Flueint Account."
		});
	}
});