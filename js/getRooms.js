var stdNo = 0;
const tBody = document.getElementById('tBody');
var numPHP = new Intl.NumberFormat("en-PH", {
    style: 'currency',
    currency: 'PHP'
})

const addRoomModal = document.getElementById('addRoomModal');

addRoomModal.addEventListener('shown.bs.modal', () => {
    roomName.focus()
})

$('#addRoomBtn').click(function(){
    $("#addRoomModal").modal('show');
})

// window.addEventListener('load', getAllData);

$(document).ready(function () {
    const roomName = document.getElementById('roomNameUpdate');
    const Price = document.getElementById('PriceUpdate');
    const mystatus = document.getElementById('statUpdate');
    const updateBtn = document.getElementById('updateBtn');

    var del;
    var edit;

    var room = [];
    var roomAll = [];

    const iconDel = '<i class="fas fa-trash fa-1x" style="color: white; cursor: pointer;"></i>';
    const iconEdit = '<i class="fas fa-edit fa-1x" style="color: white; cursor: pointer;"></i>';

    var roomTable = $('#roomTable').DataTable({
        responsive: true,
        dom: 'Bfrtilp',
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel" style="cursor: pointer;"></i>',
                titleAttr: 'Export to Excel',
                className: 'btn btn-success excelBtn'
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
        pageLenght: 2,
        lengthMenu: [[2,5,10,-1],[2,5,10,'all']],
        data: room,
        columnDefs: [
            {
                targets: [0],
                visible: false
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEdt btn btn-success' data-togle='tooltip' title='Edit'>"+iconEdit+"</button><button class='btnDel btn btn-danger' data-togle='tooltip' title='Delete'>"+iconDel+"</button></div></div>"
            }
        ]
    })

    firebase.database().ref("RoomsTotal/").on('child_added', data => {
        
        var img = '<img src='+data.child("RoomPic").val()+' class="my-img"></img>';
        roomAll = [data.child("RoomPrice").val()];
        room = [data.key, img, data.child("RoomName").val(), data.child("RoomStatus").val(), numPHP.format(data.child("RoomPrice").val())];
        if(data.child("RoomStatus").val() == "Available") {
            console.log(roomTable.row($(this).closest('tr')));
        }
        roomTable.rows.add([room]).draw();
    })

    firebase.database().ref("RoomsTotal/").on('child_changed', data => {
        
        var img = '<img src='+data.child("RoomPic").val()+' class="my-img"></img>';
        room = [data.key, img, data.child("RoomName").val(), data.child("RoomStatus").val(), numPHP.format(data.child("RoomPrice").val())];
        roomTable.row(edit).data(room).draw();
    })

    firebase.database().ref("RoomsTotal/").on('child_removed', data => {
        roomTable.row(del.parents('tr')).remove().draw();
    })

    $('#roomTable').on('click', '.btnDel', function(){
        del = $(this);
        let file = $('#roomTable').dataTable().fnGetData(del.closest('tr'));
        let roomIds = file[0];
        let roomNames = file[2];
        let mystatuss = file[3];

        swal({
            title: "Are you sure want to delete "+roomNames+"?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                firebase.database().ref("RoomsTotal/"+roomIds).remove().then(
                    function(){
                        if(mystatuss == "Available") {
                            firebase.database().ref("Rooms/Available/"+roomIds).remove().then(function(){
                                swal(roomNames + " has been deleted!", {
                                    icon: "success",
                                  });
                            });
                        }else if(mystatuss == "Not Available") {
                            firebase.database().ref("Rooms/NotAvailable/"+roomIds).remove().then(function(){
                                swal(roomNames + " has been deleted!", {
                                    icon: "success",
                                  });
                            });
                        }
                    }
                );
            } else {
              swal(roomNames+" is safe!");
            }
        });
    })

    $('#roomTable').on('click', '.btnEdt', function(){
        edit = roomTable.row($(this).parents('tr'));
        let file = $('#roomTable').dataTable().fnGetData($(this).closest('tr'));
        let roomIds = file[0];
        var roomNames = file[2];
        var mystatuss = file[3];
        roomName.value = roomNames;
        mystatus.value = mystatuss;

        firebase.database().ref("RoomsTotal/").child(roomIds).on('value', data => {
            roomAll = [data.child("RoomPrice").val()];
            Price.value = roomAll[0];
        })

        $("#updateRoomModal").modal('show');
        updateBtn.onclick = function() {
            firebase.database().ref("RoomsTotal/"+roomIds).update(
                {
                    RoomID: roomIds,
                    RoomName: roomName.value,
                    RoomStatus: mystatus.value,
                    RoomPrice: Price.value,
                }
            )
            if(mystatus.value == "Available") {
                firebase.database().ref("Rooms/Available/"+roomIds).update(
                    {
                        RoomID: roomIds,
                        RoomName: roomName.value,
                        RoomStatus: mystatus.value,
                        RoomPrice: Price.value,
                    },
                    (error) => {
                        if(error) {
                            swal("Error!", "Room not updated!", "warning");
                        }else {
                            swal("Success!", "Room updated successfully!", "success");
                            $("#updateRoomModal").modal('hide');
                            firebase.database().ref("Rooms/NotAvailable/"+roomIds).remove();
                        }
                    }
                )
            }else if(mystatus.value == "Not Available") {
                firebase.database().ref("Rooms/NotAvailable/"+roomIds).update(
                    {
                        RoomID: roomIds,
                        RoomName: roomName.value,
                        RoomStatus: mystatus.value,
                        RoomPrice: Price.value,
                    },
                    (error) => {
                        if(error) {
                            swal("Error!", "Room not updated!", "warning");
                        }else {
                            swal("Success!", "Room updated successfully!", "success");
                            $("#updateRoomModal").modal('hide');
                            firebase.database().ref("Rooms/Available/"+roomIds).remove();
                        }
                    }
                )
            }
        }
    })
});