class SliderBasic {
	constructor(sliderBody, sliderItems, archive) {
		this.sliderBody = sliderBody;
		this.sliderItems = sliderItems;
		this.archive = archive;
		this.globalArchiveIndex = 0;
	}

	sliderManipulation() {
		for (let element of this.sliderItems) {
			element.style.opacity = 0;
		}
		this.sliderItems[this.globalArchiveIndex].style.opacity = 1;
	}

	sliderMoveLeft() {
		this.sliderBody.style.backgroundImage = `url(${
			this.archive[this.globalArchiveIndex]
		})`;

		for (let element of this.sliderItems) {
			element.style.opacity = 0;
		}

		if (this.globalArchiveIndex == 0) {
			this.globalArchiveIndex = this.archive.length - 1;
		} else {
			this.globalArchiveIndex = this.globalArchiveIndex - 1;
		}
		this.sliderManipulation(this.sliderItems);
	}

	sliderMoveRight() {
		this.sliderBody.style.backgroundImage = `url(${
			this.archive[this.globalArchiveIndex]
		})`;
		for (let element of this.sliderItems) {
			element.style.opacity = 0;
		}
		if (this.globalArchiveIndex == this.archive.length - 1) {
			this.globalArchiveIndex = 0;
		} else {
			this.globalArchiveIndex = this.globalArchiveIndex + 1;
		}
		this.sliderManipulation(this.sliderItems);
	}
}
