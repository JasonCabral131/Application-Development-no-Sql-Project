

function TeacherTable(){
    let TableTeacher = document.querySelector('#TeacherTable');
    if (localStorage.getItem("Teacher")){
        let teacher = JSON.parse(localStorage.getItem("Teacher"))
        for (let i = 0; i < teacher.length; i++){
            TableTeacher.insertAdjacentHTML('beforeend',
                `
            <tr>
            <td  class="text-center"><a href="TeacherSubject.html?teacherID=${teacher[i].Id}"><i class="far fa-eye"></i></a></td>
            <td class="text-center">${teacher[i].Id}</td>
            <td class="text-center">${teacher[i].Fname}</td>
            <td class="text-center">${teacher[i].Lname}</td>
            <td class="text-center">${teacher[i].Contact}</td>
             <td class="text-center">${teacher[i].Status}</td>
            <td class="d-flex justify-content-center"><button class="btn btn-info teacherEditTable" > <i class="fas fa-edit"></i></button> </td>
            </tr>
            `
            )  
        }
    }
}
function TeacherObject(id, fname, lname, contact, email, sex, age, bday, status, address){
    let object = {
        Id: id,
        Fname: fname ,
        Lname: lname,
        Contact: contact,
        Email:  email ,
        Sex: sex,
        Age: age,
        Bday: bday,
        Status: status,
        Address: address
    }

    return object;
}
function TeacherIdGenerator() {
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    if (localStorage.getItem("Teacher")){
       
        let Teacher = JSON.parse(localStorage.getItem("Teacher"));
        let Value_length = Teacher.length
        if (Value_length == 0) {
            return "Teacher-" + DateNow + "-1";
        } else {


            let Value = Teacher[Value_length - 1].Id;
            let Value_split = Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "Teacher-" + DateNow + "-" + Parsing.toString();
        }
    }else{
        return   "Teacher-" + DateNow + "-1";
    }
        
}  


$(document).ready(function () {
    var regExp = /[a-z]/i;
    $('#age').on('keydown keyup', function (e) {
        var value = String.fromCharCode(e.which) || e.key;

        // No letters
        if (regExp.test(value)) {
            e.preventDefault();
            return false;
        }
    });

    $('#contact').on('keydown keyup', function (e) {
        var value = String.fromCharCode(e.which) || e.key;

        // No letters
        if (regExp.test(value)) {
            e.preventDefault();
            return false;
        }
    });

    $('#fname').keydown(function (e) {

        if (e.ctrlKey || e.altKey) {
            e.preventDefault();

        } else {
            var key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            }

        }

    });

    $('#lname').keydown(function (e) {

        if (e.ctrlKey || e.altKey) {
            e.preventDefault();

        } else {
            var key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            }

        }

    });

    $('#SaveTeacher').on('click',function(e){
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault();
            let fname = $('#fname').val();
            let lname       = $('#lname').val();
            let contact     = $('#contact').val();
            let gmail       = $('#email').val();
            let sex         = $('#sex').val();
            let age         = $('#age').val();
            let birthday    = $('#bday').val();
            let status      = $('#status').val();
            let address     = $('#address').val();
                if(localStorage.getItem("Teacher")){
                    let IsNotSame = true;
                    let ErrorOutput = "";
                    let teacher = JSON.parse(localStorage.getItem("Teacher"));
                    for (let x = 0; x < teacher.length ; x++){
                        if (teacher[x].Fname.toUpperCase() == fname.toUpperCase() && teacher[x].Lname.toUpperCase() == lname.toUpperCase() ){
                            IsNotSame = false;
                            ErrorOutput = "Name Already Existed";
                            break;
                        } else if (teacher[x].Email.toUpperCase() == gmail.toUpperCase()){
                            IsNotSame = false;
                            ErrorOutput = "Email Already Existed";
                            break;
                        } else if (teacher[x].Contact.toUpperCase() == contact.toUpperCase()){
                            IsNotSame = false;
                            ErrorOutput = "Phone Already Existed";
                            break;
                        }
                    }
                    if (IsNotSame){
                        teacher.push(TeacherObject(TeacherIdGenerator(), fname, lname, contact, gmail, sex, age, birthday, status, address))
                        Swal.fire({
                            title: 'Successfully',
                            text: "Created",
                            type: 'success',
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Okay'
                        }).then((result) => {
                            if (result.value) {
                                localStorage.setItem("Teacher", JSON.stringify(teacher))
                                location.reload();
                            }
                        }) 
                    }else{
                        Swal.fire({
                            title: "Error",
                            text: ErrorOutput,
                            type: "warning",
                        }) 
                    }
                }else{
                    let TeacherArray = [];
                    TeacherArray.push(TeacherObject(TeacherIdGenerator(), fname, lname, contact, gmail, sex, age, birthday, status, address))
                    

                    Swal.fire({
                        title: 'Successfully',
                        text: "Created",
                        type: 'success',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Okay'
                    }).then((result) => {
                        if (result.value) {
                            localStorage.setItem("Teacher", JSON.stringify(TeacherArray))
                            location.reload();
                        }
                    }) 
                }
           
        }
     
      
    })
    /* Show Modal */

    $('.teacherEditTable').on('click', function (e) {
        $('#UpdateTeacher').modal('show');

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data)
        let teacherlength = 0;
        let teacher = JSON.parse(localStorage.getItem("Teacher"))
                for(let i = 0; i < teacher.length ; i++){
                    if (teacher[i].Id == data[1]){
                        teacherlength = i; 
                        break;
                    }
                }
        let SexSelect = ["Male","Female"]
        let OptionSex = '<option value="' + teacher[teacherlength].Sex + '">' + teacher[teacherlength].Sex + '</option>'
        let StatusSelect = ["Active", "Unactive"]
        let OptionStatus = '<option value="' + teacher[teacherlength].Status + '">' + teacher[teacherlength].Status + '</option>'
                
        for (let i = 0; i < SexSelect.length ; i++ ){
            if (SexSelect[i] == teacher[teacherlength].Sex){
                continue;
            }else{
                OptionSex += '<option value="' + SexSelect[i] + '">' + SexSelect[i] + '</option>'
            }
        }
        for (let i = 0; i < StatusSelect.length; i++){
            if (StatusSelect[i] == teacher[teacherlength].Status) {
                continue;
            } else {
                OptionStatus += '<option value="' + StatusSelect[i] + '">' + StatusSelect[i] + '</option>'
            }
        }
        
       
        $('#teacherID').val(data[1]);
        $('#fname1').val(teacher[teacherlength].Fname);
        $('#lname1').val(teacher[teacherlength].Lname);
        $('#contact1').val(teacher[teacherlength].Contact);
        $('#email1').val(teacher[teacherlength].Email);
        $('#sex1').html(
            `${OptionSex}`
        );
        $('#age1').val(teacher[teacherlength].Age);
        $('#bday1').val(teacher[teacherlength].Bday);
        $('#status1').html(
            `${OptionStatus}`
        );
        $('#address1').val(teacher[teacherlength].Address);
    })

    /* Update Teacher iNfo  */

    $('#UpdateTeacherBtn').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            let teacherID   = $('#teacherID').val();
            let fname       = $('#fname1').val();
            let lname       = $('#lname1').val();
            let contact     = $('#contact1').val();
            let gmail       = $('#email1').val();
            let sex         = $('#sex1').val();
            let age         = $('#age1').val();
            let birthday    = $('#bday1').val();
            let status      = $('#status1').val();
            let address     = $('#address1').val();

            let teacher = JSON.parse(localStorage.getItem("Teacher"))
            let whereLength = 0 ;
            let errorOutput = "";
            let IsNotSame = true;
            for (let i = 0; i < teacher.length; i++){
                if (teacher[i].Id != teacherID
                            && 
                    teacher[i].Fname.toUpperCase() == fname.toUpperCase() 
                            && 
                    teacher[i].Lname.toUpperCase() == lname.toUpperCase()){
                    IsNotSame = false;
                    errorOutput = "Name Already Been Taken"
                    break;

                } else if (teacher[i].Id != teacherID && teacher[i].Email.toUpperCase() == gmail.toUpperCase()){
                    IsNotSame = false;
                    errorOutput = "Email Already Been Taken"
                    break;

                } else if (teacher[i].Id != teacherID && teacher[i].Contact.toUpperCase() == contact.toUpperCase()){
                    IsNotSame = false;
                    errorOutput = "Contact Already Been Taken"
                    break;

                }
                else if (teacher[i].Id == teacherID){
                    whereLength = i; 
                }
            }

            if (IsNotSame){
                teacher[whereLength].Fname = fname
                teacher[whereLength].Lname = lname
                teacher[whereLength].Address = address
                teacher[whereLength].Bday = birthday
                teacher[whereLength].Age = age
                teacher[whereLength].Contact = contact
                teacher[whereLength].Email = gmail
                teacher[whereLength].Sex =  sex
                teacher[whereLength].Status = status

                Swal.fire({
                    title: 'Successfully',
                    text: "Updated",
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        localStorage.setItem("Teacher", JSON.stringify(teacher))
                        location.reload();
                    }
                }) 
            }else{
                Swal.fire({
                    title: "Error",
                    text: errorOutput,
                    type: "warning",
                }) 

            }
            e.preventDefault();
        }
        
    })  

    /* Delete */

   
    $('#age1').on('keydown keyup', function (e) {
        var value = String.fromCharCode(e.which) || e.key;

        // No letters
        if (regExp.test(value)) {
            e.preventDefault();
            return false;
        }
    });

    $('#contact1').on('keydown keyup', function (e) {
        var value = String.fromCharCode(e.which) || e.key;

        // No letters
        if (regExp.test(value)) {
            e.preventDefault();
            return false;
        }
    });

    $('#fname1').keydown(function (e) {

        if (e.ctrlKey || e.altKey) {
            e.preventDefault();

        } else {
            var key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            }

        }

    });

    $('#lname1').keydown(function (e) {

        if (e.ctrlKey || e.altKey) {
            e.preventDefault();

        } else {
            var key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            }

        }

    });

});
TeacherTable()