import { canvasTool } from "../../script.js";

const animatedCircle = document.querySelectorAll(".progress");
const nums = document.querySelectorAll(".running-num");
const secondaryCircle = document.querySelectorAll(".progress-bg");

const params = {
	lineWidth: 3,
	strokeStyle: "#ededed",
};

const progressAngels = [
	{
		startAngel: 25,
		endAngel: 349,
	},
	{
		startAngel: 40,
		endAngel: 318,
	},
	{
		startAngel: 50,
		endAngel: 303,
	},
	{
		startAngel: 25,
		endAngel: 349,
	},
];

const runNums_values = [90, 80, 70, 90];

const spanPercent = "<span>%</span>";

export default function runningNums() {
	for (let i = 0; i < secondaryCircle.length; i++) {
		const bgCtx = secondaryCircle[i].getContext("2d");
		canvasTool.drawCircle(secondaryCircle[i], bgCtx, params);
	}

	for (let i = 0; i < animatedCircle.length; i++) {
		let degrees = progressAngels[i].startAngel;
		const progCtx = animatedCircle[i].getContext("2d");

		function animateCircle(index) {
			progCtx.clearRect(
				0,
				0,
				animatedCircle[index].width,
				animatedCircle[index].height
			);

			const progressParams = {
				lineWidth: 3,
				strokeStyle: "#ff0036",
				fillStyle: "transparent",
			};

			let step =
				(progressAngels[index].endAngel - progressAngels[index].startAngel) /
				runNums_values[index];

			progressParams.startAngel = progressAngels[index].startAngel;
			progressParams.endAngel = degrees;
			degrees += step;

			canvasTool.drawCircle(animatedCircle[index], progCtx, progressParams);

			if (degrees < progressAngels[index].endAngel) {
				requestAnimationFrame(() => animateCircle(index));
			}
		}

		let value = 0;

		function animateRunningNums() {
			value++;
			if (value < runNums_values[i]) {
				requestAnimationFrame(animateRunningNums);
			}
			nums[i].innerHTML = `${value}${spanPercent}`;
		}

		requestAnimationFrame(animateRunningNums);
		requestAnimationFrame(() => animateCircle(i));
	}
}
