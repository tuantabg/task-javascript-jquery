$(document)
    .ajaxStart(function () {
        $("#loading").show();
    })
    .ajaxStop(function () {
        $("#loading").hide();
    });

$(document).ready(function() {
    getData();
});

function getData() {
    clearData();
    $("#title_form").text("Create Form");
    $.ajax({
        url: `https://60b7561317d1dc0017b89b78.mockapi.io/tasks`,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function() {console.log("error")},
        success: function (response) {
            renderData(response)
        }
    })
}

function renderData(data) {
    $("#tbody").empty();
    data.forEach((item, index) => {
        $("#tbody").append(`
            <tr>
                <th scope="row">${index +1}</th>
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td>
                    <button type="button" onclick="editProduct(${item.id})" class="btn btn-primary">Edit</button>
                    <button type="button" class="btn btn-danger" onclick="deleteProduct(${item.id})">Delete</button>
                </td>
            </tr>
        `)
    })
}

function deleteProduct(id) {
    $.ajax({
        url : `https://60b7561317d1dc0017b89b78.mockapi.io/tasks/${id}`,
        type : "DELETE",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function() {console.log("error")},
        success: function () {
            getData();
        },
    })
}

function editProduct(id) {
    if (id) {
        $("#title_form").text("Edit Form");
    }else {
        $("#title_form").text("Create Form");
    }
    $.ajax({
        url : `https://60b7561317d1dc0017b89b78.mockapi.io/tasks/${id}`,
        type : "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function() {console.log("error")},
        success: function (response) {
            renderProduct(response);
        },
    })
}

function renderProduct(data){
    $("#taskId").val(data.id);
    $("#title").val(data.title);
    $("#description").val(data.description)
}

function clearData(){
    $("#taskId").val("");
    $("#title").val("");
    $("#description").val("")
}

function saveProduct() {
    let id =  $("#taskId").val();
    let data = {
        id: id,
        title: $("#title").val(),
        description: $("#description").val()
    };
    let url = id ? `https://60b7561317d1dc0017b89b78.mockapi.io/tasks/${id}`
                 : `https://60b7561317d1dc0017b89b78.mockapi.io/tasks`;
    let type = id ? "PUT" : "POST";
    if (id){
        $.ajax({
            url : url,
            type : type,
            data: data,
            error: function() {console.log("error")},
            success: function (response) {
                getData(response);
            },
        })
    }else {
        $.ajax({
            url : url,
            type : type,
            data: data,
            error: function() {console.log("error")},
            success: function (response) {
                getData(response);
            },
        })
    }
}