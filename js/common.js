$(document).ready(function() {

	$("[data-counter]").counter("19/09/2014 10:30");

	var waterwheel = $("[data-waterwheelcarousel]").waterwheelCarousel({

		activeClassName: "b-pictures-current-article"
	});

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

			offsetWidth: 190, 
			visibleFrameClass: "b-partners-visible-article"
		}
	});

    if($("[data-tabulator]").length)
        initializeTabulators();

    if($("[data-rotator]").length)
        initializeRotators();

});

/* Counter */

(function( $ ) {
	$.fn.counter = function(timex) {

		var targettime = {};
		var tmp = timex.split(" ");
		var tmpclock = tmp[1].split(":");
		var tmpcalendar = tmp[0].split("/");

		targettime.day = parseInt(tmpcalendar[0]);
		targettime.month = parseInt(tmpcalendar[1]);
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

				var tmparray = ('00' + difference.getDay()).slice(-3).toString().split("");
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
				offsetWidth: reel.framesRepository.find("[data-reel-frame]").first().width()
			}, options[reel.descriptor]);

			reel.framesRepository.find("[data-reel-frame]").each( function(i) {

				reel.frames[i] = {

					entity: $(this),
					width: parseInt($(this).width()),
					visible: false
				}
			});

			reel.lastFrameOffset = reel.frames.length - Math.floor(reel.framesRepository.width() / reel.properties.offsetWidth) + 1;

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

			function leftOffset(offsetFrame) {

				var toMargin = 0;

				if (offsetFrame === undefined || offsetFrame > reel.lastFrameOffset || offsetFrame < 0) 
					return false;

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
					} else if (reel.frames[i].entity.width() < reel.properties.offsetWidth) {
						reel.frames[i].entity.css({
							"overflow": "hidden",
							"display": "inline-block"
						}).animate({
							"width": reel.properties.offsetWidth
						}, 300, function() {
							$(this).css({
								"overflow": "visible"
							});
						});
					}
				};

				reel.currentFrameOffset = offsetFrame;
			}
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