// ==========================================
// 断末蚊
// game.js
// ==========================================

let gameState=GAME_STATE.TITLE;
let lastTime=0;

// ==========================================
// CSVデータ読み込み
// ==========================================

async function loadGameData(){

    const attributeCSV=await loadCSV("data/attribute.csv");
    const attributeRows=parseCSV(attributeCSV);

    ATTRIBUTE_SETTINGS=createAttributeSettings(attributeRows);

    const dialogueCSV=await loadCSV("data/dialogue.csv");
    const dialogueRows=parseCSV(dialogueCSV);

    DIALOGUE_DATA=createDialogueData(dialogueRows);

}

// ==========================================
// ゲーム開始
// ==========================================

function startPlay(){

    changeStageBackground();

    resetPause();

    clearGameObjects();

    resetGame();

    initMosquito();

}

// ==========================================
// ゲームリセット
// ==========================================

function resetGame(){

    gameState=GAME_STATE.PLAYING;

    showGameUI();

    resetPlayerStatus();

    updateDamageDisplay();

    updateScoreDisplay();

    clearDialogueHistory();

    hideGameOver();

    mosquitoes.forEach(mosquito=>{

        mosquito.alive=false;

        mosquito.phase=PHASE.APPROACH;

        mosquito.destroyPhase=DESTROY_PHASE.NONE;

        mosquito.destroyTime=0;

        mosquito.rotation=0;

        mosquito.dialogue="";

        mosquito.dialogueTimer=0;

        mosquito.warningTime=0;

        mosquito.suckTime=0;

        mosquito.spawnTimer=randomRange(300,3000);

        const element=document.getElementById(mosquito.id);

        if(element){
            element.style.display="none";
        }

        const dialogue=document.getElementById(mosquito.id+"_dialogue");

        if(dialogue){
            dialogue.style.display="none";
        }

    });

}

// ==========================================
// タイトル復帰用クリア
// ==========================================

function clearGameObjects(){

    clearDialogueHistory();

    resetPause();

    mosquitoes.forEach(mosquito=>{

        const element=document.getElementById(mosquito.id);

        if(element){
            element.remove();
        }

        const dialogue=document.getElementById(mosquito.id+"_dialogue");

        if(dialogue){
            dialogue.remove();
        }

    });

    mosquitoes.length=0;

    resetPlayerStatus();

    hideGameUI();

    updateDamageDisplay();

    updateScoreDisplay();

}

// ==========================================
// 更新
// ==========================================

function update(deltaTime){

    if(gameState===GAME_STATE.DEATH){

        updateDeath(deltaTime);

        return;

    }

    if(gameState===GAME_STATE.GAMEOVER){

        updateGameOver(deltaTime);

        return;

    }

    if(gameState!==GAME_STATE.PLAYING){
        return;
    }

    showGameUI();

    updateMosquitoSpawn(deltaTime);
    updateMosquitoMove();
    updateMosquitoState(deltaTime);
    updateMosquitoDialogue(deltaTime);

}

// ==========================================
// 描画
// ==========================================

function draw(){

    if(
        gameState===GAME_STATE.PLAYING||
        gameState===GAME_STATE.PAUSE||
        gameState===GAME_STATE.DEATH
    ){
        drawMosquito();
        drawDialogueBubble();
    }

}

// ==========================================
// ゲームループ
// ==========================================

function gameLoop(timestamp){

    const deltaTime=timestamp-lastTime;

    lastTime=timestamp;

    update(deltaTime);

    draw();

    requestAnimationFrame(gameLoop);

}

// ==========================================
// 開始処理
// ==========================================

function startGame(){

    initPlayerInput();

    initSound();

    if(gameState===GAME_STATE.PLAYING){

        showGameUI();

        initMosquito();

    }

    if(gameState===GAME_STATE.TITLE){

        hideGameUI();

        initTitle();

    }

    updateDamageDisplay();

    updateScoreDisplay();

    draw();

    requestAnimationFrame(gameLoop);

}

// ==========================================
// CSV読み込み後に開始
// ==========================================

loadGameData()
.then(()=>{

    startGame();

})
.catch(error=>{

    console.error(error);

});