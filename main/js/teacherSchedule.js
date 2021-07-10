let url_string = window.location.href
let url = new URL(url_string);
let teacherID = url.searchParams.get("teacherID");

let urlSubjectId = window.location.href
let urlSubject = new URL(urlSubjectId);
let subjectID = urlSubject.searchParams.get("subjectId");


function OutputScheduleTable() {

    if (localStorage.getItem("Schedule") && localStorage.getItem("SubjectList")) {
        let schedule = JSON.parse(localStorage.getItem("Schedule"));
        let ScheduleTable = document.getElementById('TableScheduleList');
        let subjectList = JSON.parse(localStorage.getItem("SubjectList"))
        for (let i = 0; i < schedule.length; i++) {
            for (let x = 0; x < subjectList.length; x++) {
                if (schedule[i].subjectId == subjectList[x].SubjectID && subjectList[x].SubjectID == subjectID) {
                    ScheduleTable.insertAdjacentHTML('beforeend',
                        `
                    <tr>
                        <td class="text-center"><input type="checkbox" name="" id="" class="scheduleId mr-1" value="${schedule[i].ID}">${schedule[i].ID}</td>   
                        <td class="text-center">${subjectList[x].SubName}</td> 
                        <td class="text-center">
                        <p>${schedule[i].LecStartDate}-${schedule[i].LecEndDate}</p>
                        <p>${schedule[i].lecStarttime}-${schedule[i].lecEndTime}</p>
                        </td>
                        <td class="text-center">
                        <p>${schedule[i].LabStartDate}-${schedule[i].LabEndDate}</p>
                        <p>${schedule[i].LabStartTime}-${schedule[i].LabEndTime}</p>
                        </td>
                        <td class="text-center">${schedule[i].Description}</td>
                    </tr>
                 `
                    )
                }
            }





        }
    }
}

function OutputTeacherSchedule() {
    if (localStorage.getItem("TeacherSchedule")) {
        let Teacherschedule = JSON.parse(localStorage.getItem("TeacherSchedule"));

        let teacherschedTable = document.getElementById('TeacherListSchedule');
        let subjectList = JSON.parse(localStorage.getItem("SubjectList"))

        let schedule = JSON.parse(localStorage.getItem("Schedule"));
        for (let i = 0; i < Teacherschedule.length; i++) {
            if (Teacherschedule[i].TeacherId == teacherID ){
                for (let x = 0; x < schedule.length; x++ ){
                    if (Teacherschedule[i].ScheduleId == schedule[x].ID){
                        for (let z = 0; z < subjectList.length; z++ ){
                            if (schedule[x].subjectId == subjectList[z].SubjectID && schedule[x].subjectId == subjectID){
                                teacherschedTable.insertAdjacentHTML('beforeend',
                          `
                        <tr>
                        <td class="text-center">${schedule[x].ID}</td>
                        <td class="text-center">${subjectList[z].SubName}</td>
                        <td class="text-center">
                        <p>${schedule[x].LecStartDate}-${schedule[x].LecEndDate}</p>
                        <p>${schedule[x].lecStarttime}-${schedule[x].lecEndTime}</p>
                        </td>
                        <td class="text-center">
                        <p>${schedule[x].LabStartDate}-${schedule[x].LabEndDate}</p>
                        <p>${schedule[x].LabStartTime}-${schedule[x].LabEndTime}</p>
                        </td>
                        <td class="text-center">${schedule[x].Description}</td>
                        <td class="d-flex justify-content-center">
                        <input type="hidden" class="TShedId" value="${Teacherschedule[i].ID}">
                        <input type="hidden" class="SubID" value="${subjectList[z].SubjectID}">
                        <button class="btn btn-danger DeleteTableScheduleInfo"> <i class="fas fa-trash"></i></button>
                        </td>
                             </tr>
                        `
                                )
                            }
                        }
                    }
                }
             }
        }
    }
}

function TSchedIdGenerator() {
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    if (localStorage.getItem("TeacherSchedule")) {

        let student = JSON.parse(localStorage.getItem("TeacherSchedule"));
        let Value_length = student.length
        if (Value_length == 0) {
            return "Tsched-" + DateNow + "-1";
        } else {


            let Value = student[Value_length - 1].ID;
            let Value_split = Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "Tsched-" + DateNow + "-" + Parsing.toString();
        }
    } else {
        return "Tsched-" + DateNow + "-1";
    }
}


function ObjectTeacher(Id,TeacherId , ScheduleId){
    let Object = {
        ID: Id,
        TeacherId: TeacherId,
        ScheduleId: ScheduleId
    }
    return Object
}

function TeacherName() {
    let whereLength = 0;
    let teacher = JSON.parse(localStorage.getItem("Teacher"))

    for (let i = 0; i < teacher.length ; i++){
        if (teacher[i].Id == teacherID){
            whereLength = i;
            break;
        }
    }
    $('#TeacherName').text(teacher[whereLength].Fname + " " + teacher[whereLength].Lname);

}

function SubjectName() {
    let whereLength = 0;
    let SubjectList = JSON.parse(localStorage.getItem("SubjectList"))

    for (let i = 0; i < SubjectList.length; i++) {
        if (SubjectList[i].SubjectID == subjectID) {
            whereLength = i;
            break;
        }
    }
    $('#NameSubject').text(SubjectList[whereLength].SubName);

}

$(document).ready(function () {
    $('#ScheduleTable').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No Schedule Available"
        },
      


    });

    $('#AssignSchedule').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No Assign Schedule"
        },



    });

    $('#AddTeacherSchedule').on('click', function (e) {
        var scheduleID = $('.scheduleId:checked').map(function () {
            return $(this).val();
        }).get();

        if (scheduleID.length != 0){
            if (localStorage.getItem("TeacherSchedule")){
                let teachSched = JSON.parse(localStorage.getItem("TeacherSchedule"))
                let IsNotSame = true;
                for (let x = 0; x < teachSched.length; x++){
                    for (let i = 0; i < scheduleID.length; i++) {
                        if (teachSched[x].TeacherId == teacherID && teachSched[x].ScheduleId == scheduleID[i] ){
                            IsNotSame = false;
                            break;
                        }
                    }
                }

                if (IsNotSame){
                    for (let i = 0; i < scheduleID.length; i++) {
                        let Sched = JSON.parse(localStorage.getItem("TeacherSchedule"))
                        Sched.push(ObjectTeacher(TSchedIdGenerator(),teacherID, scheduleID[i]))
                        localStorage.setItem("TeacherSchedule", JSON.stringify(Sched));
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
                            location.reload();
                        }
                    });

                }else{
                    Swal.fire({
                        title: "Error",
                        text: "Duplicated Schedule!",
                        type: "warning",
                    })
                }
            }else{
                let teachschedule = [];
                for (let i = 0; i < scheduleID.length ; i++ ){
                   
                    teachschedule.push(ObjectTeacher(TSchedIdGenerator(), teacherID, scheduleID[i]))
                    localStorage.setItem("TeacherSchedule", JSON.stringify(teachschedule));
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
    });

    $('.DeleteTableScheduleInfo').on('click', function (e) {

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        let TeacherSched = JSON.parse(localStorage.getItem("TeacherSchedule"))
        Swal.fire({
            title: 'Are you sure?',
            text: "All data Will be Deleted!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {               
        for (let i = 0; i < TeacherSched.length; ) {
            if (TeacherSched[i].TeacherId == teacherID && TeacherSched[i].ScheduleId == data[0]) {
                TeacherSched.splice(i, 1);
                i =0;
            }else{
                i++
            }
        }
        localStorage.setItem("TeacherSchedule", JSON.stringify(TeacherSched));
            
            let TSched = $(this).parent().find(".TShedId").val();
            let SubID = $(this).parent().find(".SubID").val();

            let Istrue = false;
        if (localStorage.getItem("StudentSubjectEnrolledInfo")){
            let subjectEnroll = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))
            
            if (subjectEnroll.length !=0){
                for (let x = 0; x < subjectEnroll.length;){
                    if (subjectEnroll[x].TeacherScheduledID == TSched){
                        subjectEnroll.splice(x, 1);
                        Istrue = true;
                        x= 0
                    }else{
                        x++ 
                    }
                }
            }
            localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(subjectEnroll))
        
            }
                if (Istrue){
                    let PeriodGradeSubject = JSON.parse(localStorage.getItem("PeriodGradeSubject"))
                    if (localStorage.getItem("PeriodGradeSubject")) {
                        if (PeriodGradeSubject.length != 0) {
                            const PeriodStud = PeriodGradeSubject.filter((item) => item.TeacherScheduled !== TSched);
                            localStorage.setItem("PeriodGradeSubject", JSON.stringify(PeriodStud)); 
                        }
                      
                    }

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
    });
});
SubjectName()
TeacherName()
OutputTeacherSchedule()
OutputScheduleTable() 
