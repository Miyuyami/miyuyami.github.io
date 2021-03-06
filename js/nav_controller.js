const pages = [
	"/index.html",
	"/sw/patcher.html",
	"/ms2/patches.html",
	"/ms2/ox.html",
	"/ms2/minigame.html",
	"/ms2/mods.html",
];
const navPage = window.location.origin + "/nav.html";
const indexPage = pages[0];

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
pagesLangSupport.set(pages[4], [ languages[0] ]);
pagesLangSupport.set(pages[5], [ languages[0] ]);

const CurrentPage = window.location.pathname !== "/" ? window.location.pathname : indexPage;

$(document).ready(() => {
	$("#nav_content").load(navPage, () => {
		activateNavItem(CurrentPage);
		
		const pageLanguages = loadLanguages(CurrentPage);
		
		selectLanguageFromCookies(pageLanguages);
	});
});

function activateNavItem(itemPath) {
	$(`#nav_content .navbar-nav a[href='${itemPath}']`).addClass("active");
	$(`#nav_content .navbar-nav a[href='${itemPath}']`).parents("li").addClass("active");
}

function loadLanguages(page) {
	const pageLanguages = pagesLangSupport.get(page);
	
	pageLanguages.forEach(e => {
		getLanguageDropdownMenu().append(`<li class="dropdown-item clickable" id="${e}"><a>${languagesTextMap.get(e)}</a></li>`)
	});
	
	getLanguageDropdownMenu().on("click", ".clickable", languageOnClick);
	
	return pageLanguages;
}

function selectLanguageFromCookies(pageLanguages) {
	const cookieValue = Cookies.get("language");
	
	if (pageLanguages.includes(cookieValue)) {
		setLanguage(cookieValue);
	} else {
		setLanguage(defaultLanguage);
	}
}

function languageOnClick(e) {
	const $this = $(this);
	const langCode = $this.attr("id");
	
	Cookies.set("language", langCode, { expires: 20 * 365 });
	
	setLanguage(langCode);
}

function setLanguage(langCode) {
	const $dropdown = getLanguageDropdownMenu();
	const $menuChildren = $dropdown.children(".active");
	const $menuSelectedLanguage = $dropdown.children(`#${langCode}.clickable`);
	
	$menuSelectedLanguage.addClass("active");
	$menuSelectedLanguage.removeClass("clickable");
	$menuChildren.addClass("clickable");
	$menuChildren.removeClass("active");
	
	setPageLanguageContent(CurrentPage, langCode);
}

function getLanguageDropdownMenu() {
	return $("#lang_dropdown").parents(".dropdown").children(".dropdown-menu");
}

function setPageLanguageContent(page, langCode) {
	$("#lang_content").load(page.replace(".html", `.${langCode}.html`));
}