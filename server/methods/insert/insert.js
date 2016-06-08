Meteor.methods({
	'createNewStudent': function (id, accountTypeInput) {		

		let getLowestStudentRoster = [
		    { $unwind : "$students" },
		    { $group : { _id : "$_id", len : { $sum : 1 } } },
		    { $sort : { len : 1 } },
	    	{ $limit : 10 }
		];

		let roster       = TeachersRosters.aggregate(getLowestStudentRoster),
			rosterId     = roster[0]._id,
			teachersName = Meteor.users.findOne({'profile.rosterId': rosterId}).profile.name;
		id.profile.teacher = teachersName;
		id.profile.teachersRosterId = rosterId;

		let student = Accounts.createUser(id);

		console.log(roster);

		TeachersRosters.update(rosterId, {$push: { students: { studentId: student } } });
		Roles.addUsersToRoles(student, String(accountTypeInput));
	/*	Meteor.loginWithPassword(student); */
		
	},
	'createNewTeacher': function (id, accountTypeInput){
		let rosterId = TeachersRosters.insert({ students: [ {dummyData: 'arrayLengthOne'} ] });
		id.profile.rosterId = rosterId;

		let teacher = Accounts.createUser(id);

		TeachersRosters.update(rosterId, {$set: { teacherId: teacher } });
		Roles.addUsersToRoles(teacher, String(accountTypeInput));
	}
});
/*
'createNewStudent': function (emailInput, skypeInput, passwordInput, timezoneInput, accountTypeInput) {

		var getLowestStudentRoster = [
		    { $unwind : "$students" },
		    { $group : { _id : "$_id", len : { $sum : 1 } } },
		    { $sort : { len : 1 } },
	    	{ $limit : 1 }
		];

		var roster = TeachersRosters.aggregate(getLowestStudentRoster);

		var rosterId = roster[0]._id;
		var myTeacherName = Meteor.users.findOne({'roles':'teacher', 'profile.rosterId':rosterId}).profile.name;

		var id = Accounts.createUser({
			email: emailInput,
			password: passwordInput,
			profile: {				
				name: 'Please Edit',
				skypeid: skypeInput,
				timezone: timezoneInput,
				teacher: myTeacherName,
				teachersRosterId: rosterId,
				gender: 'Please Edit',
				credits: 1
			}			
		});

		TeachersRosters.update(rosterId, {$push: { students: { studentId: id } } });

		Roles.addUsersToRoles(id, String(accountTypeInput)); 
	*/