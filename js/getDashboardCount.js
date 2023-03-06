const availRoom = document.querySelector('#availableRoom');
const totalRm = document.querySelector('#totalRoom');
const reservedRoomCount = document.getElementById('reservedRoomCount');
const check_in_Count = document.getElementById('check_in_Count');

const roomBtn = document.getElementById('viewDetailsTotal');
const availableRoomBtn = document.getElementById('viewDetails');
const viewDetailsReserved = document.getElementById('viewDetailsReserved');
const viewDetailsCheckIn = document.getElementById('viewDetailsCheckIn');


function getCount() {
    firebase.database().ref("Rooms/Available/").on('value', function(snapshot) {
        if(snapshot.exists()) {
            var totalValueAvailable = snapshot.numChildren();
            availRoom.innerHTML = totalValueAvailable;
        }else {
            availRoom.innerHTML = "0";
        }
    })

    firebase.database().ref("RoomsTotal/").on('value', function(snapshot) {
        if(snapshot.exists()) {
            var totalRooms = snapshot.numChildren();
            totalRm.innerHTML = totalRooms;
        }else {
            totalRm.innerHTML = "0";
        }
    })

    firebase.database().ref("Booked/").on('value', function(snapshot) {
        if(snapshot.exists()) {
            var totalBooked = snapshot.numChildren();
            reservedRoomCount.innerHTML = totalBooked;
        }else {
            reservedRoomCount.innerHTML = "0";
        }
    })

    firebase.database().ref("CheckIn/").on('value', function(snapshot) {
        if(snapshot.exists()) {
            var totalCheckIn = snapshot.numChildren();
            check_in_Count.innerHTML = totalCheckIn;
        }else {
            check_in_Count.innerHTML = "0";
        }
    })
}

roomBtn.onclick = function(){
    window.location.href = "rooms.html";
}

availableRoomBtn.onclick = function(){
    window.location.href = "availableRooms.html";
}

viewDetailsReserved.onclick = function(){
    window.location.href = "reserved.html";
}

viewDetailsCheckIn.onclick = function(){
    window.location.href = "checkin.html";
}

getCount();


window.addEventListener('load', getCount);

$(document).ready(function (){
    var dataArr = [];

    function getDataChart() {
        firebase.database().ref("BookedHistory/").once('value', function(snapshot) {
            if(snapshot.exists()) {
                var totalRooms = snapshot.numChildren();
                var obj = snapshot.val();
                dataArr = ({
                    label: obj.clientName,
                    value: totalRooms
                })
                addChartData(myChart, dataArr.label, dataArr.value);
            }
        })
    }

    const ctx = document.getElementById('myChart').getContext("2d");

    var options = {
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                gridLines: {
                    offsetGridLines: true
                },
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 10
                    }
                }]
            }],
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    }

    var config = {
        type: 'line',
        data: {
            labels: dataArr.label,
            datasets: [{
              label: 'No. of Booked',
              backgroundColor: "rgb(255, 159, 64)",
              borderColor: "rgba(54, 162, 235, 1)",
              data: dataArr.value,
              borderWidth: 1
            }],
            responsive: true,
            options: options
          },
    }

    var myChart = new Chart(ctx, config);

    function addChartData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }
// new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });

    window.addEventListener('load', getDataChart);
})