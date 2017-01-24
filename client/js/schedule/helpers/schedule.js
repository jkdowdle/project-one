Template.schedule.helpers({
	lowCredits() {
		let currentUser = Meteor.userId(),
			creditAmount = Accounts.users.findOne(currentUser).profile.credits;

		if (creditAmount < 5){
			return 'credit-warning';
		}
	},
/*	nextSession() {
		let userId = Meteor.userId(),
		//		now = moment().toISOString(),
				nextSession;

		if ( Roles.userIsInRole(userId, 'teacher') ) {
			let rosterId = Accounts && Accounts.users.findOne(userId).profile.rosterId;

			var now = new Date().getTime();
	    var msInDay = 1000 * 60 * 60 * 24;

	      nextSession = Events.find(
					{
	        	timeStart: {
	          	'$gte': ISODate("2017-01-20T23:00:00Z")
		        }
		      },
					{
						sort: { 'timeStart': 1 }
					},
					{
						'limit': 1
					}
				);

			//nextSession = Events.findOne({ 'teachersRosterId': rosterId, timeStart: { '$gte': new Date().toISOString() } }, { 'sort': { 'timeStart': 1 } }, { 'limit': 1});

									//	db.coll.find({name: 'montalto', 'users.username': 'ciccio'}).count() new ISODate("2012-01-12T20:15:31Z")
    } else {
			nextSession = Events.findOne({ 'scheduledStudent': userId }, { 'sort': { 'timeStart': 1 } });
		}

		console.log(moment().toISOString());

		return moment(nextSession.timeStart).format('YYYY-MM-DD hh:mm');
	}, */
	selectedDayEvents() {
		let selectedDay = Session.get('selectedDay'),
				daysAppts   = Events.find({ 'start': selectedDay }, { 'sort': { 'timeStart': 1 } }),
				existAppts;

		if (selectedDay) {
			selectedDay = moment(selectedDay).format('MM/DD/YYYY');
		}

		if ( daysAppts.count() > 0 ) {
			existAppts = true;
		} else {
			existAppts = false;
		}

		return {
			appts: daysAppts,
			day: selectedDay,
			apptsExist: existAppts
		};
	},
	selectedDay() {
		let selectedDay = Session.get('selectedDay');

		if (selectedDay) {
			selectedDay = moment(selectedDay).format('MM/DD/YYYY');
		}

		return selectedDay;
	},
	getMorning() {
		let currentUser = Meteor.userId(),
				timezone = Accounts.users.findOne(currentUser).profile.timezone.name,
		 		selectedDay    = Session.get('selectedDay'),
				morningStarts  = moment(selectedDay).tz(timezone).startOf('day').hour(0).minute(0).toISOString(),
				morningEnds    = moment(selectedDay).tz(timezone).startOf('day').hour(12).minute(0).toISOString(),
				available      = false;

		morningStarts = new Date(morningStarts);
		morningEnds   = new Date(morningEnds);

		let	morningAppts = Events.find({ 'timeStart': { '$gte': morningStarts, '$lt': morningEnds } }, { 'sort': { 'timeStart': 1 } });

		if ( morningAppts && morningAppts.count() > 0 ) {
			available = true;
		}

		return {
			appointments:	morningAppts,
			available: available
		}
	},
	getAfternoon() {
		let currentUser = Meteor.userId(),
				timezone = Accounts.users.findOne(currentUser).profile.timezone.name,
		 		selectedDay    = Session.get('selectedDay'),
				afternoonStarts  = moment(selectedDay).tz(timezone).startOf('day').hour(12).minute(0).toISOString(),
				afternoonEnds    = moment(selectedDay).tz(timezone).startOf('day').hour(17).minute(0).toISOString(),
				available      = false;

		afternoonStarts = new Date(afternoonStarts);
		afternoonEnds   = new Date(afternoonEnds);

		let	afternoonAppts = Events.find({ 'timeStart': { '$gte': afternoonStarts, '$lt': afternoonEnds } }, { 'sort': { 'timeStart': 1 } });

		if ( afternoonAppts && afternoonAppts.count() > 0 ) {
			available = true;
		}

		return {
			appointments:	afternoonAppts,
			available: available
		}
	},
	getEvening() {
		let currentUser = Meteor.userId(),
				timezone = Accounts.users.findOne(currentUser).profile.timezone.name,
		 		selectedDay    = Session.get('selectedDay'),
				eveningStarts  = moment(selectedDay).tz(timezone).startOf('day').hour(17).minute(0).toISOString(),
				eveningEnds    = moment(selectedDay).tz(timezone).startOf('day').hour(24).minute(0).toISOString(),
				available      = false;

		console.log(eveningStarts);
		console.log(eveningEnds);

		eveningStarts = new Date(eveningStarts);
		eveningEnds   = new Date(eveningEnds);

		// console.log(eveningStarts);
		// console.log(eveningEnds);

		let	eveningAppts = Events.find({ /*"start": '2017-01-24'*/ 'timeStart': { '$gte': eveningStarts, '$lt': eveningEnds } }, { 'sort': { 'timeStart': 1 } });

		if ( eveningAppts && eveningAppts.count() > 0 ) {
			available = true;
		}

		return {
			appointments:	eveningAppts,
			available: available
		}
	},
});
