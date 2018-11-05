const pages = [
	"index.html",
	"patcher.html",
	"ms2_patches.html",
	"ms2_ox.html",
];
const navPage = "nav.html";
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

const CurrentPage = window.location.pathname.substr(1) ? window.location.pathname.substr(1) : indexPage;

$(document).ready(() => {
	$("#nav_content").load(navPage, () => {
		activateNavItem(CurrentPage);
		
		const pageLanguages = loadLanguages(CurrentPage);
		
		selectLanguageFromCookies(pageLanguages);
	});
});

function activateNavItem(itemPath) {
	$(`#nav_content .navbar-nav a[href='${itemPath}']`).parent("li").addClass("active");
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
	return $("#lang_dropdown").parent(".dropdown").children(".dropdown-menu");
}

function setPageLanguageContent(page, langCode) {
	$("#lang_content").load(page.replace(".html", `.${langCode}.html`));
}