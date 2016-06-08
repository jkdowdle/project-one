Template.studentEventModal.events({
    'submit form' ( event, template ) {
        event.preventDefault();

    /*    let apptStart = new Date( template.find( '[name="start"]' ).value + ' ' + template.find('[name="timeStart"]').value);
        let apptEnd = moment(apptStart).add(30, 'minutes');
        let teachersRosterId = Meteor.user().profile.rosterId;
    */
        let currentStudent = Meteor.userId();

        let eventModal = Session.get( 'eventModal' ),
            submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
            eventItem  = {
        /*        title: template.find( '[name="title"]' ).value,
                start: template.find( '[name="start"]' ).value,
                end: template.find( '[name="end"]' ).value,
                timeStart: apptStart,
                timeEnd: new Date(apptEnd),
                teachersRosterId: teachersRosterId,*/ 
                status: 'Filled',               
                scheduledStudent: currentStudent
            };         

        if ( submitType === 'editEvent' ) {
            eventItem._id   = eventModal.event;
        }

        Meteor.call('changeStatus', eventItem, ( error ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                Bert.alert( `Appointment scheduled!`, 'success' );
                closeModal();
            }
        });

/*
        Meteor.call( submitType, eventItem, ( error ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
                closeModal();
            }
        });
        */
    },
    'click .unschedule-btn' ( event, template ) {
        console.log('hello test');
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
            Meteor.call('changeStatus', eventItem, ( error ) => {
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