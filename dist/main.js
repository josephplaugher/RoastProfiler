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
            + (currentdate.getHours()-2) + ":"
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2FzdHByb2ZpbGVyLy4vc3JjL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLDJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnREFBZ0Q7QUFDNUQsVUFBVSw4REFBOEQ7QUFDeEUsWUFBWSx5RkFBeUY7QUFDckc7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDLHlCQUF5QjtBQUNsRSx5Q0FBeUMseUJBQXlCO0FBQ2xFOztBQUVBO0FBQ0E7O0FBRUEscUM7QUFDQSxvQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtDQUFrQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNvY2tldCA9IGlvKCk7XG5cbnZhciBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bsb3QnKTsgXG5cbnZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idXR0b24nKTtcbnZhciBzdG9wQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3AtYnV0dG9uJyk7XG52YXIgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQtYnV0dG9uJyk7XG52YXIgeWVsbG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llbGxvdy1idXR0b24nKTtcbnZhciBmaXJzdENyYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0Y3JhY2stYnV0dG9uJyk7XG52YXIgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb25lLWJ1dHRvbicpO1xudmFyIGR0ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdHInKTtcbnZhciB5ZWxsb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneWVsbG93Jyk7XG52YXIgZmlyc3RDcmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdGNyYWNrJyk7XG52YXIgZG9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb25lJyk7XG52YXIgY29mZmVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZmZlZScpO1xudmFyIGJhdGNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdGNoJyk7XG5cbnZhciBGaXJzdENyYWNrQWNoZWl2ZWQgPSBmYWxzZVxuXG5jb2ZmZWUuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBmdW5jdGlvbigpIHtcblx0Ly9nZXQgdGhlIGN1cnJlbnQgZGF0ZSBhbmQgdGltZSBcblx0dmFyIGN1cnJlbnRkYXRlID0gbmV3IERhdGUoKTtcblx0dmFyIGRhdGUgPSBjdXJyZW50ZGF0ZS5nZXRGdWxsWWVhcigpICsgXCItXCJcbiAgICAgICAgICAgICsgKGN1cnJlbnRkYXRlLmdldE1vbnRoKCkrMSkgICsgXCItXCIgXG5cdFx0XHQrIGN1cnJlbnRkYXRlLmdldERhdGUoKSArIFwiLiBcIiAgXG4gICAgICAgICAgICArIChjdXJyZW50ZGF0ZS5nZXRIb3VycygpLTIpICsgXCI6XCJcbiAgICAgICAgICAgICsgY3VycmVudGRhdGUuZ2V0TWludXRlcygpICsgXCIgLSBcIlxuICAgdmFyIGJhdGNoTm8gPSBkYXRlICsgY29mZmVlLnZhbHVlO1xuICAgYmF0Y2gudmFsdWUgPSBiYXRjaE5vO1xufSlcblxudmFyIGNoYXJ0ID0gbmV3IENhbnZhc0pTLkNoYXJ0KHBsb3QsIHtcblx0YW5pbWF0aW9uRW5hYmxlZDogdHJ1ZSxcblx0dGhlbWU6IFwibGlnaHQyXCIsXG4gICAgYXhpc1k6IHsgaW50ZXJ2YWw6IDUwLCBtYXhpbXVtOiA1NTAsIHRpdGxlOiBcIkJlYW4gVGVtcFwifSxcblx0YXhpc1kyOiB7IGludGVydmFsOiAzLCBtaW5pbXVtOiAtNSwgbWF4aW11bTogMTUsIHRpdGxlOiBcIlJhdGUgb2YgUmlzZVwifSxcbiAgICBheGlzWDogeyBpbnRlcnZhbFR5cGU6IFwic2Vjb25kc1wiLCBpbnRlcnZhbDogMzAsIG1pbmltdW06MCwgbWF4aW11bTogNTQwLCB0aXRsZTogXCJUaW1lIChTZWNvbmRzKVwifSxcblx0ZGF0YTogW1xuXHRcdHsgYXhpc1lJbmRleDogMCwgdHlwZTogXCJsaW5lXCIsIGF4aXNZWVR5cGU6IFwicHJpbWFyeVwiLCBuYW1lOiBcIkJlYW4gVGVtcFwiLFxuXHRcdCBzaG93SW5MZWdlbmQ6IHRydWUsIGluZGV4TGFiZWxGb250U2l6ZTogMTIsIGNvbG9yOiBcImdyZWVuXCIsIFxuXHRcdFx0ZGF0YVBvaW50czogW1xuXHRcdFx0XHR7IHk6IDUwIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHsgYXhpc1lJbmRleDogMSwgdHlwZTogXCJsaW5lXCIsIGF4aXNZWVR5cGU6IFwicHJpbWFyeVwiLCBuYW1lOiBcIkFpciBUZW1wXCIsIFxuXHRcdHNob3dJbkxlZ2VuZDogdHJ1ZSwgaW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgY29sb3I6IFwicmVkXCIsIFxuXHRcdGRhdGFQb2ludHM6IFtcblx0XHRcdHsgeTogMTAwIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdC8vZGF0YSBzZXQgZm9yIFJhdGUgb2YgUmlzZVxuXHRcdHsgYXhpc1lJbmRleDogMiwgdHlwZTogXCJzcGxpbmVcIiwgYXhpc1lUeXBlOiBcInNlY29uZGFyeVwiLCBuYW1lOiBcIlJhdGUgb2YgUmlzZVwiLCBcblx0XHRzaG93SW5MZWdlbmQ6IHRydWUsIG1hcmtlclR5cGU6IFwidHJpYW5nbGVcIiwgaW5kZXhMYWJlbEZvbnRTaXplOiAxMiwgY29sb3I6IFwiYmxhY2tcIiwgXG5cdFx0ZGF0YVBvaW50czogW1xuXHRcdFx0eyB5OiAwIH1cblx0XHRcdF1cblx0XHR9XG5cdF1cbn0pO1xuY2hhcnQucmVuZGVyKCk7XG5cbnZhciBzID0gMCAgLy9zdGFydCB0aGUgc2Vjb25kcyBjb3VudCB0aW1lclxudmFyIHJvclRpbWVyID0gMCAvL3N0YXJ0IHRoZSByYXRlIG9mIHJpc2UgdGltZXJcbnZhciBGaXJzdENyYWNrQWNoaWV2ZWQ7XG52YXIgZmN0ID0gMCAvL2ZpcnN0IGNyYWNrIHRpbWUgdGltZXJcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0c29ja2V0Lm9uKCdjb3VudCcsIChuZXdWYWwpID0+IHtcblx0XHRzKysvL2FkZCAxIHNlY29uZCB0byB0aW1lclxuXHRcdHJvclRpbWVyKysvL2FkZCBvbmUgc2Vjb25kIHRvIHJvclRpbWVyXG5cblx0XHRqc29uRGF0YSA9IEpTT04ucGFyc2UobmV3VmFsLnJlcGxhY2UoLycvZywnXCInKSlcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoanNvbkRhdGEuQSl9KTtcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoanNvbkRhdGEuQil9KTtcblx0XHRjaGFydC5yZW5kZXIoKTtcblxuXHRcdHZhciBiZWFuVGVtcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZWFuLXRlbXAnKVxuXHRcdHZhciBhaXJUZW1wRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci10ZW1wJylcblxuXHRcdGJlYW5UZW1wRGl2LmlubmVySFRNTCA9IGpzb25EYXRhLkE7ICAgICAgXG5cdFx0YWlyVGVtcERpdi5pbm5lckhUTUwgPSBqc29uRGF0YS5COyBcblxuXHRcdHZhciBjdXJyZW50RGF0YUFycmF5QSA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzO1xuXHRcdHZhciBjdXJyZW50RGF0YUFycmF5QiA9IGNoYXJ0Lm9wdGlvbnMuZGF0YVsxXS5kYXRhUG9pbnRzO1xuXHRcdFxuXHRcdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJCVFwiLEpTT04uc3RyaW5naWZ5KGN1cnJlbnREYXRhQXJyYXlBKSlcblx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiQVRcIixKU09OLnN0cmluZ2lmeShjdXJyZW50RGF0YUFycmF5QikpXG5cblx0XHQvL3JhdGUgb2YgcmlzZVxuXHRcdHZhciBSb1JfZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9yJylcblxuXHRcdGlmKHJvclRpbWVyID09IDE1KSB7XG5cdFx0XHR2YXIgZnQgPSBqc29uRGF0YS5BO1xuXHRcdFx0dmFyIHN0ID0gY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbY2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMubGVuZ3RoIC0gMTVdLnlcblx0XHRcdHZhciByaXNlID0gZnQgLSBzdDtcblx0XHRcdHZhciBSb1IgPSByaXNlLzE1XG5cdFx0XHRSb1JfZWwuaW5uZXJIVE1MID0gUm9SLnRvRml4ZWQoMik7XG5cdFx0XHQvLyBwbG90IHRoZSBjdXJyZW50IFJvUiBvbiB0aGUgc2Vjb25kYXJ5IFkgYXhpc1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ3JvcjogJywgZnQsIHN0LCByaXNlLCBSb1IpXG5cdFx0XHRjaGFydC5vcHRpb25zLmRhdGFbMl0uZGF0YVBvaW50cy5wdXNoKHsgeTogcGFyc2VJbnQoUm9SLnRvRml4ZWQoMikpLCB4OnN9KTtcblx0XHRcdGNoYXJ0LnJlbmRlcigpO1xuXHRcdFx0Ly8gcmVzZXQgdGhlIHJvclRpbWVyXG5cdFx0XHRyb3JUaW1lciA9IDA7XG5cdFx0fVxuXG5cdFx0Ly90aW1lIGZyb20gZmlyc3QgY3JhY2tcblx0XHRpZihGaXJzdENyYWNrQWNoaWV2ZWQgPT0gdHJ1ZSkge1xuXHRcdFx0ZmN0Kys7XG5cdFx0XHR2YXIgdGltZSA9IFNlY29uZHNUb01pbnV0ZXMoZmN0KVxuXHRcdFx0dmFyIHRpbWVTdGFtcCA9IHRpbWUubWludXRlcyArIFwiOlwiICsgdGltZS5zZWNvbmRzO1xuXHRcdFx0dGZmYy5pbm5lckhUTUwgPSB0aW1lU3RhbXA7XG5cdFx0XHR2YXIgZGV2VGltZVJhdGlvID0gKGZjdCAvIHMpLnRvRml4ZWQoMik7XG5cdFx0XHRkdHIuaW5uZXJIVE1MID0gZGV2VGltZVJhdGlvO1xuXHRcdH1cblx0XHRcblx0fSk7XG59KTtcblxuc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdHNvY2tldC5vZmYoJ2NvdW50Jyk7XG59KTtcblxucmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHR2YXIgY2xlYXIgPSBjb25maXJtKFwiWW91IHJlYWxseSB3YW50IHRvIGNsZWFyIHRoZSBjaGFydD9cIilcblx0aWYoY2xlYXIgPT0gdHJ1ZSkge1xuXHRcdHNvY2tldC5vZmYoJ2NvdW50Jyk7XG5cdFx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHMgPSBbXTtcblx0XHRjaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cyA9IFtdO1xuXHRcdGNoYXJ0Lm9wdGlvbnMuZGF0YVsyXS5kYXRhUG9pbnRzID0gW107XG5cdFx0Y2hhcnQucmVuZGVyKCk7XG5cdFx0eWVsbG93LmlubmVySFRNTCA9IGZpcnN0Q3JhY2suaW5uZXJIVE1MID0gZG9uZS5pbm5lckhUTUwgPSAnW3BsYWNlaG9sZGVyXSdcblxuXHR9XG59KTtcblxuLy9pZiBJIG5lZWRlZCB0byBzdG9wIHBsb3R0aW5nIGJlY2F1c2Ugb2YgYSBmYWxzZSByb2FzdGVyIHN0YXJ0LCBJIG5lZWQgdG8gZmlyc3QgY2xlYXIgdGhlIHBsb3QgYW5kIHN0YXJ0IG92ZXJcbmNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzID0gW107XG5jaGFydC5vcHRpb25zLmRhdGFbMV0uZGF0YVBvaW50cyA9IFtdO1xuY2hhcnQub3B0aW9ucy5kYXRhWzJdLmRhdGFQb2ludHMgPSBbXTtcblxueWVsbG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIHllbGxvd1ZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZSArIFwiIHNlY29uZHNcIjtcblx0eWVsbG93LmlubmVySFRNTCA9IHllbGxvd1ZhbDtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubGFiZWw9XCJ5ZWxsb3dcIjtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubWFya2VyU2l6ZT0xNTtcbn0pXG5cbmZpcnN0Q3JhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIkJUXCIpKTtcblx0dmFyIHRlbXAgPSBkYXRhW2RhdGEubGVuZ3RoIC0xXS55O1xuXHR2YXIgdGltZSA9IGRhdGEubGVuZ3RoIC0xO1xuXHR2YXIgZmlyc3RDcmFja1ZhbCA9IHRlbXAgKyBcIiBkZWdyZWVzIGF0IFwiICsgdGltZSArIFwiIHNlY29uZHNcIjtcblx0Zmlyc3RDcmFjay5pbm5lckhUTUwgPSBmaXJzdENyYWNrVmFsO1xuXHRjaGFydC5vcHRpb25zLmRhdGFbMF0uZGF0YVBvaW50c1t0aW1lXS5sYWJlbD1cImZpcnN0IGNyYWNrXCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemU9MTU7XG5cdEZpcnN0Q3JhY2tBY2hpZXZlZCA9IHRydWU7XG59KVxuXG5kb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJCVFwiKSk7XG5cdHZhciB0ZW1wID0gZGF0YVtkYXRhLmxlbmd0aCAtMV0ueTtcblx0dmFyIHRpbWUgPSBkYXRhLmxlbmd0aCAtMTtcblx0dmFyIHRpbWVTdGFtcCA9IFNlY29uZHNUb01pbnV0ZXModGltZSk7XG5cdHZhciBkb25lVmFsID0gdGVtcCArIFwiIGRlZ3JlZXMgYXQgXCIgKyB0aW1lU3RhbXAuc2Vjb25kcyArIFwiIHNlY29uZHMgKFwiICsgdGltZVN0YW1wLm1pbnV0ZXMgKyBcIjpcIiArIHRpbWVTdGFtcC5zZWNvbmRzICsgXCIpXCI7XG5cdGRvbmUuaW5uZXJIVE1MID0gZG9uZVZhbDtcblx0Y2hhcnQub3B0aW9ucy5kYXRhWzBdLmRhdGFQb2ludHNbdGltZV0ubGFiZWw9XCJkb25lXCI7XG5cdGNoYXJ0Lm9wdGlvbnMuZGF0YVswXS5kYXRhUG9pbnRzW3RpbWVdLm1hcmtlclNpemU9MTU7XG59KVxuXG5mdW5jdGlvbiBTZWNvbmRzVG9NaW51dGVzKHRpbWUpIHtcblx0dmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XG5cdHZhciBzZWNvbmRzID0gdGltZSAtIG1pbnV0ZXMgKiA2MDtcblx0cmV0dXJuIHttaW51dGVzOiBtaW51dGVzLCBzZWNvbmRzOiBzZWNvbmRzfVxufSJdLCJzb3VyY2VSb290IjoiIn0=