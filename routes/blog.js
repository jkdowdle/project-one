Router.route('/blog/',{
	name: 'blog',
	template: 'blog',
	data: {
		posts() {
			return BlogPosts.find({}, { sort: { createdAt: -1 } });
		}
	}
});

/* I am sooooo cool */