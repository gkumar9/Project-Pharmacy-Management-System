$(function () {

    //Dashboard cards animation
    $('.card-body a').click(function () {
        $(this).closest('.card').fadeOut(500, function () {
            $(this).remove();
        });
    });
    /*--------------------------------------------------------------------------------------*/

    //GET API call for DrugInventory table
    $('#tableInventory').DataTable({
        "ajax": 'http://18.209.9.245:443/rest-api/drugInventory',
        "columns": [
            { "data": "DrugID" },
            { "data": "DrugName" },
            { "data": "DrugDescription" },
            { "data": "DrugType" },
            { "data": "DrugPrice" },
            { "data": "DrugQuantity" },
            {
                "data": null,
                "defaultContent": `<button><i class="fas fa-edit"></i></button>`,
                'render': function (data, type, row, meta) {
                    return `<a class="editTable" id="edit-${data.id}" data-index=${data.id} href="javascript:void(0)"><i class="fas fa-edit"></i></a>`;
                }
            },
            {
                "data": null,
                "defaultContent": `<button><i class="fa-solid fa-trash"></i></button>`,
                'render': function (data, type, row, meta) {
                    return `<a class="deleteTable" id="delete-${data.id}" data-index=${data.id} href="javascript:void(0)"><i class="fas fa-trash"></i></a>`;
                }
            }

        ], "paging": false
    });
    /*--------------------------------------------------------------------------------------*/


    //Edit functionality of DrugInventory table-setting up modal form
    $('#tableInventory').on("click", "a.editTable ", function (data) {
        var $row = jQuery(this).closest('tr');
        var $columns = $row.find('td');
        $('#inputIDedit').val(($columns[0].innerHTML));
        $('#inputNameedit').val($columns[1].innerHTML);
        $('#inputDescriptionedit').val($columns[2].innerHTML);
        $columns[3].innerHTML == $('input[name=gridRadiosedit][id=gridRadios1edit]').val() ? $('input[name=gridRadiosedit][id=gridRadios1edit]').prop('checked', true) : $('input[name=gridRadiosedit][id=gridRadios2edit]').prop('checked', true);
        $('input[name=gridRadiosedit]:checked').val($columns[3].innerHTML);
        $('#inputPriceedit').val(parseInt($columns[4].innerHTML));
        $('#inputQuantityedit').val($columns[5].innerHTML);
        $('#exampleModaledit').modal('show');

    });
    /*--------------------------------------------------------------------------------------*/

    //Delete functionality of DrugInventory table
    $('#tableInventory').on("click", "a.deleteTable ", function (data) {
        var $row = jQuery(this).closest('tr');
        var $columns = $row.find('td');
        console.log(($columns[0].innerHTML));
        $('#exampleModalDelete').modal('show');
        $('button#deleteModalConfirm').attr('data-id', $columns[0].innerHTML)
    });
    /*--------------------------------------------------------------------------------------*/

    //     $('#exampleModalDelete').on('show.bs.modal', function (e) {

    //         // access parsed information through relatedTarget
    //         // console.log(e.relatedTarget.id);
    //         // $('button#deleteModalConfirm').attr('data-id',e.relatedTarget.id)

    //    });




    //Delete modal form submit event
    $('#deleteModalConfirm').click(function () {
        $("#deleteModalConfirm").attr("disabled", true);
        let id = $(this).attr('data-id')

        $.ajax({
            type: "DELETE",
            url: 'http://18.209.9.245:443/rest-api/delete/drugInventory/' + $(this).attr('data-id'),
            dataType: 'json',
            success: function (response) {
                $("#deleteModalConfirm").attr("disabled", false);

                $.each($('#tableInventory tbody tr td'), function () {
                    if ($(this).text() === id) {
                        $(this).closest("tr").fadeOut(500, function () {
                            $(this).remove();
                        });
                        return;
                    }
                });
                $('#exampleModalDelete').modal('hide');
                $(".toastdelete").toast('show');
                // console.log('id', id)

            },
            error: function (err) {
                $("#deleteModalConfirm").attr("disabled", false);
                alert(err);
                $('#exampleModalDelete').modal('hide');
                console.log('err', err)
            }
        });
    });

    //Delete modal form submit event
    $('#deleteModalCancel').click(function () {
        $('#exampleModalDelete').modal('hide');
    });

    //GET API call for Orders table
    $('#myTable').DataTable({
        "ajax": 'http://18.209.9.245:443/rest-api/orders',
        "columns": [
            { "data": "OrderID" },
            { "data": "OrderStatus" },
            { "data": "OrderTime" },
            { "data": "OrderDeliveryMode" },
            { "data": "OrderPaymentMethod" },
        ], "paging": false
    });
    /*--------------------------------------------------------------------------------------*/

    //Edit Drug Form submit event
    $('form#editDrugForm').on('submit', function (e) {
        e.preventDefault();
        $("form#editDrugForm button[type=submit]").attr("disabled", true);
        let DrugID = $('#inputIDedit').val();
        let DrugName = $('#inputNameedit').val();
        let DrugDescription = $('#inputDescriptionedit').val();
        let DrugType = $('input[name=gridRadiosedit]:checked').val();
        let DrugPrice = $('#inputPriceedit').val();
        let DrugQuantity = $('#inputQuantityedit').val();

        $.ajax({
            type: "PUT",
            url: 'http://18.209.9.245:443/rest-api/edit/drugInventory/' + DrugID,
            data: {
                // "DrugID": DrugID,
                "DrugName": DrugName,
                "DrugDescription": DrugDescription,
                "DrugType": DrugType,
                "DrugPrice": DrugPrice,
                "DrugQuantity": DrugQuantity
            },
            dataType: 'json',
            success: function (response) {
                $("form#editDrugForm button[type=submit]").attr("disabled", false);
                // console.log(response);
                let row;
                $.each($('#tableInventory tbody tr td'), function () {
                    if ($(this).text() === DrugID) {
                        var newRow = `
                            <td>${DrugID}</td>
                            <td>${DrugName}</td>
                            <td>${DrugDescription}</td>
                            <td>${DrugType}</td>
                            <td>${DrugPrice}</td>
                            <td>${DrugQuantity} </td>
                            <td><a class="editTable" id="edit-${DrugID}" data-index=${DrugID} href="javascript:void(0)"><i class="fas fa-edit"></i></a></td>
                            <td><a class="deleteTable" id="delete-${DrugID}" data-index=${DrugID} href="javascript:void(0)"><i class="fas fa-trash"></i></a></td>
                        `;
                        $(this).closest("tr").html(newRow);
                        return;
                    }
                });


                $('#exampleModaledit').modal('hide');
                $(".toastedit").toast('show');
            },
            error: function (err) {
                $("form#editDrugForm button[type=submit]").attr("disabled", false);
                alert(err);
                $('#exampleModaledit').modal('hide');
                console.log('err', err)
            }
        });
    });
    /*--------------------------------------------------------------------------------------*/


    //Add Drug Form submit event
    $('form#addDrugForm').on('submit', function (e) {
        $("form#addDrugForm button[type=submit]").attr("disabled", true);
        e.preventDefault();
        let DrugID = $('#inputID').val();
        let DrugName = $('#inputName').val();
        let DrugDescription = $('#inputDescription').val();
        let DrugType = $('input[name=gridRadios]:checked').val();
        let DrugPrice = $('#inputPrice').val();
        let DrugQuantity = $('#inputQuantity').val();

        $.ajax({
            type: "POST",
            url: 'http://18.209.9.245:443/rest-api/new/drugInventory',
            data: {
                "DrugID": DrugID,
                "DrugName": DrugName,
                "DrugDescription": DrugDescription,
                "DrugType": DrugType,
                "DrugPrice": DrugPrice,
                "DrugQuantity": DrugQuantity
            },
            dataType: 'json',
            success: function (data) {
                console.log('added',data)
                $("form#addDrugForm button[type=submit]").attr("disabled", false);
                var newRow = `<tr>
            <td>${DrugID}</td>
            <td>${DrugName}</td>
            <td>${DrugDescription}</td>
            <td>${DrugType}</td>
            <td>${DrugPrice}</td>
            <td>${DrugQuantity} </td>
            <td><a class="editTable" id="edit-${DrugID}" data-index=${DrugID} href="javascript:void(0)"><i class="fas fa-edit"></i></a></td>
            <td><a class="deleteTable" id="delete-${DrugID}" data-index=${DrugID} href="javascript:void(0)"><i class="fas fa-trash"></i></a></td>
        </tr>`
                $('#tableInventory').append(newRow);
                $('#exampleModal').modal('hide');
                $(".toastadd").toast('show');
            },
            error: function (err) {
                $("form#addDrugForm button[type=submit]").attr("disabled", false);
                alert(err);
                $('#exampleModal').modal('hide');

            }
        });


    });
    /*--------------------------------------------------------------------------------------*/



    $('.selectpicker').change(function () {
        $('.symptomsList').append(`<li class="list-group-item d-flex justify-content-between align-items-center">${$('option:selected', this).text()}<a href="#" role="button" class="close-icon">&#x2715</a></li>`)
    });
    $('.symptomsList').on('click', 'a', function () {
        $(this).closest('li').fadeOut(500, function () {
            $(this).remove();
        });
    });
    $('#diagnosis').click(function () {
        $('#diagnosisTable').show();
    })
})




$(document).click(function (event) {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");
    var _opened = $navbar.hasClass("show");
    if (_opened === true && !clickover.hasClass("navbar-toggler")) {
        $navbar.collapse('hide');
    }
});







var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
];

new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "World Wide sales 2021"
        }
    }
});
var xValues1 = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

new Chart("myChart1", {
    type: "line",
    data: {
        labels: xValues1,
        datasets: [{
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: "red",
            fill: false
        }, {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: "green",
            fill: false
        }, {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: "blue",
            fill: false
        }]
    },
    options: {
        legend: { display: false }
    }
});
var ctx = document.getElementById('myChart2')
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        datasets: [{
            data: [
                15339,
                21345,
                18483,
                24003,
                23489,
                24092,
                12034
            ],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        },
        legend: {
            display: false
        }
    }
}
);