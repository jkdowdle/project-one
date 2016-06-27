// Skrollax - Parallax

Template.parallaxSection.rendered = function() {
	const frame = new Scrollax(window).init();
};

// Caraousel

Template.carousel.rendered = function() {

	let owl = $('.owl-carousel');

	owl.owlCarousel({
		autoplay: false,
		nav: true,
	    autoplayHoverPause:true,
	    addClassActive: true, 	
		dots: false,
	    singleItem: true, 	
	    items:1,
	    loop:true,
	    margin:10
	});

	$(".owl-item.active h2").addClass('animated flipInX');

	owl.on('changed.owl.carousel', () => {
		
		$(".owl-item.active h2").addClass('animated flipInX');

	    /*setTimeout(function(){
	    	$(".owl-item.active h2").addClass('animated flipInX');
	    	setTimeout(function(){
	    		$(".owl-item h2").removeClass('animated flipInX');
	    	}, 1000);
		}, 10);*/

	});
};

/* Social Media Carousel */

Template.mainFooter.rendered = function() {
	let owl = $('.social-media-carousel');

	owl.owlCarousel({
		autoplay: true,
		autoplayHoverPause: true,
	    center: true,
	    items:4,
	    loop:true,
	    margin:10,
	    dots: false,
	});
};