// var stdNo = 0;
// const tBody = document.getElementById('availTBody');
var arrayOfRooms = [];
var numPHP = new Intl.NumberFormat("en-PH", {
    style: 'currency',
    currency: 'PHP'
})

// function addDataToTable(roomID, RoomPics, RoomNames, stat, RoomPrices) {
    
//     let trow = document.createElement("tr");
//     let td1 = document.createElement('td');
//     let td2 = document.createElement('td');
//     let td3 = document.createElement('td');
//     let td4 = document.createElement('td');
//     let td5 = document.createElement('td');
//     let td6 = document.createElement('td');
//     let controlDiv = document.createElement('div');
//     let imgDiv = document.createElement('div');

//     arrayOfRooms.push([roomID, RoomPics, RoomNames, stat, RoomPrices]);

//     imgDiv.innerHTML = '<img src='+RoomPics+' class="my-img"></img>';
//     controlDiv.innerHTML = '<i class="fas fa-edit fa-1x me-3 edit" style="color: rgb(96, 171, 237); cursor: pointer;" onclick="editRoom('+stdNo+')"></i>';
//     controlDiv.innerHTML += '<i class="fas fa-trash fa-1x me-3" style="color: rgb(226, 75, 77); cursor: pointer;" onclick="deleteRoom('+stdNo+')"></i>';
//     td3.classList.add('text-center');
//     td4.classList.add('text-center');
//     td5.classList.add('text-center');
//     td6.classList.add('text-center');

//     td1.innerHTML = ++stdNo;
//     td2.appendChild(imgDiv);
//     td3.innerHTML = RoomNames;
//     td4.innerHTML = stat;
//     td5.innerHTML = numPHP.format(RoomPrices);
//     td6.appendChild(controlDiv);

//     td3.classList += " nameField";
//     td4.classList += " statField";
//     td5.classList += " priceField";

//     trow.appendChild(td1);
//     trow.appendChild(td2);
//     trow.appendChild(td3);
//     trow.appendChild(td4);
//     trow.appendChild(td5);
//     trow.appendChild(td6);

//     tBody.appendChild(trow);

//     if(td4.innerHTML == "Not Available") {
//         td4.classList += " text-danger";
//     }else if(td4.innerHTML == "Available") {
//         td4.classList += " text-success";
//     }

// }

// function getAllData() {
// firebase.database().ref("Rooms/Available/").once('value', function(snapshot) {
//     var room = [];
//     snapshot.forEach(childSnapshot => {
//         room.push(childSnapshot.val());
//     });
//         AddAllItems(room);
//     })
// }

// function AddAllItems(Rooms) {
//     stdNo = 0;
//     tBody.innerHTML = "";
//     Rooms.forEach(element => {
//         addDataToTable(element.RoomID, element.RoomPic, element.RoomName, element.RoomStatus, element.RoomPrice);
//     });
// }

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

    firebase.database().ref("Rooms/Available/").on('child_added', data => {
        
        var img = '<img src='+data.child("RoomPic").val()+' class="my-img"></img>';
        room = [data.key, img, data.child("RoomName").val(), data.child("RoomStatus").val(), numPHP.format(data.child("RoomPrice").val())];
        if(data.child("RoomStatus").val() == "Available") {
            console.log(roomTable.row($(this).closest('tr')));
        }
        roomTable.rows.add([room]).draw();
    })

    firebase.database().ref("Rooms/Available/").on('child_changed', data => {
        
        var img = '<img src='+data.child("RoomPic").val()+' class="my-img"></img>';
        room = [data.key, img, data.child("RoomName").val(), data.child("RoomStatus").val(), numPHP.format(data.child("RoomPrice").val())];
        roomTable.row(edit).data(room).draw();
    })

    firebase.database().ref("Rooms/Available/").on('child_removed', data => {
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