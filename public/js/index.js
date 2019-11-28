let username = document.getElementById("name");
let age = document.getElementById("age");
let gender = document.getElementById("gender");
let list = document.getElementById("userList");

function displayData(dataObj){
    let pos = 0;
    console.log("DisplayData()")
    dataObj.forEach(element => {
        $("#userList").append(`
        <li class="element" id="${element.id}">
            <p>${element.name}</p>
            <div>${element.age},  ${element.gender}</div>
            <button>Delete</button>
        </li>
        `)
        pos++;
    });
    
}
function getAllUsers(){
    console.log("getAllUsers()");
    $.ajax({
        url: "/api/getAll",
        method: "GET",
        dataType: "json",
        success: responseJSON => {
            console.log("Conexión Exitosa");
            if (responseJSON.status === 200){
                console.log(responseJSON);
                displayData(responseJSON.data);
            }else{
                alert("Error");
            }
        },
        error: function(err) {
            console.log("");
        }
    });
}


function addUser(name, age, gender){
    console.log("addUser()")
    $.ajax({
        url: "/api/postUser",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            user:{
                name: name,
                age: age,
                gender: gender
            }
        }),
        success: responseJSON => {
            console.log("Conexión Exitosa");
            if (responseJSON.status === 200){
                console.log(responseJSON.message);
                console.log(responseJSON.status);
                displayData(responseJSON.data);
            }else{
                console.log("Conexión else Error");
            }
        },
        error: function(err) {
            console.log("Conexión Error");
        }
    });
}

function verifyUser(){
    console.log("verifyUser()");
    $("#submitBtn").on('click', event => {
        event.preventDefault();
        let userverification = true;
        let genderverification = true;

        if(username.value.trim().length == 0){
            userverification = false;
            alert("Please add a username")
            return;
        }

        if(age.value.trim().length  == 0){
            genderverification = false;
            alert("Please add an Age")
            return;
        }
        var userGender = gender.options[gender.selectedIndex].value;
        if(userverification && genderverification){
            console.log(username.value);
            console.log(age.value)
            console.log(userGender)
            addUser(username.value, age.value, userGender);
        }
    });

}
/*
function deleteUser(id,event){
    console.log("deleteUser()")
    $.ajax({
        url: `/api/delete/${id}`,
        method: "DELETE",
        dataType: "json",
        contentType: "application/json",
        success: responseJSON => {
            console.log("Conexión Exitosa");
            if (responseJSON.status === 200){
                console.log(responseJSON.message);
                console.log(responseJSON.status);
                $(event.target).parent().remove(); 
            }
        },
        error: function(err) {
            console.log("Conexión Error");
        }
    });
}

$(".list").on("click", ".element", event => {
    event.preventDefault();
    let id =  $(event.target).parent().attr("id");
    deleteUser(id,event);
})*/


verifyUser();
//deleteUser();
getAllUsers();