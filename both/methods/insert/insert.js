Meteor.methods({
	'postBlogPost': function(blog) {
		return BlogPosts.insert(blog);
	},
	'createPreset': function( presetObj ) {
		return Presets.insert(presetObj);
	}
});
