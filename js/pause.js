// ==========================================
// 断末蚊
// pause.js
// ==========================================

let pauseActive=false;


// ==========================================
// 一時停止状態リセット
// ==========================================

function resetPause(){

    pauseActive=false;

    const button=
        document.getElementById(
            "pauseButton"
        );


    if(button){

        button.textContent="⏸";

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

    gameState=
        GAME_STATE.PAUSE;


    const button=
        document.getElementById(
            "pauseButton"
        );


    if(button){

        button.textContent="▶";

    }


    showPauseMenu();

}


// ==========================================
// 再開
// ==========================================

function resumeGame(){

    pauseActive=false;

    gameState=
        GAME_STATE.PLAYING;


    const button=
        document.getElementById(
            "pauseButton"
        );


    if(button){

        button.textContent="⏸";

    }


    hidePauseMenu();

}


// ==========================================
// 一時停止メニュー表示
// ==========================================

function showPauseMenu(){

    const screen=
        document.getElementById(
            "gameOverScreen"
        );


    if(!screen){
        return;
    }


    screen.innerHTML=
    `
    <div class="gameButtonArea">

        <button class="gameButton"
                onclick="retryGame()">
            リトライ
        </button>

        <button class="gameButton"
                onclick="returnTitle()">
            タイトルへ戻る
        </button>

    </div>
    `;


    screen.style.display="flex";

}


// ==========================================
// 一時停止メニュー非表示
// ==========================================

function hidePauseMenu(){

    const screen=
        document.getElementById(
            "gameOverScreen"
        );


    if(screen){

        screen.innerHTML="";
        screen.style.display="none";

    }

}