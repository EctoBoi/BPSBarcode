
(function () {

	window.onload = function () {
		//inject();
		let skuSpan = document.getElementsByTagName("BODY")[0];

		skuSpan.onclick = function () { inject() };
	}

})();


function inject() {
	let sku = document.getElementsByClassName("sku")[0].innerHTML.match(/\d/g).join('')

	if (!document.getElementById('barcode')) {
		let div = document.createElement('div');
		let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.id = 'barcode'
		div.appendChild(svg)

		document.getElementsByClassName('top namePartPriceContainer')[1].appendChild(div);
	}
	let height;
	chrome.storage.sync.get('height', function (data) {
		height = data.height;
		JsBarcode("#barcode", sku, { height: height });
	});
}