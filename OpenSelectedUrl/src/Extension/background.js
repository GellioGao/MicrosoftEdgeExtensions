var titleString = browser.i18n.getMessage("ContextMenuTitle");

browser.contextMenus.create({
  id: "openselectedurl",
  title: titleString,
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "openselectedurl") {
    var url;
    if( info.selectionText){
      if(!isUrl(info.selectionText)){
        url = "http://" + info.selectionText;
      }else{
        url = info.selectionText;
      }
    }
    if (isUrl(url)) {
      browser.tabs.create({url: url});
    }
  }
});


function isUrl(s)
{
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}