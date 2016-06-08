Events = new Mongo.Collection( 'events' );

Events.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Events.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let EventsSchema = new SimpleSchema({
    'title': {
        type: String,
        label: 'The title of this event.',
        allowedValues: [ 'Appointment' ]
    },
    'start': {
        type: String,
        label: 'When this event will start.'
    },
    'end': {
        type: String,
        label: 'When this event will end.'
    },
    'timeStart': {
        type: Date,
        min: new Date(),
        label: 'What time the appointment begins.'
    },
    'timeEnd': {
        type: Date,
        label: 'What time the appointment ends.'
    },    
    'status': {
        type: String,
        label: 'If the appointment is open or filled.',
        allowedValues: [ 'Open', 'Filled' ]
    },
    'teachersRosterId': {
        type: String,
        label: 'The roster Id of the teacher that created the appointment',
    },
    'scheduledStudent': {
        type: String,
        label: "The scheduled student's unique Id."
    }
});

Events.attachSchema( EventsSchema );