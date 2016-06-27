/*Meteor.publish("users", function(){
  return Meteor.users.find();
});

Meteor.publish("forTeachers", function () {
  	if (Roles.userIsInRole(this.userId, 'teacher')) {
  		var rosterId = Meteor.users.findOne(this.userId).profile.rosterId;
    	return Meteor.users.find({'profile.teachersRosterId':rosterId});
  	} else {
    	// user not authorized. do not publish secrets
    	this.stop();
    	return;
  	}
});


*/

/*
SeoCollection.insert({
    "route_name" : "home", // the name of the Iron-Router route
    "title" : "Native English Tutors Online | Flueint.com",
    "meta" : [
        {"description": 
        	{
	        	content: "Chinese to English; Learn English online with your personal Native English speaking tutor over skype!"
        	}
    	},
        {"coverage": "Worldwide"}
        // add more meta tags
    ]/*,
    "og" : [
        { "image": "http://your-domain.com/images/image.jpg" },
        // add more open graph tags
    ]
});*/

