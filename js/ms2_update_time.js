$(document).ready(function() {
	$.getJSON("https://cors.io/?https://www.dropbox.com/s/25xodqbkn5r8dyz/updated.json?dl=1", function(data) {
		var fields = Object.keys(data);
		for (var i in fields) {
			var m = moment(data[fields[i]], "DD/MM/YYYY hh:mm A ZZ");
			$("span." + fields[i]).text(m.fromNow());
		}
	});
});