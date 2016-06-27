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

		TeachersRosters.update(rosterId, {$push: { students: { studentId: student } } });
		Roles.addUsersToRoles(student, String(accountTypeInput));
		Meteor.users.update(student, {$set: {"emails.0.verified": true} }); //
		Accounts.sendVerificationEmail( student );				
	},
	'createNewTeacher': function (id, accountTypeInput){
		let rosterId = TeachersRosters.insert({ students: [ {dummyData: 'arrayLengthOne'} ] });
		id.profile.rosterId = rosterId;

		let teacher = Accounts.createUser(id);

		TeachersRosters.update(rosterId, {$set: { teacherId: teacher } });
		Roles.addUsersToRoles(teacher, String(accountTypeInput));
		Accounts.sendVerificationEmail( teacher );
	},
	'createNewAdmin': (id, accountTypeInput) => {
		let newAdmin = Accounts.createUser(id);
		Roles.addUsersToRoles(newAdmin, String(accountTypeInput));
		Accounts.sendVerificationEmail( newAdmin );
	},
	'postBlogPost': function(blog) {
		return BlogPosts.insert(blog);
	}
});