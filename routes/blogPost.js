Router.route('/blog/post/:_id', {
	name: 'blogPost',
	template: 'blogPost',
	waitOn: function () {
		let route = Router.current().route.options.name,
			postId = this.params._id;
		Meteor.subscribe('blogPosts', route, postId);
	},
	data: function () {
		let postId = this.params._id,
			post = BlogPosts.findOne(postId);
		return post;		
	},
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		
		let postId = this.params._id,
			post = BlogPosts.findOne(postId);

		DocHead.setTitle( post.title + ' | Blog | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: post.content
		});
	}
});