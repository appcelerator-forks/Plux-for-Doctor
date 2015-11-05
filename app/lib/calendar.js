// Taking Screen Width
var screenWidth = 322;
var needToChangeSize = false;

var screenWidthActual = Ti.Platform.displayCaps.platformWidth;

if (Ti.Platform.osname === 'android') {
	if (screenWidthActual >= 641) {
	screenWidth = screenWidthActual;
	needToChangeSize = true;
	}
}

var win, backButton, prevMonth, nextMonth, monthTitle, toolBar, toolBarTitle, toolBarDays, nameOfMonth, setDate, prevCalendarView = null, nextCalendarView = null, thisCalendarView, slideNext, slideReset, slidePrev;

function init(){
	// Main Window of the Month View.
	win = Ti.UI.createView({
		backgroundColor : 'yellow',
		height: Ti.UI.SIZE,
		top:0 
	});
	console.log(win);
	// Button at the buttom side
	backButton = Ti.UI.createButton({
		bottom : '20dp',
		height : '40dp',
		width : '200dp'
	});
	
	// Previous Button - Tool Bar
	prevMonth = Ti.UI.createButton({
	left : '15dp',
	width : Ti.UI.SIZE,
	height : '24dp',
	title : '<'
	});
	
	// Next Button - Tool Bar
	nextMonth = Ti.UI.createButton({
	right : '15dp',
	width : Ti.UI.SIZE,
	height : '24dp',
	title : '>'
	});
	
	// Month Title - Tool Bar
	monthTitle = Ti.UI.createLabel({
	width : '200dp',
	height : '24dp',
	textAlign : 'center',
	color : '#3a4756',
	font : {
	fontSize : 16,
	
	}
	});
	
	// Tool Bar
	toolBar = Ti.UI.createView({
	top : '0dp',
	width : '322dp',
	height : '50dp',
	backgroundColor : '#FFDCDCDF',
	layout : 'vertical'
	});
	
	// Tool Bar - View which contain Title Prev. & Next Button
	toolBarTitle = Ti.UI.createView({
	top : '3dp',
	width : '322dp',
	height : '24dp'
	});
	
	toolBarTitle.add(prevMonth);
	toolBarTitle.add(monthTitle);
	toolBarTitle.add(nextMonth);
	
	// Tool Bar - Day's
	toolBarDays = Ti.UI.createView({
	top : '2dp',
	width : '322dp',
	height : '22dp',
	layout : 'horizontal',
	left : '-1dp'
	});
	
	toolBarDays.sunday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Sun',
	width : '46dp',
	textAlign : 'center',
	font : {
	fontSize : 16,
	
	},
	color : '#3a4756'
	});
	
	toolBarDays.monday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Mon',
	width : '46dp',
	textAlign : 'center',
	font : {
	fontSize : 16,
	
	},
	color : '#3a4756'
	});
	
	toolBarDays.tuesday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Tue',
	width : '46dp',
	textAlign : 'center',
	font : {
	fontSize : 16,
	
	},
	color : '#3a4756'
	});
	
	toolBarDays.wednesday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Wed',
	width : '46dp',
	textAlign : 'center',
	font : {
	fontSize : 16,
	
	},
	color : '#3a4756'
	});
	
	toolBarDays.thursday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Thu',
	width : '46dp',
	textAlign : 'center',
	font : {
	fontSize : 16,
	
	},
	color : '#3a4756'
	});
	
	toolBarDays.friday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Fri',
	width : '46dp',
	textAlign : 'center',
	font : {
	fontSize : 16,
	
	},
	color : '#3a4756'
	});
	
	toolBarDays.saturday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Sat',
	width : '46dp',
	textAlign : 'center',
	font : {
	fontSize : 16,
	
	},
	color : '#3a4756'
	});
	
	toolBarDays.add(toolBarDays.sunday);
	toolBarDays.add(toolBarDays.monday);
	toolBarDays.add(toolBarDays.tuesday);
	toolBarDays.add(toolBarDays.wednesday);
	toolBarDays.add(toolBarDays.thursday);
	toolBarDays.add(toolBarDays.friday);
	toolBarDays.add(toolBarDays.saturday);
	
	// Adding Tool Bar Title View & Tool Bar Days View
	toolBar.add(toolBarTitle);
	toolBar.add(toolBarDays);
	
	// what's today's date?
	setDate = new Date();
	a = setDate.getFullYear();
	b = setDate.getMonth();
	c = setDate.getDate();
	
	// add the three calendar views to the window for changing calendars with animation later
	
	prevCalendarView = null;
	if (b == 0) {
	prevCalendarView = calView(a - 1, 11, c);
	} else {
	prevCalendarView = calView(a, b - 1, c);
	}
	prevCalendarView.left = (screenWidth * -1) + 'dp';
	
	nextCalendarView = null;
	if (b == 0) {
	nextCalendarView = calView(a + 1, 0, c);
	} else {
	nextCalendarView = calView(a, b + 1, c);
	}
	nextCalendarView.left = screenWidth + 'dp';
	
	thisCalendarView = calView(a, b, c);
	if (needToChangeSize == false) {
	thisCalendarView.left = '-1dp';
	}
	
	monthTitle.text = monthName(b) + ' ' + a;
	
	backButton.title = monthName(b) + ' ' + c + ', ' + a;
	
	// add everything to the window
	
	
	// yeah, open the window, why not?
	// win.open({
	// modal : true
	// });
	slideNext = Titanium.UI.createAnimation({
	// left : '-322',
	duration : 500
	});
	
	slideNext.left = (screenWidth * -1);
	
	slideReset = Titanium.UI.createAnimation({
	// left : '-1',
	duration : 500
	});
	
	if (needToChangeSize == false) {
	slideReset.left = '-1';
	} else {
	slideReset.left = ((screenWidth - 644) / 2);
	}
	
	slidePrev = Titanium.UI.createAnimation({
	// left : '322',
	duration : 500
	});
	
	slidePrev.left = screenWidth;
	
	// Next Month Click Event
	nextMonth.addEventListener('click', function() {
	if (b == 11) {
	b = 0;
	a++;
	} else {
	b++;
	}
	
	thisCalendarView.animate(slideNext);
	nextCalendarView.animate(slideReset);
	
	setTimeout(function() {
	thisCalendarView.left = (screenWidth * -1) + 'dp';
	if (needToChangeSize == false) {
	nextCalendarView.left = '-1dp';
	} else {
	nextCalendarView.left = ((screenWidth - 644) / 2);
	}
	prevCalendarView = thisCalendarView;
	thisCalendarView = nextCalendarView;
	if (b == 11) {
	nextCalendarView = calView(a + 1, 0, c);
	} else {
	nextCalendarView = calView(a, b + 1, c);
	}
	monthTitle.text = monthName(b) + ' ' + a;
	nextCalendarView.left = screenWidth + 'dp';
	win.add(nextCalendarView);
	}, 500);
	});
	
	// Previous Month Click Event
	prevMonth.addEventListener('click', function() {
	if (b == 0) {
	b = 11;
	a--;
	} else {
	b--;
	}
	thisCalendarView.animate(slidePrev);
	prevCalendarView.animate(slideReset);
	setTimeout(function() {
	thisCalendarView.left = screenWidth + 'dp';
	if (needToChangeSize == false) {
	prevCalendarView.left = '-1dp';
	} else {
	prevCalendarView.left = ((screenWidth - 644) / 2);
	}
	nextCalendarView = thisCalendarView;
	thisCalendarView = prevCalendarView;
	if (b == 0) {
	prevCalendarView = calView(a - 1, 11, c);
	} else {
	prevCalendarView = calView(a, b - 1, c);
	}
	monthTitle.text = monthName(b) + ' ' + a;
	prevCalendarView.left = (screenWidth * -1) + 'dp';
	win.add(prevCalendarView);
	}, 500);
	});
}




// Function which create day view template
dayView = function(e) {
	var label = Ti.UI.createLabel({
	current : e.current,
	width : '46dp',
	height : '44dp',
	backgroundColor : '#e5ebee',
	text : e.day,
	textAlign : 'center',
	color : e.color,
	font : {
	fontSize : 16,
	
	}
	});
	return label;
};

monthName = function(e) {
	switch(e) {
	case 0:
	e = 'January';
	break;
	case 1:
	e = 'February';
	break;
	case 2:
	e = 'March';
	break;
	case 3:
	e = 'April';
	break;
	case 4:
	e = 'May';
	break;
	case 5:
	e = 'June';
	break;
	case 6:
	e = 'July';
	break;
	case 7:
	e = 'August';
	break;
	case 8:
	e = 'September';
	break;
	case 9:
	e = 'October';
	break;
	case 10:
	e = 'November';
	break;
	case 11:
	e = 'December';
	break;
	};
	return e;
};

// Calendar Main Function
var calView = function(a, b, c) {
	var nameOfMonth = monthName(b);
	
	//create main calendar view
	var mainView = Ti.UI.createView({
	backgroundColor: "red",
	layout : 'horizontal',
	width : '322dp',
	height : '220dp',
	top : '50dp'
	});
	
	//set the time
	var daysInMonth = 32 - new Date(a, b, 32).getDate();
	var dayOfMonth = new Date(a, b, c).getDate();
	var dayOfWeek = new Date(a, b, 1).getDay();
	var daysInLastMonth = 32 - new Date(a, b - 1, 32).getDate();
	var daysInNextMonth = (new Date(a, b, daysInMonth).getDay()) - 6;
	
	//set initial day number
	var dayNumber = daysInLastMonth - dayOfWeek + 1;
	
	//get last month's days
	for ( i = 0; i < dayOfWeek; i++) {
	mainView.add(new dayView({
	day : dayNumber,
	color : '#8e959f',
	current : 'no',
	dayOfMonth : ''
	}));
	dayNumber++;
	};
	
	// reset day number for current month
	dayNumber = 1;
	
	//get this month's days
	for ( i = 0; i < daysInMonth; i++) {
	var newDay = new dayView({
	day : dayNumber,
	color : '#3a4756',
	current : 'yes',
	dayOfMonth : dayOfMonth
	});
	mainView.add(newDay);
	if (newDay.text == dayOfMonth) {
	newDay.color = '#2eafa8';
	// newDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
	//newDay.backgroundColor = '#2eafa800';
	var oldDay = newDay;
	}
	dayNumber++;
	};
	dayNumber = 1;
	var theMonth = b +1;
	if (theMonth < 10){
		theMonth = "0" + theMonth;
	}
	//get remaining month's days
	for ( i = 0; i > daysInNextMonth; i--) {
	mainView.add(new dayView({
	day : dayNumber,
	color : '#8e959f',
	current : 'no',
	dayOfMonth : ''
	}));
	dayNumber++;
	};
	
	// this is the new "clicker" function, although it doesn't have a name anymore, it just is.
	mainView.addEventListener('click', function(e) {
		// current mean valid day for the month. 
	if (e.source.current == 'yes') {
		// reset last day selected
		if (oldDay.text == dayOfMonth) {
			oldDay.color = '#2eafa8';
			// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday.png';
			oldDay.backgroundColor = '#e5ebee';
		} else {
			oldDay.color = '#3a4756';
			// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytile-Decoded.png';
			oldDay.backgroundColor = '#e5ebee';
		}
		oldDay.backgroundPaddingLeft = '0dp';
		oldDay.backgroundPaddingBottom = '0dp';
		var theday = e.source.text;
		if (theday < 10){
			theday= "0" + theday;
		}
		// set window title with day selected, for testing purposes only
		backButton.title = nameOfMonth + ' ' + e.source.text + ', ' + a +"("+a+"-"+theMonth+"-"+theday+")";
		
		Ti.App.fireEvent("appointment:refresh", {selected_date: a+"-"+theMonth+"-"+theday});
		// set characteristic of the day selected
		if (e.source.text == dayOfMonth) {
			// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
			e.source.backgroundColor = '#2eafa8';
		} else {
			// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytile_selected.png';
			e.source.backgroundColor = '#2eafa8';
		}
		e.source.backgroundPaddingLeft = '1dp';
		e.source.backgroundPaddingBottom = '1dp';
		e.source.color = '#ffffff';
		//this day becomes old :(
		oldDay = e.source;
	}
	});
	
	return mainView;
};

exports.getCalendar = function(){
	console.log('getCalendar oo');
	init();
	win.add(toolBar);
	win.add(thisCalendarView);
	win.add(nextCalendarView);
	win.add(prevCalendarView);
	return win;
};
