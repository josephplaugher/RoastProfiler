const StartRoast = require('./StartRoast')
const RoastControls = require('./RoastControls')
const InitialChartData = require('./InitialChartData')
const Print = require('./Print')

var plot = document.getElementById('plot');
var coffee = document.getElementById('coffee');
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');
var yellowButton = document.getElementById('yellow-button');
var firstCrackButton = document.getElementById('firstcrack-button');
var doneButton = document.getElementById('done-button');
var saveChartButton = document.getElementById('save')
var printButton = document.getElementById('print')
var saveCuppingNotesButton = document.getElementById('save-cupping-notes')
var confirmBox = document.getElementById('confirm')
var dryAroma = document.getElementById('dry-aroma')
var wetAroma = document.getElementById('wet-aromoa')
var acidity = document.getElementById('acidity')
var body = document.getElementById('flavors')
var flavors = document.getElementById('flavors')

var chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
	axisY: { interval: 50, maximum: 600, title: "Bean Temp" },
	axisY2: [{ interval: 1, minimum: -5, maximum: 5, title: "Rate of Rise" }, { interval: 15, mimum: 0, maximum: 30, title: "Fuel Pressure" }],
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

saveChartButton.addEventListener('focusout', () => {
	confirmBox.innerHTML = '';
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