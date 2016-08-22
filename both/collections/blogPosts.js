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
    'createdAt': {
        type: Date,
        label: 'When this blog post was created.'
    },
    'title': {
        type: String,
        label: 'The title of this blog post.'
    },    
    'content': {
        type: String,
        label: 'The content of this blog post.'
    },
    'zhTitle': {
        type: String,
        label: 'The Chinese title of this blog post.',
        optional: true
    },    
    'zhContent': {
        type: String,
        label: 'The Chinese content of this blog post.',
        optional: true
    },
    'koTitle': {
        type: String,
        label: 'The Korean title of this blog post.',
        optional: true
    },    
    'koContent': {
        type: String,
        label: 'The Korean content of this blog post.',
        optional: true
    },
    'esTitle': {
        type: String,
        label: 'The Spanish title of this blog post.',
        optional: true
    },    
    'esContent': {
        type: String,
        label: 'The Spanish content of this blog post.',
        optional: true
    }
});

BlogPosts.attachSchema( BlogPostsSchema );