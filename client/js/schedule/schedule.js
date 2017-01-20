// Schedule Branch

$( '#events-calendar' ).fullCalendar( 'changeView', 'basicWeek' );

$( '#events-calendar' ).css( 'color', 'pink' );

Template.schedule.rendered = function() {
/*
  $( '#events-calendar' ).fullCalendar({
    header: {
     left: 'prev,next today',
     center: 'title',
     right: 'month,agendaWeek,agendaDay'
    },
  });*/
};

let isPast = ( date ) => {
    let today = moment().format();
    return moment( today ).isAfter( date );
};

let beforeAppointment = '';
let apptPerDay = 1;
let day = 1;

Template.schedule.onCreated( () => {

    let template = Template.instance();
    template.subscribe( 'events' );
});

Template.schedule.onRendered( () => {
    $( '#events-calendar' ).fullCalendar({



        eventRender( event, element ) {

          if (event.status === 'Filled'){
            element.find('.fc-content').toggleClass('filled');
          }

          let currentUser = Meteor.userId(),
              usersTimezone = Accounts.users.findOne(currentUser).profile.timezone.name,
              time = moment(event.timeStart);

          element.find( '.fc-content' )
            .html(`
              <div class="row">
                <div class="col-xs-12">
                  <h5>${ time.tz(usersTimezone).format('LT') }</h5>
                </div>
              </div>
            `
          );
        },

        eventDrop( event, delta, revert ) {
            let date = event.start.format();
            if ( !isPast( date ) ) {

                let update = {
                    _id: event._id,
                    start: date,
                    end: date
                };

                Meteor.call( 'editEvent', update, ( error ) => {
                    if ( error ) {
                        Bert.alert( error.reason, 'danger' );
                    }
                });
            } else {
                revert();
                Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
            }
        },
        dayClick( date ) {
            let currentUser = Meteor.userId();

            if(Roles.userIsInRole(currentUser, 'teacher')){
                Session.set( 'eventModal', { type: 'add', date: date.format() } );
                $( '#add-edit-event-modal' ).modal( 'show' );
            }

            $( '#events-calendar' ).fullCalendar( 'changeView', 'basicWeek' );

            getEvents();
            renderEvents();
        },
        eventClick( event, jsEvent, view ) {
            console.log( jsEvent, view );

            Session.set( 'eventModal', { type: 'edit', event: event._id } );
            $( '#add-edit-event-modal' ).modal( 'show' );
        }
    });

    Tracker.autorun( () => {
        Events.find().fetch();
        $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
    });
});

function renderEvents() {
  $( '#events-calendar' ).fullCalendar({
    eventRender( event, element, view ) {
    console.log('rendering events');

      if (event.status === 'Filled'){
        element.find('.fc-content').toggleClass('filled');
      }

      let currentUser = Meteor.userId(),
          usersTimezone = Accounts.users.findOne(currentUser).profile.timezone.name,
          time = moment(event.timeStart);

      element.find( '.fc-content' )
        .html(`
          <div class="row">
            <div class="col-xs-12">
              <h5>${ time.tz(usersTimezone).format('LT') }</h5>
            </div>
          </div>
        `
      );
    },
  });
  eventRender();
};

function getEvents() {
  console.clear();
  console.log('getting events');

  $('#events-calendar').fullCalendar({
    events( start, end, timezone, callback ) {

        let currentUser = Meteor.userId();

        if(Roles.userIsInRole(currentUser, 'teacher')){
            teachersRosterId = Accounts.users.findOne(currentUser).profile.rosterId;
            let timezone = Accounts.users.findOne(currentUser).profile.timezone.name;
            let data = Events.find({teachersRosterId: teachersRosterId}, {sort: {timeStart: 1}}).fetch().map( ( event ) => {
                event.editable = !isPast( event.start );
                return {
                    _id: event._id,
                    title: event.title,
                    start: moment(event.timeStart).tz(timezone).format('YYYY-MM-DD'),
                    end: moment(event.timeStart).tz(timezone).format('YYYY-MM-DD'),
                    timeStart: event.timeStart,
                    timeEnd: event.timeEnd,
                    status: event.status,
                    teachersRosterId: event.teachersRosterId,
                    scheduledStudent: event.scheduledStudent
                }
            });

            if ( data ) {
                callback( data );
            }
        } else if (Roles.userIsInRole(currentUser, 'student')) {
            teachersRosterId = Accounts.users.findOne(currentUser).profile.teachersRosterId;
            let timezone = Accounts.users.findOne(currentUser).profile.timezone.name;
            let data = Events.find({/*teachersRosterId: teachersRosterId,*/ scheduledStudent: { $in: ["Not Yet Available", currentUser ] } }, {sort: {timeStart: 1}}).fetch().map( ( event ) => {
                return {
                    _id: event._id,
                    title: event.title,
                    start: moment(event.timeStart).tz(timezone).format('YYYY-MM-DD'),
                    end: moment(event.timeStart).tz(timezone).format('YYYY-MM-DD'),
                    timeStart: event.timeStart,
                    timeEnd: event.timeEnd,
                    status: event.status,
                    teachersRosterId: event.teachersRosterId,
                    scheduledStudent: event.scheduledStudent
                }
            });

            if ( data ) {
                callback( data );
            }
        }
    },
  });
  events();
}
