/* Author: Scott Cormier
*/

function getTagline(thisId) {
	var txt = [
		"a product designer",
    "a mobile designer",
		"a user experience designer",
		"a product manager",
		"a user researcher"
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
	
	$(mHeadTx).css("fontSize", "197%");
	
	var curSize	= $(mHeadTx).css("fontSize").replace("px","");
	$(mHeadTx).css("font-size", Math.floor(curSize * diffW));
}

$(window).load(function() {
  $('.images').flexslider({
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
    slideshow: false
  });
});
$(document).ready(function() {
	updateTagLine();
	updateHeaderSize();
	$(window).bind("resize", updateHeaderSize);
	
	// Show direction navigation
	$('.images').mouseenter(function(){;
	  $(this).find('.flex-direction-nav li').fadeIn();
	}).mouseleave(function(){
	  $(this).find('.flex-direction-nav li').fadeOut();
	});
});
