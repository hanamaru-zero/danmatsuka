// ==========================================
// 断末蚊
// death.js
// ==========================================

let deathTimer=0;
let deathPhase="none";


// 断末演出設定
const DEATH_SETTINGS={
    dialogueTime:1000,
    fadeTime:1000
};


// 断末開始
function startDeath(){

    gameState=GAME_STATE.DEATH;

    fadeOutBGM();

    hideGameUI();

    deathTimer=0;

    deathPhase="dialogue";

}


// 断末演出更新
function updateDeath(deltaTime){

    if(gameState!==GAME_STATE.DEATH){
        return;
    }

    deathTimer+=deltaTime;

    if(
        deathPhase==="dialogue" &&
        deathTimer>=DEATH_SETTINGS.dialogueTime
    ){

        startDeathFade();

        return;

    }

    if(
        deathPhase==="fade" &&
        deathTimer>=
        DEATH_SETTINGS.dialogueTime+
        DEATH_SETTINGS.fadeTime
    ){

        endDeath();

    }

}


// 赤フェード開始
function startDeathFade(){

    deathPhase="fade";

    const fade=
        document.getElementById(
            "fadeLayer"
        );

    if(!fade){
        return;
    }

    fade.className="fadeRed";

}


// 断末終了
function endDeath(){

    deathPhase="none";

    gameState=
        GAME_STATE.GAMEOVER;

    startGameOver();

}