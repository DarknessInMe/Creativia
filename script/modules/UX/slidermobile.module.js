import { sliderTool } from "../../script.js";

export default function sliderMobile(check) {
	const touchZone = document.querySelector(".banner-container");
	let touchstartX = 0;
	let touchendX = 0;

	touchZone.ontouchstart = (event) => {
		if (check) {
			touchstartX = event.touches[0].screenX;
		}
	};
	touchZone.ontouchend = (event) => {
		if (check) {
			touchendX = event.changedTouches[0].screenX;
			handleGesure(event.target, touchZone);
		}
	};
	function handleGesure(touchedZone, requiredTouchZone) {
		if (touchedZone == requiredTouchZone) {
			if (touchendX < touchstartX) {
				sliderTool.sliderMoveLeft();
			}
			if (touchendX > touchstartX) {
				sliderTool.sliderMoveRight();
			}
		}
	}
}
