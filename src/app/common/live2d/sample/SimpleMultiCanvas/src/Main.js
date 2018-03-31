var chara = [];
var canvas = [];
var i = 0;
var CAN_SIZE = 340;

// キャンバスボタン押下イベント
function button_click(){
    // キャンバス
    var ele = document.createElement('canvas');
    ele.id = "glcanvas" + i;
    document.getElementById('can').appendChild(ele);
    // 削除ボタン
    var delbtn = document.createElement('button');
    delbtn.id = "delbtn" + i;
    delbtn.setAttribute("onclick","canvas_del(" + ele.id + "," + delbtn.id + "," + i + ")");
    delbtn.innerHTML = "キャンバス削除";
    document.getElementById('can').appendChild(delbtn);
    // Canvasを取得する
    canvas[i] = document.getElementById(ele.id);
    canvas[i].width = canvas[i].height = CAN_SIZE;
    // Live2D生成
    chara[i] = new Simple(canvas[i], ele.id, i);
    i++;
}

// キャンバスと削除ボタン削除イベント
function canvas_del(canid, delbtnid, i) {
    chara[i].cancelAnimation();
    delete chara[i];
    delete canvas[i];
     Live2D.deleteBuffer(i);
    document.getElementById('can').removeChild(canid);
    document.getElementById('can').removeChild(delbtnid);
}

function live2d_dispose(){
    var charanm = chara.length;
    for(var i = 0; i < charanm; i++){
        if(typeof chara[i] != "undefined"){
            var glcanvas = document.getElementById("glcanvas" + i);
            var dlbtn = document.getElementById("delbtn" + i);
            canvas_del(glcanvas, dlbtn, i);            
        }
    }
    chara = [];
    canvas = [];
    Live2D.dispose();
}