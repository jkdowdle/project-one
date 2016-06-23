Meteor.methods({
	'removeBlogPost': currentPost => {
		BlogPosts.remove(currentPost);
	}
});