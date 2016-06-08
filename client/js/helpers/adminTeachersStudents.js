Template.adminTeachersStudents.helpers({
	allTeachersStudents (rosterId) {
		return Accounts.users.find({ "roles": "student", "profile.teachersRosterId": rosterId }, { sort: { createdAt: 1 } });
	}
});