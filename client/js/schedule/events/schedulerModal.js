Template.schedulerModal.events({
  'submit .appointment-scheduler' ( event, template ) {
    event.preventDefault();

    const target = event.target;

    let daysArr = $('input:checkbox:checked').map(function() {
        return this.value;
    }).get();

    let form = {
      teachersRosterId: target.teacher.value,
      preset: target.presets.value,
      weeksFromNow: target.weekOf.value,
      days: daysArr
    }

    let eventArray = setEvents(form);

    Meteor.call('addMultipleEvents', eventArray);
  }
});

let closeModal = () => {
  $( '#master-scheduler-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

let setEvents = ( data ) => {
  let preset = Presets.findOne(data.preset);

  let startInit = convertHour(preset.range[0].start),
      start = convertHour(preset.range[0].start),
      end = convertHour(preset.range[0].end),
      rest = preset.range[0].rest,
      duration = (parseInt(rest, 10) + parseInt(30, 10)),
      weeksFromNow = parseInt(data.weeksFromNow, 10);

  let eventArray = [];
  let event;
  let dayOfWeek;

  for ( let i = 0, dayLength = data.days.length; i < dayLength; i++ ) {
    start = startInit;
    dayOfWeek = data.days[i];

    while(start.isBefore(end)) {
      event = {
        title: 'Appointment',
        start: moment(start).weekday(dayOfWeek).add(weeksFromNow, 'w').format('YYYY-MM-DD'),
        end: moment(start).weekday(dayOfWeek).add(weeksFromNow, 'w').format('YYYY-MM-DD'),
        timeStart: new Date( moment(start).add(weeksFromNow, 'w').weekday(dayOfWeek) ),
        timeEnd: new Date( moment(start).add(weeksFromNow, 'w').weekday(dayOfWeek).add(30, 'm') ),
        status: "Open",
        scheduledStudent: 'Not Yet Available',
        teachersRosterId: data.teachersRosterId
      }

      start = moment(start).add(duration, 'm');
      eventArray.push(event);
    }
  }

  return eventArray;
};


function convertHour( hourStamp ) {
  let [ both, hour, minutes ] = hourStamp.match(/(\d\d):(\d\d)/);
  hour = parseInt(hour, 10);
  minutes = parseInt(minutes, 10);
  return moment({ hour: hour, minutes: minutes });
}
