gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);

// ──────────────────────────────────────────────────────────────────────────
// Smooth scroll (Lenis) ⇄ GSAP ScrollTrigger
//
// Replaces the legacy smoothscroll.js (wheel-hijacking) which was the source
// of Safari jitter: Safari fights wheel-event interception, and ScrollTrigger
// was reading native scrollTop while smoothscroll.js animated to it.
//
// Lenis writes the *real* document scrollTop on every RAF tick, so
// ScrollTrigger, simpleParallax and any window-scroll listeners stay in sync
// with zero proxy overhead.
// ──────────────────────────────────────────────────────────────────────────
// NB: on touch we use `syncTouch` instead of `smoothTouch`. The two are
// mutually exclusive in practice — `smoothTouch` overrides native iOS
// momentum with a Lenis tween (which iOS fights, producing micro-jitter),
// while `syncTouch` lets iOS's own momentum drive the scroll and just keeps
// Lenis's interpolated value glued to it. That's what GSAP and Lenis docs
// recommend for iOS Safari, and what fixes the finger-scroll jitter.
var lenis = new Lenis({
	duration: 1.8,                                    // desktop wheel/key feel
	easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, // expo.out
	smoothWheel: true,
	wheelMultiplier: 0.9,
	lerp: 0.08,
	syncTouch: true,                                  // follow native iOS momentum, do not fight it
	syncTouchLerp: 0.05,                              // tighter follow = less perceived lag/jitter on iOS
	touchInertiaMultiplier: 25,                       // gentler tail after a flick (default 35)
	infinite: false
});
window.lenis = lenis;

// Forward Lenis ticks to ScrollTrigger so pinned/scrubbed animations stay glued
// to scroll progress without an extra rAF or scroller proxy.
lenis.on('scroll', ScrollTrigger.update);

// Drive Lenis from GSAP's ticker — single rAF loop, no jitter from competing loops.
gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// Lock smooth-scroll while the preloader is on screen (body.vh).
if (document.body && document.body.classList.contains('vh')) {
	lenis.stop();
}

var header = $('.header'),
	scrollPrev = 0;

$(window).on("scroll load resize", function () {
	var scrolled = $(window).scrollTop();
 	if (scrolled > 20) {
		header.addClass('fix');
	} else {
		header.removeClass('fix');
	}
	if ( scrolled > 100 && scrolled > scrollPrev ) {
				header.addClass('out');
	} else {
		header.removeClass('out');
	}
	scrollPrev = scrolled;
});

$(window).on('load resize',windowSize);
function windowSize(){
	if ($(".append").length){
		$('.append').each(function (idx, item) {
			if ($(window).width() <= '992'){
				var mobile = $(this).closest('section').find('.mob-append');
				$(this).appendTo(mobile);
			} else {
				var desctop = $(this).closest('section').find('.desc-appends');
				$(this).appendTo(desctop);
			}
		});
	}

}

if ($(".anim-lines").length){
	gsap.from(".anim-lines path", 4, {scrollTrigger: {
		trigger:".anim-lines",
		start: "top+=100px bottom-=15%", 
		end: "top bottom",
		scrub: 1,
	}, duration:1,drawSVG: 0,  ease: Quint.easeOut});
	gsap.from(".planet-video .video-container",2, {scrollTrigger: {trigger:".planet-video" ,start: "top+=100px bottom-=15%", end: "top bottom",scrub:true},   scale:"0.8",opacity:0,  ease: Quint.easeOut});
	gsap.from(".planet-lines",4, {scrollTrigger: {trigger:".planet-video" ,start: "top+=200px bottom-=15%", end: "top bottom",scrub:true},   scale:"0.8",opacity:0,  ease: Quint.easeOut});
	
	
}


if ($(".preload").length){
	lenis.scrollTo(0, { immediate: true, force: true });
	setTimeout(function() {$('.load-line').toggleClass("load");	  }, 3000);
	gsap.to(".gear-big",3, {   scale:"1",opacity:1,  ease: Quint.easeOut});
	gsap.to(".gear-2",3, {   scale:"1",opacity:1,  ease: Quint.easeOut,delay:"0.2"});
	gsap.to(".gear-4",3, {   scale:"1",opacity:1,  ease: Quint.easeOut,delay:"0.2"});
	gsap.to(".gear-3",3, {   scale:"1",opacity:1,  ease: Quint.easeOut,delay:"0.4"});
	gsap.to(".gear-5",3, {   scale:"1",opacity:1,  ease: Quint.easeOut,delay:"0.4"});
	gsap.from(".load-line path", 4, {duration:0,drawSVG: 0,ease: Quint.easeOut,delay:"1"});
	gsap.to(".pre-button",2, {   opacity:1,  ease: Quint.easeOut,delay:"2.5"});

	$(".load-line").on('click tap', function() {
		$(":root").find('body').removeClass("vh");
		lenis.start();
		ScrollTrigger.refresh();
		$(".sound-switcher").toggleClass("is-play");
			var audio = $(".audio")[0];
			if (audio.paused == false) {
				audio.pause();
			} else {
				audio.play();
			}
		gsap.to(".preload",2, {  opacity:"0",  ease: Quint.easeOut});
		gsap.to(".preload",2, {  y:"-100%",  ease: Quint.easeOut,delay:"1"});
		gsap.from(".hero-media",2, {   scale:"1.4", ease: Quint.easeOut});
		var split = new SplitText(".main-hero h1", {type: "words"});
		
		gsap.fromTo(split.chars, {
					opacity: 0,
					skewX: 0,
					filter: 'blur(8px)',
					delay:"1"
				  },
				{
			  ease: 'sine', // Animation easing.
			  opacity: 1,
			  skewX: 0,
			  filter: 'blur(0px)',
			  stagger: 0.05, // Delay between starting animations for each word.
			});
			var split2 = new SplitText(".main-hero .info-title", {type: "words"});
		
		gsap.fromTo(split2.chars, {
					opacity: 0,
					skewX: 0,
					filter: 'blur(8px)',
					delay:"1"
				  },
				{
			  ease: 'sine', // Animation easing.
			  opacity: 1,
			  skewX: 0,
			  filter: 'blur(0px)',
			  stagger: 0.05, // Delay between starting animations for each word.
			});


	});


	
		
		
		
		
	
	
}


if ($(".main-cases").length){
	gsap.to(".cases-container", {
		scrollTrigger: {
			trigger: ".cases-container",
			scrub: true,
			start: "top bottom",
			end: "bottom bottom",
			toggleClass: "active",
	
		}
		});
	gsap.from(".cases-video", {
		scrollTrigger: {
			trigger: ".cases-container",
			start: "400px bottom",
			end: "400px center",
			scrub: true,
			ease: "line"

		},
		scale:"0.5",opacity:"0"
	});
	gsap.to(".cases-titles", {
		scrollTrigger: {
			trigger: ".cases-titles",
			start: "bottom+=100 center",
			end: "bottom+=1000 bottom",
			
			scrub: 1,
			ease: "none"
		},
		scale:"0.5",opacity:"0"
	});
  
	
}


// ------- Osmo [https://osmo.supply/] ------- //

document.addEventListener("DOMContentLoaded", () => {
	// Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);
  // Parallax Layers
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });
    const layers = [
      { layer: "1", yPercent: 20 },
      { layer: "2", yPercent: 10 }
    ];
    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });
});



jQuery(document).ready(
	function() {
		// Route in-page anchor links through Lenis so anchor jumps glide
		// instead of teleporting (matches the rest of the page's feel).
		$(document).on('click', 'a[href*="#"]:not([href="#"]):not([data-fancybox])', function (e) {
			var href = this.getAttribute('href');
			var hashIndex = href.indexOf('#');
			if (hashIndex < 0) return;
			var hash = href.slice(hashIndex);
			if (hash.length < 2) return;
			// Only intercept anchors that belong to the current page.
			var samePage = (this.pathname === window.location.pathname || href.charAt(0) === '#');
			if (!samePage) return;
			var target = document.querySelector(hash);
			if (!target) return;
			e.preventDefault();
			lenis.scrollTo(target, { offset: -1 * (header.outerHeight() || 0) });
		});

		// Close mobile menu — and re-arm ScrollTrigger after the layout shift.
		$(".menu-button").on('click tap', function() {
			$(":root").find('body').toggleClass("menu-open");
			$(this).find('.but-icon').toggleClass("is-active");
			if ($('body').hasClass('menu-open')) { lenis.stop(); } else { lenis.start(); }
	  	});
		$(".lng-button").on('click tap', function() {
			$(this).parent().toggleClass("open");
	  	});
		$(".sound-switcher").on('click tap', function() {
			$(this).toggleClass("active");
	  	});

		Fancybox.bind('[data-fancybox]', {
			// Freeze smooth scroll while a lightbox is open — otherwise the
			// background can drift on Safari while the user interacts with it.
			on: {
				reveal: function () { if (window.lenis) lenis.stop(); },
				close:  function () { if (window.lenis) lenis.start(); }
			}
		});

		

		$(".sound-switcher").on('click tap', function() {
			$(this).toggleClass("is-play");
			var audio = $(".audio")[0];
			if (audio.paused == false) {
				audio.pause();
			} else {
				audio.play();
			}
	  	});
		$(".audio-button").on('click tap', function() {
			$(this).toggleClass("is-play");
			$(".sound-switcher").removeClass("is-play");
			var audio2 = $(".header").find('audio')[0];
			var audio = $(this).find('audio')[0];
			if (audio.paused == false) {
				audio.pause();

			} else {
				audio.play();
				audio2.pause();
			}
	  	});









		const fx6Titles = [...document.querySelectorAll('h2, h3, h4, .anim-text')];

		const wrapElements = (elems, wrapType, wrapClass) => {
			elems.forEach(char => {
				const wrapEl = document.createElement(wrapType);
				wrapEl.classList = wrapClass;
				char.parentNode.appendChild(wrapEl);
				wrapEl.appendChild(char);
			});
		}
		
		
		
		fx6Titles.forEach(title => {
			var split = new SplitText(title, {type: "words",wordsClass: "word"});
			const words = title.querySelectorAll('.word');
			
			for (const word of words) {
		
			
				gsap.fromTo(words, {
					opacity: 0,
					skewX: 0,
					willChange: 'filter, transform',
					filter: 'blur(8px)'
				  },
				{
			  ease: 'sine', // Animation easing.
			  opacity: 1,
			  skewX: 0,
			  filter: 'blur(0px)',
			  stagger: 0.05, // Delay between starting animations for each word.
			  scrollTrigger: {
				trigger: words, // Element that triggers the animation.
				start: 'top bottom-=15%', // Animation starts when element hits bottom of viewport.
				end: 'bottom center+=5%', // Animation ends in the center of the viewport.
				scrub: true, // Animation progress tied to scroll position.
			  },
			});
		
			}
		
		});








		$('.op').each(function(idx) {
			var op = "op" + idx;
			this.id = op;
			gsap.from(this,1, {scrollTrigger: {trigger:"#" + op ,start: "top-=0px bottom-=15%", end: "top bottom",scrub: true},   y:"80px",opacity:0,  ease: Quint.easeOut});
		
		});
		

		var image = document.getElementsByClassName('parallax');
		new simpleParallax(image, {
			orientation: 'down',
			delay: 0.5,
			scale: 1.2
		});

	}
);



$.fn.setCursorPosition = function(pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		var range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};




$(".phone").blur(function () {
	if($(this).val() != ''){
			$(this).parent().addClass('ok');
	} else {
			$(this).parent().removeClass('focus');
			$(this).parent().removeClass('ok');

		$(this).parent().removeClass('err');
		
	}
});

$(".phone").click(function(){
	$(this).setCursorPosition(6);
	}).mask("+38 (099) 999-99-99");
	

$(".input").focus(function () {
	$(this).parent().addClass('focus');
	$(this).parent().removeClass('error');
});

$(".input").blur(function () {
	var comment = $(this).html();
	if($(this).val() != '' || comment.length != 0){
		$(this).parent().addClass('ok');
		$(this).parent().removeClass('focus');
	} else {
		$(this).parent().removeClass('focus');
		$(this).parent().removeClass('ok');
	}
});

$(".textarea").focus(function () {
	$(this).parent().addClass('focus');
	$(this).parent().removeClass('error');
});

$(".textarea").blur(function () {
	var comment = $(this).html();
	if($(this).val() != '' || comment.length != 0){
		$(this).parent().addClass('ok');
		$(this).parent().removeClass('focus');
	} else {
		$(this).parent().removeClass('focus');
		$(this).parent().removeClass('ok');
	}
});


if ($(".detail-sticky").length){
	(function(){
		var a = document.querySelector('.detail-sticky'), b = null, P = 40;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
		window.addEventListener('scroll', Ascroll, false);
		document.body.addEventListener('scroll', Ascroll, false);
		function Ascroll() {
		  if (b == null) {
			var Sa = getComputedStyle(a, ''), s = '';
			for (var i = 0; i < Sa.length; i++) {
			  if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
				s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
			  }
			}
			b = document.createElement('div');
			b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
			a.insertBefore(b, a.firstChild);
			var l = a.childNodes.length;
			for (var i = 1; i < l; i++) {
			  b.appendChild(a.childNodes[1]);
			}
			a.style.height = b.getBoundingClientRect().height + 'px';
			a.style.padding = '0';
			a.style.border = '0';
		  }
		  var Ra = a.getBoundingClientRect(),
			  R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.sticky-stop').getBoundingClientRect().top);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
		  if ((Ra.top - P) <= 0) {
			if ((Ra.top - P) <= R) {
			  b.className = 'stop';
			  b.style.top = - R +'px';
			} else {
			  b.className = 'sticky';
			  b.style.top = P + 'px';
			}
		  } else {
			b.className = '';
			b.style.top = '';
		  }
		  window.addEventListener('resize', function() {
			a.children[0].style.width = getComputedStyle(a, '').width
		  }, false);
		}
		})()

}

// Re-measure ScrollTrigger after all images/fonts finish loading. Without this
// the start/end pixels are computed against a layout that's still settling and
// you get a "jump" the first time the user scrolls.
window.addEventListener('load', function () {
	if (window.ScrollTrigger) ScrollTrigger.refresh();
});