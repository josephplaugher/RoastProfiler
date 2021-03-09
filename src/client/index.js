    const MG = require('metrics-graphics')

        const socket = io();

        var plot = document.getElementById('plot'); 

        new MG.data_graphic({
            data: [{'seconds':1,'value':1},
                {'seconds':2,'value':3},
                {'seconds':3,'value':10},
                {'seconds':4,'value':4}
            ],
            width: 600,
            height: 200,
            target: plot,
            area: false,
            xAccessor: 'seconds',
            yAccessor: 'value'
          })

        socket.on('count', (newVal) => {
            console.log(newVal); 
            var tempDiv = document.getElementById('current-temp')
            tempDiv.innerHTML = newVal;
        
        });
