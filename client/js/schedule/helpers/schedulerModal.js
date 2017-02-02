Template.schedulerModal.helpers({
  getTeachers() {
    let teachers = Accounts.users.find({ 'roles': 'teacher' })
      .fetch()
      .map((teacher) => {
        teacher.email = teacher.emails[0].address;

        return teacher;
      });
    return teachers;
  },
  getPresets() {
    let presets = Presets.find({}, { 'sort': { 'name': 1 } })
      .fetch()
      .map((preset) => {
        preset.start = convertHour( preset.range[0].start ).format('LT');
        preset.end = convertHour( preset.range[0].end ).format('LT');
        return preset;
      });

    return presets;
  },
  getWeeks() {
    let weekOf = [];

    for ( let i = 0; i < 5; i++ ) {
    	weekOf.push({
        day: moment().weekday(7).add(1 * i, 'w').format('dddd [the] Do [of] MMMM, YYYY'),
        date: moment().weekday(7).add(1 * i, 'w').format('YYYY-MM-DD'),
        weeksFromNow: parseInt((i * 1) + 1, 10)
      });
    }

    return weekOf;
  },
  weekDay() {
    let days = [
      { value: 1, name: 'monday' },
      { value: 2, name: 'tuesday' },
      { value: 3, name: 'wednesday' },
      { value: 4, name: 'thursday' },
      { value: 5, name: 'friday' },
      { value: 6, name: 'saturday' },
      { value: 0, name: 'sunday' }
    ];

    return days;
  }
});

function convertHour( hourStamp ) {
  let [ both, hour, minutes ] = hourStamp.match(/(\d\d):(\d\d)/);
  hour = parseInt(hour, 10);
  minutes = parseInt(minutes, 10);
  return moment({ hour: hour, minutes: minutes });
}
