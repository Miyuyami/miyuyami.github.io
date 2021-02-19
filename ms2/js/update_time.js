$(document).ready(() => {
	var url = "https://www.googleapis.com/drive/v3/files/1nhiBp_nKcJ5PfTIDr0CIQjoauJ4-1kRD?key=AIzaSyAwO558mHmxVemgkdaTg157nLqJibr-Dig&alt=media";
	
	getJSON_direct(url);
});

function updateTime(data) {
	var fields = Object.keys(data);
	for (var i in fields) {
		var m = moment(data[fields[i]], "DD/MM/YYYY hh:mm A ZZ");
		$(`#${fields[i]}`).text(m.fromNow());
	}
}

function getJSON_direct(url) {
	$.ajaxSetup({
		scriptCharset: "utf-8",
		contentType: "application/json; charset=utf-8"
	});
	
	$.getJSON(url, updateTime);
}

function getJSON_weo(url) {
	$.ajaxSetup({
		scriptCharset: "utf-8",
		contentType: "application/json; charset=utf-8"
	});
	
	$.getJSON("https://whateverorigin.org/get?url=" + encodeURIComponent(url) + "&callback=?", updateTime);
}

function getJSON_ca(url) {
	$.ajaxPrefilter(function (options) {
		if (options.crossDomain && jQuery.support.cors) {
			var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
			options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
		}
	});
	
	$.getJSON(url, updateTime);
}