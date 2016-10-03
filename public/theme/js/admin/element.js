var token = $('input[name="_token"]').val();

function cancel () {
  $('input[name="name"]').val('');
  $('input[name="title"]').val('');
  $('input[name="subtitle"]').val('');
  $("select[name='level']").val('');
  $('.note').val('');
}

function addElementData (flag) {    
    var name = $(".add-"+flag+"-form").find("input[name='name']").val();
    var flag_if = 0;
    if(flag == "subelement"){
        var id_elem = $(".subelement-display").attr('data-id');
        var title = $(".add-"+flag+"-form").find("input[name='title']").val();
        var subtitle = $(".add-"+flag+"-form").find("input[name='subtitle']").val();
        var note = $(".add-"+flag+"-form").find(".note").val();
        var param = {'_token': token,name:name,flag:flag,id_elem:id_elem,title:title,subtitle:subtitle,note:note};
    }else if(flag == 'element'){
        var level = $(".add-"+flag+"-form").find("select[name='level']").val();
        if(level == ''){
            flag_if = 1;
        }
        var param = {'_token': token,name:name,flag:flag,level:level};
    }

    if(name != '' && flag_if == '0'){
        $.ajax({
            url: "/admin/addElementData",
            dataType: "json",
            type: "POST",
            data: param,
            success: function (data) {
            	if($.isEmptyObject(data.error)){
                AddTR(flag,data.result);
	            	cancel();
            	}else{
            		alert(data.error);
            	}
            }
        });
    }
}

function AddTR (flag,value) {
    var tmp_flag = flag;
    if(flag == 'element'){
        tmp_flag = 'subelement';
    }else if(flag == 'subelement'){
        tmp_flag = 'subelement_image';
    }
  var tr = '<tr class="'+flag+'-'+value.id+'">';
    if(flag == 'subelement_image'){
        tr = tr + '<td class="data-class"><span><img class="image" src="/images/subcategory/'+value.path+'" /><span></td>';
        tr = tr + '<td>';
        tr = tr + '<button class="btn btn-danger" onclick="deleteElementData(\''+value.id+'\',\''+flag+'\')">Delete</button>';
        tr = tr + '</td>';
    }else{
        if(flag == 'subelement'){
            tr = tr + '<td data-id="'+value.id+'" data-note="'+value.note+'" data-subtitle="'+value.subtitle+'" data-title="'+value.title+'" data-value="'+value.name+'" class="data-class td-name"><span>'+value.name+'<span></td>';
            tr = tr + '<td class="td-title">' + value.title + '</td>';    
            tr = tr + '<td class="td-subtitle">' + value.subtitle + '</td>';    
            tr = tr + '<td class="td-note">' + value.note + '</td>';    
        }else{
            tr = tr + '<td data-id="'+value.id+'" data-level="'+value.level+'" data-value="'+value.name+'" class="data-class"><span>'+value.name+'<span></td>';
            tr = tr + '<td>' + value.level + '</td>';
            tr = tr + '<td>';
            tr = tr + '<button class="btn btn-info" onclick="editElementData(\''+value.id+'\',\''+flag+'\')" style="margin-right:4px;">Change Name</button>';
        }
        if(flag == 'subelement'){
            tr = tr + '<td>';
            tr = tr + '<button class="btn btn-info" onclick="editElementData(\''+value.id+'\',\'subelement\')" style="margin-right:4px;">Change Name/Level</button>';
            // tr = tr + '<button class="btn btn-info" onclick="editElementDataSub(\''+value.id+'\',\'title\')" style="margin-right:4px;">Change Title</button>';
            // tr = tr + '<button class="btn btn-info" onclick="editElementDataSub(\''+value.id+'\',\'subtitle\')" style="margin-right:4px;">Change Subtitle</button>';
            // tr = tr + '<button class="btn btn-info" onclick="editElementDataSub(\''+value.id+'\',\'note\')" style="margin-right:4px;">Change Note</button>';
        }        
        tr = tr + '<button class="btn btn-primary" onclick="showElementData(\''+value.id+'\',\''+tmp_flag+'\')" style="margin-right:4px;">Edit</button>';
        tr = tr + '<button class="btn btn-danger" onclick="deleteElementData(\''+value.id+'\',\''+flag+'\')">Delete</button>';
        tr = tr + '</td>';
    }
    tr = tr + '</tr>';
    $("."+flag+"-table").find("tbody").append(tr);
}

function deleteElementData (id,flag) {
  var msg = 'Are you sure want to delete this ' + flag + '?';
  if(confirm(msg)){
    $.ajax({
        url: "/admin/removeElementData",
        dataType: "json",
        type: "POST",
        data: {'_token': token,id:id,flag:flag},
        success: function (data) {
            if($.isEmptyObject(data.error)){
                $("."+flag+"-"+id).remove();
            }else{
                alert(data.error);
            }
        }
    });
  }
}

function editElementData (id, flag) {
    var edit_form = $(".edit-"+flag+"-form").html();
    if(flag == 'subelement'){
        var title = $("."+flag+"-"+id).find(".data-class").attr('data-title');    
        var subtitle = $("."+flag+"-"+id).find(".data-class").attr('data-subtitle');    
        var note = $("."+flag+"-"+id).find(".data-class").attr('data-note');    
    }else if(flag == 'element'){
        var level = $("."+flag+"-"+id).find(".data-class").attr('data-level');
    }
    var name = $("."+flag+"-"+id).find(".data-class").attr('data-value');
    $("."+flag+"-"+id).find(".data-class").html(edit_form);
    $("."+flag+"-"+id).find(".data-class").find("input[name='name']").val(name);
    if(flag == 'subelement'){
        $("."+flag+"-"+id).find(".data-class").find("input[name='title']").val(title);
        $("."+flag+"-"+id).find(".data-class").find("input[name='subtitle']").val(subtitle);
        $("."+flag+"-"+id).find(".data-class").find(".edit-note").val(note);
    }else if(flag == 'element'){
        var level = level == '0' ? '' : level;
        $("."+flag+"-"+id).find(".data-class").find("select[name='level']").val(level);
    }
}

function editElementDataSub (id, flag) {
    var edit_form = $(".edit-subelement-form").html();
    var name = $(".subelement-"+id).find(".data-class").attr('data-' + flag);
    $(".subelement-"+id).find(".td-" + flag).html(edit_form);
    $(".subelement-"+id).find(".td-" + flag).find("input[name='name']").val(name);
    $(".subelement-"+id).find(".cancel-edit-subelemt").attr('data-flag',flag);
}

$("body").on("click",".cancel-edit",function(){
    var name = $(this).parents('td').attr("data-value");
    $(this).parents('td').html(name);
});

$("body").on("click",".cancel-edit-subelemt",function(){
    var data_flag = $(this).attr('data-flag');
    var name = $(this).parents('tr').find(".data-class").attr("data-" + data_flag);
    $(this).parents('td').html(name);
});

$("body").on("click",".update-data",function(){
    var id = $(this).parents('tr').find(".data-class").attr("data-id");
    var flag_if = 0;

    if($(this).parents("tr").hasClass("element-"+id)){
      var flag = 'element';
      var name = $("."+flag+"-"+id).find(".data-class").find("input[name='name']").val();
      var level = $("."+flag+"-"+id).find(".data-class").find("select[name='level']").val();
      flag_if = level == '' ? 1 : 0;
      var param = {'_token': token,id:id,flag:flag,name:name,level:level};
    }else if($(this).parents("tr").hasClass("subelement-"+id)){
      var flag = 'subelement';
      var name = $("."+flag+"-"+id).find(".data-class").find("input[name='name']").val();
      var title = $("."+flag+"-"+id).find(".data-class").find("input[name='title']").val();
      var subtitle = $("."+flag+"-"+id).find(".data-class").find("input[name='subtitle']").val();
      var note = $("."+flag+"-"+id).find(".data-class").find(".edit-note").val();
      var param = {'_token': token,id:id,flag:flag,name:name,title:title,subtitle:subtitle,note:note};
    }

    if (name != '' && flag_if == '0') {
        $.ajax({
            url: "/admin/editElementData",
            dataType: "json",
            type: "POST",
            data: param,
            success: function (data) {
                if(flag == "subelement"){
                  $(".subelement-"+id).find(".td-title").html(title);
                  $("."+flag+"-"+id).find(".data-class").attr('data-title',title);
                  $(".subelement-"+id).find(".td-subtitle").html(title);
                  $("."+flag+"-"+id).find(".data-class").attr('data-subtitle',subtitle);
                  $(".subelement-"+id).find(".td-note").html(note);
                  $("."+flag+"-"+id).find(".data-class").attr('data-note',note);
                }else if(flag == "element"){
                    $("."+flag+"-"+id).find(".data-class").next("td").html(level);
                    $("."+flag+"-"+id).find(".data-class").attr('data-level',level);    
                }
                $("."+flag+"-"+id).find(".data-class").html(name);
                $("."+flag+"-"+id).find(".data-class").attr('data-value',name);
            }
        });
    };

});

function backView (active) {
    $(".element-display").css("display","none");
    $(".subelement-display").css("display","none");
    $(".subelement_image-display").css("display","none");
    $("."+active).css("display","block");
}

function showElementData (id, flag) {
    if(flag == 'subelement'){
      backView("subelement-display");
      var element = $(".element-"+id).find(".data-class").attr('data-value');
      $(".subelement-display").find('h2').find('span').text(element);
      $(".subelement-display").attr('data-id',id);
      $(".subelement-display").attr('data-name',element);
    }else if(flag == 'subelement_image'){
        backView("subelement_image-display");
        var subelement = $(".subelement-"+id).find(".data-class").attr('data-value');
        var element = $(".subelement-display").attr('data-name');
        $(".id_subelem").val(id);
        if(typeof subelement == "undefined"){
            subelement = $(".subelement_image-display").attr('data-name');
        }
        $(".subelement_image-display").find('h2').find('span').text(element+"/"+subelement);
    }

    $("."+flag+"-table").find("tbody").html('');

    $.ajax({
        url: "/admin/showElementData",
        dataType: "json",
        type: "POST",
        data: {'_token': token,id:id,flag:flag},
        success: function (data) {
          if($.isEmptyObject(data.error)){
            $.each( data.result, function( key, value ) {
                AddTR(flag,value);
            });
          }else{
            alert(data.error);
          }
        }
    });

}