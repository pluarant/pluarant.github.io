/*
 * Version: 2.1.1
 */

// Notify Plugin - Code for the demo site of HtmlCoder
// You can delete the code below
//-----------------------------------------------
(function($) {

	"use strict";

	$(document).ready(function() {
		if (($(".main-navigation.onclick").length>0) && $(window).width() > 991 ){
			$.notify({
				// options
				message: 'The Dropdowns of the Main Menu, are now open with click on Parent Items. Click "Home" to checkout this behavior.'
			},{
				// settings
				type: 'info',
				delay: 10000,
				offset : {
					y: 150,
					x: 20
				}
			});
		};
		if (!($(".main-navigation.animated").length>0) && $(window).width() > 991 && $(".main-navigation").length>0){
			$.notify({
				// options
				message: 'The animations of main menu are disabled.'
			},{
				// settings
				type: 'info',
				delay: 10000,
				offset : {
					y: 150,
					x: 20
				}
			}); // End Notify Plugin - The above code (from line 14) is used for demonstration purposes only

		};
    		
		//https://stackoverflow.com/questions/52125609/how-to-get-one-accordion-tab-open-at-a-time-bootstrap
		function accordion_click(e) {
        		var trigger = $(this);
			var group = trigger.attr("group");
			var href = trigger.attr("href");
			var id = trigger.attr("id");
			ga('send', 'event', 'WhyMesibo', id);


			// This will prevent closing on click (we need to keep one open, only way to close is
			// to click on another one
			if(trigger.parents('.card').children('.collapse').hasClass('show')){
				e.stopPropagation();
				return false;
		        }

			//This to close other open 
        		$(".collapse.show").each(function(){
            			if( group == $(this).attr("group") && href != ("#"+$(this).attr("id"))){
            				//$(this).removeClass("collapse");
            				//$(this).addClass("collapsed");
            				//$(this).removeClass("show", 1000, "swing");
            				$(this).removeClass("show");

					// now add collapsed class to link of open 
					var href = '#' + $(this).attr("id");
					$("a[href='"+href + "'").each(function() {
            					$(this).addClass("collapsed");
					});
            				//trigger.addClass("collapsed");
				}
        		});   
    		}
    		$("[data-parent='#accordion']").on("click", accordion_click);
	}); // End document ready

})(jQuery);
