Template.changeStudentsTeacher.helpers({
	teachersName (rosterId) {
		if (Meteor.user()) {
			var studentsTeacher = Accounts.users.findOne({'roles':'teacher', 'profile.rosterId':rosterId});
			studentsTeacher = studentsTeacher.profile.name;
			return studentsTeacher;
		}		
	},
	teachersTimezone (rosterId) {
		if (Meteor.user()) {
			var studentsTeacher = Accounts.users.findOne({'roles':'teacher', 'profile.rosterId':rosterId});
			studentsTeacher = studentsTeacher.profile.timezone.name;
			return studentsTeacher;
		}		
	},
	teachersGender (rosterId) {
		if (Meteor.user()) {
			var studentsTeacher = Accounts.users.findOne({'roles':'teacher', 'profile.rosterId':rosterId});
			studentsTeacher = studentsTeacher.profile.gender;
			return studentsTeacher;
		}		
	},
	teachersStudentCount (rosterId) {
		if (Meteor.user()) {
			studentCount = TeachersRosters.findOne(rosterId).students.length - 1;
			return studentCount;
		}		
	},
	optionsTeachers () {
		return Accounts.users.find({'roles':'teacher'});
	}
});
