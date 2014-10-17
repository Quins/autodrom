$(document).ready(function() {
	
	if($('#social-stream').length) {
		
		$('#social-stream').dcSocialStream({
			feeds: {
				facebook: {
					id: '664264196953460'
				},
				instagram: {
					id: '!248535263',
					/*accessToken: 'bcc5fcfe46534172a4fc8bc5a373332e',
					redirectUrl: 'http://sochiautodrom.ru',
					clientId: '56d0347235b2422495a453ea2108cacd',*/
					accessToken: '248535263.3a67c3d.833195c6e264445a8b39bcf7998dec2f',
					redirectUrl: 'http://sochiautodrom.articul.ru:53080',
					clientId: '3a67c3dec9dd40c5a15a2ef86bd8bbfc'
				}
			},
			rotate: {
				delay: 0
			},
			control: false,
			filter: true,
			wall: true,
			cache: false,
			max: 'limit',
			limit: 10,
			iconPath: '/_catalogs/masterpage/images/dcsns-dark/',
			imagePath: '/_catalogs/masterpage/images/dcsns-dark/'
		});
	}

	$("[data-counter]").counter("12/10/2014 11:00 UTC");

	var waterwheel = $("[data-waterwheelcarousel]").waterwheelCarousel({

		activeClassName: "b-pictures-current-article",
		separation: parseInt($("[data-waterwheelcarousel]").width() / 6),
		forcedImageWidth: ( parseInt($("[data-waterwheelcarousel]").height() * 1.5) > $("[data-waterwheelcarousel]").width() ? $("[data-waterwheelcarousel]").width() : parseInt($("[data-waterwheelcarousel]").height() * 1.5)),
		forcedImageHeight: ( parseInt($("[data-waterwheelcarousel]").height() * 1.5) > $("[data-waterwheelcarousel]").width() ? parseInt(2 * $("[data-waterwheelcarousel]").width() / 3) : parseInt($("[data-waterwheelcarousel]").height()))
	});

    fancyboxinit();

    $("[data-waterwheelcarousel-roller]").each( function() {

		var direction = $(this).data("waterwheelcarousel-roller-direction");
		if (direction == 'forward') {

			$(this).click( function(event) {

				event.preventDefault();
				waterwheel.next();
			});
		} else if (direction == 'backward') {

			$(this).click( function(event) {

				event.preventDefault();
				waterwheel.prev();
			});
		}
	});

    var resizeTimeout;
    $(window).resize( function() {

    	if (resizeTimeout)
    		clearTimeout(resizeTimeout);

    	resizeTimeout = setTimeout( function() {

    		waterwheel.trigger("reload");
    	}, 600);
    });

    $("[data-reel]").swipes();
    waterwheel.swipes();

    waterwheel.on("reload", function() {

		waterwheel.reload({
			activeClassName: "b-pictures-current-article",
			separation: parseInt(waterwheel.width() / 6), 
			forcedImageWidth: ( parseInt(waterwheel.height() * 1.5) > waterwheel.width() ? waterwheel.width() : parseInt(waterwheel.height() * 1.5) ),
			forcedImageHeight: ( parseInt(waterwheel.height() * 1.5) > waterwheel.width() ? parseInt(2 * waterwheel.width() / 3) : parseInt(waterwheel.height()) )
		});

	    fancyboxinit();
    });

    waterwheel.on("qleftswipe", waterwheel.next);
    waterwheel.on("qrightswipe", waterwheel.prev);

	$("[data-reel]").reels({

		"partners-index": {

			offsetWidth: function() {
				if ($(window).width() >= 640) 
					return 190;
				else 
					return 136;
			}, 
			visibleFrameClass: "b-partners-visible-article", 
			invisibleFrameClass: "g-hidden", 
			disabledRollerClass: "b-partners-rotating-collection-disabled-roller"
		}, 
		"news-route": {

			visibleFrameClass: "b-news-article", 
			invisibleFrameClass: "b-news-invisible-article", 
			disabledRollerClass: "b-news-rotating-collection-disabled-roller", 
			currentPointClass: "b-news-collection-reel-guide-current-clause"
		}, 
		"news-video": {

			visibleFrameClass: "b-news-article", 
			invisibleFrameClass: "b-news-invisible-article", 
			disabledRollerClass: "b-news-rotating-collection-disabled-roller", 
			currentPointClass: "b-news-collection-reel-guide-current-clause"
		}, 
		"news-sport": {

			visibleFrameClass: "b-news-article", 
			invisibleFrameClass: "b-news-invisible-article", 
			disabledRollerClass: "b-news-rotating-collection-disabled-roller", 
			currentPointClass: "b-news-collection-reel-guide-current-clause"
		}
	});

	$("[data-toggle]").toggles({
		"track-submenu": {
			toggleOnOutsideClick: true
		}, 
		"news-submenu": {
			toggleOnOutsideClick: true
		}, 
		"events-submenu": {
			toggleOnOutsideClick: true
		}, 
		"hotels-submenu": {
			toggleOnOutsideClick: true
		}, 
		"press-submenu": {
			toggleOnOutsideClick: true
		},
		"scheme-freezone": {
			toggleOnOutsideClick: true
		}, 
		"scheme-t6": {
			toggleOnOutsideClick: true
		}, 
		"scheme-t5": {
			toggleOnOutsideClick: true
		}, 
		"scheme-t4": {
			toggleOnOutsideClick: true
		}, 
		"scheme-t2": {
			toggleOnOutsideClick: true
		}, 
		"scheme-t1": {
			toggleOnOutsideClick: true
		}, 
		"scheme-main": {
			toggleOnOutsideClick: true
		}, 
		"scheme-paddock": {
			toggleOnOutsideClick: true
		},
		"scheme-village": {
			toggleOnOutsideClick: true
		},
		"searchbox": {}, 
		"loges-platinum": {
			toggleOnOutsideClick: true
		},
		"loges-gold": {
			toggleOnOutsideClick: true
		},
		"loges-silver": {
			toggleOnOutsideClick: true
		}
	});

    if($("[data-tabulator]").length)
        initializeTabulators();

    if($("[data-rotator]").length)
        initializeRotators();

    if ($("[data-accordion]").length)
        initializeAccordions();

    $("[data-screen]").screens({

    	"secondary": {

    		showAnimation: function(entity) {

    			$(".l-outer").animate({

    				"margin-left": 0
    			}, 400);

    			$(".b-navigation").animate({

    				"left": 0
    			}, 400);

    			/*$(".b-navigation-toggle").animate({

    				"left": "280px"
    			}, 400);

    			$(".l-header").animate({

    				"left": "280px"
    			}, 400);*/
    		}, 
    		hideAnimation: function(entity) {

    			$(".l-outer").animate({

    				"margin-left": "-280px"
    			}, 400);

    			$(".b-navigation").animate({

    				"left": "-280px"
    			}, 400);

    			/*$(".b-navigation-toggle").animate({

    				"left": 0
    			}, 400);

    			$(".l-header").animate({

    				"left": 0
    			}, 400);*/
    		}
    	}
    });

    $("[data-select]").selects();

    afishainit();
    $(".b-general-scrolltop-button").click( function(e) {

    	e.preventDefault();
    	$("#s4-bodyContainer").animate({

    		scrollTop: 0
    	}, 800);
    });

    if ($("#s4-ribbonrow").length && $("#s4-ribbonrow").html().length > 0) {

    	$(".l-header").css("position", "absolute");
    }

    function fancyboxinit() {

		if ($.fn.fancybox) {

			waterwheel.find(".b-pictures-article").attr("rel", "mainpage-gallery").each( function(i,e) {

				$(this).attr("href", $(this).children(".b-pictures-article-entity").first().attr("src"));
			}).fancybox();
		}
    }

});

/* Let's do some magic */
	
	function afishainit() {

		var events = $(".afisha").find(".afisha__item");
		var pages = Math.ceil((events.length + 1) / 4);
		var page = { wrapper: false, before: false, after: false, allExceptFirstClass: false };
		var last = 0;

		if (events.length === 0)
			return false;

		if (pages > 1) {

			page = {

				wrapper: $("<section />", { class: "b-afisha-page" }),
				before: false, 
				after: false, 
				allExceptFirstClass: "g-hidden"
			}
		}

		for (var i = 0; i < pages; i++) {
			
			var pageend = Math.min((i + 1) * 4, events.length);
			var eslice = events.slice(last, pageend);

			last = pageend;

			if (page.wrapper) {

				var wrapper = page.wrapper;
				if (page.before)
					wrapper.before(page.before);
				if (page.after)
					wrapper.after(page.after);
				if (page.allExceptFirstClass && i > 0)
					wrapper.addClass(page.allExceptFirstClass);

				eslice.wrapAll(wrapper);
			}

			if (eslice.length == 1) {

				eslice.addClass("b-afisha-item-large");
			} else if (eslice.length == 2) {

				eslice.addClass("b-afisha-item-medium");
				eslice.eq(0).addClass("b-afisha-item-left-medium");
				eslice.eq(1).addClass("b-afisha-item-right-medium");
			} else if (eslice.length == 3) {

				eslice.eq(0).addClass("b-afisha-item-medium b-afisha-item-left-medium");
				eslice.eq(1).addClass("b-afisha-item-top-right");
				eslice.eq(2).addClass("b-afisha-item-bottom-right");
			} else if (eslice.length == 4) {

				eslice.eq(0).addClass("b-afisha-item-top-left");
				eslice.eq(1).addClass("b-afisha-item-top-right");
				eslice.eq(2).addClass("b-afisha-item-bottom-left");
				eslice.eq(3).addClass("b-afisha-item-bottom-right");
			}
		};

		var nextButton = $("<a />", { href: "#", class: "b-afisha-roller b-afisha-forward-roller" });
		if (pages > 1)
			$(".afisha").append(nextButton);
		nextButton.click( function(event) {

			event.preventDefault();

			var afishaPages = $(".b-afisha-page");
			var currentPage = $(".b-afisha-page").index($(".b-afisha-page:not(.g-hidden)"));
			var nextPage = ( currentPage + 1 < $(".b-afisha-page").length ? currentPage + 1 : 0 );
			afishaPages.eq(currentPage).fadeOut(350, function() {

				$(this).addClass("g-hidden");
				afishaPages.eq(nextPage).hide().removeClass("g-hidden").fadeIn(350);
			});
		});
	}

/* No magic after this sign, please */


/* Selects */

(function( $ ) {
	$.fn.selects = function(options) {

		if (!options)
			var options = {};

		return this.each( function() {

			var select = {
				descriptor: ($(this).data("select-descriptor") ? $(this).data("select-descriptor") : ""), 
				entity: $(this).find("[data-select-entity]"), 
				label: $(this).find("[data-select-label]")
			};

			select.properties = $.extend({}, 
				(select.descriptor in options ? options[select.descriptor] : {})
			);

			select.entity.change( function(event) {

				select.label.text( select.entity.find("option:selected").text() );
			});
		});
	};
})(jQuery);

/* Counter */

(function( $ ) {
	$.fn.counter = function(timex) {

		var targettime = {};
		var tmp = timex.split(" ");
		var tmpclock = tmp[1].split(":");
		var tmpcalendar = tmp[0].split("/");

		targettime.day = parseInt(tmpcalendar[0]);
		targettime.month = parseInt(tmpcalendar[1]) - 1;
		targettime.year = parseInt(tmpcalendar[2]);

		targettime.hour = parseInt(tmpclock[0]);
		targettime.minute = parseInt(tmpclock[1]);

		this.each( function() {

			var days = {
				entity: $(this).find("[data-counter-days]")
			}
			days.letterClass = (days.entity.data("counter-days-letterspan") ? days.entity.data("counter-days-letterspan") : "");

			var hours = {
				entity: $(this).find("[data-counter-hours]")
			}
			hours.letterClass = (hours.entity.data("counter-hours-letterspan") ? hours.entity.data("counter-hours-letterspan") : "");

			var minutes = {
				entity: $(this).find("[data-counter-minutes]")
			}
			minutes.letterClass = (minutes.entity.data("counter-minutes-letterspan") ? minutes.entity.data("counter-minutes-letterspan") : "");

			var seconds = {
				entity: $(this).find("[data-counter-seconds]")
			}
			seconds.letterClass = (seconds.entity.data("counter-seconds-letterspan") ? seconds.entity.data("counter-seconds-letterspan") : "");

			setInterval( function() {

				var now = new Date();
				var target = new Date(targettime.year, targettime.month, targettime.day, targettime.hour, targettime.minute);

				var difference = target.getTime() - now.getTime() - target.getTimezoneOffset() * 60 * 1000;

				var tmparray = ( '00' + Math.floor(difference / 86400000) ).slice(-3).toString().split("");
				days.entity.empty();
				$.each(tmparray, function(i, e) {

					days.entity.append($("<span />", { class: days.letterClass, text: e }));
				});

				var tmparray = ('0' + (Math.floor(difference / 3600000) % 24)).slice(-2).split("");
				hours.entity.empty();
				$.each(tmparray, function(i, e) {

					hours.entity.append($("<span />", { class: hours.letterClass, text: e }));
				});

				var tmparray = ('0' + (Math.floor(difference / 60000) % 60)).slice(-2).split("");
				minutes.entity.empty();
				$.each(tmparray, function(i, e) {

					minutes.entity.append($("<span />", { class: minutes.letterClass, text: e }));
				});

				var tmparray = ('0' + (Math.floor(difference / 1000) % 60)).slice(-2).toString().split("");
				seconds.entity.empty();
				$.each(tmparray, function(i, e) {

					seconds.entity.append($("<span />", { class: seconds.letterClass, text: e }));
				});

			}, 1000);

		});
	};
})(jQuery);

/* Reels */

(function( $ ) {
	$.fn.reels = function(options) {

		return this.each( function() {

			var reel = {
				descriptor: ($(this).data("reel-descriptor") ? $(this).data("reel-descriptor") : ""), 
				framesRepository: ($(this).find("[data-reel-frames-repository]") ? $(this).find("[data-reel-frames-repository]").first() : $(this)), 
				frames: [],
				$points: $(this).find("[data-reel-guide-point]"), 
				currentFrameOffset: 0, 
				forwardRollers: $(this).find("[data-reel-roller][data-reel-roller-descriptor='forward']"), 
				backwardRollers: $(this).find("[data-reel-roller][data-reel-roller-descriptor='backward']")
			};

			reel.framesRepository.css("overflow", "hidden");

			reel.properties = $.extend({
				visibleFrameClass: "g-visible",
				disabledRollerClass: "g-disabled", 
				offsetWidth: reel.framesRepository.find("[data-reel-frame]").first().width(),
				currentPointClass: false
			}, options[reel.descriptor]);

			function calcOffset() {

				var i = reel.frames.length,
					cwidth = 0, 
					twidth = 0;

				for (var j = 0; j < reel.frames.length; j++) {

					twidth += reel.frames[j].entity.outerWidth();
				};

				while (i > 0 && cwidth <= reel.framesRepository.width()) {

					cwidth += reel.frames[--i].entity.outerWidth();
				}

				reel.maximumOffset = reel.framesRepository.width() - twidth;

				reel.lastFrameOffset = i + 1;
			}

			function init() {

				reel.framesRepository.find("[data-reel-frame]").each( function(i) {

					reel.frames[i] = {

						entity: $(this),
						visible: false
					}
				});

				reel.$points = $(this).find("[data-reel-guide-point]");

				if (reel.$points.length > 0 && reel.properties.currentPointClass) {

					if (reel.$points.is("." + reel.properties.currentPointClass).length === 0)
						reel.$points.first().addClass(reel.properties.currentPointClass);
				}
			}
			init();

			$(this).on("reload", init);
			$(this).on("qleftswipe", function() {

				calcOffset();

				if (reel.currentFrameOffset < reel.lastFrameOffset)
					setOffset(reel.currentFrameOffset + 1);
			});
			$(this).on("qrightswipe", function() {

				if (reel.currentFrameOffset > 0)
					setOffset(reel.currentFrameOffset - 1);
			});

			reel.forwardRollers.each( function() {

				$(this).click( function(event) {

					event.preventDefault();
					setOffset(reel.currentFrameOffset + 1);
				});
			});

			reel.backwardRollers.each( function() {

				$(this).click( function(event) {

					event.preventDefault();
					setOffset(reel.currentFrameOffset - 1);
				});
			});

			reel.forwardRollers.removeClass(reel.properties.disabledRollerClass);
			reel.backwardRollers.removeClass(reel.properties.disabledRollerClass);

			function setOffset(frame) {

				calcOffset();

				if (frame === undefined || frame > reel.lastFrameOffset)
					frame = 0;

				if (frame < 0)
					frame = reel.lastFrameOffset;

				var offsetWidth = 0;

				for (var i = 0; i < frame; i++) {

					offsetWidth -= reel.frames[i].entity.outerWidth();
				};

				if (reel.$points.length > 0 && reel.properties.currentPointClass) 
					reel.$points.removeClass(reel.properties.currentPointClass).eq(frame).addClass(reel.properties.currentPointClass);

				if (offsetWidth < reel.maximumOffset)
					offsetWidth = reel.maximumOffset;

				reel.framesRepository.animate({

					"text-indent": offsetWidth
				}, 300);

				reel.currentFrameOffset = frame;
			}
		});
	};
})(jQuery);

/* Swipes */

(function( $ ) {
	$.fn.swipes = function(options, callback) {

		if (options && typeof(options) == "function") 
			var callback = options;

		return this.each( function() {

			var sensitivity = 80, 
				start = {}, 
				blockLinks = false, 
				blockScroll = false;

			var $this = $(this).addClass("g-selectproof");
			var $links = $(this).find("a");

			$this.on("touchstart mousedown", function(event) {

				start.x = event.originalEvent.pageX;
				start.y = event.originalEvent.pageY;

				blockLinks = false;
				blockScroll = false;
			});

			$this.on("dragstart", function(event) {

				event.preventDefault();
			});

			$this.on("touchmove mousemove", function(event) {

				if(!blockLinks) {

					var cur = {
						x: event.originalEvent.pageX, 
						y: event.originalEvent.pageY
					}

					if (d(start, cur) > sensitivity) {

						blockLinks = true;
					}
				}
				if (!blockScroll) {

					var cur = {
						x: event.originalEvent.pageX, 
						y: event.originalEvent.pageY
					}

					if (dx(start, cur) > sensitivity) {

						blockScroll = true;
					}
				} else {

					event.preventDefault();
				}
			});

			$links.on("touchend mouseup", function(linkevent) {

				if (blockLinks)
					linkevent.preventDefault();
			});

			$this.on("touchend mouseup", function(endevent) {

				var stop = {

					x: endevent.originalEvent.pageX,
					y: endevent.originalEvent.pageY
				}

				if (d(start, stop) > sensitivity) {

					var v = direction(start, stop, sensitivity);
					if ($.inArray("left", v) > -1) 
						$this.trigger("qleftswipe");
					if ($.inArray("top", v) > -1) 
						$this.trigger("qtopswipe");
					if ($.inArray("right", v) > -1) 
						$this.trigger("qrightswipe");
					if ($.inArray("bottom", v) > -1) 
						$this.trigger("qbottomswipe");
				}
			});

			function d(a, b) {

				return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
			}

			function dx(a, b) {

				return Math.abs(b.x - a.x);
			}

			function direction(a, b, sens) {

				var dir = [];

				var vertical = a.y - b.y;
				if (vertical > sens)
					dir.push("top");
				if (vertical < -sens)
					dir.push("bottom");

				var horizontal = a.x - b.x;
				if (horizontal > sens)
					dir.push("left");
				if (horizontal < -sens)
					dir.push("right");

				return dir;
			}

		});
	};
})(jQuery);

/* Toggles */

(function( $ ) {
	$.fn.toggles = function(options) {

		return this.each( function() {

			var toggle = {
				descriptor: ($(this).data("toggle-descriptor") ? $(this).data("toggle-descriptor") : ""), 
				entity: $(this), 
				on: false, 
				targets: []
			};

			toggle.properties = $.extend({
				toggleOnOutsideClick: false
			}, options[toggle.descriptor]);

			$("[data-toggle-target][data-toggle-target-descriptor='" + toggle.descriptor + "']").each( function(i) {

				toggle.targets[i] = {

					entity: $(this),
					toggleClass: $(this).data('toggle-target-class')
				}

				$(this).on("toggle", function(event) {

					toggle.on = event.state;
				});
			});

			toggle.entity.click( function(event) {

				event.preventDefault();
				$(document).unbind("mouseup").unbind("touchend");

				$.each(toggle.targets, function(i, e) {

					e.entity.toggleClass(e.toggleClass);
				});

				if (toggle.on) {

					emittoggle(false);
				} else {

					emittoggle(true);

					if (toggle.properties.toggleOnOutsideClick) {

						$(document).on("mouseup touchend", function (event) {

							var outside = 0;

							$.each(toggle.targets, function(i,e) {

								var container = e.entity;

								if (!container.is(event.target) && container.has(event.target).length === 0) {

									outside += 1;
								}
							});

							if (outside == toggle.targets.length && !toggle.entity.is(event.target) && toggle.entity.has(event.target).length === 0) {

								$.each(toggle.targets, function(i, e) {

									e.entity.toggleClass(e.toggleClass);
								});
								emittoggle(false);
								$(document).unbind("mouseup").unbind("touchend");
							}
						});
					}
				}
			});

			function emittoggle(state) {

				var e = $.Event( "toggle" );
				e.state = state;

				$("[data-toggle-target][data-toggle-target-descriptor='" + toggle.descriptor + "']").each(function() {

					$(this).trigger(e);
				});
			}
		});
	};
})(jQuery);

/* Screens */

(function( $ ) {
	$.fn.screens = function(options) {

		return this.each( function() {

			var scr = {
				descriptor: ($(this).data("screen-descriptor") ? $(this).data("screen-descriptor") : ""), 
				entity: $(this), 
				on: false, 
				openers: []
			};

			scr.properties = $.extend({
				screenOnOutsideClick: true, 
				showAnimation: function() {

					return false;
				},
				hideAnimation: function() {

					return false;
				}
			}, options[scr.descriptor]);

			$("[data-screen-opener][data-screen-opener-descriptor='" + scr.descriptor + "']").each( function(i) {

				scr.openers[i] = $(this);

				$(this).click( function(event) {

					event.preventDefault();
					scr.on = !scr.on;
					if (scr.on)
						scr.properties.showAnimation(scr.entity);
					else
						scr.properties.hideAnimation(scr.entity);
				});
			});

			$(document).on("mouseup touchend", function (event) {

				if (scr.on) {

					event.preventDefault();
					var container = $(".b-navigation");

					var openers = false;

					$.each(scr.openers, function(i,e) {

						if (e.is(event.target) || e.has(event.target).length) {

							openers = true;
						}
					});

					if (!container.is(event.target) && container.has(event.target).length === 0 && !openers) {

						scr.on = false;
						scr.properties.hideAnimation(scr.entity);
					}
				}
			});
		});
	};
})(jQuery);

/* Tabulators */
var tabulators = {};
var tabulatorsProperties = {

    "news-index": {

        tabsCurrentAdditionalClass: "b-news-collection-guide-current-clause"
    }, 
    "social-index": {

        tabsCurrentAdditionalClass: "b-posts-collection-guide-current-clause"
    }
};

function initializeTabulators() {

    $("[data-tabulator]").each(function() {

        var tabulatorID = generateIdentificator();
        var tabulatorDescriptor = ($(this).attr("data-tabulator-descriptor") ? $(this).attr("data-tabulator-descriptor") : "");

        tabulators[tabulatorID] = {

            tabulator: $(this),
            tabs: $(this).find("[data-tabulator-tab]"),
            currentTab: null,
            tabsRepository: $(this).find("[data-tabulator-tabs-repository]"),
            contents: $(this).find("[data-tabulator-tab-contents]"),
            properties: (tabulatorsProperties[tabulatorDescriptor] ? tabulatorsProperties[tabulatorDescriptor] : {})
        };

        tabulators[tabulatorID].tabs.each(function() {

            var tab = $(this);
            var tabDescriptor = ($(this).attr("data-tabulator-tab-descriptor") ? $(this).attr("data-tabulator-tab-descriptor") : "");

            if(tabulators[tabulatorID].properties.tabsCurrentAdditionalClass && tabulators[tabulatorID].tabs.filter("." + tabulators[tabulatorID].properties.tabsCurrentAdditionalClass))
                tabulators[tabulatorID].currentTab = tabulators[tabulatorID].tabs.filter("." + tabulators[tabulatorID].properties.tabsCurrentAdditionalClass);

            tab.find("[data-tabulator-tab-link]").click(function() {

                if(!tabulators[tabulatorID].currentTab || (tabulators[tabulatorID].currentTab && !tab.hasClass(tabulators[tabulatorID].properties.tabsCurrentAdditionalClass))) {

                    tabulators[tabulatorID].currentTab.toggleClass(tabulators[tabulatorID].properties.tabsCurrentAdditionalClass);
                    tab.toggleClass(tabulators[tabulatorID].properties.tabsCurrentAdditionalClass);

                    tabulators[tabulatorID].contents.not("[class*='g-hidden']").toggleClass("g-hidden");
                    tabulators[tabulatorID].contents.filter("[data-tabulator-tab-contents-descriptor='" + tabDescriptor + "']").toggleClass("g-hidden");

                    if(tabulators[tabulatorID].contents.filter("[data-tabulator-tab-contents-descriptor='" + tabDescriptor + "']").find(".b-news-previews").length) {

                        tabulators[tabulatorID].contents.filter("[data-tabulator-tab-contents-descriptor='" + tabDescriptor + "']").find("[data-pack]").forcePack(-1);
                    }

                    tabulators[tabulatorID].currentTab = tab;
                }

                return false;
            });

            if(tabulators[tabulatorID].properties.initializeFunction)
                executeFunction(tabulators[tabulatorID].properties.initializeFunction, null, tabulatorID);
        });
    });
}

/* Accordions */

var accordions = {};
var accordionsProperties = {};

function initializeAccordions() {

    $("[data-accordion]").each(function() {

        var accordionID = generateIdentificator();
        var accordionDescriptor = ($(this).attr("data-accordion-descriptor") ? $(this).attr("data-accordion-descriptor") : "");

        accordions[accordionID] = {

            accordion: $(this),
            descriptor: accordionDescriptor,
            groups: [],
            opened: false,
            locked: false,
            properties: (accordionsProperties[accordionDescriptor] ? accordionsProperties[accordionDescriptor] : {})
        };

        accordions[accordionID].accordion.attr("data-accordion-identificator", accordionID);

        $("[data-accordion-group][data-accordion-group-descriptor='" + accordions[accordionID].descriptor + "']").each( function(i) {
            var group = {
                header: $(this).find("[data-accordion-group-toggle]"),
                content: $(this).find("[data-accordion-group-content]"),
                open: ($(this).find("[data-accordion-group-toggle]").data("accordion-group-open") ? true : false)
            }

            if (!group.header || !group.content)
                return false;

            accordions[accordionID].groups.push(group);
            group.header.data("accordion-group-identificator", i);

            if (!group.open) {
                group.content.slideUp(-1);
                group.header.parent().removeClass('b-primary-menu-current-clause');
            } else {
                group.content.slideDown(-1);
                group.header.parent().addClass('b-primary-menu-current-clause');
            }

            group.header.click( function(event) {
            	event.preventDefault();
                if (!accordions[accordionID].locked) {
                    accordions[accordionID].locked = true;
                    accordionGroupToggle(accordionID, i);
                } else
                    return false;
            });
        });

    });
}

function accordionGroupToggle (accordionID, grpID) {

    var grp = grpID;

    if (!accordions[accordionID] || accordions[accordionID].groups.length < grpID)
        return false;

    if (!accordions[accordionID].opened) {
        if (accordions[accordionID].groups[grpID].header.data('screen-opener')) {
            toggleScreen(accordions[accordionID].groups[grpID].header.data('screen-identificator'));
            accordions[accordionID].opened = true;
        }
    } else {
        if (accordions[accordionID].groups[grpID].open) {
            if (accordions[accordionID].groups[grpID].header.data('screen-opener')) {
                toggleScreen(accordions[accordionID].groups[grpID].header.data('screen-identificator'));
                accordions[accordionID].opened = false;
                $.each(accordions[accordionID].groups, function(i, el) {
                    accordions[accordionID].groups[i].content.css("display", "none");
                });
                grp = -1;
            }
        }
    }

    $.each(accordions[accordionID].groups, function(i, el) {

        if (i != grp) {
            accordions[accordionID].groups[i].open = false;
            accordions[accordionID].groups[i].header.removeClass('b-navigation-section-active-toggle');
            accordions[accordionID].groups[i].content.slideUp(500);
        } else {
            accordions[accordionID].groups[i].open = true;
            accordions[accordionID].groups[i].header.addClass('b-navigation-section-active-toggle');
            accordions[accordionID].groups[i].content.slideDown(500);
            accordions[accordionID].opened = true;
        }
    });

    $(':animated').promise().done( function() {
        accordions[accordionID].locked = false;
    });

    return 0;

}

/* Rotators */
var rotators = {};
var rotatorsProperties = {

    "news-index": {

        animation: "displaying"
    }, 
	"loges-gallery": {

		animation: "displaying", 
		positionsPointsCurrentAdditionalClass: "b-offers-article-pictures-collection-guide-current-clause"
	}, 
	"index-promo": {

		animation: "displaying", 
		positionsPointsCurrentAdditionalClass: "b-promos-collection-guide-current-clause", 
		automation: true, 
		automationInterval: 8000
	}
};

function initializeRotators() {
	
	$("[data-rotator]").each(function() {

		var rotatorID = generateIdentificator();
		var rotatorDescriptor = ($(this).attr("data-rotator-descriptor") ? $(this).attr("data-rotator-descriptor") : "");
		
		rotators[rotatorID] = {
			
			rotator: $(this),
			descriptor: rotatorDescriptor,
			articles: $(this).find("[data-rotator-article]"),
			articleWidth: $(this).find("[data-rotator-article]").eq(0).width(),
			articlesCount: $(this).find("[data-rotator-article]").length,
			articlesDistance: (parseInt($(this).find("[data-rotator-article]").last().css("marginLeft")) ? parseInt($(this).find("[data-rotator-article]").last().css("marginLeft")) : 0),
			articlesRepository: ($(this).find("[data-rotator-articles-repository]").length ? $(this).find("[data-rotator-articles-repository]") : $(this)),
			articlesRepositoryWidth: ($(this).find("[data-rotator-articles-repository]").length ? $(this).find("[data-rotator-articles-repository]").width() : $(this).width()),
			rollers: {

				backward: ($(this).find("[data-rotator-roller][data-rotator-roller-descriptor='backward']").length ? $(this).find("[data-rotator-roller][data-rotator-roller-descriptor='backward']") : null),
				forward: ($(this).find("[data-rotator-roller][data-rotator-roller-descriptor='forward']").length ? $(this).find("[data-rotator-roller][data-rotator-roller-descriptor='forward']") : null)
			},
			rollersTitles: {
				
				backward: ($(this).find("[data-rotator-roller][data-rotator-roller-descriptor='backward']").find("[data-rotator-roller-title]").length ? $(this).find("[data-rotator-roller][data-rotator-roller-descriptor='backward']").find("[data-rotator-roller-title]") : null),
				forward: ($(this).find("[data-rotator-roller][data-rotator-roller-descriptor='forward']").find("[data-rotator-roller-title]").length ? $(this).find("[data-rotator-roller][data-rotator-roller-descriptor='forward']").find("[data-rotator-roller-title]") : null)
			},
			currentPosition: 0,
			positionsPoints: ($(this).find("[data-rotator-points-article]").length ? $(this).find("[data-rotator-points-article]") : null),
			positionsPointsRepository: $(this).find("[data-rotator-points]"),
			currentPositionsPoint: $(this).find("[data-rotator-points-article][data-rotator-points-article-descriptor='current']"),
			indicator: ($(this).find("[data-rotator-indicator]").length ? $(this).find("[data-rotator-indicator]") : null),
			indicatorPosition: ($(this).find("[data-rotator-indicator-position]").length ? $(this).find("[data-rotator-indicator-position]") : null),
			indicatorQuantity: ($(this).find("[data-rotator-indicator-quantity]").length ? $(this).find("[data-rotator-indicator-quantity]") : null),
			paused: false,
			automationPaused: true,
			properties: (rotatorsProperties[rotatorDescriptor] ? rotatorsProperties[rotatorDescriptor] : {})
		}
		
		rotators[rotatorID].articlesRepository.scrollLeft(0);
		
		rotators[rotatorID].rotator.attr("data-rotator-identificator", rotatorID);
		
		if(rotators[rotatorID].indicatorPosition)
			rotators[rotatorID].indicatorPosition.text(rotators[rotatorID].currentPosition + 1);
			
		if(rotators[rotatorID].indicatorQuantity)
			rotators[rotatorID].indicatorQuantity.text(rotators[rotatorID].articlesCount);
		
		rotators[rotatorID].viewedArticlesCount = Math.ceil(rotators[rotatorID].articlesRepositoryWidth / (rotators[rotatorID].articleWidth + rotators[rotatorID].articlesDistance));
		
		if(rotators[rotatorID].rollers.backward) {
			
			rotators[rotatorID].rollers.backward.click(function(event) {

				event.preventDefault();
				rotators[rotatorID].automationPaused = true;
				turnRotator(rotatorID, "backward");
			});
		}
		
		if(rotators[rotatorID].rollers.forward) {
			
			if(rotators[rotatorID].properties.rollersDisabledClass && rotators[rotatorID].articlesCount > rotators[rotatorID].viewedArticlesCount)
				rotators[rotatorID].rollers.forward.toggleClass(rotators[rotatorID].properties.rollersDisabledClass);
			
			rotators[rotatorID].rollers.forward.click(function(event) {

				event.preventDefault();
				rotators[rotatorID].automationPaused = true;
				turnRotator(rotatorID, "forward");
			});
		}
		
		if(rotators[rotatorID].properties.swipe) {
			
			rotators[rotatorID].swipeStatus = false;
			rotators[rotatorID].swipePositions = {};
			
			rotators[rotatorID].rotator.on("touchstart mousedown", function (e) {
				
				rotators[rotatorID].swipeStatus = true;
				rotators[rotatorID].swipePositions = {
					
					x: e.originalEvent.pageX,
					y: e.originalEvent.pageY
				};
			});

			rotators[rotatorID].rotator.on("touchend mouseup", function (e) {
				
				rotators[rotatorID].swipeStatus = false;
				rotators[rotatorID].swipePositions = null;
			});
			
			rotators[rotatorID].rotator.on( "touchmove mousemove", function (e) {
								
				if (!rotators[rotatorID].swipeStatus)
					return;
					
				if(Math.abs(getSwipeInformation(e, rotators[rotatorID].swipePositions).offset.x) > (rotators[rotatorID].articleWidth / 3)) {
					
					turnRotator(rotatorID, (getSwipeInformation(e, rotators[rotatorID].swipePositions).direction.x == "left" ? "forward" : "backward"));
					
					rotators[rotatorID].swipePositions = {
					
						x: e.originalEvent.pageX,
						y: e.originalEvent.pageY
					};
				}
				
				e.preventDefault();
			});
		}

		if(rotators[rotatorID].positionsPoints) {

			rotators[rotatorID].positionsPoints.each( function( index ) {

				$(this).children("[data-rotator-points-article-link]").click( function(evt) {

					evt.preventDefault();
					rotators[rotatorID].automationPaused = true;
					hurlRotator(rotatorID, index);
				});
			})
		}
		
		if(rotators[rotatorID].properties.automation) {

			rotators[rotatorID].automationPaused = false;
			rotators[rotatorID].automationID = setInterval( function() {

				if (!rotators[rotatorID].automationPaused)
					turnRotator(rotatorID, 'forward');

			}, rotators[rotatorID].properties.automationInterval);
		} 

		if(rotators[rotatorID].properties.initializeFunction)
			executeFunction(rotators[rotatorID].properties.initializeFunction, null, rotatorID);
	});
}

function turnRotator(rotatorID, direction) {

	if(rotators[rotatorID].properties.animation == "conveyor") {
		
		if(rotators[rotatorID].descriptor != "photos")
			var animation = { scrollLeft: ((direction == "forward") ? "+" : "-") + "=" + (rotators[rotatorID].articleWidth + rotators[rotatorID].articlesDistance)};
		else
			var animation = { left: ((direction == "forward") ? "-" : "+") + "=" + (rotators[rotatorID].articleWidth + rotators[rotatorID].articlesDistance)};
		
		if(rotators[rotatorID].properties.cycle) {
		
			if(direction == "backward") {
			
				rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":last").clone(true).prependTo(rotators[rotatorID].articlesRepository);
				rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":last").remove();
				
				rotators[rotatorID].articlesRepository.scrollLeft((rotators[rotatorID].articleWidth + rotators[rotatorID].articlesDistance));
				
				rotators[rotatorID].articlesRepository.stop(true, true).animate(animation, 350);
			
			} else {
				
				rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":first").clone(true).appendTo(rotators[rotatorID].articlesRepository);
								
				rotators[rotatorID].articlesRepository.stop(true, true).animate(animation, 350, function() {

					rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":first").remove();
					rotators[rotatorID].articlesRepository.scrollLeft(0);
				});
				
			}

		} else {
		
			
			if((direction == "forward" && rotators[rotatorID].currentPosition < (rotators[rotatorID].articlesCount - rotators[rotatorID].viewedArticlesCount)) || (direction == "backward" && rotators[rotatorID].currentPosition > 0))
				rotators[rotatorID].articlesRepository.stop(true, true).animate(animation, 350);
			else
				return false;
		}

		rotators[rotatorID].currentPosition = ((direction == "forward") ? (rotators[rotatorID].currentPosition + 1) : (rotators[rotatorID].currentPosition - 1));
		
		if(rotators[rotatorID].properties.articlesCurrentClass) {
			
			rotators[rotatorID].articles.removeClass(rotators[rotatorID].properties.articlesCurrentClass);
			rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).addClass(rotators[rotatorID].properties.articlesCurrentClass);
		}
			
		
		if(rotators[rotatorID].properties.rollersDisabledClass && ((rotators[rotatorID].currentPosition > 0 && rotators[rotatorID].rollers.backward.hasClass(rotators[rotatorID].properties.rollersDisabledClass)) || (rotators[rotatorID].currentPosition == 0 && !rotators[rotatorID].rollers.backward.hasClass(rotators[rotatorID].properties.rollersDisabledClass))))
			rotators[rotatorID].rollers.backward.toggleClass(rotators[rotatorID].properties.rollersDisabledClass);

		if(rotators[rotatorID].properties.rollersDisabledClass && ((rotators[rotatorID].currentPosition < (rotators[rotatorID].articlesCount - rotators[rotatorID].viewedArticlesCount) && rotators[rotatorID].rollers.forward.hasClass(rotators[rotatorID].properties.rollersDisabledClass)) || (rotators[rotatorID].currentPosition == (rotators[rotatorID].articlesCount - rotators[rotatorID].viewedArticlesCount) && !rotators[rotatorID].rollers.forward.hasClass(rotators[rotatorID].properties.rollersDisabledClass))))
			rotators[rotatorID].rollers.forward.toggleClass(rotators[rotatorID].properties.rollersDisabledClass);
		
	} else if(rotators[rotatorID].properties.animation == "displaying") {
		
		if(!rotators[rotatorID].paused) {
			
			rotators[rotatorID].paused = true;
			
			if(rotators[rotatorID].rotator.find("[data-rotator-background]").length)
				rotators[rotatorID].rotator.find("[data-rotator-background]").fadeOut(350);
		
			rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).animate({ opacity: 0 }, 350, function() {
			
				$(this).addClass("g-hidden");
			
				if(direction == "forward")
					rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition + 1) < rotators[rotatorID].articlesCount) ? (rotators[rotatorID].currentPosition + 1) : 0);
				else
					rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition - 1) >= 0) ? (rotators[rotatorID].currentPosition - 1) : (rotators[rotatorID].articlesCount - 1));
					
				if(rotators[rotatorID].indicatorPosition)
					rotators[rotatorID].indicatorPosition.text(rotators[rotatorID].currentPosition + 1);
					
				if(rotators[rotatorID].rollersTitles.backward || rotators[rotatorID].rollersTitles.forward) {
					
					rotators[rotatorID].rollersTitles.forward.text(rotators[rotatorID].articles.eq((((rotators[rotatorID].currentPosition + 1) < rotators[rotatorID].articlesCount) ? (rotators[rotatorID].currentPosition + 1) : 0)).data("rotator-article-title"));
					rotators[rotatorID].rollersTitles.backward.text(rotators[rotatorID].articles.eq((((rotators[rotatorID].currentPosition - 1) >= 0) ? (rotators[rotatorID].currentPosition - 1) : (rotators[rotatorID].articlesCount - 1))).data("rotator-article-title"));
				}
				
				if(rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).data("rotator-article-background-url")) {
				
					//$("[data-rotator-background]").attr("class", "b-promos-rotated-previews-background b-promos-rotated-previews-" + rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).attr("data-rotator-article-descriptor") + "-background").fadeIn(350);
					$("[data-rotator-background]").css({ backgroundImage: "url(" + rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).data("rotator-article-background-url") + ")" }).fadeIn(350);
				}
			
				rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).css("opacity", "0").removeClass("g-hidden").animate({ opacity: 1 }, 350);
			
				if(rotators[rotatorID].positionsPoints && rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass) {

					rotators[rotatorID].currentPositionsPoint
						.toggleClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
						.removeAttr("data-rotator-positions-point-descriptor");

					rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition)
						.addClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
						.attr("data-rotator-positions-point-descriptor", "current");

					rotators[rotatorID].currentPositionsPoint = rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition);
				}
				
				rotators[rotatorID].paused = false;
			
				return true;
			});
		}
	
	} else if(rotators[rotatorID].properties.animation == "swipe") {
		
		
		
	} else if(!rotators[rotatorID].properties.animation || rotators[rotatorID].properties.animation == "simple") {
		
		rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).addClass("g-hidden");
			
		if(direction == "forward")
			rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition + 1) < rotators[rotatorID].articlesCount) ? (rotators[rotatorID].currentPosition + 1) : 0);
		else
			rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition - 1) >= 0) ? (rotators[rotatorID].currentPosition - 1) : (rotators[rotatorID].articlesCount - 1));
			
		rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).removeClass("g-hidden");
	}
	
	if(rotators[rotatorID].positionsPoints && rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass) {
		
		rotators[rotatorID].currentPositionsPoint
			.toggleClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
			.removeAttr("data-rotator-positions-point-descriptor");
		
		rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition)
			.addClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
			.attr("data-rotator-positions-point-descriptor", "current");
		
		rotators[rotatorID].currentPositionsPoint = rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition);
	}
	
}

function hurlRotator(rotatorID, articleCounter) {

	if(rotators[rotatorID].properties.animation == "displaying") {
		
		if(!rotators[rotatorID].paused) {
			
			rotators[rotatorID].paused = true;
			
			if(rotators[rotatorID].rotator.find("[data-rotator-background]").length)
				rotators[rotatorID].rotator.find("[data-rotator-background]").fadeOut(350);
		
			rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).animate({ opacity: 0 }, 350, function() {
			
				$(this).addClass("g-hidden");
			
				rotators[rotatorID].currentPosition = (((articleCounter) < rotators[rotatorID].articlesCount) ? (articleCounter) : 0);
					
				if(rotators[rotatorID].indicatorPosition)
					rotators[rotatorID].indicatorPosition.text(articleCounter);
					
				if(rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).data("rotator-article-background-url")) {
				
					//$("[data-rotator-background]").attr("class", "b-promos-rotated-previews-background b-promos-rotated-previews-" + rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).attr("data-rotator-article-descriptor") + "-background").fadeIn(350);
					$("[data-rotator-background]").css({ backgroundImage: "url(" + rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).data("rotator-article-background-url") + ")" }).fadeIn(350);
				}
			
				rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).css("opacity", "0").removeClass("g-hidden").animate({ opacity: 1 }, 350);
			
				if(rotators[rotatorID].positionsPoints && rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass) {

					rotators[rotatorID].currentPositionsPoint
						.toggleClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
						.removeAttr("data-rotator-positions-point-descriptor");

					rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition)
						.addClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
						.attr("data-rotator-positions-point-descriptor", "current");

					rotators[rotatorID].currentPositionsPoint = rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition);
				}
				
				rotators[rotatorID].paused = false;
			
				return true;
			});
		}
	
	} else if(rotators[rotatorID].properties.animation == "swipe") {
		
		
		
	} else if(!rotators[rotatorID].properties.animation || rotators[rotatorID].properties.animation == "simple") {
		
		rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).addClass("g-hidden");
			
		if(direction == "forward")
			rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition + 1) < rotators[rotatorID].articlesCount) ? (rotators[rotatorID].currentPosition + 1) : 0);
		else
			rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition - 1) >= 0) ? (rotators[rotatorID].currentPosition - 1) : (rotators[rotatorID].articlesCount - 1));
			
		rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).removeClass("g-hidden");
	}
	
	if(rotators[rotatorID].positionsPoints && rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass) {
		
		rotators[rotatorID].currentPositionsPoint
			.toggleClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
			.removeAttr("data-rotator-positions-point-descriptor");
		
		rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition)
			.addClass(rotators[rotatorID].properties.positionsPointsCurrentAdditionalClass)
			.attr("data-rotator-positions-point-descriptor", "current");
		
		rotators[rotatorID].currentPositionsPoint = rotators[rotatorID].positionsPoints.eq(rotators[rotatorID].currentPosition);
	}
	
}

/* Unsorted */
function executeFunction(name, context) {
	
	var context = context ? context : window;
	var properties = Array.prototype.slice.call(arguments).splice(2, 100);
	var namespaces = name.split(".");
	var func = namespaces.pop();
	
	for(var i = 0; i < namespaces.length; i++) {
		
		context = context[namespaces[i]];
	}
	
	return context[func].apply(this, properties);
}

function getElementPercentageWidth(element) {
	
	var width = element.width();
	var parentWidth = element.offsetParent().width();
	
	return Math.ceil(100 * (width / parentWidth));
}

function getSubstring(string, substringPattern) {
	
	var searchResults = string.match(substringPattern);
	
	return ((searchResults && searchResults[1]) ? searchResults[1] : "");
}

var identificators = {};

function generateIdentificator() {

	var identificator = '';
	var identificatorLength = 10;
	var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var charsetLength = charset.length;

	for (i = 0; identificatorLength > i; i += 1) {
  
		var charIndex = Math.random() * charsetLength;  
		identificator += charset.charAt(charIndex);  
	}
	
	identificator = identificator.toLowerCase();

	if (identificators[identificator])
		return generateIdentificator();

	identificators[identificator] = true;  

	return identificator;
}

var cookiesDomain = false;

function createCookie(name, value, days) {

	if (days) {
		
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();

	} else
		var expires = "";
	
	document.cookie = name + "=" + value + expires + "; path=/" + ((cookiesDomain) ? "; domain=" + cookiesDomain : "");
}

function readCookie(name) {
	
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');

	for(var i = 0; i < ca.length; i++) {

		var c = ca[i];
		
		while (c.charAt(0) == ' ')
			c = c.substring(1,c.length);
		
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length,c.length);
	}

	return "";
}

function eraseCookie(name) {

	createCookie(name, "", -1);
}