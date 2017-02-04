Template.presetModal.helpers({
  creatingPreset() {
    let creatingPreset = Session.get('creatingPreset');
    return creatingPreset;
  },
  getPresets() {
    let presets = Presets.find({}, { 'sort': { 'range.0.start': 1 } })
      .fetch()
      .map((preset) => {
        preset.start = convertHour( preset.range[0].start ).format('LT');
        preset.end = convertHour( preset.range[0].end ).format('LT');
        return preset;
      });

    return presets;
  },
  selectedPreset() {
    let presetId = Session.get('selectedPreset') || undefined;
    let preset;

    if (presetId) {
      preset = Presets.findOne(presetId._id);
      preset.start = preset.range[0].start;
      preset.end =  preset.range[0].end;
      preset.rest = preset.range[0].rest;
    }

    return preset;
  }
});

function convertHour( hourStamp ) {
  let [ both, hour, minutes ] = hourStamp.match(/(\d\d):(\d\d)/);
  hour = parseInt(hour, 10);
  minutes = parseInt(minutes, 10);
  return moment({ hour: hour, minutes: minutes });
}
