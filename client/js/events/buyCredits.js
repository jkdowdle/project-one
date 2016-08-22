Template.buyCredits.onCreated( () => {
	let template = Template.instance();

	template.selectedService  = new ReactiveVar( false );
    template.processing       = new ReactiveVar( false );

    let publicKey = Meteor.settings.public.stripe;

	template.checkout = StripeCheckout.configure({
		key: publicKey,
		locale: 'auto',
		image: '/img/flueint-logo.png',
		token( token ) {
			// We'll pass our token and purchase info to the server here.
			let service = template.selectedService.get(),
				charge  = {
					amount: token.amount || service.amount,
					currency: token.currency || 'usd',
					source: token.id,
					description: token.description || service.description,
					receipt_email: token.email
				};

			console.log(service);
			console.log(service.couponCode);
				
			Meteor.call( 'processPayment', charge, service.credits, ( error, response ) => {
				if ( error ) {
					template.processing.set( false );
					Bert.alert( error.reason, 'danger' );
				} else {					
					if (service.couponCode) {
						console.log(service.couponCode);
						Bert.alert('Your coupon has been redeemed.\nThank you!', 'success');
						Meteor.call('updateUsedCoupon', service.couponCode);
					} else {
						console.log('no coupon');
						Bert.alert( 'Thank You!', 'success' );
					}
				}
			});
		},
		closed() {
			template.processing.set( false );
		}
	});
});

Template.buyCredits.helpers({
	processing() {
		return Template.instance().processing.get();
	}
});

Template.buyCredits.events({
	'click [data-service]' ( event, template ) {
		const pricing = {
			'plan-ten': {
				amount: 10000,
				credits: 10,
				description: "Purchase Ten Credits"
			},
			'plan-twenty': {
				amount: 19000,
				credits: 20,
				description: "Purchase Twenty Credits"
			},
			'plan-thirty': {
				amount: 28000,
				credits: 30,
				description: "Purchase Thirty Credits"
			},
			'plan-coupon': {
				amount: 15000,
				credits: 20,
				description: "Coupon: 20% Off Twenty Credits",
				couponCode: Session.get('couponId')
			},
			'plan-test': {
				amount: 100,
				credits: 1,
				description: "Testing Stripe"
			}
		};

		let service = pricing[ event.target.dataset.service ];


		template.selectedService.set( service );
		template.processing.set( true );

		template.checkout.open({
			name: 'Flueint',
			description: service.description,
			amount: service.amount,
			alipay: true
		});
	},
	'click .get-coupon-modal': () => {
		console.log('yes1');
//		Meteor.call('couponEmail');
	},
	'submit .coupon-submit': event => {
		event.preventDefault();
		
		let couponInput = $('[name=couponInput]').val();

		const cc = require('coupon-code'),
			checkCoupon = cc.validate(couponInput,{parts: 4});

		if (checkCoupon) {
			console.log(true);
			Meteor.call('couponCheck', couponInput, (error, result) => {
				if (error)
					Bert.alert(error.reason,'danger')
				else {
					console.log(result);
					if (result) {
						if (result.used) {
							Bert.alert('This coupon has all ready been used.','danger');
							return false;
						} else {
							let now = new Date(),
								expirationDate = result.expirationDate,
								checkExpiration = moment(now).isBefore(expirationDate);

							console.log(checkExpiration);

							if (checkExpiration){
								Session.set('couponId',result._id);
								Bert.alert('Success.', 'success');
								$('.coupon-modal').modal('hide');
								$('.coupon-purchase').modal('show');
							} else {
								Bert.alert('This coupon has expired.', 'danger');
								return false;
							}
						}
					} else {
						Bert.alert('That is an invalid coupon code.', 'danger');
					}
				}				
			});
		} else {
			console.log(false);
			Bert.alert('That is an invalid coupon code.', 'danger');
		}
	},
	'click .coupon-buy-btn': () => {
		$('.coupon-purchase').modal('hide');		
	}
});