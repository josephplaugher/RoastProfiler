const StartRoast = require('./StartRoast')
const RoastControls = require('./RoastControls')
const InitialChartData = require('./InitialChartData')
const Print = require('./Print')
const Ajax = require('./Ajax')

var plot = document.getElementById('plot');
var coffee = document.getElementById('coffee');
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');
var yellowButton = document.getElementById('yellow-button');
var firstCrackButton = document.getElementById('firstcrack-button');
var doneButton = document.getElementById('done-button');
var printButton = document.getElementById('print')
var saveChartButton = document.getElementById('save')
var dryAroma = document.getElementById('dry-aroma')
var wetAroma = document.getElementById('wet-aromoa')
var acidity = document.getElementById('acidity')
var body = document.getElementById('flavors')
var flavors = document.getElementById('flavors')

var yellow = document.getElementById('yellow');
var firstCrack = document.getElementById('firstcrack');
var done = document.getElementById('done');
var batch = document.getElementById('batch');

var chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
	axisY: { interval: 50, maximum: 550, title: "Bean Temp" },
	axisY2: [{ interval: 3, minimum: -5, maximum: 15, title: "Rate of Rise" }, { interval: 15, mimum: 0, maximum: 30, title: "Fuel Pressure" }],
	axisX: { intervalType: "seconds", interval: 30, minimum: 0, maximum: 540, title: "Time (Seconds)" },
	data: InitialChartData
});

chart.render()

coffee.addEventListener('focusout', RoastControls.SetBatchNumber)
stopButton.addEventListener('click', () => { RoastControls.StopChart(chart) })
resetButton.addEventListener('click', () => { RoastControls.ClearChart(chart) })
stopButton.addEventListener('click', () => { RoastControls.StopChart() })
yellowButton.addEventListener('click', () => { RoastControls.MarkYellow(chart) })
firstCrackButton.addEventListener('click', () => { RoastControls.MarkFirstCrack(chart) })
doneButton.addEventListener('click', () => { RoastControls.MarkDone(chart) })
startButton.addEventListener('click', () => { StartRoast(chart) })
printButton.addEventListener('click', () => { Print() })
saveChartButton.addEventListener('click', () => {
	Ajax.SaveChart({
		batch: batch.value, yellow: yellow.innerHTML,
		firstCrack: firstCrack.innerHTML, done: done.innerHTML,
		chart: chart.options.data
	})
})

saveCuppingNotesButton.addEventListener('click', () => {
	Ajax.saveCuppingNotes({
		dryAroma: dryAroma.innerHTML,
		wetAroma: wetAroma.innerHTML,
		acidity: acidity.innerHTML,
		body: body.innerHTML,
		flavors: flavors.innerHTML
	})
})