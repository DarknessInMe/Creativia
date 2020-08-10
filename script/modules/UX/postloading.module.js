import { canvasTool, cutText, MAX_SIZE } from "../../script.js";

const button = document.querySelector(".loadMoreBtn-wrap");
const canvasCircle = document.querySelector(".loadMoreBtn");
const canvasArrow = document.querySelector(".loadMoreBtnArrow");
const canvasWrap = document.querySelector(".canvasBtn-wrap");
const loadingIcon = document.querySelector(".loadProgress");
const imageWrap = document.querySelector(".news-img-wrap");

export default function postLoading() {
	const loadMoreBtnCtx = canvasCircle.getContext("2d");
	const loadArrowCtx = canvasArrow.getContext("2d");

	const params = {
		fillStyle: "#f2f2f2",
	};

	canvasTool.drawCircle(canvasCircle, loadMoreBtnCtx, params);

	const paramsArrow = {
		strokeStyle: "#a2a2a2",
		lineCap: "round",
		lineWidth: 5,
	};

	canvasTool.drawDownArrow(canvasArrow, loadArrowCtx, paramsArrow);

	canvasWrap.addEventListener("mouseover", () => {
		loadMoreBtnCtx.clearRect(0, 0, canvasCircle.width, canvasCircle.height);
		loadArrowCtx.clearRect(0, 0, canvasArrow.width, canvasArrow.height);

		params.fillStyle = "#ff0036";

		canvasTool.drawCircle(canvasCircle, loadMoreBtnCtx, params);

		paramsArrow.strokeStyle = "#ffffff";

		canvasTool.drawDownArrow(canvasArrow, loadArrowCtx, paramsArrow);
	});

	canvasWrap.addEventListener("mouseout", () => {
		loadMoreBtnCtx.clearRect(0, 0, canvasCircle.width, canvasCircle.height);
		loadArrowCtx.clearRect(0, 0, canvasArrow.width, canvasArrow.height);

		params.fillStyle = "#f2f2f2";

		canvasTool.drawCircle(canvasCircle, loadMoreBtnCtx, params);

		paramsArrow.strokeStyle = "#a2a2a2";

		canvasTool.drawDownArrow(canvasArrow, loadArrowCtx, paramsArrow);
	});

	let index = 0;

	function buildPost(html, data, length) {
		if (index == length - 1) {
			button.style.display = "none";
		}

		const template = document.createElement("div");

		template.classList.add("news-block");
		template.innerHTML = html;

		template.querySelector(".link-image").src = data.image;
		template.querySelector(".news-title").textContent = data.header;

		const panelIconsLabels = template.querySelectorAll(".panel-item-label");

		panelIconsLabels[0].textContent = data.user;
		panelIconsLabels[1].textContent = data.views;
		panelIconsLabels[2].textContent = data.comments;

		template.querySelector(".news-content").textContent = cutText(
			MAX_SIZE,
			data.content
		);
		console.log(MAX_SIZE);
		canvasWrap.classList.remove("_hideBtnOrLoading");
		loadingIcon.classList.add("_hideBtnOrLoading");
		button.removeAttribute("disabled");

		loadMoreBtnCtx.clearRect(0, 0, canvasCircle.width, canvasCircle.height);
		loadArrowCtx.clearRect(0, 0, canvasArrow.width, canvasArrow.height);

		params.fillStyle = "#f2f2f2";
		canvasTool.drawCircle(canvasCircle, loadMoreBtnCtx, params);
		paramsArrow.strokeStyle = "#a2a2a2";
		canvasTool.drawDownArrow(canvasArrow, loadArrowCtx, paramsArrow);

		document.querySelector(".blog-main").append(template);
	}

	function* contentGenerator() {
		let templateJSON = fetch("./fake_server/template.json").then((responce) => {
			return responce.json();
		});

		let templateHTML = fetch("./fake_server/template.html").then((responce) => {
			return responce.text();
		});

		while (true) {
			canvasWrap.classList.add("_hideBtnOrLoading");
			loadingIcon.classList.remove("_hideBtnOrLoading");
			button.setAttribute("disabled", "disabled");

			yield Promise.all([templateHTML, templateJSON]).then((data) => {
				setTimeout(() => {
					buildPost(data[0], data[1][index], data[1].length);
				}, 1000);
			});
			index++;
		}
	}

	const generator = contentGenerator();

	button.addEventListener("click", () => {
		generator.next();
	});
}
