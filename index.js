/*==================== UPDATE NAVBAR LINKS ====================*/

function updateNavbarLinks(city) {
	const pages = [
		{ class: 'today-page', path: 'today', text: 'Today' },
		{ class: 'hourly-page', path: 'hourly', text: 'Hourly' },
		{ class: 'sevenday-page', path: 'sevenday', text: '7 Day' },
		{ class: 'weekend-page', path: 'weekend', text: 'Weekend' },
		{ class: 'monthly-page', path: 'monthly', text: 'Monthly' },
		{ class: 'airquality-page', path: 'air-quality-forecast', text: 'Air Quality' },
		{ class: 'radar-page', path: 'radar', text: 'Radar' },
	];

	pages.forEach((page) => {
		const elements = document.querySelectorAll(`.${page.class}`);
		elements.forEach((element) => {
			element.innerHTML = `<a href="../../../assets/pages/${page.path}/${page.path}.html?city=${city}" class="nav__link">${page.text}</a>`;
		});
	});
}

/*==================== ICONS MAPPING ====================*/

const iconsMapping = {
	"113.png": "uil-sun",
	"116.png": "uil-cloud-sun",
	"119.png": "uil-clouds",
	"122.png": "uil-cloud",
	"143.png": "uil-cloud",
	"176.png": "uil-cloud-sun-rain-alt",
	"311.png": "uil-cloud-showers-heavy",
	"326.png": "uil-cloud-meatball",
	"329.png": "uil-cloud-sun-meatball",
	"332.png": "uil-cloud-meatball",
	"335.png": "uil-cloud-sun-meatball",
	"338.png": "uil-cloud-meatball",
	"xxx.png": "uil-sun",
};

function getIconClass(iconName) {
	return iconsMapping[iconName];
}