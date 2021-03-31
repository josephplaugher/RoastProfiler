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
    axisX: { intervalType: "seconds", interval: 30, minimum:0, maximum: 540, title: "Time (Seconds)"},
	data: [
		{ type: "line", axisYYType: "primary", name: "Bean Temp",
		 indexLabelFontSize: 12, lineColor: "green", 
			dataPoints: [
				{ y: 50 }
			]
		},
		{ type: "line", axisYYType: "secondary", name: "Air Temp", 
		indexLabelFontSize: 12, lineColor: "red", 
		dataPoints: [
			{ y: 100 }
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
		RoR_el.innerHTML = RoR.toFixed(2);
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
})

firstCrackButton.addEventListener("click", function() {
	var data = JSON.parse(sessionStorage.getItem("BT"));
	var temp = data[data.length -1].y;
	var time = data.length -1;
	var firstCrackVal = temp + " degrees at " + time + " seconds";
	firstCrack.innerHTML = firstCrackVal;
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQWdEO0FBQzVELFlBQVkseUZBQXlGO0FBQ3JHO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMseUJBQXlCO0FBQ3BFLHdDQUF3Qyx5QkFBeUI7QUFDakU7O0FBRUE7QUFDQTs7QUFFQSx1QztBQUNBLG1DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc29ja2V0ID0gaW8oKTtcblxudmFyIHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxvdCcpOyBcblxudmFyIGNoYXJ0ID0gbmV3IENhbnZhc0pTLkNoYXJ0KHBsb3QsIHtcblx0YW5pbWF0aW9uRW5hYmxlZDogdHJ1ZSxcblx0dGhlbWU6IFwibGlnaHQyXCIsXG4gICAgYXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1MDAsIHRpdGxlOiBcIkJlYW4gVGVtcFwifSxcbiAgICBheGlzWDogeyBpbnRlcnZhbFR5cGU6IFwic2Vjb25kc1wiLCBpbnRlcnZhbDogMzAsIG1pbmltdW06MCwgbWF4aW11bTogNTQwLCB0aXRsZTogXCJUaW1lIChTZWNvbmRzKVwifSxcblx0ZGF0YTogW1xuXHRcdHsgdHlwZTogXCJsaW5lXCIsIGF4aXNZWVR5cGU6IFwicHJpbWFyeVwiLCBuYW1lOiBcIkJlYW4gVGVtcFwiLFxuXHRcdCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBsaW5lQ29sb3I6IFwiZ3JlZW5cIiwgXG5cdFx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHRcdHsgeTogNTAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0eyB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJzZWNvbmRhcnlcIiwgbmFtZTogXCJBaXIgVGVtcFwiLCBcblx0XHRpbmRleExhYmVsRm9udFNpemU6IDEyLCBsaW5lQ29sb3I6IFwicmVkXCIsIFxuXHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdHsgeTogMTAwIH1cblx0XHRcdF1cblx0XHR9XG5cdF1cbn0pO1xuY2hhcnQucmVuZGVyKCk7XG5cbnZhciBzID0gMCAgLy9zdGFydCB0aGUgc2Vjb25kcyBjb3VudCB0aW1lclxudmFyIHJvclRpbWVyID0gMCAvL3N0YXJ0IHRoZSByYXRlIG9mIHJpc2UgdGltZXJcbnNvY2tldC5vbignY291bnQnLCAobmV3VmFsKSA9PiB7XG5cdHMrKy8vYWRkIDEgc2Vjb25kIHRvIHRpbWVyXG5cdHJvclRpbWVyKysvL2FkZCBvbmUgc2Vjb25kIHRvIHJvclRpbWVyXG5cblx0anNvbkRhdGEgPSBKU09OLnBhcnNlKG5ld1ZhbC5yZXBsYWNlKC8nL2csJ1wiJykpXG4gICAgY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkEpfSk7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVsxXS5kYXRhUG9pbnRzLnB1c2goeyB5OiBwYXJzZUludChqc29uRGF0YS5CKX0pO1xuXHRjaGFydC5yZW5kZXIoKTtcblxuXHR2YXIgYmVhblRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmVhbi10ZW1wJylcblx0dmFyIGFpclRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLXRlbXAnKVxuXG4gICAgYmVhblRlbXBEaXYuaW5uZXJIVE1MID0ganNvbkRhdGEuQTsgICAgICBcblx0YWlyVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5COyBcblxuXHR2YXIgY3VycmVudERhdGFBcnJheUEgPSBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cztcblx0dmFyIGN1cnJlbnREYXRhQXJyYXlCID0gY2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHM7XG5cdFxuXHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiQlRcIixKU09OLnN0cmluZ2lmeShjdXJyZW50RGF0YUFycmF5QSkpXG5cdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJBVFwiLEpTT04uc3RyaW5naWZ5KGN1cnJlbnREYXRhQXJyYXlCKSlcblxuXHQvL3JhdGUgb2YgcmlzZVxuXHR2YXIgUm9SX2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvcicpXG5cblx0aWYocm9yVGltZXIgPT0gMTUpIHtcblx0XHR2YXIgZnQgPSBqc29uRGF0YS5BO1xuXHRcdHZhciBzdCA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW2NoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzLmxlbmd0aCAtIDE1XS55XG5cdFx0dmFyIHJpc2UgPSBmdCAtIHN0O1xuXHRcdHZhciBSb1IgPSByaXNlLzE1XG5cdFx0Ly8gY29uc29sZS5sb2coXCJmdDogXCIsIGZ0LCBcInN0OiBcIiwgc3QpXG5cdFx0Ly8gY29uc29sZS5sb2coXCJSb1I6IFwiLCBSb1IpXG5cdFx0Um9SX2VsLmlubmVySFRNTCA9IFJvUi50b0ZpeGVkKDIpO1xuXHRcdC8vIHJlc2V0IHRoZSByb3JUaW1lclxuXHRcdHJvclRpbWVyID0gMDtcblx0fVxufSk7XG5cbnZhciB5ZWxsb3dCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneWVsbG93LWJ1dHRvbicpO1xudmFyIGZpcnN0Q3JhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlyc3RjcmFjay1idXR0b24nKTtcbnZhciB5ZWxsb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneWVsbG93Jyk7XG52YXIgZmlyc3RDcmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdGNyYWNrJyk7XG5cblxueWVsbG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIHllbGxvd1ZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZSArIFwiIHNlY29uZHNcIjtcblx0eWVsbG93LmlubmVySFRNTCA9IHllbGxvd1ZhbDtcbn0pXG5cbmZpcnN0Q3JhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIkJUXCIpKTtcblx0dmFyIHRlbXAgPSBkYXRhW2RhdGEubGVuZ3RoIC0xXS55O1xuXHR2YXIgdGltZSA9IGRhdGEubGVuZ3RoIC0xO1xuXHR2YXIgZmlyc3RDcmFja1ZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZSArIFwiIHNlY29uZHNcIjtcblx0Zmlyc3RDcmFjay5pbm5lckhUTUwgPSBmaXJzdENyYWNrVmFsO1xufSkiXSwic291cmNlUm9vdCI6IiJ9