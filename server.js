const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let counter = 0;
let users = [];

server.listen(8080);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connect', function(socket) {
	++counter;
	const user = { userNumber: counter, userId: socket.id };

	users.push(user);

	socket.emit('counter', { counter });

	socket.emit('users', { users });
	socket.broadcast.emit('users', { users });

	socket.on('disconnect', () => {
		users = users.filter(x => x.userId !== socket.id);
		socket.broadcast.emit('users', { users });
	});
});
