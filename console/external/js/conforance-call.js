function scrollWin() {
    window.scrollTo(0, 80);
	if ($('#livefilter-list').length > 0) {
$('#livefilter-list').liveFilter('.search', 'li', {
  filterChildSelector: 'a'
});
}


if ($('#livefilter-list1').length > 0) {
$('#livefilter-list1').liveFilter('.search', 'li', {
  filterChildSelector: 'a'
});
}



if ($('#add').length > 0) {
$('#add').click(function() {
    var newcontact = $('#name').val();
	var newcontactno = $('#number').val();
    
	if(newcontact&&newcontactno!= '') {
        $('.cList').append('<li><a href="dashboard-contact-profile.html"><div class="cntct-pic"><img src="img/user.jpg" alt="user-picture"/></div><div class="cntct-details"><p class="cntct-name">' + newcontact + '</p><p class="cntct-no">' + newcontactno + '</p></div></a></li>').listview('refresh');
        $('#name').val('');
		 $('#number').val('');
    }
      
});
}




if ($('#add1').length > 0) {
$('#add1').click(function() {
    var newcontact = $('#name1').val();
	var newcontactno = $('#number1').val();
    
	if(newcontact&&newcontactno!= '') {
        $('.cList1').append('<li><a href="dashboard-contact-profile.html"><div class="cntct-pic"><img src="img/user.jpg" alt="user-picture"/></div><div class="cntct-details"><p class="cntct-name">' + newcontact + '</p><p class="cntct-no">' + newcontactno + '</p></div></a></li>').listview('refresh');
        $('#name1').val('');
		 $('#number1').val('');
    }
      
});
}
}


$(function(){
    
    

      $('#testDiv').slimScroll({
          alwaysVisible: true,
          railVisible: true,
          railColor: '#fff',
          railOpacity: 1,
          height : '403px',
          railBorderRadius: 0
      });
    

        $('#scroll').slimScroll({
          alwaysVisible: true,
          railVisible: true,
          railColor: '#eaedef',
          railOpacity: 1,
          height : '190px',
          railBorderRadius: 0
      });
        $('#scroll1').slimScroll({
          alwaysVisible: true,
          railVisible: true,
          railColor: '#eaedef',
          railOpacity: 1,
          height : '269px',
          railBorderRadius: 0
      });
    
     $('#scroll2').slimScroll({
          alwaysVisible: true,
          railVisible: true,
          railColor: '#eaedef',
          railOpacity: 1,
          height : '300px',
          railBorderRadius: 0
      });

        
      $(".tm-user-cntct-dropdown" ).delegate( "input", "click", function(e) {
          e.stopPropagation();
      });

      $('[data-toggle="tooltip"]').tooltip();
      $('.add-contact').on('click', function(e){
          var exampleInputEmail1Value = $('#exampleInputEmail1').val();
          if(exampleInputEmail1Value.length>0){
            $('#contact-add tr:first').before('<tr><td>'+exampleInputEmail1Value+'</td><td>2.20C/Min</td></tr>');
          }
      })
      
      
       $('.remove-me').on('click', function(e){
          $(this).parents(".conference-contact:eq(0)").remove();
      })
      
      $('.conference-contact  glyphicon-volume-up').on('click', function(){
        $('.conference-contact div.conference-icon glyphicon-volume-up').toggleClass('glyphicon-volume-off');
            
      })

      
      $('.tm-i-conferencecallvolume').on('click', function(e){
            $(this).toggleClass('tm-i-conferencecallvolumemute');
      });

	  
	     $('.tm-i-callvolume').on('click', function(e){
            $(this).toggleClass('tm-i-callvolumemute');
      });

       
    
    $('i.tm-i-redial').hover(function(){
         $(this).parent().children('img.img-circle').addClass('img-circle-op');
       
    }, function(){
         $(this).parent().children('img.img-circle').removeClass('img-circle-op');
    });
    
    $('img.img-circle, i.tm-i-redial').hover(function(){
         $(this).parent().children('div.conference-icon').hide();
       
    }, function(){
         $(this).parent().children('div.conference-icon').show();
    });
      
    });



