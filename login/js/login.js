  $(function () {
    $("#FirstName").keydown(function (e) {
      if (e.ctrlKey || e.altKey) {
        e.preventDefault();
      } else {
        var key = e.keyCode;

        if (
          !(
            key == 8 ||
            key == 32 ||
            key == 46 ||
            (key >= 35 && key <= 40) ||
            (key >= 65 && key <= 90)
          )
        ) {
          e.preventDefault();
        }
      }
    });
  });
function UserObject(user_id,fname,lname,gmail,password){
    let myUser = {
        UserID      : user_id,
        Fname       : fname,
        Lname       : lname,
        Gmail       : gmail,
        Password    : password
    }

    return myUser;
}


function UserIdGenerator(){
         let Datex = new Date();
         let DateNow = Datex.getFullYear() ;
         if(localStorage.getItem("Users")){
          let Users = JSON.parse(localStorage.getItem("Users"));
          if(Users.length !=0){
            let Users = JSON.parse(localStorage.getItem("Users"));
            let Value_length =   Users.length
            let Value   =    Users[Value_length - 1].UserID;
            let Value_split  =   Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "user-" + DateNow + "-" + Parsing.toString();
          }else{
            return "user-" + DateNow + "-1"
          }
         }else{
              return "user-" + DateNow + "-1"
         }
         
}   

  $(function () {
    $("#LastName").keydown(function (e) {
      if (e.ctrlKey || e.altKey) {
        e.preventDefault();
      } else {
        var key = e.keyCode;

        if (
          !(
            key == 8 ||
            key == 32 ||
            key == 46 ||
            (key >= 35 && key <= 40) ||
            (key >= 65 && key <= 90)
          )
        ) {
          e.preventDefault();
        }
      }
    });
  });
$(function () {
  $("#SignUpBtn").on("click", function (e) {
         const valid = this.form.checkValidity();
        if(valid) {
            e.preventDefault();
            let LastName     = $("#LastName").val();
            let FirstName    = $("#FirstName").val();
            let Email        = $("#Email").val();
            let Password     = $("#Password").val();
            let Confirm_pass = $("#Confirm_pass").val();
    
            if (Password == Confirm_pass) {
                if (Password.length <= 8) {
                   Swal.fire({
                     title: "Error",
                     text: "Weak Password !",
                     type: "warning",
                   });
                }else{
                     if (localStorage.getItem("Users")) {
                                  let Users = JSON.parse(localStorage.getItem("Users")); 
                                  let isNOSameValue = true;  
                                  let errorx =   ""; 
                                  for(let i = 0 ; i < Users.length;i++){
                                         
                                        if (Users[i].Gmail == Email) {                      
                                                isNOSameValue = false;
                                                errorx = "Email Already Been Taken";
                                                break;
                                        }else if (Users[i].Fname == FirstName && Users[i].Lname == LastName) {
                                                    isNOSameValue = false;
                                                    errorx = "Name Already Been Taken";
                                                     break;                    
                                        }
                                  }
                                  if (isNOSameValue){



                                     Swal.fire({
                                       title: "Successfully Created",
                                       text: "User ID : " + UserIdGenerator(),
                                       allowOutsideClick: false,
                                       type: "success",
                                       confirmButtonColor: "#3085d6",
                                       confirmButtonText: "Okay",
                                     }).then((result) => {
                                       if (result) {
                                         sessionStorage.setItem('USERID', UserIdGenerator());
                                         Users.push(UserObject(UserIdGenerator(),FirstName,LastName,Email,Password));
                                         localStorage.setItem("Users",JSON.stringify(Users));
                                         location.href = "main/index.html";
                                       }
                                     });
                                        
                                  }else{

                                    Swal.fire({
                                      title: "Error",
                                      text: errorx,
                                      allowOutsideClick: false,
                                      type: "warning",
                                      confirmButtonColor: "#3085d6",
                                      confirmButtonText: "Okay",
                                    });
                                  }
                     } else {
                            
                                     Swal.fire({
                                      title: "Successfully Created",
                                      text: "User ID : " + UserIdGenerator(),
                                       allowOutsideClick: false,
                                       type: "success",
                                       confirmButtonColor: "#3085d6",
                                       confirmButtonText: "Okay",
                                     }).then((result) => {
                                       if (result) {
                                        sessionStorage.setItem('USERID', UserIdGenerator());
                                        let Users1 = [];
                                        Users1.push(UserObject(UserIdGenerator(), FirstName, LastName, Email, Password))
                                        localStorage.setItem("Users", JSON.stringify(Users1));
                                         location.href = "main/index.html";
                                       }
                                     });

                      
                    }
                }
            }else{
              Swal.fire({
                title: "Error",
                text: "Password Does Not match",
                type: "warning",
              });
            }
            
           
        }     
  });
});

$(function () {
  $("#LoginUserBtn").on("click", function (e) {      
         const valid = this.form.checkValidity();
        if(valid) {
            e.preventDefault();
            let UserID1 = $("#log_user_id").val();
            let Email = $("#log_user_email").val();
            let password = $("#log_user_password").val();
            if(localStorage.getItem("Users")){
              let Users = JSON.parse(localStorage.getItem("Users")); 
              if(Users.length !=0){
                let Istrue = true;    
                for(let i = 0 ; i <Users.length; i++ ){
                       if (
                         Users[i].UserID == UserID1 &&
                         Users[i].Gmail == Email &&
                         Users[i].Password == password
                       ){
                          Istrue = true;
                          break;
                       }else{  
                            Istrue = false;   
                       }
                }
   
                if(Istrue){
                        Swal.fire({
                          title: "Successful",
                          text: "Login Successfully",
                          allowOutsideClick: false,
                          type: "success",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "Okay",
                        }).then((result) => {
                          if (result) {
                            sessionStorage.setItem('USERID', UserID1);
                            location.href = "main/index.html";
                          }
                        });
                }else{
                   Swal.fire({
                     title: "Error",
                     text: "Invalid Input",
                     type: "warning",
                   });
                }
   
              }else{
                Swal.fire({
                  title: "Error",
                  text: "NO USER AVAILABLE",
                  type: "warning",
                });
              }
            }else{
              Swal.fire({
                title: "Error",
                text: "NO USER AVAILABLE",
                type: "warning",
              });
            }
            
          
        }
  });
});

$(function () {
  $(".social").on("click", function (e) {

        Swal.fire({
          title: "Unavailable",
          text: "Right Now!",
          type: "warning",     
        })
        e.preventDefault();

  });
});



