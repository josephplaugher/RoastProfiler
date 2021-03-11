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
    axisX: { intervalType: "seconds", interval: 30, minimum:0, maximum: 700, title: "Time (Seconds)"},
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

socket.on('count', (newVal) => {
	jsonData = JSON.parse(newVal.replace(/'/g,'"'))
    chart.options.data[0].dataPoints.push({ y: parseInt(jsonData.A)});
	chart.options.data[1].dataPoints.push({ y: parseInt(jsonData.B)});
   
	chart.render();

	var beanTempDiv = document.getElementById('bean-temp')
	var airTempDiv = document.getElementById('air-temp')
    beanTempDiv.innerHTML = jsonData.A;      
	airTempDiv.innerHTML = jsonData.B; 
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQWdEO0FBQzVELFlBQVkseUZBQXlGO0FBQ3JHO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMseUJBQXlCO0FBQ3BFLHdDQUF3Qyx5QkFBeUI7O0FBRWpFOztBQUVBO0FBQ0E7QUFDQSx1QztBQUNBLG1DO0FBQ0EsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc29ja2V0ID0gaW8oKTtcblxudmFyIHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxvdCcpOyBcblxudmFyIGNoYXJ0ID0gbmV3IENhbnZhc0pTLkNoYXJ0KHBsb3QsIHtcblx0YW5pbWF0aW9uRW5hYmxlZDogdHJ1ZSxcblx0dGhlbWU6IFwibGlnaHQyXCIsXG4gICAgYXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1MDAsIHRpdGxlOiBcIkJlYW4gVGVtcFwifSxcbiAgICBheGlzWDogeyBpbnRlcnZhbFR5cGU6IFwic2Vjb25kc1wiLCBpbnRlcnZhbDogMzAsIG1pbmltdW06MCwgbWF4aW11bTogNzAwLCB0aXRsZTogXCJUaW1lIChTZWNvbmRzKVwifSxcblx0ZGF0YTogW1xuXHRcdHsgdHlwZTogXCJsaW5lXCIsIGF4aXNZWVR5cGU6IFwicHJpbWFyeVwiLCBuYW1lOiBcIkJlYW4gVGVtcFwiLFxuXHRcdCBpbmRleExhYmVsRm9udFNpemU6IDEyLCBsaW5lQ29sb3I6IFwiZ3JlZW5cIiwgXG5cdFx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHRcdHsgeTogNTAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0eyB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJzZWNvbmRhcnlcIiwgbmFtZTogXCJBaXIgVGVtcFwiLCBcblx0XHRpbmRleExhYmVsRm9udFNpemU6IDEyLCBsaW5lQ29sb3I6IFwicmVkXCIsIFxuXHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdHsgeTogMTAwIH1cblx0XHRcdF1cblx0XHR9XG5cdF1cbn0pO1xuY2hhcnQucmVuZGVyKCk7XG5cbnNvY2tldC5vbignY291bnQnLCAobmV3VmFsKSA9PiB7XG5cdGpzb25EYXRhID0gSlNPTi5wYXJzZShuZXdWYWwucmVwbGFjZSgvJy9nLCdcIicpKVxuICAgIGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzLnB1c2goeyB5OiBwYXJzZUludChqc29uRGF0YS5BKX0pO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoanNvbkRhdGEuQil9KTtcbiAgIFxuXHRjaGFydC5yZW5kZXIoKTtcblxuXHR2YXIgYmVhblRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmVhbi10ZW1wJylcblx0dmFyIGFpclRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLXRlbXAnKVxuICAgIGJlYW5UZW1wRGl2LmlubmVySFRNTCA9IGpzb25EYXRhLkE7ICAgICAgXG5cdGFpclRlbXBEaXYuaW5uZXJIVE1MID0ganNvbkRhdGEuQjsgXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=