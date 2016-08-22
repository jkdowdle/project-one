Router.route('/reset-password',{
	name: 'forgotPassword',
	template: 'forgotPassword',
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Forgot Password | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Incase you have forgotten your password, reset your Flueint password through email."
		});
	}
})