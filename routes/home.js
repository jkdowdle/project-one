Router.route('/',{
	name: 'home',
	template: 'home',
	waitOn: function() {
		let route = Router.current().route.options.name;
		return Meteor.subscribe('blogPosts', route);
	},
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('Learn English Online | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Chinese to English; Learn English Online with a Native English Speaker Tutor over Skype!"
		});
	}
});