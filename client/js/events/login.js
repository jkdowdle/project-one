Template.login.events({
	'submit form': function (event) {
		event.preventDefault();
	},
	'click .forgot-password a': () => {
		$('.login-modal').modal('toggle');	
	}
});

jQuery.validator.setDefaults({
    errorPlacement: function(error, element) {
    	let input = element.attr('name');
    	$('[name=' + input + ']').attr('data-content', error[0].innerText);
    }
});

Template.login.onRendered(()=> {
	$('[data-toggle="popover"]').popover({
		trigger: 'focus',
		placement: 'auto left',
		template: '<div class="popover alert alert-danger" role="tooltip"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"><span class="sr-only">Error:</span></span><div class="popover-content"></div><div class="arrow"></div></div>'
	});

	$('.form-login').validate({
		onkeyup: false,
		submitHandler: () => {
			let emailInput = $('[name=login-email]').val(),
				passwordInput = $('[name=login-password]').val();

			Meteor.loginWithPassword(emailInput, passwordInput, function(error){
				if(error){
					Bert.alert(error.reason, 'danger');
				} else {
					$('.login-modal').modal('hide');
					$('[name=login-email]').val('');
					$('[name=login-password]').val('');
				}
			});
		},
		rules: {
			'login-email': {
				required: true,
				email: true
			},
			'login-password': {
				required: true
			}
		},
		messages: {
			'login-email': {
				required: "Enter your email.",
				email: "Must be a valid email."
			},
			'login-password': {
				required: "Enter your password."
			}
		}
	});
});