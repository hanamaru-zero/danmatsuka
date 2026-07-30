// ==========================================
// 断末蚊
// gameOver.js
// ==========================================

let gameOverTimer=0;
let gameOverButtonShown=false;
let blackFadeStarted=false;
let staffRollRequest=false;

const GAMEOVER_SETTINGS={
    buttonTime:500,
    blackFadeTime:2000,
    staffRollTime:8000
};


// ゲームオーバー開始
function startGameOver(){

    const screen=document.getElementById("gameOverScreen");
    if(!screen)return;

    screen.innerHTML="";
    screen.style.display="none";

    gameOverTimer=0;
    gameOverButtonShown=false;
    blackFadeStarted=false;
    staffRollRequest=false;

}


// ゲームオーバー更新
function updateGameOver(deltaTime){

    if(gameState!==GAME_STATE.GAMEOVER)return;

    gameOverTimer+=deltaTime;

    if(
        !gameOverButtonShown &&
        gameOverTimer>=GAMEOVER_SETTINGS.buttonTime
    ){
        showGameOverButton();
    }


    if(
        !blackFadeStarted &&
        gameOverTimer>=5000
    ){
        startGameOverBlackFade();
    }


    if(
        !staffRollRequest &&
        gameOverTimer>=5000+GAMEOVER_SETTINGS.blackFadeTime+1000
    ){
        staffRollRequest=true;
        startStaffRoll();
    }

}


// 黒フェード開始
function startGameOverBlackFade(){

    blackFadeStarted=true;

    const fade=document.getElementById("fadeLayer");

    if(!fade)return;

    fade.className="fadeBlack";

}


// ボタン表示
function showGameOverButton(){

    const screen=document.getElementById("gameOverScreen");
    if(!screen)return;


    screen.innerHTML=
    `
    <div class="gameOverTitle">
        GAME OVER
    </div>

    <button class="gameButton"
            onclick="retryGame()">
        リトライ
    </button>

    <button class="gameButton"
            onclick="returnTitle()">
        タイトルへ戻る
    </button>
    `;


    screen.style.display="flex";

    gameOverButtonShown=true;

}


// ゲームオーバー非表示
function hideGameOver(){

    const screen=document.getElementById("gameOverScreen");
    const fade=document.getElementById("fadeLayer");


    if(screen){

        screen.innerHTML="";
        screen.style.display="none";

    }


    if(fade){

        fade.className="";

    }


    resetStaffRoll();

    gameOverTimer=0;
    gameOverButtonShown=false;
    blackFadeStarted=false;
    staffRollRequest=false;

}


// リトライ
function retryGame(){

    hideGameOver();

    resetGame();

}


// タイトルへ戻る
function returnTitle(){

    hideGameOver();

    clearGameObjects();

    gameState=GAME_STATE.TITLE;

    initTitle();

}