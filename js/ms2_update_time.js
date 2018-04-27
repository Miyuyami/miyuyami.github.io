$(document).ready(function() {
	$.getJSON("https://cors.io/?https://www.dropbox.com/s/25xodqbkn5r8dyz/updated.json?dl=1", function(data) {
		var fields = Object.keys(data);
		for (var i in fields) {
			var date = new Date(data[fields[i]]);
			$("span." + fields[i]).text(moment(data[fields[i]], "DD/MM/YYYY h:mm A UTC+Z").fromNow());
		}
	});
});