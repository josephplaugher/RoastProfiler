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
