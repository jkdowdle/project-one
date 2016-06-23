Template.forgotPassword.events({
	'submit form': event => {
		event.preventDefault();
	}
});

Template.forgotPassword.onRendered(()=> {
	$('[data-toggle="popover"]').popover({
		trigger: 'focus',
		placement: 'auto left',
		template: '<div class="popover alert alert-danger" role="tooltip"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"><span class="sr-only">Error:</span></span><div class="popover-content"></div><div class="arrow"></div></div>'
	});

	$('#sendChagePassLink').validate({
		onkeyup: false,
		submitHandler: () => {
			let options = {
				email: $('[name=emailForgotPass]').val()
			}

			Accounts.forgotPassword(options, error => {
				if (error)
					Bert.alert(error.reason, 'danger');
				else {
					Bert.alert('Use the link sent to this email to create a new password', 'success');
					$('[name=emailForgotPass]').val('');
				}
			});
		},
		rules: {
			'emailForgotPass': {
				required: true,
				email: true
			}
		},
		messages: {
			'emailForgotPass': {
				required: "Enter your email.",
				email: "Must be a valid email."
			}
		}
	});
});