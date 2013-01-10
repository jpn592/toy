// ==UserScript==
// @name      Use Https
// @author    justmao945 AT gmail DOT com
// @match     http://*.golang.org/*
// @match     http://*.youtube.com/*
// @match     http://*.google.com.hk/*
// @match     http://*.google.com/*
// @match     http://*.facebook.com/*
// @match     http://*.twitter.com/*
// ==/UserScript==
//
// 1. Forked from Use HTTPS
// -- https://chrome.google.com/webstore/detail/kbkgnojednemejclpggpnhlhlhkmfidi
//
// 2. Add URLs to @match metadata block to use https
//

chrome.tabs.onUpdated.addListener( function(tabId, info, tab){
  if( info.status == "loading" ){
    chrome.tabs.update(tab.id, {
                                 url: tab.url.replace("http://", "https://"),
                                 selected: true
                               });
  }
});

