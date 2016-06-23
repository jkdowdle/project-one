Template.createBlogPost.events({
	'submit form': function(event){
		event.preventDefault();

		let blog = {
			title: $('[name=blog-title]').val(),
			content: $('[name=blog-content]').val(),
			createdAt: new Date()
		}

		Meteor.call('postBlogPost', blog, (error, result) => {
			let postId = result;
			Router.go('/blog/post/' + result);
		});
	}
});

