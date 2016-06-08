Template.studentTable.helpers({
	teacherInfo () {
		return Meteor.user();
	},
	myStudentInfo () {
		if(Meteor.user()){
			var rosterId = Meteor.user().profile.rosterId;
			return Accounts.users.find({"profile.teachersRosterId": rosterId}).fetch();
		}
	}
});