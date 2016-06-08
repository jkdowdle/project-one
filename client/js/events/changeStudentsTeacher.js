Template.changeStudentsTeacher.events({
	'submit form': function (event) {
		event.preventDefault();

		var studentsId = $('[name=studentsId]').val();
		var changeTeacherTo = $('[name=editTeacher] option:selected').attr('data-teacherId');
		var newRosterId = TeachersRosters.findOne({ teacherId: changeTeacherTo })._id;

		Meteor.call('adminChangeTeacher', studentsId, changeTeacherTo, newRosterId);
		console.log('new Teacher ' + changeTeacherTo + ' students id ' + studentsId + ' new roster Id ' + newRosterId);
	}
});

