/* 背景レイヤー */
var canvas0, layer0;
/* ステージ描画レイヤー */
var canvas1, layer1;
/* キャラ描画レイヤー */
var canvas2, layer2;
/* エフェクト描画レイヤー */
var canvas3, layer3;
/* 文字レイヤー */
var topCanvas, topLayer;
/* ゲーム画面の幅と高さ */
var gameScreenX = 1024;
var gameScreenY = 512;
/* アニメーション設定 */
var rAF = window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.requestAnimationFrame;
/* ゲーム設定 */
var gameSpeed = 1.0;
var frameCount = 0;
var eFrameCount = 0;
var textNumber = 0;
var timer = 1800;
var area = 1;
var stageMax = 3;
/* キャンバスの傾き */
var canvasDegree = 0;
var dDegree = 0;
/* 重力 */
var g = 12;
/* フラグ */
var textFlag = true; // テキスト表示フラグ
var op = true; // オープニングムービーフラグ
var tutorial = false; // チュートリアルフラグ
var gameStart = false; // ゲームスタートフラグ
var releaseIphoneEvent = false; // タッチイベント解除フラグ
var autoMove = false; // 地面に着地したときに自動的に動く
/* キャラクターのサイズ */
var charaSizeX = 64;
var charaSizeY = 64;
/* 画像 */
var backImg1;
var birdImg, cowImg, dogImg, dragonImg, horseImg, monkeyImg, mouseImg,
    rabbitImg, sheepImg, snakeImg, tigerImg, wildBoarImg;
var img = new Array(12);
var doorImg, blocksImg, grassFloorImg, cheeseImg, carrotImg, cheesePoisonImg;
var goalImg;
var titleImg, hiraganaImg, katakanaImg, textWindowImg, timeWindowImg,
    gameoverImg, gameclearImg;
/* インスタンス */
var player;
var door;
var blocks;
var grassFloor;
var goal;
var title, textWindow, timeWindow;
var opMap, map0, map1, map2;
/* マップ描画オフセット */
var offsetX = 0;
var offsetY = 0;
/* マップの大きさの単位 */
var mapE = 64;
// マップのインスタンス化
var mapOrigin = new Array(10);
opMap = new Map("opMap");
opMap.init(8, 16);
opMap.col[0] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
opMap.col[1] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
opMap.col[2] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
opMap.col[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
opMap.col[4] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
opMap.col[5] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
opMap.col[6] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
opMap.col[7] = [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];
var opStage = new Stage(opMap, 2, 6, 862, 320, 1);
map0 = new Map("map0");
map0.init(8, 16);
map0.col[0] = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
map0.col[1] = [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2];
map0.col[2] = [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2];
map0.col[3] = [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2];
map0.col[4] = [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2];
map0.col[5] = [2,0,0,0,0,0,0,0,0,0,0,0,0,0,12,2];
map0.col[6] = [2,0,0,0,0,0,0,10,0,0,0,0,0,0,13,2];
map0.col[7] = [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];
mapOrigin[0] = map0;
var map1 = new Map("map1");
map1.init(16, 20);
map1.col[0] =  [ 1, 1, 1, 1, 1,  1, 1, 1, 1, 1,  1, 1, 1, 1, 1,  1, 1, 1, 1, 1];
map1.col[1] =  [ 1, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[2] =  [ 1,12, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[3] =  [ 1,13, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[4] =  [ 1, 5, 5, 5, 5,  5, 0, 4, 0, 4,  0, 4, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[5] =  [ 1,10, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 5];
map1.col[6] =  [ 1, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 5];
map1.col[7] =  [ 1, 8, 8, 8, 9,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[8] =  [ 1, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[9] =  [ 1, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[10] = [ 1, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 5];
map1.col[11] = [ 1, 0, 0, 2, 2,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1];
map1.col[12] = [ 1, 0, 0, 2, 2,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 10, 0, 0, 0, 1];
map1.col[13] = [ 1, 0, 0, 0, 0,  0, 0, 0, 0, 7,  8, 8, 8, 9, 0,  0, 6, 0, 0, 1];
map1.col[14] = [ 1, 0, 0, 0, 0,  7, 8, 8, 8, 8,  8, 8, 8, 8, 8,  8, 8, 8, 8, 8];
map1.col[15] = [ 8, 8, 8, 8, 8,  8, 8, 8, 8, 8,  8, 8, 8, 8, 8,  8, 8, 8, 8, 8];
mapOrigin[1] = map1;
console.log(mapOrigin[1]);
var map2 = new Map("map2");
map2.init(20, 16);
map2.col[0] =  [ 2, 2, 2, 2, 2,  2, 2, 2, 2, 2,  2, 2, 2, 2, 2,  2];
map2.col[1] =  [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 0, 0, 0, 0,  2];
map2.col[2] =  [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 0, 0, 0, 0,  2];
map2.col[3] =  [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 0, 0, 0, 0,  2];
map2.col[4] =  [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 0, 0, 0, 0,  2];
map2.col[5] =  [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 0, 0, 0, 0,  2];
map2.col[6] =  [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 0, 0, 0, 0,  2];
map2.col[7] =  [ 2,11, 0, 0, 0,  0, 0, 0, 0, 0,  2,11, 0, 0, 0,  2];
map2.col[8] =  [ 2, 8, 8, 8, 8,  9, 0, 0,12, 0,  8, 8, 9, 0, 0,  2];
map2.col[9] =  [ 2, 0, 0, 0, 0,  3, 0, 0,13, 0,  0, 0, 0, 0, 0,  2];
map2.col[10] = [ 2, 0, 0, 0, 0,  3, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2];
map2.col[11] = [ 2, 0, 0, 0, 0,  3, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2];
map2.col[12] = [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2];
map2.col[13] = [ 2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 7, 8,  2];
map2.col[14] = [ 2, 0, 0, 0, 0,  2, 8, 8, 8, 3,  0, 0, 0, 0, 0,  2];
map2.col[15] = [ 2, 0, 0, 0, 0,  2, 0, 0, 0, 3,  0, 0, 0, 0, 0,  2];
map2.col[16] = [ 2, 0, 0, 0, 0,  2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2];
map2.col[17] = [ 2, 0, 0, 0, 0,  2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2];
map2.col[18] = [ 2, 0, 0, 0, 0,  2,11, 0, 0, 0,  0, 0, 0, 0, 0,  2];
map2.col[19] = [ 2, 2, 2, 2, 2,  2, 2, 2, 2, 2,  2, 2, 2, 2, 2,  2];
mapOrigin[2] = map2;
var map3 = map2;
//var map3 = 
var stage = new Array(10);
stage[0] = new Stage(map0, 2, 6, 862, 320, 1);
stage[1] = new Stage(map1, 2, 3, 30, 128, 2);
stage[2] = new Stage(map2, 1, 18, 510, 570, 3);
stage[3] = new Stage(map3, 1, 18, 510, 570, 3);
map2.showMap();

/* キャンバスの準備 */
getCanvasCtx();
/* 画像の準備 */
getImg();
/* インスタンス化 */
getInstance();
/* ゲームループ関数 */ 
gameLoop();

/* ゲームループ関数 */
function gameLoop() {
    clearAll();
    /*
    if (op) {
        opAnimation();
    } else if (tutorial) {
        tutorialMovie();
    } else if (gameStart) {
        console.log("game started.");
        stage[area].init();
        stage[area].draw();
    }*/
    drawBackground(backImg1);
    saveAll();
    translateOffset(map0);
    rotate();
    if (frameCount == 0) {
        stage[area].init();
        console.log(stage[area]);
    }
    stage[area].draw();
    if (player.count == 0) {
       goal.draw();
       goal.update();
    }
    player.judge(stage[area].map);
    player.draw();
    player.update();
    restoreAll();
    if (player.stat != "clear" && player.stat != "over") {
        timerUpdate();    
    }
    getTime(timer);

    frameCount++;

    if (player.stat == "clear") {
        save(layer3);
        layer3.globalAlpha = 0.5;
        layer3.fillStyle = "black";
        layer3.fillRect(0, 0, gameScreenX, gameScreenY);
        restore(layer3);
        topLayer.drawImage(gameclearImg, 260, 200);
        if (gameStart) {
            console.log("next stage.");
            frameCount = 0;
            area++;
            if (area > stageMax) {
                area = 1;
            }
        }
    }
    if (player.stat == "over") {
        save(layer3);
        layer3.globalAlpha = 0.5;
        layer3.fillStyle = "black";
        layer3.fillRect(0, 0, gameScreenX, gameScreenY);
        topLayer.drawImage(gameoverImg, 260, 200);
        restore(layer3);
        if (gameStart) {
            console.log("retry this stage.");
            frameCount = 0;
            stage[area].map = mapOrigin[area];
            console.log(mapOrigin[area]);
        }
    }

    rAF(gameLoop);
}

function getCanvasCtx() {
    canvas0 = $("canvas0");
    layer0 = canvas0.getContext("2d");
    canvas1 = $("canvas1");
    layer1 = canvas1.getContext("2d");
    canvas2 = $("canvas2");
    layer2 = canvas2.getContext("2d");
    canvas3 = $("canvas3");
    layer3 = canvas3.getContext("2d");
    topCanvas = $("topCanvas");
    topLayer = topCanvas.getContext("2d");
}

function getImg() {
    backImg1 = $("backImg1");
    birdImg = $("birdImg");
    cowImg = $("cowImg");
    dogImg = $("dogImg");
    dragonImg = $("dragonImg");
    horseImg = $("horseImg");
    monkeyImg = $("monkeyImg");
    mouseImg = $("mouseImg");
    rabbitImg = $("rabbitImg");
    sheepImg = $("sheepImg");
    snakeImg = $("snakeImg");
    tigerImg = $("tigerImg");
    wildBoarImg = $("wildBoarImg");
    doorImg = $("doorImg");
    blocksImg = $("blocksImg");
    grassFloorImg = $("grassFloorImg");
    cheeseImg = $("cheeseImg");
    cheesePoisonImg = $("cheesePoisonImg");
    carrotImg = $("carrotImg");
    goalImg = $("goalImg");
    titleImg = $("titleImg");
    textWindowImg = $("textWindowImg");
    hiraganaImg = $("hiraganaImg");
    katakanaImg = $("katakanaImg");
    timeWindowImg = $("timeWindowImg");
    gameoverImg = $("gameoverImg");
    gameclearImg = $("gameclearImg");
}

function getInstance() {
    // 画像連想配列用意
    img["bird"] = birdImg;
    img["cow"] = cowImg;
    img["dog"] = dogImg;
    img["dragon"] = dragonImg;
    img["horse"] = horseImg;
    img["monkey"] = monkeyImg;
    img["mouse"] = mouseImg;
    img["rabbit"] = rabbitImg;
    img["sheep"] = sheepImg;
    img["snake"] = snakeImg;
    img["tiger"] = tigerImg;
    img["wildBoar"] = wildBoarImg;
    player = new Eto(mouseImg);
    goal = new Effect(goalImg, 128, 64, 6);
    title = new System(titleImg);
    textWindow = new System(textWindowImg);
    timeWindow = new System(timeWindowImg);
}

/* コンストラクタ */
/* ステージコンストラクタ */
function Stage(map, px, py, gx, gy, count) {
    this.map = map;
    this.px = px;
    this.py = py;
    this.gx = gx;
    this.gy = gy;
    this.count = count;

    this.init = function() {
        player.px = this.px;
        player.py = this.py;
        player.x = mapE * player.px;
        player.y = mapE * player.py;
        player.vx = 4;
        player.vy = 0;
        player.changeStat("stop");
        player.rev = false;
        player.count = this.count;
        goal.x = this.gx;
        goal.y = this.gy;

        offsetX = offsetY = 0;
        canvasDegree = 0;
        releaseIphoneEvent = true;
        gameStart = false;
    }
    this.draw = function() {
        var x = 0;
        var y = 0;
        var img;
        var imgX, imgY;

        for (var i = 0; i < this.map.col.length; i++) {
            y = i * mapE;
            for (var j = 0; j < this.map.col[i].length; j++) {
                if (this.map.col[i][j] != 0) {
                    x = j * mapE;
                    switch (this.map.col[i][j]) {
                        case 1://茶ブロック
                            img = blocksImg;
                            imgX = 0;
                            imgY = 0;
                            break;
                        case 2://青ブロック
                            img = blocksImg;
                            imgX = mapE;
                            imgY = 0;
                            break;
                        case 3://緑ブロック
                            img = blocksImg;
                            imgX = mapE * 2;
                            imgY = 0;
                            break;
                        case 4://黄ブロック
                            img = blocksImg;
                            imgX = mapE * 3;
                            imgY = 0;
                            break;
                        case 5://赤ブロック
                            img = blocksImg;
                            imgX = mapE * 4;
                            imgY = 0;
                            break;
                        case 6://地面A
                            img = grassFloorImg;
                            imgX = 0;
                            imgY = 0;
                            break;
                        case 7://地面B
                            img = grassFloorImg;
                            imgX = mapE;
                            imgY = 0;
                            break;
                        case 8://地面C
                            img = grassFloorImg;
                            imgX = mapE * 2;
                            imgY = 0;
                            break;
                        case 9://地面D
                            img = grassFloorImg;
                            imgX = mapE * 3;
                            imgY = 0;
                            break;
                        case 10://チーズ
                            img = cheeseImg;
                            imgX = 0;
                            imgY = 0;
                            break;
                        case 11://ニンジン
                            img = carrotImg;
                            imgX = 0;
                            imgY = 0;
                            break;
                        case 12://ゴール上半分
                            img = doorImg;
                            imgX = 0;
                            imgY = 0;
                            break;
                        case 13://ゴール下半分
                            img = doorImg;
                            imgX = 0;
                            imgY = mapE;
                            break;
                        case 14://ドクチーズ
                            img = cheesePoisonImg;
                            imgX = 0;
                            imgY = 0;
                            break;
                        default:
                            break;
                    }
                    layer2.drawImage(img, imgX, imgY, mapE, mapE,
                            x, y, mapE, mapE);
                }
            }
        }
    }
}
/* マップコンストラクタ */
function Map(name) {
    this.name = name;
    this.sizeX;
    this.sizeY;
    // マップ2次元配列の1次行配列
    this.col;

    this.init = function(col, row) {
        this.col = new Array(col);
        for (var i = 0; i < col; i++) {
            this.col[i] = new Array(row);
        }
        this.sizeX = row * mapE;
        this.sizeY = col * mapE;
    }
    this.showMap = function() {
        for (var i = 0; i < this.col.length; i++) {
            console.log(this.name + ".col[" + i + "] = " + this.col[i]);
        }
    }
}

/* 干支コンストラクタ */
function Eto(image) {
    // 座標系
    this.x;
    this.y;
    this.vx = 0;
    this.vy = 0;
    this.px;
    this.py;
    // 属性 "stop", "move", "clear", "over", "fall"
    this.stat = "stop";
    // フラグ
    this.rev = false;
    this.fall = false;
    // クリア条件
    this.count;
    // 画像
    this.image = image;

    /* アニメーションに用いる画像番号 */
    var imgNumberX = 0;
    var imgNumberY = 0;
    /* アニメーションに用いる画像を切り取る位置のx座標 */
    var imgX = 0;
    var imgY = 0;
    /* 各アニメーションのシーン数 */
    var stopSeen = 8;
    var moveSeen = 8;
    var clearSeen = 8;
    var overSeen = 8;

    this.judge = function(map) {
        var right, rx, ry;
        var left, lx, ly;
        var down, dx, dy;

        switch (canvasDegree) {
            case 0:
                // x座標当たり判定(右->左の順)
                rx = this.px + 1;
                ry = this.py;
                right = map.col[ry][rx];
                lx = this.px - 1;
                ly = this.py;
                left = map.col[ly][lx];
                if (right > 0 && right < 10) { // 当たり判定(右優占)
                    if (!this.rev) {
                        if (rx * mapE <= this.x + charaSizeX - 16) {
                            this.rev = true;
                            this.vx = -this.vx;
                        }
                    }
                } else if (left > 0 && left < 10) {
                    if (this.rev) {
                        if (this.x + 16 <= (lx + 1) * mapE) {
                            this.rev = false;
                            this.vx = -this.vx;
                        }
                    }
                }
                // y座標落下判定
                dx = this.px;
                dy = this.py + 1;
                down = map.col[dy][dx];
                if (down == 0 || down > 9) { // このとき落下し始めるかどうか判定
                    if (!this.rev) {
                        if (dx * mapE <= this.x + 16) {
                            this.changeStat("stop");
                            this.fall = true;
                            this.vy = g;
                        }
                    } else {
                        if (this.x + charaSizeX - 16 <= (dx + 1) * mapE) {
                            this.changeStat("stop");
                            this.fall = true;
                            this.vy = g;
                        }
                    }
                }
                if (down > 0 && down < 10) {// このとき止まるかどうか判定
                    if (dy * mapE <= this.y + charaSizeY) {
                        if (this.fall) {
                            if (autoMove) {
                                this.changeStat("move");
                            }
                            this.fall = false;
                        }
                        this.y = (dy - 1) * mapE;
                        this.vy = 0;
                    } else {
                        this.fall = true;
                        this.vy = g;
                    }
                }
                var cx = this.px;
                var cy = this.py;
                current = map.col[cy][cx];
                if (current == 10 || current == 11) {//アイテム取得
                    map.col[cy][cx] = 0;
                    this.count--;
                    sound("item_sound");
                }
                if (current == 14) {//ドクチーズ取得
                    this.changeStat("over");
                    releaseIphoneEvent = false;
                }
                // クリア可能判定
                if (current == 13 && this.count == 0) {
                    if (!this.rev) {
                        if (this.x >= cx * mapE) {
                            if (this.stat != "clear") {
                                this.changeStat("clear");
                            }
                        }
                    } else {
                        if (this.x + charaSizeX <= (cx + 1) * mapE) {
                            if (this.stat != "clear") {
                                this.changeStat("clear");
                            }
                        }
                    }
                }
                break;
            case 90:
                // x座標当たり判定
                rx = this.px;
                ry = this.py - 1;
                right = map.col[ry][rx];
                lx = this.px;
                ly = this.py + 1;
                left = map.col[ly][lx];
                if (right > 0 && right < 10) { // 当たり判定(右優占)
                    if (!this.rev) {
                        if ((ry + 1) * mapE >= this.y + 16) {
                            this.rev = true;
                            this.vx = -this.vx;
                        }
                    }
                } else if (left > 0 && left < 10) {
                    if (this.rev) {
                        if (this.y + charaSizeY - 16 >= ly * mapE) {
                            this.rev = false;
                            this.vx = -this.vx;
                        }
                    }
                }
                // y座標落下判定
                dx = this.px + 1;
                dy = this.py;
                down = map.col[dy][dx];
                if (down == 0 || down > 9) { // このとき落下し始めるかどうか判定
                    if (!this.rev) {
                        if ((dy + 1) * mapE >=
                                this.y + charaSizeY - 16) {
                            this.changeStat("stop");
                            this.fall = true;
                            this.vy = g;
                        }
                    } else {
                        if (this.y + 16 >= dy * mapE) {
                            this.changeStat("stop");
                            this.fall = true;
                            this.vy = g;
                        }
                    }
                }
                if (down > 0 && down < 10) {//このとき止まるかどうか判定
                    if (this.x + charaSizeX >= dx * mapE) {
                        if (this.fall) {
                            if (autoMove) {
                                this.changeStat("move");
                            }
                            this.fall = false;
                        }
                        this.x = (dx - 1) * mapE;
                        this.vy = 0;
                    } else {
                        this.fall = true;
                        this.vy = g;
                    }
                }
                // クリア可能判定
                var cx = this.px;
                var cy = this.py;
                current = map.col[cy][cx];
                if (current == 10 || current == 11) {//アイテム取得
                    map.col[cy][cx] = 0;
                    this.count--;
                    sound("item_sound");
                }
                if (current == 14) {//ドクチーズ取得
                    this.changeStat("over");
                    releaseIphoneEvent = false;
                }
                if (current == 13 && this.count == 0) {
                    if (!this.rev) {
                        if (this.y <= cy * mapE) {
                            if (this.stat != "clear") {
                                this.changeStat("clear");
                            }
                        }
                    } else {
                        if (this.y + charaSizeY >= (cy + 1) * mapE) {
                            if (this.stat != "clear") {
                                this.changeStat("clear");
                            }
                        }
                    }
                }
                break;
            case -90:
                // x座標当たり判定
                rx = this.px;
                ry = this.py + 1;
                right = map.col[ry][rx];
                lx = this.px;
                ly = this.py - 1;
                left = map.col[ly][lx];
                if (right > 0 && right < 10) { // 当たり判定(右優占)
                    if (!this.rev) {
                        if (ry * mapE <= this.y + charaSizeY -16) {
                            this.rev = true;
                            this.vx = -this.vx;
                        }
                    }
                } else if (left > 0 && left < 10) {
                    if (this.rev) {
                        if (this.y + 16 <= (ly + 1) * mapE) {
                            this.rev = false;
                            this.vx = -this.vx;
                        }
                    }
                }
                // y座標落下判定
                dx = this.px - 1;
                dy = this.py;
                down = map.col[dy][dx];
                if (down == 0 || down > 9) { // このとき落下し始めるかどうか判定
                    if (!this.rev) {
                        if (dy * mapE <= this.y + 16) {
                            this.changeStat("stop");
                            this.fall = true;
                            this.vy = g;
                        }
                    } else {
                        if (this.y + charaSizeY - 16 <=
                                (dy + 1) * mapE) {
                            this.changeStat("stop");
                            this.fall = true;
                            this.vy = g;
                        }
                    }
                }
                if (down > 0 && down < 10) {//このとき止まるかどうか判定
                    if (this.x <= (dx + 1) * mapE) {
                        if (this.fall) {
                            if (autoMove) {
                                this.changeStat("move");
                            }
                            this.fall = false;
                        }
                        this.x = (dx + 1) * mapE;
                        this.vy = 0;
                    } else {
                        this.fall = true;
                        this.vy = g;
                    }
                }
                // クリア可能判定
                var cx = this.px;
                var cy = this.py;
                current = map.col[cy][cx];
                if (current == 10 || current == 11) {//アイテム取得
                    map.col[cy][cx] = 0;
                    this.count--;
                    sound("item_sound");
                }
                if (current == 14) {//ドクチーズ取得
                    this.changeStat("over");
                    releaseIphoneEvent = false;
                }
                if (current == 13 && this.count == 0) {
                    if (!this.rev) {
                        if (this.y >= cy * mapE) {
                            if (this.stat != "clear") {
                                this.changeStat("clear");
                            }
                        }
                    } else {
                        if (this.y + charaSizeY <= (cy + 1) * mapE) {
                            if (this.stat != "clear") {
                                this.changeStat("clear");
                            }
                        }
                    }
                }
                break;
        }
    }
    this.draw = function() {
        save(layer2);
        layer2.translate(player.x + charaSizeX / 2,
                player.y + charaSizeY / 2);
        layer2.rotate(-canvasDegree * Math.PI / 180);
        layer2.translate(-player.x - charaSizeX / 2,
                -player.y - charaSizeY / 2);
        if (!this.rev) {
            layer2.drawImage(this.image, imgX, imgY, 
                    charaSizeX, charaSizeY, this.x, this.y, 
                    charaSizeX, charaSizeY);
        } else {
            var x, y;
            // 反転座標用の座標を求める
            x = -this.x - 64;
            y = this.y;
            save(layer2);
            layer2.scale(-1, 1);
            layer2.drawImage(this.image, imgX, imgY, 
                    charaSizeX, charaSizeY, x, y, 
                    charaSizeX, charaSizeY);
            restore(layer2);
        }
        restore(layer2);
    }
    this.update = function() {
        // アニメーションと座標(stop, move時のみ)の更新
        if (this.stat == "stop") {
            if (frameCount % 10 == 0) {
                imgNumberX++;
                if (imgNumberX > stopSeen) {
                    imgNumberX = 0;
                } 
            }
            // 重力方向の座標更新
            switch (canvasDegree) {
                case 0:
                    this.y += this.vy;
                    break;
                case 90:
                    this.x += this.vy;
                    break;
                case -90:
                    this.x -= this.vy;
                    break;
            }
        } else if (this.stat == "move") {
            if (frameCount % 6 == 0) {
                imgNumberX++;
                if (imgNumberX > moveSeen) {
                    imgNumberX = 0;
                }
            }
            // 運動方向の座標の更新
            switch (canvasDegree) {
                case 0:
                    this.x += this.vx;
                    break;
                case 90:
                    this.y -= this.vx;
                    break;
                case -90:
                    this.y += this.vx;
                    break;
            }
        } else if (this.stat == "clear") {
            if (frameCount % 10 == 0) {
                imgNumberX++;
                if (imgNumberX > clearSeen) {
                    imgNumberX = 0;
                }
            }
            releaseIphoneEvent = false;
        } else if (this.stat == "over") {
            if (frameCount % 30 == 0) {
                imgNumberX++;
                if (imgNumberX > overSeen) {
                    imgNumberX = 0;
                }
            }
        } else {
            console.log("ERROR: the status is unexpected value.");
        }
        imgX = charaSizeX * imgNumberX;

        // プレイヤーのいるマップ番号の更新
        this.px = Math.round(this.x / mapE);
        this.py = Math.round(this.y / mapE);
    }
    var beforeStat = "stop";
    this.changeStat = function(stat) {
        this.stat = stat;

        // アニメーション番号の初期化
        imgX = 0;
        if (stat == "stop") {
            imgY = 0;
        } else if (stat == "move") {
            imgY = charaSizeY;
        } else if (stat == "clear") {
            imgY = charaSizeY * 2;
        } else if (stat == "over") {
            imgY = charaSizeY * 3;
        } else {
            console.log("ERROR: the unexpected argument of function changeStat();");
        }

        if (beforeStat != stat) {
            socket.json.emit('chara_stat', {
                room: room_name,
                stat: stat
            });
            beforeStat = stat;
        }
    }
}
/* エフェクトコンストラクタ */
function Effect(_image, _sizeX, _sizeY, _seen) {
    this.x;
    this.y;

    var sizeX = _sizeX;
    var sizeY = _sizeY;
    var seen = _seen - 1;
    var image = _image;
    var imgNumber = 0;
    var imgX = 0;

    this.update = function() {
        if (frameCount % 5 == 0) {
            imgNumber++;
        }
        if (imgNumber > seen) {
            imgNumber = 0;
        }
        imgX = sizeX * imgNumber;
    }
    this.draw = function() {
        layer3.drawImage(image, imgX, 0,
                sizeX, sizeY, this.x, this.y,
                sizeX, sizeY);
    }
}
/* システムコンストラクタ */
function System(_image) {
    this.x;
    this.y;

    var image = _image;

    this.draw = function() {
        topLayer.drawImage(image, this.x, this.y);
    }
}

// idで要素取得
function $(id) {
    return document.getElementById(id);
}

/* ゲーム画面のクリア(レイヤー指定) */
function clear(layer) {
    layer.clearRect(0, 0, gameScreenX, gameScreenY);
}

/* ゲーム画面のクリア(一括) */
function clearAll() {
    layer1.clearRect(0, 0, gameScreenX, gameScreenY);
    layer2.clearRect(0, 0, gameScreenX, gameScreenY);
    layer3.clearRect(0, 0, gameScreenX, gameScreenY);
    topLayer.clearRect(0, 0, gameScreenX, gameScreenY);
}
/* レイヤーのセーブ(レイヤー指定) */
function save(layer) {
    layer.save();
}
/* レイヤーのセーブ(一括) */
function saveAll() {
    layer1.save();
    layer2.save();
    layer3.save();
    topLayer.save();
}
/* レイヤーのリストア(レイヤー指定) */
function restore(layer) {
    layer.restore();
}
/* レイヤーのリストア(一括) */
function restoreAll() {
    layer1.restore();
    layer2.restore();
    layer3.restore();
    topLayer.restore();
}

/* ブロック背景描画 */
function drawBackground(img) {
    layer0.drawImage(img, 0, 0);
}

/* オープニングアニメーション */
var chapter;
var i = -1; // カウンター
function opAnimation() {
    if (i < 0) {
        initOpAnimation();
    }
    switch (chapter) {
        case 0: // キャラが画面中央まで走ってくる
            if (player.x < (gameScreenX / 2) - (charaSizeX / 2)) {
                player.x += 4;
            } else {
                chapter++;
            }
            player.draw();
            player.update();
            break;
        case 1: // タイトルがカットインしてくる
            if (title.x > player.x + charaSizeX) {
                title.x -= 4;
                title.draw();
            } else {
                chapter++;
            }
            player.draw();
            player.update();
            break;
        case 2: // キャラとタイトルがぶつかる
            player.changeStat("over");
            title.draw();
            player.draw();
            chapter++;
            break;
        case 3: // キャラが跳ね飛ばされるアニメ
            if (i < 8) {
                player.x -= 5;
                player.y -= 3;
                i++;
            } else if (i < 16) {
                player.x -= 5;
                player.y += 3;
                i++;
            } else if (i < 19) {
                player.x -= 3;
                player.y -= 3;
                i++;
            } else if (i < 22) {
                player.x -= 3;
                player.y += 3;
                i++;
            } else {
                chapter++;
                i = 0;
            }
            title.draw();
            player.draw();
            break;
        case 4: // 次のアニメーションまで待機
            title.draw();
            player.draw();
            i++;
            if (i > 29) {
                chapter++;
                i = 0;
            }
            break;
        case 5: // キャラがフェードアウト
            if (i % 10 == 0) {
                layer2.globalAlpha -= 0.2;
                topLayer.globalAlpha -= 0.2;
            }
            title.draw();
            player.draw();
            i++;
            if (i > 149) {
                i = 0;
                chapter++;
                layer2.globalAlpha = 1.0;
                topLayer.globalAlpha = 1.0;
            }
            break;
        case 6:
            if (i == 0) {
                layer1.globalAlpha = 1.0;
                player.changeStat("stop");
                player.x = (gameScreenX / 2) - (charaSizeX / 2);
                player.y = (gameScreenY - charaSizeY * 2);
                title.x = 200;
                title.y = -127;
                i++;
            }
            drawBackground(backImg1);
            opStage.draw();
            player.draw();
            player.update();
            title.draw();
            if (title.y < 100) {
                title.y += 4;
            } else {
                chapter++;
                i = 0;
            }
            break;
        case 7: // タイトル画面
            drawBackground(backImg1);
            opStage.draw();
            title.draw();
            player.draw();
            player.update();
            break;
    }
}
function initOpAnimation() {
    clearAll();
    player.rev = false;
    player.changeStat("move");
    player.x = -charaSizeX;
    player.y = (gameScreenY / 2) - (charaSizeY / 2);
    title.x = gameScreenX;
    title.y = (gameScreenY / 2) - charaSizeY;
    layer1.globalAlpha = 1.0;
    chapter = 0;
    i = 0;
}
function goToTutorial() {
    clearAll();
    op = false;
    tutorial = true;
    frameCount = 0;
}

function tutorialMovie() {//チュートリアル
    clearAll();

    if (frameCount == 0) {
        initTutorial();
    }

    switch (textNumber) {
        case 0:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("ゲームのあそびかたをせつめいするよ！1");
            if (frameCount > 100) {
                textNumber++;
                player.changeStat("move");
            }
            break;
        case 1:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("タップをするとうごくよ！2");
            if (player.px > 5) {
                textNumber++;
                frameCount = 0;
                player.changeStat("stop");
            }
            break;
        case 2:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("もういちどタップをするととまるんだ！3");
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
            }
            break;
        case 3:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("これがたべものだよ！3");
            topLayer.strokeStyle = "red";
            topLayer.strokeRect(448, 384, 64, 64);
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
            }
            break;
        case 4:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("これがゴールだよ！4");
            topLayer.strokeRect(896, 320, 64, 128);
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
            }
            break;
        case 5:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("たべものをぜんぶあつめないとゴールできないからちゅういしてね！5");
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
            }
            break;
        case 6:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("ゴールできるようになるとこのもじがでるよ！6");
            topLayer.strokeRect(862, 320, 128, 64);
            goal.draw();
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
            }
            break;
        case 7:
            stage[0].draw();
            drawPlayer();
            textWindow.draw();
            drawText("アイフォンをかたむけると...！7");
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
                dDegree = -90;
            }
            break;
        case 8:
            textWindow.draw();
            drawText("なんとステージがかいてんするんだ！8");
            saveAll();
            translateOffset(map0);
            rotate();
            stage[0].draw();
            drawPlayer();
            restoreAll();
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
                dDegree = 0;
            }
            break;
        case 9:
            saveAll();
            translateOffset(map0);
            rotate();
            stage[0].draw();
            drawPlayer();
            restoreAll();
            textWindow.draw();
            drawText("いけそうにないゴールがあっても9");
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
                player.changeStat("move");
                player.vx = 5;
            }
            break;
        case 10:
            saveAll();
            translateOffset(map0);
            rotate();
            stage[0].draw();
            drawPlayer();
            if (player.count == 0) {
                goal.draw();
                goal.update();
            }
            restoreAll();
            textWindow.draw();
            drawText("かいてんしたらいけるようになるかも！10");
            if (frameCount > 100) {
                frameCount = 0;
                textNumber++;
            }
            break;
        case 11:
            saveAll();
            translateOffset(map0);
            rotate();
            stage[0].draw();
            drawPlayer();
            if (player.count == 0) {
                goal.draw();
                goal.update();
            }
            restoreAll();
            textWindow.draw();
            drawText("それじゃあがんばってゴールをめざしてね！11");
            if (frameCount > 300) {
                textNumber++;
            }
            break;
        default:
            console.log("gameStart is true.");
            gameStart = true;
            break;
    }
}
function initTutorial() {
    goal.x = 862;
    goal.y = 320;
    textWindow.x = 192;
    textWindow.y = 64;
    player.px = 2;
    player.py = 6;
    player.x = mapE * player.px;
    player.y = mapE * player.py;
    player.vx = 2;
    player.changeStat("stop");
    player.rev = false;
    player.count = 1;
    offsetX = offsetY = 0;
}
function drawPlayer() {
    player.judge(map0);
    player.draw();
    player.update();
}
function translateOffset(map) {
    var minX, maxX;
    var minY, maxY;

    switch (canvasDegree) {
        case 0:
            minX = 320;
            maxX = gameScreenX - 320;
            maxY = gameScreenY - 64;
            break;
        case 90:
            maxY = gameScreenY - 64;
            minY = 64;
            maxX = gameScreenY + 192;
            break;
        case -90:
            minY = 64;
            maxY = gameScreenY - 64;
            minX = gameScreenY - 192;
            break;
    }
    // x座標方向のスクロール
    if (player.x + charaSizeX > offsetX + maxX) {
        offsetX += player.x + charaSizeX - (offsetX + maxX);
    }
    if (player.x < offsetX + minX) {
        offsetX -= offsetX + minX - player.x;
    }
    // y座標方向のスクロール
    if (player.y + charaSizeY > offsetY + maxY) {
        offsetY += player.y + charaSizeY - (offsetY + maxY);
    }
    if (player.y < offsetY + minY) {
        offsetY -= offsetY + minY - player.y;
    }
    layer1.translate(-offsetX, -offsetY);
    layer2.translate(-offsetX, -offsetY);
    layer3.translate(-offsetX, -offsetY);
}
function changeDegree(degree) {
    if (canvasDegree != degree) {
        dDegree = degree;
    }
}
function rotate() {
    if (canvasDegree < dDegree) {
        canvasDegree += 3;
        player.changeStat("stop");
    } else if (canvasDegree > dDegree) {
        canvasDegree -= 3;
        player.changeStat("stop");
    }

    layer1.translate((gameScreenX / 2) + offsetX,
            (gameScreenY / 2) + offsetY);
    layer1.rotate(canvasDegree * Math.PI / 180);
    layer2.translate((gameScreenX / 2) + offsetX,
            (gameScreenY / 2) + offsetY);
    layer2.rotate(canvasDegree * Math.PI / 180);
    layer3.translate((gameScreenX / 2) + offsetX,
            (gameScreenY / 2) + offsetY);
    layer3.rotate(canvasDegree * Math.PI / 180);
    layer3.translate(-((gameScreenX / 2) + offsetX),
            -((gameScreenY / 2) + offsetY));
    layer2.translate(-((gameScreenX / 2) + offsetX),
            -((gameScreenY / 2) + offsetY));
    layer1.translate(-((gameScreenX / 2) + offsetX),
            -((gameScreenY / 2) + offsetY));
}
function timerUpdate() {
    if (frameCount % 30 == 0 && timer > 0) {
        timer--;
    }
    if (timer == 0) {
        player.changeStat("over");
    }
    //getTime(timer);
}

function getTime(time) {
    var i = time;
    var rate = 60;
    var min = 0;
    var sec = 0;

    while (i >= 60) {
        i -= rate;
        min++;
    }
    sec = time % rate;

    // 求めた分と秒をstringにキャスト
    if (min < 10) {
        min = "0" + String(min);
    } else {
        min = String(min);
    }
    if (sec < 10) {
        sec = "0" + String(sec);
    } else {
        sec = String(sec);
    }

    topLayer.drawImage(timeWindowImg, 10, 10);
    save(topLayer);
    topLayer.translate(-190, 0);
    drawText(min);
    topLayer.translate(130, 0);
    drawText(sec);
    restore(topLayer);
}
function start_stop() {
    if (player.stat == "stop") {
        player.changeStat("move");
    } else if (player.stat == "move") {
        player.changeStat("stop");
    }
    console.log("start_stop event listener worked.");
}
function next() {
    gameStart = true;
}
// iPhoneのイベント
//接続が切れたときのダイアログ表示  
socket.on('emit_disconnect', function() {
    sound('dialog_sound');
    
    $('#error_connecting').dialog({
        autoOpen: false,
        buttons:{
            "OK" : function(){
            $(this).dialog('close');
            location.reload();
            }
        },
        title: "接続に関するエラー",
        modal: true
    });
    $('#error_connecting').dialog('open');
});

socket.on('up_vol_return', function() {
    up_volume();
});

socket.on('down_vol_return', function() {
    down_volume();
});

socket.on('iphone_direction_return', function(data) {
    if (releaseIphoneEvent) {
        changeDegree(-data);
    }
    console.log(data);
});

socket.on('touch_return', function() {
    if (releaseIphoneEvent) {
        start_stop();
    } else {
        next();
    }
});

socket.on('chara_change_return', function(data) {
    if (releaseIphoneEvent) {
        player.image = img[data];
        player.changeStat("stop");
        sound("chara_change_sound");
    }
});

//音の切り替え
music_1.pause();
music_2.play();

function drawText(text) {
    var x = 215;
    var y = 70;
    var imgX, imgY;
    var sizeX = 966;
    var sizeY = 246;
    var offsetX = 48;
    var offsetY = 48;
    var chSizeX = 48;
    var chSizeY = 48;
    var hira;
    var number = 11;

    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        if (ch == "あ") {
            imgX = sizeX - chSizeX;
            imgY = 0;
            hira = true;
        }
        if (ch == "い") {
            imgX = sizeX - chSizeX;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "う") {
            imgX = sizeX - chSizeX;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "え") {
            imgX = sizeX - chSizeX;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "お") {
            imgX = sizeX - chSizeX;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "か") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = 0;
            hira = true;
        }
        if (ch == "き") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "く") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "け") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "こ") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "さ") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = 0;
            hira = true;
        }
        if (ch == "し") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "す") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "せ") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "そ") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "た") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = 0;
            hira = true;
        }
        if (ch == "ち") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "つ") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "て") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "と") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "な") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = 0;
            hira = true;
        }
        if (ch == "に") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ぬ") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "ね") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "の") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "は") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = 0;
            hira = true;
        }
        if (ch == "ひ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ふ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "へ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ほ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "ま") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = 0;
            hira = true;
        }
        if (ch == "み") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "む") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "め") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "も") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "や") {
            imgX = sizeX - chSizeX - offsetX * 7;
            imgY = 0;
            hira = true;
        }
        if (ch == "ゆ") {
            imgX = sizeX - chSizeX - offsetX * 7;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "よ") {
            imgX = sizeX - chSizeX - offsetX * 7;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "ら") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = 0;
            hira = true;
        }
        if (ch == "り") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "る") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "れ") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ろ") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "わ") {
            imgX = sizeX - chSizeX - offsetX * 9;
            imgY = 0;
            hira = true;
        }
        if (ch == "を") {
            imgX = sizeX - chSizeX - offsetX * 9;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "ん") {
            imgX = sizeX - chSizeX - offsetX * 9;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "ぁ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = 0;
            hira = true;
        }
        if (ch == "ぃ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ぅ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "ぇ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ぉ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "ゃ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = 0;
            hira = true;
        }
        if (ch == "ゅ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ょ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "っ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "が") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = 0;
            hira = true;
        }
        if (ch == "ぎ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ぐ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "げ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ご") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "ざ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = 0;
            hira = true;
        }
        if (ch == "じ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ず") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "ぜ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ぞ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "だ") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = 0;
            hira = true;
        }
        if (ch == "ぢ") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "づ") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "で") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ど") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "ば") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = 0;
            hira = true;
        }
        if (ch == "び") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ぶ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "べ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ぼ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "ぱ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = 0;
            hira = true;
        }
        if (ch == "ぴ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ぷ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "ぺ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "ぽ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "0") {
            imgX = sizeX - chSizeX - offsetX * 17;
            imgY = 0;
            hira = true;
        }
        if (ch == "1") {
            imgX = sizeX - chSizeX - offsetX * 17;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "2") {
            imgX = sizeX - chSizeX - offsetX * 17;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "3") {
            imgX = sizeX - chSizeX - offsetX * 17;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "4") {
            imgX = sizeX - chSizeX - offsetX * 17;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "5") {
            imgX = sizeX - chSizeX - offsetX * 18;
            imgY = 0;
            hira = true;
        }
        if (ch == "6") {
            imgX = sizeX - chSizeX - offsetX * 18;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "7") {
            imgX = sizeX - chSizeX - offsetX * 18;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "8") {
            imgX = sizeX - chSizeX - offsetX * 18;
            imgY = offsetY * 3;
            hira = true;
        }
        if (ch == "9") {
            imgX = sizeX - chSizeX - offsetX * 18;
            imgY = offsetY * 4;
            hira = true;
        }
        if (ch == "。") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = 0;
            hira = true;
        }
        if (ch == "、") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = offsetY;
            hira = true;
        }
        if (ch == "ー") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = offsetY * 2;
            hira = true;
        }
        if (ch == "ア") {
            imgX = sizeX - chSizeX;
            imgY = 0;
            hira = false;
        }
        if (ch == "イ") {
            imgX = sizeX - chSizeX;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ウ") {
            imgX = sizeX - chSizeX;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "エ") {
            imgX = sizeX - chSizeX;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "オ") {
            imgX = sizeX - chSizeX;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "カ") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = 0;
            hira = false;
        }
        if (ch == "キ") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ク") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ケ") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "コ") {
            imgX = sizeX - chSizeX - offsetX;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "サ") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = 0;
            hira = false;
        }
        if (ch == "シ") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ス") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "セ") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ソ") {
            imgX = sizeX - chSizeX - offsetX * 2;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "タ") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = 0;
            hira = false;
        }
        if (ch == "チ") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ツ") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "テ") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ト") {
            imgX = sizeX - chSizeX - offsetX * 3;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ナ") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = 0;
            hira = false;
        }
        if (ch == "ニ") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ヌ") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ネ") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ノ") {
            imgX = sizeX - chSizeX - offsetX * 4;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ハ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = 0;
            hira = false;
        }
        if (ch == "ヒ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "フ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ヘ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ホ") {
            imgX = sizeX - chSizeX - offsetX * 5;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "マ") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = 0;
            hira = false;
        }
        if (ch == "ミ") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ム") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "メ") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "モ") {
            imgX = sizeX - chSizeX - offsetX * 6;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ヤ") {
            imgX = sizeX - chSizeX - offsetX * 7;
            imgY = 0;
            hira = false;
        }
        if (ch == "ユ") {
            imgX = sizeX - chSizeX - offsetX * 7;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ヨ") {
            imgX = sizeX - chSizeX - offsetX * 7;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ラ") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = 0;
            hira = false;
        }
        if (ch == "リ") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ル") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "レ") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ロ") {
            imgX = sizeX - chSizeX - offsetX * 8;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ワ") {
            imgX = sizeX - chSizeX - offsetX * 9;
            imgY = 0;
            hira = false;
        }
        if (ch == "ヲ") {
            imgX = sizeX - chSizeX - offsetX * 9;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ン") {
            imgX = sizeX - chSizeX - offsetX * 9;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ァ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = 0;
            hira = false;
        }
        if (ch == "ィ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ゥ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ェ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ォ") {
            imgX = sizeX - chSizeX - offsetX * 10;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ャ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = 0;
            hira = false;
        }
        if (ch == "ュ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ョ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ッ") {
            imgX = sizeX - chSizeX - offsetX * 11;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ガ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = 0;
            hira = false;
        }
        if (ch == "ギ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "グ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ゲ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ゴ") {
            imgX = sizeX - chSizeX - offsetX * 12;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ザ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = 0;
            hira = false;
        }
        if (ch == "ジ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ズ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ゼ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ゾ") {
            imgX = sizeX - chSizeX - offsetX * 13;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "ダ") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = 0;
            hira = false;
        }
        if (ch == "ヂ") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ヅ") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "デ") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ド") {
            imgX = sizeX - chSizeX - offsetX * 14;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "バ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = 0;
            hira = false;
        }
        if (ch == "ビ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "ブ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ベ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ボ") {
            imgX = sizeX - chSizeX - offsetX * 15;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "パ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = 0;
            hira = false;
        }
        if (ch == "ピ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY;
            hira = false;
        }
        if (ch == "プ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == "ペ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == "ポ") {
            imgX = sizeX - chSizeX - offsetX * 16;
            imgY = offsetY * 4;
            hira = false;
        }
        if (ch == "！") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = 0;
            hira = false;
        }
        if (ch == "？") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = offsetY;
            hira = false;
        }
        if (ch == ".") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = offsetY * 2;
            hira = false;
        }
        if (ch == ",") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = offsetY * 3;
            hira = false;
        }
        if (ch == ";") {
            imgX = sizeX - chSizeX - offsetX * 19;
            imgY = offsetY * 4;
            hira = false;
        }

        if (hira) {
            topLayer.drawImage(hiraganaImg, imgX, imgY, chSizeX, chSizeY,
                    x, y, chSizeX, chSizeY);
        } else {
            topLayer.drawImage(katakanaImg, imgX, imgY, chSizeX, chSizeY,
                    x, y, chSizeX, chSizeY);
        }
        x += chSizeX + 6;
        if ((i + 1) % number == 0) {
            x = 215;
            y += chSizeY + 6;
        }
    }
}
