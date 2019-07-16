
(function () {

	window.onload = function () {
		let body = document.getElementsByTagName("BODY")[0];
		//let sku = document.getElementsByClassName("sku")[0];

		body.addEventListener('mousemove', function () { inject() });
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
	let lastSku = 'q'
	chrome.storage.sync.get('lastSku', function (data) {
		lastSku = data.lastSku;
		if (sku !== lastSku) {
			chrome.storage.sync.get('height', function (data) {
				JsBarcode("#barcode", sku, { height: data.height });
				chrome.storage.sync.set({ lastSku: sku });
			});
		}
	})

}