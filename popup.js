
'use strict';

let changeColor = document.getElementById('changeColor');
let logSku = document.getElementById('logSku');

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'chrome.storage.sync.set({ sku: document.getElementsByClassName("sku")[0].innerHTML }); console.log(document.getElementsByClassName("sku")[0].innerHTML)' });
  });
};

logSku.onclick = function (element) {
  chrome.storage.sync.get('sku', function (data) {
    JsBarcode("#barcode", data.sku.match(/\d/g).join(''));
  });
};