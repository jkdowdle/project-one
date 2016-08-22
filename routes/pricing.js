Router.route('/pricing/', {
	name: 'pricing',
	template: 'pricing',
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Flueint Program Pricing | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "The Flueint Program to learn English has several baisic packages that will fit the needs of any one seeking to become fluent in English. Checkout our packages and sign up today!"
		});
	}
});