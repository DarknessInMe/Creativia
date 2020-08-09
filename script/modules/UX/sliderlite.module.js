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

export default function sliderLite(arg) {
	let sliderContext = slider_photo.getContext("2d");

	canvasTool.drawPolygon(slider_photo, sliderContext, arg.params);

	let index = 1;

	const sliderImage = new Image();

	function setSliderImage() {
		sliderContext.globalCompositeOperation = "source-atop";
		sliderContext.drawImage(
			sliderImage,
			0,
			0,
			slider_photo.width,
			slider_photo.height
		);
	}
	sliderChanges(0);

	function sliderChanges() {
		slider_status_items[index].classList.add("_status-item-active");
		slider_name.textContent = clients_data[index].name;

		commentInfo.classList.add("_comment-info_changing");
		commentInfo.addEventListener(
			"transitionend",
			() => {
				commentInfo.textContent = clients_data[index].comment;
				commentInfo.classList.remove("_comment-info_changing");
			},
			{ once: true }
		);
		commentInfo.textContent = cutText(150, clients_data[index].comment);
		sliderImage.src = clients_data[index].image;

		sliderImage.onload = setSliderImage;

		if (index == clients_data.length - 1) {
			index = 0;
		} else {
			index++;
		}
	}

	const sliderInterval = setInterval(function () {
		for (let item of slider_status_items) {
			item.classList.remove("_status-item-active");
		}
		sliderChanges();
	}, 4000);
}
