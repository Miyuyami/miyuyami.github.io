$(document).ready(function() {
	var cookieValue = Cookies.get("language");
	var $lang_bar = $(".navbar-right");
	var $lang_dropdown = $lang_bar.children(".dropdown");
	var $lang_dropdown_menu = $lang_dropdown.children(".dropdown-menu");
	if (cookieValue == "ko") {
		$lang_dropdown_menu.children("#ko").trigger("click");
	}
	else { //if (cookieValue == "en") {
		$lang_dropdown_menu.children("#en").trigger("click");
	}
});

$(".container").on("click", ".panel div.clickable", function (e) {
    var $this = $(this);
    var $panel = $this.parent(".panel");
    var $panel_body = $panel.children(".panel-body");
    var $display = $panel_body.css("display");

    if ($display == "block") {
        $panel_body.slideUp();
    } else if($display == "none") {
        $panel_body.slideDown();
    }
});

$(".container").ready(function(e){
    var $classy = ".panel.autocollapse";

    var $found = $($classy);
    $found.find(".panel-body").hide();
    $found.removeClass($classy);
});

$(".navbar-right").on("click", ".dropdown li.clickable", function (e) {
	var $this = $(this);
	var $menu = $this.parent(".dropdown-menu");
	var $menu_children = $menu.children(".active");
	var lang_code = $this.attr("id");
	$this.addClass("active");
	$this.removeClass("clickable");
	$menu_children.addClass("clickable");
	$menu_children.removeClass("active");
	if (lang_code == "ko") {
		$("#lang_content").load("patcher.kr.html");
		Cookies.set("language", "ko", { expires: 20*365});
	}
	else { //if (lang_code == "en") {
		$("#lang_content").load("patcher.en.html");
		Cookies.set("language", "en", { expires: 20*365});
	}
});