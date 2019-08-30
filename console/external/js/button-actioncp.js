// States
// 

(function ($){
  window.numberArray = [],
  window.phoneNumber = '',
  window.updateDisplay,
  window.numberDisplayEl,
  window.inCallModeActive,
  window.dialpadButton = $('div.dials a.digit'),
  window.dialpadCase = $('div.dials'),
  window.clearButton = $('div.dials a.clear'),
  window.callButton = $('#actions .call'),
  window.actionButtons = $('#actions'),
  window.skipButton = $('#actions .skip'),
  window.numberDisplayEl = $('input#cnfMobileNo');

  function compilePhoneNumber(numberArray){
    if (window.numberArray.length > 1){ 
      window.phoneNumber = window.numberArray.join('');
    } else {
      window.phoneNumber = window.numberArray
    }
    return this.phoneNumber;
  };

  function updateDisplay(phoneNumber){
    window.numberDisplayEl.val(window.phoneNumber);
  };

  function clearPhoneNumber(){
  var inputString = $('input#cnfMobileNo').val();
        var shortenedString = inputString.substr(0,(inputString.length -1));
        $('input#cnfMobileNo').val(shortenedString);

  };

  function callNumber(){
    window.numberDisplayEl.val('Calling...');
    activateInCallInterface();
    // Need timer interval to animate . . .
    // Trigger  "Hangup"
    // Trigger  "Call timer"
  };


  function changeUnholdIntoHold(){
    window.skipButton.html('Hold');
  };

  function activateInCallInterface(){
    changeSkipIntoHold();
    disableDialButton();
    enableReadOnlyInput();
    window.inCallModeActive = true;
  };

  function disableInCallInterface(){
    removeReadOnlyInput();
    enableCallButton();
    changeHoldIntoSkip();
    window.inCallModeActive = false;
  }

  function enableCallButton(){
    window.callButton.removeClass('deactive');
  };

  function enableDialButton(){
    window.dialpadCase.removeClass('deactive');
  };

  function disableDialButton(){
    window.dialpadCase.addClass('deactive');
  };

  function changeSkipIntoHold(){
    window.skipButton.html('Hold');
  };

  function changeHoldIntoSkip(){
    window.skipButton.html('Skip');
  };

  function enableReadOnlyInput(){
    window.numberDisplayEl.attr('readonly','readonly');
  }

  function removeReadOnlyInput(){
    window.numberDisplayEl.removeAttr('readonly');
  }

  function refreshInputArray(){
    this.numberDisplayElContent = window.numberDisplayEl.val(); 
    window.numberArray = this.numberDisplayElContent.split('');
  };

  window.dialpadButton.click(function(e){
  
    if( !$(dialpadCase).hasClass('deactive') && window.numberDisplayEl.val().length <= 18){
      var content = $(this).html();
      refreshInputArray();
      window.numberArray.push(content);
      compilePhoneNumber();
      updateDisplay();
      checkDisplayEl();
      saveNumberDisplayEl();

    }
	if(window.numberDisplayEl.val().length > 10 && e.keyCode != 8){
		addReadyToClear();
		e.preventDefault();
	   }
	
  });
   $("input#cnfMobileNo").keydown (function (e) {
	  
	  
		/* console.log(e.keyCode) *//* blinking red num code goes here */
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "49"){
		 
		 $('.tm-dp-row1 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row1 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row1 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		
		 if(window.numberDisplayEl.val().length < 18 && e.keyCode == "50"){
		 
		 $('.tm-dp-row1 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row1 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row1 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "51"){
		 
		 $('.tm-dp-row1 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row1 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row1 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		 if(window.numberDisplayEl.val().length < 18 && e.keyCode == "52"){
		 
		 $('.tm-dp-row2 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row2 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row2 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "53"){
		 
		 $('.tm-dp-row2 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row2 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row2 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "54"){
		 
		 $('.tm-dp-row2 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row2 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row2 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		 if(window.numberDisplayEl.val().length < 18 && e.keyCode == "55"){
		 
		 $('.tm-dp-row3 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row3 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row3 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "56"){
		 
		 $('.tm-dp-row3 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row3 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row3 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "57"){
		 
		 $('.tm-dp-row3 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row3 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row3 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		
		if( window.numberDisplayEl.val().length !=null){
		if(window.numberDisplayEl.val().length < 18){
		if(e.keyCode=="16" &&  e.keyCode=="56"){
		$('.tm-dp-row4 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row4 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row4 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		}}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "48"){
		 
		 $('.tm-dp-row4 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row4 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row4 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if( window.numberDisplayEl.val().length !=null){
		if(window.numberDisplayEl.val().length < 18){
		if(e.keyCode=="16" &&  e.keyCode=="51"){
		$('.tm-dp-row4 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row4 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row4 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		}}
		
	   if(window.numberDisplayEl.val().length > 17 && e.keyCode != 8){
		addReadyToClear();
		e.preventDefault();
	   }
	   validation(e);
   });
   
   
   $("input#cnfMobileNo").keyup (function (e) {
	  
	  
		console.log(e.keyCode)/* blinking red num code goes here */
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "97"){
		 
		 $('.tm-dp-row1 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row1 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row1 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		
		 if(window.numberDisplayEl.val().length < 18 && e.keyCode == "98"){
		 
		 $('.tm-dp-row1 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row1 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row1 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "99"){
		 
		 $('.tm-dp-row1 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row1 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row1 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		 if(window.numberDisplayEl.val().length < 18 && e.keyCode == "100"){
		 
		 $('.tm-dp-row2 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row2 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row2 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "101"){
		 
		 $('.tm-dp-row2 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row2 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row2 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "102"){
		 
		 $('.tm-dp-row2 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row2 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row2 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		 if(window.numberDisplayEl.val().length < 18 && e.keyCode == "103"){
		 
		 $('.tm-dp-row3 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row3 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row3 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "104"){
		 
		 $('.tm-dp-row3 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row3 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row3 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "105"){
		 
		 $('.tm-dp-row3 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row3 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row3 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if( window.numberDisplayEl.val().length !=null){
		if(window.numberDisplayEl.val().length < 18){
		if(e.keyCode=="16" &&  e.keyCode=="56"){
		$('.tm-dp-row4 a:first-Child').css('background-color', '#eb3849');
		  $('.tm-dp-row4 a:first-Child').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row4 a:first-Child').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		}}
		if(window.numberDisplayEl.val().length < 18 && e.keyCode == "96"){
		 
		 $('.tm-dp-row4 a:nth-child(2)').css('background-color', '#eb3849');
		  $('.tm-dp-row4 a:nth-child(2)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row4 a:nth-child(2)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		if( window.numberDisplayEl.val().length !=null){
		if(window.numberDisplayEl.val().length < 18){
		if(e.keyCode=="16" &&  e.keyCode=="51"){
		$('.tm-dp-row4 a:nth-child(3)').css('background-color', '#eb3849');
		  $('.tm-dp-row4 a:nth-child(3)').css('color', '#fff');
		  setTimeout(function() { $('.tm-dp-row4 a:nth-child(3)').css('background-color', '#eb3849').removeAttr('style'); }, 200);
		}
		}}
		
	   if(window.numberDisplayEl.val().length > 17 && e.keyCode != 8){
		addReadyToClear();
		e.preventDefault();
	   }
	   validation(e);
   });
   
  function checkDisplayEl(){
    if( window.numberDisplayEl.val() != "" && window.numberDisplayEl.val().length >= 19){
      addReadyToClear();
	  validation(e);
    } else if ( window.numberDisplayEl.val() == "" ) {
      removeReadyFromClear();
    }
  }

   function validation(e){

        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 56,51]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && window.numberDisplayEl.val().length < 18) {
            e.preventDefault();
        }
  }





  

  function addReadyToClear(){
    window.clearButton.addClass('ready');
 $('#phoneHelper').removeClass('hide');
 $('#phoneHelper1').removeClass('hide');
 
  }

  $('#cnfMobileNo').keyup(function(e){if(e.keyCode == 8)$('#phoneHelper').addClass('hide');
  $('#phoneHelper1').addClass('hide');
    window.clearButton.removeClass('ready');})  


  

$('.tm-i-numberback').click(function(e){$('#phoneHelper').addClass('hide');
  $('#phoneHelper1').addClass('hide');
    window.clearButton.removeClass('ready');})  

$('.tm-i-numberback').click(function(){
   var len = $.trim(this.value).match(/\d/g).length;
    if (len > 9 ) {
       window.clearButton.addClass('ready');
  $('#phoneHelper').removeClass('hide');
  $('#phoneHelper1').removeClass('hide');
  
    }  
})


  function saveNumberDisplayEl(){
    lastNumberDisplayEl = window.numberDisplayEl.val()
  }

  function displayLastSavedNumberDisplayEl(){
    console.log('Last displayed element value: ' + lastNumberDisplayEl);
  }

  $('div.dials a.clear').click(function(){
    enableCallButton();
    enableDialButton();
    clearPhoneNumber();
    removeReadOnlyInput();
    //updateDisplay();
    checkDisplayEl();
    disableInCallInterface();
 
  });

  $('div#actions li.call').click(function(){
    callNumber();
  });

})(jQuery);																																									