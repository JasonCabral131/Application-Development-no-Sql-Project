function StudentTableList() {
    if (localStorage.getItem("Student")) {
        let StudentList = JSON.parse(localStorage.getItem("Student"))
        let StudentTable = document.querySelector('#ListStudentTable');
        for (let i = 0; i < StudentList.length; i++) {
            StudentTable.insertAdjacentHTML('beforeend',
                `
                    <tr>
                    <td class="text-center"><a href="studentEnrolled.html?StudentId=${StudentList[i].StudentId}"><i class="far fa-eye"></i></a></td>
                    <td class="text-center">${StudentList[i].StudentId}</td>
                    <td class="text-center">${StudentList[i].Fname}</td>
                    <td class="text-center">${StudentList[i].Lname}</td>
                    <td class="text-center">${StudentList[i].Course}</td>
                    <td class="text-center">${StudentList[i].Status}</td>
                    <td class="d-flex justify-content-center">
                    <button class="btn btn-info EditStudent" > <i class="fas fa-edit"></i></button>
                    
                    </td>
                    </tr>
                    `
            )
        }
    }
}


function StudentObject(studentId,fname,lname,contact,bday,sex,age,course,email,status,address) {
    let object = {
        StudentId: studentId,
        Fname: fname,
        Lname: lname,
        Contact: contact,
        Bday: bday,
        Sex: sex,
        Age: age,
        Course: course,
        Email: email,
        Status: status,
        Address: address
    }
    return object
}

function StudentIdGenerator(){
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    if (localStorage.getItem("Student")) {

        let student = JSON.parse(localStorage.getItem("Student"));
        let Value_length = student.length
        if (Value_length == 0) {
            return "Student-" + DateNow + "-1";
        } else {


            let Value = student[Value_length - 1].StudentId;
            let Value_split = Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "Student-" + DateNow + "-" + Parsing.toString();
        }
    } else {
        return "Student-" + DateNow + "-1";
    }
}


  

$(document).ready(function () {
    $('#UpdateStudent').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault();
            let studentId = $('#studentId').val();
            let fname = $('#fname1').val();
            let lname = $('#lname1').val();
            let contact = $('#contact1').val();
            let bday = $('#bday1').val();
            let sex = $('#sex1').val();
            let age = $('#age1').val();
            let course = $('#course1').val();
            let email = $('#email1').val();
            let status = $('#status1').val();
            let address = $('#address1').val();
            let IsNotSame = true;
            let WhereLength = 0 ;
            let ErrorOutput = "";
            let student = JSON.parse(localStorage.getItem("Student"))
                    for (let i = 0; i < student.length; i++ ){
                    
                        if (student[i].StudentId != studentId
                                          &&
                            
                            student[i].Fname.toUpperCase() == fname.toUpperCase()
                                         &&
                            student[i].Lname.toUpperCase() == lname.toUpperCase()) {
                            IsNotSame = false;
                            ErrorOutput = "Name Already Existed"
                            break;
                        } else if (student[i].StudentId != studentId
                                             &&
                            student[i].Contact.toUpperCase() == contact.toUpperCase()) {
                            IsNotSame = false;
                            ErrorOutput = "Contact Already Existed"
                            break;
                        } else if (student[i].StudentId != studentId 
                                            &&
                                student[i].Email.toUpperCase() == email.toUpperCase()) {
                            IsNotSame = false;
                            ErrorOutput = "Email Already Existed"
                            break;
                        }
                        else if (student[i].StudentId == studentId){
                            WhereLength = i;
                        }
                    }

            if (IsNotSame){
                student[WhereLength].Fname = fname;
                student[WhereLength].Lname = lname;
                student[WhereLength].Address = address;
                student[WhereLength].Age = age;
                student[WhereLength].Bday = bday;
                student[WhereLength].Contact = contact;
                student[WhereLength].Course = course;
                student[WhereLength].Email = email;
                student[WhereLength].Sex = sex;
                student[WhereLength].Status = status;
                Swal.fire({
                    title: "Successful",
                    text: "Updated Successfully",
                    allowOutsideClick: false,
                    type: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Okay",
                }).then((result) => {
                    if (result) {

                        localStorage.setItem("Student", JSON.stringify(student));
                        location.reload();
                    }
                });
            }else{
                Swal.fire({
                    title: "Error",
                    text: ErrorOutput,
                    type: "warning",
                })
            }
        }
    })

    $('#SaveStudent').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault();
            let fname = $('#fname').val();
            let lname = $('#lname').val();
            let contact = $('#contact').val();
            let bday = $('#bday').val();
            let sex = $('#sex').val();
            let age = $('#age').val();
            let course = $('#course').val();
            let email = $('#email').val();
            let status = $('#status').val();
            let address = $('#address').val();
            if (localStorage.getItem("Course")) {
                let courselist = JSON.parse(localStorage.getItem("Course"))

                if (courselist.length != 0) {

                    if(localStorage.getItem("Student")){

                        let StudentAdd = JSON.parse(localStorage.getItem("Student"))
                        let IsnotSame = true;
                        let ErrorOutput = ""
                        for (let i = 0; i < StudentAdd.length; i++){
                            if (StudentAdd[i].Fname.toUpperCase() == fname.toUpperCase()
                                                     && 
                                StudentAdd[i].Lname.toUpperCase() == lname.toUpperCase() ){
                                IsnotSame = false;
                                ErrorOutput = "Name Already Existed"
                                break;
                            } else if (StudentAdd[i].Contact.toUpperCase() == contact.toUpperCase()){
                                IsnotSame = false;
                                ErrorOutput = "Contact Already Existed"
                                break;
                            } else if (StudentAdd[i].Email.toUpperCase() == email.toUpperCase()){
                                IsnotSame = false;
                                ErrorOutput = "Email Already Existed"
                                break;
                             }
                        }

                        if (IsnotSame){
                            StudentAdd.push(
                                StudentObject(StudentIdGenerator(), fname, lname, contact, bday, sex, age, course, email, status, address)    
                            )
                            Swal.fire({
                                title: "Successful",
                                text: "Save Successfully",
                                allowOutsideClick: false,
                                type: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Okay",
                            }).then((result) => {
                                if (result) {

                                    localStorage.setItem("Student", JSON.stringify(StudentAdd));
                                    location.reload();
                                }
                            });
                        }else{
                            Swal.fire({
                                title: "Error",
                                text: ErrorOutput,
                                type: "warning",
                            })
                        }   



                    }else{
                        let StudentArray = [];
                        StudentArray.push(
                            StudentObject(StudentIdGenerator(), fname, lname, contact, bday, sex, age, course, email, status, address))
                        Swal.fire({
                            title: "Successful",
                            text: "Created Successfully",
                            allowOutsideClick: false,
                            type: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Okay",
                        }).then((result) => {
                            if (result) {
                              
                                localStorage.setItem("Student", JSON.stringify(StudentArray));
                                location.reload();
                            }
                        });
                    }






                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Course Not Availble",
                        type: "warning",
                    })
                }
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Course Not Availble",
                    type: "warning",
                })
            }


        }


    });

    $('.EditStudent').on('click', function (e) {
        $('#ShowUpdateModal').modal('show');
        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();   

        let studentList = JSON.parse(localStorage.getItem("Student"))
        let whereLength = 0; 
        for (let i = 0; i < studentList.length ; i++){
            if (studentList[i].StudentId == data[1]){
                $('#studentId').val(data[1]);
                $('#fname1').val(studentList[i].Fname);
                $('#lname1').val(studentList[i].Lname);
                $('#contact1').val(studentList[i].Contact);
                $('#bday1').val(studentList[i].Bday);
                $('#age1').val(studentList[i].Age);
                $('#email1').val(studentList[i].Email);
                $('#address1').val(studentList[i].Address);
                whereLength = i;
            }
        }
        let statusArray = ["Active", "Unactive","Graduate"]
        let StatusOption = '<option value="' + data[5] + '">' + data[5] + '</option>';
        let CourseOption = '<option value="' + data[4] + '">' + data[4]+'</option>';
        let SexOption = '';
        if (localStorage.getItem("Course")){
            let Course = JSON.parse(localStorage.getItem("Course"))
            for (let i = 0; i < Course.length; i++){
                if (Course[i].CourseName == data[4]){
                        continue;
                }else{
                    CourseOption = '<option value="' + Course[i].CourseName + '">' + Course[i].CourseName + '</option>'
                }
            }
        }

        if (studentList[whereLength].Sex == "Male"){
            SexOption = '<option value="' + studentList[whereLength].Sex + '">' + studentList[whereLength].Sex + '</option><option value="Female">Female</option>'
            
        }else{
            SexOption = '<option value="Female">Female</option><option value="Male">Male</option>'
        }
        for (let i = 0; i < statusArray.length; i++ ){
            if (statusArray[i] == data[5]){
                continue
            }else{
                StatusOption += '<option value="' + statusArray[i] + '">' + statusArray[i] + '</option>'
            }
        }
        $('#status1').html(StatusOption);
        $('#course1').html(CourseOption);
        $('#sex1').html(SexOption);

    });
    var regExp = /[a-z]/i;
    $('.age').on('keydown keyup', function (e) {
        var value = String.fromCharCode(e.which) || e.key;

        // No letters
        if (regExp.test(value)) {
            e.preventDefault();
            return false;
        }
    });

    $('.contact').on('keydown keyup', function (e) {
        var value = String.fromCharCode(e.which) || e.key;

        // No letters
        if (regExp.test(value)) {
            e.preventDefault();
            return false;
        }
    });

    $('.fname').keydown(function (e) {

        if (e.ctrlKey || e.altKey) {
            e.preventDefault();

        } else {
            var key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            }

        }

    });

    $('.lname').keydown(function (e) {

        if (e.ctrlKey || e.altKey) {
            e.preventDefault();

        } else {
            var key = e.keyCode;

            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

                e.preventDefault();

            }

        }

    });
    $('#StudentInfodataTable').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No Student Available"
        },

      

    });

    $('#bday').on("blur", function () {
        let data = $("#bday").val();
        dob = new Date(data);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
            
        $('#age').val((isNaN(age)) ? 0 : parseInt(age));
    });

    $('#bday1').on("blur", function () {
        let data = $("#bday1").val();
        dob = new Date(data);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
            
        $('#age1').val((isNaN(age)) ? 0 : parseInt(age));
    });
    $(function(){
        if (localStorage.getItem("Course")){
            let course = JSON.parse(localStorage.getItem("Course"))
          
             if (course.length != 0 ){
                
                     let OptionTrue = "";
                     for(let i = 0 ; i < course.length; i++){
                         OptionTrue += '<option value="' + course[i].CourseName + '">' + course[i].CourseName+'</option>'
                     }   
                 $('#course').html(OptionTrue) 
                }else {
                    let OptionFalse = '<option value="Active">aaNO COURSE AVAILBLE!</option>'
                 $('#course').html(OptionFalse)  
                }
         }else{
            let Option = '<option value="Active">NO COURSE AVAILBLE!</option>'
            $('#course').html(Option)      
         }
    })

   
});
StudentTableList()