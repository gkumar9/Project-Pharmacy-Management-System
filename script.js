$(function () {
    console.log('gaurav killing it');
    $('.card-body a').click(function () {
        $(this).closest('.card').fadeOut(500, function () {
            $(this).remove();
        });
    });
    $('#tableInventory').DataTable({
        "ajax": './assests/drugInventory.json',
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "description" },
            { "data": "type" },
            { "data": "price" },
            { "data": "quantity" },

        ], "paging": false
    });
    $('#myTable').DataTable({
        "ajax": './assests/orderListing.json',
        "columns": [
            { "data": "id" },
            { "data": "status" },
            { "data": "orderTime" },
            { "data": "deliveryMode" },
            { "data": "paymentMethod" },
        ], "paging": false
    });

    $('form').on('submit', function (e) {
        e.preventDefault();
        var id = $('#inputID').val();
        var name = $('#inputName').val();
        var description = $('#inputDescription').val();
        var type1 = $('#gridRadios1').val();
        var type2 = $('#gridRadios2').val();
        console.log(type1, type2);
        var price = $('#inputPrice').val();
        var quantity = $('#inputQuantity').val();

        var newRow = `<tr>
            <td>#${id}</td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${type1}</td>
            <td>${price}</td>
            <td>${quantity} </td>
        </tr>`
        $('#tableInventory').append(newRow);


    });
    $('.selectpicker').change(function () {
        $('.symptomsList').append(`<li class="list-group-item d-flex justify-content-between align-items-center">${$('option:selected', this).text()}<a href="#" role="button" class="close-icon">&#x2715</a></li>`)
    });
    $('.symptomsList').on('click','a',function () {
        $(this).closest('li').fadeOut(500, function () {
            $(this).remove();
        });
    });
    $('#diagnosis').click(function(){
        $('#diagnosisTable').show();
    })
})











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
            text: "World Wide Wine Production 2018"
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
// eslint-disable-next-line no-unused-vars
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