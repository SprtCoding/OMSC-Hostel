// var stdNo = 0;
// const tBody = document.getElementById('historytBody');

// function addDataToTable(historyID, name, status, logTime) {
    
//         let trow = document.createElement("tr");
//         let td1 = document.createElement('td');
//         let td2 = document.createElement('td');
//         let td3 = document.createElement('td');
//         let td4 = document.createElement('td');
//         let td5 = document.createElement('td');
//         let td6 = document.createElement('td');
//         let controlDiv = document.createElement('div');

//         controlDiv.innerHTML = '<i class="fas fa-trash fa-1x me-3" style="color: #D54D22; cursor: pointer;" onclick="viewDataCheck('+stdNo+')"></i>';
//         td2.classList.add('text-center');
//         td3.classList.add('text-center');
//         td4.classList.add('text-center');
//         td5.classList.add('text-center');
//         td6.classList.add('text-center');

//         if(status == "Check-In") {
//             td3.innerHTML = '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
//             td4.innerHTML = "";
//         }else {
//             td4.innerHTML = '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
//             td3.innerHTML = "";
//         }

//         td1.innerHTML = ++stdNo;
//         td2.innerHTML = name;
//         td5.innerHTML = logTime;
//         td6.appendChild(controlDiv);

//         td2.classList += " nameField";
//         td3.classList += " roomnameField";
//         td4.classList += " dreservedField";

//         trow.appendChild(td1);
//         trow.appendChild(td2);
//         trow.appendChild(td3);
//         trow.appendChild(td4);
//         trow.appendChild(td5);
//         trow.appendChild(td6);

//         tBody.appendChild(trow);

// }

// function getAllDataHistory() {
//     firebase.database().ref("BookedHistory/").once('value', function(snapshot) {
//         var room = [];
//         snapshot.forEach(childSnapshot => {
//             room.push(childSnapshot.val());
//         });
//         AddAllItemsHistory(room);
//     })
// }

// function AddAllItemsHistory(Rooms) {
//     stdNo = 0;
//     tBody.innerHTML = "";
//     Rooms.forEach(element => {
//         addDataToTable(element.hisID, element.clientName, element.status, element.LogTime);
//     });
// }

// window.addEventListener('load', getAllDataHistory);

$(document).ready(function () {
    var del;

    var history = [];

    const iconDel = '<i class="fas fa-trash fa-1x" style="color: white; cursor: pointer;"></i>';

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
        data: history,
        columnDefs: [
            {
                targets: [0],
                visible: false
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnDel btn btn-danger' data-togle='tooltip' title='Delete'>"+iconDel+"</button></div></div>"
            }
        ]
    })

    firebase.database().ref("BookedHistory/").on('child_added', data => {
        
        if(data.child("status").val() == "Check-In") {
            var stat = '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
            history = [data.key, data.child("clientName").val(), stat + data.child("status").val(), "" , data.child("LogTime").val(), data.child("LogDate").val()];
        }if(data.child("status").val() == "Check-Out") {
            var stat = '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
            history = [data.key, data.child("clientName").val(), "" , stat + data.child("status").val() , data.child("LogTime").val(), data.child("LogDate").val()];
        }
        roomTable.rows.add([history]).draw();
    })

    firebase.database().ref("BookedHistory/").on('child_changed', data => {
        if(data.child("status").val() == "Check-In") {
            var stat = '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
            history = [data.key, data.child("clientName").val(), stat + data.child("status").val(), "" , data.child("LogTime").val(), data.child("LogDate").val()];
        }if(data.child("status").val() == "Check-Out") {
            var stat = '<i class="fas fa-check fa-1x me-3" style="color: #11c3d4;"></i>';
            history = [data.key, data.child("clientName").val(), "" , stat + data.child("status").val() , data.child("LogTime").val(), data.child("LogDate").val()];
        }
        roomTable.rows.add([history]).draw();
    })

    firebase.database().ref("BookedHistory/").on('child_removed', data => {
        roomTable.row(del.parents('tr')).remove().draw();
    })

    $('#roomTable').on('click', '.btnDel', function(){
        del = $(this);
        let file = $('#roomTable').dataTable().fnGetData(del.closest('tr'));
        let roomIds = file[0];
        let roomNames = file[1];

        swal({
            title: "Are you sure want to delete "+roomNames+"?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                firebase.database().ref("BookedHistory/"+roomIds).remove().then(
                    function(){
                        swal("Success!", "Deleted successfully!", "success");
                    }
                );
            } else {
              swal(roomNames+" is safe!");
            }
        });
    })
});