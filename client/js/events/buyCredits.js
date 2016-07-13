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
				
			Meteor.call( 'processPayment', charge, service.credits, ( error, response ) => {
				if ( error ) {
					template.processing.set( false );
					Bert.alert( error.reason, 'danger' );
				} else {
					Bert.alert( 'Thank You!', 'success' );
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
	}
});