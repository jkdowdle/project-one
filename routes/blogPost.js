Router.route('/blog/post/:_id', {
	name: 'blogPost',
	template: 'blogPost',
	data: function () {
		let postId = this.params._id,
			post = BlogPosts.findOne(postId);
		return post;		
	}
});

