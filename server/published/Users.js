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
	console.log(rosterId);
	
	return Meteor.users.find({'profile.teachersRosterId': rosterId});
});