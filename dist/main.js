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
    axisX: { intervalType: "second", interval: 30, maximum: 600},
	data: [{ type: "line", indexLabelFontSize: 12,
		dataPoints: [
			{ y: 50 },
			{ y: 70 },
			{ y: 100 },
			{ y: 160 },
			{ y: 250 },
			{ y: 300 },
			{ y: 380 }
		]
	}]
});
chart.render();

var newData = [390,400,450]
i =0;
for(i < 0; i < newData.length; i++) {
    console.log('add')
        chart.options.data[0].dataPoints.push({ y: newData[i]});
        chart.render();
}


socket.on('count', (newVal) => {
    console.log(newVal); 
    var tempDiv = document.getElementById('current-temp')
    tempDiv.innerHTML = newVal;      
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CLFlBQVksb0RBQW9EO0FBQ2hFLFNBQVM7QUFDVDtBQUNBLElBQUksUUFBUTtBQUNaLElBQUksUUFBUTtBQUNaLElBQUksU0FBUztBQUNiLElBQUksU0FBUztBQUNiLElBQUksU0FBUztBQUNiLElBQUksU0FBUztBQUNiLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBLFVBQVUsb0JBQW9CO0FBQzlCO0FBQ0EsK0NBQStDLGVBQWU7QUFDOUQ7QUFDQTs7O0FBR0E7QUFDQSx3QjtBQUNBO0FBQ0EsK0I7QUFDQSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzb2NrZXQgPSBpbygpO1xuXG52YXIgcGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbG90Jyk7IFxuXG52YXIgY2hhcnQgPSBuZXcgQ2FudmFzSlMuQ2hhcnQocGxvdCwge1xuXHRhbmltYXRpb25FbmFibGVkOiB0cnVlLFxuXHR0aGVtZTogXCJsaWdodDJcIixcblx0dGl0bGU6eyB0ZXh0OiBcIlJvYXN0IFByb2ZpbGVcIn0sXG4gICAgYXhpc1g6IHsgaW50ZXJ2YWxUeXBlOiBcInNlY29uZFwiLCBpbnRlcnZhbDogMzAsIG1heGltdW06IDYwMH0sXG5cdGRhdGE6IFt7IHR5cGU6IFwibGluZVwiLCBpbmRleExhYmVsRm9udFNpemU6IDEyLFxuXHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdHsgeTogNTAgfSxcblx0XHRcdHsgeTogNzAgfSxcblx0XHRcdHsgeTogMTAwIH0sXG5cdFx0XHR7IHk6IDE2MCB9LFxuXHRcdFx0eyB5OiAyNTAgfSxcblx0XHRcdHsgeTogMzAwIH0sXG5cdFx0XHR7IHk6IDM4MCB9XG5cdFx0XVxuXHR9XVxufSk7XG5jaGFydC5yZW5kZXIoKTtcblxudmFyIG5ld0RhdGEgPSBbMzkwLDQwMCw0NTBdXG5pID0wO1xuZm9yKGkgPCAwOyBpIDwgbmV3RGF0YS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKCdhZGQnKVxuICAgICAgICBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cy5wdXNoKHsgeTogbmV3RGF0YVtpXX0pO1xuICAgICAgICBjaGFydC5yZW5kZXIoKTtcbn1cblxuXG5zb2NrZXQub24oJ2NvdW50JywgKG5ld1ZhbCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKG5ld1ZhbCk7IFxuICAgIHZhciB0ZW1wRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtdGVtcCcpXG4gICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdWYWw7ICAgICAgXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=