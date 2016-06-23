Accounts.emailTemplates.resetPassword.from = function () {
   // Overrides value set in Accounts.emailTemplates.from when resetting passwords
   return "Flueint Password Reset <no-reply@flueint.com>";
};

Accounts.emailTemplates.resetPassword = {
	subject() {
		return "[Flueint] Reset your password.";
	},
	text( user, url ) {
		let emailAddress   = user.emails[0].address,
			urlWithoutHash = url.replace( '#/', '' ),
			supportEmail   = "support@flueint.com",
			emailBody      = `To reset your password, visit the following link:\n\n${urlWithoutHash}\n\n If you do not want to change your password, or did not request to change your password, ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

		return emailBody;
	}
};

