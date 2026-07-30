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

        difficulty+=
        "";

        difficultyHTML+=
        `<div class="difficultyItem" data-difficulty="${difficulty}">
            <span class="difficultyName">${difficulty}</span>
        </div>`;

    });

    title.innerHTML=
    `<div class="titleOption">
        ⚙
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
        <button class="gameButton" type="button">
            スタート
        </button>
    </div>`;

    const startButton=document.querySelector(".gameButton");

    if(startButton){
        startButton.addEventListener(
            "click",
            startGamePlay
        );
    }

    updateTitleCursor();
    setTitleBackground();
    drawTitleHistory();

}


// 難易度表示更新
function updateTitleCursor(){

    const items=document.querySelectorAll(".difficultyItem");
    const talk=document.querySelector(".titleTalk");

    items.forEach((item,index)=>{

        const name=item.querySelector(".difficultyName");
        const difficulty=item.dataset.difficulty;

        if(index===titleCursorIndex){

            name.textContent=
                "▶ "+difficulty+" ◀";

            selectedDifficulty=difficulty;

            if(talk){
                talk.textContent=
                    TITLE_CONFIG[difficulty].dialogue;
            }

        }else{

            name.textContent=difficulty;

        }

    });

}


// タイトル背景固定
function setTitleBackground(){

    const background=document.getElementById("background");

    if(!background){
        return;
    }

    background.style.backgroundImage=
        `url("image/background/outside.png")`;

}


// タイトル入力判定
function checkTitleTap(x,y){

    const gameArea=document.getElementById("gameArea");

    if(!gameArea){
        return;
    }

    document.querySelectorAll(".difficultyItem")
    .forEach((item,index)=>{

        const rect=getRelativeRect(
            item,
            gameArea
        );

        if(isPointInsideRect(x,y,rect)){

            titleCursorIndex=index;

            updateTitleCursor();

        }

    });

    const start=document.querySelector(".gameButton");

    if(!start){
        return;
    }

    const startRect=getRelativeRect(
        start,
        gameArea
    );

    if(isPointInsideRect(x,y,startRect)){

        startGamePlay();

    }

}


// タイトル終了
function closeTitle(){

    const title=document.getElementById("titleScreen");

    if(!title){
        return;
    }

    title.innerHTML="";

}


// ゲーム開始
function startGamePlay(){

    closeTitle();

    clearDialogueHistory();

    applyDifficulty();

    gameState=GAME_STATE.PLAYING;

    initMosquito();

}


// タイトル初期化
function initTitle(){

    titleCursorIndex=1;

    selectedDifficulty="NORMAL";

    drawTitle();

}