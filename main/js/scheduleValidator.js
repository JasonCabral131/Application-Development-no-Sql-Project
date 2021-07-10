


function OutputSubject() {
    let SUBJECTALL = document.querySelector('#SUBJECTALL');

    if (localStorage.getItem("SubjectList")) {


        let SubjectList = JSON.parse(localStorage.getItem("SubjectList"))
        if (SubjectList.length == 0) {
            $(SUBJECTALL).html(
                `
            <option value="">No Subject Available</option>
            `
            );
            document.querySelector('#AddScheduleBtn').disabled = true;
        } else {
            let option = "";
            for (let x = 0; x < SubjectList.length; x++) {
                option += '<option value="' + SubjectList[x].SubName + '">' + SubjectList[x].SubName + '</option>'
            }
            $(SUBJECTALL).html(
                `${option}`
            );
        }

    } else {
        $(SUBJECTALL).html(
            `
            <option value="">No Subject Available</option>
            `
        );
        document.querySelector('#AddScheduleBtn').disabled = true;
    }

}



$(document).ready(function () {

    $('#TableSchedule').DataTable({
        "pagingtype": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], Responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records ",
            "sEmptyTable": "No Schedule Available"
        },
       



    });


    $(function () {
        $('#datetimepicker3').datetimepicker({
            format: 'LT'
        });
    });
    $(function () {
        $('#datetimepicker4').datetimepicker({
            format: 'LT'
        });
    });
    $(function () {
        $('#datetimepicker5').datetimepicker({
            format: 'LT'
        });
    });
    $(function () {
        $('#datetimepicker6').datetimepicker({
            format: 'LT'
        });
    });

    
/*  */

    $(function () {
        $('#datetimepicker7').datetimepicker({
            format: 'LT'
        });
    });
    $(function () {
        $('#datetimepicker8').datetimepicker({
            format: 'LT'
        });
    });
    $(function () {
        $('#datetimepicker9').datetimepicker({
            format: 'LT'
        });
    });
    $(function () {
        $('#datetimepicker11').datetimepicker({
            format: 'LT'
        });
    });

   
})
OutputSubject()
