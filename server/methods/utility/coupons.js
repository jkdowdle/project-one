Meteor.methods({
	'couponCheck': code => {
		let check = CouponCodes.find({ code: code }, { limit: 1 }).count() > 0;

		if (check) {
			let coupon = CouponCodes.findOne({ code: code }, { limit: 1 });
			return coupon;
		} else {
			console.log('That is not a valid coupon code.','danger');
			return false;
		}
	}
});