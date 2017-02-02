Meteor.methods({
  addEvent( event ) {
      check( event, {
          title: String,
          start: String,
          end: String,
          timeStart: Date,
          timeEnd: Date,
          status: String,
          teachersRosterId: String,
          scheduledStudent: String,
      });

      try {
          return Events.insert( event );
      } catch ( exception ) {
          throw new Meteor.Error( '500', `${ exception }` );
      }
  },
  addMultipleEvents( eventArray ) {
    console.log('add multi eventents');
    eventArray.forEach((event) => {
      Meteor.call('addEvent', event);
    });
  }
});
