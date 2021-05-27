/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/InitialChartData.js":
/*!****************************************!*\
  !*** ./src/client/InitialChartData.js ***!
  \****************************************/
/***/ ((module) => {

<<<<<<< HEAD
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');
var yellowButton = document.getElementById('yellow-button');
var firstCrackButton = document.getElementById('firstcrack-button');
var doneButton = document.getElementById('done-button');
var print = document.getElementById('print');
var save = document.getElementById('save');
var dtr = document.getElementById('dtr');
=======
const InitialChartData = [
    {
        axisYIndex: 0, type: "line", axisYYType: "primary", name: "Bean Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "green",
        dataPoints: [
            { y: 65 }
        ]
    },
    {
        axisYIndex: 1, type: "line", axisYYType: "primary", name: "Air Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "red",
        dataPoints: [
            { y: 65 }
        ]
    },
    //data set for Rate of Rise
    {
        axisYIndex: 2, type: "spline", axisYType: "secondary", name: "Rate of Rise",
        showInLegend: true, markerType: "triangle", indexLabelFontSize: 12, color: "black",
        dataPoints: [
            { y: 0 }
        ]
    }
]

module.exports = InitialChartData

/***/ }),

/***/ "./src/client/RoastControls.js":
/*!*************************************!*\
  !*** ./src/client/RoastControls.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SecondsToMinutes = __webpack_require__(/*! ./SecondsToMinutes */ "./src/client/SecondsToMinutes.js")
>>>>>>> modularizeGrowingCodebase
var yellow = document.getElementById('yellow');
var firstCrack = document.getElementById('firstcrack');
var done = document.getElementById('done');
var batch = document.getElementById('batch');
const socket = io();

const SetBatchNumber = () => {
	//get the current date and time 
	var currentdate = new Date();
	var date = currentdate.getFullYear() + "-"
<<<<<<< HEAD
            + (currentdate.getMonth()+1)  + "-" 
			+ currentdate.getDate() + ". "  
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + " - "
   var batchNo = date + coffee.value;
   batch.value = batchNo;
})
=======
		+ (currentdate.getMonth() + 1) + "-"
		+ currentdate.getDate() + ". "
		+ (currentdate.getHours() - 2) + ":"
		+ currentdate.getMinutes() + " - "
	var batchNo = date + coffee.value;
	batch.value = batchNo;
}
>>>>>>> modularizeGrowingCodebase

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
	var firstCrackVal = temp + " degrees at " + time + " seconds";
	firstCrack.innerHTML = firstCrackVal;
	chart.options.data[0].dataPoints[time].label = "first crack";
	chart.options.data[0].dataPoints[time].markerSize = 15;
}

const MarkDone = (chart) => {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length - 1].y;
	var time = data.length - 1;
	var timeStamp = SecondsToMinutes(time);
	var doneVal = temp + " degrees at " + timeStamp.seconds + " seconds (" + timeStamp.minutes + ":" + timeStamp.seconds + ")";
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
		chart.render();
		yellow.innerHTML = firstCrack.innerHTML = done.innerHTML = '[placeholder]'
	}
}

<<<<<<< HEAD
yellowButton.addEventListener("click", function() {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length -1].y;
	var time = data.length -1;
	var yellowVal = temp + " degrees at " + time + " seconds";
	yellow.innerHTML = yellowVal;
	chart.options.data[0].dataPoints[time].label="yellow";
	chart.options.data[0].dataPoints[time].markerSize=15;
})
=======
module.exports = { SetBatchNumber, StopChart, MarkYellow, MarkFirstCrack, MarkDone, ClearChart }

/***/ }),
>>>>>>> modularizeGrowingCodebase

/***/ "./src/client/SecondsToMinutes.js":
/*!****************************************!*\
  !*** ./src/client/SecondsToMinutes.js ***!
  \****************************************/
/***/ ((module) => {

const SecondsToMinutes = (time) => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return { minutes: minutes, seconds: seconds }
}

<<<<<<< HEAD
print.addEventListener("click", function PrintChart() {
	document.title = batch.value;
	console.log('title,', document.title, 'batch,', batch.value)
	window.print()
})


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQWdEO0FBQzVELFVBQVUsOERBQThEO0FBQ3hFLFlBQVkseUZBQXlGO0FBQ3JHO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qyx5QkFBeUI7QUFDbEUseUNBQXlDLHlCQUF5QjtBQUNsRTs7QUFFQTtBQUNBOztBQUVBLHFDO0FBQ0Esb0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQ0FBa0M7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNvY2tldCA9IGlvKCk7XG5cbnZhciBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bsb3QnKTsgXG5cbnZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idXR0b24nKTtcbnZhciBzdG9wQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3AtYnV0dG9uJyk7XG52YXIgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQtYnV0dG9uJyk7XG52YXIgeWVsbG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llbGxvdy1idXR0b24nKTtcbnZhciBmaXJzdENyYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0Y3JhY2stYnV0dG9uJyk7XG52YXIgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb25lLWJ1dHRvbicpO1xudmFyIHByaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW50Jyk7XG52YXIgc2F2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlJyk7XG52YXIgZHRyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0cicpO1xudmFyIHllbGxvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5ZWxsb3cnKTtcbnZhciBmaXJzdENyYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0Y3JhY2snKTtcbnZhciBkb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvbmUnKTtcbnZhciBjb2ZmZWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29mZmVlJyk7XG52YXIgYmF0Y2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0Y2gnKTtcblxudmFyIEZpcnN0Q3JhY2tBY2hlaXZlZCA9IGZhbHNlXG5cbmNvZmZlZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGZ1bmN0aW9uKCkge1xuXHQvL2dldCB0aGUgY3VycmVudCBkYXRlIGFuZCB0aW1lIFxuXHR2YXIgY3VycmVudGRhdGUgPSBuZXcgRGF0ZSgpO1xuXHR2YXIgZGF0ZSA9IGN1cnJlbnRkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIlxuICAgICAgICAgICAgKyAoY3VycmVudGRhdGUuZ2V0TW9udGgoKSsxKSAgKyBcIi1cIiBcblx0XHRcdCsgY3VycmVudGRhdGUuZ2V0RGF0ZSgpICsgXCIuIFwiICBcbiAgICAgICAgICAgICsgY3VycmVudGRhdGUuZ2V0SG91cnMoKSArIFwiOlwiXG4gICAgICAgICAgICArIGN1cnJlbnRkYXRlLmdldE1pbnV0ZXMoKSArIFwiIC0gXCJcbiAgIHZhciBiYXRjaE5vID0gZGF0ZSArIGNvZmZlZS52YWx1ZTtcbiAgIGJhdGNoLnZhbHVlID0gYmF0Y2hObztcbn0pXG5cbnZhciBjaGFydCA9IG5ldyBDYW52YXNKUy5DaGFydChwbG90LCB7XG5cdGFuaW1hdGlvbkVuYWJsZWQ6IHRydWUsXG5cdHRoZW1lOiBcImxpZ2h0MlwiLFxuICAgIGF4aXNZOiB7IGludGVydmFsOiA1MCwgbWF4aW11bTogNTUwLCB0aXRsZTogXCJCZWFuIFRlbXBcIn0sXG5cdGF4aXNZMjogeyBpbnRlcnZhbDogMywgbWluaW11bTogLTUsIG1heGltdW06IDE1LCB0aXRsZTogXCJSYXRlIG9mIFJpc2VcIn0sXG4gICAgYXhpc1g6IHsgaW50ZXJ2YWxUeXBlOiBcInNlY29uZHNcIiwgaW50ZXJ2YWw6IDMwLCBtaW5pbXVtOjAsIG1heGltdW06IDU0MCwgdGl0bGU6IFwiVGltZSAoU2Vjb25kcylcIn0sXG5cdGRhdGE6IFtcblx0XHR7IGF4aXNZSW5kZXg6IDAsIHR5cGU6IFwibGluZVwiLCBheGlzWVlUeXBlOiBcInByaW1hcnlcIiwgbmFtZTogXCJCZWFuIFRlbXBcIixcblx0XHQgc2hvd0luTGVnZW5kOiB0cnVlLCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBjb2xvcjogXCJncmVlblwiLCBcblx0XHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdFx0eyB5OiA1MCB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7IGF4aXNZSW5kZXg6IDEsIHR5cGU6IFwibGluZVwiLCBheGlzWVlUeXBlOiBcInByaW1hcnlcIiwgbmFtZTogXCJBaXIgVGVtcFwiLCBcblx0XHRzaG93SW5MZWdlbmQ6IHRydWUsIGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGNvbG9yOiBcInJlZFwiLCBcblx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHR7IHk6IDEwMCB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHQvL2RhdGEgc2V0IGZvciBSYXRlIG9mIFJpc2Vcblx0XHR7IGF4aXNZSW5kZXg6IDIsIHR5cGU6IFwic3BsaW5lXCIsIGF4aXNZVHlwZTogXCJzZWNvbmRhcnlcIiwgbmFtZTogXCJSYXRlIG9mIFJpc2VcIiwgXG5cdFx0c2hvd0luTGVnZW5kOiB0cnVlLCBtYXJrZXJUeXBlOiBcInRyaWFuZ2xlXCIsIGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGNvbG9yOiBcImJsYWNrXCIsIFxuXHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdHsgeTogMCB9XG5cdFx0XHRdXG5cdFx0fVxuXHRdXG59KTtcbmNoYXJ0LnJlbmRlcigpO1xuXG52YXIgcyA9IDAgIC8vc3RhcnQgdGhlIHNlY29uZHMgY291bnQgdGltZXJcbnZhciByb3JUaW1lciA9IDAgLy9zdGFydCB0aGUgcmF0ZSBvZiByaXNlIHRpbWVyXG52YXIgRmlyc3RDcmFja0FjaGlldmVkO1xudmFyIGZjdCA9IDAgLy9maXJzdCBjcmFjayB0aW1lIHRpbWVyXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHNvY2tldC5vbignY291bnQnLCAobmV3VmFsKSA9PiB7XG5cdFx0cysrLy9hZGQgMSBzZWNvbmQgdG8gdGltZXJcblx0XHRyb3JUaW1lcisrLy9hZGQgb25lIHNlY29uZCB0byByb3JUaW1lclxuXG5cdFx0anNvbkRhdGEgPSBKU09OLnBhcnNlKG5ld1ZhbC5yZXBsYWNlKC8nL2csJ1wiJykpXG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkEpfSk7XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkIpfSk7XG5cdFx0Y2hhcnQucmVuZGVyKCk7XG5cblx0XHR2YXIgYmVhblRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmVhbi10ZW1wJylcblx0XHR2YXIgYWlyVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItdGVtcCcpXG5cblx0XHRiZWFuVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5BOyAgICAgIFxuXHRcdGFpclRlbXBEaXYuaW5uZXJIVE1MID0ganNvbkRhdGEuQjsgXG5cblx0XHR2YXIgY3VycmVudERhdGFBcnJheUEgPSBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cztcblx0XHR2YXIgY3VycmVudERhdGFBcnJheUIgPSBjaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cztcblx0XHRcblx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiQlRcIixKU09OLnN0cmluZ2lmeShjdXJyZW50RGF0YUFycmF5QSkpXG5cdFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIkFUXCIsSlNPTi5zdHJpbmdpZnkoY3VycmVudERhdGFBcnJheUIpKVxuXG5cdFx0Ly9yYXRlIG9mIHJpc2Vcblx0XHR2YXIgUm9SX2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvcicpXG5cblx0XHRpZihyb3JUaW1lciA9PSAxNSkge1xuXHRcdFx0dmFyIGZ0ID0ganNvbkRhdGEuQTtcblx0XHRcdHZhciBzdCA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW2NoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzLmxlbmd0aCAtIDE1XS55XG5cdFx0XHR2YXIgcmlzZSA9IGZ0IC0gc3Q7XG5cdFx0XHR2YXIgUm9SID0gcmlzZS8xNVxuXHRcdFx0Um9SX2VsLmlubmVySFRNTCA9IFJvUi50b0ZpeGVkKDIpO1xuXHRcdFx0Ly8gcGxvdCB0aGUgY3VycmVudCBSb1Igb24gdGhlIHNlY29uZGFyeSBZIGF4aXNcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdyb3I6ICcsIGZ0LCBzdCwgcmlzZSwgUm9SKVxuXHRcdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzJdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KFJvUi50b0ZpeGVkKDIpKSwgeDpzfSk7XG5cdFx0XHRjaGFydC5yZW5kZXIoKTtcblx0XHRcdC8vIHJlc2V0IHRoZSByb3JUaW1lclxuXHRcdFx0cm9yVGltZXIgPSAwO1xuXHRcdH1cblxuXHRcdC8vdGltZSBmcm9tIGZpcnN0IGNyYWNrXG5cdFx0aWYoRmlyc3RDcmFja0FjaGlldmVkID09IHRydWUpIHtcblx0XHRcdGZjdCsrO1xuXHRcdFx0dmFyIHRpbWUgPSBTZWNvbmRzVG9NaW51dGVzKGZjdClcblx0XHRcdHZhciB0aW1lU3RhbXAgPSB0aW1lLm1pbnV0ZXMgKyBcIjpcIiArIHRpbWUuc2Vjb25kcztcblx0XHRcdHRmZmMuaW5uZXJIVE1MID0gdGltZVN0YW1wO1xuXHRcdFx0dmFyIGRldlRpbWVSYXRpbyA9IChmY3QgLyBzKS50b0ZpeGVkKDIpO1xuXHRcdFx0ZHRyLmlubmVySFRNTCA9IGRldlRpbWVSYXRpbztcblx0XHR9XG5cdFx0XG5cdH0pO1xufSk7XG5cbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHRzb2NrZXQub2ZmKCdjb3VudCcpO1xufSk7XG5cbnJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGNsZWFyID0gY29uZmlybShcIllvdSByZWFsbHkgd2FudCB0byBjbGVhciB0aGUgY2hhcnQ/XCIpXG5cdGlmKGNsZWFyID09IHRydWUpIHtcblx0XHRzb2NrZXQub2ZmKCdjb3VudCcpO1xuXHRcdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzID0gW107XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMgPSBbXTtcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMl0uZGF0YVBvaW50cyA9IFtdO1xuXHRcdGNoYXJ0LnJlbmRlcigpO1xuXHRcdHllbGxvdy5pbm5lckhUTUwgPSBmaXJzdENyYWNrLmlubmVySFRNTCA9IGRvbmUuaW5uZXJIVE1MID0gJ1twbGFjZWhvbGRlcl0nXG5cblx0fVxufSk7XG5cbnllbGxvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQlRcIikpO1xuXHR2YXIgdGVtcCA9IGRhdGFbZGF0YS5sZW5ndGggLTFdLnk7XG5cdHZhciB0aW1lID0gZGF0YS5sZW5ndGggLTE7XG5cdHZhciB5ZWxsb3dWYWwgPSB0ZW1wICsgXCIgZGVncmVlcyBhdCBcIiArIHRpbWUgKyBcIiBzZWNvbmRzXCI7XG5cdHllbGxvdy5pbm5lckhUTUwgPSB5ZWxsb3dWYWw7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLmxhYmVsPVwieWVsbG93XCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemU9MTU7XG59KVxuXG5maXJzdENyYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIGZpcnN0Q3JhY2tWYWwgPSB0ZW1wICsgXCIgZGVncmVlcyBhdCBcIiArIHRpbWUgKyBcIiBzZWNvbmRzXCI7XG5cdGZpcnN0Q3JhY2suaW5uZXJIVE1MID0gZmlyc3RDcmFja1ZhbDtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubGFiZWw9XCJmaXJzdCBjcmFja1wiO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5tYXJrZXJTaXplPTE1O1xuXHRGaXJzdENyYWNrQWNoaWV2ZWQgPSB0cnVlO1xufSlcblxuZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQlRcIikpO1xuXHR2YXIgdGVtcCA9IGRhdGFbZGF0YS5sZW5ndGggLTFdLnk7XG5cdHZhciB0aW1lID0gZGF0YS5sZW5ndGggLTE7XG5cdHZhciB0aW1lU3RhbXAgPSBTZWNvbmRzVG9NaW51dGVzKHRpbWUpO1xuXHR2YXIgZG9uZVZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZVN0YW1wLnNlY29uZHMgKyBcIiBzZWNvbmRzIChcIiArIHRpbWVTdGFtcC5taW51dGVzICsgXCI6XCIgKyB0aW1lU3RhbXAuc2Vjb25kcyArIFwiKVwiO1xuXHRkb25lLmlubmVySFRNTCA9IGRvbmVWYWw7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLmxhYmVsPVwiZG9uZVwiO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5tYXJrZXJTaXplPTE1O1xufSlcblxuZnVuY3Rpb24gU2Vjb25kc1RvTWludXRlcyh0aW1lKSB7XG5cdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuXHR2YXIgc2Vjb25kcyA9IHRpbWUgLSBtaW51dGVzICogNjA7XG5cdHJldHVybiB7bWludXRlczogbWludXRlcywgc2Vjb25kczogc2Vjb25kc31cbn1cblxucHJpbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIFByaW50Q2hhcnQoKSB7XG5cdGRvY3VtZW50LnRpdGxlID0gYmF0Y2gudmFsdWU7XG5cdGNvbnNvbGUubG9nKCd0aXRsZSwnLCBkb2N1bWVudC50aXRsZSwgJ2JhdGNoLCcsIGJhdGNoLnZhbHVlKVxuXHR3aW5kb3cucHJpbnQoKVxufSlcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
=======
module.exports = SecondsToMinutes;

/***/ }),

/***/ "./src/client/StartRoast.js":
/*!**********************************!*\
  !*** ./src/client/StartRoast.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const socket = io();
const SecondsToMinutes = __webpack_require__(/*! ./SecondsToMinutes */ "./src/client/SecondsToMinutes.js")

var dtr = document.getElementById('dtr');
var firstCrackButton = document.getElementById('firstcrack-button');
var RoR_el = document.getElementById('ror')     //rate of rise
var beanTempDiv = document.getElementById('bean-temp')
var airTempDiv = document.getElementById('air-temp')

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

        if (rorTimer == 15) {
            var ft = jsonData.A;
            var st = chart.options.data[0].dataPoints[chart.options.data[0].dataPoints.length - 15].y
            var rise = ft - st;
            var RoR = rise / 15
            RoR_el.innerHTML = RoR.toFixed(2);
            // plot the current RoR on the secondary Y axis
            chart.options.data[2].dataPoints.push({ y: parseInt(RoR.toFixed(2)), x: s });
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
}

module.exports = StartRoast;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
const StartRoast = __webpack_require__(/*! ./StartRoast */ "./src/client/StartRoast.js")
const RoastControls = __webpack_require__(/*! ./RoastControls */ "./src/client/RoastControls.js")
const InitialChartData = __webpack_require__(/*! ./InitialChartData */ "./src/client/InitialChartData.js")

var plot = document.getElementById('plot');
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');
var yellowButton = document.getElementById('yellow-button');
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
doneButton.addEventListener('click', () => { RoastControls.MarkDone(chart) })
startButton.addEventListener("click", () => { StartRoast(chart) })
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9Jbml0aWFsQ2hhcnREYXRhLmpzIiwid2VicGFjazovL3JvYXN0cHJvZmlsZXIvLi9zcmMvY2xpZW50L1JvYXN0Q29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vcm9hc3Rwcm9maWxlci8uL3NyYy9jbGllbnQvU2Vjb25kc1RvTWludXRlcy5qcyIsIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9TdGFydFJvYXN0LmpzIiwid2VicGFjazovL3JvYXN0cHJvZmlsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcm9hc3Rwcm9maWxlci8uL3NyYy9jbGllbnQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxpQzs7Ozs7Ozs7OztBQ3pCQSx5QkFBeUIsbUJBQU8sQ0FBQyw0REFBb0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLDhFOzs7Ozs7Ozs7O0FDbEVsQjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUEsa0M7Ozs7Ozs7Ozs7QUNOQTtBQUNBLHlCQUF5QixtQkFBTyxDQUFDLDREQUFvQjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRCw0QkFBNEI7O0FBRTlFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQywwQkFBMEI7QUFDekUsK0NBQStDLDBCQUEwQjtBQUN6RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxvQ0FBb0M7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDs7QUFFQSw0Qjs7Ozs7O1VDN0RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUNyQkEsbUJBQW1CLG1CQUFPLENBQUMsZ0RBQWM7QUFDekMsc0JBQXNCLG1CQUFPLENBQUMsc0RBQWlCO0FBQy9DLHlCQUF5QixtQkFBTyxDQUFDLDREQUFvQjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsaURBQWlEO0FBQzFELFVBQVUsK0RBQStEO0FBQ3pFLFNBQVMsMkZBQTJGO0FBQ3BHO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBLDRDQUE0QyxpQ0FBaUM7QUFDN0UsNkNBQTZDLGtDQUFrQztBQUMvRSw0Q0FBNEMsMEJBQTBCO0FBQ3RFLDhDQUE4QyxrQ0FBa0M7QUFDaEYsNENBQTRDLGdDQUFnQztBQUM1RSw2Q0FBNkMsb0JBQW9CLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEluaXRpYWxDaGFydERhdGEgPSBbXG4gICAge1xuICAgICAgICBheGlzWUluZGV4OiAwLCB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJwcmltYXJ5XCIsIG5hbWU6IFwiQmVhbiBUZW1wXCIsXG4gICAgICAgIHNob3dJbkxlZ2VuZDogdHJ1ZSwgaW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgY29sb3I6IFwiZ3JlZW5cIixcbiAgICAgICAgZGF0YVBvaW50czogW1xuICAgICAgICAgICAgeyB5OiA2NSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXhpc1lJbmRleDogMSwgdHlwZTogXCJsaW5lXCIsIGF4aXNZWVR5cGU6IFwicHJpbWFyeVwiLCBuYW1lOiBcIkFpciBUZW1wXCIsXG4gICAgICAgIHNob3dJbkxlZ2VuZDogdHJ1ZSwgaW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgY29sb3I6IFwicmVkXCIsXG4gICAgICAgIGRhdGFQb2ludHM6IFtcbiAgICAgICAgICAgIHsgeTogNjUgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICAvL2RhdGEgc2V0IGZvciBSYXRlIG9mIFJpc2VcbiAgICB7XG4gICAgICAgIGF4aXNZSW5kZXg6IDIsIHR5cGU6IFwic3BsaW5lXCIsIGF4aXNZVHlwZTogXCJzZWNvbmRhcnlcIiwgbmFtZTogXCJSYXRlIG9mIFJpc2VcIixcbiAgICAgICAgc2hvd0luTGVnZW5kOiB0cnVlLCBtYXJrZXJUeXBlOiBcInRyaWFuZ2xlXCIsIGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGRhdGFQb2ludHM6IFtcbiAgICAgICAgICAgIHsgeTogMCB9XG4gICAgICAgIF1cbiAgICB9XG5dXG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbENoYXJ0RGF0YSIsImNvbnN0IFNlY29uZHNUb01pbnV0ZXMgPSByZXF1aXJlKCcuL1NlY29uZHNUb01pbnV0ZXMnKVxudmFyIHllbGxvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5ZWxsb3cnKTtcbnZhciBmaXJzdENyYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0Y3JhY2snKTtcbnZhciBkb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvbmUnKTtcbnZhciBiYXRjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXRjaCcpO1xuY29uc3Qgc29ja2V0ID0gaW8oKTtcblxuY29uc3QgU2V0QmF0Y2hOdW1iZXIgPSAoKSA9PiB7XG5cdC8vZ2V0IHRoZSBjdXJyZW50IGRhdGUgYW5kIHRpbWUgXG5cdHZhciBjdXJyZW50ZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdHZhciBkYXRlID0gY3VycmVudGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiXG5cdFx0KyAoY3VycmVudGRhdGUuZ2V0TW9udGgoKSArIDEpICsgXCItXCJcblx0XHQrIGN1cnJlbnRkYXRlLmdldERhdGUoKSArIFwiLiBcIlxuXHRcdCsgKGN1cnJlbnRkYXRlLmdldEhvdXJzKCkgLSAyKSArIFwiOlwiXG5cdFx0KyBjdXJyZW50ZGF0ZS5nZXRNaW51dGVzKCkgKyBcIiAtIFwiXG5cdHZhciBiYXRjaE5vID0gZGF0ZSArIGNvZmZlZS52YWx1ZTtcblx0YmF0Y2gudmFsdWUgPSBiYXRjaE5vO1xufVxuXG5jb25zdCBTdG9wQ2hhcnQgPSAoKSA9PiB7XG5cdHNvY2tldC5vZmYoJ2NvdW50Jyk7XG59XG5cbmNvbnN0IE1hcmtZZWxsb3cgPSAoY2hhcnQpID0+IHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdLnk7XG5cdHZhciB0aW1lID0gZGF0YS5sZW5ndGggLSAxO1xuXHR2YXIgeWVsbG93VmFsID0gdGVtcCArIFwiIGRlZ3JlZXMgYXQgXCIgKyB0aW1lICsgXCIgc2Vjb25kc1wiO1xuXHR5ZWxsb3cuaW5uZXJIVE1MID0geWVsbG93VmFsO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5sYWJlbCA9IFwieWVsbG93XCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemUgPSAxNTtcbn1cblxuY29uc3QgTWFya0ZpcnN0Q3JhY2sgPSAoY2hhcnQpID0+IHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdLnk7XG5cdHZhciB0aW1lID0gZGF0YS5sZW5ndGggLSAxO1xuXHR2YXIgZmlyc3RDcmFja1ZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZSArIFwiIHNlY29uZHNcIjtcblx0Zmlyc3RDcmFjay5pbm5lckhUTUwgPSBmaXJzdENyYWNrVmFsO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5sYWJlbCA9IFwiZmlyc3QgY3JhY2tcIjtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubWFya2VyU2l6ZSA9IDE1O1xufVxuXG5jb25zdCBNYXJrRG9uZSA9IChjaGFydCkgPT4ge1xuXHR2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIkJUXCIpKTtcblx0dmFyIHRlbXAgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtIDE7XG5cdHZhciB0aW1lU3RhbXAgPSBTZWNvbmRzVG9NaW51dGVzKHRpbWUpO1xuXHR2YXIgZG9uZVZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZVN0YW1wLnNlY29uZHMgKyBcIiBzZWNvbmRzIChcIiArIHRpbWVTdGFtcC5taW51dGVzICsgXCI6XCIgKyB0aW1lU3RhbXAuc2Vjb25kcyArIFwiKVwiO1xuXHRkb25lLmlubmVySFRNTCA9IGRvbmVWYWw7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLmxhYmVsID0gXCJkb25lXCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemUgPSAxNTtcbn1cblxuY29uc3QgQ2xlYXJDaGFydCA9IChjaGFydCkgPT4ge1xuXHR2YXIgY2xlYXIgPSBjb25maXJtKFwiWW91IHJlYWxseSB3YW50IHRvIGNsZWFyIHRoZSBjaGFydD9cIilcblx0aWYgKGNsZWFyID09IHRydWUpIHtcblx0XHRzb2NrZXQub2ZmKCdjb3VudCcpO1xuXHRcdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzID0gW107XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMgPSBbXTtcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMl0uZGF0YVBvaW50cyA9IFtdO1xuXHRcdGNoYXJ0LnJlbmRlcigpO1xuXHRcdHllbGxvdy5pbm5lckhUTUwgPSBmaXJzdENyYWNrLmlubmVySFRNTCA9IGRvbmUuaW5uZXJIVE1MID0gJ1twbGFjZWhvbGRlcl0nXG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IFNldEJhdGNoTnVtYmVyLCBTdG9wQ2hhcnQsIE1hcmtZZWxsb3csIE1hcmtGaXJzdENyYWNrLCBNYXJrRG9uZSwgQ2xlYXJDaGFydCB9IiwiY29uc3QgU2Vjb25kc1RvTWludXRlcyA9ICh0aW1lKSA9PiB7XG4gICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XG4gICAgdmFyIHNlY29uZHMgPSB0aW1lIC0gbWludXRlcyAqIDYwO1xuICAgIHJldHVybiB7IG1pbnV0ZXM6IG1pbnV0ZXMsIHNlY29uZHM6IHNlY29uZHMgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlY29uZHNUb01pbnV0ZXM7IiwiY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IFNlY29uZHNUb01pbnV0ZXMgPSByZXF1aXJlKCcuL1NlY29uZHNUb01pbnV0ZXMnKVxuXG52YXIgZHRyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0cicpO1xudmFyIGZpcnN0Q3JhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlyc3RjcmFjay1idXR0b24nKTtcbnZhciBSb1JfZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9yJykgICAgIC8vcmF0ZSBvZiByaXNlXG52YXIgYmVhblRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmVhbi10ZW1wJylcbnZhciBhaXJUZW1wRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci10ZW1wJylcblxudmFyIEZpcnN0Q3JhY2tBY2hpZXZlZCA9IGZhbHNlXG5maXJzdENyYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBGaXJzdENyYWNrQWNoaWV2ZWQgPSB0cnVlIH0pXG5cbmNvbnN0IFN0YXJ0Um9hc3QgPSAoY2hhcnQpID0+IHtcbiAgICB2YXIgcyA9IDAgIC8vc3RhcnQgdGhlIHNlY29uZHMgY291bnQgdGltZXJcbiAgICB2YXIgcm9yVGltZXIgPSAwIC8vc3RhcnQgdGhlIHJhdGUgb2YgcmlzZSB0aW1lclxuICAgIHZhciBmY3QgPSAwIC8vZmlyc3QgY3JhY2sgdGltZSB0aW1lclxuXG4gICAgc29ja2V0Lm9uKCdjb3VudCcsIChuZXdWYWwpID0+IHtcbiAgICAgICAgcysrLy9hZGQgMSBzZWNvbmQgdG8gdGltZXJcbiAgICAgICAgcm9yVGltZXIrKy8vYWRkIG9uZSBzZWNvbmQgdG8gcm9yVGltZXJcblxuICAgICAgICBqc29uRGF0YSA9IEpTT04ucGFyc2UobmV3VmFsLnJlcGxhY2UoLycvZywgJ1wiJykpXG4gICAgICAgIGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzLnB1c2goeyB5OiBwYXJzZUludChqc29uRGF0YS5BKSB9KTtcbiAgICAgICAgY2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkIpIH0pO1xuICAgICAgICBjaGFydC5yZW5kZXIoKTtcblxuICAgICAgICBiZWFuVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5BO1xuICAgICAgICBhaXJUZW1wRGl2LmlubmVySFRNTCA9IGpzb25EYXRhLkI7XG5cbiAgICAgICAgdmFyIGN1cnJlbnREYXRhQXJyYXlBID0gY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHM7XG4gICAgICAgIHZhciBjdXJyZW50RGF0YUFycmF5QiA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVsxXS5kYXRhUG9pbnRzO1xuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJCVFwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50RGF0YUFycmF5QSkpXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJBVFwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50RGF0YUFycmF5QikpXG5cbiAgICAgICAgaWYgKHJvclRpbWVyID09IDE1KSB7XG4gICAgICAgICAgICB2YXIgZnQgPSBqc29uRGF0YS5BO1xuICAgICAgICAgICAgdmFyIHN0ID0gY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMubGVuZ3RoIC0gMTVdLnlcbiAgICAgICAgICAgIHZhciByaXNlID0gZnQgLSBzdDtcbiAgICAgICAgICAgIHZhciBSb1IgPSByaXNlIC8gMTVcbiAgICAgICAgICAgIFJvUl9lbC5pbm5lckhUTUwgPSBSb1IudG9GaXhlZCgyKTtcbiAgICAgICAgICAgIC8vIHBsb3QgdGhlIGN1cnJlbnQgUm9SIG9uIHRoZSBzZWNvbmRhcnkgWSBheGlzXG4gICAgICAgICAgICBjaGFydC5vcHRpb25zLmRhdGFbMl0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoUm9SLnRvRml4ZWQoMikpLCB4OiBzIH0pO1xuICAgICAgICAgICAgY2hhcnQucmVuZGVyKCk7XG4gICAgICAgICAgICAvLyByZXNldCB0aGUgcm9yVGltZXJcbiAgICAgICAgICAgIHJvclRpbWVyID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGltZSBmcm9tIGZpcnN0IGNyYWNrXG4gICAgICAgIGlmIChGaXJzdENyYWNrQWNoaWV2ZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZmN0Kys7XG4gICAgICAgICAgICB2YXIgdGltZSA9IFNlY29uZHNUb01pbnV0ZXMoZmN0KVxuICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IHRpbWUubWludXRlcyArIFwiOlwiICsgdGltZS5zZWNvbmRzO1xuICAgICAgICAgICAgdGZmYy5pbm5lckhUTUwgPSB0aW1lU3RhbXA7XG4gICAgICAgICAgICB2YXIgZGV2VGltZVJhdGlvID0gKGZjdCAvIHMpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICBkdHIuaW5uZXJIVE1MID0gZGV2VGltZVJhdGlvO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGFydFJvYXN0OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgU3RhcnRSb2FzdCA9IHJlcXVpcmUoJy4vU3RhcnRSb2FzdCcpXG5jb25zdCBSb2FzdENvbnRyb2xzID0gcmVxdWlyZSgnLi9Sb2FzdENvbnRyb2xzJylcbmNvbnN0IEluaXRpYWxDaGFydERhdGEgPSByZXF1aXJlKCcuL0luaXRpYWxDaGFydERhdGEnKVxuXG52YXIgcGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbG90Jyk7XG52YXIgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnV0dG9uJyk7XG52YXIgc3RvcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9wLWJ1dHRvbicpO1xudmFyIHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0LWJ1dHRvbicpO1xudmFyIHllbGxvd0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5ZWxsb3ctYnV0dG9uJyk7XG52YXIgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb25lLWJ1dHRvbicpO1xudmFyIGNvZmZlZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2ZmZWUnKTtcblxuXG52YXIgY2hhcnQgPSBuZXcgQ2FudmFzSlMuQ2hhcnQocGxvdCwge1xuXHRhbmltYXRpb25FbmFibGVkOiB0cnVlLFxuXHR0aGVtZTogXCJsaWdodDJcIixcblx0YXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1NTAsIHRpdGxlOiBcIkJlYW4gVGVtcFwiIH0sXG5cdGF4aXNZMjogeyBpbnRlcnZhbDogMywgbWluaW11bTogLTUsIG1heGltdW06IDE1LCB0aXRsZTogXCJSYXRlIG9mIFJpc2VcIiB9LFxuXHRheGlzWDogeyBpbnRlcnZhbFR5cGU6IFwic2Vjb25kc1wiLCBpbnRlcnZhbDogMzAsIG1pbmltdW06IDAsIG1heGltdW06IDU0MCwgdGl0bGU6IFwiVGltZSAoU2Vjb25kcylcIiB9LFxuXHRkYXRhOiBJbml0aWFsQ2hhcnREYXRhXG59KTtcblxuY2hhcnQucmVuZGVyKClcblxuY29mZmVlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgUm9hc3RDb250cm9scy5TZXRCYXRjaE51bWJlcilcbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFJvYXN0Q29udHJvbHMuU3RvcENoYXJ0KGNoYXJ0KSB9KVxucmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFJvYXN0Q29udHJvbHMuQ2xlYXJDaGFydChjaGFydCkgfSlcbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFJvYXN0Q29udHJvbHMuU3RvcENoYXJ0IH0pXG55ZWxsb3dCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFJvYXN0Q29udHJvbHMuTWFya1llbGxvdyhjaGFydCkgfSlcbmRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFJvYXN0Q29udHJvbHMuTWFya0RvbmUoY2hhcnQpIH0pXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBTdGFydFJvYXN0KGNoYXJ0KSB9KSJdLCJzb3VyY2VSb290IjoiIn0=
>>>>>>> modularizeGrowingCodebase
