// ==UserScript==
// @name   QQ Music Download Helper
// @author justmao945 AT gmail DOT com
// @match  http://fm.qq.com/*
// @run_at document_end
// ==/UserScript==
//
// Press Ctrl + Down Arrow or call function qqdl() to download.
//
// [1] http://stackoverflow.com/questions/10485992/hijacking-a-variable-with-a-userscript-for-chrome
// [2] http://www.catswhocode.com/blog/using-keyboard-shortcuts-in-javascript

var CTRL = 17;
var DOWN = 40;

var dl = function(){
  var link  = document.createElement('a');
  var media = document.getElementById('h5audio_media');
  var song  = document.getElementById('divsongname');
  if( media && song ){
    link.setAttribute('href', media.src);
    link.setAttribute('download', song.getAttribute('title') + '.mp3');
    link.click();
  }
}

dl.isCtrl = false;

var onkeyup = document.onkeyup;
document.onkeyup = function(e) {
  if(e.which === CTRL)
    dl.isCtrl=false;

  if( onkeyup && typeof(onkeyup) === 'function' )
    onkeyup(e);
}

var onkeydown = document.onkeydown;
document.onkeydown = function(e){
  if(e.which === CTRL){
    dl.isCtrl = true;
  }
  else if(e.which === DOWN && dl.isCtrl) {
    dl();
  }

  if( onkeydown && typeof(onkeydown) === 'function' )
    onkeydown(e);
}

var script = document.createElement('script');
script.textContent = 'var qqdl = ' + dl + ';';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
