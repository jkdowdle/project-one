import { authenticate } from './authenticate';

Router.route('/account-info/edit', {
	name: 'editAccountInfo',
	template: 'editMyAccount',
	before: authenticate.loggedIn,
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Edit Account | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Update the information on your Flueint account."
		});
	}
});