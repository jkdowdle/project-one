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
    },
    unscheduleAppt() {
        if (Meteor.userId()){
            let eventModal = Session.get('eventModal'),
                eventStatus = Events.findOne(eventModal.event).status;

            if(eventStatus === 'Filled')
                return true;
            else 
                return false;
        }        
    },
    disabled() {
        if (Meteor.userId()){
            let appointment = Session.get('eventModal'),
                startTime = Events.findOne(appointment.event).timeStart,
                currentTime = new Date(),
                difference = startTime - currentTime,
                hours = moment.duration(difference).asHours();

            if (hours < 36)
                return "disabled";
            else
                return "";
        }
    },
    teacherInfo() {
        let eventModal = Session.get('eventModal').event,
            rosterId = Events.findOne(eventModal).teachersRosterId,
            teacher = Accounts.users.findOne({'profile.rosterId': rosterId});

        return {
            skypeid: teacher.profile.skypeid,
            email: teacher.emails[0].address
        }
    }
});
/*
    scheduledStudentInfo() {
        let eventModal = Session.get('eventModal').event,
            studentId = Events.findOne(eventModal).scheduledStudent,
            student = Accounts.users.findOne(studentId);

        let name = student && student.profile && student.profile.name,
            skypeid = student && student.profile && student.profile.skypeid,
            email = student && student.emails[0] && student.emails[0].address;

        return {
            name: name,
            skypeid: skypeid,
            email: email
        }
    }*/