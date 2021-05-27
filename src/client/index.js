const StartRoast = require('./StartRoast')
const RoastControls = require('./RoastControls')
const InitialChartData = require('./InitialChartData')

var plot = document.getElementById('plot');
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');
var yellowButton = document.getElementById('yellow-button');
var firstCrackButton = document.getElementById('firstcrack-button');
var doneButton = document.getElementById('done-button');
var coffee = document.getElementById('coffee');


var chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
	axisY: { interval: 50, maximum: 550, title: "Bean Temp" },
	axisY2: { interval: 3, minimum: -5, maximum: 15, title: "Rate of Rise" },
	axisX: { intervalType: "seconds", interval: 30, minimum: 0, maximum: 540, title: "Time (Seconds)" },
	data: InitialChartData
});

chart.render()

coffee.addEventListener('focusout', RoastControls.SetBatchNumber)
stopButton.addEventListener('click', () => { RoastControls.StopChart(chart) })
resetButton.addEventListener('click', () => { RoastControls.ClearChart(chart) })
stopButton.addEventListener('click', () => { RoastControls.StopChart })
yellowButton.addEventListener('click', () => { RoastControls.MarkYellow(chart) })
firstCrackButton.addEventListener('click', () => { RoastControls.MarkFirstCrack(chart) })
doneButton.addEventListener('click', () => { RoastControls.MarkDone(chart) })
startButton.addEventListener("click", () => { StartRoast(chart) })