var titleString = browser.i18n.getMessage("ContextMenuTitle");

browser.contextMenus.create({
  id: "qrcodereader",
  title: titleString,
  contexts: ["image"]
});

qrcode.callback = text => {
  browser.tabs.sendMessage(tabid, {
        type: "text",
        text: text
      });
};

function handleResponse(message) {
  qrcode.decode(message.img);
}

var tabid;

browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "qrcodereader") {
    tabid = tab.id;
    if (qrcode.isUrl(info.srcUrl)) {
      browser.tabs.sendMessage(tab.id, {
        type: "url",
        url: info.srcUrl
      }, handleResponse);
    } else {
      qrcode.decode(info.srcUrl);
    }
  }
});