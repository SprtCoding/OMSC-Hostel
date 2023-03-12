// var stdNo = 0;
// const tBody = document.getElementById('reservedtBody');
var arrayOfReservedRooms = [];
var numPHP = new Intl.NumberFormat("en-PH", {
    style: 'currency',
    currency: 'PHP'
})

// function addDataToTableReserved(roomID, name, roomname, dreserved, days, contact, total, rHours, age, idPic, idType, address, price, nationality, totalAmount, rPics) {

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

//         arrayOfReservedRooms.push([roomID, name, roomname, dreserved, days, contact, total, rHours, age, idPic, idType, address, price, nationality, totalAmount, rPics]);

//         controlDiv.innerHTML = '<i class="fas fa-eye fa-1x me-3" style="color: #4B9DE4; cursor: pointer;" onclick="viewDataCheck('+stdNo+')"></i></i>';
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
//         reservedtBody.appendChild(trow);

// }

// function getAllDataReserved() {
//     firebase.database().ref("Booked/").once('value', function(snapshot) {
//         var room = [];
//         snapshot.forEach(childSnapshot => {
//             room.push(childSnapshot.val());
//         });
//         AddAllItemsReserved(room);
//     })
// }

// function AddAllItemsReserved(Rooms) {
//     stdNo = 0;
//     reservedtBody.innerHTML = "";
//     Rooms.forEach(element => {
//         addDataToTableReserved(element.BookID, element.Name, element.RoomName, 
//             element.dateReserved, element.days, element.contactNo, element.totalAmount, 
//             element.reservedHour, element.Age, element.idFile, element.idType
//             , element.Address, element.Price, element.Nationality, element.totalAmount, element.RoomPic);
//     });
// }

// window.addEventListener('load', getAllDataReserved);

$(document).ready(function () {
    const typeValue = document.getElementById('typeValue');
    const nameValue = document.getElementById('nameValue');
    const dateReservedValue = document.getElementById('dateReservedValue');
    const ageValue = document.getElementById('ageValue');
    const hourReservedValue = document.getElementById('hourReservedValue');
    const addressValue = document.getElementById('addressValue');
    const roomNameValue = document.getElementById('roomNameValue');
    const contactValue = document.getElementById('contactValue');
    const priceValue = document.getElementById('priceValue');
    const nationalityValue = document.getElementById('nationalityValue');
    const daysValue = document.getElementById('daysValue');
    const idPresentedValue = document.getElementById('idPresentedValue');
    const totalAmountValue = document.getElementById('totalAmountValue');
    const idImageValue = document.getElementById('idImageValue');
    const checkInBtn = document.getElementById('checkInBtn');
    const bookedByValue = document.getElementById('bookedByValue');
    const bookedThruValue = document.getElementById('bookedThruValue');
    const methodValue = document.getElementById('methodValue');
    const firstPaymentValue = document.getElementById('firstPaymentValue');
    const balanceValue = document.getElementById('balanceValue');
    const statusValue = document.getElementById('statusValue');
    var bal = 0;
    var totalVal = 0;
    var checkinBtn = document.getElementById('checkInBtn');

    function manageBtn() {
        if (bookedByValue.value == "" && bookedThruValue.value == "" && firstPaymentValue.value == "") {
            checkinBtn.disabled = true;
        } else if (bookedByValue.value == "") {
            checkinBtn.disabled = true;
        } else if (bookedThruValue.value == "") {
            checkinBtn.disabled = true;
        } else if (firstPaymentValue.value == "") {
            checkinBtn.disabled = true;
        } else {
            checkinBtn.disabled = false;
        }
    }

    firstPaymentValue.addEventListener("input", () => {
        if (parseFloat(firstPaymentValue.value) > parseFloat(totalVal)) {
            balanceValue.value = "Amout to large";
            checkinBtn.disabled = true;
        } else if (firstPaymentValue.value == "") {
            balanceValue.value = numPHP.format(0);
            checkinBtn.disabled = true;
            manageBtn();
        } else {
            manageBtn();
            bal = parseFloat(totalVal) - parseFloat(firstPaymentValue.value);
            balanceValue.value = numPHP.format(parseFloat(bal));
            if (balanceValue.value == numPHP.format(0)) {
                statusValue.value = "Paid"
            } else {
                statusValue.value = "Unpaid"
            }
        }
    })

    bookedByValue.addEventListener("input", () => {
        if (bookedByValue.value == "") {
            checkinBtn.disabled = true;
            manageBtn();
        } else {
            manageBtn();
        }
    })

    bookedThruValue.addEventListener("input", () => {
        if (bookedThruValue.value == "") {
            checkinBtn.disabled = true;
            manageBtn();
        } else {
            manageBtn();
        }
    })

    var view;
    var del;

    var Reservedroom = [];
    var ReservedroomAll = [];

    const iconDel = '<i class="fas fa-trash fa-1x" style="color: white; cursor: pointer;"></i>';
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
        lengthMenu: [[3, 5, 10, -1], [3, 5, 10, 'all']],
        data: Reservedroom,
        columnDefs: [
            {
                targets: [0],
                visible: false
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnView btn btn-success' data-togle='tooltip' title='View'>" + iconView + "</button><button class='btnDel btn btn-danger' data-togle='tooltip' title='Delete'>" + iconDel + "</button></div></div>"
            }
        ]
    })

    firebase.database().ref("Booked/").on('child_added', data => {
        Reservedroom = [data.key, data.child("Name").val(), data.child("RoomName").val(),
        data.child("dateReserved").val(), data.child("days").val(),
        data.child("contactNo").val(), numPHP.format(data.child("totalAmount").val())];
        roomTable.rows.add([Reservedroom]).draw();
    })

    firebase.database().ref("Booked/").on('child_changed', data => {
        Reservedroom = [data.key, data.child("Name").val(), data.child("RoomName").val(),
        data.child("dateReserved").val(), data.child("days").val(), data.child("contactNo").val(), numPHP.format(data.child("totalAmount").val())];
        roomTable.rows.add([Reservedroom]).draw();
    })

    firebase.database().ref("Booked/").on('child_removed', data => {
        roomTable.row($(this).parents('tr')).remove().draw();
    })

    $('#roomTable').on('click', '.btnDel', function () {
        del = $(this);
        let file = $('#roomTable').dataTable().fnGetData(del.closest('tr'));
        let roomIds = file[0];
        let roomNames = file[2];

        swal({
            title: "Are you sure want to delete " + roomNames + "?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.database().ref("RoomsTotal/" + roomIds).update(
                        {
                            RoomStatus: "Available",
                        }
                    );
                    firebase.database().ref("Rooms/Available/" + roomIds).update(
                        {
                            RoomStatus: "Available",
                        }
                    );
                    firebase.database().ref("Booked/" + roomIds).remove().then(
                        function () {
                            swal(roomNames + " has been deleted!", {
                                icon: "success",
                            });
                            getAllDataReserved();
                        }
                    );
                } else {
                    swal(roomNames + " is safe!");
                }
            });
    })

    const today = new Date();
    const hours = addZero(today.getHours());
    const minutes = addZero(today.getMinutes());
    const seconds = addZero(today.getSeconds());
    var amPm = (hours < 12) ? "AM" : "PM";
    var hrs = (hours > 12) ? hours - 12 : hours;
    if (hours == 0) {
        hrs = 12
    }
    const current_time = `${hrs}:${minutes}:${seconds}`
    const month = today.getMonth()
    const year = today.getFullYear()
    const day = today.getDay()
    const daym = today.getDate()
    const dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    const monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

    const current_date = `${dayArray[day]} ${monthArray[month]} ${daym}, ${year}`

    let rndomNumber = Math.floor((Math.random() * 10000000) + 1);

    var nameOfCustomer = document.getElementById('nameOfCustomer');
    var addressOfCustomer = document.getElementById('addressOfCustomer');
    var contactOfCustomer = document.getElementById('contactOfCustomer');
    var roomNameReceipt = document.getElementById('roomNameReceipt');
    var priceReceipt = document.getElementById('priceReceipt');
    var checkDateReceipt = document.getElementById('checkDateReceipt');
    var checkHourReceipt = document.getElementById('checkHourReceipt');
    var daysReceipt = document.getElementById('daysReceipt');
    var dateReceipt = document.getElementById('dateReceipt');
    var receiptNo = document.getElementById('receiptNo');
    var totalAmount = document.getElementById('totalAmount');
    var statusReceipt = document.getElementById('statusReceipt');
    var fPayment = document.getElementById('fPayment');
    var balanceReceipt = document.getElementById('balanceReceipt');

    $('#roomTable').on('click', '.btnView', function () {
        manageBtn();
        view = roomTable.row($(this).parents('tr'));
        let file = $('#roomTable').dataTable().fnGetData($(this).closest('tr'));
        let roomIds = file[0];
        var name = file[1];
        var roomNames = file[2];
        var dateR = file[3];
        var day = file[4];
        var contacts = file[5];

        let uid = firebase.database().ref("CheckIn/").push().key;

        firebase.database().ref("Booked/").child(roomIds).on('value', data => {
            ReservedroomAll = [data.key, data.child("TypeOfClient").val(), data.child("Name").val(),
            data.child("RoomName").val(), data.child("dateReserved").val(),
            data.child("days").val(), data.child("contactNo").val(),
            data.child("totalAmount").val(), data.child("Age").val(),
            data.child("reservedHour").val(), data.child("Address").val(),
            data.child("Price").val(), data.child("Nationality").val(),
            data.child("idType").val(), data.child("idFile").val(),
            data.child("RoomPic").val()];
        })

        $("#reservedDetailsModal").modal('show');
        typeValue.value = ReservedroomAll[1];
        nameValue.value = name;
        roomNameValue.value = roomNames;
        dateReservedValue.value = dateR;
        daysValue.value = day;
        hourReservedValue.value = ReservedroomAll[9];
        ageValue.value = ReservedroomAll[8];
        idImageValue.src = ReservedroomAll[14];
        idPresentedValue.value = ReservedroomAll[13];
        addressValue.value = ReservedroomAll[10];
        contactValue.value = contacts;
        priceValue.value = numPHP.format(ReservedroomAll[11]);
        nationalityValue.value = ReservedroomAll[12];
        totalAmountValue.value = numPHP.format(ReservedroomAll[7]);
        balanceValue.value = numPHP.format(0);

        totalVal = ReservedroomAll[7];

        $('#checkInBtn').click(function () {
            if (bookedByValue.value == "" && bookedThruValue.value == "" && firstPaymentValue.value == "") {
                swal("Warning!", "Fields is empty.", "warning");
            } else if (bookedByValue.value == "") {
                swal("Warning!", "Booked By is empty.", "warning");
            } else if (bookedThruValue.value == "") {
                swal("Warning!", "Booked thru is empty.", "warning");
            } else if (firstPaymentValue.value == "") {
                swal("Warning!", "First payment is empty.", "warning");
            } else {
                firebase.database().ref("CheckIn/" + uid).set(
                    {
                        CheckInID: uid,
                        RoomID: roomIds,
                        BookedBy: bookedByValue.value,
                        BookedThru: bookedThruValue.value,
                        TypeOfClient: ReservedroomAll[1],
                        NameOfClient: nameValue.value,
                        NameOfRoom: roomNameValue.value,
                        DateReserved: dateReservedValue.value,
                        HoursReserved: hourReservedValue.value,
                        AgeOfClient: ageValue.value,
                        ClientsPhotoURL: ReservedroomAll[14],
                        IDType: idPresentedValue.value,
                        Address: addressValue.value,
                        Contact: contactValue.value,
                        Price: ReservedroomAll[11],
                        Nationality: nationalityValue.value,
                        TotalPayment: ReservedroomAll[7],
                        Days: daysValue.value,
                        Method: methodValue.value,
                        FirstPayment: firstPaymentValue.value,
                        Balance: bal,
                        Status: statusValue.value,
                        RoomPic: ReservedroomAll[15],
                    },
                    (error) => {
                        if (error) {
                            swal("Error!", "Room not check-in!", "warning");
                        } else {
                            firebase.database().ref("BookedHistory/" + uid).set(
                                {
                                    hisID: uid,
                                    RoomID: roomIds,
                                    clientName: nameValue.value,
                                    status: "Check-In",
                                    LogTime: current_time,
                                    LogDate: current_date,
                                    BookedBy: bookedByValue.value,
                                    BookedThru: bookedThruValue.value,
                                    TypeOfClient: ReservedroomAll[1],
                                    NameOfRoom: roomNameValue.value,
                                    DateReserved: dateReservedValue.value,
                                    HoursReserved: hourReservedValue.value,
                                    AgeOfClient: ageValue.value,
                                    ClientsPhotoURL: ReservedroomAll[14],
                                    IDType: idPresentedValue.value,
                                    Address: addressValue.value,
                                    Contact: contactValue.value,
                                    Price: ReservedroomAll[11],
                                    Nationality: nationalityValue.value,
                                    TotalPayment: ReservedroomAll[7],
                                    Days: daysValue.value,
                                    Method: methodValue.value,
                                    FirstPayment: firstPaymentValue.value,
                                    Balance: bal,
                                    Status: statusValue.value,
                                    RoomPic: ReservedroomAll[15],
                                }
                            );
                            firebase.database().ref("Rooms/NotAvailable/" + roomIds).set(
                                {
                                    RoomID: roomIds,
                                    RoomName: roomNameValue.value,
                                    RoomStatus: "Not Available",
                                    RoomPrice: ReservedroomAll[11],
                                    RoomPic: ReservedroomAll[15],
                                }
                            );
                            firebase.database().ref("RoomsTotal/" + roomIds).update(
                                {
                                    RoomStatus: "Not Available",
                                }
                            );
                            firebase.database().ref("Rooms/Available/" + roomIds).remove();
                            firebase.database().ref("Booked/" + roomIds).remove().then(
                                function () {
                                    swal("Success!", "Room check-in successfully!", "success").then((value) => {
                                        $("#reservedDetailsModal").modal('hide');
                                        nameOfCustomer.innerHTML = name;
                                        addressOfCustomer.innerHTML = addressValue.value;
                                        contactOfCustomer.innerHTML = contacts;
                                        roomNameReceipt.innerHTML = roomNames;
                                        priceReceipt.innerHTML = priceValue.value;
                                        checkDateReceipt.innerHTML = dateR;
                                        checkHourReceipt.innerHTML = hourReservedValue.value;
                                        daysReceipt.innerHTML = day;
                                        receiptNo.innerHTML = rndomNumber;
                                        dateReceipt.innerHTML = current_date;
                                        totalAmount.innerHTML = totalAmountValue.value;
                                        statusReceipt.innerHTML = "Check-In";
                                        fPayment.innerHTML = numPHP.format(firstPaymentValue.value);
                                        balanceReceipt.innerHTML = numPHP.format(bal);
                                        $("#receiptModal").modal('show');
                                    });
                                }
                            );
                        }
                    }
                )
            }
        })
    })


});