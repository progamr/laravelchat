var token = $('input[name="_token"]').val();
var element = '';
var id_language = '';

function clearTable () {
	$(".element-table").find("tbody").html('');
}

function searchData () {
	var element = $(".sel-element").val();
	var id_language = $(".sel-language").val();

	if(element != '' && id_language != ''){
		$.ajax({
            url: "/admin/getTranslatedData",
            dataType: "json",
            type: "POST",
            data: {'_token': token,element:element,id_language:id_language},
            success: function (data) {
            	clearTable();
            	$.each( data.result, function( key, value ) {
            		manageTR(value);
				});
            }
        });
	}else{
		alert('Please select both Language and Element.');
	}
}

function manageTR (value) {
	var translation = 'no translation';
	var translate_id = '';

	if(value.translation != '' && value.translation != null){
		translation = value.translation;
	}

	if(value.translate_id != '' && value.translate_id != null){
		translate_id = value.translate_id;
	}

	var tr = '<tr>';
	tr = tr + '<td>'+value.name+'</td>';
	tr = tr + '<td data-rel-id="'+value.id+'" data-id="'+translate_id+'" data-value="'+translation+'"><span>'+translation+'</span></td>';
	tr = tr + '<td><button class="btn btn-primary translate-data">Translation</button></td>';
	tr = tr + '</tr>';
	$(".element-table").find("tbody").append(tr);
}

$("body").on("click",".translate-data",function(){
	var translation = $(this).parent('td').prev('td').attr("data-value");
	var edit_form = $(".row-edit-data").html();
	$(this).parent('td').prev('td').html(edit_form);
	$(this).parent('td').prev('td').find("input[name='translation']").val(translation);
});

$("body").on("click",".cancel-content",function(){
    var translation = $(this).parents('td').attr("data-value");
    $(this).parents('td').text(translation);
});

$("body").on("click",".save-content",function(){
    var current_obj = $(this); 
    var id = $(this).parents('td').attr('data-id');
    var element_id = $(this).parents('td').attr('data-rel-id');
    var translation = $(this).parents('td').find("input[name='translation']").val();
    var element = $(".sel-element").val();
	var id_language = $(".sel-language").val();

    if(translation != ''){
        $.ajax({
            url: "/admin/updateTranslatedData",
            dataType: "json",
            type: "POST",
            data: {'_token': token,element_id:element_id,translation:translation,id:id,element:element,id_language:id_language},
            success: function (data) {
                current_obj.parents('td').attr('data-id',data.result.id);
                current_obj.parents('td').attr('data-value',data.result.translation);
                current_obj.parents('td').text(data.result.translation);
            }
        });
    }
});