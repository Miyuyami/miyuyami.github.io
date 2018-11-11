function search() {
	const search_text = $("#ox_search").val().toLowerCase();
	const values = search_text.split(" ").filter((v) => v !== "");
	
	$("#ox_table li").each((idx, li) => {
		var li_text = li.innerText.toLowerCase();
		
		if ((values.some(w => w.length >= 3 && w !== "the" && w !== "and") ||
			 values.filter(w => containsNumber(w)).length >= 2) &&
			values.every((v) => ~li_text.indexOf(v))) {
			$(li).css("display", "");
		} else {
			$(li).css("display", "none");
		}
	});
}

function containsNumber(str) {
	return /\d/.test(str);
}

function handleSearchClick() {
	search();
	focusSearchBar();
}

function setEnabled(isEnabled) {
	var placeholderSearchText;
	if (isEnabled) {
		placeholderSearchText = "Type at least a word with at least 3 letters...";
	} else {
		placeholderSearchText = "loading questions...";
	}
	
	$("#ox_search").attr("placeholder", placeholderSearchText);
	$("#ox_search").prop("disabled", !isEnabled);
	$("#ox_search_button").prop("disabled", !isEnabled);
	$("#ox_refresh_button").prop("disabled", !isEnabled);
}

function clearSearchBar() {
	$("#ox_search").val("");
}

function focusSearchBar() {
	$("#ox_search").focus();
}

var publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1ZNo8-DPNOycviPd-h8n-SabhqWjJoM8a8MxLlwQ-6lY/edit?usp=sharing";
function init() {
    $("[data-toggle=\"tooltip\"]").tooltip().tooltip("hide"); 
	setEnabled(false);
	clearSearchBar();
	
	Tabletop.init({ key: publicSpreadsheetUrl,
					callback: showInfo,
					wanted: [ "OX" ] });
}

function reloadData() {
	setEnabled(false);
	
	$("#ox_table li").remove();
	init();
}

function addQuestion(question, result) {
	var ox_li;
	
	if (result) {
		ox_li = $("<li class=\"list-group-item list-group-item-success\" style=\"display: none;\">");
	} else {
		ox_li = $("<li class=\"list-group-item list-group-item-danger\" style=\"display: none;\">");
	}
	
	ox_li.append(question + "</div>");
	
	ox_li.appendTo("#ox_table");
}

function showInfo(data, tabletop) {
	var flags = {};
	
	const questions = tabletop.sheets("OX").all()
		.reduce((a, ox) => a.concat({ Category: ox.Category, Question: ox.Question, Result: ox.Result }, { Category: ox.Category, Question: ox.Answer, Result: "O" }), [])
		.filter((e) => {
			if (flags[e.Question]) {
				return false;
			}
			
			flags[e.Question] = true;
			
			return true;
		})
		.sort(sort_by("Category", "Question", "Answer", "Result"));
	
	$.each(questions, function(i, ox) {
		addQuestion(ox.Question, ox.Result === "O");
	});
	
	setRefreshButtonTooltip(questions);
	setEnabled(true);
	focusSearchBar();
}

var refreshButtonTooltipFormat;
function setRefreshButtonTooltip(questions) {
	const $refreshButton = $("#ox_refresh_button");
	if (refreshButtonTooltipFormat === undefined ||
		refreshButtonTooltipFormat === "") {
		refreshButtonTooltipFormat = $refreshButton.attr("data-original-title");
	}
	
	$refreshButton.attr("title", refreshButtonTooltipFormat.format(questions.length, questions.filter(q => q.Result === "O").length, questions.filter(q => q.Result === "X").length))
				  .tooltip("_fixTitle");
}

$(document).ready(init);