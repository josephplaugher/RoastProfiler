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
      Plotly.newPlot( plot, [{
    x: [1, 2, 3, 4, 5],
    y: [3, 2, 4, 8, 26] }], {
    margin: { t: 0 } } );
})();