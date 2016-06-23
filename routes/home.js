Router.route('/',{
	name: 'home',
	template: 'home',
	waitOn: function() {
		let route = Router.current().route.options.name;
		return Meteor.subscribe('blogPosts', route);
	}
});