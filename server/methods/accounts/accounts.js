import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
	'addEmail': (userId, newEmail, oldEmail) => {

		Accounts.addEmail(userId, newEmail, false, error => {
			if (error){
				Bert.alert(error.reason, 'danger');
				return false;
			}
		});

		Accounts.removeEmail(userId, oldEmail, error => {
			if(error) {
				Bert.alert(error.reason, 'danger');
				return false;
			}
		});

		Accounts.sendVerificationEmail(userId, newEmail, error => {
			if (error){
				Bert.alert(error.reason, 'danger');				
				return false;
			}
		});		
	}	
});