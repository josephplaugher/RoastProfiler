// const dotenv = require('dotenv').config()
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(3000, () => {
	console.log('listening on *:3000');
  });

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'localhost:3000')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')
	res.set('X-Powered-By', 'Coffee')
	next()
})

app.get('/', (req, res) => {
	res.render('index')
});

io.on('connection', (socket) => {
	console.log('socket open')
	// const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data
	// port.on("open", () => {
	// 	console.log('serial port open');
	// });
	// parser.on('data', data =>{
	// 	socket.emit('count', data)
	// });
});