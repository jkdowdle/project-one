Meteor.methods({
	removeEvent( event ) {
		check( event, String );

		try {
			return Events.remove( event );
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	},
	removePreset( presetId ) {
		try {
			return Presets.remove( presetId );
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	}
});
