Router.route('/login', {
	name: "loginPage",
	template: "loginPage",
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Log In to Flueint | Learn English Online | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Sign in to Flueint.com to connect with a personal English Teacher. If you do not have an account, come sign up now!"
		});
	}
});