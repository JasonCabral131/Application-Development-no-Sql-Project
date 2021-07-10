let url_string = window.location.href
let url = new URL(url_string);
let subID = url.searchParams.get("SubjectId");

let url_stringteacherID = window.location.href
let urlteacherID = new URL(url_stringteacherID);
let teacherID = urlteacherID.searchParams.get("teacherID");

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
function SubjectName(){
    let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));
    let Name = "";
    let semestralinfo = document.querySelector('#semestralinfo');
    for (let i = 0; i < SubjectList.length; i++) {
        if (SubjectList[i].SubjectID == subID){
            Name = SubjectList[i].SubName;
        }
    }
    if (localStorage.getItem("SubjectPlotForm")){
        let SPL = JSON.parse(localStorage.getItem("SubjectPlotForm"));
        
        for (let z = 0; z < SPL.length; z++){

            if (SPL[z].SubjectId == subID && SPL[z].teacherID == teacherID ){
                semestralinfo.insertAdjacentHTML('beforeend',
                    `
        <tr>
            <td class="text-center">${SPL[z].PlotForm}</td>
            <td class="text-center">${Name}</td>
             <td class="text-center">${SPL[z].Period}</td>
            <td class="d-flex justify-content-center"><button class="btn btn-info EditTableSUbInfo" > <i class="fas fa-edit"></i></button>
                                                   </td>
            </tr>
        `
                ) 
            }
            
        }
       
       
    }
    document.querySelector('#SubjectIDOUTPUT').textContent = Name;
}

function plotformIDGenerator(){
    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    let SubjectList = JSON.parse(localStorage.getItem("SubjectPlotForm"));
    let Value_length = SubjectList.length

    if (Value_length == 0){
        return "SPF-" + DateNow + "-1";
    }else{

 
    let Value = SubjectList[Value_length - 1].PlotForm;
    let Value_split = Value.split("-");
    let Parsing = parseInt(Value_split[2]) + 1;
    return "SPF-" + DateNow + "-" + Parsing.toString();
    }
}
function SubjectObject(teacherId,plotformId,subId,period,lecquiz,lecattend,lecindependent,leclectureExam,labmachine,labattendance,labLaboratoryExam){
    let objectSub = {
        teacherID: teacherId,
        PlotForm: plotformId,
        SubjectId: subId,
        Period: period,
        lecture :{
            quiz: lecquiz,
            attendance: lecattend,
            IndependentLearning: lecindependent,
            LectureExam: leclectureExam
        },
        laboratory: {
            MachineProblem: labmachine,
            Attendance: labattendance,
            LaboratoryExam: labLaboratoryExam
        }

    }
    return objectSub;
}

$(document).ready(function () {
    $('#SAVESUBPLOTFORM').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault()
            let SesmestralPeriod    = $('#SemestralPeriodSelect').val();
            let lecquiz             = $('#lecquiz').val();
            let lecattend           = $('#lecAttendance').val();
            let lecindependent      = $('#lecIndependent').val();
            let leclectureExam      = $('#lecExam').val();
            let labmachine          = $('#labquiz').val();
            let labattendance       = $('#LabAttendance').val();
            let labLaboratoryExam   = $('#labExam').val();
            let Datex = new Date();
            let DateNow = Datex.getFullYear();
            let SPLID = "SPF-" + DateNow + "-1";
            if(localStorage.getItem("SubjectPlotForm")){
                let IsNotSame = true;
                let SPL = JSON.parse(localStorage.getItem("SubjectPlotForm"));
                    for(let x = 0; x < SPL.length; x++){
                        
                        if (SPL[x].teacherID == teacherID && SPL[x].SubjectId == subID && SPL[x].Period == SesmestralPeriod ){
                            IsNotSame = false;
                            break;
                        } 
                    }

                if (IsNotSame){
                    Swal.fire({
                        title: 'Successfully',
                        text: "Added",
                        type: 'success',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Okay'
                    }).then((result) => {
                        if (result.value) {
                           
                            SPL.push(SubjectObject(teacherID,plotformIDGenerator(), subID, SesmestralPeriod, lecquiz, lecattend, lecindependent, leclectureExam, labmachine, labattendance, labLaboratoryExam))
                            localStorage.setItem("SubjectPlotForm", JSON.stringify(SPL));
                            location.reload()
                        }
                    }) 
                }else{
                    Swal.fire({
                        title: "Error",
                        text: "Already Existed, Just Update!!",
                        type: "warning",
                    }) 
                }

            }else{
                Swal.fire({
                    title: 'Successfully',
                    text: "Added",
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        let SubArray = [];
                        SubArray.push(SubjectObject(teacherID,SPLID, subID, SesmestralPeriod, lecquiz, lecattend, lecindependent, leclectureExam, labmachine, labattendance, labLaboratoryExam))
                        localStorage.setItem("SubjectPlotForm", JSON.stringify(SubArray));
                        location.reload()
                    }
                }) 
               
            }
        }
    });
});

$(document).ready(function () {
    $('.EditTableSUbInfo').on('click', function (e) {
        $('#UpdateSubModal').modal('show');

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data);

        let SPL = JSON.parse(localStorage.getItem("SubjectPlotForm")); 
        $('#SemestralPeriodSelect1').text(data[2])
       
            for(let i = 0 ; i < SPL.length ; i++){
                if (SPL[i].PlotForm == data[0]){
                    $('#SUBID').text(data[0]);
                    $('#lecquiz1').val(parseFloat(SPL[i].lecture.quiz));
                    $('#lecAttendance1').val(parseFloat(SPL[i].lecture.attendance));
                    $('#lecIndependent1').val(parseFloat(SPL[i].lecture.IndependentLearning));
                    $('#lecExam1').val(parseFloat(SPL[i].lecture.LectureExam));
                    $('#labquiz1').val(parseFloat(SPL[i].laboratory.MachineProblem));
                    $('#LabAttendance1').val(parseFloat(SPL[i].laboratory.Attendance));
                    $('#labExam1').val(parseFloat(SPL[i].laboratory.LaboratoryExam));
                }
            }
      
        
    });
}); 

$(document).ready(function () {
    $('#UPDATEDATA').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            let ID                  = $('#SUBID').text();
            let SesmestralPeriod    = $('#SemestralPeriodSelect1').text();
            let lecquiz             = $('#lecquiz1').val();
            let lecattend           = $('#lecAttendance1').val();
            let lecindependent      = $('#lecIndependent1').val();
            let leclectureExam      = $('#lecExam1').val();
            let labmachine          = $('#labquiz1').val();
            let labattendance       = $('#LabAttendance1').val();
            let labLaboratoryExam   = $('#labExam1').val();
            let SPL = JSON.parse(localStorage.getItem("SubjectPlotForm")); 
            let IsNotSame = true;
            let WhereToUpdate = 0;
            e.preventDefault();

            for (let i = 0; i < SPL.length ; i++){
                if (SPL[i].PlotForm != ID 
                            && 
                    SPL[i].SubjectId == subID 
                            && 
                    SPL[i].Period == SesmestralPeriod 
                            && 
                    SPL[i].teacherID == teacherID){
                    IsNotSame = false;
                    break;      
                } else if (SPL[i].PlotForm == ID){
                    WhereToUpdate = i;
                }
            }
            if (IsNotSame){
                SPL[WhereToUpdate].Period = SesmestralPeriod;
                SPL[WhereToUpdate].lecture.IndependentLearning = lecindependent;
                SPL[WhereToUpdate].lecture.LectureExam = leclectureExam;
                SPL[WhereToUpdate].lecture.attendance = lecattend;
                SPL[WhereToUpdate].lecture.quiz = lecquiz;
                SPL[WhereToUpdate].laboratory.Attendance = labattendance;
                SPL[WhereToUpdate].laboratory.LaboratoryExam = labLaboratoryExam;
                SPL[WhereToUpdate].laboratory.MachineProblem = labmachine;
                Swal.fire({
                    title: 'Successfully',
                    text: "Updated",
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        localStorage.setItem("SubjectPlotForm", JSON.stringify(SPL));
                        location.reload();
                    }
                }) 
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Invalid This Will Be duplicated",
                    type: "warning",
                }) 

            }
            
        }
       
    });
}); 

SubjectName()
TeacherName()