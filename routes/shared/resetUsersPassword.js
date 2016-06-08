Router.route('/reset-password/:token', {
	name: 'resetPassword',
	data: () => {
		console.log('this.params');
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