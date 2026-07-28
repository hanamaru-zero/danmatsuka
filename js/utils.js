// ==========================================
// 断末蚊
// utils.js
// ==========================================


// ==========================================
// 抽選系
// ==========================================


// 重みづけ抽選
function weightedRandom(data){

    let totalWeight=0;

    for(const key in data){
        totalWeight+=data[key].weight;
    }


    let random=
        Math.random()*totalWeight;


    for(const key in data){

        random-=data[key].weight;

        if(random<=0){
            return key;
        }

    }


    return null;

}


// ==========================================
// 座標系
// ==========================================


// 親要素基準の座標取得
function getRelativeRect(element,parent){

    const rect=
        element.getBoundingClientRect();

    const parentRect=
        parent.getBoundingClientRect();


    return {
        left:
            rect.left-parentRect.left,

        top:
            rect.top-parentRect.top,

        width:
            rect.width,

        height:
            rect.height
    };

}


// 座標範囲判定
function isPointInsideRect(x,y,rect){

    return (
        x>=rect.left &&
        x<=rect.left+rect.width &&
        y>=rect.top &&
        y<=rect.top+rect.height
    );

}


// ==========================================
// 難易度設定
// ==========================================


// 難易度反映
function applyDifficulty(){

    const config=
        TITLE_CONFIG[selectedDifficulty];


    if(!config){
        return;
    }


    // 蚊の最大数変更
    GAME_SETTINGS.maxMosquito=
        config.mosquitoCount;


    // 背景変更
    const background=
        document.getElementById(
            "background"
        );


    if(background){

        background.style.backgroundImage=
            `url("${config.background}")`;

    }

}