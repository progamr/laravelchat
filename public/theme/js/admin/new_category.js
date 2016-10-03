var token = $('input[name="_token"]').val();

function cancel () {
    $('input[name="name"]').val('');    
    $('input[name="title"]').val('');    
    $('input[name="subtitle"]').val('');    
    $('select[name="level"]').val('');    
    $('.subcategory3-note').val('');    
}

function saveCategory (flag) {
    var fl_con = 0;
    if(flag == 'addCategory'){
       var name = $(".category-name").val();
       var data_obj = {'_token': token,name:name};
    }else if(flag == 'addSubCategory2new'){
	   var name = $(".sub-category2-name").val();
       var id_subcategory = $(".subcategory-display").attr("data-id");
       var data_obj = {'_token': token,name:name,id_subcategory:id_subcategory};
    }else if(flag == 'addSubCategory3'){
       var name = $(".subcategory3-name").val();
       var title = $(".subcategory3-title").val();
       var subtitle = $(".subcategory3-subtitle").val();
       var note = $(".subcategory3-note").val();
       var id_subcategory2 = $(".subcategory3-display").attr("data-id");
       var data_obj = {'_token': token,name:name,id_subcategory2:id_subcategory2,title:title,subtitle:subtitle,note:note};
    }else if(flag == 'addOption'){
       var name = $(".option-name").val();
       var id_subcategory3 = $(".option-display").attr("data-id");
       var data_obj = {'_token': token,value:name,id_subcategory3:id_subcategory3}; 
    }else{
       var name = $(".subcategory-name").val();
       var level = $(".add-level").val();
       if(level == ''){
        fl_con = 1;        
       }
       var id_category = $(".subcategory-display").attr("data-id");
       var data_obj = {'_token': token,name:name,level:level};
    }

    if(name != '' && fl_con == '0'){
        $.ajax({
            url: "/admin/"+flag,
            dataType: "json",
            type: "POST",
            data: data_obj,
            success: function (data) {
            	if($.isEmptyObject(data.error)){
                    if(flag == 'addCategory'){
                        addCategoryTR(data.result);
                    }else if(flag == 'addSubCategory2new'){
                        addSubategory2(data.result);
                    }else if(flag == 'addSubCategory3'){
                        addSubategory3(data.result);
                    }else if(flag == 'addOption'){
                        addOption(data.result);
                    }else{
                        addSubategory(data.result);
                    }
	            	cancel();
            	}else{
            		alert(data.error);
            	}
            }
        });
    }
}

function addCategoryTR (value) {
    var tr = '<tr class="category-'+value.id+'">';
    tr = tr + '<td data-id="'+value.id+'" data-value="'+value.name+'" class="cat-name-td"><span>'+value.name+'<span></td>';
    tr = tr + '<td>';
    tr = tr + '<button class="btn btn-info" onclick="editData(\''+value.id+'\',\'category\')" style="margin-right:4px;">Change Name</button>';
    tr = tr + '<button class="btn btn-primary" onclick="showSubcategory(\''+value.id+'\',\''+value.name+'\')" style="margin-right:4px;">Edit</button>';
    tr = tr + '<button class="btn btn-danger" onclick="deleteData(\''+value.id+'\',\'category\')">Delete</button>';
    tr = tr + '</td>';
    tr = tr + '</tr>';
    $(".category-table").find("tbody").append(tr);
}

function deleteData (id, flag) {
    var msg = 'Are you sure want to delete ' + flag + '?';
    if(confirm(msg)){
        $.ajax({
            url: "/admin/remove" + flag,
            dataType: "json",
            type: "POST",
            data: {'_token': token,id:id},
            success: function (data) {
                if($.isEmptyObject(data.error)){
                    if(flag == 'category'){
                        $(".category-"+id).remove();
                    }else if(flag == 'subcategory'){
                        $(".subcategory-"+id).remove();
                    }else if(flag == 'subcategory2'){
                        $(".subcategory2-"+id).remove();
                    }else if(flag == 'subcategory3'){
                        $(".subcategory3-"+id).remove();
                    }else if(flag == 'option'){
                        $(".option-"+id).remove();
                    }
                }else{
                    alert(data.error);
                }
            }
        });
    }
}

function editData (id, flag) {
    if (flag == 'category') {
        var edit_form = $(".edit-category-form").html();
        var name = $(".category-"+id).find('.cat-name-td').attr('data-value');
        $(".category-"+id).find('.cat-name-td').html(edit_form);
        $(".category-"+id).find('.cat-name-td').find("input[name='name']").val(name);
    }else if(flag == 'subcategory'){
        var edit_form = $(".edit-subcategory-form").html();
        var name = $(".subcategory-"+id).find('.subcat-name-td').attr('data-value');
        var level = $(".subcategory-"+id).find('.subcat-name-td').attr('data-level');
        $(".subcategory-"+id).find('.subcat-name-td').html(edit_form);
        $(".subcategory-"+id).find('.subcat-name-td').find("input[name='name']").val(name);
        if(level != '0'){
            $(".subcategory-"+id).find('.subcat-name-td').find("select[name='level']").val(level);
        }
    }else if(flag == 'subcategory2'){
        var edit_form = $(".edit-subcategory2-form").html();
        var name = $(".subcategory2-"+id).find('.subcat2-name-td').attr('data-value');
        var id = $(".subcategory2-"+id).find('.subcat2-name-td').attr('data-id');
        $(".subcategory2-"+id).find('.subcat2-name-td').html(edit_form);
        $(".subcategory2-"+id).find('.subcat2-name-td').find("input[name='name']").val(name);
        $(".subcategory2-"+id).find('.subcat2-name-td').find("input[name='id']").val(id);
    }else if(flag == 'option'){
        var edit_form = $(".edit-option-form").html();
        var name = $(".option-"+id).find('.option-name-td').attr('data-value');
        var id = $(".option-"+id).find('.option-name-td').attr('data-id');
        $(".option-"+id).find('.option-name-td').html(edit_form);
        $(".option-"+id).find('.option-name-td').find("input[name='name']").val(name);
        $(".option-"+id).find('.option-name-td').find("input[name='id']").val(id);
    }
}

function editDataSubcategory3 (id, flag) {
    var edit_form = $(".edit-subcategory3-form").html();
    var name = $("."+flag+"-dis").attr('data-value');
    console.log(flag);
    console.log(name);
    $("."+flag+"-dis").html(edit_form);
    $("."+flag+"-dis").find("input[name='name']").val(name);
}

$("body").on("click",".cancel-edit",function(){
    var name = $(this).parents('td').attr("data-value");
    $(this).parents('td').html('<span>'+name+'</span>');
});

$("body").on("click",".cancel-edit-3",function(){
    var id_subcategory3 = $(".option-display").attr("data-id");

    if($(this).parents('.com').hasClass("name-dis")){
        var name = $('.name-dis').attr("data-value");
        var c = 'name';
    }else if($(this).parents('.com').hasClass("title-dis")){
        var name = $('.title-dis').attr("data-value");
        var c = 'title';
    }else if($(this).parents('.com').hasClass("subtitle-dis")){
        var name = $('.subtitle-dis').attr("data-value");
        var c = 'subtitle';
    }else if($(this).parents('.com').hasClass("note-dis")){
        var name = $('.note-dis').attr("data-value");
        var c = 'note';
    }

    $(this).parents('.com').html('<span>Name : ' + name + '<span><br/><button class="btn btn-info" onclick="editDataSubcategory3(\''+id_subcategory3+'\',\''+c+'\')" style="margin-right:4px;">Change '+c+'</button>');
});

$("body").on("click",".update-data",function(){
    var current_obj = $(this);
    var if_flag = 0;
    var id = $(this).parents('td').attr("data-id");
    var par = {'_token': token,id:id,name:name};
    if($(this).parents("tr").hasClass("category-"+id)){
        var name = $(".category-"+id).find('.cat-name-td').find("input[name='name']").val();
        var par = {'_token': token,id:id,name:name};
        var flag = 'category';
    }else if($(this).parents("tr").hasClass("subcategory2-"+id)){
        var name = $(".subcategory2-"+id).find('.subcat2-name-td').find("input[name='name']").val();
        var par = {'_token': token,id:id,name:name};
        var flag = 'addSubCategory2newEdit';
    }else if($(this).parents("tr").hasClass("subcategory-"+id)){
        var name = $(".subcategory-"+id).find('.subcat-name-td').find("input[name='name']").val();
        var level = $(".subcategory-"+id).find('.subcat-name-td').find("select[name='level']").val();
        if(level == ''){
            if_flag = 1;
        }
        par = {'_token': token,id:id,name:name,level:level};
        var flag = 'subcategory';
    }else if($(this).parents("tr").hasClass("subcategory3-"+id)){
        var name = $(".subcategory3-"+id).find('.subcat3-name-td').find("input[name='name']").val();
        var flag = 'subcategory3';
        var par = {'_token': token,id:id,name:name};
    }else if($(this).parents("tr").hasClass("option-"+id)){
        var name = $(".option-"+id).find('.option-name-td').find("input[name='name']").val();
        var flag = 'option';
        var par = {'_token': token,id:id,name:name};
    }else{
        var id_subcategory3 = $(".option-display").attr("data-id");
        var flag = 'subcategory3';
        if($(this).parents('.com').hasClass("name-dis")){
            var name = $(this).parents('.com').find("input[name='name']").val();
            par = {'_token': token,id:id_subcategory3,name:name};
            var c = 'name';
        }else if($(this).parents('.com').hasClass("title-dis")){
            var name = $(this).parents('.com').find("input[name='name']").val();
            par = {'_token': token,id:id_subcategory3,title:name};
            var c = 'title';
        }else if($(this).parents('.com').hasClass("subtitle-dis")){
            var name = $(this).parents('.com').find("input[name='name']").val();
            par = {'_token': token,id:id_subcategory3,subtitle:name};
            var c = 'subtitle';
        }else if($(this).parents('.com').hasClass("note-dis")){
            var name = $(this).parents('.com').find("input[name='name']").val();
            par = {'_token': token,id:id_subcategory3,note:name};
            var c = 'note';
        }
    }

    if (name != '' && if_flag == '0') {
        $.ajax({
            url: "/admin/edit" + flag,
            dataType: "json",
            type: "POST",
            data: par,
            success: function (data) {
                if(flag == 'category'){
                    $(".category-"+id).find('.cat-name-td').html('<span>'+name+'</span>');
                    $(".category-"+id).find('.cat-name-td').attr('data-value',name);
                }else if(flag == 'addSubCategory2newEdit'){
                    $(".subcategory2-"+id).find('.subcat2-name-td').html('<span>'+name+'</span>');
                    $(".subcategory2-"+id).find('.subcat2-name-td').attr('data-value',name);
                }else if(flag == 'subcategory'){
                    $(".subcategory-"+id).find('.subcat-name-td').html('<span>'+name+'</span>');
                    $(".subcategory-"+id).find('.subcat-name-td').attr('data-value',name);
                    $(".subcategory-"+id).find('.subcat-name-td').next('td').html('<span>'+level+'</span>');
                    $(".subcategory-"+id).find('.subcat-name-td').attr('data-level',level);
                }else if(flag == 'subcategory3'){
                    $("."+c+"-dis").html('<span>Name : ' + name + '<span><br/><button class="btn btn-info" onclick="editDataSubcategory3(\''+id_subcategory3+'\',\''+c+'\')" style="margin-right:4px;">Change '+c+'</button>');
                    $("."+c+"-dis").attr('data-value',name);
                }else if(flag == 'option'){
                    $(".option-"+id).find('.option-name-td').html('<span>'+name+'</span>');
                    $(".option-"+id).find('.option-name-td').attr('data-value',name);
                }
            }
        });
    };
});

function showSubcategory (id, name) {
    $(".category-display").css("display","none");
    $(".subcategory-display").css("display","block");
    $(".subcategory-display").attr("data-id",id);
    var name = $('.category-'+id).find('.cat-name-td').attr('data-value');
    $(".subcategory-display").attr("data-category",name);
    $(".subcategory-display").find("h2").find("span").text(name);
    var id_category = id;
    resetTable('subcategory-table');

    if(id_category != ''){
        $.ajax({
            url: "/admin/getSubcategoryategory",
            dataType: "json",
            type: "POST",
            data: {'_token': token,id_category:id_category},
            success: function (data) {
                $.each( data.result, function( key, value ) {
                    addSubategory(value);
                });
            }
        });
    }
}

function addSubategory (value) {
    var tr = '<tr class="subcategory-'+value.id+'">';
    tr = tr + '<td data-id="'+value.id+'" data-level="'+value.level+'" data-value="'+value.name+'" class="subcat-name-td"><span>'+value.name+'<span></td>';
    tr = tr + '<td>'+value.level+'</td>';
    tr = tr + '<td>';
    tr = tr + '<button class="btn btn-info" onclick="editData(\''+value.id+'\',\'subcategory\')" style="margin-right:4px;">Change Name/Level</button>';
    tr = tr + '<button class="btn btn-primary" onclick="showSubcategory2(\''+value.id+'\',\''+value.name+'\')" style="margin-right:4px;">Edit</button>';
    tr = tr + '<button class="btn btn-danger" onclick="deleteData(\''+value.id+'\',\'subcategory\')">Delete</button>';
    tr = tr + '</td>';
    tr = tr + '</tr>';
    $(".subcategory-table").find("tbody").append(tr);
}

function backView (active) {
    $(".category-display").css("display","none");
    $(".subcategory-display").css("display","none");
    $(".subcategory2-display").css("display","none");
    $(".subcategory3-display").css("display","none");
    $(".option-display").css("display","none");
    $("."+active).css("display","block");
}

function resetSubcategoryTable () {
    $(".subcategory-table").find("tbody").html('');
}

function resetTable (table) {
    $("."+table).find("tbody").html('');
}

function showSubcategory2 (id, name) {
    backView('subcategory2-display');
    tmp_name = name;
    $(".subcategory2-display").attr("data-id",id);
    var name = $('.subcategory-'+id).find('.subcat-name-td').attr('data-value');
    var category_name = $(".subcategory-display").attr("data-category");
    if(typeof name == "undefined"){
        name = tmp_name;
    }
    $(".subcategory2-display").attr("data-category2",name);

    $("input[name='id_subcategory']").val(id);
    $(".subcategory2-display").find("h2").find("span").text(name);

    resetTable('subcategory2-table');
    var id_subcategory = id;

    if(id_subcategory != ''){
        $.ajax({
            url: "/admin/getSubcategoryategory2",
            dataType: "json",
            type: "POST",
            data: {'_token': token,id_subcategory:id_subcategory},
            success: function (data) {
                $.each( data.result, function( key, value ) {
                    addSubategory2(value);
                });

            }
        });
    }
}

function addSubategory2 (value) {
    var image = '';
    if($.trim(value.imagepath) != ''){
       image = '<img class="image" src="/images/subcategory/'+value.imagepath+'" />';
    }

    var tr = '<tr class="subcategory2-'+value.id+'">';
    tr = tr + '<td data-id="'+value.id+'" data-value="'+value.name+'" class="subcat2-name-td"><span>'+value.name+'<span></td>';
    tr = tr + '<td>'+image+'</td>';
    tr = tr + '<td>';
    tr = tr + '<button class="btn btn-info" onclick="editData(\''+value.id+'\',\'subcategory2\')" style="margin-right:4px;">Change Name/Image</button>';
    tr = tr + '<button class="btn btn-primary" onclick="showSubcategory3(\''+value.id+'\',\''+value.name+'\')" style="margin-right:4px;">Edit</button>';
    tr = tr + '<button class="btn btn-danger" onclick="deleteData(\''+value.id+'\',\'subcategory2\')">Delete</button>';
    tr = tr + '</td>';
    tr = tr + '</tr>';
    $(".subcategory2-table").find("tbody").append(tr);
}

function showSubcategory3 (id, name) {
    backView('subcategory3-display');
    tmp_name = name;
    
    var name = $('.subcategory2-'+id).find('.subcat2-name-td').attr('data-value');
    var category_name = $(".subcategory-display").attr("data-category");
    var subcategory2_name = $(".subcategory2-display").attr("data-category2");
    $(".id_category2_sub").val(id);
    if(typeof name == "undefined"){
        name = tmp_name;
    }
    $(".subcategory3-display").find("h2").find("span").text(subcategory2_name+ '/' + name);

    $(".subcategory3-display").attr("data-id",id);
    $(".subcategory3-display").attr("data-category3",name);

    resetTable('subcategory3-table');
    if(id != ''){
        $.ajax({
            url: "/admin/getSubcategory3",
            dataType: "json",
            type: "POST",
            data: {'_token': token,id_subcategory2:id},
            success: function (data) {
                $.each( data.result, function( key, value ) {
                    addSubategory3(value);
                });
            }
        });
    }
}

function addSubategory3 (value) {
    var tr = '<tr class="subcategory3-'+value.id+'">';
    tr = tr + '<td data-id="'+value.id+'" data-value="'+value.name+'" class="subcat3-name-td"><span>'+value.name+'<span></td>';
    tr = tr + '<td>'+value.title+'</td>';
    tr = tr + '<td>'+value.subtitle+'</td>';
    tr = tr + '<td>'+value.note+'</td>';
    tr = tr + '<td>';
    // tr = tr + '<button class="btn btn-info" onclick="editData(\''+value.id+'\',\'subcategory3\')" style="margin-right:4px;">Change Name</button>';
    tr = tr + '<button class="btn btn-primary" onclick="showOptions(\''+value.id+'\',\''+value.name+'\')" style="margin-right:4px;">Edit</button>';
    tr = tr + '<button class="btn btn-danger" onclick="deleteData(\''+value.id+'\',\'subcategory3\')">Delete</button>';
    tr = tr + '</td>';
    tr = tr + '</tr>';
    $(".subcategory3-table").find("tbody").append(tr);
}

function showOptions (id, name) {
    backView('option-display');

    var name = $('.subcategory3-'+id).find('.subcat3-name-td').attr('data-value');
    var category_name = $(".subcategory-display").attr("data-category");
    var subcategory2_name = $(".subcategory2-display").attr("data-category2");
    var subcategory3_name = $(".subcategory3-display").attr("data-category3");
    $(".option-display").find("h2").find("span").text(subcategory2_name+ '/' +subcategory3_name+ '/' + name);

    $(".option-display").attr("data-id",id);

    resetTable('option-table');
    if(id != ''){
        $.ajax({
            url: "/admin/getOptions",
            dataType: "json",
            type: "POST",
            data: {'_token': token,id_subcategory3:id},
            success: function (data) {
                $.each( data.result, function( key, value ) {
                    addOption(value);
                });
                $(".name-dis").html('<span>Name : ' + data.subcat.name + '<span><br/><button class="btn btn-info" onclick="editDataSubcategory3(\''+data.subcat.id+'\',\'name\')" style="margin-right:4px;">Change Name</button>');
                $(".name-dis").attr('data-value',data.subcat.name);
                $(".title-dis").html('<span>Title: ' + data.subcat.title + '<span><br/><button class="btn btn-info" onclick="editDataSubcategory3(\''+data.subcat.id+'\',\'title\')" style="margin-right:4px;">Change Title</button>');
                $(".title-dis").attr('data-value',data.subcat.title);
                $(".subtitle-dis").html('<span>Subtitle: ' + data.subcat.subtitle + '<span><br/><button class="btn btn-info" onclick="editDataSubcategory3(\''+data.subcat.id+'\',\'subtitle\')" style="margin-right:4px;">Change SubTitle</button>');
                $(".subtitle-dis").attr('data-value',data.subcat.subtitle);
                $(".note-dis").html('<span>Note: ' + data.subcat.note + '<span><br/><button class="btn btn-info" onclick="editDataSubcategory3(\''+data.subcat.id+'\',\'note\')" style="margin-right:4px;">Change Note</button>');
                $(".note-dis").attr('data-value',data.subcat.note);
            }
        });
    }
}

function addOption (value) {
    var tr = '<tr class="option-'+value.id+'">';
    tr = tr + '<td data-id="'+value.id+'" data-value="'+value.value+'" class="option-name-td"><span>'+value.value+'<span></td>';
    tr = tr + '<td>';
    tr = tr + '<button class="btn btn-info" onclick="editData(\''+value.id+'\',\'option\')" style="margin-right:4px;">Change Name</button>';
    tr = tr + '<button class="btn btn-danger" onclick="deleteData(\''+value.id+'\',\'option\')">Delete</button>';
    tr = tr + '</td>';
    tr = tr + '</tr>';
    $(".option-table").find("tbody").append(tr);
}

$("body").on("click",".change-image",function(){
    $(".image-disp-part").css("display","none");
    $(".image-form-part").css("display","block");
});

$("body").on("click",".cancel-edit-image",function(e){
    e.preventDefault();
    $(".image-disp-part").css("display","block");
    $(".image-form-part").css("display","none");
});
$("body").on("click",".prevent-def",function(e){
    e.preventDefault();
});
