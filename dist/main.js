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
var yellow = document.getElementById('yellow');
var firstCrack = document.getElementById('firstcrack');
var done = document.getElementById('done');


var chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
    axisY: { interval: 50, maximum: 550, title: "Bean Temp"},
	axisY2: { interval: 3, maximum: 15, title: "Rate of Rise"},
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
			// console.log("ft: ", ft, "st: ", st)
			// console.log("RoR: ", RoR)
			// change the ticker to the current ROR
			RoR_el.innerHTML = RoR.toFixed(2);
			// plot the current RoR on the secondary Y axis
			chart.options.data[2].dataPoints.push({ y: parseInt(RoR.toFixed(2)), x:s});
			chart.render();
			// reset the rorTimer
			rorTimer = 0;
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
	}
});

//if I needed to stop plotting because of a false roaster start, I need to first clear the plot and start over
chart.options.data[0].dataPoints = [];
chart.options.data[1].dataPoints = [];
chart.options.data[2].dataPoints = [];

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
})

doneButton.addEventListener("click", function() {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length -1].y;
	var time = data.length -1;
	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;
	var doneVal = temp + " degrees at " + time + " seconds (" + minutes + ":" + seconds + ")";
	done.innerHTML = doneVal;
	chart.options.data[0].dataPoints[time].label="done";
	chart.options.data[0].dataPoints[time].markerSize=15;
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnREFBZ0Q7QUFDNUQsVUFBVSxpREFBaUQ7QUFDM0QsWUFBWSx5RkFBeUY7QUFDckc7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDLHlCQUF5QjtBQUNsRSx5Q0FBeUMseUJBQXlCO0FBQ2xFOztBQUVBO0FBQ0E7O0FBRUEscUM7QUFDQSxvQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQ0FBa0M7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzb2NrZXQgPSBpbygpO1xuXG52YXIgcGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbG90Jyk7IFxuXG52YXIgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnV0dG9uJyk7XG52YXIgc3RvcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9wLWJ1dHRvbicpO1xudmFyIHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0LWJ1dHRvbicpO1xudmFyIHllbGxvd0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5ZWxsb3ctYnV0dG9uJyk7XG52YXIgZmlyc3RDcmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdGNyYWNrLWJ1dHRvbicpO1xudmFyIGRvbmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9uZS1idXR0b24nKTtcbnZhciB5ZWxsb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneWVsbG93Jyk7XG52YXIgZmlyc3RDcmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdGNyYWNrJyk7XG52YXIgZG9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb25lJyk7XG5cblxudmFyIGNoYXJ0ID0gbmV3IENhbnZhc0pTLkNoYXJ0KHBsb3QsIHtcblx0YW5pbWF0aW9uRW5hYmxlZDogdHJ1ZSxcblx0dGhlbWU6IFwibGlnaHQyXCIsXG4gICAgYXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1NTAsIHRpdGxlOiBcIkJlYW4gVGVtcFwifSxcblx0YXhpc1kyOiB7IGludGVydmFsOiAzLCBtYXhpbXVtOiAxNSwgdGl0bGU6IFwiUmF0ZSBvZiBSaXNlXCJ9LFxuICAgIGF4aXNYOiB7IGludGVydmFsVHlwZTogXCJzZWNvbmRzXCIsIGludGVydmFsOiAzMCwgbWluaW11bTowLCBtYXhpbXVtOiA1NDAsIHRpdGxlOiBcIlRpbWUgKFNlY29uZHMpXCJ9LFxuXHRkYXRhOiBbXG5cdFx0eyBheGlzWUluZGV4OiAwLCB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJwcmltYXJ5XCIsIG5hbWU6IFwiQmVhbiBUZW1wXCIsXG5cdFx0IHNob3dJbkxlZ2VuZDogdHJ1ZSwgaW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgY29sb3I6IFwiZ3JlZW5cIiwgXG5cdFx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHRcdHsgeTogNTAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0eyBheGlzWUluZGV4OiAxLCB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJwcmltYXJ5XCIsIG5hbWU6IFwiQWlyIFRlbXBcIiwgXG5cdFx0c2hvd0luTGVnZW5kOiB0cnVlLCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBjb2xvcjogXCJyZWRcIiwgXG5cdFx0ZGF0YVBvaW50czogW1xuXHRcdFx0eyB5OiAxMDAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0Ly9kYXRhIHNldCBmb3IgUmF0ZSBvZiBSaXNlXG5cdFx0eyBheGlzWUluZGV4OiAyLCB0eXBlOiBcInNwbGluZVwiLCBheGlzWVR5cGU6IFwic2Vjb25kYXJ5XCIsIG5hbWU6IFwiUmF0ZSBvZiBSaXNlXCIsIFxuXHRcdHNob3dJbkxlZ2VuZDogdHJ1ZSwgbWFya2VyVHlwZTogXCJ0cmlhbmdsZVwiLCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBjb2xvcjogXCJibGFja1wiLCBcblx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHR7IHk6IDAgfVxuXHRcdFx0XVxuXHRcdH1cblx0XVxufSk7XG5jaGFydC5yZW5kZXIoKTtcblxudmFyIHMgPSAwICAvL3N0YXJ0IHRoZSBzZWNvbmRzIGNvdW50IHRpbWVyXG52YXIgcm9yVGltZXIgPSAwIC8vc3RhcnQgdGhlIHJhdGUgb2YgcmlzZSB0aW1lclxuXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHNvY2tldC5vbignY291bnQnLCAobmV3VmFsKSA9PiB7XG5cdFx0cysrLy9hZGQgMSBzZWNvbmQgdG8gdGltZXJcblx0XHRyb3JUaW1lcisrLy9hZGQgb25lIHNlY29uZCB0byByb3JUaW1lclxuXG5cdFx0anNvbkRhdGEgPSBKU09OLnBhcnNlKG5ld1ZhbC5yZXBsYWNlKC8nL2csJ1wiJykpXG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkEpfSk7XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkIpfSk7XG5cdFx0Y2hhcnQucmVuZGVyKCk7XG5cblx0XHR2YXIgYmVhblRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmVhbi10ZW1wJylcblx0XHR2YXIgYWlyVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItdGVtcCcpXG5cblx0XHRiZWFuVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5BOyAgICAgIFxuXHRcdGFpclRlbXBEaXYuaW5uZXJIVE1MID0ganNvbkRhdGEuQjsgXG5cblx0XHR2YXIgY3VycmVudERhdGFBcnJheUEgPSBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cztcblx0XHR2YXIgY3VycmVudERhdGFBcnJheUIgPSBjaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cztcblx0XHRcblx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiQlRcIixKU09OLnN0cmluZ2lmeShjdXJyZW50RGF0YUFycmF5QSkpXG5cdFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIkFUXCIsSlNPTi5zdHJpbmdpZnkoY3VycmVudERhdGFBcnJheUIpKVxuXG5cdFx0Ly9yYXRlIG9mIHJpc2Vcblx0XHR2YXIgUm9SX2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvcicpXG5cblx0XHRpZihyb3JUaW1lciA9PSAxNSkge1xuXHRcdFx0dmFyIGZ0ID0ganNvbkRhdGEuQTtcblx0XHRcdHZhciBzdCA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW2NoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzLmxlbmd0aCAtIDE1XS55XG5cdFx0XHR2YXIgcmlzZSA9IGZ0IC0gc3Q7XG5cdFx0XHR2YXIgUm9SID0gcmlzZS8xNVxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJmdDogXCIsIGZ0LCBcInN0OiBcIiwgc3QpXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIlJvUjogXCIsIFJvUilcblx0XHRcdC8vIGNoYW5nZSB0aGUgdGlja2VyIHRvIHRoZSBjdXJyZW50IFJPUlxuXHRcdFx0Um9SX2VsLmlubmVySFRNTCA9IFJvUi50b0ZpeGVkKDIpO1xuXHRcdFx0Ly8gcGxvdCB0aGUgY3VycmVudCBSb1Igb24gdGhlIHNlY29uZGFyeSBZIGF4aXNcblx0XHRcdGNoYXJ0Lm9wdGlvbnMuZGF0YVsyXS5kYXRhUG9pbnRzLnB1c2goeyB5OiBwYXJzZUludChSb1IudG9GaXhlZCgyKSksIHg6c30pO1xuXHRcdFx0Y2hhcnQucmVuZGVyKCk7XG5cdFx0XHQvLyByZXNldCB0aGUgcm9yVGltZXJcblx0XHRcdHJvclRpbWVyID0gMDtcblx0XHR9XG5cdH0pO1xufSk7XG5cbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHRzb2NrZXQub2ZmKCdjb3VudCcpO1xufSk7XG5cbnJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGNsZWFyID0gY29uZmlybShcIllvdSByZWFsbHkgd2FudCB0byBjbGVhciB0aGUgY2hhcnQ/XCIpXG5cdGlmKGNsZWFyID09IHRydWUpIHtcblx0XHRzb2NrZXQub2ZmKCdjb3VudCcpO1xuXHRcdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzID0gW107XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMgPSBbXTtcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMl0uZGF0YVBvaW50cyA9IFtdO1xuXHRcdGNoYXJ0LnJlbmRlcigpO1xuXHR9XG59KTtcblxuLy9pZiBJIG5lZWRlZCB0byBzdG9wIHBsb3R0aW5nIGJlY2F1c2Ugb2YgYSBmYWxzZSByb2FzdGVyIHN0YXJ0LCBJIG5lZWQgdG8gZmlyc3QgY2xlYXIgdGhlIHBsb3QgYW5kIHN0YXJ0IG92ZXJcbmNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzID0gW107XG5jaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cyA9IFtdO1xuY2hhcnQub3B0aW9ucy5kYXRhWzJdLmRhdGFQb2ludHMgPSBbXTtcblxueWVsbG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIHllbGxvd1ZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZSArIFwiIHNlY29uZHNcIjtcblx0eWVsbG93LmlubmVySFRNTCA9IHllbGxvd1ZhbDtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubGFiZWw9XCJ5ZWxsb3dcIjtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubWFya2VyU2l6ZT0xNTtcbn0pXG5cbmZpcnN0Q3JhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIkJUXCIpKTtcblx0dmFyIHRlbXAgPSBkYXRhW2RhdGEubGVuZ3RoIC0xXS55O1xuXHR2YXIgdGltZSA9IGRhdGEubGVuZ3RoIC0xO1xuXHR2YXIgZmlyc3RDcmFja1ZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZSArIFwiIHNlY29uZHNcIjtcblx0Zmlyc3RDcmFjay5pbm5lckhUTUwgPSBmaXJzdENyYWNrVmFsO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5sYWJlbD1cImZpcnN0IGNyYWNrXCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemU9MTU7XG59KVxuXG5kb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XG5cdHZhciBzZWNvbmRzID0gdGltZSAtIG1pbnV0ZXMgKiA2MDtcblx0dmFyIGRvbmVWYWwgPSB0ZW1wICsgXCIgZGVncmVlcyBhdCBcIiArIHRpbWUgKyBcIiBzZWNvbmRzIChcIiArIG1pbnV0ZXMgKyBcIjpcIiArIHNlY29uZHMgKyBcIilcIjtcblx0ZG9uZS5pbm5lckhUTUwgPSBkb25lVmFsO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5sYWJlbD1cImRvbmVcIjtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubWFya2VyU2l6ZT0xNTtcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==