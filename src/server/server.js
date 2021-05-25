// const dotenv = require('dotenv').config()

const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// open the serial port
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });

const PORT = 3005
http.listen(PORT, () => {
	console.log('listening on port ' + PORT);
  });

app.use(express.static('dist'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'localhost:'+ PORT)
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')
	res.set('X-Powered-By', 'Coffee')
	next()
})

app.get('/', (req, res) => {
	res.render('index');
});

io.on('connection', (socket) => {
	console.log('socket open')
	const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data
	parser.on('data', data =>{
		socket.emit('count', data)
	});
});

//sudo chmod a+rw /dev/ttyACM0