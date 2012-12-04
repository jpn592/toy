// ==UserScript==
// @name      QQ Music Download Button
// @author    justmao945 AT gmail DOT com
// @match     http://y.qq.com/
// @match     http://fm.qq.com/
// @run_at    document_end
// ==/UserScript==

is_fm = function(){
  return location.href.indexOf("fm") !== -1;
}

add_btn_down = function(){
  if( document.getElementsByClassName("btn_down").length == 0 )
    document.getElementsByClassName("music_op")[0].innerHTML += "<strong class=btn_down title=Download onclick=\"this.getElementsByTagName('a')[0].click();\"> <a href=# onclick=\"this.setAttribute('href', document.getElementById('h5audio_media').src); this.setAttribute('download', g_topPlayer.getCurSongInfo().msinger + ' - ' + g_topPlayer.getCurSongInfo().msong + '.mp3');\"></a> </strong>";
};


ck_complete = setInterval( is_fm()
? function(){
   if( document.readyState === "complete" ){
    clearInterval(ck_complete);
    document.getElementsByClassName("menu")[0].getElementsByTagName("ul")[0].innerHTML += "<li><a id=btn_down href=# onclick=\"this.setAttribute('href', document.getElementById('h5audio_media').src); this.setAttribute('download', document.getElementById('divsongname').getAttribute('title') + '.mp3');\" onMouseOver=\"this.setAttribute('title', document.getElementById('divsongname').getAttribute('title'));\">Download</a></li>";
  }
}
: function(){
  if( document.readyState === "complete" ){
    clearInterval(ck_complete);
    document.getElementsByClassName('play_bt')[0].addEventListener('click', add_btn_down);
    document.getElementsByClassName('prev_bt')[0].addEventListener('click', add_btn_down);
    document.getElementsByClassName('next_bt')[0].addEventListener('click', add_btn_down);
  }
} ,100);


ck_audio = is_fm() ? null : setInterval( function(){
  h5audio = document.getElementById('h5audio_media');
  if( h5audio ){
    clearInterval(ck_audio);
    h5audio.addEventListener('ended', add_btn_down);
  }
}, 1000);


