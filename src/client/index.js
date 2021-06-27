const Ajax = require('./Ajax')
const StartRoast = require('./StartRoast')
const RoastControls = require('./RoastControls')
const InitialChartData = require('./InitialChartData')
const Print = require('./Print')

const plot = document.getElementById('plot');
const coffee = document.getElementById('coffee');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const yellowButton = document.getElementById('yellow-button');
const firstCrackButton = document.getElementById('firstcrack-button');
const doneButton = document.getElementById('done-button');
const saveChartButton = document.getElementById('save')
const printButton = document.getElementById('print')
const getBatchList = document.getElementById('get-batch');
const saveCuppingNotesButton = document.getElementById('save-cupping-notes')
const confirmBox = document.getElementById('confirm')
const dryAroma = document.getElementById('dry-aroma')
const wetAroma = document.getElementById('wet-aromoa')
const acidity = document.getElementById('acidity')
const body = document.getElementById('flavors')
const flavors = document.getElementById('flavors')

const chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
	axisY: { interval: 50, maximum: 550, title: "Bean Temp" },
	axisY2: { interval: 1, minimum: -1, maximum: 2, title: "Rate of Rise" },
	axisX: { intervalType: "seconds", interval: 30, minimum: 0, maximum: 720, title: "Time (Seconds)" },
	data: InitialChartData
});

chart.render()

coffee.addEventListener('focusout', RoastControls.SetBatchNumber)
resetButton.addEventListener('click', () => { RoastControls.ClearChart(chart) })
yellowButton.addEventListener('click', () => { RoastControls.MarkYellow(chart) })
firstCrackButton.addEventListener('click', () => { RoastControls.MarkFirstCrack(chart) })
doneButton.addEventListener('click', () => { RoastControls.MarkDone(chart) })
startButton.addEventListener('click', () => { StartRoast(chart) })
printButton.addEventListener('click', () => { Print() })

saveChartButton.addEventListener('focusout', () => { confirmBox.innerHTML = '' })

const getSelectedChart = async (event) => {
	//the current chart
	chart.options.data[3].dataPoints = [];
	chart.options.data[4].dataPoints = [];
	chart.options.data[5].dataPoints = [];
	//bring in the selected chart
	let PrevChartData = await Ajax.GetChart(event)
	var beanTemp = PrevChartData.chart_data.beanTemp
	var airTemp = PrevChartData.chart_data.airTemp
	var rateOfRise = PrevChartData.chart_data.rateOfRise
	for (i = 0; i < beanTemp.length; i++) {
		chart.options.data[3].dataPoints.push(beanTemp[i])
	}
	for (i = 0; i < airTemp.length; i++) {
		chart.options.data[4].dataPoints.push(airTemp[i])
	}
	for (i = 0; i < rateOfRise.length; i++) {
		chart.options.data[5].dataPoints.push(rateOfRise[i])
	}
	chart.render()
}

getBatchList.addEventListener('click', () => { Ajax.GetBatchList(getSelectedChart) })

saveCuppingNotesButton.addEventListener('click', () => {
	Ajax.saveCuppingNotes({
		dryAroma: dryAroma.innerHTML,
		wetAroma: wetAroma.innerHTML,
		acidity: acidity.innerHTML,
		body: body.innerHTML,
		flavors: flavors.innerHTML
	})
})