Router.route('registerPage', {
	path: '/register',
	template: 'registerPage',
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Register to Flueint | Learn English Online | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Register to Flueint.com to connect with a personal English Teacher online. Schedule your appointments when it works for you and with lessons at an affordable rate, you will become fluent in no time!"
		});
	}
});