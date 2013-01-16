// ==UserScript==
// @name   Sogou cloud IME shortcuts
// @author justmao945 AT gmail DOT com
// @match  http://*/*
// @match  https://*/*
// @run_at document_end
// ==/UserScript==
//
// * Press Ctrl + , to trigger IME.
// * Can't work in HTTPS mode ? Add the command line flag
//      --allow-running-insecure-content
//   to prevent Chrome from checking for insecure content.
// 
// [0] http://pinyin.sogou.com/cloud/?r=pinyin
// [1] http://stackoverflow.com/questions/10485992/hijacking-a-variable-with-a-userscript-for-chrome
// [2] http://www.catswhocode.com/blog/using-keyboard-shortcuts-in-javascript
// [3] http://code.google.com/p/chromium/issues/detail?id=128413

var code = function(){
  var CTRL  = 17;
  var SPACE = 32;
  var COMMA = 188;
  var isCtrl = false;

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
      if( typeof(imeInit) === 'undefined' ){
        var js = document.createElement('script');
        js.setAttribute('src', 'http://web.pinyin.sogou.com/web_ime/init2.php');
        document.body.appendChild(js);
      }else if( ime_close ){
        imeInit();
      }else{
        imeClose();
      }
    }
    if( onkeydown && typeof(onkeydown) === 'function' )
      onkeydown(e);
  }
}

var script = document.createElement('script');
script.textContent = '(' + code + ')()';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

