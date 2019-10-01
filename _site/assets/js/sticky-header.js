if(window.width > 50) {
$(window).scroll(function() {
	if ($(document).scrollTop() > 1){  
		$('#header').addClass("sticky-header"); //commented by Tejas Shobhasana - 5 Nov 2016 
	  }
	  else{
		$('#header').removeClass("sticky-header"); //commented by Tejas Shobhasana - 5 Nov 2016
	  }
});
}