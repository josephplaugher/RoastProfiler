const socket = io();

var plot = document.getElementById('plot'); 

var chart = new CanvasJS.Chart(plot, {
	animationEnabled: true,
	theme: "light2",
    axisY: { interval: 50, maximum: 500, title: "Temp"},
    axisX: { intervalType: "seconds", interval: 30, maximum: 700, title: "Time (Seconds)"},
	data: [{ type: "line", indexLabelFontSize: 12,
		dataPoints: [
			{ y: 50 }
		]
	}]
});
chart.render();

socket.on('count', (newVal) => {
    chart.options.data[0].dataPoints.push({ y: newVal});
    chart.render();
    var tempDiv = document.getElementById('current-temp')
    tempDiv.innerHTML = newVal;      
});
