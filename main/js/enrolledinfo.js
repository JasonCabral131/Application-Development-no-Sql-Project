let url_stringEnrolled = window.location.href
let urlEnrolled = new URL(url_stringEnrolled);
let EnrolledID = urlEnrolled.searchParams.get("EnrollId");

let url_stringStudent = window.location.href
let urlStudent = new URL(url_stringStudent);
let StudentID = urlStudent.searchParams.get("StudentId");
function OutputTeacherSchedule() {
    if (localStorage.getItem("TeacherSchedule")) {
        let Teacherschedule = JSON.parse(localStorage.getItem("TeacherSchedule"));
        let teacher = JSON.parse(localStorage.getItem("Teacher"))
        let schedule = JSON.parse(localStorage.getItem("Schedule"))
        let subjectList = JSON.parse(localStorage.getItem("SubjectList"))
        let teacherschedTable = document.getElementById('TeacherSubjectList');
        for (let i = 0; i < Teacherschedule.length; i++){
           
            for (let y = 0; y < teacher.length ; y++){
                
                if (Teacherschedule[i].TeacherId == teacher[y].Id ){

                    for (let x = 0; x < schedule.length; x++) {
                        if (Teacherschedule[i].ScheduleId == schedule[x].ID) {
                            for (let z = 0; z < subjectList.length; z++) {
                                if (schedule[x].subjectId == subjectList[z].SubjectID) {
                                    teacherschedTable.insertAdjacentHTML('beforeend',
                                        `
                        <tr>
                        <td class="text-center">
                        <input type="checkbox" class="ml-1 Tsched" 
                        value="${Teacherschedule[i].ID + "/" + teacher[y].Id + "/" + subjectList[z].SubjectID}" >
                        ${Teacherschedule[i].ID}</td>
                        <td class="text-center">
                        <p>${teacher[y].Fname} &nbsp; ${teacher[y].Lname}</p>
                        </td>
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
}

function objectEnrolledInfo(id, enrolledId, studentId, teacherId, subjectID, TeacherScheduledID){
    let object = {
        ID: id,
        EnrolledID: enrolledId,
        StudentId: studentId,
        TeacherId: teacherId,
        SubjectId: subjectID,
        TeacherScheduledID: TeacherScheduledID,
        Prelim: 0,
        midterm: 0,
        prefinal: 0,
        final: 0,
    }
    return object;
}
function EnrolledInfo() {
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    if (localStorage.getItem("StudentSubjectEnrolledInfo")) {

        let student = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"));
        let Value_length = student.length
        if (Value_length == 0) {
            return "E-" + DateNow + "-1";
        } else {


            let Value = student[Value_length - 1].ID;
            let Value_split = Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "E-" + DateNow + "-" + Parsing.toString();
        }
    } else {
        return "E-" + DateNow + "-1";
    }
}

$(document).ready(function () {


    $('#TeacherAndSubjectTable').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No data Available"
        },



    });

    $('#ScheduleTable').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No Schedule Available"
        },



    });

    $('#AddTeachAndSubjectSchedule').on('click', function (e) {
        var Tsched = $('.Tsched:checked').map(function () {
            return $(this).val();
        }).get();
        if (Tsched.length !=0){
                    if(localStorage.getItem("StudentSubjectEnrolledInfo")){
                        let studentEnrolled = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo")) 
                        
                        let ThisArrayChecker = [];
                        for (let i = 0; i < Tsched.length; i++) {
                            let valueOf = Tsched[i].split("/")
                            let ObjectChecker = {
                                ID: i,
                                SubjectId: valueOf[2],
                                TeacherId: valueOf[1],
                                TeacherScheduleId: valueOf[0]
                            }
                            ThisArrayChecker.push(ObjectChecker)
                        }
                        let NotSame = true;
                        for (let i = 0; i < Tsched.length; i++) {
                            let valueOf = Tsched[i].split("/")
                            if (Tsched.length != 1) {
                                for (let x = i + 1; x < ThisArrayChecker.length; x++) {
                                    if (ThisArrayChecker[x].SubjectId == valueOf[2]) {
                                        NotSame = false;
                                        break;
                                    } else {

                                    }
                                }
                            }
                        } 
                        
                        if (NotSame){
                            let IsNotSame = true;
                            for (let x = 0; x < Tsched.length; x++) {
                                let valueOf = Tsched[x].split("/")

                                for (let i = 0; i < studentEnrolled.length; i++) {
                                    if (studentEnrolled[i].StudentId == StudentID && studentEnrolled[i].SubjectId == valueOf[2]) {
                                        IsNotSame = false;
                                        break;
                                    }

                                }

                            }

                            if (IsNotSame) {
                                for (let x = 0; x < Tsched.length; x++) {
                                    let valueOf = Tsched[x].split("/")
                                    studentEnrolled.push(objectEnrolledInfo(EnrolledInfo(), EnrolledID, StudentID, valueOf[1], valueOf[2], valueOf[0]))
                                    localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(studentEnrolled))
                                }

                                Swal.fire({
                                    title: "Successful",
                                    text: "Added Successfully",
                                    allowOutsideClick: false,
                                    type: "success",
                                    confirmButtonColor: "#3085d6",
                                    confirmButtonText: "Okay",
                                }).then((result) => {
                                    if (result) {
                                        location.reload();
                                    }
                                });
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    text: "Duplicated Subject!  / Alrady been Taken",
                                    type: "warning",
                                })
                            }
                        }else{

                            Swal.fire({
                                title: "Error",
                                text: "Duplicated Subject!",
                                type: "warning",
                            })

                        }
                       





                    }else{

                        let ThisArrayChecker = [];
                        for (let i = 0; i < Tsched.length ; i++){
                            let valueOf = Tsched[i].split("/")   
                            let ObjectChecker = {
                                 ID: i,
                                SubjectId: valueOf[2],
                                TeacherId: valueOf[1],
                                TeacherScheduleId: valueOf[0]
                            }
                            ThisArrayChecker.push(ObjectChecker) 
                        }
                            let NotSame = true;
                        for (let i = 0; i < Tsched.length; i++) {
                            let valueOf = Tsched[i].split("/")   
                            if(Tsched.length !=1){
                                for (let x = i+1; x < ThisArrayChecker.length; x++) {
                                    if (ThisArrayChecker[x].SubjectId == valueOf[2]) {
                                        NotSame = false; 
                                        break;
                                    } else {
                                            
                                    }
                                }
                            }
                        }     
                        if (NotSame){
                            let ArrayTrue =[]
                            for (let i = 0; i < Tsched.length; i++) {
                                let valueOf = Tsched[i].split("/")   
                                ArrayTrue.push(objectEnrolledInfo(EnrolledInfo(), EnrolledID, StudentID, valueOf[1], valueOf[2], valueOf[0]))
                                localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(ArrayTrue))
                            }
                            Swal.fire({
                                title: "Successful",
                                text: "Added Successfully",
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
                                text: "Duplicated Subject!",
                                type: "warning",
                            }) 
                        }
                      
                    }         
        }else{
            Swal.fire({
                title: "Error",
                text: "Select Schedule Or Taken",
                type: "warning",
            })
        }
    })
    $('.Delete').on('click', function (e){
        let subId = $(this).parent().find(".SubjectId").val();
        let teacherId = $(this).parent().find(".teacherID").val();
        let StudEnrollID  = $(this).parent().find(".StudEnrollID").val();
    
        Swal.fire({
            title: 'Are you sure?',
            text: "All Data Under This Subject Will Be Deleted And Including Schedule!!!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) { 

                let SubEnroll = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))
                let iStrue = false;
                if (SubEnroll.length !=0){
                    for (let i = 0; i < SubEnroll.length; ){
                        if (SubEnroll[i].ID == StudEnrollID
                                            &&
                            SubEnroll[i].SubjectId == subId
                                            &&
                            SubEnroll[i].TeacherId == teacherId
                                            &&
                            SubEnroll[i].StudentId == StudentID                
                            ){
                            SubEnroll.splice(i,1)
                            iStrue = true
                            i=0
                        }else{
                            i++
                        }
                    }
                    localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(SubEnroll))
                }
                 
                if (iStrue){
                    let PeriodSub = JSON.parse(localStorage.getItem("PeriodGradeSubject"));

                    for (let i = 0; i < PeriodSub.length; ){
                        if (PeriodSub[i].SubjectID == subId
                                        &&
                            PeriodSub[i].StudentId == StudentID
                                        &&
                            PeriodSub[i].TeacherId == teacherId
                            
                            ){
                            PeriodSub.splice(i,1)
                            i = 0;
                            }else{
                                i++
                            }
                    }   
                    localStorage.setItem("PeriodGradeSubject", JSON.stringify(PeriodSub))
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

function OutputEnrolledSubject(){
    if (localStorage.getItem("StudentSubjectEnrolledInfo")){
        let enrollSub = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))  
        let subjectList = JSON.parse(localStorage.getItem("SubjectList"))
        let Teacher = JSON.parse(localStorage.getItem("Teacher"));
        let OutputSubject = document.getElementById('EnrolledSubjectList')
            for(let t=0 ; t < enrollSub.length; t++){
                for (let i = 0; i < Teacher.length; i++){
                    for (let x = 0; x < subjectList.length;x++){
                        if (
                            enrollSub[t].StudentId == StudentID 
                                        && 
                            enrollSub[t].EnrolledID == EnrolledID
                                        &&
                            enrollSub[t].TeacherId == Teacher[i].Id         
                                        &&  
                            enrollSub[t].SubjectId == subjectList[x].SubjectID
                            )
                            {
                            
                            let semGrade = ((parseFloat(enrollSub[t].Prelim) * .2) + (parseFloat(enrollSub[t].midterm) * .2) + (parseFloat(enrollSub[t].prefinal) * .2) + (parseFloat(enrollSub[t].final) * .4))  
                            let semFinal = (Math.round(semGrade * 100) / 100).toFixed(1);
                            OutputSubject.insertAdjacentHTML('beforeend',
                                `
                        <tr>
                        <td class="text-center">${Teacher[i].Fname + " " + Teacher[i].Lname}</td>
                        <td class="text-center">${subjectList[x].SubName}</td>
                        <td class="text-center">${enrollSub[t].Prelim}</td>
                        <td class="text-center">${enrollSub[t].midterm}</td>
                        <td class="text-center">${enrollSub[t].prefinal}</td>
                        <td class="text-center">${enrollSub[t].final}</td>
                        <td class="text-center">${semFinal}</td>
                        <td class="text-center">${(semGrade <=75) ? "Fail" : "Pass"}</td>
                        <td class="text-center">
                        <input type="hidden" class="StudEnrollID"  value="${enrollSub[t].ID}">
                        <input type="hidden" class="teacherID"  value="${Teacher[i].Id}">
                        <input type="hidden" class="SubjectId"  value="${subjectList[x].SubjectID}">
                        <button class="btn btn-info "><a href="StudentSubjectGradeInfo.html?StudentId=${StudentID}&teacherID=${Teacher[i].Id}&SubjectID=${subjectList[x].SubjectID}&EnrollId=${EnrolledID}&TSched=${enrollSub[t].TeacherScheduledID}" class="text-black"><i class="far fa-eye">info</i></a></button>
                        <button class="btn btn-danger Delete"> <i class="fas fa-trash"></i></button>
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

function ScheduleStudentOutput(){
    if (localStorage.getItem("StudentSubjectEnrolledInfo")){

        let enrollScheduled = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))
        let tcherSched = JSON.parse(localStorage.getItem("TeacherSchedule"))
        let teacher = JSON.parse(localStorage.getItem("Teacher"))
        let Schedule = JSON.parse(localStorage.getItem("Schedule"))
        let Subject = JSON.parse(localStorage.getItem("SubjectList"))
        let Sheduletable = document.querySelector('#ScheduleListTable');
        for (let i = 0; i < enrollScheduled.length;i++){
            for (let x = 0; x < tcherSched.length;x++){
                if (enrollScheduled[i].TeacherScheduledID == tcherSched[x].ID 
                                        &&
                    enrollScheduled[i].StudentId == StudentID
                                        &&
                    enrollScheduled[i].EnrolledID == EnrolledID                      
                    ){
                    for (let z = 0; z < teacher.length; z++) {
                        if (enrollScheduled[i].TeacherId == teacher[z].Id){
                            for (let y = 0; y < Schedule.length; y++){
                                if (tcherSched[x].ScheduleId == Schedule[y].ID){
                                    for (let k = 0; k < Subject.length; k++){
                                        if (Schedule[y].subjectId == Subject[k].SubjectID){
                                            Sheduletable.insertAdjacentHTML('beforeend',
                                                `
                                                <tr>
                                                <td class="text-center">${teacher[z].Fname + " " + teacher[z].Lname}</td>
                                                <td class="text-center">${Subject[k].SubName}</td>
                                                <td class="text-center">
                                                    <p>${Schedule[y].LecStartDate + "-" + Schedule[y].LecEndDate}</p>
                                                    <p>${Schedule[y].lecStarttime + "-" + Schedule[y].lecEndTime}</p>
                                                </td>
                                                <td class="text-center">
                                                    <p>${Schedule[y].LabStartDate + "-" + Schedule[y].LabEndDate}</p>
                                                    <p>${Schedule[y].LabStartTime + "-" + Schedule[y].LabEndTime}</p>
                                                </td class="text-center">
                                                <td>${Schedule[y].Description}</td>
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
        }
    }
   
}
function StudentName() {
    let Name = JSON.parse(localStorage.getItem("Student"));
    
    for(let i = 0 ; i < Name.length;i++){
        if (Name[i].StudentId == StudentID ){
            $('#StudentName').text(Name[i].Fname + " " + Name[i].Lname )
            break
        }
    }
}

OutputEnrolledSubject()
StudentName()
OutputTeacherSchedule()
ScheduleStudentOutput()

