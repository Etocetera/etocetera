function cText(obj) {
    if (obj.value == obj.defaultValue) {
        obj.value = "";
        obj.style.color = "#000";
    }
}

function sText(obj) {
    if (obj.value == "") {
        obj.value = obj.defaultValue;
        obj.style.color = "#999";
    }
}

var userAgent = window.navigator.userAgent.toLowerCase();
var ua = navigator.userAgent.toUpperCase();

if (userAgent.indexOf('safari') != -1&&ua.indexOf('IPHONE') != -1) {
    load_File("#index", "index_iphone.html");
} else {
    load_File("#index", "index_pc.html");
}

var socket = io.connect('http://etocetera.herokuapp.com/')
var iphone_count = 0;
var client_count = 0; 
var room_name;

//そのルームに接続された数とその中のiphoneの数を確認し、ルームに入る
socket.on('confirm_return', function(data) {
    iphone_count = data.iphone;
    client_count = data.client;
    roomPut();
});

socket.on('roomList', function(data) { 
    $("#room").append("<p id='maked_room'>" + data + "</p>");
});


function roomPut_confirm() {
    room_name = $("#enter").val();
    socket.emit('roomPut_confirm', room_name);
}

function load_File(id, file) {
    $.ajax({
        success : function(data) {
            $(id).load(file);
        },
        error : function() {
            if (userAgent.indexOf('safari') != -1 &&
                    ua.indexOf('IPHONE') != -1) {
                alert('読み込めませんでした');
            } else {
                use_dialog('#error_read', '接続に関するエラー');
            }
        }
    });
}

function use_dialog(id, title_msg) {
    $(id).dialog({
        autoOpen: false,
        buttons:{
            "OK" : function() {
                $(this).dialog('close');
            }
        },
        title: title_msg,
        modal: true
    });
    sound('dialog_sound');
    $(id).dialog('open');
}
