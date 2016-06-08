Template.listStudents.helpers({
	teacherName (teachersRosterId) {
		var teachersProfile = Accounts.users.findOne({ 'roles': 'teacher', 'profile.rosterId': teachersRosterId}).profile;
		return teachersProfile.name;
	},
	teacherId (teachersRosterId) {
		var teachersId = Accounts.users.findOne({ 'roles': 'teacher', 'profile.rosterId': teachersRosterId})._id;
		console.log(teachersId);
		return teachersId;
	}
});