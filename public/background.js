/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "tp",
    "title": "Toggle Purify",
    "contexts": ["page", "frame"]
  });
});

const cmds = {
  on: 'on',
  off: 'off'
}

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({currentWindow: true, active: true, lastFocusedWindow: true}, function(tabs){
    if (tabs.length > 0) {
      const tabId = tabs[0].id
      chrome.browserAction.getBadgeText({tabId: tabId}, function(text){
        if(text === cmds.on) {
          chrome.browserAction.setBadgeText({text: '', tabId: tabId})
          chrome.tabs.sendMessage(tabId, {cmd: cmds.off}, function(response) {
            
          })
        } else {
          chrome.browserAction.setBadgeText({text: cmds.on, tabId: tabId})
          chrome.tabs.sendMessage(tabId, {cmd: cmds.on}, function(response) {
            
          })
        }
      })
    }
  })
})