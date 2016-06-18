Template.editBlogPost.events({
	'submit form': event => {
		event.preventDefault();

		let currentPost = $('[name=post-id]').val();
		let editBlog = {
			title: $('[name=edit-title]').val(),
			content: $('[name=edit-content]').val()
		}

		BlogPosts.update(currentPost, {$set: { title: editBlog.title, content: editBlog.content } });
		Router.go('blogPost');	
	},
	'click .delete-post': () => {
		let currentPost = $('[name=post-id]').val(),
			confirm = window.confirm('Are you sure you want to delete this post?');

		if (confirm){
			BlogPosts.remove(currentPost);
			Router.go('blog');
		}
	},
	'click .go-back': () => {
		history.back();
	}
});