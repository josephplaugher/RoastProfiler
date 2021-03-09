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
	title:{ text: "Roast Profile"},
    axisY: { interval: 50, maximum: 500, title: "Temp"},
    axisX: { intervalType: "seconds", interval: 30, maximum: 700, title: "Time (Seconds)"},
	data: [{ type: "line", indexLabelFontSize: 12,
		dataPoints: [
			{ y: 50 }
		]
	}]
});
chart.render();

// var newData = [390,395,410,430]
// i =0;
// for(i < 0; i < newData.length; i++) {
//         chart.options.data[0].dataPoints.push({ y: newData[i]});
//         chart.render();
// }

socket.on('count', (newVal) => {
    chart.options.data[0].dataPoints.push({ y: newVal});
    chart.render();
    var tempDiv = document.getElementById('current-temp')
    tempDiv.innerHTML = newVal;      
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CLFlBQVksMkNBQTJDO0FBQ3ZELFlBQVksOEVBQThFO0FBQzFGLFNBQVM7QUFDVDtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBLGFBQWEsb0JBQW9CO0FBQ2pDLGtEQUFrRCxlQUFlO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsV0FBVztBQUN0RDtBQUNBO0FBQ0EsK0I7QUFDQSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzb2NrZXQgPSBpbygpO1xuXG52YXIgcGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbG90Jyk7IFxuXG52YXIgY2hhcnQgPSBuZXcgQ2FudmFzSlMuQ2hhcnQocGxvdCwge1xuXHRhbmltYXRpb25FbmFibGVkOiB0cnVlLFxuXHR0aGVtZTogXCJsaWdodDJcIixcblx0dGl0bGU6eyB0ZXh0OiBcIlJvYXN0IFByb2ZpbGVcIn0sXG4gICAgYXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1MDAsIHRpdGxlOiBcIlRlbXBcIn0sXG4gICAgYXhpc1g6IHsgaW50ZXJ2YWxUeXBlOiBcInNlY29uZHNcIiwgaW50ZXJ2YWw6IDMwLCBtYXhpbXVtOiA3MDAsIHRpdGxlOiBcIlRpbWUgKFNlY29uZHMpXCJ9LFxuXHRkYXRhOiBbeyB0eXBlOiBcImxpbmVcIiwgaW5kZXhMYWJlbEZvbnRTaXplOiAxMixcblx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHR7IHk6IDUwIH1cblx0XHRdXG5cdH1dXG59KTtcbmNoYXJ0LnJlbmRlcigpO1xuXG4vLyB2YXIgbmV3RGF0YSA9IFszOTAsMzk1LDQxMCw0MzBdXG4vLyBpID0wO1xuLy8gZm9yKGkgPCAwOyBpIDwgbmV3RGF0YS5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cy5wdXNoKHsgeTogbmV3RGF0YVtpXX0pO1xuLy8gICAgICAgICBjaGFydC5yZW5kZXIoKTtcbi8vIH1cblxuc29ja2V0Lm9uKCdjb3VudCcsIChuZXdWYWwpID0+IHtcbiAgICBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cy5wdXNoKHsgeTogbmV3VmFsfSk7XG4gICAgY2hhcnQucmVuZGVyKCk7XG4gICAgdmFyIHRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC10ZW1wJylcbiAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5ld1ZhbDsgICAgICBcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==