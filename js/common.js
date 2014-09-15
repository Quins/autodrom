$(document).ready(function() {

	$("[data-counter]").counter("19/09/2014 19:30");

	$("[data-waterwheelcarousel]").waterwheelCarousel();
	
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

				var tmparray = difference.getDay().toString().split("");
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