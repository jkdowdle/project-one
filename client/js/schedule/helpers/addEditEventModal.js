Template.addEditEventModal.helpers({
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
    },
    formatTime(time) {
        return moment(time).format('LT');
    }    
});
/*
Template.addEditEventModal( 'convertTime', ( timestamp, timezone ) => {
    if ( timestamp ) {
        let time   = moment( timestamp ),
        format = 'dddd, MMMM Do YYYY h:mm a';

        return timezone ? time.tz( timezone ).format( format ) : time.format( format );
    }
});
*/
Template.addEditEventModal.rendered = () => {
    Template.addEditEventModal.helpers({
        scheduledStudentInfo() {
            let eventModal = Session.get('eventModal').event,
                studentId = Events.findOne(eventModal).scheduledStudent,
                student = Accounts.users.findOne(studentId);

            return {
                name: student.profile.name,
                skypeid: student.profile.skypeid,
                email: student.emails[0].address
            }
        },
        disableFilled() {
            if(Meteor.user()){
                let appointment = Session.get('eventModal'),
                status = Events.findOne(appointment.event).status;

                if (status === 'Filled')
                    return true;
            }
        }
    });
};

