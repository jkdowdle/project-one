Meteor.methods({
	'contactUsEmail': message => {

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
	},
	'couponEmail': userId => {

		let recipient = Meteor.users.findOne(userId).emails[0].address;

		let cc = require('coupon-code'),
			couponCode = cc.generate({ parts : 4 });

		let coupon = {
			createdAt: new Date(),
			expirationDate: new Date(moment().add(1, 'month')),
			code: couponCode,
			used: false
		}

		CouponCodes.insert( coupon );

		Email.send({
			to: recipient,
			from: 'no-reply@flueint.com',
			subject: 'Coupon',
			html: `<p>Thank you for signing up for Flueint.com</p> <p>Your coupon code is -</p> <p>` + couponCode + `</p> <p>You may use this coupon to receive 20 credits for over 20% off.</p> <p>To redeem and use this coupon use the link below. Click the "Use a Coupon" button. Enter your coupon code and proceed to checkout.</p> <a href='http://localhost:3000/buy-credits'>http://localhost:3000/buy-credits</a> <p>This coupon will expire in one month.</p>`,
		}, error => {
			if (error) {
				Bert.alert(error.reason, 'danger');
			}
		});
	}
});
