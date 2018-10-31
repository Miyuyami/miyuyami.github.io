$(document).ready(function() {
	var url = "https://drive.google.com/uc?export=download&id=1nhiBp_nKcJ5PfTIDr0CIQjoauJ4-1kRD";
	
	getJSONca(url);
});

function updateTime(data) {
	var fields = Object.keys(data);
	for (var i in fields) {
		var m = moment(data[fields[i]], "DD/MM/YYYY hh:mm A ZZ");
		$("span." + fields[i]).text(m.fromNow());
	}
}

function getJSONweo(url) {
	$.ajaxSetup({
		scriptCharset: "utf-8",
		contentType: "application/json; charset=utf-8"
	});
	
	$.getJSON("http://whateverorigin.org/get?url=" + encodeURIComponent(url) + "&callback=?", updateTime);
}

function getJSONca(url) {
	$.ajaxPrefilter(function (options) {
		if (options.crossDomain && jQuery.support.cors) {
			var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
			options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
		}
	});
	
	$.getJSON(url, updateTime);
}