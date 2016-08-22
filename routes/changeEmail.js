import { authenticate } from './authenticate';

Router.route('/account-info/edit/change-email', {
	name: 'changeEmail',
	template: 'changeEmail',
	before: authenticate.loggedIn,
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Change Email | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Change the Email connected to your Flueint account."
		});
	}
});