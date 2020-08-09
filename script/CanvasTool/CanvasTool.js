class CanvasTool {
	constructor() {}

	_render(context, params) {
		context.beginPath();

		context.strokeStyle = params.strokeStyle || "transparent";
		context.lineWidth = params.lineWidth || 1;
		context.lineCap = params.lineCap || "";
		context.fillStyle = params.fillStyle || "transparent";
		context.lineJoin = params.lineJoin || "";
	}
	drawLeftArrow(origin, context, params) {
		this._render(context, params);

		context.moveTo(origin.width - params.lineWidth, params.lineWidth / 2);
		context.lineTo(params.lineWidth, origin.height / 2);
		context.lineTo(
			origin.width - params.lineWidth,
			origin.height - params.lineWidth / 2
		);
		context.fill();
		context.stroke();
	}

	drawRightArrow(origin, context, params) {
		this._render(context, params);

		context.moveTo(params.lineWidth, params.lineWidth / 2);
		context.lineTo(origin.width - params.lineWidth, origin.height / 2);
		context.lineTo(params.lineWidth, origin.height - params.lineWidth / 2);
		context.fill();
		context.stroke();
	}

	drawUpArrow(origin, context, params) {
		this._render(context, params);

		context.moveTo(params.lineWidth / 2, origin.height - params.lineWidth / 2);
		context.lineTo(origin.width / 2, params.lineWidth / 2);
		context.lineTo(
			origin.width - params.lineWidth / 2,
			origin.height - params.lineWidth / 2
		);

		context.fill();
		context.stroke();
	}

	drawDownArrow(origin, context, params) {
		this._render(context, params);

		context.moveTo(params.lineWidth / 2, params.lineWidth / 2);
		context.lineTo(origin.width / 2, origin.height - params.lineWidth / 2);
		context.lineTo(origin.width - params.lineWidth / 2, params.lineWidth / 2);

		context.fill();
		context.stroke();
	}

	drawPlusCircle(origin, context, params) {
		this._render(context, params);

		context.arc(
			origin.width / 2,
			origin.width / 2,
			origin.width / 2 - params.lineWidth,
			0,
			2 * Math.PI
		);
		context.fill();
		context.stroke();

		const tempParams = { ...params };

		if (
			params.optional &&
			(params.optional.widthCoefficient || params.optional.lineWidth)
		) {
			if (params.optional.widthCoefficient && params.optional.lineWidth) {
				throw new Error(
					"You can't set widthCoefficient and lineWidth at the same time! "
				);
			}

			if (params.optional.widthCoefficient) {
				tempParams.lineWidth =
					params.lineWidth * params.optional.widthCoefficient;
			} else {
				tempParams.lineWidth = params.optional.lineWidth;
			}
		}

		this._render(context, tempParams);
		context.moveTo(origin.width / 4, origin.height / 2);
		context.lineTo(origin.width - origin.width / 4, origin.height / 2);
		context.fill();
		context.stroke();

		this._render(context, tempParams);
		context.moveTo(origin.width / 2, origin.height / 4);
		context.lineTo(origin.width / 2, origin.height - origin.height / 4);
		context.fill();
		context.stroke();
	}

	drawMinusCircle(origin, context, params) {
		this._render(context, params);

		context.arc(
			origin.width / 2,
			origin.height / 2,
			origin.width / 2 - params.lineWidth,
			0,
			2 * Math.PI
		);
		context.fill();
		context.stroke();

		const tempParams = { ...params };

		if (
			params.optional &&
			(params.optional.widthCoefficient || params.optional.lineWidth)
		) {
			if (params.optional.widthCoefficient && params.optional.lineWidth) {
				throw new Error(
					"You can't set widthCoefficient and lineWidth at the same time! "
				);
			}

			if (params.optional.widthCoefficient) {
				tempParams.lineWidth =
					params.lineWidth * params.optional.widthCoefficient;
			} else {
				tempParams.lineWidth = params.optional.lineWidth;
			}
		}

		this._render(context, tempParams);
		context.moveTo(origin.width / 4, origin.height / 2);
		context.lineTo(origin.width - origin.width / 4, origin.height / 2);
		context.fill();
		context.stroke();
	}
	drawPolygon(origin, context, params) {
		this._render(context, params);
		context.moveTo(origin.width / 4 + context.lineWidth, context.lineWidth);
		context.lineTo(
			origin.width - origin.width / 4 - context.lineWidth,
			context.lineWidth
		);
		context.lineTo(origin.width - context.lineWidth, origin.height / 2);
		context.lineTo(
			origin.width - origin.width / 4 - context.lineWidth,
			origin.height - context.lineWidth
		);
		context.lineTo(
			origin.width / 4 + context.lineWidth,
			origin.height - context.lineWidth
		);
		context.lineTo(0 + context.lineWidth, origin.height / 2);
		context.lineTo(origin.width / 4 + context.lineWidth, context.lineWidth);
		context.fill();
		context.stroke();
	}

	drawCircle(origin, context, params) {
		if (origin.width !== origin.height) {
			throw new Error("Width and height of circle must be equal");
		}
		this._render(context, params);

		let startAngel = (Math.PI / 180) * params.startAngel || 0;
		let endAngel = (Math.PI / 180) * params.endAngel || 2 * Math.PI;
		let anticlockWise = params.anticlockWise || false;

		context.arc(
			origin.width / 2,
			origin.height / 2,
			origin.width / 2 - context.lineWidth,
			startAngel,
			endAngel,
			anticlockWise
		);
		context.fill();
		context.stroke();
	}
}
