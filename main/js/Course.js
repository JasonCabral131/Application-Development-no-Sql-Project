function CourseTable(){
    if (localStorage.getItem("Course")){
        let course = JSON.parse(localStorage.getItem("Course"));
        let CourseTable = document.querySelector('#CourseTable');
        for(let i = 0 ; i < course.length; i++){
            CourseTable.insertAdjacentHTML('beforeend',
            `
               <tr>
            <td class="text-center">${course[i].CourseID}</td>
            <td class="text-center">${course[i].CourseName}</td>
            <td class="text-center">${course[i].CourseDescription}</td>
            <td class="d-flex justify-content-center"><button class="btn btn-info CourseEditTable" > <i class="fas fa-edit"></i></button>
                                                    <button class="btn btn-danger CourseDeleteTable"> <i class="fas fa-trash"></i></button></td>
            </tr>
            `
            )
        }
    }
}
function CourseIdGenerator() {

    let Datex = new Date();
    let DateNow = Datex.getFullYear();
    let Course = JSON.parse(localStorage.getItem("Course"));
    let Value_length = Course.length
    if (Value_length == 0 ){
      return   "C-" + DateNow + "-1";
    }else{
        let Value = Course[Value_length - 1].CourseID;
        let Value_split = Value.split("-");
        let Parsing = parseInt(Value_split[2]) + 1;
        return "C-" + DateNow + "-" + Parsing.toString();
    }
  
}  


function  CourseObject(courseId, CourseName, CourseDescription) {
        let ObjectCourse = {
            CourseID: courseId,
            CourseName: CourseName,
            CourseDescription: CourseDescription
        }
    return ObjectCourse;
}
$(document).ready(function () {
    $('#AddCourse').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault()
            let Datex = new Date();
            let DateNow = Datex.getFullYear();
            let courseid = "C-" + DateNow + "-1";
            let CourseName = $('#AddCourseName').val();
            let CourseDescription = $('#AddCourseDecription').val();

            if (localStorage.getItem("Course")){
                let CourseList = JSON.parse(localStorage.getItem("Course"));
                let IsNotSame = true;
                for (let z = 0; z < CourseList.length; z++){
                    if (CourseList[z].CourseName.toUpperCase() == CourseName.toUpperCase()){
                        IsNotSame = false;
                        break;
                    }
                }

                if (IsNotSame){
                    Swal.fire({
                        title: "Successful",
                        text: "Created Successfully",
                        allowOutsideClick: false,
                        type: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Okay",
                    }).then((result) => {
                        if (result) {
                            CourseList.push(CourseObject(CourseIdGenerator(), CourseName, CourseDescription))
                            localStorage.setItem("Course", JSON.stringify(CourseList));
                            location.reload();
                        }
                    });

                }else{
                    Swal.fire({
                        title: "Error",
                        text: "COURSE ALREADY EXISTED",
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
                        let CourseArray = [];
                        CourseArray.push(CourseObject(courseid, CourseName, CourseDescription))
                        localStorage.setItem("Course", JSON.stringify(CourseArray));
                        location.reload();
                    }
                });
                
            }
        }
    });
});
$(document).ready(function () {
    $('.CourseDeleteTable').on('click', function (e) {
        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data);
        let CourseList = JSON.parse(localStorage.getItem("Course"));
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                const idToRemove = data[0];
                const filteredPeople = CourseList.filter((item) => item.CourseID !== idToRemove);
                localStorage.setItem("Course", JSON.stringify(filteredPeople));
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
    $('.CourseEditTable').on('click', function (e) {
        $('#UpdateCourseModal').modal('show');

        $tr = $(this).closest('tr');

        var data = $tr.children("td").map(function () {
            return $(this).text();

        }).get();
        console.log(data);
        $('#UpdateCourseID').val(data[0]);
        $('#UpdateCourseName').val(data[1]);
        $('#UpdateCourseDecription').val(data[2]);
    });
});

$(document).ready(function () {
    $('#UpdateCourse').on('click', function (e) {
        const formValid = this.form.checkValidity();

        if (formValid) {
            e.preventDefault()
            let courseId            = $('#UpdateCourseID').val();
            let courseName          =  $('#UpdateCourseName').val();
            let courseDescription   = $('#UpdateCourseDecription').val();
            let CourseList = JSON.parse(localStorage.getItem("Course"));
            let IsNotSame = true;
            let WhereLength = 0 ;
            for (let i = 0; i < CourseList.length; i++){
                if (CourseList[i].CourseID != courseId && CourseList[i].CourseName.toUpperCase() == courseName.toUpperCase() ){
                    IsNotSame = false;
                    break;
                } else if (CourseList[i].CourseID == courseId ){
                    WhereLength =i;
                }
            }

            if (IsNotSame){
                CourseList[WhereLength].CourseName = courseName; 
                CourseList[WhereLength].CourseDescription = courseDescription; 
                Swal.fire({
                    title: 'Successfully',
                    text: "Updated",
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        localStorage.setItem("Course", JSON.stringify(CourseList));
                        location.reload();
                    }
                })
            }else{
                Swal.fire({
                    title: "Error",
                    text: "COURSE ALREADY EXISTED",
                    type: "warning",
                }) 
            }

        }
    });
});

CourseTable()