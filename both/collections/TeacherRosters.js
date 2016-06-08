TeachersRosters = new Mongo.Collection('teacher-rosters'); 
/*
TeachersRosters.update({
	teacherId: Meteor.userId(),
	students: [{ studentId: '555559', name: 'Josh Dowdle', email: 'student@gmail.com', skypeId: 'student.88', gender: 'male'}]
});

TeachersRosters.update


TeachersRosters.upsert(
	{teacherId: Meteor.userId() },
		{$push: 
			{students: {
				studentId: '555559',
				 name: 'Josh Dowdle', 
				 email: 'student@gmail.com', 
				 skypeId: 'student.88', 
				 gender: 'male'
				}
			}
	}
);*/