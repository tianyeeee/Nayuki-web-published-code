/* 
 * Resizing images by area
 * 
 * Copyright (c) 2017 Project Nayuki
 * All rights reserved. Contact Nayuki for licensing.
 * https://www.nayuki.io/page/resizing-images-by-area
 */

"use strict";


var TIMES = "\u00D7";  // Times sign

function calc() {
	function clearChildren(node) {
		while (node.firstChild != null)
			node.removeChild(node.firstChild);
	}
	
	function parseNumber(nodeId) {
		var text = document.getElementById(nodeId).value;
		text = text.replace(/^\s+|\s+$/g, "");  // Trim whitespace
		var result = parseFloat(text);
		if (result <= 0)
			throw "Positive number expected";
		else if (result == Infinity || isNaN(result))
			throw "Finite number expected";
		else
			return result;
	}
	
	// Clear outputs
	var resizedDimensions = document.getElementById("resized-dimensions");
	var resizedAreaOutput = document.getElementById("resized-area-output");
	var aspectRatio       = document.getElementById("aspect-ratio");
	clearChildren(resizedDimensions);
	clearChildren(resizedAreaOutput);
	clearChildren(aspectRatio);
	
	try {
		// Get inputs
		var originalWidth  = parseNumber("original-width");
		var originalHeight = parseNumber("original-height");
		var resizedArea    = parseNumber("resized-area");
		
		// Format aspect ratio
		var artext;
		if (originalWidth > originalHeight)
			artext = (originalWidth / originalHeight).toFixed(3) + " : 1";
		else if (originalHeight > originalWidth)
			artext = "1 : " + (originalHeight / originalWidth).toFixed(3);
		else
			artext = "1 : 1";
		aspectRatio.appendChild(document.createTextNode(artext));
		
		// Calculate outputs
		var resizedWidth  = Math.sqrt(resizedArea * originalWidth / originalHeight);
		var resizedHeight = Math.sqrt(resizedArea * originalHeight / originalWidth);
		resizedWidth  = resizedWidth  > 0.5 ? Math.round(resizedWidth)  : 1;
		resizedHeight = resizedHeight > 0.5 ? Math.round(resizedHeight) : 1;
		var area = resizedWidth * resizedHeight / 1000000;  // In megapixels
		
		// Format outputs
		resizedDimensions.appendChild(document.createTextNode(resizedWidth + " " + TIMES + " " + resizedHeight));
		var areatext;
		if (area < 0.3)
			areatext = area.toFixed(3);
		else if (area < 3)
			areatext = area.toFixed(2);
		else if (area < 30)
			areatext = area.toFixed(1);
		else
			areatext = area.toFixed(0);
		resizedAreaOutput.appendChild(document.createTextNode(areatext + " megapixels"));
	} catch (e) {}
}
