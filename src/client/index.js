(function () {
    const socket = io();
    var log = [];
    var time = []
      socket.on('count', (arg) => {
        console.log(arg); 
        newVal = arg;
        log.push(newVal);
        var str = log.toString();
        var holder = document.getElementById('message');
        holder.innerHTML = str
      });


    plot = document.getElementById('plot');
    var data = [{
        x: [1, 2, 3, 3.2],
        y: [50,100,150,200,250,300,350,400],
        type: 'scatter'}]
    var layout = {
        xaxis: {
            title: {
                text: "Time",
                standoff: 40
            },
            range: [0, 12],
            autotick: false,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.5,
            ticklen: 5,
            tickwidth: 5,
            tickcolor: '#000'
        },
        yaxis: {
            title: {
                text: "Temperature",
                standoff: 40
            },
            range: [40, 450],
            autotick: false,
            ticks: 'outside',
            tick0: 0,
            dtick: 50,
            ticklen: 5,
            tickwidth: 5,
            tickcolor: '#000'
        }
    };
    Plotly.newPlot(plot, data, layout);
})();