// Translate Schedule Branch
let allApointments = [];

let isPast = ( date ) => {
    let today = moment().format();
    return moment( today ).isAfter( date );
};

Template.schedule.rendered = function() {
	let today = moment().format('YYYY-MM-DD');
  $(`[data-date='${today}']`).addClass('fc-today');
  $('[data-date="2017-01-21"]').css('background', 'pink');
};

Template.schedule.onCreated( () => {

    let template = Template.instance();
    template.subscribe( 'events' );

    Session.set('selectedDay', null);
});

/*
Template.i18n_dropdown.events({
  'change select' () {
    setInterval(function () {
      let userLang = TAPi18n.getLanguage();

      if ( userLang === 'zh' ) {
        userLang = 'zh-cn';
      }

      moment.locale(userLang);
    });
  }
});*/

Template.schedule.events({
  'click .fc-month-button' () {
    Session.set('selectedDay', null);
  },
  'click .add-appt' () {
    let currentUser = Meteor.userId();
    if ( Roles.userIsInRole(currentUser, 'teacher') ) {
      Session.set( 'eventModal', { type: 'add', date: Session.get('selectedDay') } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }
  },
  'click .fc-basicWeek-button' () {
    $('.fc-state-highlight').removeClass('fc-state-highlight');
    let today = moment().format('YYYY-MM-DD');
    $(`[data-date='${today}']`).addClass('fc-today fc-state-highlight');
  },
  'click .appointment' () {
    Session.set( 'eventModal', { type: 'edit', event: this._id } );
    $( '#add-edit-event-modal' ).modal( 'show' );
  },
  'click .fc-prev-button' () {
    $('.fc-state-highlight').removeClass('fc-state-highlight');
    let today = moment().format('YYYY-MM-DD');
    $(`[data-date='${today}']`).addClass('fc-today');
  },
  'click .fc-next-button' () {
    $('.fc-state-highlight').removeClass('fc-state-highlight');
    let today = moment().format('YYYY-MM-DD');
    $(`[data-date='${today}']`).addClass('fc-today');
  }
});

Template.schedule.onRendered( () => {

    $( '#events-calendar' ).fullCalendar({
      firstDay: 1,
      height: 600,
      header: {
       left: 'title',
       center: '',
       right: 'month,basicWeek,today,prev,next'
      },

      events( start, end, timezone, callback ) {

          let currentUser = Meteor.userId();
          let userTimezone = Accounts.users.findOne(currentUser).profile.timezone.name;

          if(Roles.userIsInRole(currentUser, 'teacher')){
              teachersRosterId = Accounts.users.findOne(currentUser).profile.rosterId;
              let usertimezone = Accounts.users.findOne(currentUser).profile.timezone.name;
              let data = Events.find({teachersRosterId: teachersRosterId}, {sort: {timeStart: 1}}).fetch().map( ( event ) => {
                  event.editable = !isPast( event.start );
                  let theevent = {
                      _id: event._id,
                      title: event.title,
                      start: moment(event.timeStart).tz(usertimezone).format('YYYY-MM-DD'),
                      end: moment(event.timeStart).tz(usertimezone).format('YYYY-MM-DD'),
                      timeStart: event.timeStart,
                      timeEnd: event.timeEnd,
                      status: event.status,
                      teachersRosterId: event.teachersRosterId,
                      scheduledStudent: event.scheduledStudent
                  };

                  allApointments.push(event);

                  return theevent;
              });

              if ( data ) {
                  callback( data );
              }

          } else if (Roles.userIsInRole(currentUser, 'student')) {
              teachersRosterId = Accounts.users.findOne(currentUser).profile.teachersRosterId;
              let usertimezone = Accounts.users.findOne(currentUser).profile.timezone.name;
              let data = Events.find({/*teachersRosterId: teachersRosterId,*/ scheduledStudent: { $in: ["Not Yet Available", currentUser ] } }, {sort: {timeStart: 1}}).fetch().map( ( event ) => {
                  let theevent = {
                      _id: event._id,
                      title: event.title,
                      start: moment(event.timeStart).tz(usertimezone).format('YYYY-MM-DD'),
                      end: moment(event.timeStart).tz(usertimezone).format('YYYY-MM-DD'),
                      timeStart: event.timeEnd,
                      timeEnd: event.timeEnd,
                      status: event.status,
                      teachersRosterId: event.teachersRosterId,
                      scheduledStudent: event.scheduledStudent
                  }
                  allApointments.push(theevent);
                  return theevent;
              });

              if ( data ) {
                  callback( data );
              }
          }

      },

      eventRender( event, element, view ) {

        let userLang = TAPi18n.getLanguage();

        if ( userLang === 'zh' ) {
          userLang = 'zh-cn';
        }

        moment.locale(userLang);

        let currentUser = Meteor.userId(),
            usersTimezone = Accounts.users.findOne(currentUser).profile.timezone.name,
            time = moment(event.timeStart);

        if ( view.type === 'month' || view.type === 'basicWeek' ) {
          $(element).css("display", "none");
        }

        $(element).each(function () {
          $(this).attr('date-num', event.start.format('YYYY-MM-DD'));
        });

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

      eventAfterAllRender(view) {
        allApointments = _.uniq(allApointments, function(appt) { return appt._id });

        let currentUser = Meteor.userId();
        let usertimezone = Accounts.users.findOne(currentUser).profile.timezone.name;

        if ( view.type === 'basicWeek' ) {
          $('#events-calendar').fullCalendar('option', 'height', 199);
        } else {
          $('#events-calendar').fullCalendar('option', 'height', 600);
        }

        $('.appointment-count').remove();
        for ( cDay = view.start.clone(); cDay.isBefore(view.end) ; cDay.add(1, 'day') ) {
        //  console.log(cDay);
          /* let dateNum = cDay.format('YYYY-MM-DD'),
              dayEl = $('.fc-day[data-date="' + dateNum + '"]'),
              totalNum = Events && Events.find({ "start": dateNum }).count(),
              filledNum = Events && Events.find({ "start": dateNum, "status": "Filled" }).count(),
              openNum = Events && Events.find({ "start": dateNum, "status": "Open" }).count(); */

          let dateNum = cDay.format('YYYY-MM-DD'),
              dayEl = $('.fc-day[data-date="' + dateNum + '"]'),
              totalNum = allApointments.filter((event, pos) => {
                if ( event.start === dateNum ) {
                  return event;
                }
              }).length,
              openNum = allApointments.filter((event, pos) => {
                if ( event.start === dateNum && event.status === 'Open' ) {
                  return event;
                }
              }).length;

          if( totalNum > 0 /* && view.name === 'month' */) {
            let pluralApt = 'Appts',
                eventCountTemplate;

            if( Roles.userIsInRole(currentUser, 'teacher') ) {

              if ( totalNum === 1 ) {
                pluralApt = 'Appt';
              }

              eventCountTemplate = `
                <div class="appointment-count text-center" style="margin-top: 2.5rem">
                  <i>${ ( totalNum - openNum ) }/${ totalNum }</i> <span class="hidden-xs hidden-sm"> - Filled ${ pluralApt }</span>
                </div>
              `;
            } else {

              if ( openNum === 1 ) {
                pluralApt = 'Appt';
              }

              eventCountTemplate = `
                <div class="appointment-count text-center" style="margin-top: 2.5rem">
                  <i>${ openNum }</i> <span class="hidden-xs hidden-sm"> - Open ${ pluralApt }</span>
                </div>
              `;
            }


            dayEl.append(eventCountTemplate);

          }
        }
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
      dayClick( date, jsEvent, view ) {
        let currentUser = Meteor.userId();
        let today = moment().format('YYYY-MM-DD');

        if ( view.name === 'month' ) {
          $( '#events-calendar' ).fullCalendar( 'changeView', 'basicWeek' );
          $( '#events-calendar' ).fullCalendar('gotoDate', date);

        } else {
          $( '#events-calendar' ).fullCalendar('gotoDate', date);
        }

        if ( Roles.userIsInRole(currentUser, 'teacher') && date.format() === Session.get('selectedDay') ) {
            Session.set( 'eventModal', { type: 'add', date: date.format() } );
            $( '#add-edit-event-modal' ).modal( 'show' );
        }

        //ad fc-today to th
        $(`th[data-date='${today}']`).addClass('fc-today');
        // reset selected day
        $(".fc-state-highlight").removeClass("fc-state-highlight");
        //highlight day th & td
        $(`[data-date='${date.format('YYYY-MM-DD')}']`).addClass('fc-state-highlight');

        Session.set('selectedDay', date.format() );
      },
      eventClick( event, jsEvent, view ) {

          Session.set( 'eventModal', { type: 'edit', event: event._id } );
          $( '#add-edit-event-modal' ).modal( 'show' );
      }
    });

    Tracker.autorun( () => {
      let userLang = TAPi18n.getLanguage();

      if ( userLang === 'zh' ) {
        userLang = 'zh-cn';
      }

      moment.locale(userLang);
      $('#events-calendar').fullCalendar('option', 'lang', userLang);

      Events.find().fetch();
      $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
    });
});
