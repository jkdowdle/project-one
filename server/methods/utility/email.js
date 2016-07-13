Meteor.methods({
	'contactUsEmail': message => {
		console.log(message);
		
		Email.send({
			to: 'contact-us@flueint.com',
			from: message.email,
			subject: message.name + ' - ' + message.subject,
			text: message.content
		}, error => {
			if (error) {
				Bert.alert(error.reason, 'danger');
			}
		});
	},
	'receiptEmail': (charge, creditInc) => {
		check( charge, {
            amount: Number,
            currency: String,
            source: String,
            description: String,
            receipt_email: String
        });

        let convertAmount = ((charge.amount/100).toFixed(2));

        console.log(convertAmount);

		Email.send({
			to: charge.receipt_email,
			from: 'contact-us@flueint.com',
			subject: 'Payment Confirmation',
			text: `Flueint. \n\n We recently proccessed a payment for $` + convertAmount + ` for your purchase of ` + creditInc + ` credits. \n\n Thank you, and good luck! \n\n For any questions or concerns please contact us at contact-us@flueint.com.` 
		}, error => {
			if (error) {
				Bert.alert(error.reason, 'danger');
			}
		});
	}
});