Meteor.startup(() => {

	process.env.MAIL_URL = "smtp://postmaster%40sandbox234048e4d3b647c6bfb9615d3a952819.mailgun.org:97420af15ba02c1416320bc1c1d0dea7@smtp.mailgun.org:587";

	if(Meteor.users.find().count() < 1) {
		// Create Admin
		let admin = Accounts.createUser({
		  	email: 'admin@flueint.com',
		  	password: 'admin',
		  	profile: {name: 'Administrator'}		  	
		});
		Roles.addUsersToRoles(admin, 'admin');
		Meteor.users.update(admin, {$set: {"emails.0.verified": true} });

		// Create Teacher
		let teacherName = 'Techer Man';
		let rosterId = TeachersRosters.insert({ students: [ {dummyData: 'arrayLengthOne'} ] });
		let teacher = Accounts.createUser({
			email: 'teacher@flueint.com',
		  	password: 'teacher',
		  	profile: {
		  		name: teacherName,
		  		rosterId: rosterId
		    }
		});
		TeachersRosters.update(rosterId, {$set: { teacherId: teacher } });
		Roles.addUsersToRoles(teacher, 'teacher');
		Meteor.users.update(teacher, {$set: {"emails.0.verified": true} });

		// Create Student
		let student = Accounts.createUser({
			email: 'student@gmail.com',
		  	password: 'student',
		  	profile: {
		  		name: 'Student Boy',
		  		teacher: teacherName,
		  		teachersRosterId: rosterId
		  	}
		});
		Roles.addUsersToRoles(student, 'student');
		Meteor.users.update(student, {$set: {"emails.0.verified": true} });
	}
});

		