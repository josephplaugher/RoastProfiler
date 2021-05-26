const socket = io();

var plot = document.getElementById('plot'); 

var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');
var yellowButton = document.getElementById('yellow-button');
var firstCrackButton = document.getElementById('firstcrack-button');
var doneButton = document.getElementById('done-button');
var print = document.getElementById('print');
var save = document.getElementById('save');
var dtr = document.getElementById('dtr');
var yellow = document.getElementById('yellow');
var firstCrack = document.getElementById('firstcrack');
var done = document.getElementById('done');
var coffee = document.getElementById('coffee');
var batch = document.getElementById('batch');

var FirstCrackAcheived = false

coffee.addEventListener('focusout', function() {
	//get the current date and time 
	var currentdate = new Date();
	var date = currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-" 
			+ currentdate.getDate() + ". "  
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + " - "
   var batchNo = date + coffee.value;
   batch.value = batchNo;
})

var chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
    axisY: { interval: 50, maximum: 550, title: "Bean Temp"},
	axisY2: { interval: 3, minimum: -5, maximum: 15, title: "Rate of Rise"},
    axisX: { intervalType: "seconds", interval: 30, minimum:0, maximum: 540, title: "Time (Seconds)"},
	data: [
		{ axisYIndex: 0, type: "line", axisYYType: "primary", name: "Bean Temp",
		 showInLegend: true, indexLabelFontSize: 12, color: "green", 
			dataPoints: [
				{ y: 50 }
			]
		},
		{ axisYIndex: 1, type: "line", axisYYType: "primary", name: "Air Temp", 
		showInLegend: true, indexLabelFontSize: 12, color: "red", 
		dataPoints: [
			{ y: 100 }
			]
		},
		//data set for Rate of Rise
		{ axisYIndex: 2, type: "spline", axisYType: "secondary", name: "Rate of Rise", 
		showInLegend: true, markerType: "triangle", indexLabelFontSize: 12, color: "black", 
		dataPoints: [
			{ y: 0 }
			]
		}
	]
});
chart.render();

var s = 0  //start the seconds count timer
var rorTimer = 0 //start the rate of rise timer
var FirstCrackAchieved;
var fct = 0 //first crack time timer
startButton.addEventListener("click", function() {
	socket.on('count', (newVal) => {
		s++//add 1 second to timer
		rorTimer++//add one second to rorTimer

		jsonData = JSON.parse(newVal.replace(/'/g,'"'))
		chart.options.data[0].dataPoints.push({ y: parseInt(jsonData.A)});
		chart.options.data[1].dataPoints.push({ y: parseInt(jsonData.B)});
		chart.render();

		var beanTempDiv = document.getElementById('bean-temp')
		var airTempDiv = document.getElementById('air-temp')

		beanTempDiv.innerHTML = jsonData.A;      
		airTempDiv.innerHTML = jsonData.B; 

		var currentDataArrayA = chart.options.data[0].dataPoints;
		var currentDataArrayB = chart.options.data[1].dataPoints;
		
		sessionStorage.setItem("BT",JSON.stringify(currentDataArrayA))
		sessionStorage.setItem("AT",JSON.stringify(currentDataArrayB))

		//rate of rise
		var RoR_el = document.getElementById('ror')

		if(rorTimer == 15) {
			var ft = jsonData.A;
			var st = chart.options.data[0].dataPoints[chart.options.data[0].dataPoints.length - 15].y
			var rise = ft - st;
			var RoR = rise/15
			RoR_el.innerHTML = RoR.toFixed(2);
			// plot the current RoR on the secondary Y axis
			// console.log('ror: ', ft, st, rise, RoR)
			chart.options.data[2].dataPoints.push({ y: parseInt(RoR.toFixed(2)), x:s});
			chart.render();
			// reset the rorTimer
			rorTimer = 0;
		}

		//time from first crack
		if(FirstCrackAchieved == true) {
			fct++;
			var time = SecondsToMinutes(fct)
			var timeStamp = time.minutes + ":" + time.seconds;
			tffc.innerHTML = timeStamp;
			var devTimeRatio = (fct / s).toFixed(2);
			dtr.innerHTML = devTimeRatio;
		}
		
	});
});

stopButton.addEventListener("click", function() {
	socket.off('count');
});

resetButton.addEventListener("click", function() {
	var clear = confirm("You really want to clear the chart?")
	if(clear == true) {
		socket.off('count');
		chart.options.data[0].dataPoints = [];
		chart.options.data[1].dataPoints = [];
		chart.options.data[2].dataPoints = [];
		chart.render();
		yellow.innerHTML = firstCrack.innerHTML = done.innerHTML = '[placeholder]'

	}
});

yellowButton.addEventListener("click", function() {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length -1].y;
	var time = data.length -1;
	var yellowVal = temp + " degrees at " + time + " seconds";
	yellow.innerHTML = yellowVal;
	chart.options.data[0].dataPoints[time].label="yellow";
	chart.options.data[0].dataPoints[time].markerSize=15;
})

firstCrackButton.addEventListener("click", function() {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length -1].y;
	var time = data.length -1;
	var firstCrackVal = temp + " degrees at " + time + " seconds";
	firstCrack.innerHTML = firstCrackVal;
	chart.options.data[0].dataPoints[time].label="first crack";
	chart.options.data[0].dataPoints[time].markerSize=15;
	FirstCrackAchieved = true;
})

doneButton.addEventListener("click", function() {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length -1].y;
	var time = data.length -1;
	var timeStamp = SecondsToMinutes(time);
	var doneVal = temp + " degrees at " + timeStamp.seconds + " seconds (" + timeStamp.minutes + ":" + timeStamp.seconds + ")";
	done.innerHTML = doneVal;
	chart.options.data[0].dataPoints[time].label="done";
	chart.options.data[0].dataPoints[time].markerSize=15;
})

function SecondsToMinutes(time) {
	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;
	return {minutes: minutes, seconds: seconds}
}

print.addEventListener("click", function PrintChart() {
	document.title = batch.value;
	console.log('title,', document.title, 'batch,', batch.value)
	window.print()
})

