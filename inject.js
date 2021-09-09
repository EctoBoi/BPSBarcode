
(function () {

	window.onload = function () {
		try{
						
			inject();
		}catch(error) {

		}
		
		let body = document.getElementsByTagName("BODY")[0];
		//let sku = document.getElementsByClassName("sku")[0];
		body.addEventListener('mousemove', function () { inject() });
	}

})();


function inject() {
	if(typeof document.getElementsByClassName("sku")[0] !== "undefined"){
		const firstSkuImage = document.documentElement.innerHTML.match(/firstSkuImage.+;/g)[0]
		let sku = firstSkuImage.substring(firstSkuImage.indexOf('/')+1,firstSkuImage.indexOf('_'))	
	
		let barcodeCreated = false;	

		if (!document.getElementById('barcode')) {
			let div = document.createElement('div');
			let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.id = 'barcode'
			div.appendChild(svg)

			document.getElementsByClassName('top namePartPriceContainer')[1].appendChild(div);
			barcodeCreated = true;
		}
		let lastSku = undefined
		chrome.storage.sync.get('lastSku', function (data) {
			lastSku = data.lastSku;
			if (sku !== lastSku || barcodeCreated) {
				chrome.storage.sync.get('height', function (data) {
					JsBarcode("#barcode", sku, { height: data.height });
					chrome.storage.sync.set({ lastSku: sku });
				});
			}
		})
	
	
	}

}