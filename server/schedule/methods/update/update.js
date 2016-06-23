Meteor.methods({
    editEvent( event ) {
        check( event, {
            _id: String,
            title: Match.Optional( String ),
            start: String,
            end: String,
            timeStart: Match.Optional( Date ),
            timeEnd: Match.Optional( Date ),
            status: Match.Optional( String ),
            teachersRosterId: Match.Optional( String ),
            scheduledStudent: String
        });

        try {           
            return [
                Events.update( event._id, {
                    $set: event
                })                
            ];
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    changeStatus( event, studentId, changeCredit ) {
        check( event, {
            _id: Match.Optional( String ),
            title: Match.Optional( String ),
            start: Match.Optional( String ),
            end: Match.Optional( String ),
            timeStart: Match.Optional( Date ),
            timeEnd: Match.Optional( Date ),
            status: String,
            teachersRosterId: Match.Optional( String ),
            scheduledStudent: String
        });

        console.log(typeof changeCredit);

        try {
            return [
                Events.update( event._id, {
                    $set: event
                }),
                Accounts.users.update(studentId, {
                    $inc: { 'profile.credits': changeCredit } 
                })  
            ];
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
});