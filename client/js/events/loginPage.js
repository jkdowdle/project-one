Template.loginPage.events({
	'submit form': event => {
		event.preventDefault();
		console.log('submit');
	}
});

Template.loginPage.onRendered(()=> {
	$('.alert-row').css('display','none');

	let url = Iron.Location.get().path;
	console.log(url);

	if (url != '/login')
		$('.alert-row').css('display','inherit');

	$('.login-page-form').validate({
		onkeyup: false,
		submitHandler: () => {
			let emailInput = $('[name=login-email2]').val(),
				passwordInput = $('[name=login-password2]').val();

			Meteor.loginWithPassword(emailInput, passwordInput, function(error){
				if(error){
					Bert.alert(error.reason, 'danger');
				} else {
					$('.login-modal').modal('hide');
					$('[name=login-email2]').val('');
					$('[name=login-password2]').val('');
				}
			});
		},
		rules: {
			'login-email2': {
				required: true,
				email: true
			},
			'login-password2': {
				required: true
			}
		},
		messages: {
			'login-email2': {
				required: "Enter your email.",
				email: "Must be a valid email."
			},
			'login-password2': {
				required: "Enter your password."
			}
		}
	});
});