import { authenticate } from '../authenticate';

Router.route('/blog/create-blog-post',{
	name: 'createBlogPost',
	template: 'createBlogPost',
	before: [ authenticate.loggedIn, authenticate.admin ]
});