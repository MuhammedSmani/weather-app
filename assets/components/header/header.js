fetch('../../components/header/header.html')
	.then(function (response) {
		return response.text();
	})
	.then(function (data) {
		window.onload = addCode();
		function addCode() {
			document.getElementById('header').innerHTML = data;
		}
	})
	.catch(function (err) {
		console.warn('Something went wrong.', err);
	});

/*==================== OPEN AND CLOSE MOBILE NAV ====================*/

function togNav() {
	var menuContent = document.querySelector('.nav__menu_mobile');
	var mySidenav = document.getElementById('mySidenav');
	var firstSpan = document.querySelector('.first__span');
	var lastSpan = document.querySelector('.last__span');
	if (mySidenav.style.height == '500px') {
		mySidenav.style.height = '0px';
		menuContent.style.opacity = '0';
		menuContent.style.transitionDelay = '0s';
		mySidenav.style.transitionDelay = '.1s';
		firstSpan.classList.remove('top__active');
		lastSpan.classList.remove('bot__active');
		firstSpan.classList.add('top__not_active');
		lastSpan.classList.add('bot__not_active');
	} else {
		mySidenav.style.height = '500px';
		menuContent.style.opacity = '1';
		menuContent.style.transitionDelay = '.1s';
		mySidenav.style.transitionDelay = '0s';

		firstSpan.classList.add('top__active');
		lastSpan.classList.add('bot__active');
		firstSpan.classList.remove('top__not_active');
		lastSpan.classList.remove('bot__not_active');
	}
}
