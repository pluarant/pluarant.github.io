/** ********************************************** **
	Your Custom Javascript File
	Put here all your custom functions
*************************************************** **/



/** Remove Panel
	Function called by app.js on panel Close (remove)
 ************************************************** **/
	function _closePanel(panel_id) {
		/** 
			EXAMPLE - LOCAL STORAGE PANEL REMOVE|UNREMOVE

			// SET PANEL HIDDEN
			localStorage.setItem(panel_id, 'closed');
			
			// SET PANEL VISIBLE
			localStorage.removeItem(panel_id);
		**/	
	}

	function toggleVisibility(id) {
    		var x = document.getElementById(id);    
	        if(x.style.display == 'none') {
	        	x.style.display = 'block';
	    	}
		else
	    	{
	        	x.style.display = 'none';
	    	}
	}

	/*--------------------Falguni 01-07-2017 ---------*/
	function newUserForm() {
    	var x = document.getElementById('newUserFormDIV');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
/* ------------ date 03-07-2017 ------------*/
	function addGroupName() {
    	var x = document.getElementById('newGroupFormDIV');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
function newAppForm() {
    	var x = document.getElementById('newAppFormDIV');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
/******** for pin-unpin for users **********/
	$('.fa.fa-thumb-tack').click( 

    function() {
        if ($(this).hasClass('grey')) { 
            $(this).removeClass('grey');
             $("a").attr("title", "Unpin"); 
        } else { 
            $(this).addClass('grey');
            $("a").attr("title", "Pin");
        } 
    });

/******** for active-inactive for users**********/
    $('.fa.fa-user').click( 

    function() {
        if ($(this).hasClass('grey')) { 
            $(this).removeClass('grey');
             $("a").attr("title", "Deactivate"); 
        } else { 
            $(this).addClass('grey');
            $("a").attr("title", "Activate");
        } 
    });

/******** for active-inactive for groups**********/
    $('.fa.fa-group').click( 

    function() {
        if ($(this).hasClass('grey')) { 
            $(this).removeClass('grey');
             $("a").attr("title", "Deactivate"); 
        } else { 
            $(this).addClass('grey');
            $("a").attr("title", "Activate");
        } 
    });
	
/************** For Payment Method ****************/
function paymentMethod(elementid) {
	
	if(elementid == "ccPayment")
	{
		document.getElementById('ccPayment').style.display = 'block';
		document.getElementById('ppPayment').style.display = 'none';
		document.getElementById('wtPayment').style.display = 'none';
	}
	else if(elementid == "ppPayment")
	{
		document.getElementById('ppPayment').style.display = 'block';
		document.getElementById('ccPayment').style.display = 'none';
		document.getElementById('wtPayment').style.display = 'none';
	}
	else
	{
		document.getElementById('wtPayment').style.display = 'block';
		document.getElementById('ccPayment').style.display = 'none';
		document.getElementById('ppPayment').style.display = 'none';
	}
	
}
/*------------------------------------------------*/
/*---------FALGUNI 06-07-2017----------*/
	function editUserForm() {
    	var x = document.getElementById('edituser');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
	function editGroupForm() {
    	var x = document.getElementById('editgroup');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
	function newAppFormFirst() {
    	var x = document.getElementById('newAppFormFirstDIV');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
	function newAppFormHome() {
    	var x = document.getElementById('newAppFormHomeDIV');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
function chartShow(id)
{
	if(id=='dailyd')
	{
		var x = document.getElementById(id);
		   if(x.value == '1')
		   {   
			  document.getElementById('dailyuser').style.display = 'block';
			  document.getElementById('dailyconnection').style.display = 'none';
			  document.getElementById('dailymessage').style.display = 'none';
		   }
		   else if(x.value == '2')
		   {
			  document.getElementById('dailyuser').style.display = 'none';
			  document.getElementById('dailyconnection').style.display = 'block';
			  document.getElementById('dailymessage').style.display = 'none';
		   }
		   else
		   {
			  document.getElementById('dailyuser').style.display = 'none';
			  document.getElementById('dailyconnection').style.display = 'none';
			  document.getElementById('dailymessage').style.display = 'block';
		   }
	}
	else
	{
		var x = document.getElementById(id);
		
		  if(x.value == '1')
		   {   
			  document.getElementById('monthlyuser').style.display = 'block';
			  document.getElementById('monthlyconnection').style.display = 'none';
			  document.getElementById('monthlymessage').style.display = 'none';
		   }
		   else if(x.value == '2')
		   {
			  document.getElementById('monthlyuser').style.display = 'none';
			  document.getElementById('monthlyconnection').style.display = 'block';
			  document.getElementById('monthlymessage').style.display = 'none';
		   }
		   else
		   {
			  document.getElementById('monthlyuser').style.display = 'none';
			  document.getElementById('monthlyconnection').style.display = 'none';
			  document.getElementById('monthlymessage').style.display = 'block';
			  
		   }
	}
}

function changeText()
{	
	var x = document.getElementById('months').value;  
			  
               if(x == '0' || x == '1' || x == '2'|| x == '4' || x == '')
			   {   
                  document.getElementById('discount').style.display = 'block';
                  document.getElementById('discount1').style.display = 'none';
			   }
               else
			   {
                   document.getElementById('discount1').style.display = 'block';
                  document.getElementById('discount').style.display = 'none';
			   }
}
/*------------------------------------------------*/
/*-----FALGUNI 07-07-2017  VALIDATE AND RESTRICT numbers---------*/
 function ValidateAlpha(evt)
    {
        var keyCode = (evt.which) ? evt.which : evt.keyCode
        if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
         
        return false;
            return true;
    }
/*------------------------------------------------*/
 $(".switch-label2").click(function () {
	$(this).toggleClass("clicked");
	$(".push-webhooks").toggle();
 });


  $(".switch-label1").click(function () {
	$(this).toggleClass("clicked");
	$(".push-notifications").toggle();
 });

 $('input').on('blur', function(){
         	$(this).next('div').removeClass('input-desc-hover').addClass('input-desc');
         	  }).on('focus', function(){
         	$(this).next('div').removeClass('input-desc').addClass('input-desc-hover');
         });
		 
/*--------------------Falguni 12-07-2017 ---------*/
	function genAuthToken() {
    	var x = document.getElementById('genAuthTokenDIV');    
	    if(x.style.display == 'none')
	    {
	        x.style.display = 'block';
	    }
	    else
	    {
	        x.style.display = 'none';
	    }
	}
		 


		 
/*---------------Start--Loader--------------------*/

$(document).ready(function(){
			$(document).ajaxStart(function(){
				$("#wait").css("display", "block");
			});
			$(document).ajaxComplete(function(){
				$("#wait").css("display", "none");
			});
			$(".refresh").click(function(){
				$("#txt").load("demo_ajax_load.asp");
			});
		});


/*---------------End--Loader--------------------*/
