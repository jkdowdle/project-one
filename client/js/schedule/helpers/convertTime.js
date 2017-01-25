Template.registerHelper('usersTimezone', () => {
	if (Meteor.user()){
			let currentUser = Meteor.userId(),
					timezone = Accounts.users.findOne(currentUser).profile.timezone.name;
			return timezone;
	}
});

Template.registerHelper( 'convertTime', ( timestamp, timezone ) => {
	if ( timestamp ) {
		let time   = moment( timestamp ),
			format = 'LT';

		return timezone ? time.tz( timezone ).format( format ) : time.format( format );
	}
});

Template.registerHelper( 'convertTimeToFormat', ( timestamp, timezone, format ) => {
	if ( timestamp ) {
		let time   = moment( timestamp );

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
