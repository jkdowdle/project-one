// Admin

Meteor.publish('adminGetAll', role => {
	let options = {fields: {profile: 1, emails:1, roles: 1} };
	return Meteor.users.find({roles: role}, options);
});

Meteor.publish('studentsOf', teacherId => {
	let rosterId = Meteor.users.findOne(teacherId).profile.rosterId,
		options = {fields: {profile: 1, emails:1, roles: 1} };
	return Meteor.users.find({'profile.teachersRosterId': rosterId}, options);
});

Meteor.publish('studentWithTeachers', studentId => {
	let options = {fields: {profile: 1, emails:1, roles: 1} };
	return Meteor.users.find(studentId, options);
});
	
// Teacher 

Meteor.publish('teachersStudents', rosterId => {
	return Meteor.users.find({roles: 'student'});

/*	console.log(rosterId);
	
	return Meteor.users.find({'profile.teachersRosterId': rosterId});*/
});

// Student

Meteor.publish('teachers', () => {
	let options = {fields: {'profile.skypeid': 1, emails: 1, roles: 1}}
	return Meteor.users.find({'roles.0': 'teacher'}, options);
});