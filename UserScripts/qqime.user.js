// ==UserScript==
// @name    QQ Cloud IME Helper
// @author  justmao945 AT gmail DOT com
// @include http://*/*
// @include https://*/*
// @run_at  document_end
// @version rev.20130116
// ==/UserScript==
//
// * Press Ctrl + , to toggle IME.
//
// * Can't work in HTTPS mode ? Add the command line flag
//      --allow-running-insecure-content
//   to prevent Chrome from checking for insecure content.
//
// * Can't install from local file ? Add the command line flag
//       --enable-easy-off-store-extension-install
//   to prevent Chrome from checking for off stroe extension.
// 
// [0] http://py.qq.com/web/
// [1] http://stackoverflow.com/questions/10485992/hijacking-a-variable-with-a-userscript-for-chrome
// [2] http://www.catswhocode.com/blog/using-keyboard-shortcuts-in-javascript
// [3] http://code.google.com/p/chromium/issues/detail?id=128413
// [4] http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t

var code = function(){
  // do nothing in an iframe
  if( top !== self )
    return;

  var CTRL  = 17;
  var SPACE = 32;
  var COMMA = 188;
  var isCtrl = false;

  var toggleIME = function(){
    if( typeof(window.QQWebIME) === 'undefined' ){
      var js = document.createElement('script');
      js.async=true;
      js.src='//ime.qq.com/fcgi-bin/getjs';
      js.setAttribute('ime-cfg','lt=2');
      
      var head = document.getElementsByTagName('head')[0];
      head.insertBefore(js, head.firstChild);
      console.log("Loading QQ Cloud IME...");
    }else{
      window.QQWebIME.toggle();
    }
  }

  var onkeyup = document.onkeyup;
  document.onkeyup = function(e) {
    if(e.which === CTRL)
      isCtrl=false;
    if( onkeyup && typeof(onkeyup) === 'function' )
      onkeyup(e);
  }

  var onkeydown = document.onkeydown;
  document.onkeydown = function(e){
    if(e.which === CTRL){
      isCtrl = true;
    }
    else if(e.which === COMMA && isCtrl) {
      toggleIME();
    }
    if( onkeydown && typeof(onkeydown) === 'function' )
      onkeydown(e);
  }

  // default install IME
  toggleIME();
}

var script = document.createElement('script');
script.textContent = '(' + code + ')()';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

