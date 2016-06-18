export let authenticate = {
	loggedIn: function() {		
		let user;

		if (Meteor.loggingIn()) {
			this.render('loading');
		} else {
			user = Meteor.user();

			if (!user){
				this.render('home');
				return;
			}

			let userVerified = user.emails[0].verified;

			if (!userVerified) {
				this.render('awaitingVerification');
				return;
			} 

			this.next();
		}		
	},
	student: function() {
		let userInRoles = Meteor.user().roles,
			isStudent = $.inArray('student', userInRoles);

		if (isStudent !== 0){
			this.render('notAuthorized');
			return;
		}

		this.next();
	},
	teacher: function() {
		let userInRoles = Meteor.user().roles,
			isTeacher = $.inArray('teacher', userInRoles);

		if (isTeacher !== 0){
			this.render('notAuthorized');
			return;
		}

		this.next();
	},
	studentOrTeacher: function() {
		let userInRoles = Meteor.user().roles,
			isTeacher = $.inArray('teacher', userInRoles),
			isStudent = $.inArray('student', userInRoles);

		if (isTeacher == 0 || isStudent == 0){
			this.next();
			return;
		} else {
			this.render('notAuthorized');
			return;
		}		
	},
	admin: function() {
		let userInRoles = Meteor.user().roles,
			isAdmin = $.inArray('admin', userInRoles);

		if (isAdmin !== 0){
			this.render('notAuthorized');
			return;
		}

		this.next();
	}	
}