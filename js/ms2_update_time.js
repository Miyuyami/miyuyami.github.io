$(document).ready(function() {
	$.getJSON("https://cors.io/?https://drive.google.com/uc?export=download&id=1nhiBp_nKcJ5PfTIDr0CIQjoauJ4-1kRD", function(data) {
		var fields = Object.keys(data);
		for (var i in fields) {
			var m = moment(data[fields[i]], "DD/MM/YYYY hh:mm A ZZ");
			$("span." + fields[i]).text(m.fromNow());
		}
	});
});