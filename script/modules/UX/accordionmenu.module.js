import { canvasTool, accordion_content as content } from "../../script.js";

const header = document.querySelectorAll(".accordion-title-body");
const icon = document.querySelectorAll(".accordion-icon");
const canvasIcon = document.querySelectorAll(".circleIcon");

export default function accordionMenu(arg) {
	for (let i = 0; i < header.length; i++) {
		let circleCtx = canvasIcon[i].getContext("2d");

		if (i == 0) {
			header[i].lastElementChild.style.color = "#ff0036";
			canvasTool.drawMinusCircle(canvasIcon[i], circleCtx, arg.params.active);
		} else {
			canvasTool.drawPlusCircle(canvasIcon[i], circleCtx, arg.params.common);
		}

		header[i].addEventListener("click", function () {
			for (let j = 0; j < icon.length; j++) {
				let dropCtx = canvasIcon[j].getContext("2d");

				dropCtx.clearRect(0, 0, canvasIcon[j].width, canvasIcon[j].height);

				canvasTool.drawPlusCircle(canvasIcon[i], dropCtx, arg.params.common);

				content[j].style.display = "none";

				header[j].lastElementChild.style.color = "#262626";
			}

			circleCtx.clearRect(0, 0, canvasIcon[i].width, canvasIcon[i].height);

			canvasTool.drawMinusCircle(canvasIcon[i], circleCtx, arg.params.active);

			header[i].lastElementChild.style.color = "#ff0036";
			content[i].style.display = "block";
		});
	}
}
