var token = $('input[name="_token"]').val();

function resetSubcategoryTable () {
    $(".sub-category-main-c").css('display','block');
    $(".category-table-dis").css('display','none');
    $(".category-table-dis").find('tbody').html('');
    $(".category-name-search").val('');
	$(".subcategory").css('display','block');
	$(".subcategory").find("tbody").html('');
}

function resetSubcategoryCatTable () {
    $(".category-table-dis").css('display','inline-table');
    $(".sub-category-main-c").css('display','none');
    $(".category-table-dis").find("tbody").html('');
}

// function categoryClassNone () {
    
// }

function searchCategory () {
    var name = $(".category-name-search").val();
    resetSubcategoryTable();
    resetSubcategoryCatTable();
    if(name != ''){
        $.ajax({
            url: "/admin/getSubcategoryategory",
            dataType: "json",
            type: "POST",
            data: {'_token': token,name:name},
            success: function (data) {
                console.log(data);
                $.each( data.result, function( key, value ) {
                    addDataCategory(value);
                });
            }
        });
    }
}

$(".category-dropdown").change(function(){
	var id_category = $(this).val();
    resetSubcategoryTable();
    $(".id_category_sub").val(id_category);
	if(id_category != ''){
        $.ajax({
            url: "/admin/getSubcategoryategory",
            dataType: "json",
            type: "POST",
            data: {'_token': token,id_category:id_category},
            success: function (data) {
            	$.each( data.result, function( key, value ) {
            		addCategory(value);
            	});
            }
        });
    }
});

function addCategory (value) {
	var image = '';
	if($.trim(value.imagepath) != ''){
		image = '<img class="image" src="/images/subcategory/'+value.imagepath+'" />';
	}
	var tr = '<tr>';
	tr = tr + '<td><span onclick="getSubSubcategory(\''+value.name+'\',\''+value.id+'\')">'+value.name+'<span></td>';
	tr = tr + '<td>'+image+'</td>';
	tr = tr + '</tr>';
	$(".subcategory").find("tbody").append(tr);
}

function addDataCategory (value) {
    var tr = '<tr>';
    tr = tr + '<td><span onclick="displaySubcate(\''+value.id+'\')">'+value.name+'<span></td>';
    tr = tr + '</tr>';
    $(".category-table-dis").find("tbody").append(tr);
}

function displaySubcate (id) {
    $(".category-dropdown").val(id).change();
}

function displayNoneCategory () {
	$('.category-div').css('display','none');
}

function displayCategory () {
	$('.category-div').css('display','block');
}

function displaySubCategory () {
	$('.sub-category-div').css('display','block');
}

function displayNoneSubCategory () {
	$('.sub-category-div').css('display','none');
}

function getSubSubcategory (name, id) {
	displayNoneCategory();
	displaySubCategory();
	$('.sub-category-div').attr('data-sub-id',id);
	$(".sub-category-div").find('h2').text(name);
    $(".sub-subcategory").find("tbody").html('');
	$.ajax({
        url: "/admin/getSubcategoryategory2",
        dataType: "json",
        type: "POST",
        data: {'_token': token,id_subcategory:id},
        success: function (data) {
        	$.each( data.result, function( key, value ) {
        		addSubSubCategory(value);
        	});
        }
    });
}

function onBack () {
	displayCategory();
	displayNoneSubCategory();
	$('.sub-category-div').attr('data-sub-id','');
}

function addSubSubCategory (value) {
	var tr = '<tr>';
	tr = tr + '<td><span>'+value.name+'<span></td>';
	tr = tr + '<td>'+value.description+'</td>';
	tr = tr + '</tr>';
	$(".sub-subcategory").find("tbody").append(tr);
}

function createSubSub () {
	$(".row-add-sub-sub").css('display','block');
}

function cancel () {
	$(".cancel").css('display','none');
}

function saveSubSub () {
	var id_subcategory = $('.sub-category-div').attr('data-sub-id');
	var name = $(".sub-sub-name").val();
	var description = $(".sub-sub-des").val();
	if(name != ''){
        $.ajax({
            url: "/admin/addSubcategoryategory2",
            dataType: "json",
            type: "POST",
            data: {'_token': token,id_subcategory:id_subcategory,name:name,description:description},
            success: function (data) {
            	if($.isEmptyObject(data.error)){
	            	addSubSubCategory(data.result);
	            	clearData();
	            	cancel();
            	}else{
            		alert(data.error);
            	}
            }
        });
    }
}

function clearData () {
	var name = $("input[name='name']").val('');
	var description = $("input[name='description']").val('');
}

function createCategory () {
	$(".row-category").css('display','block');
}

function saveCategory () {
	var name = $(".category-name").val();
	if(name != ''){
        $.ajax({
            url: "/admin/addCategory",
            dataType: "json",
            type: "POST",
            data: {'_token': token,name:name},
            success: function (data) {
            	if($.isEmptyObject(data.error)){
            		$(".category-dropdown").append('<option value='+data.result.id+'>'+name+'</option>');
	            	clearData();
	            	cancel();
            	}else{
            		alert(data.error);
            	}
            }
        });
    }
}

function createSub () {
	$(".row-sub-category").css('display','block');
}

// $('body').on('click','.submit-sub',function(e){
// 	e.preventDefault();
// 	var Nome = $(".sub-category-name").val();
// 	alert(Nome);
// 	if(Nome != ''){
// 		$(this).parent('form').submit();
// 	}
// });