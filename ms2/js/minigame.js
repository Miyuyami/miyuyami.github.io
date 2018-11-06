const minigameNames = [
	"OX Quiz",
	"Ludibrium Escape",
	"Crazy Runners",
	"Spring Beach",
	"Trap Master",
	"Sole Survivor",
	"Dance Dance Stop",
];
const minigameStartTimes = [
	"00:05:00 +00:00",
	"00:05:00 +00:00",
	"00:35:00 +00:00",
	"00:35:00 +00:00",
	"01:05:00 +00:00",
	"02:35:00 +00:00",
	"01:05:00 +00:00",
];
const minigameIntervals = [
	"01:30",
	"01:30",
	"01:30",
	"01:30",
	"03:00",
	"03:00",
	"01:30",
];

const minigames = [
	{ name: minigameNames[0], startTime: minigameStartTimes[0], interval: minigameIntervals[0], },
	{ name: minigameNames[1], startTime: minigameStartTimes[1], interval: minigameIntervals[1], },
	{ name: minigameNames[2], startTime: minigameStartTimes[2], interval: minigameIntervals[2], },
	{ name: minigameNames[3], startTime: minigameStartTimes[3], interval: minigameIntervals[3], },
	{ name: minigameNames[4], startTime: minigameStartTimes[4], interval: minigameIntervals[4], },
	{ name: minigameNames[5], startTime: minigameStartTimes[5], interval: minigameIntervals[5], },
	{ name: minigameNames[6], startTime: minigameStartTimes[6], interval: minigameIntervals[6], },
];

var minigameEventsList;

$(document).ready(() => {
	moment.relativeTimeThreshold('s', 59);
	moment.relativeTimeThreshold('m', 59);
	moment.relativeTimeThreshold('h', 23);
	moment.relativeTimeThreshold('d', 28);
	moment.relativeTimeThreshold('M', 12);
	
	refreshList();
	onUpdate();
	
	window.setInterval(onUpdate, moment.duration(1, "seconds").asMilliseconds());
	window.setInterval(refreshList, moment.duration(10, "seconds").asMilliseconds());
});

function onUpdate() {
	$("#minigame_table").empty();
	
	minigameEventsList
		.sort(sort_by("time"))
		.forEach(m => {
			if (moment() > m.time) {
				appendRow(m.name, "Ongoing", "primary");
			} else {
				appendRow(m.name, m.time.fromNow());
			}
		});
}

function appendRow(col_1, col_2, style) {
	if (style === undefined) {
		style = "default";
	}
	$("#minigame_table").append(`<tr class="table-${style}"><td>${col_1}</td><td>${col_2}</td></tr>`);
}

function refreshList() {
	minigameEventsList = createEventList(minigames, moment().subtract(1, "minute"), moment().add(3, "hours"));
}

function createEventList(events, startTime, endTime) {
	const result = [];
	
	events.forEach(e => {
		const time = moment(e.startTime, "HH:mm:ss Z");
		
		do {
			if (time > startTime) {
				result.push({ name: e.name, time: time.clone() });
				console.log(`push: ${time.clone().second()}/${time.clone().seconds()}`);
			}
			time.add(moment.duration(e.interval));
		} while (time < endTime);
	});
	
	return result;
}