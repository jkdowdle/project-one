Template.editBlogPost.events({
	'submit form': event => {
		event.preventDefault();

		let currentPost = $('[name=post-id]').val();
		let editBlog = {
			title: $('[name=edit-title]').val(),
			content: $('[name=edit-content]').val()
		}

		Meteor.call('editBlogPost', currentPost, editBlog);
		Router.go('blogPost', {_id: currentPost});	
	},
	'click .delete-post': () => {
		let currentPost = $('[name=post-id]').val(),
			confirm = window.confirm('Are you sure you want to delete this post?');

		if (confirm){
			Meteor.call('removeBlogPost', currentPost);
			Router.go('blog');
		}
	},
	'click .go-back': () => {
		history.back();
	}
});