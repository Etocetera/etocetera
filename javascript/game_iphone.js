var canvas = $_id("canvas_animation");
var ctx = canvas.getContext("2d");
var canvasSizeX = canvas_animation.width;
var canvasSizeY = canvas_animation.height;

//通信
socket.on('emit_disconnect', function() {
    alert('接続が切れました');
    location.reload();
});

socket.on('disconnect', function() {
    emit.socket('disconnect_iphone', room_name);
});

var toucharea = $_id("toucharea");
var menu = $_id("menu");
// タッチしたときのイベント
canvas.addEventListener("touchstart", touchHandler, false);
function touchHandler(event) {
    socket.emit('touch', room_name);
}   

// 二本でタッチした時のイベント
toucharea.addEventListener("gestureend", gestureendHandler1, false);
function gestureendHandler1(event) {
    $("span").toggleClass("option");
}

menu.addEventListener("gestureend", gestureendHandler, false);
function gestureendHandler(event) {
		$("span").toggleClass("option");
}
//ゲーム機能
//音量の変化
var up_volume = document.getElementById('up_volume');
var down_volume = document.getElementById('down_volume');
up_volume.addEventListener('touchstart', function() {
    socket.emit("up_vol_emit", room_name);
}, false);
down_volume.addEventListener('touchstart', function() {
    socket.emit("down_vol_emit", room_name);
}, false);

//回転の検出
window.onorientationchange = function() {
    change_style();
    // 向きが変わった際に実行する処理を書く
    var direction = window.orientation;
    socket.json.emit('iphone_direction', {
        room: room_name,
        iphone_direction: direction
    });
}

function $_id(id) {
    return document.getElementById(id);
}

//キャラのアニメーション
var img_width = 64;
var img_height = 64;
var birdImg, cowImg, dragonImg, horseImg, dogImg, monkeyImg, mouseImg,
    rabbitImg, sheepImg, snakeImg, tigreImg, wildBoarImg;
var img = new Array(12);
var character = "mouse";

img["bird"] = $_id("birdImg");
img["cow"] = $_id("cowImg");
img["dog"] = $_id("dogImg");
img["dragon"] = $_id("dragonImg");
img["horse"] = $_id("horseImg");
img["monkey"] = $_id("monkeyImg");
img["mouse"] = $_id("mouseImg");
img["rabbit"] = $_id("rabbitImg")
img["sheep"] = $_id("sheepImg")
img["snake"] = $_id("snakeImg");
img["tiger"] = $_id("tigerImg");
img["wildBoar"]=$_id("wildBoarImg");
mouseImg.onload = function() {
    ctx.drawImage(img[character], 0, img_height*2, img_width, img_height,
                    0, 0, canvasSizeX, canvasSizeY);
    draw_animation();
}

var animationFrame = window.requestAnimationFrame ||
                     window.webkitRequestAnimationFrame;
                     
var i=1;
var j=0;
var frame_count=0;
function draw_animation() {
    animationFrame(draw_animation);
    frame_count++;
    if(frame_count%10==0){
        ctx.clearRect(0,0,canvasSizeX,canvasSizeY);
        ctx.drawImage(img[character], img_width*(i-1), img_height*j,img_width,img_height,0,0,canvasSizeX,canvasSizeY);
        i++;
        if(i==9){
            i=1;
        }
    }
}

    //キャラの変更
function character_change(touch_image_id) {
    socket.json.emit('chara_change', {
        room:room_name,
        name:touch_image_id
    });
    $("span").toggleClass("option");
}

var bird = $_id("bird");
var cow = $_id("cow");
var dog = $_id("dog");
var dragon = $_id("dragon");
var horse = $_id("horse");
var monkey = $_id("monkey");
var mouse = $_id("mouse");
var rabbit = $_id("rabbit");
var sheep = $_id("sheep");
var snake = $_id("snake");
var tiger = $_id("tiger");
var wildBoar=$_id("wildBoar");
bird.addEventListener('touchend',function(){
    character = "bird";
    character_change(character);
},false);
cow.addEventListener('touchend',function(){
    character = "cow";
    character_change(character);
},false);
dog.addEventListener('touchend',function(){
    character = "dog";
    character_change(character);
},false);
dragon.addEventListener('touchend',function(){
    character = "dragon";
    character_change(character);
},false);
horse.addEventListener('touchend',function(){
    character = "horse";
    character_change(character);
},false);
monkey.addEventListener('touchend',function(){
    character = "monkey";
    character_change(character);
},false);
mouse.addEventListener('touchend',function(){
    character = "mouse";
    character_change(character);
},false);
rabbit.addEventListener('touchend',function() {
    character = "rabbit";
    character_change(character);
},false);
sheep.addEventListener('touchend',function(){
    character = "sheep";
    character_change(character);
},false);
snake.addEventListener('touchend',function(){
    character = "snake";
    character_change(character);
},false);
tiger.addEventListener('touchend',function(){
    character = "tiger";
    character_change(character);
},false);
wildBoar.addEventListener('touchend',function(){
    character = "wildBoar";
    character_change(character);
},false);

change_style();
function change_style(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    $("#toucharea").css("width",width);
    $("#toucharea").css("height",height-20);
    $("#canvas_animation").css("left",width/2-100);
    $("#canvas_animation").css("top",height/2-100);
    $("span").css("width", width);
    $("span").css("height", height);
}

//キャラの状態
socket.on('chara_stat_return', function(data) {
    if (data == "move") {
        j = 1;
    } else if (data == "stop") {
        j = 0;
    } else if (data == "clear") {
        j = 2;
    } else {
        j = 3;
    }
});
