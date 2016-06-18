Template.newsfeed.helpers({
	blogPosts() {
		return BlogPosts.find({}, {sort: {createdAt: -1}, limit: 3});
	}
});