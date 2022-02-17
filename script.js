$(function () {
    console.log('gaurav killing it');
    $('.card-body a').click(function () {
        $(this).closest('.card').fadeOut(500, function () {
            $(this).remove();
        });
    });

    $.getJSON('./assests/drugInventory.json', function (data) {
        // console.log(data);
        data.data.forEach(function (item) {
            var newRow = `<tr>
            <td>#${item.id}</td>
            <td>${item.name}</td>
            <td> ${item.description}</td>
            <td>${item.type}</td>
            <td>${item.price}</td>
            <td>${item.quantity} </td>
        </tr>`
            $('.tableInventory').append(newRow);
        })

    });
    $.getJSON('./assests/orderListing.json', function (data) {
        // console.log(data);
        data.data.forEach(function (item) {
            var newRow = `<tr>
            <td>#${item.id}</td>
            <td>${item.status}</td>
            <td>${item.orderTime}</td>
            <td>${item.deliveryMode}</td>
            <td>${item.paymentMethod}</td>
        </tr>`
            $('.tableOrder').append(newRow);
        })

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
        $('.tableInventory').append(newRow);


    });
    $('.selectpicker').change(function () {
        $('.symptomsList').append(`<li class="list-group-item d-flex justify-content-between align-items-center">${$('option:selected', this).text()}<span class="badge bg-primary rounded-pill">x</span></li>`)
    });
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