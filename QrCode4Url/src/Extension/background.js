function handleUpdated(tabId, changeInfo, tabInfo) {
  browser.pageAction.show(tabId);
}

browser.tabs.onUpdated.addListener(handleUpdated);