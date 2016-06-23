Meteor.publish('teachersRosters', () => {
	console.log('Teachers Rosters');
	let options = {fields: {students: 1, teacherId: 1} };
	return TeachersRosters.find({},options);
});