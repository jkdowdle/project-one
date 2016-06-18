Template.createBlogPost.events({
	'submit form': function(event){
		event.preventDefault();

		let blog = {
			title: $('[name=blog-title]').val(),
			content: $('[name=blog-content]').val(),
			createdAt: new Date()
		}

		postId = BlogPosts.insert(blog);
		Router.go('/blog/post/' + postId);
	}
});