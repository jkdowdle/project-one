Meteor.startup(() => {
	const rawCollection = Events.rawCollection();
	const ensureIndex = Meteor.wrapAsync(rawCollection.ensureIndex, rawCollection);
	ensureIndex( { "timeEnd": 1 }, { expireAfterSeconds: 259200 } );

	Meteor.users.remove("8GF9QjfuxXRNEAcMp");

	let mailGun = Meteor.settings.mailgun;

	process.env.MAIL_URL = mailGun;

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
		  		name: 'Student',
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

		