Template.register.events({
	'submit form': function (event) {
		event.preventDefault();

		let passwordInput = $('[name=register-password]').val(),
			passwordVerify = $('[name=register-password-verify]').val(),
			accountTypeInput = $('[name=account-type] option:selected').val();

		if( passwordVerify == passwordInput){

			let id = {
				email: $('[name=register-email]').val(),
				password: $('[name=register-password]').val(),
				profile: {				
					name: 'Please Edit',					
					gender: 'Please Edit',
					credits: 1,
					skypeid: $('[name=register-skypeid]').val(),
					timezone: {
						offset: $('[name=register-timezone] option:selected').attr('data-offset'),
						name: $('[name=register-timezone] option:selected').val()
					}
				}			
			};

			if (accountTypeInput == 'student'){
				Meteor.call('createNewStudent', id, accountTypeInput, () => {
					Meteor.loginWithPassword(id.email, id.password, error => {
						if(error)
							console.log(error.reason);
						else {
							Meteor.call('sendVerificationEmailLink', (error, response) => {
								if (error){
									Bert.alert(error.reason, 'danger');
								} else {
									Bert.alert('Welcome!', 'success');
								}
							});
						}
					});
				});
			}
			else if ( accountTypeInput == 'teacher'){
				Meteor.call('createNewTeacher', id, accountTypeInput, () => {
					Meteor.loginWithPassword(id.email, id.password, error => {
						if(error)
							console.log(error.reason);
						else {
							Meteor.call('sendVerificationEmailLink', (error, response) => {
								if (error){
									Bert.alert(error.reason, 'danger');
								} else {
									Bert.alert('Welcome!', 'success');
								}
							});
						}
					});
				}); 
			}
			else 
				window.alert("Account type is not set");

		} else {
			window.alert("The passwords do not match");
		}
	}
});