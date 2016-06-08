/*
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	if(Meteor.users.find().count() < 1) {
		var id = Accounts.createUser({
		  	email: 'admin@flueint.com',
		  	password: 'admin',
		  	profile: {name: 'Administrator'}
		});
		Roles.addUsersToRoles(id, 'admin');
	}
});

Meteor.methods({
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
	},
	'createNewTeacher': function (emailInput, skypeInput, passwordInput, timezoneInput, accountTypeInput){
		var rosterId = TeachersRosters.insert({ students: [ {dummyData: 'arrayLengthOne'} ] });
		var id = Accounts.createUser({
			email: emailInput,
			password: passwordInput,
			profile: {				
				name: 'Please Edit',
				skypeid: skypeInput,
				timezone: timezoneInput,
				rosterId: rosterId,
				gender: 'Please Edit',
				credits: 1
			}			
		});
		TeachersRosters.update(rosterId, {$set: { teacherId: id } });

		Roles.addUsersToRoles(id, String(accountTypeInput));
	},
	'editAccountData': function (editName, editTimezone, editSkypeid, editGender) {
		Meteor.users.update({_id:Meteor.user()._id}, {
			$set:{ 
				"profile.name":editName,
				"profile.timezone": editTimezone,
				"profile.skypeid": editSkypeid,
				"profile.gender": editGender 
			}
		});
	},
	'changeEmail': function (currentUser, emailChangedTo, digest) {
	/*	var correctPassword = Accounts._checkPassword(currentUser, password);
		var password = {digest: digest, algorithm: 'sha-256'};
		var correctPassword = Accounts._checkPassword(currentUser, password);
		console.log(correctPassword);	
		console.log(emailChangedTo);*//*
	},
	'adminChangeTeacher': function ( studentsId, changeTeacherTo, newRosterId) {
		var oldRosterId = Meteor.users.findOne(studentsId).profile.teachersRosterId;
		console.log(changeTeacherTo + ' ' + studentsId + ' ' + newRosterId);
		Meteor.users.update({ _id: studentsId }, {$set: { "profile.teachersRosterId": newRosterId } });
		TeachersRosters.update({ _id: newRosterId }, { $push: { students: { studentId: studentsId } } });
		TeachersRosters.update({ _id: oldRosterId }, { $pull: { students: { studentId: studentsId } } });
	}
});
*/