import { authenticate } from './authenticate';

Router.route('/verify-email/:token', {
	name: 'verifyEmail',
	template: 'verifyEmail',
	data: function(params) {
		console.log(this.params.token);
	},
    action( params ) {
    	console.log(params.token);
	    Accounts.verifyEmail( this.params.token, ( error ) =>{
			if ( error ) {
				Bert.alert( error.reason, 'danger' );
			} else {
				Router.go( '/' );
				Bert.alert( 'Email verified! Thanks!', 'success' );
			}
		});
    }
});