Template.registerHelper( 'selectOption', ( v1, v2 ) => {
	return v1 === v2 ? 'selected' : '';
});

Template.editMyAccount.helpers({
	myAccount() {
		return Meteor.user();
	},
	myEmail() {
		if (Meteor.user()){
			return Meteor.user().emails[0].address;
		}		
	},
	timezones() {
		return Modules.both.timezoneList;
	},
	checkGender(gender) {
		if (Meteor.user()) {
			var currentUser = Meteor.userId();
			var getUsersGender = Meteor.user().profile.gender;

			if ( gender == "Male" && gender == getUsersGender )
	 			return 'checked';
			else if ( gender == "Female" && gender == getUsersGender )
				return 'checked';
			else if ( gender == "Other" && gender == getUsersGender )
				return 'checked';
			else if ( gender == "Please Edit" && gender == getUsersGender )
				return 'checked';
			else 
				return '';
		}		
	}
});