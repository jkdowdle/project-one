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
	'adminChangeTeacher': function ( studentsId, changeTeacherTo, newRosterId) {
		var oldRosterId = Meteor.users.findOne(studentsId).profile.teachersRosterId;
		let newTeacherName = Meteor.users.findOne(changeTeacherTo).profile.name;

		Meteor.users.update({ _id: studentsId }, {$set: { "profile.teacher": newTeacherName, "profile.teachersRosterId": newRosterId } });
		TeachersRosters.update({ _id: newRosterId }, { $push: { students: { studentId: studentsId } } });
		TeachersRosters.update({ _id: oldRosterId }, { $pull: { students: { studentId: studentsId } } });
	},
	'editBlogPost': (currentPost, editBlog) => {
		BlogPosts.update(currentPost, {$set: { title: editBlog.title, content: editBlog.content } });
	},
	'buyCredits': creditAmount => {
		let currentUser = Meteor.userId();

		Meteor.users.update(currentUser, {$inc: {'profile.credits': 10 }});
		console.log(currentUser);
		console.log(creditAmount);
	},
	'updateUsedCoupon': couponId => {
		CouponCodes.update(couponId, {$set: { used: true } });
	}
});