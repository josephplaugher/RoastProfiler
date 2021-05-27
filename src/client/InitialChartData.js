const InitialChartData = [
    {
        axisYIndex: 0, type: "line", axisYYType: "primary", name: "Bean Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "green",
        dataPoints: [
            { y: 65 }
        ]
    },
    {
        axisYIndex: 1, type: "line", axisYYType: "primary", name: "Air Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "red",
        dataPoints: [
            { y: 65 }
        ]
    },
    //data set for Rate of Rise
    {
        axisYIndex: 2, type: "spline", axisYType: "secondary", name: "Rate of Rise",
        showInLegend: true, markerType: "triangle", indexLabelFontSize: 12, color: "black",
        dataPoints: [
            { y: 0 }
        ]
    }
]

module.exports = InitialChartData