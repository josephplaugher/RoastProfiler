/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
const socket = io();

var plot = document.getElementById('plot'); 

var chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
    axisY: { interval: 50, maximum: 500, title: "Bean Temp"},
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

var yellowButton = document.getElementById('yellow-button');
var firstCrackButton = document.getElementById('firstcrack-button');
var yellow = document.getElementById('yellow');
var firstCrack = document.getElementById('firstcrack');


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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQWdEO0FBQzVELFVBQVUsaURBQWlEO0FBQzNELFlBQVkseUZBQXlGO0FBQ3JHO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyx5QkFBeUI7QUFDcEUsd0NBQXdDLHlCQUF5QjtBQUNqRTs7QUFFQTtBQUNBOztBQUVBLHVDO0FBQ0EsbUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsa0NBQWtDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc29ja2V0ID0gaW8oKTtcblxudmFyIHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxvdCcpOyBcblxudmFyIGNoYXJ0ID0gbmV3IENhbnZhc0pTLkNoYXJ0KHBsb3QsIHtcblx0YW5pbWF0aW9uRW5hYmxlZDogdHJ1ZSxcblx0dGhlbWU6IFwibGlnaHQyXCIsXG4gICAgYXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1MDAsIHRpdGxlOiBcIkJlYW4gVGVtcFwifSxcblx0YXhpc1kyOiB7IGludGVydmFsOiAzLCBtYXhpbXVtOiAxNSwgdGl0bGU6IFwiUmF0ZSBvZiBSaXNlXCJ9LFxuICAgIGF4aXNYOiB7IGludGVydmFsVHlwZTogXCJzZWNvbmRzXCIsIGludGVydmFsOiAzMCwgbWluaW11bTowLCBtYXhpbXVtOiA1NDAsIHRpdGxlOiBcIlRpbWUgKFNlY29uZHMpXCJ9LFxuXHRkYXRhOiBbXG5cdFx0eyBheGlzWUluZGV4OiAwLCB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJwcmltYXJ5XCIsIG5hbWU6IFwiQmVhbiBUZW1wXCIsXG5cdFx0IHNob3dJbkxlZ2VuZDogdHJ1ZSwgaW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgY29sb3I6IFwiZ3JlZW5cIiwgXG5cdFx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHRcdHsgeTogNTAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0eyBheGlzWUluZGV4OiAxLCB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJwcmltYXJ5XCIsIG5hbWU6IFwiQWlyIFRlbXBcIiwgXG5cdFx0c2hvd0luTGVnZW5kOiB0cnVlLCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBjb2xvcjogXCJyZWRcIiwgXG5cdFx0ZGF0YVBvaW50czogW1xuXHRcdFx0eyB5OiAxMDAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0Ly9kYXRhIHNldCBmb3IgUmF0ZSBvZiBSaXNlXG5cdFx0eyBheGlzWUluZGV4OiAyLCB0eXBlOiBcInNwbGluZVwiLCBheGlzWVR5cGU6IFwic2Vjb25kYXJ5XCIsIG5hbWU6IFwiUmF0ZSBvZiBSaXNlXCIsIFxuXHRcdHNob3dJbkxlZ2VuZDogdHJ1ZSwgbWFya2VyVHlwZTogXCJ0cmlhbmdsZVwiLCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBjb2xvcjogXCJibGFja1wiLCBcblx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHR7IHk6IDAgfVxuXHRcdFx0XVxuXHRcdH1cblx0XVxufSk7XG5jaGFydC5yZW5kZXIoKTtcblxudmFyIHMgPSAwICAvL3N0YXJ0IHRoZSBzZWNvbmRzIGNvdW50IHRpbWVyXG52YXIgcm9yVGltZXIgPSAwIC8vc3RhcnQgdGhlIHJhdGUgb2YgcmlzZSB0aW1lclxuc29ja2V0Lm9uKCdjb3VudCcsIChuZXdWYWwpID0+IHtcblx0cysrLy9hZGQgMSBzZWNvbmQgdG8gdGltZXJcblx0cm9yVGltZXIrKy8vYWRkIG9uZSBzZWNvbmQgdG8gcm9yVGltZXJcblxuXHRqc29uRGF0YSA9IEpTT04ucGFyc2UobmV3VmFsLnJlcGxhY2UoLycvZywnXCInKSlcbiAgICBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoanNvbkRhdGEuQSl9KTtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkIpfSk7XG5cdGNoYXJ0LnJlbmRlcigpO1xuXG5cdHZhciBiZWFuVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZWFuLXRlbXAnKVxuXHR2YXIgYWlyVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItdGVtcCcpXG5cbiAgICBiZWFuVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5BOyAgICAgIFxuXHRhaXJUZW1wRGl2LmlubmVySFRNTCA9IGpzb25EYXRhLkI7IFxuXG5cdHZhciBjdXJyZW50RGF0YUFycmF5QSA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzO1xuXHR2YXIgY3VycmVudERhdGFBcnJheUIgPSBjaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cztcblx0XG5cdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJCVFwiLEpTT04uc3RyaW5naWZ5KGN1cnJlbnREYXRhQXJyYXlBKSlcblx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIkFUXCIsSlNPTi5zdHJpbmdpZnkoY3VycmVudERhdGFBcnJheUIpKVxuXG5cdC8vcmF0ZSBvZiByaXNlXG5cdHZhciBSb1JfZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9yJylcblxuXHRpZihyb3JUaW1lciA9PSAxNSkge1xuXHRcdHZhciBmdCA9IGpzb25EYXRhLkE7XG5cdFx0dmFyIHN0ID0gY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMubGVuZ3RoIC0gMTVdLnlcblx0XHR2YXIgcmlzZSA9IGZ0IC0gc3Q7XG5cdFx0dmFyIFJvUiA9IHJpc2UvMTVcblx0XHQvLyBjb25zb2xlLmxvZyhcImZ0OiBcIiwgZnQsIFwic3Q6IFwiLCBzdClcblx0XHQvLyBjb25zb2xlLmxvZyhcIlJvUjogXCIsIFJvUilcblx0XHQvLyBjaGFuZ2UgdGhlIHRpY2tlciB0byB0aGUgY3VycmVudCBST1Jcblx0XHRSb1JfZWwuaW5uZXJIVE1MID0gUm9SLnRvRml4ZWQoMik7XG5cdFx0Ly8gcGxvdCB0aGUgY3VycmVudCBSb1Igb24gdGhlIHNlY29uZGFyeSBZIGF4aXNcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMl0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoUm9SLnRvRml4ZWQoMikpLCB4OnN9KTtcblx0XHRjaGFydC5yZW5kZXIoKTtcblx0XHQvLyByZXNldCB0aGUgcm9yVGltZXJcblx0XHRyb3JUaW1lciA9IDA7XG5cdH1cbn0pO1xuXG52YXIgeWVsbG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llbGxvdy1idXR0b24nKTtcbnZhciBmaXJzdENyYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0Y3JhY2stYnV0dG9uJyk7XG52YXIgeWVsbG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llbGxvdycpO1xudmFyIGZpcnN0Q3JhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlyc3RjcmFjaycpO1xuXG5cbnllbGxvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQlRcIikpO1xuXHR2YXIgdGVtcCA9IGRhdGFbZGF0YS5sZW5ndGggLTFdLnk7XG5cdHZhciB0aW1lID0gZGF0YS5sZW5ndGggLTE7XG5cdHZhciB5ZWxsb3dWYWwgPSB0ZW1wICsgXCIgZGVncmVlcyBhdCBcIiArIHRpbWUgKyBcIiBzZWNvbmRzXCI7XG5cdHllbGxvdy5pbm5lckhUTUwgPSB5ZWxsb3dWYWw7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLmxhYmVsPVwieWVsbG93XCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemU9MTU7XG59KVxuXG5maXJzdENyYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIGZpcnN0Q3JhY2tWYWwgPSB0ZW1wICsgXCIgZGVncmVlcyBhdCBcIiArIHRpbWUgKyBcIiBzZWNvbmRzXCI7XG5cdGZpcnN0Q3JhY2suaW5uZXJIVE1MID0gZmlyc3RDcmFja1ZhbDtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubGFiZWw9XCJmaXJzdCBjcmFja1wiO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5tYXJrZXJTaXplPTE1O1xufSkiXSwic291cmNlUm9vdCI6IiJ9