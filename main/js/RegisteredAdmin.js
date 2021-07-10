
function UserIdGenerator() {
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    let Users = JSON.parse(localStorage.getItem("Users"));
    let Value_length = Users.length
    let Value = Users[Value_length - 1].UserID;
    let Value_split = Value.split("-");
    let Parsing = parseInt(Value_split[2]) + 1;
    return "user-" + DateNow + "-" + Parsing.toString();
}   
function UserObject(user_id, fname, lname, gmail, password) {
    let myUser = {
        UserID: user_id,
        Fname: fname,
        Lname: lname,
        Gmail: gmail,
        Password: password
    }

    return myUser;
}
function ShowPassword(){
    let pass = document.querySelector('#PasswordIdEdit');
    if (pass.type == "password") {
        pass.type = "text"
    } else {
        pass.type = "password"
    }
}
function ShowConfirmPassword() {

    let confirmpass = document.querySelector('#ConfirmIdEdit');

    if (confirmpass.type == "password"){
        confirmpass.type = "text"
    }else{
        confirmpass.type = "password"
    }
}

function AddShowPassword() {
    let pass = document.querySelector('#PasswordAdd');
    if (pass.type == "password") {
        pass.type = "text"
    } else {
        pass.type = "password"
    }
}
function AddShowConfirmPassword() {

    let confirmpass = document.querySelector('#ConfirmPassAdd');

    if (confirmpass.type == "password") {
        confirmpass.type = "text"
    } else {
        confirmpass.type = "password"
    }
}
function OutputTableAdmin(){
    let tableBody = document.querySelector('#RegisteredAdminTableBody');
    let Users = JSON.parse(localStorage.getItem("Users"));
    let USERID = sessionStorage.getItem('USERID');
    for (let x = 0; x < Users.length; x++ ){ 

        if (USERID == Users[x].UserID ){
            continue;
        }else{

      
        tableBody.insertAdjacentHTML('beforeend',
            `
            <tr>
            <td class="text-center">${Users[x].UserID}</td>
            <td class="text-center">${Users[x].Fname}</td>
            <td class="text-center">${Users[x].Lname}</td>
            <td class="text-center">${Users[x].Gmail}</td>
            <td class="d-flex justify-content-center"><button class="btn btn-info AdminEditTable" > <i class="fas fa-edit"></i></button>
                                                    <button class="btn btn-danger AdminDeleteTable"> <i class="fas fa-trash"></i></button></td>
            </tr>
            `
        )

        }
    }
   
}

$(document).ready(function () {
    $('.AdminEditTable').on('click', function () {
        $('#EdithAdminModal').modal('show');

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data);

        $('#AdminIdEdit').val(data[0]);
        $('#FirstnameIdEdit').val(data[1]);
        $('#LastnameIdEdit').val(data[2]);
        $('#EmailIdEdit').val(data[3]);
       
    });
});

$(document).ready(function () {
    $('.AdminDeleteTable').on('click', function () {
       

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data);
        let Users = JSON.parse(localStorage.getItem("Users"));
       
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {    
                const idToRemove = data[0];
                const filteredPeople = Users.filter((item) => item.UserID !== idToRemove);
                localStorage.setItem("Users", JSON.stringify(filteredPeople));
                Swal.fire({
                    title: 'Successfully',
                    text: "DELETED",
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) { 
                        location.reload();
                    }
                }) 
            }
        })
    });
});



$(document).ready(function () {
    $('#ADMINSAVECHANGES').on('click', function (e) {
        const formValid = this.form.checkValidity();
        if (formValid){
            let userId = $('#AdminIdEdit').val();
            let fname = $('#FirstnameIdEdit').val();
            let lname = $('#LastnameIdEdit').val();
            let email = $('#EmailIdEdit').val();
            let Newpass = $('#PasswordIdEdit').val();
            let Confirmpass = $('#ConfirmIdEdit').val();
            let Users = JSON.parse(localStorage.getItem("Users"));
            let IsNotSame = true;
            let IS_Where = 0;
            e.preventDefault();
            if (Newpass.length != 0 || Confirmpass.length !=0 ){
              
                if (Newpass != Confirmpass ){
                    Swal.fire({
                        title: "Error",
                        text: "Password Does Not Match",
                        type: "error",
                    })
                }else{
              
                if (Newpass.length < 9){
                    Swal.fire({
                        title: "Error",
                        text: "Weak Password",
                        type: "error",
                    })
                }else{
                    for (let i = 0; i < Users.length; i++ ){
                        if (Users[i].UserID != userId && Users[i].Gmail == email )  { 
                            IsNotSame = false; 
                            break;                           
                        } else if (Users[i].UserID == userId ) {
                            IS_Where = i;
                        }
                    }

                    if (IsNotSame){

                        Users[IS_Where].Fname = fname;
                        Users[IS_Where].Lname = lname;
                        Users[IS_Where].Gmail = email;
                        Users[IS_Where].Password = Newpass;
                        Swal.fire({
                            title: 'Are You Sure?',
                            text: " You want to Update!",
                            type: 'warning',
                            allowOutsideClick: false,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, Update it!',
                        }).then((result) => {
                            if (result.value) {
                                localStorage.setItem("Users", JSON.stringify(Users));
                                Swal.fire({
                                    title: 'Successfully',
                                    text: "Updated Successful",
                                    type: 'success',
                                    allowOutsideClick: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Okay'
                                }).then((result) => {
                                    if (result.value) {
                                        location.reload();
                                    }
                                })
                            }
                        }) 
                       

                    }else{
                        Swal.fire({
                            title: "Error",
                            text: "Email Already Been Taken",
                            type: "error",
                        })
                    }
                }
            
                }
            }else{
/* start */

                for (let i = 0; i < Users.length; i++) {
                    if (Users[i].UserID != userId && Users[i].Gmail == email) {
                        IsNotSame = false;
                        break;
                    } else if (Users[i].UserID == userId) {
                        IS_Where = i;
                    }
                }

                if (IsNotSame) {

                    Users[IS_Where].Fname = fname;
                    Users[IS_Where].Lname = lname;
                    Users[IS_Where].Gmail = email;
                    Swal.fire({
                        title: 'Are You Sure?',
                        text: " You want to Update!",
                        type: 'warning',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Update it!'
                    }).then((result) => {
                        if (result.value) {

                            localStorage.setItem("Users", JSON.stringify(Users));
                            Swal.fire({
                                title: 'Successfully',
                                text: "Updated Successful",
                                type: 'success',
                                allowOutsideClick: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Okay'
                            }).then((result) => {
                                if (result.value) {
                                    location.reload();
                                }
                            }) 
                           
                        }
                    })


                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Email Already Been Taken",
                        type: "error",
                    })
                }

/* End */
            }

        }
    });
});

$(document).ready(function () {
    $('#AdminAdd').on('click', function (e) {
        const formValid = this.form.checkValidity();
        if (formValid) {
            let fname = $('#AddNewFirstName').val();
            let lname = $('#addNewLastName').val();
            let email = $('#addNewEmail').val();
            let password = $('#PasswordAdd').val();
            let confirmpassword = $('#ConfirmPassAdd').val();
            let Users = JSON.parse(localStorage.getItem("Users"));
            let isNotSame = true;
            e.preventDefault();
            if (password == confirmpassword){
                if (password.length <9){
                    Swal.fire({
                        title: "Error",
                        text: "Weak Password",
                        type: "error",
                    })
                }else{
                    for(let i = 0 ; i < Users.length; i++){
                        if (Users[i].Gmail == email ){
                            
                               isNotSame = false;
                               break
                        }
                    }

                    if (isNotSame){
                      
                        Swal.fire({
                            title: 'Successfully',
                            text: "Updated Successful",
                            type: 'success',
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Okay'
                        }).then((result) => {
                            if (result.value) {
                                Users.push(UserObject(UserIdGenerator(), fname, lname, email, password));
                                localStorage.setItem("Users", JSON.stringify(Users)); 
                                location.reload();
                            }
                        }) 
                         
                    }else{
                        Swal.fire({
                            title: "Error",
                            text: "Email Already Taken",
                            type: "error",
                        })
                    }

                }
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Password Does Not Match",
                    type: "error",
                })
            }

        }
    });
});
OutputTableAdmin()