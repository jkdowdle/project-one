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
	}
});