Meteor.methods({
	'editAccountData': function (editName, editTimezoneName, editTimezoneOffset, editSkypeid, editGender) {
		Meteor.users.update({_id:Meteor.user()._id}, {
			$set:{ 
				"profile.name":editName,
				"profile.skypeid": editSkypeid,
				"profile.gender": editGender,
				"profile.timezone.name": editTimezoneName,
				"profile.timezone.offset": editTimezoneOffset
			}
		});
	},
	'changeEmail': function (currentUser, emailChangedTo, digest) {
	/*	var correctPassword = Accounts._checkPassword(currentUser, password);
		var password = {digest: digest, algorithm: 'sha-256'};
		var correctPassword = Accounts._checkPassword(currentUser, password);
		console.log(correctPassword);	
		console.log(emailChangedTo);*/
	},
	'adminChangeTeacher': function ( studentsId, changeTeacherTo, newRosterId) {
		var oldRosterId = Meteor.users.findOne(studentsId).profile.teachersRosterId;
		console.log(changeTeacherTo + ' ' + studentsId + ' ' + newRosterId);
		Meteor.users.update({ _id: studentsId }, {$set: { "profile.teachersRosterId": newRosterId } });
		TeachersRosters.update({ _id: newRosterId }, { $push: { students: { studentId: studentsId } } });
		TeachersRosters.update({ _id: oldRosterId }, { $pull: { students: { studentId: studentsId } } });
	}
});