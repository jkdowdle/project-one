Template.addEditEventModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    let apptStart = new Date( template.find( '[name="start"]' ).value + ' ' + template.find('[name="timeStart"]').value);
    let apptEnd = moment(apptStart).add(30, 'minutes');
    let teachersRosterId = Meteor.user().profile.rosterId || event.target.teacher.value;

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
      Meteor.call( 'editEvent', eventItem, ( error ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
          closeModal();
        }
      });
    } else {
      Meteor.call( 'addEvent', eventItem, ( error ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
          closeModal();
        }
      });
    }

    keepSelectedDayHighlight();

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

    keepSelectedDayHighlight();
  }
});

let closeModal = () => {
  $( '#add-edit-event-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

let keepSelectedDayHighlight = () => {
  let selectedDay = Session.get('selectedDay');
  let today = moment().format('YYYY-MM-DD');
  setTimeout(() => {

    $('.fc-state-highlight').removeClass('fc-state-highlight');
    $(`[data-date=${selectedDay}]`).addClass('fc-state-highlight');
    $(`[data-date=${today}]`).addClass('fc-today');
  });
}
