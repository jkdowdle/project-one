Template.schedulerModal.helpers({
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
  },
  disableFilled() {

    let eventModal = Session.get('eventModal'),
    appointmentStatus;

    if (!eventModal) {
      appointmentStatus;
    } else {
      appointmentStatus = Events.findOne(eventModal.event) && Events.findOne(eventModal.event).status;
    }

    if (appointmentStatus === 'Filled') {
      return "disabled";
    } else {
      return "";
    }

  },
  scheduledStudentInfo() {
    let eventModal = Session.get('eventModal'),
    studentId,
    student;

    if ( eventModal ) {
      studentId = Events.findOne(eventModal.event) && Events.findOne(eventModal.event).scheduledStudent;
      student = Accounts.users.findOne(studentId);
      let name = student && student.profile && student.profile.name,
      skypeid = student && student.profile && student.profile.skypeid,
      email = student && student.emails[0] && student.emails[0].address;

      return {
        name: name,
        skypeid: skypeid,
        email: email
      }
    }
  },
  getTeachers() {
    let teachers = Accounts.users.find({ 'roles': 'teacher' })
      .fetch()
      .map((teacher) => {
        teacher.email = teacher.emails[0].address;

        return teacher;
      });
    return teachers;
  }
});
