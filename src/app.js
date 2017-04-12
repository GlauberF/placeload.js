/*
⊂_ヽ
　＼＼ Λ＿Λ
　  ＼('ㅅ')  Placeload.js developed by Victor Igor (victorvoid)
　　　>　 ⌒ヽ
*/

import { merge, compose } from 'ramda';
import { divElement, position, size } from './placeDOM';
import { defaultOptions, defaultDraw } from './config';
import { isPorcent,
				 isPixel,
				 toPorcent,
				 toPixel } from './placeUNIT';

const elementPlaceload = divElement({className: 'placeload-background'}); //LAYER 1

class Placeload {
	constructor(container, options){
		this.fullHeight = 0;
		this.defaultOptions = merge(defaultOptions, options);
		this.container = document.querySelector(container);
		this.container.appendChild(elementPlaceload);
	}

	//::props -> DOM style
	draw(props) {
		const elementDraw  = divElement({className: 'placeload-masker'}); //LAYER 2
		const propsDraw = merge(defaultDraw, props);
		const containerSizeX = this.container.offsetWidth;
		const getSizeSide = size => isPorcent(propsDraw[size]) ?
						toPorcent(100 - parseInt(propsDraw[size]))   /* other unit */
					: toPixel(containerSizeX - parseInt(propsDraw[size]));

		const sideSizeX = getSizeSide('width');
		const sideSizeY = getSizeSide('height');
		const maskerHeight = parseInt(propsDraw['margin-top']) + this.fullHeight || this.fullHeight;
		const maskerSize = size({ width: sideSizeX, height: propsDraw.height });
		const maskerPosition = position({ left: propsDraw.width, top: toPixel(maskerHeight) });
		const sideRigtLeft = compose(maskerSize, maskerPosition);
		elementPlaceload.appendChild(sideRigtLeft(elementDraw));

		this.fullHeight += parseInt(propsDraw.height);
		elementPlaceload.style.height = toPixel(this.fullHeight);
	}
}

const userPlaceload = new Placeload('.user-placeload', {borderRadius: '10px'});
userPlaceload.draw({width: '50%', height: '30px' });
userPlaceload.draw({width: '120px', height: '100px'});

// Export
if (typeof window !== 'undefined' && window) {
	if (typeof module === 'object' && module.exports) {
	  module.exports = Placeload;
	} else {
	  // Browser
	  window.Placeload = Placeload;
	}
}
