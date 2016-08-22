import { authenticate } from './authenticate';

Router.route('/reset-password/:token', {
	name: 'resetPassword',
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Reset Password | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Change your Flueint password."
		});
	},
	onBeforeAction: function() {
        Accounts._resetPasswordToken = this.params.token;
        this.next();
	},
	template: 'resetPassword'
});