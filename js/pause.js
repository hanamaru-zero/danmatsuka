// ==========================================
// 断末蚊
// pause.js
// ==========================================

let pauseActive=false;


// ==========================================
// 一時停止アイコン更新
// ==========================================

function updatePauseIcon(){

    const icon=document.getElementById("pauseIcon");

    if(!icon){
        return;
    }

    if(pauseActive){

        icon.src="image/icon/play.png";
        icon.alt="再開";

    }else{

        icon.src="image/icon/pause.png";
        icon.alt="一時停止";

    }

}


// ==========================================
// 一時停止状態リセット
// ==========================================

function resetPause(){

    pauseActive=false;

    updatePauseIcon();


    const background=document.getElementById("background");

    if(background){

        background.classList.remove(
            "pauseBackground"
        );

    }

}


// ==========================================
// 一時停止切替
// ==========================================

function togglePause(){

    if(
        gameState!==GAME_STATE.PLAYING &&
        gameState!==GAME_STATE.PAUSE
    ){
        return;
    }


    if(pauseActive){

        resumeGame();

    }else{

        pauseGame();

    }

}


// ==========================================
// 一時停止
// ==========================================

function pauseGame(){

    pauseActive=true;

    gameState=GAME_STATE.PAUSE;


    playSE("confirm");


    updatePauseIcon();


    const background=document.getElementById("background");

    if(background){

        background.classList.add(
            "pauseBackground"
        );

    }


    showPauseMenu();

}


// ==========================================
// 再開
// ==========================================

function resumeGame(){

    pauseActive=false;

    gameState=GAME_STATE.PLAYING;


    playSE("confirm");


    updatePauseIcon();


    const background=document.getElementById("background");

    if(background){

        background.classList.remove(
            "pauseBackground"
        );

    }


    hidePauseMenu();

}


// ==========================================
// 一時停止メニュー表示
// ==========================================

function showPauseMenu(){

    const screen=document.getElementById("gameOverScreen");

    if(!screen){
        return;
    }


    screen.innerHTML=
    `
    <div class="pauseMenu">

        <div class="pauseTitle">
            PAUSE
        </div>

        <div class="gameButtonArea">

            <button class="gameButton"
                    onclick="resumeGame()">
                続ける
            </button>

            <button class="gameButton pauseRetryButton"
                    onclick="retryGame()">
                リトライ
            </button>

            <button class="gameButton"
                    onclick="returnTitle()">
                タイトルへ戻る
            </button>

        </div>

    </div>
    `;


    screen.style.display="flex";

}


// ==========================================
// 一時停止メニュー非表示
// ==========================================

function hidePauseMenu(){

    const screen=document.getElementById("gameOverScreen");

    if(screen){

        screen.innerHTML="";
        screen.style.display="none";

    }

}