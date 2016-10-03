$(".remove-item").click(function(){
	var current_object = $(this);
	bootbox.confirm("Are you sure delete this item?", function(result) {
		if(result){	
		  	var action = current_object.attr('data-action');
		  	var token = $("input[name='_token']").val();
			var id = current_object.attr('data-id');
			$('body').html("<form class='form-inline remove-form' method='POST' action='"+action+"'></form>");
			$('body').find('.remove-form').append('<input name="_token" type="hidden" value="'+ token +'">');
			$('body').find('.remove-form').append('<input name="id" type="hidden" value="'+ id +'">');
			$('body').find('.remove-form').submit();
		}
	}); 
});

$("body").on("click",".update-user",function(){
	var id = $(this).attr('data-id');
	var token = $('#'+id).find('input[name="_token"]').val();
	var name = $('#'+id).find('input[name="name"]').val();
	var surname = $('#'+id).find('input[name="surname"]').val();
	var email = $('#'+id).find('input[name="email"]').val();
	var password = $('#'+id).find('.edit-password').val();
	var password_confirmation = $('#'+id).find('.edit-password-c').val();
	var city = $('#'+id).find('input[name="city"]').val();
	var zip = $('#'+id).find('input[name="zip"]').val();
	var phonenumber = $('#'+id).find('input[name="phonenumber"]').val();
	var address = $('#'+id).find('input[name="address"]').val();
	var end_date = $('#'+id).find('input[name="end_date"]').val();
	var level = ($('#'+id).find('.edit-level').val());
	console.log(level);
	

	$.ajax({
        url: "/admin/editUser",
        dataType: "json",
        type: "POST",
        data: {'_token': token
        	,id:id
        	,name:name
        	,surname:surname
        	,email:email
        	,password:password
        	,password_confirmation:password_confirmation
        	,city:city
        	,zip:zip
        	,phonenumber:phonenumber
        	,address:address
        	,end_date:end_date
        	,level:level
        },
        success: function (data) {
        	console.log(data);
        	if($.isEmptyObject(data.error)){
        		window.location.href = current_page_url;
        	}else{
        		$('#'+id).find('.alert-danger').css("display","block");
	        	$.each( data.error, function( key, value ) {
	        		$('#'+id).find('.alert-danger').find('ul').append('<li>'+value+'</li>');
	        	});
        	}
        }
    });
});

$(".ban").click(function(){

		  var current_object = $(this);

		  bootbox.dialog({
		  message: "<form class='form-inline add-to-ban' method='POST'><div class='form-group'><textarea class='form-control reason' rows='4' style='width:500px' placeholder='Add Reason for Ban this user.'></textarea></div></form>",
		  title: "Add To Black List",
		  buttons: {
		    success: {
		      label: "Submit",
		      className: "btn-success",
		      callback: function() {
		      		var baninfo = $('.reason').val();
		      		var token = $("input[name='_token']").val();
		      		var action = current_object.attr('data-action');
		      		var id = current_object.attr('data-id');

		        	if(baninfo == ''){
		        		$('.reason').css('border-color','red');
		        		return false;
		        	}else{
		        		$('.add-to-ban').attr('action',action);
		        		$('.add-to-ban').append('<input name="_token" type="hidden" value="'+ token +'">')
		        		$('.add-to-ban').append('<input name="id" type="hidden" value="'+ id +'">')
		        		$('.add-to-ban').append('<input name="baninfo" type="hidden" value="'+ baninfo +'">')
		        		$('.add-to-ban').submit();
		        	}
		        	
		      }
		    },
		    danger: {
		      label: "Cancel",
		      className: "btn-danger",
		      callback: function() {
		      	// remove
		      }
		    },
		  }
		});
	});

$("body").on("click",".update-admin",function(){
	var id = $(this).attr('data-id');
	var token = $('#'+id).find('input[name="_token"]').val();
	var name = $('#'+id).find('input[name="name"]').val();
	var surname = $('#'+id).find('input[name="surname"]').val();
	var email = $('#'+id).find('input[name="email"]').val();
	var password = $('#'+id).find('.edit-password').val();
	var password_confirmation = $('#'+id).find('.edit-password-c').val();

	$.ajax({
        url: "/admin/editAdmin",
        dataType: "json",
        type: "POST",
        data: {'_token': token
        	,id:id
        	,name:name
        	,surname:surname
        	,email:email
        	,password:password
        	,password_confirmation:password_confirmation
        },
        success: function (data) {
        	console.log(data);
        	if($.isEmptyObject(data.error)){
        		window.location.href = current_page_url;
        	}else{
        		$('#'+id).find('.alert-danger').css("display","block");
	        	$.each( data.error, function( key, value ) {
	        		$('#'+id).find('.alert-danger').find('ul').append('<li>'+value+'</li>');
	        	});
        	}
        }
    });
});

$("body").on("click",".change-pass-user",function(){
	var id = $(this).attr('data-id');
	var password = $('#'+id+"-pass").find('.edit-password').val();
	var password_confirmation = $('#'+id+"-pass").find('.edit-password-c').val();
	var token = $('#'+id+"-pass").find('input[name="_token"]').val();

	$.ajax({
        url: "/admin/changePasswordUser",
        dataType: "json",
        type: "POST",
        data: {'_token': token
        	,id:id
        	,password:password
        	,password_confirmation:password_confirmation
        },
        success: function (data) {
        	console.log(data);
        	if($.isEmptyObject(data.error)){
        		window.location.href = current_page_url;
        	}else{
        		$('#'+id+"-pass").find('.alert-danger').css("display","block");
	        	$.each( data.error, function( key, value ) {
	        		$('#'+id+"-pass").find('.alert-danger').find('ul').append('<li>'+value+'</li>');
	        	});
        	}
        }
    });

});