Router.route('/about-the-company/', {
	name: 'theCompany',
	template: 'theCompany',
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('About Flueint: Connecting You with English Tutors Online');
		DocHead.addMeta({
			name: "description",
			content: "Fluint has come up with a system to help you become fluent fast! Our system guarantees that you will be speaking more fluently in as little as 2 months. Click to get to know more about Flueint."
		});
	}
});