let url_string = window.location.href
let url = new URL(url_string);
let StudentId = url.searchParams.get("StudentId");
function NameOutput() {
    let studentName = JSON.parse(localStorage.getItem("Student"))
    let lengthx = 0;
    for (let i = 0; i < studentName.length; i++) {
        if (studentName[i].StudentId == StudentId) {
            lengthx = i;
        }
    }

    $('#NameStudent').text(studentName[lengthx].Fname + " " + studentName[lengthx].Lname) 
}

function OutputEnrolledStudent(){
    if (localStorage.getItem("StudentEnroll")){
        let StudentEnroll = JSON.parse(localStorage.getItem("StudentEnroll"))
        let TableStudentEnrolled = document.querySelector('#TableStudentEnrolled');
        for (let i = 0; i < StudentEnroll.length ; i++){
            if (StudentEnroll[i].StudentId == StudentId){
                TableStudentEnrolled.insertAdjacentHTML('beforeend',
                    `
                    <tr>
                    <td class="text-center">${StudentEnroll[i].Id}</td>
                    <td class="text-center">${StudentEnroll[i].Year}</td>
                    <td class="text-center">${StudentEnroll[i].Description}</td>
                    <td class="d-flex justify-content-center">
                    <button class="btn btn-info EditStudent" >
                    <a href="EnrolledInfo.html?EnrollId=${StudentEnroll[i].Id}&StudentId=${StudentId}" class="text-white">
                    <i class="far fa-eye mr-1">Info</i>
                    </a>
                    </button>
                    </td>
                    </tr>
                    `
                )
            }   
        }
    }
}
function EnrolledIdGenerator() {
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    if (localStorage.getItem("StudentEnroll")) {

        let student = JSON.parse(localStorage.getItem("StudentEnroll"));
        let Value_length = student.length
        if (Value_length == 0) {
            return "enroll-" + DateNow + "-1";
        } else {


            let Value = student[Value_length - 1].Id;
            let Value_split = Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "enroll-" + DateNow + "-" + Parsing.toString();
        }
    } else {
        return "enroll-" + DateNow + "-1";
    }
}
function StudentEnrolledObject(id, studentId, year, description){
    let object = {
            Id: id,
            StudentId: studentId,
            Year: year,
            Description: description
    }
    return object
}
$(document).ready(function () {

    $('#StudentEnrolled').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "Not Yet Enrolled"
        },



    });

    $('#StudentEnroll').on('click', function (e) {
        let enrolledYear = $('#enrolledYear').val();
        let description = $('#description').val();
        
        if(localStorage.getItem("StudentEnroll")){
            let StudentEnroll = JSON.parse(localStorage.getItem("StudentEnroll"))
            let IsNotSame = true;
            for (let i = 0; i < StudentEnroll.length; i++){
                if (StudentEnroll[i].StudentId == StudentId && StudentEnroll[i].Year == enrolledYear   ){
                    IsNotSame = false;
                    break;
                }
            }

            if (IsNotSame){
                StudentEnroll.push(StudentEnrolledObject(EnrolledIdGenerator(), StudentId, enrolledYear, description))

                Swal.fire({
                    title: "Successful",
                    text: "Save Successfully",
                    allowOutsideClick: false,
                    type: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Okay",
                }).then((result) => {
                    if (result) {
                        localStorage.setItem("StudentEnroll", JSON.stringify(StudentEnroll));
                        location.reload();
                    }
                });
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Duplicated Info!",
                    type: "warning",
                })
            }
        }else{
            let StudentEnroll = [];
            StudentEnroll.push(StudentEnrolledObject(EnrolledIdGenerator(), StudentId, enrolledYear, description))

            Swal.fire({
                title: "Successful",
                text: "Save Successfully",
                allowOutsideClick: false,
                type: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay",
            }).then((result) => {
                if (result) {
                    localStorage.setItem("StudentEnroll", JSON.stringify(StudentEnroll));
                    location.reload();
                }
            });

        }
    })

    
})
NameOutput()
OutputEnrolledStudent()