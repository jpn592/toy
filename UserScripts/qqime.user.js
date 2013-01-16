// ==UserScript==
// @name   QQ cloud IME shortcuts
// @author justmao945 AT gmail DOT com
// @include http://*/*
// @include https://*/*
// @run_at document_end
// ==/UserScript==
//
// * Press Ctrl + , to toggle IME.
// * Can't work in HTTPS mode ? Add the command line flag
//      --allow-running-insecure-content
//   to prevent Chrome from checking for insecure content.
// 
// [0] http://py.qq.com/web/
// [1] http://stackoverflow.com/questions/10485992/hijacking-a-variable-with-a-userscript-for-chrome
// [2] http://www.catswhocode.com/blog/using-keyboard-shortcuts-in-javascript
// [3] http://code.google.com/p/chromium/issues/detail?id=128413

var code = function(){
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

