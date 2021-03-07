(function () {
    const socket = io();

    plot = document.getElementById('plot');
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
            tickwidth:  5,
            tickcolor: '#000'
        }
    };

    var log = [];

    Plotly.plot(plot,[{
        y:[65,70],
        type:'line'
    }],layout);

    socket.on('count', (arg) => {
        console.log(arg); 
        newVal = arg;
        log.push(newVal);
        console.log(log)
        var tempDiv = document.getElementById('current-temp')
        tempDiv.innerHTML = newVal;
        Plotly.plot(plot, { y: [log]})
    });

})();