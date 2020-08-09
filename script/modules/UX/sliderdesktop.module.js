import { leftArrow, rightArrow, sliderTool } from "../../script.js";

export default function sliderDesktop(check) {
	leftArrow.onclick = () => {
		if (!check) {
			sliderTool.sliderMoveLeft();
		}
	};

	rightArrow.onclick = () => {
		if (!check) {
			sliderTool.sliderMoveRight();
		}
	};
}
