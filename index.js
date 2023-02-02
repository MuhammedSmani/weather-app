// Update Navbar Links
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
