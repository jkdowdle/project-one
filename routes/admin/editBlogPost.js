import { authenticate } from '../authenticate';

Router.route('/blog/edit-post/:_id', {
	name: 'editBlogPost',
	template: 'editBlogPost',
	data: function() {
		if (Meteor.user()) {
			let postId = this.params._id,
				post = BlogPosts.findOne(postId);
			return post;
		}		
	},
	before: [ authenticate.loggedIn, authenticate.admin ]
});