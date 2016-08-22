Template.newsfeed.helpers({
	postTitle(id) {			
		const currentLanguageCode = TAPi18n.getLanguage();
		let post = BlogPosts.findOne(id),
			es   = post && post.esTitle,
			ko   = post && post.koTitle,
			zh   = post && post.zhTitle;

		if (currentLanguageCode == 'zh') {
			if (zh === '' || typeof zh === 'undefined')
				return post.title;
			else
				return post.zhTitle;
		} else if (currentLanguageCode == 'ko') {
			if (ko === '' || typeof ko === 'undefined')
				return post.title;
			else
				return post.koTitle;
		} else if (currentLanguageCode == 'es') {
			if (es === '' || typeof es === 'undefined')
				return post.title;
			else
				return post.esTitle;
		} else {
			return post.title;
		}
	},
	postContent(id) {			
		const currentLanguageCode = TAPi18n.getLanguage();
		let post = BlogPosts.findOne(id),
			es   = post && post.esContent,
			ko   = post && post.koContent,
			zh   = post && post.zhContent;

		if (currentLanguageCode == 'zh') {
			if (zh === '' || typeof zh === 'undefined')
				return post.content;
			else
				return post.zhContent;
		} else if (currentLanguageCode == 'ko') {
			if (ko === '' || typeof ko === 'undefined')
				return post.content;
			else
				return post.koContent;
		} else if (currentLanguageCode == 'es') {
			if (es === '' || typeof es === 'undefined')
				return post.content;
			else
				return post.esContent;
		} else {
			return post.content;
		}
	}
});