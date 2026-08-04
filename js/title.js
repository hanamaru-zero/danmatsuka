// ==========================================
// 断末蚊
// title.js
// ==========================================


// タイトル描画
function drawTitle(){

    const title=document.getElementById("titleScreen");

    if(!title){
        return;
    }


    let difficultyHTML="";


    TITLE_DIFFICULTY_LIST.forEach(difficulty=>{

        difficultyHTML+=
        `<div class="difficultyItem" data-difficulty="${difficulty}">
            <span class="difficultyName">${difficulty}</span>
        </div>`;

    });


    title.innerHTML=
    `<div class="titleOption">
        <img
            class="uiIcon"
            src="image/icon/settings.png"
            alt="設定">
    </div>

    <div class="titleLogo">
        断 末 蚊
    </div>

    <div class="difficultyMenu">
        ${difficultyHTML}
    </div>

    <div class="titleMessage">
        <img src="image/mosquito.png" class="titleMosquito">
        <div class="titleTalk"></div>
    </div>

    <div class="titleButtonArea">
        <button class="gameButton startButton" type="button">
            スタート
        </button>
    </div>`;


    const startButton=
        document.querySelector(
            ".startButton"
        );


    if(startButton){

        startButton.addEventListener(
            "click",
            startGamePlay
        );

    }


    const optionButton=
        document.querySelector(
            ".titleOption"
        );


    if(optionButton){

        optionButton.addEventListener(
            "click",
            openOption
        );

    }


    updateTitleCursor();

    setTitleBackground();

    drawTitleHistory();

}



// 難易度表示更新
function updateTitleCursor(){

    const items=
        document.querySelectorAll(
            ".difficultyItem"
        );


    const talk=
        document.querySelector(
            ".titleTalk"
        );


    items.forEach((item,index)=>{


        const name=
            item.querySelector(
                ".difficultyName"
            );


        const difficulty=
            item.dataset.difficulty;


        if(index===titleCursorIndex){


            name.textContent=
                "▶ "+difficulty+" ◀";


            selectedDifficulty=
                difficulty;


            if(talk){

                talk.textContent=
                    DIFFICULTY_CONFIG[difficulty].dialogue;

            }


        }else{


            name.textContent=
                difficulty;


        }


    });

}

// タイトル背景固定
function setTitleBackground(){

    const background=
        document.getElementById(
            "background"
        );


    if(!background){
        return;
    }


    background.style.backgroundImage=
        `url("image/background/outside.webp")`;

}



// タイトル入力判定
function checkTitleTap(x,y){

    const gameArea=
        document.getElementById(
            "gameArea"
        );


    if(!gameArea){
        return;
    }


    document.querySelectorAll(".difficultyItem")
    .forEach((item,index)=>{


        const rect=
            getRelativeRect(
                item,
                gameArea
            );


        if(isPointInsideRect(x,y,rect)){


            titleCursorIndex=
                index;


            updateTitleCursor();


        }


    });


    const start=
        document.querySelector(
            ".startButton"
        );


    if(!start){
        return;
    }


    const startRect=
        getRelativeRect(
            start,
            gameArea
        );


    if(isPointInsideRect(x,y,startRect)){


        startGamePlay();


    }


}



// タイトル終了
function closeTitle(){

    const title=
        document.getElementById(
            "titleScreen"
        );


    if(!title){
        return;
    }


    title.innerHTML="";

}



// ゲーム開始
function startGamePlay(){

    closeTitle();

    applyDifficulty();

    startPlay();

}



// タイトル初期化
function initTitle(){

    titleCursorIndex=1;

    selectedDifficulty="NORMAL";

    drawTitle();

}



// タイトル遊び方表示
function drawTitleHistory(){

    const element=
        document.getElementById(
            "dialogueHistory"
        );


    if(!element){
        return;
    }


    element.innerHTML=
    `
    <div class="historyLine">
        ▼遊び方
    </div>
    <div class="historyLine">
        １．迫り来る蚊をタップして撃退しろ！
    </div>
    <div class="historyLine">
        ２．吸血を許すと「かゆみ」が蓄積するぞ！
    </div>
    <div class="historyLine">
        ３．♥が0になるか、吸血完了されると<br>
        　　ゲームオーバーだ！
    </div>
    <div class="historyLine">
        　
    </div>
    <div class="historyLine">
        ★初回通信量4.3Mbyte程度。以降の通信ほぼ無し。
    </div>
    `;

}