var socket = io.connect('http://192.168.0.5:8080');
const counter = document.getElementById('counter');
const userNumbers = document.getElementById('userNumbers');
const userList = document.getElementById('userList');
socket.on('counter', data => {
  counter.innerHTML = data.counter;
});
socket.on('users', data => {
  const { users } = data;
  userNumbers.innerHTML = users.length;
  userList.innerHTML = '';
  users.map(x => {
    let li = document.createElement('LI');
    let user = document.createTextNode(`User ${x.userNumber}`);
    li.appendChild(user);
    userList.appendChild(li);
  });
});
socket.on('disconnect', { message: `user disconnected` });