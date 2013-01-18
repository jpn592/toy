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

// rules to be blocked
var rules =
{
  "www.bilibili.tv" : {
    ids: ["taobaoid"],
    classes: ["ad-b", "ad-b2", "ad-b3", "ad-b4", "ad-e", "ad-e3", "ad-f"],
    func: null /* function */
  },

  "www.acfun.tv" : {
    ids: [],
    classes: ["ad"],
    func: null
  },

  "bt.ktxp.com": {
    ids: [],
    classes: ["money"],
    func: null
  }
};

// After timeout, script loops will be breaked.
var timeout = 1000;

// Loops will be repeated between every interval.
var interval = 300;


// ------------------------------------------
//  Main proc
// ------------------------------------------
var rule = rules[location.hostname];
if( ! rule ) return;

// Remove node e from DOM
// return ture if e is not null and removed, or false
var rm = function( /* Element */ e ){
  if( e && e.parentNode ){
    console.warn("[Blocked] {URI:'" + e.baseURI + "', id:'" + e.id
                  + "', class:'" + e.className + "'}");
    e.parentNode.removeChild(e);
    return true;
  }
  return false;
}

// loops for blocking
var loop = function(){
  var cnt = 0;
  if( rule.ids && rule.ids.constructor === Array ){
    for( var i=0; i<rule.ids.length; ++i ){
      if( rm( document.getElementById( rule.ids[i] ) ) ){
        cnt++;
      }
    }
  }

  if( rule.classes && rule.classes.constructor === Array ){
    for( var i=0; i<rule.classes.length; ++i ){
      var es = document.getElementsByClassName( rule.classes[i] );
      for( var j=0; j<es.length; ++j ){
        if ( rm( es[j] ) ){
          cnt++;
        }
      }
    }
  }

  if( typeof( rule.func ) === "function" ){
    if ( rule.func() ){
      cnt++;
    }
  }
  return cnt;
}

// loop first
loop();

// init interval
var interId = setInterval(loop, interval);

// clear interval after timeout
// TODO Smarter stopper according to the value returned by loop() ?
setTimeout(function(){
  clearInterval(interId);
}, timeout);

