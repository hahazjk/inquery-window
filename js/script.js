'use strict';

var App,
	Animate,
	$header		=	$('#header'),
	$myName		=	$('#myName'),
	nameHolder	=	document.getElementById('myName'),
	$svg		=	document.getElementById('svgCont'),
	// $stickyPos	=	$myName.offset().top,
	$bars 		=	$('.progressBar'),
	$main		=	document.getElementById('mainContent'),
	winHeight	=	window.innerHeight,
	backPos		=	-350,
	trigger		=	false,
	faderOff	=	false,
	// burger 		=	document.getElementById('burger'),
	menuOpen 	=	false,
	body		=	document.getElementsByTagName('body'),
	header		=	document.getElementById('headMenu'),
	$input		=	$('.textInput'),
	$form		=	$('#submitBtn');

	

// --- zApp ---
App = {
progressBar: function() {

	if (!trigger) {
		var bars 	= document.getElementsByClassName('progressBar'),
			qty		= bars.length-1,
			i = 0;

			
		while (i <= qty) {
			var	who		= bars[i],
				value	= who.getAttribute('data-prog');

			who.style.width = value+'%';
			i++;
		}
		trigger = true;
	}
},};

// --- zApp End ---


// --- Animations ---

Animate = {

	autoScroll: function(who) {

		var	target	=	who.attr('href'),
			minus;


		if (window.matchMedia('(min-width:1200px)').matches) {
			minus = ((window.innerHeight - $(target).height())/2)+65;
		} else {
			minus = 50;
		}

		TweenLite.to($('body,html'), 2,{ ease: Power2.easeInOut, scrollTop:  $(target).offset().top - minus });

	},

	progressBar: function() {

		if (!trigger) {
			var bars 	=	document.getElementsByClassName('progressBar'),
				qty		=	bars.length-1,
				i = 0;

				
			while (i <= qty) {
				var	who		= bars[i],
					value	= who.getAttribute('data-prog'),
					rdm		= Math.random()*(2000-1500+1)+1500;

				TweenLite.to($(who), rdm/1000, { ease: Power2.easeInOut, width: value+'%' });
				i++;
			}
			trigger = true;
		}
	},

	placeholdersBlur: function(who) {
		var placeholder = who.siblings('.placeholder'),
			value		= who.val();

		if (value === '') {
			TweenLite.to(placeholder, 0.2, { ease: Power2.easeInOut, top: 4, fontSize: 18, color: '#FFF' });
		}
	},

	placeholdersFocus: function(who) {
		var placeholder = who.siblings('.placeholder');

		TweenMax.to(placeholder, 0.3, { ease: Power2.easeInOut, top: -15, color: '#F1CA10' });
	},

	// mobileMenuOpen: function(who) {

	// 	who.addClass('burgerClosed');
	// 	header.style.left = 0+'px';
	// 	$('#headMenu').addClass('menuOpened');
	// 	TweenLite.set($('body, html'), { overflow: 'hidden' });

	// },

	// mobileMenuClose: function(who) {

	// 	who.removeClass('burgerClosed');
	// 	$('#headMenu').removeClass('menuOpened');
	// 	setTimeout(function() {
	// 		header.style.left = -100+'%';
	// 	},500);
	// 	TweenLite.set($('body, html'), { overflow: 'scroll' });
	// }


}
// --- Animations End ---


// --- Header ---

// $(document).ready(function() {
	
// 	if (window.matchMedia('(min-width:1025px)').matches && !App.isMobile()) {
// 		App.init();
// 	} else if (window.matchMedia('(max-width:1024px)').matches) {
// 		App.mobileHeader();
// 	}
// });

// $('.menu li a').on('click', function(event) {
// 	event.preventDefault();
// 	Animate.autoScroll($(this));
// 	if (window.matchMedia('(max-width:1024px)').matches) {
// 		Animate.mobileMenuClose($('#burger'));
// 		menuOpen = false;
// 	}
// });

// window.onscroll = function() {

// 	if (window.matchMedia('(min-width:1025px)').matches && !App.isMobile()) {
// 		App.headScroll();;
// 	}

// };

// burger.onclick = function() {
// 	if (!menuOpen && window.matchMedia('(max-width:1024px)').matches) {
// 		Animate.mobileMenuOpen($(this));
// 		menuOpen = true;
// 	} else if (menuOpen && window.matchMedia('(max-width:1024px)').matches){
// 		Animate.mobileMenuClose($(this));
// 		menuOpen = false;
// 	}
// }

// $('header').on('swipeleft', function () {

// 	if (menuOpen && window.matchMedia('(max-width:1024px)').matches){
// 		Animate.mobileMenuClose($('#burger'));
// 		menuOpen = false;
// 	}
// });

// $('body, html').on('swiperight', function() {
// 	if (!menuOpen && window.matchMedia('(max-width:1024px)').matches && App.isMobile()) {
// 		Animate.mobileMenuOpen($('#burger'));
// 		menuOpen = true;
// 	}
// });


// $(window).on('orientationchange', function() {
// 	if (App.isMobile()) {
// 		setTimeout(function() {
// 			App.mobileHeader();
// 		},250);
// 	}
// });
// --- Header End ---


// --- Main Content ---

window.onload = function() {

$(window).on('scroll', function() {

	var scrollOffset	= window.pageYOffset,
		positioning1	= $('#aboutMe').offset().top - (window.innerHeight / 2.5),
		positioning2	= $('#aboutMe').offset().top - (window.innerHeight),
		positioning3	= ($('#aboutMe').offset().top + $('#aboutMe').height() - (window.innerHeight / 4));

	if (window.matchMedia('(min-width: 1200px)').matches && !App.isMobile()) {
		if (scrollOffset > positioning1 && scrollOffset < positioning3) {
			Animate.progressBar();
		} else if (scrollOffset < positioning2 || scrollOffset > positioning3) {
			App.progressBarReset();
		}
	} else {
		App.progressBar();
	}
});}
// --- Main Content End ---