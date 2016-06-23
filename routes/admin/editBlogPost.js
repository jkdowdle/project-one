import { authenticate } from '../authenticate';

Router.route('/blog/edit-post/:_id', {
	name: 'editBlogPost',
	template: 'editBlogPost',
	waitOn: function () {
		let route = Router.current().route.options.name,
			postId = this.params._id;
			console.log(postId);
		Meteor.subscribe('blogPosts', route, postId);
	},
	data: function() {
		if (Meteor.user()) {
			let postId = this.params._id,
				post = BlogPosts.findOne(postId);
			return post;
		}		
	},
	before: [ authenticate.loggedIn, authenticate.admin ]
});