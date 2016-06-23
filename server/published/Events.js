Meteor.publish('events', (role, currentUser) => {
	if (role == 'student'){
		console.log('student');
		return Events.find({$or: [ {status: 'Open'}, {scheduledStudent: currentUser} ] });
	}

	if (role == 'teacher') {
		console.log('teacher');
		return Events.find();
	}
});