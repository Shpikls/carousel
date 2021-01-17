import './sass/index.scss';

window.addEventListener('load', ready);

function ready() {
 //12
}

function slider() {

}

function oldCode() {
	const innerWrapper = document.querySelector('.slider-inner');
	const wrapper = document.querySelector('.slider-wrapper');

	let startPosition;
	let oldTransform;
	let startTime;
	let percent;

	const PERCENT_TO_ACTION_SLIDE = 10;
	const TIME_TO_SMALL_ACTION = 400;


	const drugSlider = function(e) {
		percent = Math.round(((startPosition - e.clientX) / wrapper.clientWidth) * 100);

		innerWrapper.style.transform = `translateX(${-percent + +oldTransform}%)`;
	}

	const addDrugListener = function(e) {
		e.preventDefault();
		startPosition = e.clientX;
		startTime = new Date();
		oldTransform = innerWrapper.style.transform.replace(/[^-?\d{1,}]/g, '');
		wrapper.addEventListener('pointermove', drugSlider);
	}

	const removeDrugListener = function() {
		let transform;

		if ((new Date() - startTime) < TIME_TO_SMALL_ACTION && percent > PERCENT_TO_ACTION_SLIDE) {
			transform = Math.floor(innerWrapper.style.transform.replace(/[^-?\d{1,}]/g, '') / 100) * 100;
		} else if (percent < -PERCENT_TO_ACTION_SLIDE) {
			transform = Math.ceil(innerWrapper.style.transform.replace(/[^-?\d{1,}]/g, '') / 100) * 100;
		} else {
			transform = Math.round(innerWrapper.style.transform.replace(/[^-?\d{1,}]/g, '') / 100) * 100;
		}

		innerWrapper.style.transition = 'transform .2s linear';
		innerWrapper.style.transform = `translateX(${transform}%)`;

		setTimeout(function() {
			innerWrapper.style.transition = 'none';
		}, 200);


		wrapper.removeEventListener('pointermove', drugSlider);
	}

	wrapper.addEventListener('pointerdown', addDrugListener);
	window.addEventListener('pointerup', removeDrugListener);
}