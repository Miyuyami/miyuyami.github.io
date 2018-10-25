function search() {
	const search_text = $("#ox_search").val().toLowerCase();
	const values = search_text.split(" ").filter((v) => v !== "");
	
	$("#ox_table li").each((idx, li) => {
		var li_text = li.innerText.toLowerCase();
		
		if (values.some(w => w.length >= 3) &&
			values.every((v) => ~li_text.indexOf(v))) {
			$(li).css("display", "");
		} else {
			$(li).css("display", "none");
		}
	});
}
					
const publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1ZNo8-DPNOycviPd-h8n-SabhqWjJoM8a8MxLlwQ-6lY/edit?usp=sharing";
function init() {
	Tabletop.init({ key: publicSpreadsheetUrl,
					callback: showInfo,
					wanted: [ "OX" ] });
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
	
	$("#ox_search").attr("placeholder", "Type at least a word with at least 3 letters...");
	$("#ox_search").prop("disabled", false);
	$("#ox_search_button").prop("disabled", false);
}

window.addEventListener('DOMContentLoaded', init)