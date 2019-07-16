
'use strict';

let saveButton = document.getElementById("save");
let height = document.getElementById("height");

saveButton.addEventListener('click', function () {
    chrome.storage.sync.set({ height: height.value}, function () {
    })
});