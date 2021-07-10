function cardInfo() {
    let Users = JSON.parse(localStorage.getItem("Users"));
    let numberOfAdmin = Users.length;

    let numberOfStudent = 0;
    let numberOfTeacher = 0;

    if (localStorage.getItem("Student")) {
        let CountStudent = JSON.parse(localStorage.getItem("Student"));
        numberOfStudent = CountStudent.length;
    } else {
        numberOfStudent = 0;
    }

    if (localStorage.getItem("Teacher")) {
        let CountTeacher = JSON.parse(localStorage.getItem("Teacher"));
        numberOfTeacher = CountTeacher.length;
    } else {
        numberOfTeacher = 0;
    }
    document.getElementById('CountAdmin').innerHTML = numberOfAdmin;
    document.getElementById('countStudent').innerHTML = numberOfStudent;
    document.getElementById('countTeacher').innerHTML = numberOfTeacher;
}
cardInfo()

if (navigator.onLine) {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawStuff);
} else {
    Swal.fire({
        title: "Error",
        text: "Bar Char Will not Show if you are Offline",
        type: "warning",
    }) 
}



function drawStuff() {
    let Users = JSON.parse(localStorage.getItem("Users"));
    let numberOfAdmin = Users.length;
    let numberOfStudent = 0;
    let numberOfTeacher = 0;

    if (localStorage.getItem("Student")){
        let CountStudent = JSON.parse(localStorage.getItem("Student"));
        numberOfStudent = CountStudent.length;
    }else{
        numberOfStudent = 0;
    }

    if (localStorage.getItem("Teacher")) {
        let CountTeacher = JSON.parse(localStorage.getItem("Teacher"));
        numberOfTeacher = CountTeacher.length;
    } else {
        numberOfTeacher = 0;
    }
    var data = new google.visualization.arrayToDataTable([
        ['All', 'Current'],
        ["Registered Admin", numberOfAdmin],
        ["Student", numberOfStudent],
        ["Teacher", numberOfTeacher] 
    ]);

    var options = {
        title: 'Registered Bar Chart',
        width: 900,
        legend: { position: 'none' },
        chart: {
            title: 'Registered Bar Chart',
            subtitle: 'List Of All Registered'
        },
        bars: 'vertical', // Required for Material Bar Charts.
        axes: {
            x: {
                0: { side: 'top', label: 'Number Of' } // Top x-axis.
            }
        },
        bar: { groupWidth: "90%" }
    };

    var chart = new google.charts.Bar(document.getElementById('top_x_div'));
    chart.draw(data, options);
};

