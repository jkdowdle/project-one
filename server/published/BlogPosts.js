Meteor.publish('blogPosts', (route, postId) => {
	if (postId){
		let data = BlogPosts.find({_id: postId}, {
			fields: {
				'title': 1,
				'content': 1,
				'createdAt': 1
			}
		});

		if (data) {
			return data;
		}
	} else {
		if (route == 'home') {
			let data = BlogPosts.find({}, {
				sort: {createdAt: -1}, 
				limit: 3,
				fields: {
					'title': 1,
					'content': 1
				}
			});

			if (data) {
				return data;
			}
		}	

		let data = BlogPosts.find({}, {
			fields: {
				'title': 1,
				'content': 1,
				'createdAt': 1
			}
		});	
		
		if (data) {
			return data;
		}
	}	

	return this.ready();
});  