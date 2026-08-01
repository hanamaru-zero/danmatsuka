// ==========================================
// 断末蚊
// gameUI.js
// ==========================================

// 背景変更
function changeStageBackground(){
    const background=document.getElementById("background");

    if(!background){
        return;
    }

    const config=DIFFICULTY_CONFIG[selectedDifficulty];

    if(!config){
        return;
    }

    background.style.backgroundImage=
        `url("${config.background}")`;
}


// ゲームUI表示
function showGameUI(){

    if(gameUIShown){
        return;
    }

    gameUIShown=true;

    const score=document.getElementById("score");
    const damage=document.getElementById("damage");
    const pauseButton=document.getElementById("pauseButton");

    if(score){
        score.style.display="block";
    }

    if(damage){
        damage.style.display="block";
    }

    if(pauseButton){
        pauseButton.style.display="flex";
    }

}


// ゲームUI非表示
function hideGameUI(){

    const score=document.getElementById("score");
    const damage=document.getElementById("damage");
    const pauseButton=document.getElementById("pauseButton");

    if(score){
        score.style.display="none";
    }

    if(damage){
        damage.style.display="none";
    }

    if(pauseButton){
        pauseButton.style.display="none";
    }

    gameUIShown=false;

}


// スコア表示更新
function updateScoreDisplay(){

    const scoreValue=
        document.getElementById("scoreValue");

    if(!scoreValue){
        return;
    }

    scoreValue.textContent=
        String(score).padStart(8,"0");

}


// ハート表示更新
function updateDamageDisplay(){

    const damage=document.getElementById("damage");

    if(!damage){
        return;
    }

    const heartCount=
        SUCKING_SETTINGS.damageCountLimit-playerDamageCount;

    damage.innerHTML=
        `かゆみ耐性： <span class="heart">${"❤".repeat(Math.max(0,heartCount))}</span>`;

}