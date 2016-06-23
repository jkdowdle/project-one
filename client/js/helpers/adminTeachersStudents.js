Template.adminTeachersStudents.helpers({
	allTeachersStudents (rosterId) {
		return Accounts.users.find({'profile.teachersRosterId': rosterId});
	}
});