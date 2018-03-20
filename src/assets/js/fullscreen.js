function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

// function getTime(zone, success) {
//     var url = 'http://json-time.appspot.com/time.json?tz=' + zone,
//         ud = 'json' + (+new Date());
//     window[ud]= function(o){
//         success && success(new Date(o.datetime));
//     };
//     document.getElementsByTagName('head')[0].appendChild((function(){
//         var s = document.createElement('script');
//         s.type = 'text/javascript';
//         s.src = url + '&callback=' + ud;
//         return s;
//     })());
// }
// function getDateTime(){
//   getTime('GMT', function(time){
//       // This is where you do whatever you want with the time:
//       alert(time);
//   });
// }