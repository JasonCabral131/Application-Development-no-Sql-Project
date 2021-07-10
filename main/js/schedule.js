function OutputScheduleTable() {
    if (localStorage.getItem("Schedule") && localStorage.getItem("SubjectList")) {
        let schedule = JSON.parse(localStorage.getItem("Schedule"));
        let ScheduleTable = document.getElementById('ScheduleTable');
        let subjectList = JSON.parse(localStorage.getItem("SubjectList"))
        for (let i = 0; i < schedule.length; i++) {
            for (let x = 0; x < subjectList.length; x++) {
                if (schedule[i].subjectId == subjectList[x].SubjectID) {
                    ScheduleTable.insertAdjacentHTML('beforeend',
                        `
                    <tr>
                        <td class="text-center">${schedule[i].ID}</td>    
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
                        <td class="d-flex justify-content-center"><button class="btn btn-info EditTableScheduleInfo" > <i class="fas fa-edit"></i></button>
                                                            <button class="btn btn-danger DeleteTableScheduleInfo"> <i class="fas fa-trash"></i></button></td>
                    </tr>
                 `
                    )
                }
            }





        }
    }
}
function ScheduleIdGenerator() {

    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    if (localStorage.getItem("Schedule")){
        let SubjectList = JSON.parse(localStorage.getItem("Schedule"));
        let Value_length = SubjectList.length
        if (Value_length == 0) {
            return "sched-" + DateNow + "-1";
        } else {
            let Value = SubjectList[Value_length - 1].ID;
            let Value_split = Value.split("-");
            let Parsing = parseInt(Value_split[2]) + 1;
            return "sched-" + DateNow + "-" + Parsing.toString();
        }
    }else{
        return "sched-" + DateNow + "-1";
    }
  
}

function ObjectSchedule(id,subjectId,lecStarttime,lecEndTime,LecStartDate,LecEndDate,LabStartTime,LabEndTime,LabStartDate,LabEndDate,Description){
    let ScheduleObject = {
        ID: id,
        subjectId: subjectId,
        lecStarttime: lecStarttime,
        lecEndTime: lecEndTime,
        LecStartDate: LecStartDate,
        LecEndDate: LecEndDate,
        LabStartTime: LabStartTime,
        LabEndTime: LabEndTime,
        LabStartDate: LabStartDate,
        LabEndDate: LabEndDate,
        Description: Description
    }
    return ScheduleObject
}


$(document).ready(function () {

    $('#AddScheduleBtn').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault()
            let subject         = $('#SUBJECTALL').val();
            let lecStarttime = $('#LecStartTime').val();
            let lecEndTime = $('#LecEndOfTime').val();
            let LecStartDate = $('#LecStartDate').val();
            let LecEndDate = $('#LecEndDate').val();
            let LabStartTime = $('#LabStartTime').val();       
            let LabEndTime = $('#LabEndOfTime').val();
            let LabStartDate = $('#LabStartDate').val();
            let LabEndDate = $('#labEndDate').val();
            let Description = $('#decription').val();

            let subjectID = "";

            let subjectId = JSON.parse(localStorage.getItem("SubjectList"))

            for (let i = 0; i < subjectId.length; i++ ){

                if (subjectId[i].SubName == subject){
                    subjectID = subjectId[i].SubjectID;
                    break;
                }    

            }

          
if (localStorage.getItem("Schedule")) {
    let Schedule = JSON.parse(localStorage.getItem("Schedule"))
    Schedule.push(
        ObjectSchedule(ScheduleIdGenerator(), subjectID, lecStarttime, lecEndTime, LecStartDate,
            LecEndDate, LabStartTime, LabEndTime, LabStartDate, LabEndDate, Description))
    Swal.fire({
        title: "Successful",
        text: "Created Successfully",
        allowOutsideClick: false,
        type: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
    }).then((result) => {
        if (result) {

            localStorage.setItem("Schedule", JSON.stringify(Schedule));
            location.reload();
        }
    });
} else {    
let scheduleArray = [];
    scheduleArray.push(
        ObjectSchedule(ScheduleIdGenerator(), subjectID, lecStarttime, lecEndTime, LecStartDate, 
        LecEndDate, LabStartTime, LabEndTime, LabStartDate, LabEndDate, Description))

    Swal.fire({
        title: "Successful",
        text: "Created Successfully",
        allowOutsideClick: false,
        type: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
    }).then((result) => {
        if (result) {

            localStorage.setItem("Schedule", JSON.stringify(scheduleArray));
            location.reload();
        }
    });
}         
        
      
    }
    });

    /* TO UPDATE */


    $('.EditTableScheduleInfo').on('click', function (e) {

        $('#UpdateScheduleModal').modal('show');

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        let DateStart = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let DateEnd = ["Only", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
        
        let schedule = JSON.parse(localStorage.getItem("Schedule"));
        let len = 0;
        for (let i = 0; i < schedule.length; i++ ){
            if (schedule[i].ID == data[0]){
                Len= i;
                $('#ScheduleId').val(schedule[i].ID)
                $('#LecStartTime1').val(schedule[i].lecStarttime)
                $('#LecEndOfTime1').val(schedule[i].lecEndTime)
                $('#LabStartTime1').val(schedule[i].LabStartTime)
                $('#LabEndOfTime1').val(schedule[i].LabEndTime)
                $('#decription1').val(schedule[i].Description)
            }
        }
        let LecStartDateOption = '<option value="' + schedule[Len].LecStartDate + '">' + schedule[Len].LecStartDate+'</option>';
        let LecEndDateOption = '<option value="' + schedule[Len].LecEndDate + '">' + schedule[Len].LecEndDate+'</option>';
        let LabStartDateOption = '<option value="' + schedule[Len].LabStartDate + '">' + schedule[Len].LabStartDate+'</option>';
        let LabEndDateOption = '<option value="' + schedule[Len].LabEndDate + '">' + schedule[Len].LabEndDate+'</option>';
        
        let subjectList = JSON.parse(localStorage.getItem("SubjectList"))
        let SubjectOption = ''
        
        for (let i = 0; i < subjectList.length; i++){
            if (subjectList[i].SubjectID == schedule[Len].subjectId){
                SubjectOption += '<option value="' + subjectList[i].SubName + '">' + subjectList[i].SubName + '</option>';
                lenx =i;
                break;
            }
        }
        for (let i = 0; i < subjectList.length; i++) {
            if (subjectList[i].SubjectID != schedule[Len].subjectId) {
                SubjectOption += '<option value="' + subjectList[i].SubName + '">' + subjectList[i].SubName + '</option>';
            }
        }
        

        for (let i = 0; i < DateStart.length ; i++){
            if (DateStart[i] != schedule[Len].LecStartDate){
                LecStartDateOption += '<option value="' + DateStart[i] + '">' + DateStart[i] + '</option>';
            }
        }
        for (let i = 0; i < DateStart.length; i++) {
            if (DateStart[i] != schedule[Len].LabStartDate) {
                LabStartDateOption += '<option value="' + DateStart[i] + '">' + DateStart[i] + '</option>';
            }
        }
        for (let i = 0; i < DateEnd.length; i++) {
            if (DateEnd[i] != schedule[Len].LecEndDate) {
                LecEndDateOption += '<option value="' + DateEnd[i] + '">' + DateEnd[i] + '</option>';
            }
        }
        for (let i = 0; i < DateEnd.length; i++) {
            if (DateEnd[i] != schedule[Len].LabEndDate) {
                LabEndDateOption += '<option value="' + DateEnd[i] + '">' + DateEnd[i] + '</option>';
            }
        }

        $('#LecStartDate1').html(LecStartDateOption)
        $('#LecEndDate1').html(LecEndDateOption)
        $('#LabStartDate1').html(LabStartDateOption)
        $('#labEndDate1').html(LabEndDateOption)
        $('#SUBJECTALL1').html(SubjectOption)


        
      
    });



    $('#UpdateScheduleBtn').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault();
            let scheduleId = $('#ScheduleId').val();
            let lecStarttime = $('#LecStartTime1').val();
            let lecEndTime = $('#LecEndOfTime1').val();
            let LecStartDate = $('#LecStartDate1').val();
            let LecEndDate = $('#LecEndDate1').val();
            let LabStartTime = $('#LabStartTime1').val();
            let LabEndTime = $('#LabEndOfTime1').val();
            let LabStartDate = $('#LabStartDate1').val();
            let LabEndDate = $('#labEndDate1').val();
            let Description = $('#decription1').val();    
            let Subject = $('#SUBJECTALL1').val();
            let subID = "";
            let subjectId = JSON.parse(localStorage.getItem("SubjectList"))

            for (let i = 0; i < subjectId.length; i++) {

                if (subjectId[i].SubName == Subject) {
                    subID = subjectId[i].SubjectID;
                    break;
                }

            }
         

            let schedule = JSON.parse(localStorage.getItem("Schedule"))
            let len  = 0;
            for (let i = 0; i < schedule.length; i++ ){
                if (schedule[i].ID  == scheduleId){
                   len = i;
                   break;     
                   
                }
            }

            schedule[len].subjectId = subID;
            schedule[len].lecStarttime = lecStarttime;
            schedule[len].lecEndTime = lecEndTime;
            schedule[len].LecStartDate = LecStartDate;
            schedule[len].LecEndDate = LecEndDate;
            schedule[len].LabStartTime = LabStartTime;
            schedule[len].LabEndTime = LabEndTime;
            schedule[len].LabStartDate = LabStartDate;
            schedule[len].LabEndDate = LabEndDate;
            schedule[len].Description = Description;
            Swal.fire({
                title: "Successful",
                text: "Updated Successfully",
                allowOutsideClick: false,
                type: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay",
            }).then((result) => {
                if (result) {

                    localStorage.setItem("Schedule", JSON.stringify(schedule));
                    location.reload();
                }
            });
            
            
        }

    });

    /* END OF UPDATE CODE */

    /* DELETE SCHEDULE */
    $('.DeleteTableScheduleInfo').on('click', function (e) {
        $tr = $(this).closest('tr');

        let data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
    
        let Schedule = JSON.parse(localStorage.getItem("Schedule"));

                    Swal.fire({
                        title: 'Are you sure?',
                        text: "All Data Under This Scheduled Will be Deleted",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            const idToRemove = data[0];
                            const filteredPeople = Schedule.filter((item) => item.ID !== idToRemove);
                            localStorage.setItem("Schedule", JSON.stringify(filteredPeople));
                            
                            let teacherSched = "";

                                if(localStorage.getItem("TeacherSchedule")){
                                    let teSched = JSON.parse(localStorage.getItem("TeacherSchedule"))                                   
                                    for( let i = 0 ; i < teSched.length; i++){
                                            if(teSched[i].ScheduleId == data[0]){
                                                teacherSched =  teSched[i].ID
                                                teSched.splice(i,1)
                                                break
                                            }
                                    }
                                    localStorage.setItem("TeacherSchedule", JSON.stringify(teSched));
                                }

                                    if(localStorage.getItem("StudentSubjectEnrolledInfo")){
                                        let studEnroll = JSON.parse(localStorage.getItem("StudentSubjectEnrolledInfo"))
                                        if(studEnroll.length !=0){
                                            const StudEnrolled = studEnroll.filter((item) => item.TeacherScheduledID !== teacherSched);
                                            localStorage.setItem("StudentSubjectEnrolledInfo", JSON.stringify(StudEnrolled));
                                        }
                                    }

                                    if(localStorage.getItem("PeriodGradeSubject")){
                                        let PeriodGradeSubject = JSON.parse(localStorage.getItem("PeriodGradeSubject"))
                                        if(PeriodGradeSubject.length !=0){
                                            const PeriodStud = PeriodGradeSubject.filter((item) => item.TeacherScheduled !== teacherSched);
                                            localStorage.setItem("PeriodGradeSubject", JSON.stringify(PeriodStud));
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

OutputScheduleTable()