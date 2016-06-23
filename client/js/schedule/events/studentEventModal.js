Template.studentEventModal.events({
    'click .schedule-btn' ( event, template ) {
        event.preventDefault();

        let currentStudent = Meteor.userId(),
            creditAmmount = Accounts.users.findOne(currentStudent).profile.credits,
            eventModal = Session.get( 'eventModal' ),
            submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
            eventItem  = { 
                status: 'Filled',               
                scheduledStudent: currentStudent
            };         

        if ( submitType === 'editEvent' ) {
            eventItem._id   = eventModal.event;
        }

        if (creditAmmount > 0){
            Meteor.call('changeStatus', eventItem, currentStudent, -1, ( error ) => {
                if ( error ) {
                    Bert.alert( error.reason, 'danger' );
                } else {
                    Bert.alert( `Appointment scheduled!`, 'success' );
                    closeModal();
                }
            });
        } else {
            Bert.alert('I am sorry, you do not have enough credits. <a href="/buy-credits">Buy more here.</a>', 'danger');
            closeModal();
        }        
    },
    'click .unschedule-btn' ( event, template ) {
        let currentStudent = Meteor.userId();
        let eventModal = Session.get( 'eventModal' ),
            submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
            eventItem  = {
                status: 'Open',               
                scheduledStudent: 'Not Yet Available'
            };         

        if ( submitType === 'editEvent' ) {
            eventItem._id   = eventModal.event;
        }

        if ( confirm( 'Are you sure? This is permanent.' ) ) {
            Meteor.call('changeStatus', eventItem, currentStudent, 1, ( error ) => {
                if ( error ) {
                    Bert.alert( error.reason, 'danger' );
                } else {
                    Bert.alert( `You are no longger signed up for this appointment`, 'warning' );
                    closeModal();
                }
            });
        }  
    }
});

let closeModal = () => {
    $( '#add-edit-event-modal' ).modal( 'hide' );
    $( '.modal-backdrop' ).fadeOut();
}; 