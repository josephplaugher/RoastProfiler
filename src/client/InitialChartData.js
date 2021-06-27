const InitialChartData = [
    {
        axisYIndex: 0, type: "line", axisYYType: "primary", name: "Bean Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "green",
        dataPoints: []
    },
    {
        axisYIndex: 1, type: "line", axisYYType: "primary", name: "Air Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "red",
        dataPoints: []
    },
    //data set for Rate of Rise
    {
        axisYIndex: 2, type: "spline", axisYType: "secondary", name: "Rate of Rise",
        showInLegend: true, markerType: "triangle", indexLabelFontSize: 12, color: "black",
        dataPoints: []
    },
    //these lines are for bringing in a previous roast as a guideline for the next roast
    {
        axisYIndex: 3, type: "line", axisYYType: "primary", name: "Bean Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "green",
        lineDashType: "dash",
        dataPoints: []
    },
    {
        axisYIndex: 4, type: "line", axisYYType: "primary", name: "Air Temp",
        showInLegend: true, indexLabelFontSize: 12, color: "red",
        lineDashType: "dash",
        dataPoints: []
    },
    //data set for Rate of Rise
    {
        axisYIndex: 5, type: "spline", axisYType: "secondary", name: "Rate of Rise",
        showInLegend: true, markerType: "triangle", indexLabelFontSize: 12, color: "black",
        lineDashType: "dash",
        dataPoints: []
    }
]

module.exports = InitialChartData