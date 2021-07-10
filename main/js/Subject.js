function SubjectListData(){
    let tableBody = document.querySelector('#SubjectTable');
    if (localStorage.getItem("SubjectList")){
        let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));

        for(let i = 0; i < SubjectList.length ; i++){
            tableBody.insertAdjacentHTML('beforeend',
                `
            <tr>
            <td class="text-center">${SubjectList[i].SubjectID}</td>
            <td class="text-center">${SubjectList[i].SubName}</td>
            <td class="text-center">${SubjectList[i].SubDescription}</td>
            <td class="d-flex justify-content-center"><button class="btn btn-info SubjectEditTable" > <i class="fas fa-edit"></i></button>
                                                    <button class="btn btn-danger SubjectDeleteTable"> <i class="fas fa-trash"></i></button></td>
            </tr>
            `
            )  
        }
    }
}


function SubjectIdGenerator() {

    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));
    let Value_length = SubjectList.length
    if (Value_length == 0 ){
        return "sub-" + DateNow + "-1";
    }else{

   
    let Value = SubjectList[Value_length - 1].SubjectID;
    let Value_split = Value.split("-");
    let Parsing = parseInt(Value_split[2]) + 1;
    return "sub-" + DateNow + "-" + Parsing.toString();
    }
}  


function SubjectObject(subjectID,subjectName,subjectDescription) {
    let ObjectSubject = {
        SubjectID: subjectID,
        SubName: subjectName,
        SubDescription: subjectDescription
    }
    return ObjectSubject;
}
$(document).ready(function () {
    $('#AddSubjectBtn').on('click', function (e) {
        const formValid = this.form.checkValidity();
         
        if (formValid) {
            let Datex = new Date();
            let DateNow = Datex.getFullYear();
            let subid = "sub-" + DateNow + "-1";
            let subjectName         = $('#AddSubjectName').val();
            let subjectDescription  = $('#SubjectDescription').val();
            let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));
            e.preventDefault();
            if (localStorage.getItem("SubjectList")){
                    let isNotSame = true;
                   

                    for (let i = 0; i < SubjectList.length; i++){
                        if (SubjectList[i].SubName.toUpperCase() == subjectName.toUpperCase()){
                            isNotSame = false;
                            break;
                        }
                    }

                if (isNotSame){
              
                    Swal.fire({
                        title: "Successful",
                        text: "Created Successfully",
                        allowOutsideClick: false,
                        type: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Okay",
                    }).then((result) => {
                        if (result) {
                            SubjectList.push(SubjectObject(SubjectIdGenerator(), subjectName, subjectDescription));
                            localStorage.setItem("SubjectList", JSON.stringify(SubjectList));
                            location.reload();
                        }
                    });
                }else{
                    Swal.fire({
                        title: "Error",
                        text: "SubjectName Already Existed",
                        type: "warning",
                    })
                }
 
             }else{
               
                        Swal.fire({
                            title: "Successful",
                            text: "Created Successfully",
                            allowOutsideClick: false,
                            type: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Okay",
                        }).then((result) => {
                            if (result) {
                                let subjectArray = [];
                                subjectArray.push(SubjectObject(subid, subjectName, subjectDescription))
                                localStorage.setItem("SubjectList", JSON.stringify(subjectArray));
                                location.reload(); 
                            }
                        });
             }
        }
    });
});

$(document).ready(function () {
    $('.SubjectDeleteTable').on('click', function () {

        let DeleteTeacherData;
        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data);
        let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!All Data Under This Subject Will Be Deleted!!!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {  
                
                const idToRemove = data[0];
                const filteredPeople = SubjectList.filter((item) => item.SubjectID !== idToRemove);
                localStorage.setItem("SubjectList", JSON.stringify(filteredPeople));
                
                if (localStorage.getItem("SubjectPlotForm")){
                    let SubjectPlotForm = JSON.parse(localStorage.getItem("SubjectPlotForm"));
                    if (SubjectPlotForm.length != 0){
                        const idToRemovePlotForm = data[0];
                        const filteredPlotForm = SubjectPlotForm.filter((item) => item.SubjectId !== idToRemovePlotForm);
                        localStorage.setItem("SubjectPlotForm", JSON.stringify(filteredPlotForm));
                    }       
                }
                if (localStorage.getItem("Schedule")) {
                    let Schedule = JSON.parse(localStorage.getItem("Schedule"));
                     let tschedId = [];       
                    if (Schedule.length != 0) {
                        for (let x = 0; x <Schedule.length; x++ ){
                            if (Schedule[x].subjectId == data[0]){
                                tschedId.push(Schedule[x].ID) 
                            }
                        }

                        const idToRemovePlotForm = data[0];
                        const filteredPlotForm = Schedule.filter((item) => item.subjectId !== idToRemovePlotForm);
                        localStorage.setItem("Schedule", JSON.stringify(filteredPlotForm));

                    }

                    let teacherScheduled = JSON.parse(localStorage.getItem("TeacherSchedule"))

                    if (teacherScheduled.length !=0){
                        
                        for (let i = 0; i < teacherScheduled.length;){
                            for (let x = 0; x < tschedId.length; x++){
                                if (teacherScheduled[i].ScheduleId == tschedId[x]){
                                    teacherScheduled.splice(i, 1); 
                                    i = 0; 
                                }else{
                                    i++ 
                                }
                            }
                        }
                    }
                    localStorage.setItem("TeacherSchedule", JSON.stringify(teacherScheduled));
                }

                if (localStorage.getItem("TeacherAssignSubject")){
                    let Schedule = JSON.parse(localStorage.getItem("TeacherAssignSubject"));

                    if (Schedule.length != 0) {
                        const idToRemovePlotForm = data[0];
                        const filteredPlotForm = Schedule.filter((item) => item.subjectId !== idToRemovePlotForm);
                        localStorage.setItem("TeacherAssignSubject", JSON.stringify(filteredPlotForm));
                    }
                }
              

                if (localStorage.getItem("StudentSubjectEnrolledInfo")) {
                    let Schedule = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"));

                    if (Schedule.length != 0) {
                        const idToRemovePlotForm = data[0];
                        const filteredPlotForm = Schedule.filter((item) => item.SubjectId !== idToRemovePlotForm);
                        localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(filteredPlotForm));
                    }
                }
                if (localStorage.getItem("PeriodGradeSubject")) {
                    let Schedule = JSON.parse(localStorage.getItem("PeriodGradeSubject"));

                    if (Schedule.length != 0) {
                        const idToRemovePlotForm = data[0];
                        const filteredPlotForm = Schedule.filter((item) => item.SubjectID !== idToRemovePlotForm);
                        localStorage.setItem("PeriodGradeSubject", JSON.stringify(filteredPlotForm));
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


$(document).ready(function () {
    $('.SubjectEditTable').on('click', function () {
        $('#EdiSubjectModal').modal('show');

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data);
        $('#EditSubjectID').val(data[0]);
        $('#EditSubjectName').val(data[1]);
        $('#EditSubjectDescription').val(data[2]);


    });
});

$(document).ready(function () {
    $('#EditSubjectBtn').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault()
            let subId           = $('#EditSubjectID').val();
            let SubName         = $('#EditSubjectName').val();
            let SubDescription  = $('#EditSubjectDescription').val();
            let SubjectList = JSON.parse(localStorage.getItem("SubjectList"));
            let IsNotSame = true;
            let whereLength = 0;
            for (let i = 0; i < SubjectList.length ; i++){
                if (SubjectList[i].SubjectID != subId && SubjectList[i].SubName.toUpperCase() == SubName.toUpperCase()){
                    IsNotSame = false;
                    break
                } else if (SubjectList[i].SubjectID == subId){
                    whereLength = i; 
                }
            }

            if (IsNotSame){

                SubjectList[whereLength].SubName = SubName;
                SubjectList[whereLength].SubDescription = SubDescription;
                Swal.fire({
                    title: 'Successfully',
                    text: "Updated",
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        localStorage.setItem("SubjectList", JSON.stringify(SubjectList));
                        location.reload();
                    }
                }) 

            }else{
                Swal.fire({
                    title: "Error",
                    text: "SubjectName Already Existed",
                    type: "warning",
                }) 
            }
        }
    });
});
SubjectListData()