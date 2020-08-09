const button = document.querySelector(".mobile-menu");
const menuWrapper = document.querySelector(".mob-nav");
const buttonElements = document.querySelectorAll(".menu-btn");
const menuItems = document.querySelectorAll(".mob-nav-item");

export default function mobileMenu() {
	button.addEventListener("click", function (event) {
		event.stopPropagation();

		menuWrapper.classList.toggle("mob-nav-active");

		for (let element of buttonElements) {
			element.classList.toggle("mobile-menu-active");
		}

		for (let element of menuItems) {
			element.onclick = function () {
				menuWrapper.classList.remove("mob-nav-active");
				for (let element of buttonElements) {
					element.classList.remove("mobile-menu-active");
				}
			};
		}
		document.body.onclick = function (event) {
			if (event.target != menuWrapper) {
				menuWrapper.classList.remove("mob-nav-active");
				for (let element of buttonElements) {
					element.classList.remove("mobile-menu-active");
				}
			}
		};
	});
}
