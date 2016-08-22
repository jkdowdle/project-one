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

		const currentLanguageCode = TAPi18n.getLanguage();

		if (currentLanguageCode == 'zh') {
			return {
				title: post.zhTitle,
				content: post.zhContent
			}
		} else if (currentLanguageCode == 'ko') {
			return {
				title: post.koTitle,
				content: post.koContent
			}
		} else if (currentLanguageCode == 'es') {
			return {
				title: post.esTitle,
				content: post.esContent
			}
		} else {
			return {
				title: post.title,
				content: post.content
			}
		}				
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