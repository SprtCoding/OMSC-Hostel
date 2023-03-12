var arrayOfCheckRooms = [];
var numPHP = new Intl.NumberFormat("en-PH", {
    style: 'currency',
    currency: 'PHP'
})

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
        lengthMenu: [[3, 5, 10, -1], [3, 5, 10, 'all']],
        data: CheckInroom,
        columnDefs: [
            {
                targets: [0],
                visible: false
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnView btn btn-success' data-togle='tooltip' title='View Data'>" + iconView + "</button></div></div>"
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
    const typeValue = document.getElementById('typeValue');

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

    $('#roomTable').on('click', '.btnView', function () {
        $("#checkDetailsModal").modal('show');
        view = roomTable.row($(this).parents('tr'));
        let file = $('#roomTable').dataTable().fnGetData($(this).closest('tr'));
        let checkIds = file[0];
        var name = file[1];
        var roomNames = file[2];
        var dateR = file[3];
        var day = file[4];
        var contacts = file[5];

        firebase.database().ref("CheckIn/").child(checkIds).on('value', data => {
            CheckInroomAll = [data.key, data.child("TypeOfClient").val(), data.child("NameOfClient").val(), data.child("NameOfRoom").val(),
            data.child("DateReserved").val(), data.child("Days").val(), data.child("Contact").val(),
            data.child("TotalPayment").val(), data.child("AgeOfClient").val(), data.child("HoursReserved").val(),
            data.child("Address").val(), data.child("Price").val(), data.child("Nationality").val(), data.child("IDType").val(),
            data.child("ClientsPhotoURL").val(), data.child("RoomPic").val(), data.child("BookedBy").val(),
            data.child("BookedThru").val(), data.child("Method").val(), data.child("FirstPayment").val(),
            data.child("Balance").val(), data.child("Status").val(), data.child("RoomID").val()];
        })

        typeValue.value = CheckInroomAll[1];
        nameValueCheck.value = name;
        roomNameValueCheck.value = roomNames;
        dateReservedValueCheck.value = dateR;
        daysValueCheck.value = day;
        hourReservedValueCheck.value = CheckInroomAll[9];
        ageValueCheck.value = CheckInroomAll[8];
        idImageValueCheck.src = CheckInroomAll[14];
        idPresentedValueCheck.value = CheckInroomAll[13];
        addressValueCheck.value = CheckInroomAll[10];
        contactValueCheck.value = contacts;
        priceValueCheck.value = numPHP.format(CheckInroomAll[11]);
        nationalityValueCheck.value = CheckInroomAll[12];
        totalAmountValueCheck.value = numPHP.format(CheckInroomAll[7]);
        bookedByValueCheck.value = CheckInroomAll[16];
        bookedThruValueCheck.value = CheckInroomAll[17];
        methodValueCheck.value = CheckInroomAll[18];
        firstPaymentValueCheck.value = numPHP.format(CheckInroomAll[19]);
        balanceValueCheck.value = numPHP.format(CheckInroomAll[20]);
        statusValueCheck.value = CheckInroomAll[21];

        $('#checkOutBtn').click(function () {
            firebase.database().ref("Rooms/Available/" + CheckInroomAll[22]).set(
                {
                    RoomID: CheckInroomAll[22],
                    RoomName: roomNameValueCheck.value,
                    RoomStatus: "Available",
                    RoomPrice: CheckInroomAll[11],
                    RoomPic: CheckInroomAll[15],
                }
                , (error) => {
                    if (error) {
                        swal("Error!", "Room not check-out!", "warning");
                    } else {
                        firebase.database().ref("BookedHistory/" + checkIds).update(
                            {
                                status: "Check-Out",
                                LogTime: current_time,
                                BookedBy: bookedByValueCheck.value,
                                BookedThru: bookedThruValueCheck.value,
                                TypeOfClient: CheckInroomAll[1],
                                NameOfRoom: roomNameValueCheck.value,
                                DateReserved: dateReservedValueCheck.value,
                                HoursReserved: hourReservedValueCheck.value,
                                AgeOfClient: ageValueCheck.value,
                                ClientsPhotoURL: CheckInroomAll[14],
                                IDType: idPresentedValueCheck.value,
                                Address: addressValueCheck.value,
                                Contact: contactValueCheck.value,
                                Price: CheckInroomAll[11],
                                Nationality: nationalityValueCheck.value,
                                TotalPayment: CheckInroomAll[7],
                                Days: daysValueCheck.value,
                                Method: methodValueCheck.value,
                                FirstPayment: CheckInroomAll[19],
                                Balance: CheckInroomAll[20],
                                Status: statusValueCheck.value,
                                RoomPic: CheckInroomAll[15],
                            }
                        );
                        firebase.database().ref("RoomsTotal/" + CheckInroomAll[22]).update(
                            {
                                RoomID: CheckInroomAll[22],
                                RoomName: roomNameValueCheck.value,
                                RoomStatus: "Available",
                                RoomPrice: CheckInroomAll[11],
                                RoomPic: CheckInroomAll[15],
                            }
                        );
                        firebase.database().ref("Rooms/NotAvailable/" + CheckInroomAll[22]).remove();
                        firebase.database().ref("CheckIn/" + checkIds).remove().then(
                            function () {
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