$(document).ready(function() {
	
	if($('#social-stream').length) {
		
	$('#social-stream').dcSocialStream({
		feeds: {
			facebook: {
				id: '664264196953460'
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

	$("[data-counter]").counter("13/10/2014 11:00 GMT");

	var waterwheel = $("[data-waterwheelcarousel]").waterwheelCarousel({

		activeClassName: "b-pictures-current-article",
		separation: $(".l-content").width() / 8
	});

/*	$('.b-news-collection').hide();

	$.ajax({
	    url: "/_api/web/Lists(guid'5468392e-0a13-46f1-866b-122e3db7f625')/items?$select=Id,Title,News_Image,News_PublicationDate,News_Tags&$orderby=News_PublicationDate desc",
	    method: 'GET',
	    headers: { "accept": "application/json;odata=verbose" },
	    success: function (data) {
	        var results = data.d.results;
	        var grouped = {};
	        var labelDesriptorMap = {
	            'Трасса': 'route',
	            'Видео': 'video',
	            'Автоспорт': 'sport'
	        };

	        for (var i = 0; i < results.length; i++) {
	            var item = results[i];
	            item.News_PublicationDate = new Date(item.News_PublicationDate);

	            var desc = labelDesriptorMap[item.News_Tags.results[0].Label];
	            if (!grouped[desc]) {
	                grouped[desc] = [[]];
	            }
	            if (grouped[desc][grouped[desc].length - 1].length == 3) {
	                grouped[desc].push([]);
	            }
	            grouped[desc][grouped[desc].length - 1].push(item);
	        }

	        ko.applyBindings(grouped, $('.b-news-collection')[0]);

			$('.b-news-collection').show();

	        if ($("[data-tabulator]").length)
	            initializeTabulators();

	        if ($("[data-rotator]").length)
	            initializeRotators();
	    }
	});*/


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
		"news-index": {

			offsetWidth: 368, 
			visibleFrameClass: "b-news-visible-article", 
			invisibleFrameClass: "g-hidden", 
			disabledRollerClass: "b-news-rotating-collection-disabled-roller"
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
		"searchbox": {}
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

    			$(".b-navigation-toggle").animate({

    				"left": "280px"
    			}, 400);
    		}, 
    		hideAnimation: function(entity) {

    			$(".l-outer").animate({

    				"margin-left": "-280px"
    			}, 400);

    			$(".b-navigation").animate({

    				"left": "-280px"
    			}, 400);

    			$(".b-navigation-toggle").animate({

    				"left": 0
    			}, 400);
    		}
    	}
    });

    var resizeTimeout;
    $(window).resize( function() {

    	if (resizeTimeout)
    		clearTimeout(resizeTimeout);

    	resizeTimeout = setTimeout( function() {

    		waterwheel.reload({
				activeClassName: "b-pictures-current-article",
    			separation: $(".l-content").width() / 8
    		});
    	}, 600);
    });

});

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

				var difference = target.getTime() - now.getTime();
				difference = new Date(difference);

				var tmparray = ( '00' + parseInt(difference.getTime() / 86400000) ).slice(-3).toString().split("");
				days.entity.empty();
				$.each(tmparray, function(i, e) {

					days.entity.append($("<span />", { class: days.letterClass, text: e }));
				});

				var tmparray = ('0' + difference.getHours()).slice(-2).split("");
				hours.entity.empty();
				$.each(tmparray, function(i, e) {

					hours.entity.append($("<span />", { class: hours.letterClass, text: e }));
				});

				var tmparray = ('0' + difference.getMinutes()).slice(-2).split("");
				minutes.entity.empty();
				$.each(tmparray, function(i, e) {

					minutes.entity.append($("<span />", { class: minutes.letterClass, text: e }));
				});

				var tmparray = ('0' + difference.getSeconds()).slice(-2).toString().split("");
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
				currentFrameOffset: 0, 
				forwardRollers: $(this).find("[data-reel-roller][data-reel-roller-descriptor='forward']"), 
				backwardRollers: $(this).find("[data-reel-roller][data-reel-roller-descriptor='backward']")
			};

			reel.framesRepository.css("overflow", "hidden");

			reel.properties = $.extend({
				visibleFrameClass: "g-visible",
				disabledRollerClass: "g-disabled", 
				offsetWidth: reel.framesRepository.find("[data-reel-frame]").first().width()
			}, options[reel.descriptor]);

			reel.framesRepository.find("[data-reel-frame]").each( function(i) {

				reel.frames[i] = {

					entity: $(this),
					width: parseInt($(this).width()),
					visible: false
				}
			});

			if (typeof(reel.properties.offsetWidth) === "function") {

				reel.lastFrameOffset = reel.frames.length - Math.floor(reel.framesRepository.width() / reel.properties.offsetWidth()) + 1;
			} else {

				reel.lastFrameOffset = reel.frames.length - Math.floor(reel.framesRepository.width() / reel.properties.offsetWidth) + 1;
			}

			reel.forwardRollers.each( function() {

				$(this).click( function(event) {

					event.preventDefault();
					leftOffset(reel.currentFrameOffset + 1);
				});
			});

			reel.backwardRollers.each( function() {

				$(this).click( function(event) {

					event.preventDefault();
					leftOffset(reel.currentFrameOffset - 1);
				});
			});

			if (reel.lastFrameOffset < 1)
				reel.forwardRollers.addClass(reel.properties.disabledRollerClass);

			function leftOffset(offsetFrame) {

				var toMargin = 0;

				if (offsetFrame === undefined || offsetFrame > reel.lastFrameOffset || offsetFrame < 0) 
					return false;

				var offsetWidth = 0;
				if (typeof(reel.properties.offsetWidth) === "function") {

					offsetWidth = reel.properties.offsetWidth();
				} else {

					offsetWidth = reel.properties.offsetWidth;
				}

				for (var i = 0; i < reel.lastFrameOffset; i++) {

					if (i < offsetFrame) {
						reel.frames[i].entity.css({
							"overflow": "hidden"
						}).animate({
							"width": 0
						}, 300, function() {
							$(this).css({
								"display": "none"
							});
						});
					} else if (reel.frames[i].entity.width() < offsetWidth) {
						reel.frames[i].entity.css({
							"overflow": "hidden",
							"display": "inline-block"
						}).animate({
							"width": offsetWidth
						}, 300, function() {
							$(this).css({
								"overflow": "visible"
							});
						});
					}
				};

				reel.currentFrameOffset = offsetFrame;

				if (reel.currentFrameOffset == 0)
					reel.backwardRollers.addClass(reel.properties.disabledRollerClass);
				else
					reel.backwardRollers.removeClass(reel.properties.disabledRollerClass);

				if (reel.currentFrameOffset == reel.lastFrameOffset)
					reel.forwardRollers.addClass(reel.properties.disabledRollerClass);
				else 
					reel.forwardRollers.removeClass(reel.properties.disabledRollerClass);
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
				$(document).unbind('mouseup');

				$.each(toggle.targets, function(i, e) {

					e.entity.toggleClass(e.toggleClass);
				});

				if (toggle.on) {

					emittoggle(false);
				} else {

					emittoggle(true);

					if (toggle.properties.toggleOnOutsideClick) {

						$(document).mouseup(function (event) {

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
								$(document).unbind('mouseup');
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

			$(document).mouseup(function (event) {

				if (scr.on) {

					event.preventDefault();
					var container = $(".b-navigation");

					if (!container.is(event.target) && container.has(event.target).length === 0) {

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
            currentPosition: 0,
            positionsPoints: ($(this).find("[data-rotator-points-article]").length ? $(this).find("[data-rotator-points-article]") : null),
            positionsPointsRepository: $(this).find("[data-rotator-points]"),
            currentPositionsPoint: $(this).find("[data-rotator-points-article][data-rotator-points-article-descriptor='current']"),
			paused: false,
            properties: (rotatorsProperties[rotatorDescriptor] ? rotatorsProperties[rotatorDescriptor] : {})
        }

        rotators[rotatorID].articlesRepository.scrollLeft(0);

        rotators[rotatorID].rotator.attr("data-rotator-identificator", rotatorID);

        rotators[rotatorID].viewedArticlesCount = Math.ceil(rotators[rotatorID].articlesRepositoryWidth / (rotators[rotatorID].articleWidth + rotators[rotatorID].articlesDistance));

        if(rotators[rotatorID].rollers.backward) {

            rotators[rotatorID].rollers.backward.click(function(event) {

                event.preventDefault();
                turnRotator(rotatorID, "backward");
            });
        }

        if(rotators[rotatorID].rollers.forward) {

            if(rotators[rotatorID].properties.rollersDisabledClass && rotators[rotatorID].articlesCount > rotators[rotatorID].viewedArticlesCount)
                rotators[rotatorID].rollers.forward.toggleClass(rotators[rotatorID].properties.rollersDisabledClass);

            rotators[rotatorID].rollers.forward.click(function(event) {

                event.preventDefault();
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

        if(rotators[rotatorID].properties.automation)
            rotators[rotatorID].automationID = setInterval("turnRotator('" + rotatorID +"', 'forward')", rotators[rotatorID].properties.automationInterval);

        if(rotators[rotatorID].properties.initializeFunction)
            executeFunction(rotators[rotatorID].properties.initializeFunction, null, rotatorID);
    });
}

function turnRotator(rotatorID, direction) {
	
	if(rotators[rotatorID].paused)
		return false;
	
	rotators[rotatorID].paused = true;

    if(rotators[rotatorID].properties.animation == "conveyor") {

        var animation = { scrollLeft: ((direction == "forward") ? "+" : "-") + "=" + (rotators[rotatorID].articleWidth + rotators[rotatorID].articlesDistance)};

        if(rotators[rotatorID].properties.cycle) {

            if(direction == "backward") {

                rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":last").clone(true).prependTo(rotators[rotatorID].articlesRepository);
                rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":last").remove();

                rotators[rotatorID].articlesRepository.scrollLeft((rotators[rotatorID].articleWidth + rotators[rotatorID].articlesDistance));

                rotators[rotatorID].articlesRepository.stop(true, true).animate(animation, 350, function () {
                	
					rotators[rotatorID].paused = false;
                });

            } else {

                rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":first").clone(true).appendTo(rotators[rotatorID].articlesRepository);

                rotators[rotatorID].articlesRepository.stop(true, true).animate(animation, 350, function() {

                    rotators[rotatorID].rotator.find("[data-rotator-article]").filter(":first").remove();
                    rotators[rotatorID].articlesRepository.scrollLeft(0);
					
					rotators[rotatorID].paused = false;
                });

            }

        } else {

            if((direction == "forward" && rotators[rotatorID].currentPosition < (rotators[rotatorID].articlesCount - rotators[rotatorID].viewedArticlesCount)) || (direction == "backward" && rotators[rotatorID].currentPosition > 0))
                rotators[rotatorID].articlesRepository.stop(true, true).animate(animation, 350);
            else
                return false;
        }

        rotators[rotatorID].currentPosition = ((direction == "forward") ? (rotators[rotatorID].currentPosition + 1) : (rotators[rotatorID].currentPosition - 1));

        if(rotators[rotatorID].properties.rollersDisabledClass && ((rotators[rotatorID].currentPosition > 0 && rotators[rotatorID].rollers.backward.hasClass(rotators[rotatorID].properties.rollersDisabledClass)) || (rotators[rotatorID].currentPosition == 0 && !rotators[rotatorID].rollers.backward.hasClass(rotators[rotatorID].properties.rollersDisabledClass))))
            rotators[rotatorID].rollers.backward.toggleClass(rotators[rotatorID].properties.rollersDisabledClass);

        if(rotators[rotatorID].properties.rollersDisabledClass && ((rotators[rotatorID].currentPosition < (rotators[rotatorID].articlesCount - rotators[rotatorID].viewedArticlesCount) && rotators[rotatorID].rollers.forward.hasClass(rotators[rotatorID].properties.rollersDisabledClass)) || (rotators[rotatorID].currentPosition == (rotators[rotatorID].articlesCount - rotators[rotatorID].viewedArticlesCount) && !rotators[rotatorID].rollers.forward.hasClass(rotators[rotatorID].properties.rollersDisabledClass))))
            rotators[rotatorID].rollers.forward.toggleClass(rotators[rotatorID].properties.rollersDisabledClass);

    } else if(rotators[rotatorID].properties.animation == "displaying") {

        rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).animate({ opacity: 0 }, 350, function() {

            $(this).addClass("g-hidden");

            if(direction == "forward")
                rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition + 1) < rotators[rotatorID].articlesCount) ? (rotators[rotatorID].currentPosition + 1) : 0);
            else
                rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition - 1) >= 0) ? (rotators[rotatorID].currentPosition - 1) : (rotators[rotatorID].articlesCount - 1));

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

    } else if(rotators[rotatorID].properties.animation == "swipe") {



    } else if(!rotators[rotatorID].properties.animation || rotators[rotatorID].properties.animation == "simple") {

        rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).addClass("g-hidden");

        if(direction == "forward")
            rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition + 1) < rotators[rotatorID].articlesCount) ? (rotators[rotatorID].currentPosition + 1) : 0);
        else
            rotators[rotatorID].currentPosition = (((rotators[rotatorID].currentPosition - 1) >= 0) ? (rotators[rotatorID].currentPosition - 1) : (rotators[rotatorID].articlesCount - 1));

        rotators[rotatorID].articles.eq(rotators[rotatorID].currentPosition).removeClass("g-hidden");
		
		rotators[rotatorID].paused = false;
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