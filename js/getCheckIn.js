// var stdNo = 0;
// const checktBody = document.getElementById('checktBody');
var arrayOfCheckRooms = [];
var numPHP = new Intl.NumberFormat("en-PH", {
    style: 'currency',
    currency: 'PHP'
})

// function addDataToTableCheck(checkID, name, roomname, dreserved, days, contact, total, rHours, age, idPic, idType, address, price, nationality, BookedBy
//     , BookedThru, Method, FirstPayment, Balance, status) {
    
//         let trow = document.createElement("tr");
//         let td1 = document.createElement('td');
//         let td2 = document.createElement('td');
//         let td3 = document.createElement('td');
//         let td4 = document.createElement('td');
//         let td5 = document.createElement('td');
//         let td6 = document.createElement('td');
//         let td7 = document.createElement('td');
//         let td8 = document.createElement('td');
//         let controlDiv = document.createElement('div');

//         arrayOfCheckRooms.push([checkID, name, roomname, dreserved, days, rHours, age, idPic, idType, address, contact, price, nationality, total , BookedBy
//             , BookedThru, Method, FirstPayment, Balance, status]);

//         controlDiv.innerHTML = '<i class="fas fa-eye fa-1x me-3" style="color: #4B9DE4; cursor: pointer;" onclick="viewDataCheck('+stdNo+')"></i>';
//         td3.classList.add('text-center');
//         td4.classList.add('text-center');
//         td5.classList.add('text-center');
//         td6.classList.add('text-center');
//         td7.classList.add('text-center');
//         td8.classList.add('text-center');

//         td1.innerHTML = ++stdNo;
//         td2.innerHTML = name;
//         td3.innerHTML = roomname;
//         td4.innerHTML = dreserved;
//         td5.innerHTML = days;
//         td6.innerHTML = contact;
//         td7.innerHTML = numPHP.format(total);
//         td8.appendChild(controlDiv);

//         td2.classList += " nameField";
//         td3.classList += " roomnameField";
//         td4.classList += " dreservedField";
//         td5.classList += " daysField";
//         td6.classList += " contactField";

//         trow.appendChild(td1);
//         trow.appendChild(td2);
//         trow.appendChild(td3);
//         trow.appendChild(td4);
//         trow.appendChild(td5);
//         trow.appendChild(td6);
//         trow.appendChild(td7);
//         trow.appendChild(td8);

//         checktBody.appendChild(trow);

// }

// function getAllDataCheck() {
//     firebase.database().ref("CheckIn/").once('value', function(snapshot) {
//         var room = [];
//         snapshot.forEach(childSnapshot => {
//             room.push(childSnapshot.val());
//         });
//         AddAllItemsCheck(room);
//     })
// }

// function AddAllItemsCheck(Rooms) {
//     stdNo = 0;
//     checktBody.innerHTML = "";
//     Rooms.forEach(element => {
//         addDataToTableCheck(element.CheckInID, element.NameOfClient, element.NameOfRoom, 
//             element.DateReserved, element.Days, element.Contact, element.TotalPayment, 
//             element.HoursReserved, element.AgeOfClient, element.ClientsPhotoURL, element.IDType
//             , element.Address, element.Price, element.Nationality, element.BookedBy, element.BookedThru
//             , element.Method, element.FirstPayment, element.Balance, element.Status);
//     });
// }

// window.addEventListener('load', getAllDataCheck);

$(document).ready(function () {
    var view;

    var CheckInroom = [];
    var CheckInroomAll = [];

    const iconView = '<i class="fas fa-eye fa-1x" style="color: white; cursor: pointer;"></i>';

    var roomTable = $('#roomTable').DataTable({
        responsive: true,
        dom: 'Bfrtilp',
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel" style="cursor: pointer;"></i>',
                titleAttr: 'Export to Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf" style="cursor: pointer;"></i>',
                titleAttr: 'Export to Pdf',
                className: 'btn btn-warning'
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print" style="cursor: pointer;"></i>',
                titleAttr: 'Print',
                className: 'btn btn-info'
            }
        ],
        pageLenght: 3,
        lengthMenu: [[3,5,10,-1],[3,5,10,'all']],
        data: CheckInroom,
        columnDefs: [
            {
                targets: [0],
                visible: false
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnView btn btn-success' data-togle='tooltip' title='View Data'>"+iconView+"</button></div></div>"
            }
        ]
    })

    firebase.database().ref("CheckIn/").on('child_added', data => {
        CheckInroom = [data.key, data.child("NameOfClient").val(), 
        data.child("NameOfRoom").val(), data.child("DateReserved").val(), 
        data.child("Days").val(), data.child("Contact").val(), 
        numPHP.format(data.child("TotalPayment").val())];
        roomTable.rows.add([CheckInroom]).draw();
    })

    firebase.database().ref("CheckIn/").on('child_changed', data => {
        
        CheckInroom = [data.key, data.child("NameOfClient").val(), data.child("NameOfRoom").val(), data.child("DateReserved").val(), data.child("Days").val(), data.child("Contact").val(), numPHP.format(data.child("TotalPayment").val())];
        roomTable.rows.add([CheckInroom]).draw();
    })

    firebase.database().ref("CheckIn/").on('child_removed', data => {
        roomTable.row($(this).parents('tr')).remove().draw();
    })

    const nameValueCheck = document.getElementById('nameValueCheck');
    const dateReservedValueCheck = document.getElementById('dateReservedValueCheck');
    const ageValueCheck = document.getElementById('ageValueCheck');
    const hourReservedValueCheck = document.getElementById('hourReservedValueCheck');
    const addressValueCheck = document.getElementById('addressValueCheck');
    const roomNameValueCheck = document.getElementById('roomNameValueCheck');
    const contactValueCheck = document.getElementById('contactValueCheck');
    const priceValueCheck = document.getElementById('priceValueCheck');
    const nationalityValueCheck = document.getElementById('nationalityValueCheck');
    const daysValueCheck = document.getElementById('daysValueCheck');
    const idPresentedValueCheck = document.getElementById('idPresentedValueCheck');
    const totalAmountValueCheck = document.getElementById('totalAmountValueCheck');
    const idImageValueCheck = document.getElementById('idImageValueCheck');
    const checkInBtnCheck = document.getElementById('checkInBtnCheck');
    const bookedByValueCheck = document.getElementById('bookedByValueCheck');
    const bookedThruValueCheck = document.getElementById('bookedThruValueCheck');
    const methodValueCheck = document.getElementById('methodValueCheck');
    const firstPaymentValueCheck = document.getElementById('firstPaymentValueCheck');
    const balanceValueCheck = document.getElementById('balanceValueCheck');
    const statusValueCheck = document.getElementById('statusValueCheck');

    const today = new Date();
    const hours = addZero(today.getHours());
    const minutes = addZero(today.getMinutes());
    const seconds = addZero(today.getSeconds());
    var amPm = (hours < 12) ? "AM" : "PM";
    var hrs = (hours > 12) ? hours - 12 : hours;
    if(hours == 0) {
        hrs = 12
    }
    const current_time = `${hrs}:${minutes}:${seconds}`
    const month = today.getMonth()
    const year = today.getFullYear()
    const day = today.getDay()
    const daym = today.getDate()
    const dayArray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
    const monthArray = new Array("January","February","March","April","May","June","July","August","September","October","November","December")

    const current_date = `${dayArray[day]} ${monthArray[month]} ${daym}, ${year}`

    $('#roomTable').on('click', '.btnView', function(){
        $("#checkDetailsModal").modal('show');
        view = roomTable.row($(this).parents('tr'));
        let file = $('#roomTable').dataTable().fnGetData($(this).closest('tr'));
        let roomIds = file[0];
        var name = file[1];
        var roomNames = file[2];
        var dateR = file[3];
        var day = file[4];
        var contacts = file[5];

        firebase.database().ref("CheckIn/").child(roomIds).on('value', data => {
            CheckInroomAll = [data.key, data.child("NameOfClient").val(), data.child("NameOfRoom").val(), 
            data.child("DateReserved").val(), data.child("Days").val(), data.child("Contact").val(), 
            data.child("TotalPayment").val(), data.child("AgeOfClient").val(), data.child("HoursReserved").val(), 
            data.child("Address").val(), data.child("Price").val(), data.child("Nationality").val(), data.child("IDType").val(), 
            data.child("ClientsPhotoURL").val(), data.child("RoomPic").val(), data.child("BookedBy").val(), 
            data.child("BookedThru").val(), data.child("Method").val(), data.child("FirstPayment").val(), 
            data.child("Balance").val(), data.child("Status").val()];
        })

        nameValueCheck.value = name;
        roomNameValueCheck.value = roomNames;
        dateReservedValueCheck.value = dateR;
        daysValueCheck.value = day;
        hourReservedValueCheck.value = CheckInroomAll[8];
        ageValueCheck.value = CheckInroomAll[7];
        idImageValueCheck.src = CheckInroomAll[13];
        idPresentedValueCheck.value = CheckInroomAll[12];
        addressValueCheck.value = CheckInroomAll[9];
        contactValueCheck.value = contacts;
        priceValueCheck.value = numPHP.format(CheckInroomAll[10]);
        nationalityValueCheck.value = CheckInroomAll[11];
        totalAmountValueCheck.value = numPHP.format(CheckInroomAll[6]);
        bookedByValueCheck.value = CheckInroomAll[15];
        bookedThruValueCheck.value = CheckInroomAll[16];
        methodValueCheck.value = CheckInroomAll[17];
        firstPaymentValueCheck.value = numPHP.format(CheckInroomAll[18]);
        balanceValueCheck.value = numPHP.format(CheckInroomAll[19]);
        statusValueCheck.value = CheckInroomAll[20];

        $('#checkOutBtn').click(function(){
            firebase.database().ref("Rooms/Available/"+roomIds).set(
                {
                    RoomID: roomIds,
                    RoomName: roomNameValueCheck.value,
                    RoomStatus: "Available",
                    RoomPrice: CheckInroomAll[10],
                    RoomPic: CheckInroomAll[14],
                }
            ,(error) => {
                if(error) {
                    swal("Error!", "Room not check-out!", "warning");
                }else {
                    firebase.database().ref("BookedHistory/"+roomIds).update(
                        {
                            status: "Check-Out",
                            LogTime: current_time,
                        }
                    );
                    firebase.database().ref("RoomsTotal/"+roomIds).update(
                        {
                            RoomID: roomIds,
                            RoomName: roomNameValueCheck.value,
                            RoomStatus: "Available",
                            RoomPrice: CheckInroomAll[10],
                            RoomPic: CheckInroomAll[14],
                        }
                    );
                    firebase.database().ref("Rooms/NotAvailable/"+roomIds).remove();
                    firebase.database().ref("CheckIn/"+roomIds).remove().then(
                        function(){
                            swal("Success!", "Room check-out successfully!", "success").then((value) => {
                                location.reload();
                                $("#checkDetailsModal").modal('hide');
                            });
                        }
                    );
                }
            });
        })
    })
});