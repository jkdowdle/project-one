import { Accounts } from 'meteor/accounts-base'

Template.changeEmail.events({
	'submit form': function (event) {
		event.preventDefault();			
	},
	'click .go-back': () => {
		history.back();
	}
});

Template.changeEmail.onRendered(()=> {
	$('[data-toggle="popover"]').popover({
		trigger: 'focus',
		placement: 'auto left',
		template: '<div class="popover alert alert-danger" role="tooltip"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"><span class="sr-only">Error:</span></span><div class="popover-content"></div><div class="arrow"></div></div>'
	});

	$('#changeEmailForm').validate({
		onkeyup: false,
		submitHandler: () => {
			let userId = Meteor.userId(),
				currentEmail = Accounts.users.findOne(userId).emails[0].address,
				newEmail = $('[name=newEmail]').val(),
				oldEmail = $('[name=oldEmail]').val();

			if(currentEmail == oldEmail) {
				Meteor.call('addEmail', userId, newEmail, oldEmail, error => {
					if (error){
						Bert.alert(error.reason, 'danger');
					} else {
						Bert.alert(
							'You must verify new email by visiting the link sent to that email. Your old email has been removed from this account.', 'success');
					}
				});
			} else {
				Bert.alert(
					'The old email you entered was not an email associtated with your account.', 'danger');
			}
		},
		rules: {
			newEmail: {
				required: true,
				email: true
			},
			oldEmail: {
				required: true,
				email: true
			}
		},
		messages: {
			newEmail: {
				required: "Enter your new email.",
				email: "Must be a valid email."
			},
			oldEmail: {
				required: "Enter the current email associated with this account, or your old email.",
				email: "Must be a valid email."
			}
		}
	});
});