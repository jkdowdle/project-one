import { authenticate } from './authenticate';

Router.route('/reset-password/:token', {
	name: 'resetPassword',
	onBeforeAction: function() {
		console.log(this.params.token);
        Accounts._resetPasswordToken = this.params.token;
        this.next();
	},
	template: 'resetPassword'
});