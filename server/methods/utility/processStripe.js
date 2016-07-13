let Stripe = StripeAPI( Meteor.settings.stripe );

Meteor.methods({
    processPayment( charge, creditInc ) {
        check( charge, {
            amount: Number,
            currency: String,
            source: String,
            description: String,
            receipt_email: String
        });

        let currentUser = Meteor.userId();

        Meteor.users.update(currentUser, {$inc: {'profile.credits': creditInc} });

        let handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges ),
            payment      = handleCharge( charge );

        Meteor.call('receiptEmail', charge, creditInc);

        return payment;
    }
});


