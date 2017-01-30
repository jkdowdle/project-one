Meteor.publish('events', (role, currentUser) => {
	if (role === 'student'){
		return Events.find({$or: [ {status: 'Open'}, {scheduledStudent: currentUser} ] });
	}

	if (role === 'teacher') {
		return Events.find();
	}

	if (role === 'admin') {
		console.log('admin');
		return Events.find();
	}
});
