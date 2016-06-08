/*
Template.registerHelper( 'getTimezones', () => {
	let currentUser = Meteor.userId(),
		sTimezone = Accounts.users.findOne(currentUser).profile.timezone;
	//	rosterId = Accounts.users.findOne(currentUser).profile.teachersRosterId,
	//	tTimezone = Accounts.users.findOne({'profile:rosterId': rosterId}).profile.timezone;

	return {
		sName: sTimezone.name,
		sOffset: sTimezone.offset,
	//	tName: tTimezone.name,
	//	tOffset: tTimezone.offset
	}
});*/
/*
Template.navigation.helpers({
	userId () {
		return Meteor.userId();
	}
});

Template.myAccount.helpers({
	myAccount() {
		return Meteor.user();
	},
	myEmail() {
		if (Meteor.user()) {
			return Meteor.user().emails[0].address;
		}		
	}
});

Template.editMyAccount.helpers({
	myAccount() {
		return Meteor.user();
	},
	myEmail() {
		if (Meteor.user()){
			return Meteor.user().emails[0].address;
		}		
	},
	checkGender(gender) {
		if (Meteor.user()) {
			var currentUser = Meteor.userId();
			var getUsersGender = Meteor.user().profile.gender;

			if ( gender == "Male" && gender == getUsersGender )
	 			return 'checked';
			else if ( gender == "Female" && gender == getUsersGender )
				return 'checked';
			else if ( gender == "Other" && gender == getUsersGender )
				return 'checked';
			else if ( gender == "Please Edit" && gender == getUsersGender )
				return 'checked';
			else 
				return '';
		}		
	}
});

Template.changeEmail.helpers({
	myEmail() {
		return Meteor.user().emails[0].address;
	}
});

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

Template.teacherTable.helpers({
	studentCount (rosterId) {
		studentCount = TeachersRosters.findOne(rosterId).students.length - 1;
		return studentCount;
	}
});

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

Template.adminTeachersStudents.helpers({
	allTeachersStudents (rosterId) {
		return Accounts.users.find({ "roles": "student", "profile.teachersRosterId": rosterId }, { sort: { createdAt: 1 } });
	}
});

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
			studentsTeacher = studentsTeacher.profile.timezone;
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

Template.schedule.helpers({
	test () {
		return {
			one: 'Ted Cruz',
			two: 'Don the Con'
		}
	}
});
*/