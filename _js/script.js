/*
 * jQuery FlexSlider v1.8
 * http://flex.madebymufffin.com
 * Copyright 2011, Tyler Smith
 */
(function(a){a.flexslider=function(c,b){var d=c;d.init=function(){d.vars=a.extend({},a.flexslider.defaults,b);d.data("flexslider",true);d.container=a(".slides",d);d.slides=a(".slides > li",d);d.count=d.slides.length;d.animating=false;d.currentSlide=d.vars.slideToStart;d.animatingTo=d.currentSlide;d.atEnd=(d.currentSlide==0)?true:false;d.eventType=("ontouchstart" in document.documentElement)?"touchstart":"click";d.cloneCount=0;d.cloneOffset=0;d.manualPause=false;d.vertical=(d.vars.slideDirection=="vertical");d.prop=(d.vertical)?"top":"marginLeft";d.args={};d.transitions="webkitTransition" in document.body.style;if(d.transitions){d.prop="-webkit-transform"}if(d.vars.controlsContainer!=""){d.controlsContainer=a(d.vars.controlsContainer).eq(a(".slides").index(d.container));d.containerExists=d.controlsContainer.length>0}if(d.vars.manualControls!=""){d.manualControls=a(d.vars.manualControls,((d.containerExists)?d.controlsContainer:d));d.manualExists=d.manualControls.length>0}if(d.vars.randomize){d.slides.sort(function(){return(Math.round(Math.random())-0.5)});d.container.empty().append(d.slides)}if(d.vars.animation.toLowerCase()=="slide"){if(d.transitions){d.setTransition(0)}d.css({overflow:"hidden"});if(d.vars.animationLoop){d.cloneCount=2;d.cloneOffset=1;d.container.append(d.slides.filter(":first").clone().addClass("clone")).prepend(d.slides.filter(":last").clone().addClass("clone"))}d.newSlides=a(".slides > li",d);var m=(-1*(d.currentSlide+d.cloneOffset));if(d.vertical){d.newSlides.css({display:"block",width:"100%","float":"left"});d.container.height((d.count+d.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){d.css({position:"relative"}).height(d.slides.filter(":first").height());d.args[d.prop]=(d.transitions)?"translate3d(0,"+m*d.height()+"px,0)":m*d.height()+"px";d.container.css(d.args)},100)}else{d.args[d.prop]=(d.transitions)?"translate3d("+m*d.width()+"px,0,0)":m*d.width()+"px";d.container.width((d.count+d.cloneCount)*200+"%").css(d.args);setTimeout(function(){d.newSlides.width(d.width()).css({"float":"left",display:"block"})},100)}}else{d.transitions=false;d.slides.css({width:"100%","float":"left",marginRight:"-100%"}).eq(d.currentSlide).fadeIn(d.vars.animationDuration)}if(d.vars.controlNav){if(d.manualExists){d.controlNav=d.manualControls}else{var e=a('<ol class="flex-control-nav"></ol>');var s=1;for(var t=0;t<d.count;t++){e.append("<li><a>"+s+"</a></li>");s++}if(d.containerExists){a(d.controlsContainer).append(e);d.controlNav=a(".flex-control-nav li a",d.controlsContainer)}else{d.append(e);d.controlNav=a(".flex-control-nav li a",d)}}d.controlNav.eq(d.currentSlide).addClass("active");d.controlNav.bind(d.eventType,function(i){i.preventDefault();if(!a(this).hasClass("active")){(d.controlNav.index(a(this))>d.currentSlide)?d.direction="next":d.direction="prev";d.flexAnimate(d.controlNav.index(a(this)),d.vars.pauseOnAction)}})}if(d.vars.directionNav){var v=a('<ul class="flex-direction-nav"><li><a class="prev" href="#">'+d.vars.prevText+'</a></li><li><a class="next" href="#">'+d.vars.nextText+"</a></li></ul>");if(d.containerExists){a(d.controlsContainer).append(v);d.directionNav=a(".flex-direction-nav li a",d.controlsContainer)}else{d.append(v);d.directionNav=a(".flex-direction-nav li a",d)}if(!d.vars.animationLoop){if(d.currentSlide==0){d.directionNav.filter(".prev").addClass("disabled")}else{if(d.currentSlide==d.count-1){d.directionNav.filter(".next").addClass("disabled")}}}d.directionNav.bind(d.eventType,function(i){i.preventDefault();var j=(a(this).hasClass("next"))?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}})}if(d.vars.keyboardNav&&a("ul.slides").length==1){function h(i){if(d.animating){return}else{if(i.keyCode!=39&&i.keyCode!=37){return}else{if(i.keyCode==39){var j=d.getTarget("next")}else{if(i.keyCode==37){var j=d.getTarget("prev")}}if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}}}}a(document).bind("keyup",h)}if(d.vars.mousewheel){d.mousewheelEvent=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel";d.bind(d.mousewheelEvent,function(y){y.preventDefault();y=y?y:window.event;var i=y.detail?y.detail*-1:y.wheelDelta/40,j=(i<0)?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}})}if(d.vars.slideshow){if(d.vars.pauseOnHover&&d.vars.slideshow){d.hover(function(){d.pause()},function(){if(!d.manualPause){d.resume()}})}d.animatedSlides=setInterval(d.animateSlides,d.vars.slideshowSpeed)}if(d.vars.pausePlay){var q=a('<div class="flex-pauseplay"><span></span></div>');if(d.containerExists){d.controlsContainer.append(q);d.pausePlay=a(".flex-pauseplay span",d.controlsContainer)}else{d.append(q);d.pausePlay=a(".flex-pauseplay span",d)}var n=(d.vars.slideshow)?"pause":"play";d.pausePlay.addClass(n).text((n=="pause")?d.vars.pauseText:d.vars.playText);d.pausePlay.bind(d.eventType,function(i){i.preventDefault();if(a(this).hasClass("pause")){d.pause();d.manualPause=true}else{d.resume();d.manualPause=false}})}if("ontouchstart" in document.documentElement){var w,u,l,r,o,x,p=false;d.each(function(){if("ontouchstart" in document.documentElement){this.addEventListener("touchstart",g,false)}});function g(i){if(d.animating){i.preventDefault()}else{if(i.touches.length==1){d.pause();r=(d.vertical)?d.height():d.width();x=Number(new Date());l=(d.vertical)?(d.currentSlide+d.cloneOffset)*d.height():(d.currentSlide+d.cloneOffset)*d.width();w=(d.vertical)?i.touches[0].pageY:i.touches[0].pageX;u=(d.vertical)?i.touches[0].pageX:i.touches[0].pageY;d.setTransition(0);this.addEventListener("touchmove",k,false);this.addEventListener("touchend",f,false)}}}function k(i){o=(d.vertical)?w-i.touches[0].pageY:w-i.touches[0].pageX;p=(d.vertical)?(Math.abs(o)<Math.abs(i.touches[0].pageX-u)):(Math.abs(o)<Math.abs(i.touches[0].pageY-u));if(!p){i.preventDefault();if(d.vars.animation=="slide"&&d.transitions){if(!d.vars.animationLoop){o=o/((d.currentSlide==0&&o<0||d.currentSlide==d.count-1&&o>0)?(Math.abs(o)/r+2):1)}d.args[d.prop]=(d.vertical)?"translate3d(0,"+(-l-o)+"px,0)":"translate3d("+(-l-o)+"px,0,0)";d.container.css(d.args)}}}function f(j){d.animating=false;if(d.animatingTo==d.currentSlide&&!p&&!(o==null)){var i=(o>0)?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(i)&&Number(new Date())-x<550&&Math.abs(o)>20||Math.abs(o)>r/2){d.flexAnimate(i,d.vars.pauseOnAction)}else{d.flexAnimate(d.currentSlide,d.vars.pauseOnAction)}}this.removeEventListener("touchmove",k,false);this.removeEventListener("touchend",f,false);w=null;u=null;o=null;l=null}}if(d.vars.animation.toLowerCase()=="slide"){a(window).resize(function(){if(!d.animating){if(d.vertical){d.height(d.slides.filter(":first").height());d.args[d.prop]=(-1*(d.currentSlide+d.cloneOffset))*d.slides.filter(":first").height()+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}else{d.newSlides.width(d.width());d.args[d.prop]=(-1*(d.currentSlide+d.cloneOffset))*d.width()+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}}})}d.vars.start(d)};d.flexAnimate=function(g,f){if(!d.animating){d.animating=true;d.animatingTo=g;d.vars.before(d);if(f){d.pause()}if(d.vars.controlNav){d.controlNav.removeClass("active").eq(g).addClass("active")}d.atEnd=(g==0||g==d.count-1)?true:false;if(!d.vars.animationLoop&&d.vars.directionNav){if(g==0){d.directionNav.removeClass("disabled").filter(".prev").addClass("disabled")}else{if(g==d.count-1){d.directionNav.removeClass("disabled").filter(".next").addClass("disabled")}else{d.directionNav.removeClass("disabled")}}}if(!d.vars.animationLoop&&g==d.count-1){d.pause();d.vars.end(d)}if(d.vars.animation.toLowerCase()=="slide"){var e=(d.vertical)?d.slides.filter(":first").height():d.slides.filter(":first").width();if(d.currentSlide==0&&g==d.count-1&&d.vars.animationLoop&&d.direction!="next"){d.slideString="0px"}else{if(d.currentSlide==d.count-1&&g==0&&d.vars.animationLoop&&d.direction!="prev"){d.slideString=(-1*(d.count+1))*e+"px"}else{d.slideString=(-1*(g+d.cloneOffset))*e+"px"}}d.args[d.prop]=d.slideString;if(d.transitions){d.setTransition(d.vars.animationDuration);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.slideString+",0)":"translate3d("+d.slideString+",0,0)";d.container.css(d.args).one("webkitTransitionEnd transitionend",function(){d.wrapup(e)})}else{d.container.animate(d.args,d.vars.animationDuration,function(){d.wrapup(e)})}}else{d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration);d.slides.eq(g).fadeIn(d.vars.animationDuration,function(){d.wrapup()})}}};d.wrapup=function(e){if(d.vars.animation=="slide"){if(d.currentSlide==0&&d.animatingTo==d.count-1&&d.vars.animationLoop){d.args[d.prop]=(-1*d.count)*e+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}else{if(d.currentSlide==d.count-1&&d.animatingTo==0&&d.vars.animationLoop){d.args[d.prop]=-1*e+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}}}d.animating=false;d.currentSlide=d.animatingTo;d.vars.after(d)};d.animateSlides=function(){if(!d.animating){d.flexAnimate(d.getTarget("next"))}};d.pause=function(){clearInterval(d.animatedSlides);if(d.vars.pausePlay){d.pausePlay.removeClass("pause").addClass("play").text(d.vars.playText)}};d.resume=function(){d.animatedSlides=setInterval(d.animateSlides,d.vars.slideshowSpeed);if(d.vars.pausePlay){d.pausePlay.removeClass("play").addClass("pause").text(d.vars.pauseText)}};d.canAdvance=function(e){if(!d.vars.animationLoop&&d.atEnd){if(d.currentSlide==0&&e==d.count-1&&d.direction!="next"){return false}else{if(d.currentSlide==d.count-1&&e==0&&d.direction=="next"){return false}else{return true}}}else{return true}};d.getTarget=function(e){d.direction=e;if(e=="next"){return(d.currentSlide==d.count-1)?0:d.currentSlide+1}else{return(d.currentSlide==0)?d.count-1:d.currentSlide-1}};d.setTransition=function(e){d.container.css({"-webkit-transition-duration":(e/1000)+"s"})};d.init()};a.flexslider.defaults={animation:"fade",slideDirection:"horizontal",slideshow:true,slideshowSpeed:7000,animationDuration:600,directionNav:true,controlNav:true,keyboardNav:true,mousewheel:false,prevText:"Previous",nextText:"Next",pausePlay:false,pauseText:"Pause",playText:"Play",randomize:false,slideToStart:0,animationLoop:true,pauseOnAction:true,pauseOnHover:false,controlsContainer:"",manualControls:"",start:function(){},before:function(){},after:function(){},end:function(){}};a.fn.flexslider=function(b){return this.each(function(){if(a(this).find(".slides li").length==1){a(this).find(".slides li").fadeIn(400)}else{if(a(this).data("flexslider")!=true){new a.flexslider(a(this),b)}}})}})(jQuery);

/*
 @name       View.js — A simple, lightweight, jQuery photo viewer for the web
 @category   Lightbox, Image Viewer
 @author     Rogie King <rogie@finegoodsmarket.com>
 @copyright  2011-2011 Rogie King
 @version    1.01
 @license    By purchasing View.js, you agree to the following: View.js remain property of Rogie King. View.js may be used by the licensee in any personal or commercial projects. View.js may not be resold or  redistributed. For example: packaged in an application where it could be downloaded for free, such as an open-source project or other application where View.js is bundled along with other files.View.js — A simple, lightweight, jQuery photo viewer for the web by Rogie King is licensed under a Creative Commons Attribution-NoDerivs 3.0 Unported License.
*/

function View(a,b){function v(){t();q();d=c.find("img");g("body").append(c);if(!View._cssified){n()}View._cssified=true;u();i.sync();i.close();i.show(d.eq(0));i._ie7=navigator.userAgent.indexOf("MSIE 7")>-1;g(window).resize(function(){i.sync()})}function u(){c.unbind("click.view").bind("click.view",m)}function t(){if(typeof a=="object"&&a.jquery){a.find("a[href]").add(a.filter("a[href]")).each(function(){if(s(this.href)||!b.validateUrls){h.push({src:this.href,caption:this.title})}g(this).unbind("click.view").bind("click.view",r)})}else if(g.isArray(a)){h=a}}function s(a){return/\.(jpeg|jpg|gif|png)(\?|#)?(.*)?$/i.test(a)}function r(a){a.preventDefault();i.show(this.href);i.open()}function q(){if(g.isArray(h)){for(var a=0,b;b=h[a];++a){var c=null;var d=g('<li class="loading"/>');if(typeof b=="object"&&b.src){c=b.src}else if(typeof b=="string"){c=b}var f=new Image;f.onload=function(){i.sync();g(this).css({visibility:"visible"}).parents("li").removeClass("loading")};g(f).css({visibility:"hidden"});g(f).attr("data-src",c);if(b.caption){d.addClass("has-caption").append(g('<span class="caption" />').text(b.caption))}if(a==0){d.addClass("first")}if(a==h.length-1){d.addClass("last")}e.append(d.append(g("<div/>").append(g("<span/>").append(f))))}}}function p(a){if(!a.src){g(a).attr("src",g(a).attr("data-src"))}}function o(a,b){p(a.find("img"));a.nextAll().slice(0,b).add(a.prevAll().slice(0,b)).find("img").each(function(a,b){p(b)})}function n(){var a=g("<style />");g("head").prepend(a);var c=document.styleSheets[0];for(h in b.css){var d="";for(name in b.css[h]){d+=name+":"+b.css[h][name]+";"}var e=h.split(",");for(var f=0,h;h=e[f];++f){if(c.insertRule){c.insertRule(h+"{"+d+"}",c.cssRules.length)}else{c.addRule(h,d)}}}}function m(a){a.preventDefault();$t=g(a.target);if($t.is("img")){if($t.parents("li").is(".current")){i.next()}else{i.show($t)}}else if($t.is("li>div,li")){if($t.parents("li").is(".next")||$t.is(".next")){i.next()}else if($t.parents("li").is(".previous")||$t.is(".previous")){i.prev()}else{i.close()}}else{i.close()}}function l(a){g.each(b.keys,function(b,c){for(var d=0;d<c.length;++d){if(a.keyCode==c[d]){i[b]()}}})}function k(a){var b='[src="'+a+'"],[data-src="'+a+'"]';return $i=d.find(b).add(d.filter(b)).eq(0)}var c,d,e,f,g=jQuery,h=[],i=this,j=g("body");c=g('<div class="viewer"><ul></ul><a href="#" class="close" title="Close this viewer">×</a></div>').hide();e=c.find("ul");var b=g.extend({css:{".viewer *, .viewer":{margin:0,padding:0,border:0},".viewer":{"background-color":"#222",filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#D8000000,endColorstr=#D8000000)","background-color":"rgba(0,0,0,0.85)",position:"fixed",right:0,top:0,left:0,bottom:0,display:"block",overflow:"hidden","z-index":Math.ceil((new Date).getTime()/1e7),height:"100%",width:"100%"},".viewer li.current + .loading":{"background-position":"0 center"},".viewer ul":{display:"block",height:"100%",width:"100%","white-space":"nowrap"},".viewer li":{height:"100%",width:"0%",overflow:"hidden",display:"none","float":"left","text-align":"center",position:"relative"},".viewer li.previous, .viewer li.next":{cursor:"pointer",display:"block"},".viewer li>div":{left:"10px",right:"10px",bottom:"10px",top:"10px",display:"block","text-align":"center",position:"absolute"},".viewer li.has-caption>div":{bottom:"5em"},".viewer li.loading>div":{background:"url(data:image/gif;base64,R0lGODlhDAAMAPIGAFxcXE5OTlZWVkpKSkZGRkJCQgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFHgAGACwAAAAADAAMAAADLmhaIRJFSQHEGFRMQKQhlVFwngIyWqk8lqpgrYs1rvGMXXnapASmPAsm5EHdJAkAIfkEBR4AAQAsBgABAAMABQAAAgaEbwISHAUAIfkEBR4AAQAsBgADAAUAAwAAAgOEj1kAIfkEBR4AAgAsBgAGAAUAAwAAAgYMDmInegUAIfkEBR4AAQAsBgAGAAMABQAAAgOEj1kAIfkEBR4AAgAsAwAGAAMABQAAAgaUchDAzQUAIfkEBR4AAQAsAQAGAAUAAwAAAgOEj1kAIfkEBR4AAgAsAQADAAUAAwAAAgYEImKnGwUAIfkEBR4AAQAsAwABAAMABQAAAgOEj1kAOw%3D%3D) center center no-repeat"},".viewer li.loading.next>div":{"background-position":"0 center"},".viewer li.loading.previous>div":{"background-position":"right center"},".viewer .close":{color:"#fff","text-decoration":"none","font-weight":"bold","font-size":"20px",position:"absolute",right:"15px",top:"15px",cursor:"pointer",display:"block",opacity:.6},".viewer .close:hover":{opacity:1},".viewer img":{"max-width":"100%","max-height":"100%",cursor:"pointer",position:"relative",height:"auto",width:"auto","vertical-align":"middle","-ms-interpolation-mode":"bicubic"},".viewer .caption":{color:"#aaa","text-shadow":"0 1px 2px rgba(0,0,0,0.8)","line-height":"5em",position:"absolute",bottom:"0",left:"0",right:"0",visibility:"hidden"},".viewer li.current .caption":{visibility:"visible"},".viewer li.previous":{width:"10%"},".viewer li.current":{width:"80%",display:"block"},".viewer li.first.current":{"margin-left":"10%"},".viewer li.last.current":{"margin-right":"10%"},".viewer li.next":{width:"10%"},".viewer li.previous>div":{left:"-50%",right:"50%"},".viewer li.next>div":{right:"-50%",left:"50%"},".viewer .next img, .viewer .previous img, .viewer .current img":{"-webkit-transform":"translateZ(0)"}},keys:{close:[27],prev:[37,188],next:[39,190]},loadAhead:2,validateUrls:true},b);this.next=function(){this.show(f.next().find("img"))};this.prev=function(){this.show(f.prev().find("img"))};this.close=function(){c.hide();g(document).unbind("keyup.view");j.css({overflow:j.data("viewer-overflow")})};this.open=function(){c.show();g(document).bind("keyup.view",l);j.data("viewer-overflow",j.css("overflow")).css({overflow:"hidden"});this.sync()};this.show=function(a){if(typeof a=="string"){a=k(a)}if(a.constructor==g&&a.length>0){c.find("li").removeClass("current next previous").removeAttr("title");f=$parent=a.parents("li").addClass("current");f.next().addClass("next").attr("title","Next");f.prev().addClass("previous").attr("title","Previous");this.sync();o(f,b.loadAhead)}};this.sync=function(){var a=e.find("li.current>div").height();var b=a+"px";e.find("li>div>span").each(function(){g(this).css({"line-height":b})});if(i._ie7){d.css({"max-height":b});d.each(function(){var b=g(this);b.css({top:(a-b.height())/2+"px"})})}};this.next=function(){i.show(f.next().find("img"))};this.prev=function(){i.show(f.prev().find("img"))};v()}View._version="1.01";(function(){var a=jQuery,b=document.getElementsByTagName("script");if(b[b.length-1].src.indexOf("?auto")>-1||true){a().ready(function(){var b=a("a.view[href]");var c={};b.each(function(){var b=this.rel;if(b){if(!c[b]){c[b]=[]}c[b].push(this)}else{new View(a(this))}});for(var d in c){new View(a(c[d]))}})}})()


/*
  Author: Scott Cormier
*/

function getTagline(thisId) {
	var txt = [
		"a product designer",
    "a mobile designer",
		"a user experience designer",
		"a product manager"
	];

	if (!thisId) {
		thisId = 0;
	}
	return txt[thisId];
}
function updateTagLine(startId) {
	var tagLine = $("#tagline");
	var tagLine2 = $("#tagline2");

	if (!startId) {
		startId = 0;
	}
	var tag = getTagline(startId);
	$(tagLine).html(tag);
	$(tagLine2).html(tag);
	updateHeaderSize();

	if (startId < 8) {
		window.setTimeout("updateTagLine("+ startId + 1 +")", 10000);
	}
	else {
		window.setTimeout("updateTagLine(0)", 10000);
	}
}
function updateHeaderSize() {
	var mHead	= $("#masthead");
	var mHeadTx	= $("#masthead h1");
	var headerW = $(mHead).width();
	var headerH = $(mHeadTx).outerHeight(true);
	var textW	= $(mHead).find(".title").width();
	var diffW	= headerW/textW;

  if (headerW <= 320) {
    $(mHeadTx).css("fontSize", "235%");
  }
  else if (headerW > 320 && headerW < 495) {
    $(mHeadTx).css("fontSize", "155%");
  }
  else if (headerW > 496 && headerW < 800) {
    $(mHeadTx).css("fontSize", "150%");
  }
  else {
    $(mHeadTx).css("fontSize", "165%");
  }

	var curSize	= $(mHeadTx).css("fontSize").replace("px","");
	$(mHeadTx).css("font-size", Math.floor(curSize * diffW));
}
function initFlexslider(imgs) {
  var imgs = $('.images');
  $(imgs).flexslider({
    after: function(s){
      // Get current slide
      var c_slide = s.currentSlide + 1;
      // Get current project
      var c_proj = s.attr('id').replace("project_","");
      if ($('#prj' + c_proj + '_s' + c_slide + '_info').length > 0) {
        s.next().find('.slide_info').hide();
        $('#prj' + c_proj + '_s' + c_slide + '_info').fadeIn();
      }
    },
    animation: "slide",
    controlsContainer: ".nav",
    nextText: '>',
    prevText: '<',
    start: function( slider ){
      $('.past .images').css('display', 'none');
    },
    slideshow: false,
    touch: true
  });
}

$(window).on(function() {
  var imgs = $('.images');
  initFlexslider(imgs);
  // Center flexslider nav dots
  $('.flex-control-nav').each(function(){
    var dotCount = $(this).find('li').length;
    $(this).css('width', dotCount*25 + "px");
  });
});

$(document).ready(function() {
	//updateTagLine();
	updateHeaderSize();
	$(window).bind("resize", updateHeaderSize);

	// Show direction navigation
	$('.images').mouseenter(function(){;
	  $(this).find('.flex-direction-nav li').fadeIn();
	}).mouseleave(function(){
	  $(this).find('.flex-direction-nav li').fadeOut();
	});

  // Hide / Show past work
  $('#past_work').click(function(){
    var isVisible = $('.past').first().css("visibility");
    if (isVisible == "visible") {
      $(this).text('View past work');
      $('.past').css("visibility", "hidden").hide();
      $('.past .images').hide();
    }
    else {
      $(this).text('Hide past work');
      $('.past').css("visibility", "visible").show();
      $('.past:not("article.cv")').css({ 'height':'400px', 'margin-bottom':'40px' });
      $('.past').css({'margin':'20px 0'});
      $('.past .images').show();
    }
    return false;
  });
});