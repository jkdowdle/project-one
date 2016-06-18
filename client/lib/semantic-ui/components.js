// Skrollax - Parallax
/*
Template.parallaxSection.onCreated(() => {
  		'use strict';

  		$.Scrollax();
  		console.log('Parallax section created');
});
*/
Template.parallaxSection.onRendered(() => {
  		'use strict';

  		$.Scrollax();
  		console.log('Parallax section rendered');
});


// Caraousel
/*
Template.carousel.rendered = function() {
	let owl = $('.owl-carousel');
	console.log(owl);
	owl.owlCarousel({
		dots: false,
		animateOut: 'fadeIn',
	    singleItem: true,
	    items:1,
	    loop:true,
	    margin:10,
	    autoplay:true,
	    autoplayTimeout:5000,
	    autoplayHoverPause:true,
	    addClassActive: true
	});

	$(".owl-item.active h2").addClass('animated flipInX');

	owl.on('changed.owl.carousel', function() {
		$(".owl-item.active h2").addClass('animated flipInX');

	    setTimeout(function(){
	    	$(".owl-item.active h2").addClass('animated flipInX');
	    	setTimeout(function(){
	    		$(".owl-item h2").removeClass('animated flipInX');
	    	}, 1000);
		}, 10);
	});
};

Template.carousel.onDestroyed( () => {
	let owl = $('.owl-carousel');

	owl.owlCarousel({
	    autoplay: false
	});

	console.log(owl);
	console.log(owl.owlCarousel.autoplay);
});

*/

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
/*	    responsive:{
	        600:{
	            items:4
	        }
	    }*/
	});
/*
	$(".owl-item.active h2").addClass('animated flipInX');

	owl.on('changed.owl.carousel', function() {
		$(".owl-item.active h2").addClass('animated flipInX');

	    setTimeout(function(){
	    	$(".owl-item.active h2").addClass('animated flipInX');
	    	setTimeout(function(){
	    		$(".owl-item h2").removeClass('animated flipInX');
	    	}, 1000);
		}, 10);
	});*/
};