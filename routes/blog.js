Router.route('/blog/',{
	name: 'blog',
	template: 'blog',
	waitOn: function() {
		return Meteor.subscribe('blogPosts');
	},
	data: {
		posts() {
			return BlogPosts.find({}, { sort: { createdAt: -1 } });
		}
	},
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('The latest news | Blog | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Check out our latest blog posts from Flueint.com! Conecting you with your own English Tutor!"
		});
	}
});