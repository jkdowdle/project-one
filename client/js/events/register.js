Template.register.events({
	'submit form': function (event) {
		event.preventDefault();
	}
});

Template.register.onRendered(()=> {
	$('[data-toggle="popover"]').popover({
		trigger: 'focus',
		placement: 'auto left',
		template: '<div class="popover alert alert-danger" role="tooltip"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"><span class="sr-only">Error:</span></span><div class="popover-content"></div><div class="arrow"></div></div>'
	});

	$('.form-register').validate({
		onkeyup: false,
		submitHandler: () => {
			let passwordInput = $('[name=register-password]').val(),
				passwordVerify = $('[name=register-password-verify]').val(),
				accountTypeInput = $('[name=account-type]').val();

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
									$('[name=register-email]').val('');
									$('[name=register-password]').val('');
									$('[name=register-password-verify]').val();
									$('[name=register-skypeid]').val('');
									$('[name=register-timezone] option[value=""').prop('selected', true);
									$('[name=account-type] option[value=""').prop('selected', true);
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
			'register-email': {
				required: true,
				email: true
			},
			'register-skypeid': {
				required: true
			},
			'register-password': {
				required: true,
				minlength: 6
			},
			'register-password-verify': {
				required: true,
				equalTo: "#register-password"
			},
			'register-timezone': {
				required: true
			},
			'account-type': {
				required: true
			}			
		},
		messages: {
		   'register-email': {
				required: "Enter an email address.",
				email: "This is not a valid email"
			},
			'register-skypeid': {
				required: "Enter your skype Id."
			},
			'register-password': {
				required: "Enter your desired password.",
				minlength: "The password must be at lest 6 characters long."
			},
			'register-password-verify': {
				required: "Re-enter your password.",
				equalTo: "This does not match your password."
			},
			'register-timezone': {
				required: "Enter your timezone."
			},
			'account-type': {
				required: "Enter the account type."
			}			
		},
		tooltip_options: {
			'register-email': {
				placement:'left'
			}
		}
	});
});