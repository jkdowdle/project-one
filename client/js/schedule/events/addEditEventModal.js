Template.addEditEventModal.events({
    'submit form' ( event, template ) {
        event.preventDefault();

        let apptStart = new Date( template.find( '[name="start"]' ).value + ' ' + template.find('[name="timeStart"]').value);
        let apptEnd = moment(apptStart).add(30, 'minutes');
        let teachersRosterId = Meteor.user().profile.rosterId;

        let eventModal = Session.get( 'eventModal' ),
            submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
            eventItem  = {
                title: template.find( '[name="title"]' ).value,
                start: template.find( '[name="start"]' ).value,
                end: template.find( '[name="end"]' ).value,
                timeStart: apptStart,
                timeEnd: new Date(apptEnd),
                status: template.find('[name="status"]').value,
                teachersRosterId: teachersRosterId,
                scheduledStudent: 'Not Yet Available'
            }; 

        if ( submitType === 'editEvent' ) {
            eventItem._id   = eventModal.event;
        }

        Meteor.call( submitType, eventItem, ( error ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
                closeModal();
            }
        });
    },
    'click .delete-event' ( event, template ) {
        let eventModal = Session.get( 'eventModal' );
        if ( confirm( 'Are you sure? This is permanent.' ) ) {
            Meteor.call( 'removeEvent', eventModal.event, ( error ) => {
                if ( error ) {
                    Bert.alert( error.reason, 'danger' );
                } else {
                    Bert.alert( 'Event deleted!', 'success' );
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