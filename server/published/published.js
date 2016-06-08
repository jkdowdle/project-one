Meteor.publish("users", function(){
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


