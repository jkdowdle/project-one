Template.registerPage.events({
	'submit form': event => {
		event.preventDefault();
	}
});

Template.registerPage.onRendered(()=> {
	$('.form-register2').validate({
		onkeyup: false,
		submitHandler: () => {
			let passwordInput = $('[name=register-password2]').val(),
				passwordVerify = $('[name=register-password-verify2]').val(),
				accountTypeInput = $('[name=account-type2]').val();

			if( passwordVerify == passwordInput){
				let id = {
					email: $('[name=register-email2]').val(),
					password: $('[name=register-password2]').val(),
					profile: {				
						name: 'Please Edit',					
						gender: 'Please Edit',
						credits: 1,
						skypeid: $('[name=register-skypeid2]').val(),
						timezone: {
							offset: $('[name=register-timezone2] option:selected').attr('data-offset'),
							name: $('[name=register-timezone2] option:selected').val()
						}
					}			
				};

				if (accountTypeInput == 'student') {
					Meteor.call('createNewStudent', id, accountTypeInput, error => {
						if (error) {
							Bert.alert(error.reason, 'danger');
						} else {
							Meteor.loginWithPassword(id.email, id.password, error => {
								if(error)
									Bert.alert(error.reason, 'danger');
								else {
									Bert.alert('Welcome!', 'success');
									$('[name=register-email2]').val('');
									$('[name=register-password2]').val('');
									$('[name=register-password-verify2]').val('');
									$('[name=register-skypeid2]').val('');
									$('[name=register-timezone2] option[value=""').prop('selected', true);
									$('[name=account-type2] option[value=""').prop('selected', true);
									Router.go('home');
								}
							});
						}						
					});
				}
			} else {
				Bert.alert("The passwords do not match", "warning");
			}
		},
		rules: {
			'register-email2': {
				required: true,
				email: true
			},
			'register-skypeid2': {
				required: true
			},
			'register-password2': {
				required: true,
				minlength: 6
			},
			'register-password-verify2': {
				required: true,
				equalTo: "#register-password2"
			},
			'register-timezone2': {
				required: true
			},
			'account-type': {
				required: true
			}			
		},
		messages: {
		   'register-email2': {
				required: "Enter an email address.",
				email: "This is not a valid email"
			},
			'register-skypeid2': {
				required: "Enter your skype Id."
			},
			'register-password2': {
				required: "Enter your desired password.",
				minlength: "The password must be at lest 6 characters long."
			},
			'register-password-verify2': {
				required: "Re-enter your password.",
				equalTo: "This does not match your password."
			},
			'register-timezone2': {
				required: "Enter your timezone."
			},
			'account-type': {
				required: "Enter the account type."
			}			
		},
		tooltip_options: {
			'register-email2': {
				placement:'left'
			}
		}
	});
});