Template.createBlogPost.onCreated( () => {
	let template = Template.instance();
	template.multiLang = new ReactiveVar( false );

});

Template.createBlogPost.helpers({
	multiLang() {
		let test = Template.instance().multiLang.get();
		return test;
	}
});

Template.createBlogPost.events({
	'click .add-lang-btn': (event, template) => {

		let languages = $('[name=selectLanguages]').val();

		let changeState = template.multiLang.set( true); 

		$('.add-translation').modal('hide');
		$('.container').css('visibility', 'hidden');

		setTimeout(() => {
			for (var lang in languages) {
				$('#langOfPost').append('<li role="presentation"><a href="#' + languages[lang] + 'Trans" aria-controls="' + languages[lang] + 'Trans" role="tab" data-toggle="tab">' + languages[lang] + '</a></li>');
				$('.tab-content').append('<div role="tabpanel" class="tab-pane" id="' + languages[lang] + 'Trans"><form class="form-horizontal form-blog-post multi-lang-form"> <div class="form-group"> <label class="sr-only">' + languages[lang] + ' - Blog Title</label> <div class=""> <input type="text" class="form-control" name="' + languages[lang] + '-blog-title" placeholder="' + languages[lang] + ' - Blog Title"> </div> </div> <div class="form-group"> <label class="sr-only">' + languages[lang] + ' - Blog Content</label> <div class=""> <textarea id="blogContent" type="text" class="form-control" name="' + languages[lang] + '-blog-content" placeholder="' + languages[lang] + ' - Blog Content"></textarea> </div> </div> </form> </div>'); 
			}

			$('.container').css('visibility', 'visible');
		}, 1000);
	},
	'submit form': function(event){
		event.preventDefault();

		let blog = {
			title: $('[name=blog-title]').val(),
			content: $('[name=blog-content]').val(),
			zhTitle: $('[name=zh-blog-title]').val(),
			zhContent: $('[name=zh-blog-content]').val(),
			koTitle: $('[name=ko-blog-title]').val(),
			koContent: $('[name=ko-blog-content]').val(),
			esTitle: $('[name=es-blog-title]').val(),
			esContent: $('[name=es-blog-content]').val(),
			createdAt: new Date()
		}

		Meteor.call('postBlogPost', blog, (error, result) => {
			let postId = result;
			Router.go('/blog/post/' + result);
		});
	},
	'click .multi-lang-submit': function(event) {

		let blog = {
			title: $('[name=blog-title]').val(),
			content: $('[name=blog-content]').val(),
			zhTitle: $('[name=zh-blog-title]').val(),
			zhContent: $('[name=zh-blog-content]').val(),
			koTitle: $('[name=ko-blog-title]').val(),
			koContent: $('[name=ko-blog-content]').val(),
			esTitle: $('[name=es-blog-title]').val(),
			esContent: $('[name=es-blog-content]').val(),
			createdAt: new Date()
		}

		console.log(blog);
		Meteor.call('postBlogPost', blog, (error, result) => {
			let postId = result;
			Router.go('/blog/post/' + result);
		});
	}
});