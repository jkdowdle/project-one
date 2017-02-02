Template.presetModal.events({
  'submit .make-preset' ( event, template ) {
    event.preventDefault();
    const target = event.target;

    let newPreset = {
      name: target.presetName.value,
      range: [{
        start: target.start.value,
        end: target.end.value,
        rest: target.rest.value
      }]
    };

    let range = convertTimeRange( target.start.value, target.end.value, target.rest.value );

    newPreset.apptNumber = range.apptNumber;

    Meteor.call('createPreset', newPreset);

  }
});

function convertTimeRange( start, end, rest ) {
  start = convertHour( start );
  end = convertHour( end );

  function convertHour( hourStamp ) {
    let [ both, hour, minutes ] = hourStamp.match(/(\d\d):(\d\d)/);
    hour = parseInt(hour, 10);
    minutes = parseInt(minutes, 10);
    return moment({ hour: hour, minutes: minutes });
  }

  let range = {
    start,
    end
  };

  let count = 0;
  let aptLength = 30;
  let inbetween = parseInt(aptLength) + parseInt(rest);

  while ( range.start.isBefore(range.end) ) {
    range.start = moment(range.start).add(inbetween, 'm');
    count += 1;
  }

  range.apptNumber = count;
  return range;
}
