/*Meteor.methods({
	'sendVerificationEmailLink': () => {

		let userId = Meteor.userId();
	    if ( userId ) {
	        return Accounts.sendVerificationEmail( userId );
	    }
	}
});

Accounts.emailTemplates.siteName = "Flueint";
Accounts.emailTemplates.from     = "Flueint <jkdowdle@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
	subject() {
		return "[Flueint] Verify Your Email Address";
	},
	text( user, url ) {
		let emailAddress   = user.emails[0].address,
		urlWithoutHash = url.replace( '#/', '' ),
		supportEmail   = "support@flueint.com",
		emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

		return emailBody;
	}
};*/