let url_string = window.location.href
let url = new URL(url_string);
let teacherID = url.searchParams.get("teacherID");
function SubjectListData() {
    let tableBody = document.querySelector('#ListSubjectTable');
    if (localStorage.getItem("SubjectList")) {
        let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));

        for (let i = 0; i < SubjectList.length; i++) {
            tableBody.insertAdjacentHTML('beforeend',
                `
            <tr>
            <td class="text-center"><input type="checkbox" name="" id="" class="SubjectID mr-1" value="${SubjectList[i].SubjectID}">${SubjectList[i].SubjectID}</td>
            <td class="text-center">${SubjectList[i].SubName}</td>
            <td class="text-center">${SubjectList[i].SubDescription}</td>
            </tr>
            `
            )
        }
    }
}
teacherID 
function teacherAssignSubject() {
    let ListTeacherSubject = document.querySelector('#ListTeacherSubject');
    if (localStorage.getItem("TeacherAssignSubject")) {
        let assign = JSON.parse(localStorage.getItem("TeacherAssignSubject"));
        let subjectList = JSON.parse(localStorage.getItem("SubjectList"))
        for (let i = 0; i < assign.length; i++) {
            for (let x = 0; x < subjectList.length; x++) {
                if (assign[i].teacherId == teacherID && subjectList[x].SubjectID == assign[i].subjectId ){
                    ListTeacherSubject.insertAdjacentHTML('beforeend',
                        `
                        <tr>
                        <td  class="text-center"><a href="TeacherSchedule.html?subjectId=${subjectList[x].SubjectID}&teacherID=${teacherID}"><i class="far fa-eye"></i></a></td>
                        <td class="text-center">${assign[i].ID}</td>
                        <td class="text-center">${subjectList[x].SubName}</td>
                        <td class="text-center">${subjectList[x].SubDescription}</td>
                        <td class="d-flex justify-content-center">
                        <input type="hidden" class="subjectID" value="${subjectList[x].SubjectID}">
                        <button class="btn btn-info" ><a href="subjectCreatePlatform.html?SubjectId=${subjectList[x].SubjectID}&&teacherID=${teacherID}" class="text-white">PlotForm</a></button>
                        <button class="btn btn-danger deleteTeachSub" ><i class="fas fa-trash"></i></button>
                        </td>
                        </tr>
                         `
                    )
                }
            } 
        }   
    }
   
}
function TeacherName() {
    let whereLength = 0;
    let teacher = JSON.parse(localStorage.getItem("Teacher"))

    for (let i = 0; i < teacher.length; i++) {
        if (teacher[i].Id == teacherID) {
            whereLength = i;
            break;
        }
    }
    $('#TeacherName').text(teacher[whereLength].Fname + " " + teacher[whereLength].Lname);

}

function AssignIdGenerator() {
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    if (localStorage.getItem("TeacherAssignSubject")) {

        let assign = JSON.parse(localStorage.getItem("TeacherAssignSubject"));
        let Value_length = assign.length
        if (Value_length == 0) {
            return "assign-" + DateNow + "-1";
        } else {


            let Value = assign[Value_length - 1].ID;
            let Value_split = Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "assign-" + DateNow + "-" + Parsing.toString();
        }
    } else {
        return "assign-" + DateNow + "-1";
    }
}

function StudentObject(ID,teacherId, subjectId){
        let object = {
            ID: ID,
            teacherId: teacherId,
            subjectId: subjectId
        }
    return object
}

$(document).ready(function () {
    $('#TeacherListSubject').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No Subject Assign"
        },
    });

    $('#SubjectTable').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No Subject Avaible"
        },
    });
    $('#AssignSubject').on('click', function (e) {
        var SubjectID = $('.SubjectID:checked').map(function () {
            return $(this).val();
        }).get();

        if (SubjectID.length !=0){
                if(localStorage.getItem("TeacherAssignSubject")){
                    let assign = JSON.parse(localStorage.getItem("TeacherAssignSubject"))
                    let IsnotSame = true;
                    for (let i = 0; i < assign.length; i++ ){
                        for (let x = 0; x < SubjectID.length; x++) {
                            if (assign[i].teacherId == teacherID && assign[i].subjectId == SubjectID[x]) {
                                IsnotSame = false;
                                break;
                            }
                        }    
                    }

                    if (IsnotSame){
                        for (let i = 0; i < SubjectID.length; i++) {
                            assign.push(StudentObject(AssignIdGenerator(), teacherID, SubjectID[i]))
                        }

                        Swal.fire({
                            title: "Successful",
                            text: "Created Successfully",
                            allowOutsideClick: false,
                            type: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Okay",
                        }).then((result) => {
                            if (result) {

                                localStorage.setItem("TeacherAssignSubject", JSON.stringify(assign));
                                location.reload();
                            }
                        });

                    }else{
                        Swal.fire({
                            title: "Error",
                            text: "Check Duplication Subject",
                            type: "warning",
                        })
                    }
                }else{
                    let teacherAssign =[];
                    for (let i = 0; i < SubjectID.length; i++ ){
                        teacherAssign.push(StudentObject(AssignIdGenerator(), teacherID, SubjectID[i]))
                    }
                   
                    Swal.fire({
                        title: "Successful",
                        text: "Created Successfully",
                        allowOutsideClick: false,
                        type: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Okay",
                    }).then((result) => {
                        if (result) {

                            localStorage.setItem("TeacherAssignSubject", JSON.stringify(teacherAssign));
                            location.reload();
                        }
                    });
                }
        }else{
            Swal.fire({
                title: "Error",
                text: "Select Subject",
                type: "warning",
            })
        }

    })

    $('.deleteTeachSub').on('click', function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "All Data Under This Subject Will Be Deleted!!!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) { 
        let subjId = $(this).parent().find(".subjectID").val();
        
        let SchedId = [];
        if (localStorage.getItem("Schedule")){
            let Schedule = JSON.parse(localStorage.getItem("Schedule"));
            if (Schedule.length !=0){
                for (let x = 0; x < Schedule.length ; x++){
                    if (Schedule[x].subjectId == subjId){
                        SchedId.push(Schedule[x].ID)
                    }
                }
            }
        }  
        if (localStorage.getItem("TeacherSchedule")){
            let TeacherSchedule = JSON.parse(localStorage.getItem("TeacherSchedule"))
            if (TeacherSchedule.length !=0){
                for (let i = 0; i < TeacherSchedule.length ;  ){
                    for (let x = 0; x < SchedId.length;x++){
                        if (TeacherSchedule[i].TeacherId == teacherID && TeacherSchedule[i].ScheduleId == SchedId[x] ) {
                            TeacherSchedule.splice(i, 1); 
                            i = 0;
                        }else{
                            i++
                        }
                    }
                }
            }
            localStorage.setItem("TeacherSchedule", JSON.stringify(TeacherSchedule))
        }
        
        if (localStorage.getItem("SubjectPlotForm")){
            let SubjectPlotForm = JSON.parse(localStorage.getItem("SubjectPlotForm"))
          
            if (SubjectPlotForm.length !=0){
                for (let i = 0; i < SubjectPlotForm.length  ; ){
                    if (SubjectPlotForm[i].teacherID == teacherID && SubjectPlotForm[i].SubjectId == subjId ){
                        SubjectPlotForm.splice(i, 1);
                            i = 0;
                    }else{
                        i++
                    }
                }
            }
            localStorage.setItem("SubjectPlotForm", JSON.stringify(SubjectPlotForm))
        }

        let TeacherAssignSubject = JSON.parse(localStorage.getItem("TeacherAssignSubject"));

        for (let x = 0; x < TeacherAssignSubject.length ;){
            if (TeacherAssignSubject[x].subjectId == subjId && TeacherAssignSubject[x].teacherId == teacherID ){
                TeacherAssignSubject.splice(x, 1);
                x = 0;
            }else{
                x++
            }
        }
        localStorage.setItem("TeacherAssignSubject", JSON.stringify(TeacherAssignSubject))


        if (localStorage.getItem("StudentSubjectEnrolledInfo")){
            let StudentSubjectEnrolledInfo = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))

            if (StudentSubjectEnrolledInfo.length !=0 ){
                for (let i = 0; i < StudentSubjectEnrolledInfo.length ;){
                    if (StudentSubjectEnrolledInfo[i].TeacherId == teacherID && StudentSubjectEnrolledInfo[i].SubjectId == subjId   )
                    {
                        StudentSubjectEnrolledInfo.splice(i, 1);
                        i= 0;
                    }else{
                        i++
                    }
                }
                localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(StudentSubjectEnrolledInfo))
            }
        }

        if (localStorage.getItem("PeriodGradeSubject")){
            let PeriodGradeSubject = JSON.parse(localStorage.getItem("PeriodGradeSubject"))

            if (PeriodGradeSubject.length !=0){
                for (let i = 0; i < PeriodGradeSubject.length ;){
                    if (PeriodGradeSubject[i].TeacherId == teacherID && PeriodGradeSubject[i].SubjectID == subjId )
                    {
                        PeriodGradeSubject.splice(i, 1);
                        i =0
                    }else{
                        i++ 
                    }
                }
            }
            localStorage.setItem("PeriodGradeSubject", JSON.stringify(PeriodGradeSubject))
        }
            
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
    })
})
teacherAssignSubject()
TeacherName()
SubjectListData()