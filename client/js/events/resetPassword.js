Template.resetPassword.events({
	'click .change-password': event => {
		event.preventDefault();		
	}
});

Template.resetPassword.onRendered( function() {
	$('[data-toggle="popover"]').popover({
		trigger: 'focus',
		placement: 'auto left',
		template: '<div class="popover alert alert-danger" role="tooltip"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"><span class="sr-only">Error:</span></span><div class="popover-content"></div><div class="arrow"></div></div>'
	});

	$('#resetPasswordForm').validate({
		rules: {
			newPassword: {
				required: true,
				minlength: 6
			},
			newConfirm: {
				required: true,
				equalTo: "#newPassword"
			}
		},
		messages: {			
			newPassword: {
				required: "Enter your new password.",
				minlength: "The password must be at least six characters long."
			},
			newConfirm: {
				required: "Re-enter your new password.",
				equalTo: "This dose not match your password."
			}
		},
		onkeyup: false,
		submitHandler: function(form){
			console.log('Cool');
			let token = Accounts._resetPasswordToken,
				newPassword = $('[name=newPassword]').val();
				confrimPassword = $('[name=newConfirm]').val();

			if (newPassword == confrimPassword){
				Accounts.resetPassword(token, newPassword, error => {
					if (error)
						Bert.alert(error.reason, 'danger');
					else {
						Bert.alert('Password changed!', 'success');
						Router.go('home');
					}
				});
			} else {
				Bert.alert('Passwords do not match.', 'danger');
			}
		}
	});
});