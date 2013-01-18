// ==UserScript==
// @name    Adblocks
// @author  justmao945 AT gmail DOT com
// @include http://*/*
// @include https://*/*
// @run_at  document_end
// @version rev.20130118
// ==/UserScript==
//
// [1] https://developer.mozilla.org/en/window.location
//

// rules
var rules =
{
  "www.bilibili.tv" : {
    ids: ["taobaoid"],
    classes: ["ad-b", "ad-b2", "ad-b3", "ad-b4", "ad-e", "ad-e3", "ad-f"],
    func: null
  },

  "www.acfun.tv" : {
    ids: [],
    classes: ["ad"],
    func: null
  },
};


// ------------------------------------------
//  Main proc
// ------------------------------------------
var rule = rules[location.hostname];
if( ! rule ) return;

var rm = function(e){
  if( e && e.parentNode ){
    console.warn("[Blocked] {URI:'" + e.baseURI + "', id:'" + e.id
                  + "', class:'" + e.className + "'}");
    e.parentNode.removeChild(e);
  }
}

for( var i=0; i<rule.ids.length; ++i ){
  rm( document.getElementById( rule.ids[i] ) );
}

for( var i=0; i<rule.classes.length; ++i ){
  var es = document.getElementsByClassName( rule.classes[i] );
  for( var j=0; j<es.length; ++j ){
    rm( es[j] );
  }
}

if( typeof( rule.func ) === "function" ){
  rule.func();
}

