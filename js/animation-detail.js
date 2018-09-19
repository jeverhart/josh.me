	    	"use strict";

	    	var Portfolio = Portfolio || {};
	    	Portfolio = {
	    		initialYOffset: null,
	    		docElemStyle: null,
	    		transitionProp: null,
	    		experience: null,
	    		theHeading: null,
	    		viewTop: null,
	    		viewBot: null,
	    		splitText: null,
	    		init: function(){
	    		
	    			Portfolio.initialYOffset = 300;
	    			Portfolio.viewTop = window.pageYOffset;
	    			Portfolio.viewBot = Portfolio.viewTop + window.innerHeight - 25;
	    			Portfolio.docElemStyle = document.documentElement.style;
	    			Portfolio.transitionProp = typeof Portfolio.docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
	    			
	    			Portfolio.nameTitle = document.getElementById("name-title");
	    			Portfolio.emailTitle = document.getElementById("email-title");
	    			
	    			Portfolio.experience = document.getElementById("experience");
	    			Portfolio.theHeading = document.getElementById("heading");

	    			Portfolio.siteWrapBgImage = document.getElementById("site-wrap-bg-image-overlay");
	    			Portfolio.homeBodyContent = document.getElementById("detail-body-content");
	    			
					Portfolio.splitText = new SplitText(Portfolio.theHeading, { type: "chars,words", wordsClass: "word" });
        			Portfolio.splitText.split({ type: "chars,words", wordsClass: "word"});
	    		
			        Portfolio.addEventListeners();
	
        			Portfolio.experience.style.visibility = "hidden";
        			Portfolio.theHeading.style.visibility = "hidden";
        			Portfolio.siteWrapBgImage.style.visibility = "hidden";
        			Portfolio.homeBodyContent.style.visibility = "hidden";
        			Portfolio.nameTitle.style.visibility = "hidden";
        			Portfolio.emailTitle.style.visibility = "hidden";
        			
        			Portfolio.theHeading.classList.add("animate");
			        Portfolio.animateHeader();
			        Portfolio.windowDidLoad();
			        Portfolio.animateOnscreenContent(true);

	    		},
	    		addEventListeners: function(){
	    			window.addEventListener("load", function(){
	    				Portfolio.windowDidLoad();
	    			});
	    			
	    			window.addEventListener("scroll", function(){
	    				Portfolio.windowDidScroll();
	    			});
	    			
	    			window.addEventListener("resize", function(){
	    				Portfolio.windowDidResize();
	    			});
	    		},
	    		windowDidLoad: function() {
	    			document.body.style.visibility = "";
	    		},
	    		
	    		animateHeader: function() {
	    			
	    			var t = new TimelineLite();
	    			t.staggerFrom(Portfolio.splitText.words, 1.0, { 
	    				opacity:0, y:300, rotationX: 0, rotationZ: 0, delay: 0.2, transformOrigin: "0%", ease: Expo.easeOut }, 0.02, "+=0");
	    				
	    			Portfolio.animateBasicElement(Portfolio.siteWrapBgImage, 0);
	    			
	    			Portfolio.theHeading.classList.add("animate");
	    			Portfolio.theHeading.style.visibility = "";
	    			Portfolio.animateBasicElement(Portfolio.siteWrapBgImage, 1000);
	    			
	    			Portfolio.experience.style.visibility = "";
	    			Portfolio.animateBasicElement(Portfolio.experience, 1000);
	    			
	    			Portfolio.nameTitle.style.visibility = "";
	    			Portfolio.animateBasicElement(Portfolio.nameTitle, 1000);
	    			Portfolio.emailTitle.style.visibility = "";
	    			Portfolio.animateBasicElement(Portfolio.emailTitle, 1000);
	    			
	    			Portfolio.homeBodyContent.style.visibility = "";
	    			Portfolio.animateBasicElement(Portfolio.homeBodyContent, 1000);
	    			
	    		},
	    		
	    		windowDidScroll: function(){
	    			Portfolio.animateOnscreenContent();
	    		},
	    		
	    		windowDidResize: function(){
	    			Portfolio.animateOnscreenContent();
	    		},
	    		
	    		animateOnscreenContent: function(initialLoad) {
	    			var windowTop = window.pageYOffset;
	    			var windowMid = windowTop + window.innerHeight * 0.5;
	    			var windowBot = windowTop + window.innerHeight - 250;
	    			
	    			// lazy loading images
					var imgs = document.querySelectorAll('img[data-src]');
					[].forEach.call(imgs, function(img) {
						//console.log('test');
						//console.log();
						if ((windowBot + 600) > Portfolio.getCoords(img).top) {
							console.log('load an image');
					  		img.setAttribute('src', img.getAttribute('data-src'));
					  		img.onload = function() {
					    		img.removeAttribute('data-src');
					  		};
						}
					});
	    		},
	    		getCoords: function(elem) {
	    			var box = elem.getBoundingClientRect();
	    			var body = document.body;
	    			var docEl = document.documentElement;
	    			var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	    			var clientTop = docEl.clientTop || body.clientTop || 0;
	    			var top = box.top + scrollTop - clientTop;
	    			
	    			return { top: Math.round(top) };
	    		},
	    		animateSplitText: function(element, splitText, yDelta, baseDelay, initialLoad){
	    			if (initialLoad){
	    				var initialDelay = Portfolio.initialDelay(element, 0, 0);
	    			}
	    			else {
	    				var initialDelay = 0;
	    			}
	    			var yDelta = yDelta ? yDelta : 100;
	    			
	    			element.style.visibility = "";
	    			if (initialDelay >= 0){
	    				var t = new TimelineLite();
	    				t.staggerFrom(splitText.chars, 1.0, {
	    					opacity: 0, y: yDelta, rotationX: -100, rotationZ: 20, delay: Math.max(0.2 + initialDelay + baseDelay, 0.2), transformOrigin: "0% 50% -60", ease: Expo.easeOut
	    				}, 0.02, "+=0");
	    			}
	    		},
	    		
			    animateBasicElement: function(element, baseDelay, initialLoad) {
			      element.style.visibility = "";
			      if (element.classList.contains("animate")) {
			        return;
			      }
			
			      var baseDelay = baseDelay ? baseDelay : 0;
			
			      if (initialLoad) {
			        var initialDelay = Portfolio.initialDelay(element, 0.6);
			      }
			      else {
			        var initialDelay = 0;
			      }
			
			      element.style[ Portfolio.transitionProp + 'Delay'] = (baseDelay + initialDelay) + 'ms';
			      requestAnimationFrame(function() {
			          element.classList.add("animate");
			      });
			    },
			
			    initialDelay: function(element, factor, initialYOffset) {
			
			        if (initialYOffset === undefined) {
			            initialYOffset = Portfolio.initialYOffset;
			        }
			
			        var windowTop = window.pageYOffset;
			        var elementTop = Portfolio.getCoords(element).top - initialYOffset;
			        var offsetTop = elementTop - windowTop;
			        return factor * offsetTop;
			    }
	    	}
	    	window.onload = function() {
	    		Portfolio.init();
	    	};