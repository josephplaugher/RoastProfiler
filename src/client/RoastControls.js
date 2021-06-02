const SecondsToMinutes = require('./SecondsToMinutes')
var yellow = document.getElementById('yellow');
var firstCrack = document.getElementById('firstcrack');
var done = document.getElementById('done');
var batch = document.getElementById('batch');
const socket = io();

const SetBatchNumber = () => {
	//get the current date and time 
	var currentdate = new Date();
	var date = currentdate.getFullYear() + "-"
		+ (currentdate.getMonth() + 1) + "-"
		+ currentdate.getDate() + ". "
		+ (currentdate.getHours() - 2) + ":"
		+ currentdate.getMinutes() + " - "
	var batchNo = date + coffee.value;
	batch.value = batchNo;
}

const StopChart = () => {
	socket.off('count');
}

const MarkYellow = (chart) => {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length - 1].y;
	var time = data.length - 1;
	var yellowVal = temp + " degrees at " + time + " seconds";
	yellow.innerHTML = yellowVal;
	chart.options.data[0].dataPoints[time].label = "yellow";
	chart.options.data[0].dataPoints[time].markerSize = 15;
}

const MarkFirstCrack = (chart) => {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length - 1].y;
	var time = data.length - 1;
	var timeStamp = SecondsToMinutes(time);
	var firstCrackVal = temp + " degrees at " + time + " seconds (" + timeStamp.minutes + ":" + timeStamp.seconds + ")";
	firstCrack.innerHTML = firstCrackVal;
	chart.options.data[0].dataPoints[time].label = "first crack";
	chart.options.data[0].dataPoints[time].markerSize = 15;
}

const MarkDone = (chart) => {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length - 1].y;
	var time = data.length - 1;
	var timeStamp = SecondsToMinutes(time);
	var doneVal = temp + " degrees at " + time + " seconds (" + timeStamp.minutes + ":" + timeStamp.seconds + ")";
	done.innerHTML = doneVal;
	chart.options.data[0].dataPoints[time].label = "done";
	chart.options.data[0].dataPoints[time].markerSize = 15;
}

const ClearChart = (chart) => {
	var clear = confirm("You really want to clear the chart?")
	if (clear == true) {
		socket.off('count');
		chart.options.data[0].dataPoints = [];
		chart.options.data[1].dataPoints = [];
		chart.options.data[2].dataPoints = [];
		chart.options.data[3].dataPoints = [];
		chart.render();
		yellow.innerHTML = firstCrack.innerHTML = done.innerHTML = '[placeholder]'
	}
}


module.exports = { SetBatchNumber, StopChart, MarkYellow, MarkFirstCrack, MarkDone, ClearChart }