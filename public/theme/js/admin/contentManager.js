var token = $('input[name="_token"]').val();

function createLanguage () {
	$('.row-language').css('display','block');
}

function cancel () {
	$('.cancel').css('display','none');
	$('.language-name').val('');
}

function saveLanguage () {
	var language = $('.language-name').val();
	if(language != ''){
        $.ajax({
            url: "/admin/addLanguage",
            dataType: "json",
            type: "POST",
            data: {'_token': token,language:language},
            success: function (data) {
            	if($.isEmptyObject(data.error)){
            		$(".language-dropdown").append('<option value='+data.result.id+'>'+language+'</option>');
	            	cancel();
            	}else{
            		alert(data.error);
            	}
            }
        });
    }
}

$(".language-dropdown").change(function(){
	$(".content-manage").css('display','block');
    var id_language = $(this).val();
    if(id_language != ''){
        $.ajax({
            url: "/admin/getLanguageContent",
            dataType: "json",
            type: "POST",
            data: {'_token': token,id_language:id_language},
            success: function (data) {
                console.log(data);
                addDefaultData(data.d);
                $.each( data.result, function( key, value ) {
                    $(".name-head").each(function(){
                        if($(this).text() == value.name){
                            $(this).next('td').text(value.value);
                            $(this).next('td').text(value.value);
                            $(this).next('td').attr('data-id',value.id);
                        }
                    });
                });
            }
        });
    }else{
        $(".dis-content").find('tbody').html('');
    }
});

function addDefaultData (data) {
    $(".dis-content").find('tbody').html('');

    $.each( data, function( key, value ) {
        var tr = '<tr>';
        tr = tr + '<td class="name-head">'+value+'</td>';
        tr = tr + '<td>NO TRANSLATION</td>';
        tr = tr + '<td><button class="btn btn-primary edit-content-td">Edit</button></td>';
        tr = tr + '</tr>';
        $(".dis-content").find('tbody').append(tr);
    });
}

$("body").on("click",".edit-content-td",function(){
    var v = $(this).parent('td').prev('td').text();
    var form = $(".row-edit-content").html();
    $(this).parent('td').prev('td').html(form);
    $(this).parent('td').prev('td').attr('data-main',v);
    $(this).parent('td').prev('td').find("input[name='value']").val(v);
});

$("body").on("click",".cancel-content",function(){
    var n = $(this).parents('td').attr('data-main');
    $(this).parents('td').text(n);
});

$("body").on("click",".save-content",function(){
    var current_obj = $(this); 
    var id = $(this).parents('td').attr('data-id');
    var value = $(this).parents('td').find("input[name='value']").val();
    var name = $(this).parents('td').prev('td').text();
    var id_language = $('.language-dropdown').val();

    if(value != ''){
        $.ajax({
            url: "/admin/updateContent",
            dataType: "json",
            type: "POST",
            data: {'_token': token,value:value,name:name,id:id,id_language:id_language},
            success: function (data) {
                current_obj.parents('td').attr('data-id',data.result.id);
                current_obj.parents('td').text(data.result.value);
            }
        });
    }
});