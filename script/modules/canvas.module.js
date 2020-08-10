import {
	leftArrow,
	leftCtx,
	rightArrow,
	rightCtx,
	canvasTool,
	drawCheckmarks,
} from "../script.js";

export function drawArrows(arg) {
	canvasTool.drawLeftArrow(leftArrow, leftCtx, arg.params.common);
	canvasTool.drawRightArrow(rightArrow, rightCtx, arg.params.common);

	leftArrow.addEventListener("mouseover", function () {
		leftCtx.clearRect(0, 0, leftArrow.width, leftArrow.height);

		canvasTool.drawLeftArrow(leftArrow, leftCtx, arg.params.active);

		leftArrow.onmouseout = function () {
			leftCtx.clearRect(0, 0, leftArrow.width, leftArrow.height);

			canvasTool.drawLeftArrow(leftArrow, leftCtx, arg.params.common);
		};
	});

	rightArrow.addEventListener("mouseover", function () {
		rightCtx.clearRect(0, 0, rightArrow.width, rightArrow.height);

		canvasTool.drawRightArrow(rightArrow, rightCtx, arg.params.active);

		rightArrow.onmouseout = function () {
			rightCtx.clearRect(0, 0, rightArrow.width, rightArrow.height);

			canvasTool.drawRightArrow(rightArrow, rightCtx, arg.params.common);
		};
	});
}

const fa_icons = document.querySelectorAll(".canvas-icon");
const virtue_item = document.querySelectorAll(".virtue-item");

export function drawFAicons(arg) {
	[...fa_icons].forEach((element, index) => {
		let polygonCtx = element.getContext("2d");

		canvasTool.drawPolygon(element, polygonCtx, arg.params.common);

		virtue_item[index].addEventListener("mouseover", function () {
			polygonCtx.clearRect(0, 0, element.width, element.height);
			virtue_item[index].style.color = "#ffffff";
			canvasTool.drawPolygon(element, polygonCtx, arg.params.active);
		});
		virtue_item[index].addEventListener("mouseout", function () {
			polygonCtx.clearRect(0, 0, element.width, element.height);
			virtue_item[index].style.color = "#000000";
			canvasTool.drawPolygon(element, polygonCtx, arg.params.common);
		});
	});
}

const option_icons = document.querySelectorAll(".option-icon");
const side_options = document.querySelectorAll(".side-option");
const icon_checkmars = document.querySelectorAll(".icon-checkmark");

export function drawFeaturesCheckmarks(arg) {
	for (let i = 0; i < side_options.length; i++) {
		let polygonCtx = option_icons[i].getContext("2d");
		canvasTool.drawPolygon(option_icons[i], polygonCtx, arg.params.common);

		let iconContext = icon_checkmars[i].getContext("2d");
		drawCheckmarks(icon_checkmars[i], iconContext, "#262626");

		side_options[i].addEventListener("mouseover", function () {
			polygonCtx.clearRect(0, 0, option_icons[i].width, option_icons[i].height);
			side_options[i].style.color = "#ffffff";
			side_options[i].style.backgroundColor = "#ff0036";
			canvasTool.drawPolygon(option_icons[i], polygonCtx, arg.params.active);

			iconContext.clearRect(
				0,
				0,
				icon_checkmars[i].width,
				icon_checkmars[i].height
			);
			drawCheckmarks(icon_checkmars[i], iconContext, "#ff0036");
		});
		side_options[i].addEventListener("mouseout", function () {
			polygonCtx.clearRect(0, 0, option_icons[i].width, option_icons[i].height);
			canvasTool.drawPolygon(option_icons[i], polygonCtx, arg.params.common);
			side_options[i].style.color = "#262626";
			side_options[i].style.backgroundColor = "#ffffff";
			iconContext.clearRect(
				0,
				0,
				icon_checkmars[i].width,
				icon_checkmars[i].height
			);
			drawCheckmarks(icon_checkmars[i], iconContext, "#262626");
		});
	}
}

const service_icons = document.querySelectorAll(".service-icons");
const service_item = document.querySelectorAll(".service-item");
const service_iconWrap = document.querySelectorAll(".service-icon_item");
const service_description = document.querySelectorAll(".service-desc");

export function drawServiceIcons() {
	const params = {
		fillStyle: "#a4a4a4",
	};

	for (let i = 0; i < service_icons.length; i++) {
		let serviceCtx = service_icons[i].getContext("2d");

		canvasTool.drawPolygon(service_icons[i], serviceCtx, params);

		service_item[i].addEventListener("mouseover", () => {
			serviceCtx.clearRect(
				0,
				0,
				service_icons[i].width,
				service_icons[i].height
			);

			service_iconWrap[i].style.color = "#ffffff";
			service_description[i].style.color = "#ffffff";
			service_description[i].style.backgroundColor = "#3d2329";

			params.fillStyle = "#ff0036";
			canvasTool.drawPolygon(service_icons[i], serviceCtx, params);
		});
		service_item[i].addEventListener("mouseout", () => {
			serviceCtx.clearRect(
				0,
				0,
				service_icons[i].width,
				service_icons[i].height
			);
			service_iconWrap[i].style.color = "#272727";
			service_description[i].style.color = "#a4a4a4";
			service_description[i].style.backgroundColor = "#343434";

			params.fillStyle = "#a4a4a4";
			canvasTool.drawPolygon(service_icons[i], serviceCtx, params);
		});
	}
}

const followIcons = document.querySelectorAll(".followIcon");
const canvasFollowIcons = document.querySelectorAll(".canvas-icon_wrap");

export function drawFollowIcons() {
	const params = {
		lineWidth: 2,
		strokeStyle: "#ff0036",
		lineJoin: "miter",
	};

	for (let i = 0; i < followIcons.length; i++) {
		let followCtx = followIcons[i].getContext("2d");

		canvasTool.drawPolygon(followIcons[i], followCtx, params);

		canvasFollowIcons[i].addEventListener("mouseover", () => {
			followCtx.clearRect(0, 0, followIcons[i].width, followIcons[i].height);

			params.fillStyle = "#ff0036";
			canvasFollowIcons[i].style.color = "#ffffff";

			canvasTool.drawPolygon(followIcons[i], followCtx, params);
		});

		canvasFollowIcons[i].addEventListener("mouseout", () => {
			followCtx.clearRect(0, 0, followIcons[i].width, followIcons[i].height);

			params.fillStyle = "transparent";
			canvasFollowIcons[i].style.color = "#ff0036";

			canvasTool.drawPolygon(followIcons[i], followCtx, params);
		});
	}
}
