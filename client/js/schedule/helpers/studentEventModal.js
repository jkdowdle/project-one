Template.studentEventModal.helpers({
    modalType( type ) {
        let eventModal = Session.get( 'eventModal' );
        if ( eventModal ) {
            return eventModal.type === type;
        }
    },
    modalLabel() {
        let eventModal = Session.get( 'eventModal' );

        if ( eventModal ) {
            return {
                button: eventModal.type === 'edit' ? 'Edit' : 'Add',
                label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
            };
        }
    },
    selected( v1, v2 ) {
        return v1 === v2;
    },
    event() {
        let eventModal = Session.get( 'eventModal' );

        if ( eventModal ) {
            return eventModal.type === 'edit' ? Events.findOne( eventModal.event ) : {
                start: eventModal.date,
                end: eventModal.date
            };
        }
    },
    valueTime(time) {
        return moment(time).format('hh:mm: a');
    },    
    usersTimezone() {
        if (Meteor.user()){
            let currentUser = Meteor.userId(),
                timezone = Accounts.users.findOne(currentUser).profile.timezone.name;
            return timezone;
        }
    }
});

Template.studentEventModal.rendered = () => {
    Template.studentEventModal.helpers({
        unscheduleAppt() {
            let eventModal = Session.get('eventModal');
                eventStatus = Events.findOne(eventModal.event).status;

            if(eventStatus === 'Filled')
                return true;
            else 
                return false;
        }
    });
};