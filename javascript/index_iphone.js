//contentの非表示とgame.htmlの読み込み
socket.on('move', function(data) {
    var content = document.getElementById('content');
	$("body").css("background-image","url(../images/objects/blocks.png)");
    content.style.display = "none";
    load_File("#game", "game_iphone.html");
    room_name = data;
});

function game_put() {
    var room_button_img = document.getElementById('room_button_img');
    var game_start = document.getElementById('game_start');
    room_button_img.style.display = "inline";
    game_start.style.display = "none";
}	

//サーバーにルーム作成を依頼
function roomMake() {
    var room_button_img = document.getElementById('room_button_img');
    var wait = document.getElementById('wait');
    wait.style.display = "inline";
    room_button_img.style.display = "none";
    socket.emit("roomMake_iphone", "");
}

function room_put_click() {
    var wait_put = document.getElementById('wait_put');
    var room_button_img = document.getElementById('room_button_img');
    wait_put.style.display = "inline";
    room_button_img.style.display = "none";
    sound('make_sound');
}

function cancel_put() {
    var wait_put = document.getElementById('wait_put');
    var room_button_img = document.getElementById('room_button_img');
    wait_put.style.display = "none";
    room_button_img.style.display = "inline";
    sound('roomDel_sound');
}

//サーバーに入るルーム名を送信
function roomPut() {
    iphone_count++;  
    if (client_count == undefined) {
        alert("そのルームは作成されていません");
        $("#enter").val("");
    } else if (iphone_count == 1 && client_count == 1) {
        var num = $("#enter").val();
        room_name = num;
        socket.emit("enter", num);
    } else if (client_count > 1) {
        alert("そのルームは使われています");
        $("#enter").val("");
    } else if (iphone_count == 0 || iphone_count == 2) {
        alert("iphoneのsafariとPCで接続してください");
        $("#enter").val("");
    }
}

function roomDel(){
    var room_button_img=document.getElementById('room_button_img');
    var wait=document.getElementById('wait');
    var room;
    wait.style.display="none";
    room_button_img.style.display="inline";
    
    socket.emit("roomDel",room_name);
    $("#maked_room").remove();
}
