Meteor.startup(() => {
	const rawCollection = Events.rawCollection();
	const ensureIndex = Meteor.wrapAsync(rawCollection.ensureIndex, rawCollection);
	ensureIndex( { "timeEnd": 1 }, { expireAfterSeconds: 259200 } );

	process.env.MAIL_URL = "smtp://postmaster%40sandbox234048e4d3b647c6bfb9615d3a952819.mailgun.org:97420af15ba02c1416320bc1c1d0dea7@smtp.mailgun.org:587";

	if(Meteor.users.find().count() < 1) {
		// Create Admin
		let admin = Accounts.createUser({
		  	email: 'admin@flueint.com',
		  	password: ')f"*?$aY3w<XR$6c~P33lSi',
		  	profile: {
		  		name: 'Administrator',
		  		gender: 'Male',
		  		skypeid: 'flueintadmin',
		  		timezone: {
		  			name: "UTC",
		  			offset: "UTC"
		  		}
		  	}		  	
		});
		Roles.addUsersToRoles(admin, 'admin');
		Meteor.users.update(admin, {$set: {"emails.0.verified": true} });

		// Create Teacher
		let teacherName = 'Techer Man';
		let rosterId = TeachersRosters.insert({ students: [ {dummyData: 'arrayLengthOne'} ] });
		let teacher = Accounts.createUser({
			email: 'teacher@flueint.com',
		  	password: ')f"*?$aY3w<XR$6c~P33lSi',
		  	profile: {
		  		name: teacherName,
		  		rosterId: rosterId,
		  		gender: "Male",
		  		skypeid: "teacher.3",
		  		timezone: {
		  			name: "UTC",
		  			offset: "UTC"
		  		}
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
		  		name: ')f"*?$aY3w<XR$6c~P33lSi',
		  		teacher: teacherName,
		  		teachersRosterId: rosterId,
		  		gender: "Male",
		  		skypeid: "student.3",
		  		credits: 1,
		  		timezone: {
		  			name: "UTC",
		  			offset: "UTC"
		  		}
		  	}
		});
		Roles.addUsersToRoles(student, 'student');
		Meteor.users.update(student, {$set: {"emails.0.verified": true} });
	}
});

		