/*
 * Node Sever Script 
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app);

var roomList = new Object();
var room_name;
var iphone_count=new Object();
var io = require('socket.io').listen(server);
var port = process.env.PORT || 4000;
server.listen(port);
app.configure(function() {
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});
 
io.sockets.on("connection", function(socket) {
    socket.on("roomMake_iphone", function roomMake() {
        room_name = Math.floor(Math.random()*10000);
        if(!roomList[room_name]){
            //ルームが作られていない場合
            roomList[room_name] = 1;
            socket.set('room', room_name);
            socket.join(room_name);
            io.sockets.to(room_name).emit('roomList', room_name);
            iphone_count[room_name] = 1;
           
        }else{
            roomMake();
        }
    });

    socket.on("roomMake_pc",function roomMake(){
        room_name = Math.floor(Math.random()*10000);
        if(!roomList[room_name]){
            //ルームが作られていない場合
            roomList[room_name] = 1;
            socket.set('room', room_name);
            socket.join(room_name);
            io.sockets.to(room_name).emit('roomList', room_name);
            iphone_count[room_name] = 0;
        }else{
            roomMake();
        }
    });

    socket.on('roomPut_confirm',function(room_num){
        var num_iphone = iphone_count[room_num];
        var num_client = roomList[room_num];
        socket.json.emit('confirm_return',{
            iphone: num_iphone,
            client: num_client
        });

    });

    socket.on("enter", function(data2){
        roomList[data2]++;
        socket.set('room', data2);
        socket.join(data2);
 		io.sockets.to(data2).emit('move', data2);
    }); 
 
    socket.on("roomDel",function(data){
            roomList[data]--;   
            socket.leave(data);
 
            if(roomList[data] == 0){
               //ルームの人数が0人
                delete roomList[data];
            }
    });
    
    socket.on("disconnect", function () {
        var room;
        socket.get('room', function(err, _room){
            room = _room;
        });
        if(room){
            roomList[room]--;   
            socket.leave(room);
            if(roomList[room] == 0){
               //ルームの人数が0人
                delete roomList[room];
               
            }
        }
        io.sockets.to(room).emit('emit_disconnect',"");
    });

    socket.on("disconnect_iphone", function (data) {
        iphone_count[data]--;
        io.sockets.to(data).emit('disconnect_pc',"");
       
    });

    socket.on("up_vol_emit", function (data) {
        io.sockets.to(data).emit('up_vol_return',"");
    });

    socket.on("down_vol_emit", function (data) {
        io.sockets.to(data).emit('down_vol_return',"");
    });

    socket.on('iphone_direction',function (data){
        io.sockets.to(data.room).emit('iphone_direction_return',data.iphone_direction);
    });

    socket.on('touch',function (data){
        io.sockets.to(data).emit('touch_return',"");
    });

    socket.on('chara_change',function (data){
        io.sockets.to(data.room).emit('chara_change_return',data.name);
    });

    socket.on('chara_stat',function (data){
        io.sockets.to(data.room).emit('chara_stat_return',data.stat);
    });
 });
