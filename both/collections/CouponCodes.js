CouponCodes = new Mongo.Collection('coupon-codes');

let CouponCodesSchema = new SimpleSchema({
	'createdAt': {
        type: Date,
        label: 'When this coupon was created.'
    },
    'expirationDate': {
    	type: Date,
    	label: 'When this coupon will expire.'
    },
    'code': {
        type: String,
        label: 'The code to use the coupon.'
    },
    'used': {
    	type: Boolean,
    	label: 'Wheather the coupon has been used or not.'
    }
});

CouponCodes.attachSchema( CouponCodesSchema );