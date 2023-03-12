var arrayOfCheckRooms = [];
var numPHP = new Intl.NumberFormat("en-PH", {
  style: 'currency',
  currency: 'PHP'
})

$(document).ready(function () {
  var del;

  var history = [];
  var CheckInroomAll = [];

  const iconDel =
    '<i class="fas fa-trash fa-1x" style="color: white; cursor: pointer;"></i>';
  const iconView =
    '<i class="fas fa-eye fa-1x" style="color: white; cursor: pointer;"></i>';

  var roomTable = $("#roomTable").DataTable({
    responsive: true,
    dom: "Bfrtilp",
    buttons: [
      {
        extend: "excelHtml5",
        text: '<i class="fas fa-file-excel" style="cursor: pointer;"></i>',
        titleAttr: "Export to Excel",
        className: "btn btn-success",
      },
      {
        extend: "pdfHtml5",
        text: '<i class="fas fa-file-pdf" style="cursor: pointer;"></i>',
        titleAttr: "Export to Pdf",
        className: "btn btn-warning",
      },
      {
        extend: "print",
        text: '<i class="fas fa-print" style="cursor: pointer;"></i>',
        titleAttr: "Print",
        className: "btn btn-info",
      },
    ],
    pageLenght: 3,
    lengthMenu: [
      [3, 5, 10, -1],
      [3, 5, 10, "all"],
    ],
    data: history,
    columnDefs: [
      {
        targets: [0],
        visible: false,
      },
      {
        targets: -1,
        defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnView btn btn-primary' data-togle='tooltip' title='View'>" + iconView + "</button><button class='btnDel btn btn-danger' data-togle='tooltip' title='Delete'>" + iconDel + "</button></div></div>",
      },
    ],
  });

  firebase.database().ref("BookedHistory/").on("child_added", (data) => {
    if (data.child("status").val() == "Check-In") {
      var stat =
        '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
      history = [
        data.key,
        data.child("clientName").val(),
        stat + data.child("status").val(),
        "",
        data.child("LogTime").val(),
        data.child("LogDate").val(),
      ];
    }
    if (data.child("status").val() == "Check-Out") {
      var stat =
        '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
      history = [
        data.key,
        data.child("clientName").val(),
        "",
        stat + data.child("status").val(),
        data.child("LogTime").val(),
        data.child("LogDate").val(),
      ];
    }
    roomTable.rows.add([history]).draw();
  });

  firebase.database().ref("BookedHistory/").on("child_changed", (data) => {
    if (data.child("status").val() == "Check-In") {
      var stat =
        '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
      history = [
        data.key,
        data.child("clientName").val(),
        stat + data.child("status").val(),
        "",
        data.child("LogTime").val(),
        data.child("LogDate").val(),
      ];
    }
    if (data.child("status").val() == "Check-Out") {
      var stat =
        '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
      history = [
        data.key,
        data.child("clientName").val(),
        "",
        stat + data.child("status").val(),
        data.child("LogTime").val(),
        data.child("LogDate").val(),
      ];
    }
    roomTable.rows.add([history]).draw();
  });

  firebase.database().ref("BookedHistory/").on("child_removed", (data) => {
    roomTable.row(del.parents("tr")).remove().draw();
  });

  $("#roomTable").on("click", ".btnDel", function () {
    del = $(this);
    let table = $("#roomTable").dataTable();
    let file = table.fnGetData($(this).closest("tr"));

    try {
      let roomIds = file[0];
      let roomNames = file[1];

      swal({
        title: "Are you sure want to delete " + roomNames + "?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          firebase
            .database()
            .ref("BookedHistory/" + roomIds)
            .remove()
            .then(function () {
              swal("Success!", "Deleted successfully!", "success");
            });
        } else {
          swal(roomNames + " is safe!");
        }
      });
    } catch (error) {
      console.error("An error occurred while getting data: " + error.message + " with data: ");
    }

  });

  //details

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
  const bookedByValueCheck = document.getElementById('bookedByValueCheck');
  const bookedThruValueCheck = document.getElementById('bookedThruValueCheck');
  const methodValueCheck = document.getElementById('methodValueCheck');
  const firstPaymentValueCheck = document.getElementById('firstPaymentValueCheck');
  const balanceValueCheck = document.getElementById('balanceValueCheck');
  const statusValueCheck = document.getElementById('statusValueCheck');
  const typeValue = document.getElementById('typeValue');
  const stat = document.getElementById('status');
  const stats = document.getElementById('statuss');
  const timeValue = document.getElementById('timeValue');

  $("#roomTable").on("click", ".btnView", function () {
    let file = $('#roomTable').dataTable().fnGetData($(this).closest('tr'));
    let roomIds = file[0];

    $("#checkDetailsModal").modal('show');

    firebase.database().ref("BookedHistory/").child(roomIds).on('value', data => {
      CheckInroomAll = [data.key, data.child("TypeOfClient").val(), data.child("clientName").val(), data.child("NameOfRoom").val(),
      data.child("DateReserved").val(), data.child("Days").val(), data.child("Contact").val(),
      data.child("TotalPayment").val(), data.child("AgeOfClient").val(), data.child("HoursReserved").val(),
      data.child("Address").val(), data.child("Price").val(), data.child("Nationality").val(), data.child("IDType").val(),
      data.child("ClientsPhotoURL").val(), data.child("RoomPic").val(), data.child("BookedBy").val(),
      data.child("BookedThru").val(), data.child("Method").val(), data.child("FirstPayment").val(),
      data.child("Balance").val(), data.child("Status").val(), data.child("status").val(), data.child("LogTime").val()];
    })

    typeValue.value = CheckInroomAll[1];
    nameValueCheck.value = CheckInroomAll[2];
    roomNameValueCheck.value = CheckInroomAll[3];
    dateReservedValueCheck.value = CheckInroomAll[4];
    daysValueCheck.value = CheckInroomAll[5];
    hourReservedValueCheck.value = CheckInroomAll[9];
    ageValueCheck.value = CheckInroomAll[8];
    idImageValueCheck.src = CheckInroomAll[14];
    idPresentedValueCheck.value = CheckInroomAll[13];
    addressValueCheck.value = CheckInroomAll[10];
    contactValueCheck.value = CheckInroomAll[6];
    priceValueCheck.value = numPHP.format(CheckInroomAll[11]);
    nationalityValueCheck.value = CheckInroomAll[12];
    totalAmountValueCheck.value = numPHP.format(CheckInroomAll[7]);
    bookedByValueCheck.value = CheckInroomAll[16];
    bookedThruValueCheck.value = CheckInroomAll[17];
    methodValueCheck.value = CheckInroomAll[18];
    firstPaymentValueCheck.value = numPHP.format(CheckInroomAll[19]);
    balanceValueCheck.value = numPHP.format(CheckInroomAll[20]);
    statusValueCheck.value = CheckInroomAll[21];
    stat.innerHTML = CheckInroomAll[22];
    stats.innerHTML = CheckInroomAll[22];
    timeValue.value = CheckInroomAll[23];

  });

});
