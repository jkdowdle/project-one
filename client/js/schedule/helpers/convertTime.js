Template.registerHelper( 'convertTime', ( timestamp, timezone ) => {
	if ( timestamp ) {
		let time   = moment( timestamp ),
			format = 'LT';

		return timezone ? time.tz( timezone ).format( format ) : time.format( format );
	}
});

Template.registerHelper( 'convertDay', ( timestamp, timezone ) => {
	if ( timestamp ) {
		let time   = moment( timestamp ),
			format = 'YYYY-MM-DD';

		return timezone ? time.tz( timezone ).format( format ) : time.format( format );
	}
});