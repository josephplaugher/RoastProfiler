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