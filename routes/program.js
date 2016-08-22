Router.route('/program/', {
	name: 'program',
	template: 'program',
	onAfterAction: function() {
		DocHead.removeDocHeadAddedTags()
		DocHead.setTitle('The Flueint Program to Learn English Online | Flueint.com');
		DocHead.addMeta({
			name: "description",
			content: "Work to become fluent in English! The Flueint program will help you learn and improve your English. Connect personally with a English tutor to learn general categories such as Bussiness and Travel, Medical and Mathematics, and much more!"
		});
	}
});