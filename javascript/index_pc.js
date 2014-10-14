//音楽の処理
music_1 = document.getElementById("bgm");
music_2 = document.getElementById("bgm_game");
music_3 = document.getElementById("make_sound");
music_4 = document.getElementById("put_sound");
music_5 = document.getElementById("roomDel_sound");
music_6 = document.getElementById("dialog_sound");
music_7=document.getElementById("chara_change_sound");
music_8=document.getElementById("item_sound");

music_1.volume = 0.2;
music_2.volume = 0.2;
music_3.volume = 0.2;
music_4.volume = 0.2;
music_5.volume = 0.2;
music_6.volume = 0.2;
music_7.volume=0.2;
music_8.volume=0.2;

function sound(id) {
    audio = document.getElementById(id);
    audio.play();
}

function up_volume(){
    if (music_1.volume <= 0.9) {
        music_1.volume = music_1.volume+0.1;
        music_2.volume = music_2.volume+0.1;
        music_3.volume = music_3.volume+0.1;
        music_4.volume = music_4.volume+0.1;
        music_5.volume = music_5.volume+0.1;
        music_6.volume = music_6.volume+0.1;
        music_7.volume=music_7.volume+0.1;
        music_8.volume=music_8.volume+0.1;
    }
    console.log(music_1.volume);
}

function down_volume() {
    if (music_1.volume > 0.1) {
        music_1.volume = music_1.volume-0.1;
        music_2.volume = music_2.volume-0.1;
        music_3.volume = music_3.volume-0.1;
        music_4.volume = music_4.volume-0.1;
        music_5.volume = music_5.volume-0.1;
        music_6.volume = music_6.volume-0.1;
        music_7.volume=music_7.volume-0.1;
        music_8.volume=music_8.volume-0.1;
    } else if (music_1.volume = 0.1) {
        music_1.volume = 0;
        music_2.volume = 0;
        music_3.volume = 0;
        music_4.volume = 0;
        music_5.volume = 0;
        music_6.volume = 0;
        music_7.volume=0;
        music_8.volume=0;
    }
    console.log(music_1.volume);
}

//contentの非表示とgame.htmlの読み込み
socket.on('move', function(data) {
    var content = document.getElementById('content');
    content.style.display = "none";
    load_File("#game", "game_pc.html");
});

//サーバーにルーム作成を依頼
function roomMake() {
    var room_button_img = document.getElementById('room_button_img');
    var wait = document.getElementById('wait');
    wait.style.display = "inline";
    room_button_img.style.display = "none";
    socket.emit("roomMake_pc", "");
    sound('make_sound');
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
    if (client_count == undefined) {
        use_dialog('#error_no', 'ルームに関するエラー');
        $("#enter").val("");
    } else if (iphone_count == 1 && client_count == 1) {
        var num = $("#enter").val();
        socket.emit("enter", num);
        sound('put_sound');
    } else if (iphone_count == 0 || iphone_count == 2) {
        use_dialog('#error_num', 'ルームに関するエラー');
        $("#enter").val("");
    } else if (client_count == 2) {
        use_dialog('#error_max', 'ルームに関するエラー');
        $("#enter").val("");
    }
}

function game_put() {
    var game_start = document.getElementById('game_start');
    var make = document.getElementById('make');
    var enter_img = document.getElementById('enter_img');
    game_start.style.display = "none";
    make.style.display = "inline";
    enter_img.style.display = "inline";
    sound('make_sound');
}

//サブメニューの作成
$(function() {
    $('#sub').tabs();
});

var width_window = window.screen.width;
$("#sub").css("width",width_window-40);

function roomDel(){
    var room_button_img=document.getElementById('room_button_img');
    var wait=document.getElementById('wait');
    var room;
    wait.style.display="none";
    room_button_img.style.display="inline";
    
    socket.emit("roomDel",room_name);
    $("#maked_room").remove();
    sound('roomDel_sound');
}
