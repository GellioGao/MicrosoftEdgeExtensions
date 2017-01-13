function makeCode (url) {
	var qrcode = new QRCode("qrcode", {
        text: url
    });
}

window.addEventListener("load", e => {
    browser.tabs.query({ active: true, currentWindow: true },
        tabs => browser.tabs.get(tabs[0].id, 
            tabInfo => makeCode(tabInfo.url)));
});