(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.12",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipe=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipe")}}else{if(F&&typeof H==="object"){F.option.apply(this,arguments)}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}}return G};f.fn.swipe.version=y;f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipe.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a4,au){var au=f.extend({},au);var az=(a||d||!au.fallbackToMouseEvents),K=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ax=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ac=0,a1=0,aZ=0,H=1,ap=0,aJ=0,N=null;var aR=f(a4);var aa="start";var X=0;var aQ={};var U=0,a2=0,a5=0,ay=0,O=0;var aW=null,af=null;try{aR.bind(K,aN);aR.bind(aD,a9)}catch(aj){f.error("events not supported "+K+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(K,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(C,null);aR=null};this.option=function(bc,bb){if(typeof bc==="object"){au=f.extend(au,bc)}else{if(au[bc]!==undefined){if(bb===undefined){return au[bc]}else{au[bc]=bb}}else{if(!bc){return au}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}}}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(au.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bf=be.touches,bb=bf?bf[0]:be;aa=g;if(bf){X=bf.length}else{if(au.preventDefaultEvents!==false){bd.preventDefault()}}ag=0;aP=null;aJ=null;ac=0;a1=0;aZ=0;H=1;ap=0;N=ab();S();ai(0,bb);if(!bf||(X===au.fingers||au.fingers===i)||aX()){U=ar();if(X==2){ai(1,bf[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}if(au.swipeStatus||au.pinchStatus){bc=P(be,aa)}}else{bc=false}if(bc===false){aa=q;P(be,aa);return bc}else{if(au.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(au.hold){bc=au.hold.call(aR,be,be.target)}},this),au.longTapThreshold)}an(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(aa===h||aa===q||al()){return}var bd,bi=bh.touches,bc=bi?bi[0]:bh;var bf=aH(bc);a2=ar();if(bi){X=bi.length}if(au.hold){clearTimeout(af)}aa=k;if(X==2){if(a1==0){ai(1,bi[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}else{aH(bi[1]);aZ=at(aQ[0].end,aQ[1].end);aJ=aq(aQ[0].end,aQ[1].end)}H=a7(a1,aZ);ap=Math.abs(a1-aZ)}if((X===au.fingers||au.fingers===i)||!bi||aX()){aP=aL(bf.start,bf.end);ak(be,aP);ag=aS(bf.start,bf.end);ac=aM();aI(aP,ag);if(au.swipeStatus||au.pinchStatus){bd=P(bh,aa)}if(!au.triggerOnTouchEnd||au.triggerOnTouchLeave){var bb=true;if(au.triggerOnTouchLeave){var bg=aY(this);bb=F(bf.end,bg)}if(!au.triggerOnTouchEnd&&bb){aa=aC(k)}else{if(au.triggerOnTouchLeave&&!bb){aa=aC(h)}}if(aa==q||aa==h){P(bh,aa)}}}else{aa=q;P(bh,aa)}if(bd===false){aa=q;P(bh,aa)}}function M(bb){var bc=bb.originalEvent?bb.originalEvent:bb,bd=bc.touches;if(bd){if(bd.length&&!al()){G();return true}else{if(bd.length&&al()){return true}}}if(al()){X=ay}a2=ar();ac=aM();if(ba()||!am()){aa=q;P(bc,aa)}else{if(au.triggerOnTouchEnd||(au.triggerOnTouchEnd==false&&aa===k)){if(au.preventDefaultEvents!==false){bb.preventDefault()}aa=h;P(bc,aa)}else{if(!au.triggerOnTouchEnd&&a6()){aa=h;aF(bc,aa,B)}else{if(aa===k){aa=q;P(bc,aa)}}}}an(false);return null}function a9(){X=0;a2=0;U=0;a1=0;aZ=0;H=1;S();an(false)}function L(bb){var bc=bb.originalEvent?bb.originalEvent:bb;if(au.triggerOnTouchLeave){aa=aC(h);P(bc,aa)}}function aK(){aR.unbind(K,aN);aR.unbind(aD,a9);aR.unbind(ax,a3);aR.unbind(V,M);if(T){aR.unbind(T,L)}an(false)}function aC(bf){var be=bf;var bd=aA();var bc=am();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!au.triggerOnTouchEnd||au.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&au.triggerOnTouchLeave){be=q}}}return be}function P(bd,bb){var bc,be=bd.touches;if((J()&&W())||(Q()&&aX())){if(J()&&W()){bc=aF(bd,bb,l)}if((Q()&&aX())&&bc!==false){bc=aF(bd,bb,t)}}else{if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ao()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,B)}}}}if(bb===q){if(W()){bc=aF(bd,bb,l)}if(aX()){bc=aF(bd,bb,t)}a9(bd)}if(bb===h){if(be){if(!be.length){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ac||0,X,aQ]);if(au.swipeStatus){bc=au.swipeStatus.call(aR,be,bb,aP||null,ag||0,ac||0,X,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ac,X,aQ]);if(au.swipe){bc=au.swipe.call(aR,be,aP,ag,ac,X,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ac,X,aQ]);if(au.swipeLeft){bc=au.swipeLeft.call(aR,be,aP,ag,ac,X,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ac,X,aQ]);if(au.swipeRight){bc=au.swipeRight.call(aR,be,aP,ag,ac,X,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ac,X,aQ]);if(au.swipeUp){bc=au.swipeUp.call(aR,be,aP,ag,ac,X,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ac,X,aQ]);if(au.swipeDown){bc=au.swipeDown.call(aR,be,aP,ag,ac,X,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchStatus){bc=au.pinchStatus.call(aR,be,bb,aJ||null,ap||0,ac||0,X,H,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchIn){bc=au.pinchIn.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break;case A:aR.trigger("pinchOut",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchOut){bc=au.pinchOut.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break}}}if(bd==B){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Z()&&!I()){O=ar();aW=setTimeout(f.proxy(function(){O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}},this),au.doubleTapThreshold)}else{O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("doubletap",[be.target]);if(au.doubleTap){bc=au.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("longtap",[be.target]);if(au.longTap){bc=au.longTap.call(aR,be,be.target)}}}}}return bc}function am(){var bb=true;if(au.threshold!==null){bb=ag>=au.threshold}return bb}function ba(){var bb=false;if(au.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=au.cancelThreshold}return bb}function ae(){if(au.pinchThreshold!==null){return ap>=au.pinchThreshold}return true}function aA(){var bb;if(au.maxTimeThreshold){if(ac>=au.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function ak(bb,bc){if(au.preventDefaultEvents===false){return}if(au.allowPageScroll===m){bb.preventDefault()}else{var bd=au.allowPageScroll===s;switch(bc){case p:if((au.swipeLeft&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case o:if((au.swipeRight&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case e:if((au.swipeUp&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((au.swipeDown&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=Y();var bd=ae();return bc&&bb&&bd}function aX(){return !!(au.pinchStatus||au.pinchIn||au.pinchOut)}function Q(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=am();var bd=aO();var bb=Y();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function W(){return !!(au.swipe||au.swipeStatus||au.swipeLeft||au.swipeRight||au.swipeUp||au.swipeDown)}function J(){return !!(aV()&&W())}function aO(){return((X===au.fingers||au.fingers===i)||!a)}function Y(){return aQ[0].end.x!==0}function a6(){return !!(au.tap)}function Z(){return !!(au.doubleTap)}function aU(){return !!(au.longTap)}function R(){if(O==null){return false}var bb=ar();return(Z()&&((bb-O)<=au.doubleTapThreshold))}function I(){return R()}function aw(){return((X===1||!a)&&(isNaN(ag)||ag<au.threshold))}function a0(){return((ac>au.longTapThreshold)&&(ag<r))}function ah(){return !!(aw()&&a6())}function aG(){return !!(R()&&Z())}function ao(){return !!(a0()&&aU())}function G(){a5=ar();ay=event.touches.length+1}function S(){a5=0;ay=0}function al(){var bb=false;if(a5){var bc=ar()-a5;if(bc<=au.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(C+"_intouch")===true)}function an(bb){if(bb===true){aR.bind(ax,a3);aR.bind(V,M);if(T){aR.bind(T,L)}}else{aR.unbind(ax,a3,false);aR.unbind(V,M,false);if(T){aR.unbind(T,L,false)}}aR.data(C+"_intouch",bb===true)}function ai(bd,bb){var bc={start:{x:0,y:0},end:{x:0,y:0}};bc.start.x=bc.end.x=bb.pageX||bb.clientX;bc.start.y=bc.end.y=bb.pageY||bb.clientY;aQ[bd]=bc;return bc}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ad(bd);if(bc===null){bc=ai(bd,bb)}bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ad(bb){return aQ[bb]||null}function aI(bb,bc){bc=Math.max(bc,aT(bb));N[bb].distance=bc}function aT(bb){if(N[bb]){return N[bb].distance}return undefined}function ab(){var bb={};bb[p]=av(p);bb[o]=av(o);bb[e]=av(e);bb[x]=av(x);return bb}function av(bb){return{direction:bb,distance:0}}function aM(){return a2-U}function at(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function aq(){if(H<1){return A}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function ar(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function F(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));
},{}],2:[function(require,module,exports){


module.exports = function(percentCircle) {

  percentCircle.each(function() {
    var $this = $(this)

    // get the percentage, set via data attribute 
    var percentage = $this.data('percentage')
    var color = $this.css('background-color')


    // convert supplied value (percentage, 1-100) into degree (out of 360)
    var degree = calculateDegree(percentage)
    // var degree = 270


    if (degree <= 180) {

      // both colors here are effectively mask colors

      $this.css('background-image', 'linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    } else {

      // the first color here needs to be set to the same as the 

      $this.css('background-image', 'linear-gradient(' + (degree-90) + 'deg, transparent 50%, '+color+' 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (degree-90) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    }

  })

}



var calculateDegree = function(percentage) {
  var degree = percentage * 3.6
  return degree
}
},{}],3:[function(require,module,exports){
var setPercentCircle = require('../components/percent-circle')



module.exports = function() {


  setPercentCircle( $('.js_percent-circle') )


}
},{"../components/percent-circle":2}],4:[function(require,module,exports){
/* ---------------------------------------

Globals - init 
(initializaers)

*/


module.exports = function() {



  // Init selectBox

  $('select').selectBox({'mobile':true})




  // Tooltip menus
  $('[data-toggle="tooltip"]').tooltip({html: true})




}
},{}],5:[function(require,module,exports){





module.exports = function() {

  "use strict";

  $(document).on('show.bs.modal', '.modal', centerModal);


  $(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
  });

}




/*

Helper scripts for this module

Notes:
- if any of these need to be used in other modules, move them
  into a helper file (to then be imported and used here)
*/



function centerModal() {

  $(this).css('display', 'block');

  var $dialog      = $(this).find(".modal-dialog");
  var offset       = ($(window).height() - $dialog.height()) / 2;
  var bottomMargin = parseInt($dialog.css('marginBottom'), 10);

  // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
  if(offset < bottomMargin) {
    offset = bottomMargin;
  }

  $dialog.css("margin-top", offset);
  
}
},{}],6:[function(require,module,exports){
/* ---------------------------------------

Globals - Sidebar

*/


var swipe = require('jquery-touchswipe')


module.exports = function() {



  // Navbar Toggle

  // $(".nav-trigger").click(function() {
  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })





  // Swipe Toggle

  $(function() {
    $("body").swipe( {

      swipe:function(event, direction) {

        // Close on swipe left
        if ( direction === 'left' ) {

          $("body").removeClass('sb-is-open')



        // Open on swipe right
        } else if ( direction === 'right' ) {

          $("body").addClass('sb-is-open')

        }
      }
    })

  });



}
},{"jquery-touchswipe":1}],7:[function(require,module,exports){
/* ---------------------------------------

Global Scripts

*/




var globalInitializers = require('./global/global.inits')
globalInitializers()

var sidebarInit = require('./global/global.sidebar')
sidebarInit()

var globalModals = require('./global/global.modals')
globalModals()

var batteryStatuses = require('./global/global.bat-stats')
batteryStatuses()
},{"./global/global.bat-stats":3,"./global/global.inits":4,"./global/global.modals":5,"./global/global.sidebar":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvanF1ZXJ5LXRvdWNoc3dpcGUvanF1ZXJ5LnRvdWNoU3dpcGUubWluLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvcGVyY2VudC1jaXJjbGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFsL2dsb2JhbC5iYXQtc3RhdHMuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFsL2dsb2JhbC5pbml0cy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLm1vZGFscy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLnNpZGViYXIuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbihhKXtpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kJiZkZWZpbmUuYW1kLmpRdWVyeSl7ZGVmaW5lKFtcImpxdWVyeVwiXSxhKX1lbHNle2EoalF1ZXJ5KX19KGZ1bmN0aW9uKGYpe3ZhciB5PVwiMS42LjEyXCIscD1cImxlZnRcIixvPVwicmlnaHRcIixlPVwidXBcIix4PVwiZG93blwiLGM9XCJpblwiLEE9XCJvdXRcIixtPVwibm9uZVwiLHM9XCJhdXRvXCIsbD1cInN3aXBlXCIsdD1cInBpbmNoXCIsQj1cInRhcFwiLGo9XCJkb3VibGV0YXBcIixiPVwibG9uZ3RhcFwiLHo9XCJob2xkXCIsRT1cImhvcml6b250YWxcIix1PVwidmVydGljYWxcIixpPVwiYWxsXCIscj0xMCxnPVwic3RhcnRcIixrPVwibW92ZVwiLGg9XCJlbmRcIixxPVwiY2FuY2VsXCIsYT1cIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdyx2PXdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCYmIXdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQsZD13aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkfHx3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQsQz1cIlRvdWNoU3dpcGVcIjt2YXIgbj17ZmluZ2VyczoxLHRocmVzaG9sZDo3NSxjYW5jZWxUaHJlc2hvbGQ6bnVsbCxwaW5jaFRocmVzaG9sZDoyMCxtYXhUaW1lVGhyZXNob2xkOm51bGwsZmluZ2VyUmVsZWFzZVRocmVzaG9sZDoyNTAsbG9uZ1RhcFRocmVzaG9sZDo1MDAsZG91YmxlVGFwVGhyZXNob2xkOjIwMCxzd2lwZTpudWxsLHN3aXBlTGVmdDpudWxsLHN3aXBlUmlnaHQ6bnVsbCxzd2lwZVVwOm51bGwsc3dpcGVEb3duOm51bGwsc3dpcGVTdGF0dXM6bnVsbCxwaW5jaEluOm51bGwscGluY2hPdXQ6bnVsbCxwaW5jaFN0YXR1czpudWxsLGNsaWNrOm51bGwsdGFwOm51bGwsZG91YmxlVGFwOm51bGwsbG9uZ1RhcDpudWxsLGhvbGQ6bnVsbCx0cmlnZ2VyT25Ub3VjaEVuZDp0cnVlLHRyaWdnZXJPblRvdWNoTGVhdmU6ZmFsc2UsYWxsb3dQYWdlU2Nyb2xsOlwiYXV0b1wiLGZhbGxiYWNrVG9Nb3VzZUV2ZW50czp0cnVlLGV4Y2x1ZGVkRWxlbWVudHM6XCJsYWJlbCwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYSwgLm5vU3dpcGVcIixwcmV2ZW50RGVmYXVsdEV2ZW50czp0cnVlfTtmLmZuLnN3aXBlPWZ1bmN0aW9uKEgpe3ZhciBHPWYodGhpcyksRj1HLmRhdGEoQyk7aWYoRiYmdHlwZW9mIEg9PT1cInN0cmluZ1wiKXtpZihGW0hdKXtyZXR1cm4gRltIXS5hcHBseSh0aGlzLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSl9ZWxzZXtmLmVycm9yKFwiTWV0aG9kIFwiK0grXCIgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnN3aXBlXCIpfX1lbHNle2lmKEYmJnR5cGVvZiBIPT09XCJvYmplY3RcIil7Ri5vcHRpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpfWVsc2V7aWYoIUYmJih0eXBlb2YgSD09PVwib2JqZWN0XCJ8fCFIKSl7cmV0dXJuIHcuYXBwbHkodGhpcyxhcmd1bWVudHMpfX19cmV0dXJuIEd9O2YuZm4uc3dpcGUudmVyc2lvbj15O2YuZm4uc3dpcGUuZGVmYXVsdHM9bjtmLmZuLnN3aXBlLnBoYXNlcz17UEhBU0VfU1RBUlQ6ZyxQSEFTRV9NT1ZFOmssUEhBU0VfRU5EOmgsUEhBU0VfQ0FOQ0VMOnF9O2YuZm4uc3dpcGUuZGlyZWN0aW9ucz17TEVGVDpwLFJJR0hUOm8sVVA6ZSxET1dOOngsSU46YyxPVVQ6QX07Zi5mbi5zd2lwZS5wYWdlU2Nyb2xsPXtOT05FOm0sSE9SSVpPTlRBTDpFLFZFUlRJQ0FMOnUsQVVUTzpzfTtmLmZuLnN3aXBlLmZpbmdlcnM9e09ORToxLFRXTzoyLFRIUkVFOjMsRk9VUjo0LEZJVkU6NSxBTEw6aX07ZnVuY3Rpb24gdyhGKXtpZihGJiYoRi5hbGxvd1BhZ2VTY3JvbGw9PT11bmRlZmluZWQmJihGLnN3aXBlIT09dW5kZWZpbmVkfHxGLnN3aXBlU3RhdHVzIT09dW5kZWZpbmVkKSkpe0YuYWxsb3dQYWdlU2Nyb2xsPW19aWYoRi5jbGljayE9PXVuZGVmaW5lZCYmRi50YXA9PT11bmRlZmluZWQpe0YudGFwPUYuY2xpY2t9aWYoIUYpe0Y9e319Rj1mLmV4dGVuZCh7fSxmLmZuLnN3aXBlLmRlZmF1bHRzLEYpO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgSD1mKHRoaXMpO3ZhciBHPUguZGF0YShDKTtpZighRyl7Rz1uZXcgRCh0aGlzLEYpO0guZGF0YShDLEcpfX0pfWZ1bmN0aW9uIEQoYTQsYXUpe3ZhciBhdT1mLmV4dGVuZCh7fSxhdSk7dmFyIGF6PShhfHxkfHwhYXUuZmFsbGJhY2tUb01vdXNlRXZlbnRzKSxLPWF6PyhkPyh2P1wiTVNQb2ludGVyRG93blwiOlwicG9pbnRlcmRvd25cIik6XCJ0b3VjaHN0YXJ0XCIpOlwibW91c2Vkb3duXCIsYXg9YXo/KGQ/KHY/XCJNU1BvaW50ZXJNb3ZlXCI6XCJwb2ludGVybW92ZVwiKTpcInRvdWNobW92ZVwiKTpcIm1vdXNlbW92ZVwiLFY9YXo/KGQ/KHY/XCJNU1BvaW50ZXJVcFwiOlwicG9pbnRlcnVwXCIpOlwidG91Y2hlbmRcIik6XCJtb3VzZXVwXCIsVD1hej9udWxsOlwibW91c2VsZWF2ZVwiLGFEPShkPyh2P1wiTVNQb2ludGVyQ2FuY2VsXCI6XCJwb2ludGVyY2FuY2VsXCIpOlwidG91Y2hjYW5jZWxcIik7dmFyIGFnPTAsYVA9bnVsbCxhYz0wLGExPTAsYVo9MCxIPTEsYXA9MCxhSj0wLE49bnVsbDt2YXIgYVI9ZihhNCk7dmFyIGFhPVwic3RhcnRcIjt2YXIgWD0wO3ZhciBhUT17fTt2YXIgVT0wLGEyPTAsYTU9MCxheT0wLE89MDt2YXIgYVc9bnVsbCxhZj1udWxsO3RyeXthUi5iaW5kKEssYU4pO2FSLmJpbmQoYUQsYTkpfWNhdGNoKGFqKXtmLmVycm9yKFwiZXZlbnRzIG5vdCBzdXBwb3J0ZWQgXCIrSytcIixcIithRCtcIiBvbiBqUXVlcnkuc3dpcGVcIil9dGhpcy5lbmFibGU9ZnVuY3Rpb24oKXthUi5iaW5kKEssYU4pO2FSLmJpbmQoYUQsYTkpO3JldHVybiBhUn07dGhpcy5kaXNhYmxlPWZ1bmN0aW9uKCl7YUsoKTtyZXR1cm4gYVJ9O3RoaXMuZGVzdHJveT1mdW5jdGlvbigpe2FLKCk7YVIuZGF0YShDLG51bGwpO2FSPW51bGx9O3RoaXMub3B0aW9uPWZ1bmN0aW9uKGJjLGJiKXtpZih0eXBlb2YgYmM9PT1cIm9iamVjdFwiKXthdT1mLmV4dGVuZChhdSxiYyl9ZWxzZXtpZihhdVtiY10hPT11bmRlZmluZWQpe2lmKGJiPT09dW5kZWZpbmVkKXtyZXR1cm4gYXVbYmNdfWVsc2V7YXVbYmNdPWJifX1lbHNle2lmKCFiYyl7cmV0dXJuIGF1fWVsc2V7Zi5lcnJvcihcIk9wdGlvbiBcIitiYytcIiBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc3dpcGUub3B0aW9uc1wiKX19fXJldHVybiBudWxsfTtmdW5jdGlvbiBhTihiZCl7aWYoYUIoKSl7cmV0dXJufWlmKGYoYmQudGFyZ2V0KS5jbG9zZXN0KGF1LmV4Y2x1ZGVkRWxlbWVudHMsYVIpLmxlbmd0aD4wKXtyZXR1cm59dmFyIGJlPWJkLm9yaWdpbmFsRXZlbnQ/YmQub3JpZ2luYWxFdmVudDpiZDt2YXIgYmMsYmY9YmUudG91Y2hlcyxiYj1iZj9iZlswXTpiZTthYT1nO2lmKGJmKXtYPWJmLmxlbmd0aH1lbHNle2lmKGF1LnByZXZlbnREZWZhdWx0RXZlbnRzIT09ZmFsc2Upe2JkLnByZXZlbnREZWZhdWx0KCl9fWFnPTA7YVA9bnVsbDthSj1udWxsO2FjPTA7YTE9MDthWj0wO0g9MTthcD0wO049YWIoKTtTKCk7YWkoMCxiYik7aWYoIWJmfHwoWD09PWF1LmZpbmdlcnN8fGF1LmZpbmdlcnM9PT1pKXx8YVgoKSl7VT1hcigpO2lmKFg9PTIpe2FpKDEsYmZbMV0pO2ExPWFaPWF0KGFRWzBdLnN0YXJ0LGFRWzFdLnN0YXJ0KX1pZihhdS5zd2lwZVN0YXR1c3x8YXUucGluY2hTdGF0dXMpe2JjPVAoYmUsYWEpfX1lbHNle2JjPWZhbHNlfWlmKGJjPT09ZmFsc2Upe2FhPXE7UChiZSxhYSk7cmV0dXJuIGJjfWVsc2V7aWYoYXUuaG9sZCl7YWY9c2V0VGltZW91dChmLnByb3h5KGZ1bmN0aW9uKCl7YVIudHJpZ2dlcihcImhvbGRcIixbYmUudGFyZ2V0XSk7aWYoYXUuaG9sZCl7YmM9YXUuaG9sZC5jYWxsKGFSLGJlLGJlLnRhcmdldCl9fSx0aGlzKSxhdS5sb25nVGFwVGhyZXNob2xkKX1hbih0cnVlKX1yZXR1cm4gbnVsbH1mdW5jdGlvbiBhMyhiZSl7dmFyIGJoPWJlLm9yaWdpbmFsRXZlbnQ/YmUub3JpZ2luYWxFdmVudDpiZTtpZihhYT09PWh8fGFhPT09cXx8YWwoKSl7cmV0dXJufXZhciBiZCxiaT1iaC50b3VjaGVzLGJjPWJpP2JpWzBdOmJoO3ZhciBiZj1hSChiYyk7YTI9YXIoKTtpZihiaSl7WD1iaS5sZW5ndGh9aWYoYXUuaG9sZCl7Y2xlYXJUaW1lb3V0KGFmKX1hYT1rO2lmKFg9PTIpe2lmKGExPT0wKXthaSgxLGJpWzFdKTthMT1hWj1hdChhUVswXS5zdGFydCxhUVsxXS5zdGFydCl9ZWxzZXthSChiaVsxXSk7YVo9YXQoYVFbMF0uZW5kLGFRWzFdLmVuZCk7YUo9YXEoYVFbMF0uZW5kLGFRWzFdLmVuZCl9SD1hNyhhMSxhWik7YXA9TWF0aC5hYnMoYTEtYVopfWlmKChYPT09YXUuZmluZ2Vyc3x8YXUuZmluZ2Vycz09PWkpfHwhYml8fGFYKCkpe2FQPWFMKGJmLnN0YXJ0LGJmLmVuZCk7YWsoYmUsYVApO2FnPWFTKGJmLnN0YXJ0LGJmLmVuZCk7YWM9YU0oKTthSShhUCxhZyk7aWYoYXUuc3dpcGVTdGF0dXN8fGF1LnBpbmNoU3RhdHVzKXtiZD1QKGJoLGFhKX1pZighYXUudHJpZ2dlck9uVG91Y2hFbmR8fGF1LnRyaWdnZXJPblRvdWNoTGVhdmUpe3ZhciBiYj10cnVlO2lmKGF1LnRyaWdnZXJPblRvdWNoTGVhdmUpe3ZhciBiZz1hWSh0aGlzKTtiYj1GKGJmLmVuZCxiZyl9aWYoIWF1LnRyaWdnZXJPblRvdWNoRW5kJiZiYil7YWE9YUMoayl9ZWxzZXtpZihhdS50cmlnZ2VyT25Ub3VjaExlYXZlJiYhYmIpe2FhPWFDKGgpfX1pZihhYT09cXx8YWE9PWgpe1AoYmgsYWEpfX19ZWxzZXthYT1xO1AoYmgsYWEpfWlmKGJkPT09ZmFsc2Upe2FhPXE7UChiaCxhYSl9fWZ1bmN0aW9uIE0oYmIpe3ZhciBiYz1iYi5vcmlnaW5hbEV2ZW50P2JiLm9yaWdpbmFsRXZlbnQ6YmIsYmQ9YmMudG91Y2hlcztpZihiZCl7aWYoYmQubGVuZ3RoJiYhYWwoKSl7RygpO3JldHVybiB0cnVlfWVsc2V7aWYoYmQubGVuZ3RoJiZhbCgpKXtyZXR1cm4gdHJ1ZX19fWlmKGFsKCkpe1g9YXl9YTI9YXIoKTthYz1hTSgpO2lmKGJhKCl8fCFhbSgpKXthYT1xO1AoYmMsYWEpfWVsc2V7aWYoYXUudHJpZ2dlck9uVG91Y2hFbmR8fChhdS50cmlnZ2VyT25Ub3VjaEVuZD09ZmFsc2UmJmFhPT09aykpe2lmKGF1LnByZXZlbnREZWZhdWx0RXZlbnRzIT09ZmFsc2Upe2JiLnByZXZlbnREZWZhdWx0KCl9YWE9aDtQKGJjLGFhKX1lbHNle2lmKCFhdS50cmlnZ2VyT25Ub3VjaEVuZCYmYTYoKSl7YWE9aDthRihiYyxhYSxCKX1lbHNle2lmKGFhPT09ayl7YWE9cTtQKGJjLGFhKX19fX1hbihmYWxzZSk7cmV0dXJuIG51bGx9ZnVuY3Rpb24gYTkoKXtYPTA7YTI9MDtVPTA7YTE9MDthWj0wO0g9MTtTKCk7YW4oZmFsc2UpfWZ1bmN0aW9uIEwoYmIpe3ZhciBiYz1iYi5vcmlnaW5hbEV2ZW50P2JiLm9yaWdpbmFsRXZlbnQ6YmI7aWYoYXUudHJpZ2dlck9uVG91Y2hMZWF2ZSl7YWE9YUMoaCk7UChiYyxhYSl9fWZ1bmN0aW9uIGFLKCl7YVIudW5iaW5kKEssYU4pO2FSLnVuYmluZChhRCxhOSk7YVIudW5iaW5kKGF4LGEzKTthUi51bmJpbmQoVixNKTtpZihUKXthUi51bmJpbmQoVCxMKX1hbihmYWxzZSl9ZnVuY3Rpb24gYUMoYmYpe3ZhciBiZT1iZjt2YXIgYmQ9YUEoKTt2YXIgYmM9YW0oKTt2YXIgYmI9YmEoKTtpZighYmR8fGJiKXtiZT1xfWVsc2V7aWYoYmMmJmJmPT1rJiYoIWF1LnRyaWdnZXJPblRvdWNoRW5kfHxhdS50cmlnZ2VyT25Ub3VjaExlYXZlKSl7YmU9aH1lbHNle2lmKCFiYyYmYmY9PWgmJmF1LnRyaWdnZXJPblRvdWNoTGVhdmUpe2JlPXF9fX1yZXR1cm4gYmV9ZnVuY3Rpb24gUChiZCxiYil7dmFyIGJjLGJlPWJkLnRvdWNoZXM7aWYoKEooKSYmVygpKXx8KFEoKSYmYVgoKSkpe2lmKEooKSYmVygpKXtiYz1hRihiZCxiYixsKX1pZigoUSgpJiZhWCgpKSYmYmMhPT1mYWxzZSl7YmM9YUYoYmQsYmIsdCl9fWVsc2V7aWYoYUcoKSYmYmMhPT1mYWxzZSl7YmM9YUYoYmQsYmIsail9ZWxzZXtpZihhbygpJiZiYyE9PWZhbHNlKXtiYz1hRihiZCxiYixiKX1lbHNle2lmKGFoKCkmJmJjIT09ZmFsc2Upe2JjPWFGKGJkLGJiLEIpfX19fWlmKGJiPT09cSl7aWYoVygpKXtiYz1hRihiZCxiYixsKX1pZihhWCgpKXtiYz1hRihiZCxiYix0KX1hOShiZCl9aWYoYmI9PT1oKXtpZihiZSl7aWYoIWJlLmxlbmd0aCl7YTkoYmQpfX1lbHNle2E5KGJkKX19cmV0dXJuIGJjfWZ1bmN0aW9uIGFGKGJlLGJiLGJkKXt2YXIgYmM7aWYoYmQ9PWwpe2FSLnRyaWdnZXIoXCJzd2lwZVN0YXR1c1wiLFtiYixhUHx8bnVsbCxhZ3x8MCxhY3x8MCxYLGFRXSk7aWYoYXUuc3dpcGVTdGF0dXMpe2JjPWF1LnN3aXBlU3RhdHVzLmNhbGwoYVIsYmUsYmIsYVB8fG51bGwsYWd8fDAsYWN8fDAsWCxhUSk7aWYoYmM9PT1mYWxzZSl7cmV0dXJuIGZhbHNlfX1pZihiYj09aCYmYVYoKSl7YVIudHJpZ2dlcihcInN3aXBlXCIsW2FQLGFnLGFjLFgsYVFdKTtpZihhdS5zd2lwZSl7YmM9YXUuc3dpcGUuY2FsbChhUixiZSxhUCxhZyxhYyxYLGFRKTtpZihiYz09PWZhbHNlKXtyZXR1cm4gZmFsc2V9fXN3aXRjaChhUCl7Y2FzZSBwOmFSLnRyaWdnZXIoXCJzd2lwZUxlZnRcIixbYVAsYWcsYWMsWCxhUV0pO2lmKGF1LnN3aXBlTGVmdCl7YmM9YXUuc3dpcGVMZWZ0LmNhbGwoYVIsYmUsYVAsYWcsYWMsWCxhUSl9YnJlYWs7Y2FzZSBvOmFSLnRyaWdnZXIoXCJzd2lwZVJpZ2h0XCIsW2FQLGFnLGFjLFgsYVFdKTtpZihhdS5zd2lwZVJpZ2h0KXtiYz1hdS5zd2lwZVJpZ2h0LmNhbGwoYVIsYmUsYVAsYWcsYWMsWCxhUSl9YnJlYWs7Y2FzZSBlOmFSLnRyaWdnZXIoXCJzd2lwZVVwXCIsW2FQLGFnLGFjLFgsYVFdKTtpZihhdS5zd2lwZVVwKXtiYz1hdS5zd2lwZVVwLmNhbGwoYVIsYmUsYVAsYWcsYWMsWCxhUSl9YnJlYWs7Y2FzZSB4OmFSLnRyaWdnZXIoXCJzd2lwZURvd25cIixbYVAsYWcsYWMsWCxhUV0pO2lmKGF1LnN3aXBlRG93bil7YmM9YXUuc3dpcGVEb3duLmNhbGwoYVIsYmUsYVAsYWcsYWMsWCxhUSl9YnJlYWt9fX1pZihiZD09dCl7YVIudHJpZ2dlcihcInBpbmNoU3RhdHVzXCIsW2JiLGFKfHxudWxsLGFwfHwwLGFjfHwwLFgsSCxhUV0pO2lmKGF1LnBpbmNoU3RhdHVzKXtiYz1hdS5waW5jaFN0YXR1cy5jYWxsKGFSLGJlLGJiLGFKfHxudWxsLGFwfHwwLGFjfHwwLFgsSCxhUSk7aWYoYmM9PT1mYWxzZSl7cmV0dXJuIGZhbHNlfX1pZihiYj09aCYmYTgoKSl7c3dpdGNoKGFKKXtjYXNlIGM6YVIudHJpZ2dlcihcInBpbmNoSW5cIixbYUp8fG51bGwsYXB8fDAsYWN8fDAsWCxILGFRXSk7aWYoYXUucGluY2hJbil7YmM9YXUucGluY2hJbi5jYWxsKGFSLGJlLGFKfHxudWxsLGFwfHwwLGFjfHwwLFgsSCxhUSl9YnJlYWs7Y2FzZSBBOmFSLnRyaWdnZXIoXCJwaW5jaE91dFwiLFthSnx8bnVsbCxhcHx8MCxhY3x8MCxYLEgsYVFdKTtpZihhdS5waW5jaE91dCl7YmM9YXUucGluY2hPdXQuY2FsbChhUixiZSxhSnx8bnVsbCxhcHx8MCxhY3x8MCxYLEgsYVEpfWJyZWFrfX19aWYoYmQ9PUIpe2lmKGJiPT09cXx8YmI9PT1oKXtjbGVhclRpbWVvdXQoYVcpO2NsZWFyVGltZW91dChhZik7aWYoWigpJiYhSSgpKXtPPWFyKCk7YVc9c2V0VGltZW91dChmLnByb3h5KGZ1bmN0aW9uKCl7Tz1udWxsO2FSLnRyaWdnZXIoXCJ0YXBcIixbYmUudGFyZ2V0XSk7aWYoYXUudGFwKXtiYz1hdS50YXAuY2FsbChhUixiZSxiZS50YXJnZXQpfX0sdGhpcyksYXUuZG91YmxlVGFwVGhyZXNob2xkKX1lbHNle089bnVsbDthUi50cmlnZ2VyKFwidGFwXCIsW2JlLnRhcmdldF0pO2lmKGF1LnRhcCl7YmM9YXUudGFwLmNhbGwoYVIsYmUsYmUudGFyZ2V0KX19fX1lbHNle2lmKGJkPT1qKXtpZihiYj09PXF8fGJiPT09aCl7Y2xlYXJUaW1lb3V0KGFXKTtPPW51bGw7YVIudHJpZ2dlcihcImRvdWJsZXRhcFwiLFtiZS50YXJnZXRdKTtpZihhdS5kb3VibGVUYXApe2JjPWF1LmRvdWJsZVRhcC5jYWxsKGFSLGJlLGJlLnRhcmdldCl9fX1lbHNle2lmKGJkPT1iKXtpZihiYj09PXF8fGJiPT09aCl7Y2xlYXJUaW1lb3V0KGFXKTtPPW51bGw7YVIudHJpZ2dlcihcImxvbmd0YXBcIixbYmUudGFyZ2V0XSk7aWYoYXUubG9uZ1RhcCl7YmM9YXUubG9uZ1RhcC5jYWxsKGFSLGJlLGJlLnRhcmdldCl9fX19fXJldHVybiBiY31mdW5jdGlvbiBhbSgpe3ZhciBiYj10cnVlO2lmKGF1LnRocmVzaG9sZCE9PW51bGwpe2JiPWFnPj1hdS50aHJlc2hvbGR9cmV0dXJuIGJifWZ1bmN0aW9uIGJhKCl7dmFyIGJiPWZhbHNlO2lmKGF1LmNhbmNlbFRocmVzaG9sZCE9PW51bGwmJmFQIT09bnVsbCl7YmI9KGFUKGFQKS1hZyk+PWF1LmNhbmNlbFRocmVzaG9sZH1yZXR1cm4gYmJ9ZnVuY3Rpb24gYWUoKXtpZihhdS5waW5jaFRocmVzaG9sZCE9PW51bGwpe3JldHVybiBhcD49YXUucGluY2hUaHJlc2hvbGR9cmV0dXJuIHRydWV9ZnVuY3Rpb24gYUEoKXt2YXIgYmI7aWYoYXUubWF4VGltZVRocmVzaG9sZCl7aWYoYWM+PWF1Lm1heFRpbWVUaHJlc2hvbGQpe2JiPWZhbHNlfWVsc2V7YmI9dHJ1ZX19ZWxzZXtiYj10cnVlfXJldHVybiBiYn1mdW5jdGlvbiBhayhiYixiYyl7aWYoYXUucHJldmVudERlZmF1bHRFdmVudHM9PT1mYWxzZSl7cmV0dXJufWlmKGF1LmFsbG93UGFnZVNjcm9sbD09PW0pe2JiLnByZXZlbnREZWZhdWx0KCl9ZWxzZXt2YXIgYmQ9YXUuYWxsb3dQYWdlU2Nyb2xsPT09cztzd2l0Y2goYmMpe2Nhc2UgcDppZigoYXUuc3dpcGVMZWZ0JiZiZCl8fCghYmQmJmF1LmFsbG93UGFnZVNjcm9sbCE9RSkpe2JiLnByZXZlbnREZWZhdWx0KCl9YnJlYWs7Y2FzZSBvOmlmKChhdS5zd2lwZVJpZ2h0JiZiZCl8fCghYmQmJmF1LmFsbG93UGFnZVNjcm9sbCE9RSkpe2JiLnByZXZlbnREZWZhdWx0KCl9YnJlYWs7Y2FzZSBlOmlmKChhdS5zd2lwZVVwJiZiZCl8fCghYmQmJmF1LmFsbG93UGFnZVNjcm9sbCE9dSkpe2JiLnByZXZlbnREZWZhdWx0KCl9YnJlYWs7Y2FzZSB4OmlmKChhdS5zd2lwZURvd24mJmJkKXx8KCFiZCYmYXUuYWxsb3dQYWdlU2Nyb2xsIT11KSl7YmIucHJldmVudERlZmF1bHQoKX1icmVha319fWZ1bmN0aW9uIGE4KCl7dmFyIGJjPWFPKCk7dmFyIGJiPVkoKTt2YXIgYmQ9YWUoKTtyZXR1cm4gYmMmJmJiJiZiZH1mdW5jdGlvbiBhWCgpe3JldHVybiAhIShhdS5waW5jaFN0YXR1c3x8YXUucGluY2hJbnx8YXUucGluY2hPdXQpfWZ1bmN0aW9uIFEoKXtyZXR1cm4gISEoYTgoKSYmYVgoKSl9ZnVuY3Rpb24gYVYoKXt2YXIgYmU9YUEoKTt2YXIgYmc9YW0oKTt2YXIgYmQ9YU8oKTt2YXIgYmI9WSgpO3ZhciBiYz1iYSgpO3ZhciBiZj0hYmMmJmJiJiZiZCYmYmcmJmJlO3JldHVybiBiZn1mdW5jdGlvbiBXKCl7cmV0dXJuICEhKGF1LnN3aXBlfHxhdS5zd2lwZVN0YXR1c3x8YXUuc3dpcGVMZWZ0fHxhdS5zd2lwZVJpZ2h0fHxhdS5zd2lwZVVwfHxhdS5zd2lwZURvd24pfWZ1bmN0aW9uIEooKXtyZXR1cm4gISEoYVYoKSYmVygpKX1mdW5jdGlvbiBhTygpe3JldHVybigoWD09PWF1LmZpbmdlcnN8fGF1LmZpbmdlcnM9PT1pKXx8IWEpfWZ1bmN0aW9uIFkoKXtyZXR1cm4gYVFbMF0uZW5kLnghPT0wfWZ1bmN0aW9uIGE2KCl7cmV0dXJuICEhKGF1LnRhcCl9ZnVuY3Rpb24gWigpe3JldHVybiAhIShhdS5kb3VibGVUYXApfWZ1bmN0aW9uIGFVKCl7cmV0dXJuICEhKGF1LmxvbmdUYXApfWZ1bmN0aW9uIFIoKXtpZihPPT1udWxsKXtyZXR1cm4gZmFsc2V9dmFyIGJiPWFyKCk7cmV0dXJuKFooKSYmKChiYi1PKTw9YXUuZG91YmxlVGFwVGhyZXNob2xkKSl9ZnVuY3Rpb24gSSgpe3JldHVybiBSKCl9ZnVuY3Rpb24gYXcoKXtyZXR1cm4oKFg9PT0xfHwhYSkmJihpc05hTihhZyl8fGFnPGF1LnRocmVzaG9sZCkpfWZ1bmN0aW9uIGEwKCl7cmV0dXJuKChhYz5hdS5sb25nVGFwVGhyZXNob2xkKSYmKGFnPHIpKX1mdW5jdGlvbiBhaCgpe3JldHVybiAhIShhdygpJiZhNigpKX1mdW5jdGlvbiBhRygpe3JldHVybiAhIShSKCkmJlooKSl9ZnVuY3Rpb24gYW8oKXtyZXR1cm4gISEoYTAoKSYmYVUoKSl9ZnVuY3Rpb24gRygpe2E1PWFyKCk7YXk9ZXZlbnQudG91Y2hlcy5sZW5ndGgrMX1mdW5jdGlvbiBTKCl7YTU9MDtheT0wfWZ1bmN0aW9uIGFsKCl7dmFyIGJiPWZhbHNlO2lmKGE1KXt2YXIgYmM9YXIoKS1hNTtpZihiYzw9YXUuZmluZ2VyUmVsZWFzZVRocmVzaG9sZCl7YmI9dHJ1ZX19cmV0dXJuIGJifWZ1bmN0aW9uIGFCKCl7cmV0dXJuICEhKGFSLmRhdGEoQytcIl9pbnRvdWNoXCIpPT09dHJ1ZSl9ZnVuY3Rpb24gYW4oYmIpe2lmKGJiPT09dHJ1ZSl7YVIuYmluZChheCxhMyk7YVIuYmluZChWLE0pO2lmKFQpe2FSLmJpbmQoVCxMKX19ZWxzZXthUi51bmJpbmQoYXgsYTMsZmFsc2UpO2FSLnVuYmluZChWLE0sZmFsc2UpO2lmKFQpe2FSLnVuYmluZChULEwsZmFsc2UpfX1hUi5kYXRhKEMrXCJfaW50b3VjaFwiLGJiPT09dHJ1ZSl9ZnVuY3Rpb24gYWkoYmQsYmIpe3ZhciBiYz17c3RhcnQ6e3g6MCx5OjB9LGVuZDp7eDowLHk6MH19O2JjLnN0YXJ0Lng9YmMuZW5kLng9YmIucGFnZVh8fGJiLmNsaWVudFg7YmMuc3RhcnQueT1iYy5lbmQueT1iYi5wYWdlWXx8YmIuY2xpZW50WTthUVtiZF09YmM7cmV0dXJuIGJjfWZ1bmN0aW9uIGFIKGJiKXt2YXIgYmQ9YmIuaWRlbnRpZmllciE9PXVuZGVmaW5lZD9iYi5pZGVudGlmaWVyOjA7dmFyIGJjPWFkKGJkKTtpZihiYz09PW51bGwpe2JjPWFpKGJkLGJiKX1iYy5lbmQueD1iYi5wYWdlWHx8YmIuY2xpZW50WDtiYy5lbmQueT1iYi5wYWdlWXx8YmIuY2xpZW50WTtyZXR1cm4gYmN9ZnVuY3Rpb24gYWQoYmIpe3JldHVybiBhUVtiYl18fG51bGx9ZnVuY3Rpb24gYUkoYmIsYmMpe2JjPU1hdGgubWF4KGJjLGFUKGJiKSk7TltiYl0uZGlzdGFuY2U9YmN9ZnVuY3Rpb24gYVQoYmIpe2lmKE5bYmJdKXtyZXR1cm4gTltiYl0uZGlzdGFuY2V9cmV0dXJuIHVuZGVmaW5lZH1mdW5jdGlvbiBhYigpe3ZhciBiYj17fTtiYltwXT1hdihwKTtiYltvXT1hdihvKTtiYltlXT1hdihlKTtiYlt4XT1hdih4KTtyZXR1cm4gYmJ9ZnVuY3Rpb24gYXYoYmIpe3JldHVybntkaXJlY3Rpb246YmIsZGlzdGFuY2U6MH19ZnVuY3Rpb24gYU0oKXtyZXR1cm4gYTItVX1mdW5jdGlvbiBhdChiZSxiZCl7dmFyIGJjPU1hdGguYWJzKGJlLngtYmQueCk7dmFyIGJiPU1hdGguYWJzKGJlLnktYmQueSk7cmV0dXJuIE1hdGgucm91bmQoTWF0aC5zcXJ0KGJjKmJjK2JiKmJiKSl9ZnVuY3Rpb24gYTcoYmIsYmMpe3ZhciBiZD0oYmMvYmIpKjE7cmV0dXJuIGJkLnRvRml4ZWQoMil9ZnVuY3Rpb24gYXEoKXtpZihIPDEpe3JldHVybiBBfWVsc2V7cmV0dXJuIGN9fWZ1bmN0aW9uIGFTKGJjLGJiKXtyZXR1cm4gTWF0aC5yb3VuZChNYXRoLnNxcnQoTWF0aC5wb3coYmIueC1iYy54LDIpK01hdGgucG93KGJiLnktYmMueSwyKSkpfWZ1bmN0aW9uIGFFKGJlLGJjKXt2YXIgYmI9YmUueC1iYy54O3ZhciBiZz1iYy55LWJlLnk7dmFyIGJkPU1hdGguYXRhbjIoYmcsYmIpO3ZhciBiZj1NYXRoLnJvdW5kKGJkKjE4MC9NYXRoLlBJKTtpZihiZjwwKXtiZj0zNjAtTWF0aC5hYnMoYmYpfXJldHVybiBiZn1mdW5jdGlvbiBhTChiYyxiYil7dmFyIGJkPWFFKGJjLGJiKTtpZigoYmQ8PTQ1KSYmKGJkPj0wKSl7cmV0dXJuIHB9ZWxzZXtpZigoYmQ8PTM2MCkmJihiZD49MzE1KSl7cmV0dXJuIHB9ZWxzZXtpZigoYmQ+PTEzNSkmJihiZDw9MjI1KSl7cmV0dXJuIG99ZWxzZXtpZigoYmQ+NDUpJiYoYmQ8MTM1KSl7cmV0dXJuIHh9ZWxzZXtyZXR1cm4gZX19fX19ZnVuY3Rpb24gYXIoKXt2YXIgYmI9bmV3IERhdGUoKTtyZXR1cm4gYmIuZ2V0VGltZSgpfWZ1bmN0aW9uIGFZKGJiKXtiYj1mKGJiKTt2YXIgYmQ9YmIub2Zmc2V0KCk7dmFyIGJjPXtsZWZ0OmJkLmxlZnQscmlnaHQ6YmQubGVmdCtiYi5vdXRlcldpZHRoKCksdG9wOmJkLnRvcCxib3R0b206YmQudG9wK2JiLm91dGVySGVpZ2h0KCl9O3JldHVybiBiY31mdW5jdGlvbiBGKGJiLGJjKXtyZXR1cm4oYmIueD5iYy5sZWZ0JiZiYi54PGJjLnJpZ2h0JiZiYi55PmJjLnRvcCYmYmIueTxiYy5ib3R0b20pfX19KSk7IiwiXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocGVyY2VudENpcmNsZSkge1xuXG4gIHBlcmNlbnRDaXJjbGUuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICAvLyBnZXQgdGhlIHBlcmNlbnRhZ2UsIHNldCB2aWEgZGF0YSBhdHRyaWJ1dGUgXG4gICAgdmFyIHBlcmNlbnRhZ2UgPSAkdGhpcy5kYXRhKCdwZXJjZW50YWdlJylcbiAgICB2YXIgY29sb3IgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtY29sb3InKVxuXG5cbiAgICAvLyBjb252ZXJ0IHN1cHBsaWVkIHZhbHVlIChwZXJjZW50YWdlLCAxLTEwMCkgaW50byBkZWdyZWUgKG91dCBvZiAzNjApXG4gICAgdmFyIGRlZ3JlZSA9IGNhbGN1bGF0ZURlZ3JlZShwZXJjZW50YWdlKVxuICAgIC8vIHZhciBkZWdyZWUgPSAyNzBcblxuXG4gICAgaWYgKGRlZ3JlZSA8PSAxODApIHtcblxuICAgICAgLy8gYm90aCBjb2xvcnMgaGVyZSBhcmUgZWZmZWN0aXZlbHkgbWFzayBjb2xvcnNcblxuICAgICAgJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ2xpbmVhci1ncmFkaWVudCgnICsgKDkwK2RlZ3JlZSkgKyAnZGVnLCB0cmFuc3BhcmVudCA1MCUsICNERURFREUgNTAlKSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG4gICAgICAvLyAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoJyArICg5MCtkZWdyZWUpICsgJ2RlZywgdHJhbnNwYXJlbnQgNTAlLCAjREVERURFIDUwJSksIC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyB0aGUgZmlyc3QgY29sb3IgaGVyZSBuZWVkcyB0byBiZSBzZXQgdG8gdGhlIHNhbWUgYXMgdGhlIFxuXG4gICAgICAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnbGluZWFyLWdyYWRpZW50KCcgKyAoZGVncmVlLTkwKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgJytjb2xvcisnIDUwJSksIGxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuICAgICAgLy8gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJy13ZWJraXQtbGluZWFyLWdyYWRpZW50KCcgKyAoZGVncmVlLTkwKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgI0RFREVERSA1MCUpLCAtd2Via2l0LWxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuXG4gICAgfVxuXG4gIH0pXG5cbn1cblxuXG5cbnZhciBjYWxjdWxhdGVEZWdyZWUgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gIHZhciBkZWdyZWUgPSBwZXJjZW50YWdlICogMy42XG4gIHJldHVybiBkZWdyZWVcbn0iLCJ2YXIgc2V0UGVyY2VudENpcmNsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGVyY2VudC1jaXJjbGUnKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG4gIHNldFBlcmNlbnRDaXJjbGUoICQoJy5qc19wZXJjZW50LWNpcmNsZScpIClcblxuXG59IiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkdsb2JhbHMgLSBpbml0IFxuKGluaXRpYWxpemFlcnMpXG5cbiovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG5cbiAgLy8gSW5pdCBzZWxlY3RCb3hcblxuICAkKCdzZWxlY3QnKS5zZWxlY3RCb3goeydtb2JpbGUnOnRydWV9KVxuXG5cblxuXG4gIC8vIFRvb2x0aXAgbWVudXNcbiAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe2h0bWw6IHRydWV9KVxuXG5cblxuXG59IiwiXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgY2VudGVyTW9kYWwpO1xuXG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcubW9kYWw6dmlzaWJsZScpLmVhY2goY2VudGVyTW9kYWwpO1xuICB9KTtcblxufVxuXG5cblxuXG4vKlxuXG5IZWxwZXIgc2NyaXB0cyBmb3IgdGhpcyBtb2R1bGVcblxuTm90ZXM6XG4tIGlmIGFueSBvZiB0aGVzZSBuZWVkIHRvIGJlIHVzZWQgaW4gb3RoZXIgbW9kdWxlcywgbW92ZSB0aGVtXG4gIGludG8gYSBoZWxwZXIgZmlsZSAodG8gdGhlbiBiZSBpbXBvcnRlZCBhbmQgdXNlZCBoZXJlKVxuKi9cblxuXG5cbmZ1bmN0aW9uIGNlbnRlck1vZGFsKCkge1xuXG4gICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgdmFyICRkaWFsb2cgICAgICA9ICQodGhpcykuZmluZChcIi5tb2RhbC1kaWFsb2dcIik7XG4gIHZhciBvZmZzZXQgICAgICAgPSAoJCh3aW5kb3cpLmhlaWdodCgpIC0gJGRpYWxvZy5oZWlnaHQoKSkgLyAyO1xuICB2YXIgYm90dG9tTWFyZ2luID0gcGFyc2VJbnQoJGRpYWxvZy5jc3MoJ21hcmdpbkJvdHRvbScpLCAxMCk7XG5cbiAgLy8gTWFrZSBzdXJlIHlvdSBkb24ndCBoaWRlIHRoZSB0b3AgcGFydCBvZiB0aGUgbW9kYWwgdy8gYSBuZWdhdGl2ZSBtYXJnaW4gaWYgaXQncyBsb25nZXIgdGhhbiB0aGUgc2NyZWVuIGhlaWdodCwgYW5kIGtlZXAgdGhlIG1hcmdpbiBlcXVhbCB0byB0aGUgYm90dG9tIG1hcmdpbiBvZiB0aGUgbW9kYWxcbiAgaWYob2Zmc2V0IDwgYm90dG9tTWFyZ2luKSB7XG4gICAgb2Zmc2V0ID0gYm90dG9tTWFyZ2luO1xuICB9XG5cbiAgJGRpYWxvZy5jc3MoXCJtYXJnaW4tdG9wXCIsIG9mZnNldCk7XG4gIFxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWxzIC0gU2lkZWJhclxuXG4qL1xuXG5cbnZhciBzd2lwZSA9IHJlcXVpcmUoJ2pxdWVyeS10b3VjaHN3aXBlJylcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cblxuICAvLyBOYXZiYXIgVG9nZ2xlXG5cbiAgLy8gJChcIi5uYXYtdHJpZ2dlclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIiNuYXZUcmlnZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2ItaXMtb3BlblwiKVxuICAgICQuZ2V0KCcvdXNlcnMvdG9nZ2xlU2lkZWJhcicpXG4gIH0pXG5cblxuXG5cblxuICAvLyBTd2lwZSBUb2dnbGVcblxuICAkKGZ1bmN0aW9uKCkge1xuICAgICQoXCJib2R5XCIpLnN3aXBlKCB7XG5cbiAgICAgIHN3aXBlOmZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24pIHtcblxuICAgICAgICAvLyBDbG9zZSBvbiBzd2lwZSBsZWZ0XG4gICAgICAgIGlmICggZGlyZWN0aW9uID09PSAnbGVmdCcgKSB7XG5cbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcygnc2ItaXMtb3BlbicpXG5cblxuXG4gICAgICAgIC8vIE9wZW4gb24gc3dpcGUgcmlnaHRcbiAgICAgICAgfSBlbHNlIGlmICggZGlyZWN0aW9uID09PSAncmlnaHQnICkge1xuXG4gICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoJ3NiLWlzLW9wZW4nKVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIH0pO1xuXG5cblxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWwgU2NyaXB0c1xuXG4qL1xuXG5cblxuXG52YXIgZ2xvYmFsSW5pdGlhbGl6ZXJzID0gcmVxdWlyZSgnLi9nbG9iYWwvZ2xvYmFsLmluaXRzJylcbmdsb2JhbEluaXRpYWxpemVycygpXG5cbnZhciBzaWRlYmFySW5pdCA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5zaWRlYmFyJylcbnNpZGViYXJJbml0KClcblxudmFyIGdsb2JhbE1vZGFscyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5tb2RhbHMnKVxuZ2xvYmFsTW9kYWxzKClcblxudmFyIGJhdHRlcnlTdGF0dXNlcyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5iYXQtc3RhdHMnKVxuYmF0dGVyeVN0YXR1c2VzKCkiXX0=
