import { canvasTool, cutText } from "../../script.js";

const clients_data = [
	{
		name: "Amr Srour",
		image: "images/clients/client-1.png",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer sed magna vel velit dignissim luctus eu in urna.Dapibus egestas turpis.",
	},
	{
		name: "Sahar Doe",
		image: "images/clients/client-2.png",
		comment:
			"Well, this PSD layout quite extensive. Honestly, i tired little bit. But, i'm still on my way to finish that.",
	},
	{
		name: "Johan De",
		image: "images/clients/client-3.png",
		comment:
			"Some dummy text, but i sick of lorem ipsum. Let's pretend that there is nothing weird",
	},
];
const slider_name = document.querySelector(".slider-name");
const commentInfo = document.querySelector(".comment-info");
const slider_photo = document.querySelector(".slider-photo");
const slider_status_items = document.querySelectorAll(".slider-status-item");
const archive = [];

export default function sliderLite(arg) {
	let index = 0;

	let sliderContext = slider_photo.getContext("2d");
	const checkPromises = clients_data.map((obj) => {
		let image = new Image();
		image.src = obj.image;

		return new Promise((resolve, reject) => {
			image.onload = function () {
				resolve(image);
			};
		}).then((image) => archive.push(image));
	});

	Promise.all(checkPromises).then(() => sliderChanges(index));

	canvasTool.drawPolygon(slider_photo, sliderContext, arg.params);
	commentInfo.textContent = cutText(150, clients_data[index].comment);

	function setSliderImage(index) {
		sliderContext.globalCompositeOperation = "source-atop";
		sliderContext.drawImage(
			archive[index],
			0,
			0,
			slider_photo.width,
			slider_photo.height
		);
	}

	function sliderChanges(index) {
		setSliderImage(index);
		slider_status_items[index].classList.add("_status-item-active");
		slider_name.textContent = clients_data[index].name;

		commentInfo.addEventListener(
			"transitionend",
			() => {
				commentInfo.textContent = cutText(150, clients_data[index].comment);
				commentInfo.classList.remove("_comment-info_changing");
			},
			{ once: true }
		);

		setTimeout(function () {
			if (index == clients_data.length - 1) {
				index = 0;
			} else {
				index++;
			}
			for (let item of slider_status_items) {
				item.classList.remove("_status-item-active");
			}
			commentInfo.classList.add("_comment-info_changing");

			sliderChanges(index);
		}, 3000);
	}
}
