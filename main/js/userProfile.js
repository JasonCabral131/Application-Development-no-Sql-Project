let user = JSON.parse(localStorage.getItem("Users"))
let len = 0;
let ID ;
function Profile(){
    if (sessionStorage.getItem("USERID")) {
        let sessionId = sessionStorage.getItem("USERID");
        ID = sessionId;
        for (let x = 0; x < user.length; x++) {
            if (user[x].UserID == sessionId) {
                len = x;
                break
            }
        }
    }

    let profile = document.querySelector('#ChangeProfilexDiv')

    profile.insertAdjacentHTML('beforeend',
        `
        <div class="modal fade" id="ModalProfile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" style="max-width: 50%;">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><img src="../login/img/aclc.jpg" alt="" id="ModalLogo">
              ACLC COLLEGE
              TACLOBAN</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <label for="">Firstname</label>
                  <input type="text" name="" value="${user[len].Fname}"
                  id="ProfileFnamex" class="form-control" placeholder="Firstname" >
                </div>
                <div class="col-md-6">
                  <label for="">Lastname</label>
                  <input type="text" name=""  value="${user[len].Lname}"
                  id="Profilelnamex" class="form-control" placeholder="Lastname">
                </div>
                <div class="col-md-12">
                  <label for="">Email</label>
                  <input type="email" name=""  value="${user[len].Gmail}"
                  id="ProfileEmailx" class="form-control" placeholder="Email">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="UserProfileInfoModal">Save </button>
            </div>
            </form>
          </div>
        </div>
      </div>
        `
    )
}

function ChangePass(){
    let profile = document.querySelector('#ProfileChangePassDiv')

    profile.insertAdjacentHTML('beforeend',
        `
            <div class="modal fade" id="modalChangePassword" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" style="max-width: 50%;">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><img src="../login/img/aclc.jpg" alt="" id="ModalLogo">
                ACLC COLLEGE
                TACLOBAN</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <form>
                <div class="modal-body">
                <label for="">ProfileOldPass</label>
                <input type="password" class="form-control" id="ProfileOldPassx" placeholder="Old Password" required>
                <label >New Password:</label>
                    <div class="input-group">
                       
                        <input type="password" class="form-control" placeholder="Must be 9 or more characters" id="ProfileNewPasswordx"
                        aria-label="Input group example" aria-describedby="btnGroupAddon" required>
                         <div class="input-group-prepend">
                            <div class="input-group-text" id="btnGroupAddon"><input type="checkbox" onClick="ProfileShowNewPass()" id="ProfileNewPassShow"></div>
                        </div>
                    </div>
                <label>Confirm Password:</label>
                    <div class="input-group">
                       
                        <input type="password" class="form-control" placeholder="confirm Password" id="ProfileConfirmPasswordx"
                        aria-label="Input group example" aria-describedby="btnGroupAddon" required>
                         <div class="input-group-prepend">
                          <div class="input-group-text" id="btnGroupAddon"><input type="checkbox" onClick="ProfileShowConfirm()" id="ProfileConfirmShow"></div>
                        </div>
                    </div>
                    
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="ProfileUpdatePassword">Save</button>
                </div>
                 <form>
            </div>
            </div>
        </div>
        `
    )
}

$(document).ready(function(){

    $('#logoutx').on('click', function (e) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want To logout",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.value) { 
                sessionStorage.removeItem('USERID');
                location.href = "../login.html";
            }
        })
    })
    $('#UserProfileInfoModal').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault()
            let fname = $('#ProfileFnamex').val();
            let lname = $('#Profilelnamex').val();
            let gmail = $('#ProfileEmailx').val();
            let ErrorOutput = ""
            let IsNotSame = true;
            for (let x = 0; x < user.length; x++) {
                if (user[x].UserID != ID && user[x].Fname.toUpperCase() == fname.toUpperCase() && user[x].Lname.toUpperCase() == lname.toUpperCase()) {
                    ErrorOutput = "Name Already been Taken"
                    IsNotSame = false
                    break
                } else if (user[x].UserID != ID && user[x].Gmail.toUpperCase() == gmail.toUpperCase() ) {
                    ErrorOutput = "Email Already been Taken"
                    IsNotSame = false
                    break
                }
            }

            if (IsNotSame){
                Swal.fire({
                    title: 'Successfully',
                    text: "Updated",
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        user[len].Fname = fname
                        user[len].Lname = lname
                        user[len].Gmail = gmail
                        localStorage.setItem("Users", JSON.stringify(user))
                        location.reload();
                    }
                }) 
            }else{
                Swal.fire({
                    title: "Error",
                    text: ErrorOutput,
                    type: "error",
                })
            }
        }
    })
    $('#ProfileUpdatePassword').on('click', function(e){
        const formValid = this.form.checkValidity();

        if (formValid) {
                e.preventDefault();
            let old     = $('#ProfileOldPassx').val();
            let newpass = $('#ProfileNewPasswordx').val();
            let confirm = $('#ProfileConfirmPasswordx').val();

            if (newpass == confirm){
                if (newpass.length <9){
                    Swal.fire({
                        title: "Error",
                        text: "Password Must greater than 9 character",
                        type: "warning",
                    })
                    }else{
                            let xxtrue = false;   
                    for (let x = 0; x < user.length; x++) {
                        if (user[x].UserID == ID && user[x].Password == old ) {
                            xxtrue = true;
                            break
                        }
                    }
                    if (xxtrue){
                        Swal.fire({
                            title: 'Successfully',
                            text: "Password Updated",
                            type: 'success',
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Okay'
                        }).then((result) => {
                            if (result.value) {
                                user[len].Password = newpass
                                localStorage.setItem("Users", JSON.stringify(user))
                                location.reload();
                            }
                        }) 
                    }else{
                        Swal.fire({
                            title: "Error",
                            text: "Invalid Old Pass Does Not Match",
                            type: "warning",
                        })
                    }

                   
                    }

            }else{
                Swal.fire({
                    title: "Error",
                    text: "Password Does Not Match",
                    type: "warning",
                })
            }
        }
    })
})
function username(){
    if (sessionStorage.getItem("USERID")){
        let sessionId = sessionStorage.getItem("USERID");

        let user = JSON.parse(localStorage.getItem("Users"))

        for(let x = 0; x < user.length; x++){
            if (user[x].UserID == sessionId){
                $('#userprofile').text(user[x].Fname + " " + user[x].Lname)
            }
        }
    }
}

function ProfileShowNewPass(){
    let x = document.querySelector('#ProfileNewPasswordx')

    if(x.type == "password"){
        x.type = "text"
    }else{
        x.type = "password"
    }
}
function ProfileShowConfirm() {
    let x = document.querySelector('#ProfileConfirmPasswordx')

    if (x.type == "password") {
        x.type = "text"
    } else {
        x.type = "password"
    }
}
username()
Profile()
ChangePass()