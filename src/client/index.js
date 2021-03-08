const mg = require('metrics-graphics')

(function () {
    const socket = io();

    var plot = document.getElementById('plot'); 
    var myChart = new Chart(plot, {
        type: 'line',
        data: {
            labels: [1,2,3,4,5,6,7,8],
            datasets: [{
                label: '',
                data: [60],
                borderWidth: 1,
                backgroundColor: '#0000',
                borderColor: '#000'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleOverride : true,
                    scaleSteps : 1,
                    scaleStepWidth : 1,
                    scaleStartValue : 60,
                    ticks:{ min:40, max:500}
                }],
                xAxes: [{
                    type: 'linear',
                   
                }],
            }
        }
    });

    // var newData = [4,4,20]
    // function addData(myChart, label, data) {
    //     console.log('updating data')
    //     myChart.data.labels.push(label);
    //     for(i=0; i < data.length; i++) {
    //     myChart.data.datasets[0].data.push(data[i])
    //     myChart.update();
    //     }
    // }
    // addData(myChart,['11'],newData)

    socket.on('count', (newVal) => {
        console.log(newVal); 
        var tempDiv = document.getElementById('current-temp')
        tempDiv.innerHTML = newVal;
        myChart.data.datasets[0].data.push(newVal)
        myChart.update(); 
    });

})();