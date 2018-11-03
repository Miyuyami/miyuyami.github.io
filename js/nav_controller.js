const CurrentPage = "/" + window.location.pathname.split("/").slice(-1); // local files
//const CurrentPage = window.location.pathname; // http
const navPage = "nav.html";
const pages = [
	"/index.html",
	"/patcher.html",
	"/ms2_patches.html",
	"/ms2_ox.html",
];
const languages = [
	"en",
	"ko",
];
const defaultLanguage = languages[0];
const languagesText = [
	"🇺🇸 English",
	"🇰🇷 한국어",
];

const languagesTextMap = new Map();
languagesTextMap.set(languages[0], languagesText[0]);
languagesTextMap.set(languages[1], languagesText[1]);

const pagesLangSupport = new Map();
pagesLangSupport.set(pages[0], [ languages[0] ]);
pagesLangSupport.set(pages[1], [ languages[0], languages[1] ]);
pagesLangSupport.set(pages[2], [ languages[0] ]);
pagesLangSupport.set(pages[3], [ languages[0] ]);


$(document).ready(() => {
	$("#nav_content").load(navPage, () => {
		activateNavItem(CurrentPage.substr(1));
		
		const pageLanguages = loadLanguages(CurrentPage);
		
		selectLanguageFromCookies(pageLanguages);
	});
});

function activateNavItem(itemPath) {
	$(`#nav_content div.nav-main ul.nav.navbar-nav li a[href='${itemPath}']`).parent("li").addClass("active");
}

function loadLanguages(page) {
	const pageLanguages = pagesLangSupport.get(page);
	
	pageLanguages.forEach(e => {
		$("#nav_content div.nav-right ul.nav.navbar-nav.navbar-right li.dropdown ul.dropdown-menu").append(`<li class="clickable" id="${e}"><a>${languagesTextMap.get(e)}</a></li>`)
	});
	
	$("#nav_content div.nav-right ul.nav.navbar-nav.navbar-right").on("click", "li.dropdown ul.dropdown-menu li.clickable", handleOnClickLanguage);
	
	return pageLanguages;
}

function selectLanguageFromCookies(pageLanguages) {
	const cookieValue = Cookies.get("language");
	const $dropdown = $("#nav_content div.nav-right ul.nav.navbar-nav.navbar-right li.dropdown ul.dropdown-menu");
	
	if (!pageLanguages.includes(cookieValue)) {
		$dropdown.children(`#${defaultLanguage}`).trigger("click");
	} else {
		$dropdown.children(`#${cookieValue}`).trigger("click");
	}
}

function handleOnClickLanguage(e) {
	const $this = $(this);
	const $menuChildren = $this.parent(".dropdown-menu").children(".active");
	const langCode = $this.attr("id");
	$this.addClass("active");
	$this.removeClass("clickable");
	$menuChildren.addClass("clickable");
	$menuChildren.removeClass("active");
	
	Cookies.set("language", langCode, { expires: 20 * 365 });
	setPageLanguage(CurrentPage, langCode);
}

function setPageLanguage(page, lang) {
	$("#lang_content").load(`${page.split(".").slice(0, -1).join(".").substr(1)}.${lang}.html`);
}