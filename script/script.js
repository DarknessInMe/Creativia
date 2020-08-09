import {
	drawArrows,
	drawFAicons,
	drawFeaturesCheckmarks,
	drawServiceIcons,
	drawFollowIcons,
} from "./modules/canvas.module.js";

import mobileMenu from "./modules/UX/mobilemenu.module.js";
import accordionMenu from "./modules/UX/accordionmenu.module.js";
import sliderDesktop from "./modules/UX/sliderdesktop.module.js";
import sliderMobile from "./modules/UX/slidermobile.module.js";
import sliderLite from "./modules/UX/sliderlite.module.js";
import runningNums from "./modules/UX/runningnums.module.js";
import postLoading from "./modules/UX/postloading.module.js";

const scripts = {
	"running-nums": runningNums,
};

document.addEventListener("DOMContentLoaded", function () {
	for (let i = 0; i < slider_item.length; i++) {
		slider_item[i].style.backgroundImage = `url(${photos[i]})`;
		slider_item[i].style.opacity = 0;
	}

	slider_item[0].style.opacity = 1;

	handleResize();
});

window.addEventListener("resize", handleResize);

const SMALL_BREAKPOINT = 767;

const photos = [
	"images/banner/banner1.jpg",
	"images/banner/banner2.jpg",
	"images/banner/banner3.jpg",
];

const slider_body = document.querySelector(".slider-body");
const slider_item = document.querySelectorAll(".slider-item");

const sliderTool = new SliderBasic(slider_body, slider_item, photos);

const newsContent = document.querySelectorAll(".news-content");

let MAX_SIZE = 250;

function handleResize() {
	let isMobile = null;

	if (window.innerWidth <= SMALL_BREAKPOINT) {
		isMobile = true;
		MAX_SIZE = 200;
		popupNavigation("exit");
	} else {
		isMobile = false;
		MAX_SIZE = 250;
	}

	message_button.onclick = (event) => {
		popupEngine(event, isMobile);
	};

	[...newsContent].forEach(
		(elem) => (elem.textContent = cutText(MAX_SIZE, elem.textContent))
	);

	sliderMobile(isMobile);
	sliderDesktop(isMobile);
}

export { MAX_SIZE };

const leftArrow = document.getElementById("left-arrow");
const leftCtx = leftArrow.getContext("2d");

const rightArrow = document.getElementById("right-arrow");
const rightCtx = rightArrow.getContext("2d");

const canvasTool = new CanvasTool();

export { leftArrow, leftCtx, rightArrow, rightCtx, canvasTool, sliderTool };

drawArrows({
	params: {
		common: {
			strokeStyle: "#a4a4a4",
			lineCap: "round",
			lineWidth: 8,
		},
		active: {
			strokeStyle: "#ff0036",
			lineCap: "round",
			lineWidth: 8,
		},
	},
});

mobileMenu();

const accordion_content = document.querySelectorAll(".accordion-content");

export { accordion_content };

accordion_content[0].style.display = "block";

accordionMenu({
	params: {
		common: {
			strokeStyle: "#505050",
			lineCap: "butt",
			lineWidth: 1,
			optional: {
				widthCoefficient: 2,
			},
		},
		active: {
			strokeStyle: "#ff0036",
			lineCap: "butt",
			lineWidth: 1,
			optional: {
				widthCoefficient: 2,
			},
		},
	},
});

drawFAicons({
	params: {
		common: {
			strokeStyle: "#2f2f2f",
			fillStyle: "#ffffff",
			lineWidth: 1,
		},
		active: {
			strokeStyle: "#ff0036",
			fillStyle: "#ff0036",
			lineWidth: 1,
		},
	},
});

function drawCheckmarks(origin, context, color) {
	context.lineWidth = 4;
	context.strokeStyle = color;
	context.lineCap = "round";
	context.lineJoin = "round";

	context.beginPath();
	context.moveTo(2.5, 6);
	context.lineTo(7, origin.height - 3);
	context.lineTo(origin.width - 2.5, 2);

	context.stroke();
}

export { drawCheckmarks };

drawFeaturesCheckmarks({
	params: {
		common: {
			strokeStyle: "transparent",
			fillStyle: "#e7e7e7",
		},
		active: {
			strokeStyle: "transparent",
			fillStyle: "#ffffff",
		},
	},
});

sliderLite({
	params: {
		lineCap: "round",
		fillStyle: "#ffffff",
	},
});

drawServiceIcons();

function cutText(size, target) {
	let originText = target;

	if (originText.length > size) {
		originText = `${originText.slice(0, size)}...`;
	}
	return originText;
}

export { cutText };

postLoading();

drawFollowIcons();

const figure_draw = document.querySelector(".figure-draw").getContext("2d");

{
	figure_draw.fillStyle = "#262626";

	figure_draw.moveTo(22, 0);
	figure_draw.lineTo(0, 56);
	figure_draw.lineTo(56, 0);

	figure_draw.fill();
}

const message_button = document.querySelector(".contact-btn");
const popup = document.querySelector(".popup");
const popupBody = document.querySelector(".popup-body");
const starterMenu = document.querySelector(".popup-content");

function popupEngine(event, check) {
	event.preventDefault();

	const form = document.forms["send-message"];

	for (let i = 0; i < form.elements.length - 1; i++) {
		if (form.elements[i].value == "") {
			alert("all forms must be completed");
			return false;
		}
	}

	if (!check) {
		const storageDate = new Date();

		const formData = {
			name: form.elements.name.value,
			email: form.elements.mail.value,
			subject: form.elements.subject.value,
			message: form.elements.message.value,
			date: storageDate,
		};

		localStorage.setItem(`message-from`, JSON.stringify(formData));

		popup.classList.add("popup-active");
		popup.addEventListener("transitionend", () => {
			starterMenu.style.display = "block";
		});
	} else {
		alert("Your message has been received. Thank you");
	}
}

const btnOpenStorage = document.querySelector(".btn-open");
const btnDeleteStorage = document.querySelector(".btn-delete");
const btnCloseStorage = document.querySelector(".btn-close-popup");

const navigation = {
	".popup-content": {
		next: [".popup-showmessages", ".popup-deleted"],
		prev: null,
		current: ".popup-content",
	},
	".popup-showmessages": {
		next: null,
		prev: ".popup-content",
		current: ".popup-showmessages",
	},
	".popup-deleted": {
		next: null,
		prev: ".popup-content",
		current: ".popup-deleted",
	},
};

let current = ".popup-content";

function popupNavigation(directory, index) {
	let currentWindow = document.querySelector(navigation[current].current);

	currentWindow.style.display = "none";
	if (directory == "exit") {
		popup.classList.remove("popup-active");
	} else {
		Array.isArray(navigation[current][directory])
			? (document.querySelector(
					navigation[current][directory][index]
			  ).style.display = "block")
			: (document.querySelector(navigation[current][directory]).style.display =
					"block");
	}
}

popup.onclick = (event) => {
	if (event.target == popupBody) {
		popupNavigation("exit");
	}
};

{
	// Очистить localStorage

	btnDeleteStorage.addEventListener("click", () => {
		localStorage.removeItem("message-from");
		popupNavigation("next", 1);

		current = navigation[current].next[1];

		setTimeout(() => {
			popupNavigation("exit");
			current = navigation[current].prev;
		}, 2000);
	});

	// Закрыть весь попап

	btnCloseStorage.addEventListener("click", () => {
		popupNavigation("exit");
	});

	// Открыть попам с сохраненным сообщением

	btnOpenStorage.addEventListener("click", () => {
		popupNavigation("next", 0);

		current = navigation[current].next[0];

		const storageData = JSON.parse(localStorage.getItem("message-from"));

		const messageSpans = document.querySelectorAll("[data-message]");

		messageSpans.forEach((el) => {
			let span = el.dataset.message;

			el.textContent = storageData[span];
		});
	});

	const backFromMsg = document.querySelector(".close-msg");

	// Закрыть попап с сохраненным сообщением

	backFromMsg.addEventListener("click", () => {
		popupNavigation("prev");

		current = navigation[current].prev;
	});
}

const lazyElements = document.querySelectorAll("[data-lazy]");

const options = {
	root: null,
	rootMargin: "0px",
	threshold: 0.1,
};

const observer = new IntersectionObserver(handleObserver, options);

lazyElements.forEach((lazyElement) => {
	observer.observe(lazyElement);
});

function handleObserver(observeObj) {
	observeObj.forEach((element) => {
		if (element.isIntersecting) {
			loadElement(element.target);
			observer.unobserve(element.target);
		}
	});
}

function loadElement(element) {
	if (element.dataset.lazy == "image") {
		element.src = element.getAttribute("data-src");
	}
	if (element.dataset.lazy == "background") {
		element.style.backgroundImage = `url(${element.getAttribute("data-src")})`;
	}
	if (element.dataset.lazy == "script") {
		scripts[element.getAttribute("data-src")]();
	}
}
