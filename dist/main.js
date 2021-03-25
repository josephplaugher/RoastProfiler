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

var s = 0  //start the seconds count timer
socket.on('count', (newVal) => {
	s++//add 1 second to timer
	jsonData = JSON.parse(newVal.replace(/'/g,'"'))
    chart.options.data[0].dataPoints.push({ y: parseInt(jsonData.A)});
	chart.options.data[1].dataPoints.push({ y: parseInt(jsonData.B)});
	chart.render();

	//rate of rise
	var beanTempDiv = document.getElementById('bean-temp')
	var airTempDiv = document.getElementById('air-temp')
    beanTempDiv.innerHTML = jsonData.A;      
	airTempDiv.innerHTML = jsonData.B; 
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQWdEO0FBQzVELFlBQVkseUZBQXlGO0FBQ3JHO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHlCQUF5QjtBQUNwRSx3Q0FBd0MseUJBQXlCO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVDO0FBQ0EsbUM7QUFDQSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzb2NrZXQgPSBpbygpO1xuXG52YXIgcGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbG90Jyk7IFxuXG52YXIgY2hhcnQgPSBuZXcgQ2FudmFzSlMuQ2hhcnQocGxvdCwge1xuXHRhbmltYXRpb25FbmFibGVkOiB0cnVlLFxuXHR0aGVtZTogXCJsaWdodDJcIixcbiAgICBheGlzWTogeyBpbnRlcnZhbDogNTAsIG1heGltdW06IDUwMCwgdGl0bGU6IFwiQmVhbiBUZW1wXCJ9LFxuICAgIGF4aXNYOiB7IGludGVydmFsVHlwZTogXCJzZWNvbmRzXCIsIGludGVydmFsOiAzMCwgbWluaW11bTowLCBtYXhpbXVtOiA3MDAsIHRpdGxlOiBcIlRpbWUgKFNlY29uZHMpXCJ9LFxuXHRkYXRhOiBbXG5cdFx0eyB0eXBlOiBcImxpbmVcIiwgYXhpc1lZVHlwZTogXCJwcmltYXJ5XCIsIG5hbWU6IFwiQmVhbiBUZW1wXCIsXG5cdFx0IGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGxpbmVDb2xvcjogXCJncmVlblwiLCBcblx0XHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdFx0eyB5OiA1MCB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7IHR5cGU6IFwibGluZVwiLCBheGlzWVlUeXBlOiBcInNlY29uZGFyeVwiLCBuYW1lOiBcIkFpciBUZW1wXCIsIFxuXHRcdGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGxpbmVDb2xvcjogXCJyZWRcIiwgXG5cdFx0ZGF0YVBvaW50czogW1xuXHRcdFx0eyB5OiAxMDAgfVxuXHRcdFx0XVxuXHRcdH1cblx0XVxufSk7XG5jaGFydC5yZW5kZXIoKTtcblxudmFyIHMgPSAwICAvL3N0YXJ0IHRoZSBzZWNvbmRzIGNvdW50IHRpbWVyXG5zb2NrZXQub24oJ2NvdW50JywgKG5ld1ZhbCkgPT4ge1xuXHRzKysvL2FkZCAxIHNlY29uZCB0byB0aW1lclxuXHRqc29uRGF0YSA9IEpTT04ucGFyc2UobmV3VmFsLnJlcGxhY2UoLycvZywnXCInKSlcbiAgICBjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoanNvbkRhdGEuQSl9KTtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzFdLmRhdGFQb2ludHMucHVzaCh7IHk6IHBhcnNlSW50KGpzb25EYXRhLkIpfSk7XG5cdGNoYXJ0LnJlbmRlcigpO1xuXG5cdC8vcmF0ZSBvZiByaXNlXG5cdHZhciBiZWFuVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZWFuLXRlbXAnKVxuXHR2YXIgYWlyVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItdGVtcCcpXG4gICAgYmVhblRlbXBEaXYuaW5uZXJIVE1MID0ganNvbkRhdGEuQTsgICAgICBcblx0YWlyVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5COyBcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==