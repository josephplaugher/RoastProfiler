const socket = require('socket.io-client')
const SecondsToMinutes = require('./SecondsToMinutes')
const Ajax = require('./Ajax')

const dtr = document.getElementById('dtr');
const firstCrackButton = document.getElementById('firstcrack-button');
const RoR_el = document.getElementById('ror')     //rate of rise
const beanTempDiv = document.getElementById('bean-temp')
const airTempDiv = document.getElementById('air-temp')
const saveChartButton = document.getElementById('save')
const stopButton = document.getElementById('stop-button');

const yellow = document.getElementById('yellow');
const firstCrack = document.getElementById('firstcrack');
const done = document.getElementById('done');
const batch = document.getElementById('batch');
const getBatch = document.getElementById('get-batch');

var FirstCrackAchieved = false
firstCrackButton.addEventListener('click', () => { FirstCrackAchieved = true })

const StartRoast = (chart) => {
    var s = 0  //start the seconds count timer
    var rorTimer = 0 //start the rate of rise timer
    var fct = 0 //first crack time timer

    socket.on('count', (newVal) => {
        s++//add 1 second to timer
        rorTimer++//add one second to rorTimer

        jsonData = JSON.parse(newVal.replace(/'/g, '"'))
        chart.options.data[0].dataPoints.push({ y: parseInt(jsonData.A) });
        chart.options.data[1].dataPoints.push({ y: parseInt(jsonData.B) });
        chart.render();

        beanTempDiv.innerHTML = jsonData.A;
        airTempDiv.innerHTML = jsonData.B;

        var currentDataArrayA = chart.options.data[0].dataPoints;
        var currentDataArrayB = chart.options.data[1].dataPoints;

        sessionStorage.setItem("BT", JSON.stringify(currentDataArrayA))
        sessionStorage.setItem("AT", JSON.stringify(currentDataArrayB))

        if (rorTimer == 30) {
            var ft = jsonData.A;
            var st = chart.options.data[0].dataPoints[chart.options.data[0].dataPoints.length - 30].y
            var rise = ft - st;
            var RoR = rise / 30
            RoR_el.innerHTML = RoR.toFixed(2);
            // plot the current RoR on the secondary Y axis
            chart.options.data[3].dataPoints.push({ y: parseInt(RoR.toFixed(2)), x: s });
            chart.render();
            // reset the rorTimer
            rorTimer = 0;
        }

        //time from first crack
        if (FirstCrackAchieved == true) {
            fct++;
            var time = SecondsToMinutes(fct)
            var timeStamp = time.minutes + ":" + time.seconds;
            tffc.innerHTML = timeStamp;
            var devTimeRatio = (fct / s).toFixed(2);
            dtr.innerHTML = devTimeRatio;
        }

    });


    saveChartButton.addEventListener('click', () => {
        Ajax.SaveChart({
            coffee: coffee.value, batch: batch.value, yellow: yellow.innerHTML,
            firstCrack: firstCrack.innerHTML, done: done.innerHTML,
            chart: {
                beanTemp: chart.options.data[0].dataPoints,
                airTemp: chart.options.data[1].dataPoints,
                rateOfRise: chart.options.data[3].dataPoints
            }
        })
    })
}

stopButton.addEventListener('click', () => { StopChart() })
getBatch.addEventListener('click', () => { Ajax.GetBatchList() }) //make this run on page load

const StopChart = () => {
    socket.off('count');

}

module.exports = StartRoast;