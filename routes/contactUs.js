Router.route('contactUs', {
	path: '/contact-us',
	template: 'contactUs',
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Contact Flueint.com: Connecting You with English Tutors Online');
		DocHead.addMeta({
			name: "description",
			content: "Have a question or comment about our English Tutor Online program? Send us an email and we will get back to you."
		});
	}
});