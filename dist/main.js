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
    axisX: { intervalType: "seconds", interval: 30, minum:0, maximum: 700, title: "Time (Seconds)"},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQWdEO0FBQzVELFlBQVksdUZBQXVGO0FBQ25HO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMseUJBQXlCO0FBQ3BFLHdDQUF3Qyx5QkFBeUI7O0FBRWpFOztBQUVBO0FBQ0E7QUFDQSx1QztBQUNBLG1DO0FBQ0EsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc29ja2V0ID0gaW8oKTtcblxudmFyIHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxvdCcpOyBcblxudmFyIGNoYXJ0ID0gbmV3IENhbnZhc0pTLkNoYXJ0KHBsb3QsIHtcblx0YW5pbWF0aW9uRW5hYmxlZDogdHJ1ZSxcblx0dGhlbWU6IFwibGlnaHQyXCIsXG4gICAgYXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1MDAsIHRpdGxlOiBcIkJlYW4gVGVtcFwifSxcbiAgICBheGlzWDogeyBpbnRlcnZhbFR5cGU6IFwic2Vjb25kc1wiLCBpbnRlcnZhbDogMzAsIG1pbnVtOjAsIG1heGltdW06IDcwMCwgdGl0bGU6IFwiVGltZSAoU2Vjb25kcylcIn0sXG5cdGRhdGE6IFtcblx0XHR7IHR5cGU6IFwibGluZVwiLCBheGlzWVlUeXBlOiBcInByaW1hcnlcIiwgbmFtZTogXCJCZWFuIFRlbXBcIixcblx0XHQgaW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgbGluZUNvbG9yOiBcImdyZWVuXCIsIFxuXHRcdFx0ZGF0YVBvaW50czogW1xuXHRcdFx0XHR7IHk6IDUwIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHsgdHlwZTogXCJsaW5lXCIsIGF4aXNZWVR5cGU6IFwic2Vjb25kYXJ5XCIsIG5hbWU6IFwiQWlyIFRlbXBcIiwgXG5cdFx0aW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgbGluZUNvbG9yOiBcInJlZFwiLCBcblx0XHRkYXRhUG9pbnRzOiBbXG5cdFx0XHR7IHk6IDEwMCB9XG5cdFx0XHRdXG5cdFx0fVxuXHRdXG59KTtcbmNoYXJ0LnJlbmRlcigpO1xuXG5zb2NrZXQub24oJ2NvdW50JywgKG5ld1ZhbCkgPT4ge1xuXHRqc29uRGF0YSA9IEpTT04ucGFyc2UobmV3VmFsLnJlcGxhY2UoLycvZywnXCInKSlcbiAgICBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoanNvbkRhdGEuQSl9KTtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkIpfSk7XG4gICBcblx0Y2hhcnQucmVuZGVyKCk7XG5cblx0dmFyIGJlYW5UZW1wRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JlYW4tdGVtcCcpXG5cdHZhciBhaXJUZW1wRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci10ZW1wJylcbiAgICBiZWFuVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5BOyAgICAgIFxuXHRhaXJUZW1wRGl2LmlubmVySFRNTCA9IGpzb25EYXRhLkI7IFxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9