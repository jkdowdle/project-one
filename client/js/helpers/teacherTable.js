Template.teacherTable.helpers({
	studentCount (rosterId) {
		studentCount = TeachersRosters.findOne(rosterId).students.length - 1;
		return studentCount;
	}
});