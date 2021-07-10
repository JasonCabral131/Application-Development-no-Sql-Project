

let url_stringStudent = window.location.href
let urlStudent = new URL(url_stringStudent);
let StudentID = urlStudent.searchParams.get("StudentId");

let url_stringSubject = window.location.href
let urlSubject = new URL(url_stringSubject);
let SubjectID = urlSubject.searchParams.get("SubjectID");

let url_stringteacher = window.location.href
let urlteacher = new URL(url_stringteacher);
let teacherID = urlteacher.searchParams.get("teacherID");

let url_stringEnrolled = window.location.href
let urlEnrolled = new URL(url_stringEnrolled);
let EnrolledID = urlEnrolled.searchParams.get("EnrollId");

let url_stringTSched = window.location.href
let urlTSched = new URL(url_stringTSched);
let TSchedID = urlTSched.searchParams.get("TSched");

(function ($) {
    $.fn.restrict = function () {
        return this.each(function () {
            $(this).on('change', function () {
                var _self = this,
                    v = parseFloat(_self.value),
                    min = parseFloat(_self.min),
                    max = parseFloat(_self.max);  
                if (v >= min && v <= max) {
                    _self.value = v;
                }
                else {
                    _self.value = v < min ? min : max;
                }
            });
        });
    };
})(jQuery);


function OutputTableData() {
    let IsIdValue = "";
    if (localStorage.getItem("SubjectPlotForm")){
        let ListPlotFormTable = document.querySelector('#ListPlotFormTable')
        let plotform = JSON.parse(localStorage.getItem("SubjectPlotForm"))
        let PeriodGradeSubject = JSON.parse(localStorage.getItem("PeriodGradeSubject"))
        for (let i = 0; i < plotform.length ; i++ ){
            if (plotform[i].teacherID == teacherID && plotform[i].SubjectId == SubjectID) {
                    
                if (localStorage.getItem("PeriodGradeSubject")){
                    if (PeriodGradeSubject.length !=0){
                       
                        for (let z = 0; z < PeriodGradeSubject.length; z++){
                            if (plotform[i].PlotForm == PeriodGradeSubject[z].AssignId
                                                && 
                                PeriodGradeSubject[z].EnrolledId == EnrolledID
                                                &&
                                PeriodGradeSubject[z].StudentId == StudentID
                            ){
                                ListPlotFormTable.insertAdjacentHTML('beforeend',
                                    `
                                        <tr>
                                        <td class="text-center">${plotform[i].PlotForm}</td>
                                        <td class="text-center">${plotform[i].Period}</td>
                                        <td class="text-center">${PeriodGradeSubject[z].LectureGrade}</td>
                                        <td class="text-center">${PeriodGradeSubject[z].Laboratory}</td>
                                        <td class="text-center">${PeriodGradeSubject[z].PartialGrade}</td>
                                        <td class="d-flex justify-content-center">
                                        <button class="btn btn-info PlotFormView" > <i class="fas fa-edit"></i></button>
                                        </td>
                                        </tr>
                                    `
                                )
                                IsIdValue += plotform[i].PlotForm +"/"
                            }  
                        }
                        
                    }
                }                        
        }
        
    }
        let value = IsIdValue.split("/")
        for (let i = 0; i < plotform.length; i++ ){
            if (plotform[i].teacherID == teacherID && plotform[i].SubjectId == SubjectID){
                
                if (IsIdValue == ""){
                    ListPlotFormTable.insertAdjacentHTML('beforeend',
                        `
                            <tr>
                            <td class="text-center">${plotform[i].PlotForm}</td>
                            <td class="text-center">${plotform[i].Period}</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="d-flex justify-content-center">
                            <button class="btn btn-info PlotFormView" > <i class="fas fa-edit"></i></button>
                            </td>
                            </tr>
                            `
                    )
                }else if (value.length ==2 ) {
                    if (plotform[i].PlotForm != value[0]){
                        ListPlotFormTable.insertAdjacentHTML('beforeend',
                            `
                            <tr>
                            <td class="text-center">${plotform[i].PlotForm}</td>
                            <td class="text-center">${plotform[i].Period}</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="d-flex justify-content-center">
                            <button class="btn btn-info PlotFormView" > <i class="fas fa-edit"></i></button>
                            </td>
                            </tr>
                            `
                        )
                        }
                } else if (value.length == 3){
                    if (plotform[i].PlotForm != value[0] 
                                && 
                        plotform[i].PlotForm != value[1]) {
                        ListPlotFormTable.insertAdjacentHTML('beforeend',
                            `
                            <tr>
                            <td class="text-center">${plotform[i].PlotForm}</td>
                            <td class="text-center">${plotform[i].Period}</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="d-flex justify-content-center">
                            <button class="btn btn-info PlotFormView" > <i class="fas fa-edit"></i></button>
                            </td>
                            </tr>
                            `
                        )
                    }
                } else if (value.length == 4){
                    if (plotform[i].PlotForm != value[0] 
                                && 
                        plotform[i].PlotForm != value[1] 
                                && 
                        plotform[i].PlotForm != value[2]) {
                        ListPlotFormTable.insertAdjacentHTML('beforeend',
                            `
                            <tr>
                            <td class="text-center">${plotform[i].PlotForm}</td>
                            <td class="text-center">${plotform[i].Period}</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="d-flex justify-content-center">
                            <button class="btn btn-info PlotFormView" > <i class="fas fa-edit"></i></button>
                            </td>
                            </tr>
                            `
                        )
                    }
                } else if (value.length == 5){
                    if (plotform[i].PlotForm != value[0]
                                        &&
                        plotform[i].PlotForm != value[1]
                                        &&
                        plotform[i].PlotForm != value[2]
                                        &&
                        plotform[i].PlotForm != value[3]) {
                        ListPlotFormTable.insertAdjacentHTML('beforeend',
                            `
                            <tr>
                            <td class="text-center">${plotform[i].PlotForm}</td>
                            <td class="text-center">${plotform[i].Period}</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="text-center">0</td>
                            <td class="d-flex justify-content-center">
                            <button class="btn btn-info PlotFormView" > <i class="fas fa-edit"></i></button>
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
function StudentName() {
    let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));
    let Namex = "";
    for (let i = 0; i < SubjectList.length; i++) {
        if (SubjectList[i].SubjectID == SubjectID) {
            Namex = SubjectList[i].SubName;
        }
    }

    let Name = JSON.parse(localStorage.getItem("Student"));

    for (let i = 0; i < Name.length; i++) {
        if (Name[i].StudentId == StudentID) {
            $('#StudentName').text(Name[i].Fname + " " + Name[i].Lname)
            break
        }
    }

    let Teachername = JSON.parse(localStorage.getItem("Teacher"))
    for (let i = 0; i < Teachername.length; i++){
        if (Teachername[i].Id == teacherID){
            document.querySelector('#TeacherName').textContent = Teachername[i].Fname + " " + Teachername[i].Lname;
            break
        }
    }
    document.querySelector('#SubjectIDOUTPUT').textContent = Namex;
    document.querySelector('#SubjectIDOUTPUT1').textContent = Namex;
}

function maximizetheinput(){
    let LecAttendance1 =    $('#LecAttendance1').text()
    let lecQuiz1 =   $('#lecQuiz1').text()
    let lecIndependent1 =   $('#lecIndependent1').text()
    let lecMajor1 =   $('#lecMajor1').text()
    let LabMachineProblem1 =   $('#LabMachineProblem1').text()
    let labAttendance1 =   $('#labAttendance1').text()
    let labExam1 =   $('#labExam1').text()

    document.querySelector('#LecAttendance').max = parseFloat(LecAttendance1)
    document.querySelector('#lecQuiz').max = parseFloat(lecQuiz1);
    document.querySelector('#lecIndependent').max = parseFloat(lecIndependent1);
    document.querySelector('#lecMajor').max = parseFloat(lecMajor1);
    document.querySelector('#LabMachineProblem').max = parseFloat(LabMachineProblem1);
    document.querySelector('#labAttendance').max = parseFloat(labAttendance1);
    document.querySelector('#labExam').max = parseFloat(labExam1);
}

function GradeSubjectObject(AssignId,subjectID, StudentId, TeacherId, EnrolledId, lecquiz, lecattend, lecindependent, lectureExam, labmachine, labattendance, labLaboratoryExam, LectureGrade, Laboratory, PartialGrade){
    let Object = {
        AssignId: AssignId,
        SubjectID: subjectID,
        StudentId: StudentId,
        TeacherId: TeacherId,
        EnrolledId: EnrolledId,
        TeacherScheduled:TSchedID,
        lecture: {
            quiz: lecquiz,
            attendance: lecattend,
            IndependentLearning: lecindependent,
            LectureExam: lectureExam
        },
        laboratory: {
            MachineProblem: labmachine,
            Attendance: labattendance,
            LaboratoryExam: labLaboratoryExam
        },
        LectureGrade: LectureGrade,
        Laboratory: Laboratory,
        PartialGrade: PartialGrade

    }
    return Object
}

   
$(document).ready(function () {


    $('#StudentSemestralTable').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No platform for this subject"
        },

    });
    $('.PlotFormView').on('click', function () {
        $('#PlotFormModal').modal('show');

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
       
        let platform = JSON.parse(localStorage.getItem("SubjectPlotForm"))
            for(let i = 0 ; i < platform.length;i++){
                if (platform[i].PlotForm == data[0])  {
                    
                    $('#LecAttendance1').text(platform[i].lecture.attendance)
                    $('#lecQuiz1').text(platform[i].lecture.quiz)
                    $('#lecIndependent1').text(platform[i].lecture.IndependentLearning)
                    $('#lecMajor1').text(platform[i].lecture.LectureExam)
                   
                    $('#LabMachineProblem1').text(platform[i].laboratory.MachineProblem)
                    $('#labAttendance1').text(platform[i].laboratory.Attendance)
                    $('#labExam1').text(platform[i].laboratory.LaboratoryExam)
                    break
                } 
            }
        $('#AssignId').val(data[0])
        maximizetheinput()

        if (localStorage.getItem("PeriodGradeSubject")){

            let StudentGrade = JSON.parse(localStorage.getItem("PeriodGradeSubject"))
            for (let i = 0; i < StudentGrade.length; i++) {
                if (StudentGrade[i].AssignId == data[0]
                    &&
                    StudentGrade[i].StudentId == StudentID
                    &&
                    StudentGrade[i].TeacherId == teacherID
                    &&
                    StudentGrade[i].EnrolledId == EnrolledID) {


                    $('#labAttendance').val(StudentGrade[i].laboratory.Attendance)
                    $('#labExam').val(StudentGrade[i].laboratory.LaboratoryExam)
                    $('#LabMachineProblem').val(StudentGrade[i].laboratory.MachineProblem)

                    $('#lecIndependent').val(StudentGrade[i].lecture.IndependentLearning)
                    $('#lecMajor').val(StudentGrade[i].lecture.LectureExam)
                    $('#LecAttendance').val(StudentGrade[i].lecture.attendance)
                    $('#lecQuiz').val(StudentGrade[i].lecture.quiz)
                    break;
                } else {
                    $('#labAttendance').val('')
                    $('#labExam').val('')
                    $('#LabMachineProblem').val('')

                    $('#lecIndependent').val('')
                    $('#lecMajor').val('')
                    $('#LecAttendance').val('')
                    $('#lecQuiz').val('')
                }
            }
        }
        

    });

    $('#AddTeachAndSubjectSchedule').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault();
            /* Lecture */
            let LecAttendance1      =   $('#LecAttendance1').text()
            let lecQuiz1            =   $('#lecQuiz1').text()
            let lecIndependent1     =   $('#lecIndependent1').text()
            let lecMajor1           =   $('#lecMajor1').text()
                /* Laboratory */
            let LabMachineProblem1  =   $('#LabMachineProblem1').text()
            let labAttendance1      =   $('#labAttendance1').text()
            let labExam1            =   $('#labExam1').text()
       
            /* Lecture */
            let LecAttendance       =   $('#LecAttendance').val();
            let lecQuiz             =   $('#lecQuiz').val();
            let lecIndependent      =   $('#lecIndependent').val();
            let lecMajor            =   $('#lecMajor').val();
            /* Laboratory */
            let LabMachineProblem   =   $('#LabMachineProblem').val();
            let labAttendance       =   $('#labAttendance').val();
            let labExam             =   $('#labExam').val();

            let AssignId            =   $('#AssignId').val();
            
            let Lecture_Grade = LectureGrade(parseFloat(LecAttendance1), parseFloat(lecQuiz1), parseFloat(lecIndependent1), parseFloat(lecMajor1), 
                parseFloat(LecAttendance), parseFloat(lecQuiz), parseFloat(lecIndependent), parseFloat(lecMajor))
            
            let LabGrade = LaboratoryGrade(parseFloat(LabMachineProblem1), parseFloat(labAttendance1), parseFloat(labExam1),
                parseFloat(LabMachineProblem), parseFloat(labAttendance), parseFloat(labExam))
            
            let partialGrade1 = partialGrade(parseFloat(Lecture_Grade), parseFloat(LabGrade))

           

          
            if (localStorage.getItem("PeriodGradeSubject")){
                let StudentGrade = JSON.parse(localStorage.getItem("PeriodGradeSubject"))  
                    let len = 0;
                    let IsNotSame = true;
                        for (let i = 0; i < StudentGrade.length; i++){
                            if (StudentGrade[i].AssignId == AssignId 
                                                && 
                                StudentGrade[i].StudentId == StudentID 
                                                && 
                                StudentGrade[i].TeacherId == teacherID 
                                                && 
                                StudentGrade[i].EnrolledId == EnrolledID)
                                     {
                                        len = i;
                                        IsNotSame = false;

                                     }
                        }

                        if(IsNotSame){
                            StudentGrade.push(
                                    GradeSubjectObject(AssignId, SubjectID, StudentID, teacherID, EnrolledID,
                                        lecQuiz, LecAttendance, lecIndependent, lecMajor,
                                        LabMachineProblem, labAttendance, labExam,
                                        Lecture_Grade, LabGrade, partialGrade1))
                            localStorage.setItem("PeriodGradeSubject", JSON.stringify(StudentGrade))

                            let plotform1 = JSON.parse(localStorage.getItem("SubjectPlotForm"))
                            let periodname = "";
                            for (let i = 0; i < plotform1.length; i++) {
                                if (plotform1[i].PlotForm == AssignId) {
                                    periodname = plotform1[i].Period
                                    break
                                }
                            }
                            console.log(periodname)
                            let StudentSubjectEnrolledInfo = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))
                            for (let x = 0; x < StudentSubjectEnrolledInfo.length; x++) {
                                if (StudentSubjectEnrolledInfo[x].EnrolledID == EnrolledID
                                    &&
                                    StudentSubjectEnrolledInfo[x].StudentId == StudentID
                                    &&
                                    StudentSubjectEnrolledInfo[x].SubjectId == SubjectID
                                    &&
                                    StudentSubjectEnrolledInfo[x].TeacherId == teacherID
                                ) {
                                    if (periodname == "Prelim") {
                                        StudentSubjectEnrolledInfo[x].Prelim = partialGrade1
                                    } else if (periodname == "Midterm") {
                                        StudentSubjectEnrolledInfo[x].midterm = partialGrade1
                                    } else if (periodname == "Prefinal") {
                                        StudentSubjectEnrolledInfo[x].prefinal = partialGrade1
                                    } else if (periodname == "Final") {
                                        StudentSubjectEnrolledInfo[x].final = partialGrade1
                                    }
                                }
                            }
                            localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(StudentSubjectEnrolledInfo))
                            added()
                        }else{
                            StudentGrade[len].laboratory.Attendance = labAttendance
                            StudentGrade[len].laboratory.LaboratoryExam = labExam
                            StudentGrade[len].laboratory.MachineProblem = LabMachineProblem

                            StudentGrade[len].lecture.IndependentLearning = lecIndependent
                            StudentGrade[len].lecture.LectureExam = lecMajor
                            StudentGrade[len].lecture.attendance = LecAttendance
                            StudentGrade[len].lecture.quiz = lecQuiz

                            StudentGrade[len].LectureGrade = Lecture_Grade
                            StudentGrade[len].Laboratory = LabGrade
                            StudentGrade[len].PartialGrade = partialGrade1
                            localStorage.setItem("PeriodGradeSubject", JSON.stringify(StudentGrade))

                            let plotform1 = JSON.parse(localStorage.getItem("SubjectPlotForm"))
                            let periodname = "";
                            for (let i = 0; i < plotform1.length; i++) {
                                if (plotform1[i].PlotForm == AssignId) {
                                    periodname = plotform1[i].Period
                                    break
                                }
                            }
                            console.log(periodname)
                            let StudentSubjectEnrolledInfo = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))
                            for (let x = 0; x < StudentSubjectEnrolledInfo.length; x++) {
                                if (StudentSubjectEnrolledInfo[x].EnrolledID == EnrolledID
                                    &&
                                    StudentSubjectEnrolledInfo[x].StudentId == StudentID
                                    &&
                                    StudentSubjectEnrolledInfo[x].SubjectId == SubjectID
                                    &&
                                    StudentSubjectEnrolledInfo[x].TeacherId == teacherID
                                ) {
                                    if (periodname == "Prelim") {
                                        StudentSubjectEnrolledInfo[x].Prelim = partialGrade1
                                    } else if (periodname == "Midterm") {
                                        StudentSubjectEnrolledInfo[x].midterm = partialGrade1
                                    } else if (periodname == "Prefinal") {
                                        StudentSubjectEnrolledInfo[x].prefinal = partialGrade1
                                    } else if (periodname == "Final") {
                                        StudentSubjectEnrolledInfo[x].final = partialGrade1
                                    }
                                }
                            }
                            localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(StudentSubjectEnrolledInfo))
                            outputUpdate()
                        }   
            }else{
                    let array = [];
                  array.push(
                      GradeSubjectObject(AssignId, SubjectID,StudentID, teacherID, EnrolledID, 
                    lecQuiz,LecAttendance, lecIndependent, lecMajor, 
                    LabMachineProblem, labAttendance, labExam, 
                        Lecture_Grade, LabGrade, partialGrade1)) 
                    localStorage.setItem("PeriodGradeSubject", JSON.stringify(array))
                    
                let plotform1 = JSON.parse(localStorage.getItem("SubjectPlotForm"))
                let periodname = "";
                for (let i = 0; i < plotform1.length; i++) {
                    if (plotform1[i].PlotForm == AssignId){
                        periodname = plotform1[i].Period
                        break
                    }
                }
                console.log(periodname)
                let StudentSubjectEnrolledInfo = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))
                for (let x = 0; x < StudentSubjectEnrolledInfo.length;x++){
                    if (StudentSubjectEnrolledInfo[x].EnrolledID == EnrolledID
                                            &&
                        StudentSubjectEnrolledInfo[x].StudentId == StudentID
                                            &&
                        StudentSubjectEnrolledInfo[x].SubjectId == SubjectID
                                            &&
                        StudentSubjectEnrolledInfo[x].TeacherId == teacherID
                        ){
                        if (periodname == "Prelim"){
                            StudentSubjectEnrolledInfo[x].Prelim = partialGrade1
                        } else if (periodname == "Midterm"){
                            StudentSubjectEnrolledInfo[x].midterm = partialGrade1
                        } else if (periodname == "Prefinal") {
                            StudentSubjectEnrolledInfo[x].prefinal = partialGrade1   
                        } else if (periodname == "Final") {
                            StudentSubjectEnrolledInfo[x].final = partialGrade1
                        }     
                        }
                }
                localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(StudentSubjectEnrolledInfo))
                added()
              
            }
    }
    });



    $('#LecAttendance').restrict();
    $('#lecQuiz').restrict();
    $('#lecIndependent').restrict();
    $('#lecMajor').restrict();
    $('#LabMachineProblem').restrict();
    $('#labAttendance').restrict();
    $('#labExam').restrict();

   
}); 

function LectureGrade(lecA,lecQ,lecE,lecExam,SlecA,SlecQ,SlecE,SlecExam){
    let attendance = (SlecA / lecA) *.1;
    let Quiz = (SlecQ / lecQ) *.3;
    let Endepent = (SlecE / lecE) * .1;
    let Exam = (SlecExam / lecExam) * .5

    let grade =  (attendance + Quiz + Endepent + Exam) * 100;

     return (Math.round(grade * 100) / 100).toFixed(1);
}

function LaboratoryGrade(labM,LabA,labExam,SlabM,SlabA,SlabExam){
    let quiz = (SlabM / labM) * .4
    let attendance = (SlabA / LabA) *.1
    let exam = (SlabExam / labExam) * .5

    let grade = (quiz + attendance + exam ) * 100

    return (Math.round(grade * 100) / 100).toFixed(1);

}
function partialGrade(lecture,laboratory){

    let grade =  ((lecture * .4) + (laboratory * .6)) 
   return  (Math.round(grade * 100) / 100).toFixed(1);
}

function outputUpdate(){
    Swal.fire({
        title: "Successful",
        text: "Updated Successfully",
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

function added(){
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

}
StudentName()
OutputTableData() 