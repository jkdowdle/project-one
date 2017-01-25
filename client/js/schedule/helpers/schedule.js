Template.schedule.helpers({
	lowCredits() {
		let currentUser = Meteor.userId(),
			creditAmount = Accounts.users.findOne(currentUser).profile.credits;

		if (creditAmount < 5){
			return 'credit-warning';
		}
	},
	nextSession() {
		let currentUser = Meteor.user(),
				timezone = Accounts.users.findOne(currentUser).profile.timezone.name,
				now = new Date(moment().tz(timezone)),
				nextApptArr;

	//	console.log(timezone);

		if ( Roles.userIsInRole(currentUser, 'teacher') ) {
			nextApptArr = Events.find({ 'teachersRosterId': currentUser.profile.rosterId, 'status': 'Filled', 'timeStart': { '$gte': now } }, { 'sort': { 'timeStart': 1 }, limit: 1 })
				.fetch()
				.map((event) => {
					event.start = moment(event.timeStart).tz(timezone).format('YYYY-MM-DD');
					return event;
				});
		} else {
			nextApptArr = Events.find({ 'scheduledStudent': currentUser._id, 'status': 'Filled', 'timeStart': { '$gte': now } }, { 'sort': { 'timeStart': 1 }, limit: 1 })
				.fetch()
				.map((event) => {
					event.start = moment(event.timeStart).tz(timezone).format('YYYY-MM-DD');
					return event;
				});
		}

		let [ nextAppt ] = nextApptArr;

	//	console.log(nextAppt);

		if ( currentUser && nextApptArr && nextApptArr.length === 1 ) {
			console.log(nextAppt);
			return nextAppt; //moment(nextAppt.timeStart).format('llll');
		} else {
			return 'You are not currently signed up for a session';
		}
	},
	nextSessionTimeFormat( momentObj, timezone ) {
		if (momentObj) {
			let time = moment(momentObj).tz(timezone).format('lll'),
					relative = moment(momentObj).tz(timezone).calendar();

			console.log(relative);

			let check = relative.match(/\b(tomorrow|today)\b/gi);

			if ( check ) {
				return relative;
			}

			return time;
		} else {
			let currentUser = Meteor.userId();

			if ( Roles.userIsInRole(currentUser, 'teacher') ) {
				return 'None of your available sessions have been filled yet.';
			} else {
				return 'You are not currently signed up for a session.';
			}
		}
	},
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

		let	morningAppts = Events.find({ 'timeStart': { '$gte': morningStarts, '$lt': morningEnds } }, { 'sort': { 'timeStart': 1 } })
			.fetch()
			.map((event) => {
				event.start = moment(event.timeStart).tz(timezone).format('YYYY-MM-DD');
				event.timeStart = new Date(moment(event.timeStart).tz(timezone));
				return event;
			});

		if ( morningAppts && morningAppts.length > 0 ) {
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

		let	afternoonAppts = Events.find({ 'timeStart': { '$gte': afternoonStarts, '$lt': afternoonEnds } }, { 'sort': { 'timeStart': 1 } })
			.fetch()
			.map((event) => {
				event.start = moment(event.timeStart).tz(timezone).format('YYYY-MM-DD');
				event.timeStart = new Date(moment(event.timeStart).tz(timezone));
				return event;
			});

		if ( afternoonAppts && afternoonAppts.length > 0 ) {
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

		eveningStarts = new Date(eveningStarts);
		eveningEnds   = new Date(eveningEnds);

		let	eveningAppts = Events.find({ 'timeStart': { '$gte': eveningStarts, '$lt': eveningEnds } }, { 'sort': { 'timeStart': 1 } })
			.fetch()
			.map((event) => {
				event.start = moment(event.timeStart).tz(timezone).format('YYYY-MM-DD');
				event.timeStart = new Date(moment(event.timeStart).tz(timezone));
				return event;
			});

		if ( eveningAppts && eveningAppts.length > 0 ) {
			available = true;
		}

		return {
			appointments:	eveningAppts,
			available: available
		}
	},
	tester() {
		return 'Hey man!';
	}
});
