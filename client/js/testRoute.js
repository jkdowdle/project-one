let authenticate = {
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

import {auth} from './test';

Router.route('/loading',{
	template: 'loading',
	waitOn: function () {
		console.log('waiting on me?! how nice');
	},
	before: auth.one//[authenticate.loggedIn, authenticate.student]
});