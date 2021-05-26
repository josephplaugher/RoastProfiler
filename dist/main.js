/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQWdEO0FBQzVELFVBQVUsOERBQThEO0FBQ3hFLFlBQVkseUZBQXlGO0FBQ3JHO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qyx5QkFBeUI7QUFDbEUseUNBQXlDLHlCQUF5QjtBQUNsRTs7QUFFQTtBQUNBOztBQUVBLHFDO0FBQ0Esb0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQ0FBa0M7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNvY2tldCA9IGlvKCk7XG5cbnZhciBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bsb3QnKTsgXG5cbnZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idXR0b24nKTtcbnZhciBzdG9wQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3AtYnV0dG9uJyk7XG52YXIgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQtYnV0dG9uJyk7XG52YXIgeWVsbG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llbGxvdy1idXR0b24nKTtcbnZhciBmaXJzdENyYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0Y3JhY2stYnV0dG9uJyk7XG52YXIgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb25lLWJ1dHRvbicpO1xudmFyIHByaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW50Jyk7XG52YXIgc2F2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlJyk7XG52YXIgZHRyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0cicpO1xudmFyIHllbGxvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5ZWxsb3cnKTtcbnZhciBmaXJzdENyYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0Y3JhY2snKTtcbnZhciBkb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvbmUnKTtcbnZhciBjb2ZmZWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29mZmVlJyk7XG52YXIgYmF0Y2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0Y2gnKTtcblxudmFyIEZpcnN0Q3JhY2tBY2hlaXZlZCA9IGZhbHNlXG5cbmNvZmZlZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGZ1bmN0aW9uKCkge1xuXHQvL2dldCB0aGUgY3VycmVudCBkYXRlIGFuZCB0aW1lIFxuXHR2YXIgY3VycmVudGRhdGUgPSBuZXcgRGF0ZSgpO1xuXHR2YXIgZGF0ZSA9IGN1cnJlbnRkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIlxuICAgICAgICAgICAgKyAoY3VycmVudGRhdGUuZ2V0TW9udGgoKSsxKSAgKyBcIi1cIiBcblx0XHRcdCsgY3VycmVudGRhdGUuZ2V0RGF0ZSgpICsgXCIuIFwiICBcbiAgICAgICAgICAgICsgY3VycmVudGRhdGUuZ2V0SG91cnMoKSArIFwiOlwiXG4gICAgICAgICAgICArIGN1cnJlbnRkYXRlLmdldE1pbnV0ZXMoKSArIFwiIC0gXCJcbiAgIHZhciBiYXRjaE5vID0gZGF0ZSArIGNvZmZlZS52YWx1ZTtcbiAgIGJhdGNoLnZhbHVlID0gYmF0Y2hObztcbn0pXG5cbnZhciBjaGFydCA9IG5ldyBDYW52YXNKUy5DaGFydChwbG90LCB7XG5cdGFuaW1hdGlvbkVuYWJsZWQ6IHRydWUsXG5cdHRoZW1lOiBcImxpZ2h0MlwiLFxuICAgIGF4aXNZOiB7IGludGVydmFsOiA1MCwgbWF4aW11bTogNTUwLCB0aXRsZTogXCJCZWFuIFRlbXBcIn0sXG5cdGF4aXNZMjogeyBpbnRlcnZhbDogMywgbWluaW11bTogLTUsIG1heGltdW06IDE1LCB0aXRsZTogXCJSYXRlIG9mIFJpc2VcIn0sXG4gICAgYXhpc1g6IHsgaW50ZXJ2YWxUeXBlOiBcInNlY29uZHNcIiwgaW50ZXJ2YWw6IDMwLCBtaW5pbXVtOjAsIG1heGltdW06IDU0MCwgdGl0bGU6IFwiVGltZSAoU2Vjb25kcylcIn0sXG5cdGRhdGE6IFtcblx0XHR7IGF4aXNZSW5kZXg6IDAsIHR5cGU6IFwibGluZVwiLCBheGlzWVlUeXBlOiBcInByaW1hcnlcIiwgbmFtZTogXCJCZWFuIFRlbXBcIixcblx0XHQgc2hvd0luTGVnZW5kOiB0cnVlLCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBjb2xvcjogXCJncmVlblwiLCBcblx0XHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdFx0eyB5OiA1MCB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7IGF4aXNZSW5kZXg6IDEsIHR5cGU6IFwibGluZVwiLCBheGlzWVlUeXBlOiBcInByaW1hcnlcIiwgbmFtZTogXCJBaXIgVGVtcFwiLCBcblx0XHRzaG93SW5MZWdlbmQ6IHRydWUsIGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGNvbG9yOiBcInJlZFwiLCBcblx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHR7IHk6IDEwMCB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHQvL2RhdGEgc2V0IGZvciBSYXRlIG9mIFJpc2Vcblx0XHR7IGF4aXNZSW5kZXg6IDIsIHR5cGU6IFwic3BsaW5lXCIsIGF4aXNZVHlwZTogXCJzZWNvbmRhcnlcIiwgbmFtZTogXCJSYXRlIG9mIFJpc2VcIiwgXG5cdFx0c2hvd0luTGVnZW5kOiB0cnVlLCBtYXJrZXJUeXBlOiBcInRyaWFuZ2xlXCIsIGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGNvbG9yOiBcImJsYWNrXCIsIFxuXHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdHsgeTogMCB9XG5cdFx0XHRdXG5cdFx0fVxuXHRdXG59KTtcbmNoYXJ0LnJlbmRlcigpO1xuXG52YXIgcyA9IDAgIC8vc3RhcnQgdGhlIHNlY29uZHMgY291bnQgdGltZXJcbnZhciByb3JUaW1lciA9IDAgLy9zdGFydCB0aGUgcmF0ZSBvZiByaXNlIHRpbWVyXG52YXIgRmlyc3RDcmFja0FjaGlldmVkO1xudmFyIGZjdCA9IDAgLy9maXJzdCBjcmFjayB0aW1lIHRpbWVyXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHNvY2tldC5vbignY291bnQnLCAobmV3VmFsKSA9PiB7XG5cdFx0cysrLy9hZGQgMSBzZWNvbmQgdG8gdGltZXJcblx0XHRyb3JUaW1lcisrLy9hZGQgb25lIHNlY29uZCB0byByb3JUaW1lclxuXG5cdFx0anNvbkRhdGEgPSBKU09OLnBhcnNlKG5ld1ZhbC5yZXBsYWNlKC8nL2csJ1wiJykpXG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkEpfSk7XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkIpfSk7XG5cdFx0Y2hhcnQucmVuZGVyKCk7XG5cblx0XHR2YXIgYmVhblRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmVhbi10ZW1wJylcblx0XHR2YXIgYWlyVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItdGVtcCcpXG5cblx0XHRiZWFuVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5BOyAgICAgIFxuXHRcdGFpclRlbXBEaXYuaW5uZXJIVE1MID0ganNvbkRhdGEuQjsgXG5cblx0XHR2YXIgY3VycmVudERhdGFBcnJheUEgPSBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cztcblx0XHR2YXIgY3VycmVudERhdGFBcnJheUIgPSBjaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cztcblx0XHRcblx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiQlRcIixKU09OLnN0cmluZ2lmeShjdXJyZW50RGF0YUFycmF5QSkpXG5cdFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIkFUXCIsSlNPTi5zdHJpbmdpZnkoY3VycmVudERhdGFBcnJheUIpKVxuXG5cdFx0Ly9yYXRlIG9mIHJpc2Vcblx0XHR2YXIgUm9SX2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvcicpXG5cblx0XHRpZihyb3JUaW1lciA9PSAxNSkge1xuXHRcdFx0dmFyIGZ0ID0ganNvbkRhdGEuQTtcblx0XHRcdHZhciBzdCA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW2NoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzLmxlbmd0aCAtIDE1XS55XG5cdFx0XHR2YXIgcmlzZSA9IGZ0IC0gc3Q7XG5cdFx0XHR2YXIgUm9SID0gcmlzZS8xNVxuXHRcdFx0Um9SX2VsLmlubmVySFRNTCA9IFJvUi50b0ZpeGVkKDIpO1xuXHRcdFx0Ly8gcGxvdCB0aGUgY3VycmVudCBSb1Igb24gdGhlIHNlY29uZGFyeSBZIGF4aXNcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdyb3I6ICcsIGZ0LCBzdCwgcmlzZSwgUm9SKVxuXHRcdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzJdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KFJvUi50b0ZpeGVkKDIpKSwgeDpzfSk7XG5cdFx0XHRjaGFydC5yZW5kZXIoKTtcblx0XHRcdC8vIHJlc2V0IHRoZSByb3JUaW1lclxuXHRcdFx0cm9yVGltZXIgPSAwO1xuXHRcdH1cblxuXHRcdC8vdGltZSBmcm9tIGZpcnN0IGNyYWNrXG5cdFx0aWYoRmlyc3RDcmFja0FjaGlldmVkID09IHRydWUpIHtcblx0XHRcdGZjdCsrO1xuXHRcdFx0dmFyIHRpbWUgPSBTZWNvbmRzVG9NaW51dGVzKGZjdClcblx0XHRcdHZhciB0aW1lU3RhbXAgPSB0aW1lLm1pbnV0ZXMgKyBcIjpcIiArIHRpbWUuc2Vjb25kcztcblx0XHRcdHRmZmMuaW5uZXJIVE1MID0gdGltZVN0YW1wO1xuXHRcdFx0dmFyIGRldlRpbWVSYXRpbyA9IChmY3QgLyBzKS50b0ZpeGVkKDIpO1xuXHRcdFx0ZHRyLmlubmVySFRNTCA9IGRldlRpbWVSYXRpbztcblx0XHR9XG5cdFx0XG5cdH0pO1xufSk7XG5cbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHRzb2NrZXQub2ZmKCdjb3VudCcpO1xufSk7XG5cbnJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGNsZWFyID0gY29uZmlybShcIllvdSByZWFsbHkgd2FudCB0byBjbGVhciB0aGUgY2hhcnQ/XCIpXG5cdGlmKGNsZWFyID09IHRydWUpIHtcblx0XHRzb2NrZXQub2ZmKCdjb3VudCcpO1xuXHRcdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzID0gW107XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMgPSBbXTtcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMl0uZGF0YVBvaW50cyA9IFtdO1xuXHRcdGNoYXJ0LnJlbmRlcigpO1xuXHRcdHllbGxvdy5pbm5lckhUTUwgPSBmaXJzdENyYWNrLmlubmVySFRNTCA9IGRvbmUuaW5uZXJIVE1MID0gJ1twbGFjZWhvbGRlcl0nXG5cblx0fVxufSk7XG5cbnllbGxvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQlRcIikpO1xuXHR2YXIgdGVtcCA9IGRhdGFbZGF0YS5sZW5ndGggLTFdLnk7XG5cdHZhciB0aW1lID0gZGF0YS5sZW5ndGggLTE7XG5cdHZhciB5ZWxsb3dWYWwgPSB0ZW1wICsgXCIgZGVncmVlcyBhdCBcIiArIHRpbWUgKyBcIiBzZWNvbmRzXCI7XG5cdHllbGxvdy5pbm5lckhUTUwgPSB5ZWxsb3dWYWw7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLmxhYmVsPVwieWVsbG93XCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemU9MTU7XG59KVxuXG5maXJzdENyYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIGZpcnN0Q3JhY2tWYWwgPSB0ZW1wICsgXCIgZGVncmVlcyBhdCBcIiArIHRpbWUgKyBcIiBzZWNvbmRzXCI7XG5cdGZpcnN0Q3JhY2suaW5uZXJIVE1MID0gZmlyc3RDcmFja1ZhbDtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubGFiZWw9XCJmaXJzdCBjcmFja1wiO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5tYXJrZXJTaXplPTE1O1xuXHRGaXJzdENyYWNrQWNoaWV2ZWQgPSB0cnVlO1xufSlcblxuZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQlRcIikpO1xuXHR2YXIgdGVtcCA9IGRhdGFbZGF0YS5sZW5ndGggLTFdLnk7XG5cdHZhciB0aW1lID0gZGF0YS5sZW5ndGggLTE7XG5cdHZhciB0aW1lU3RhbXAgPSBTZWNvbmRzVG9NaW51dGVzKHRpbWUpO1xuXHR2YXIgZG9uZVZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZVN0YW1wLnNlY29uZHMgKyBcIiBzZWNvbmRzIChcIiArIHRpbWVTdGFtcC5taW51dGVzICsgXCI6XCIgKyB0aW1lU3RhbXAuc2Vjb25kcyArIFwiKVwiO1xuXHRkb25lLmlubmVySFRNTCA9IGRvbmVWYWw7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLmxhYmVsPVwiZG9uZVwiO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5tYXJrZXJTaXplPTE1O1xufSlcblxuZnVuY3Rpb24gU2Vjb25kc1RvTWludXRlcyh0aW1lKSB7XG5cdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuXHR2YXIgc2Vjb25kcyA9IHRpbWUgLSBtaW51dGVzICogNjA7XG5cdHJldHVybiB7bWludXRlczogbWludXRlcywgc2Vjb25kczogc2Vjb25kc31cbn1cblxucHJpbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIFByaW50Q2hhcnQoKSB7XG5cdGRvY3VtZW50LnRpdGxlID0gYmF0Y2gudmFsdWU7XG5cdGNvbnNvbGUubG9nKCd0aXRsZSwnLCBkb2N1bWVudC50aXRsZSwgJ2JhdGNoLCcsIGJhdGNoLnZhbHVlKVxuXHR3aW5kb3cucHJpbnQoKVxufSlcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==