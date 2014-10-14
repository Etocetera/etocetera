var socket = io.connect('http://etocetera.herokuapp.com/');

function send() {
	var ctx = document.getElementById('context').value;
	//サーバに送信
	socket.emit('client_message', ctx);
};

//サーバーからデータを受け取り処理する
socket.on('server_message', function(data) {
    var li = document.createElement('li');
    li.innerHTML = data;
    document.querySelector('#pings').appendChild(li);
});
