BlogPosts = new Mongo.Collection( 'blog-posts' );
/*
BlogPosts.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

BlogPosts.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});
*/
let BlogPostsSchema = new SimpleSchema({
    'title': {
        type: String,
        label: 'The title of this blog post.'
    },
    'createdAt': {
        type: Date,
        label: 'When this blog post was created.'
    },
    'content': {
        type: String,
        label: 'The content of this blog post.'
    }
});

BlogPosts.attachSchema( BlogPostsSchema );