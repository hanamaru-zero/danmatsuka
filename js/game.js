// ==========================================
// 断末蚊
// game.js
// ==========================================

let gameState=
    DEBUG_MODE
    ? GAME_STATE.PLAYING
    : GAME_STATE.TITLE;

let playerDamageCount=0;
let lastTime=0;
let gameUIShown=false;


// ==========================================
// CSVデータ読み込み
// ==========================================

async function loadGameData(){

    const attributeCSV=
        await loadCSV(
            "data/attribute.csv"
        );

    const attributeRows=
        parseCSV(
            attributeCSV
        );

    ATTRIBUTE_SETTINGS=
        createAttributeSettings(
            attributeRows
        );


    const dialogueCSV=
        await loadCSV(
            "data/dialogue.csv"
        );

    const dialogueRows=
        parseCSV(
            dialogueCSV
        );

    DIALOGUE_DATA=
        createDialogueData(
            dialogueRows
        );

}


// 背景変更
function changeStageBackground(){

    const background=
        document.getElementById(
            "background"
        );

    if(!background){
        return;
    }


    const config=
        TITLE_CONFIG[selectedDifficulty];


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

    const score=
        document.getElementById(
            "score"
        );

    const damage=
        document.getElementById(
            "damage"
        );


    if(score){
        score.style.display="block";
    }

    if(damage){
        damage.style.display="block";
    }

}


// ゲームUI非表示
function hideGameUI(){

    const score=
        document.getElementById(
            "score"
        );

    const damage=
        document.getElementById(
            "damage"
        );


    if(score){
        score.style.display="none";
    }

    if(damage){
        damage.style.display="none";
    }


    gameUIShown=false;

}


// ハート表示更新
function updateDamageDisplay(){

    const damage=
        document.getElementById(
            "damage"
        );


    if(!damage){
        return;
    }


    const heartCount=
        SUCKING_SETTINGS.damageCountLimit-playerDamageCount;


    damage.innerHTML=
    `
    かゆみ耐性:
    <span class="heart">
        ${"❤".repeat(Math.max(0,heartCount))}
    </span>
    `;

}


// 吸血被害追加
function addSuckingDamage(){

    playerDamageCount++;

    updateDamageDisplay();


    if(
        playerDamageCount>=
        SUCKING_SETTINGS.damageCountLimit
    ){

        gameState=
            GAME_STATE.DEATH;

        startDeath();

    }

}


// ゲーム開始
function startPlay(){

    changeStageBackground();

    gameState=
        GAME_STATE.PLAYING;

    showGameUI();

    playerDamageCount=0;

    updateDamageDisplay();

    clearDialogueHistory();

    resetGame();

}


// ゲームリセット
function resetGame(){

    gameState=
        GAME_STATE.PLAYING;

    showGameUI();

    playerDamageCount=0;

    updateDamageDisplay();

    clearDialogueHistory();

    hideGameOver();


    mosquitoes.forEach(mosquito=>{

        mosquito.alive=false;

        mosquito.phase=
            PHASE.APPROACH;

        mosquito.destroyPhase=
            DESTROY_PHASE.NONE;

        mosquito.destroyTime=0;

        mosquito.rotation=0;

        mosquito.dialogue="";

        mosquito.dialogueTimer=0;

        mosquito.warningTime=0;

        mosquito.suckTime=0;

        mosquito.spawnTimer=
            randomRange(
                300,
                3000
            );


        const element=
            document.getElementById(
                mosquito.id
            );


        if(element){

            element.style.display=
                "none";

        }


        const dialogue=
            document.getElementById(
                mosquito.id+"_dialogue"
            );


        if(dialogue){

            dialogue.style.display=
                "none";

        }

    });

}

// タイトル復帰用クリア
function clearGameObjects(){

    clearDialogueHistory();


    mosquitoes.forEach(mosquito=>{

        const element=
            document.getElementById(
                mosquito.id
            );


        if(element){

            element.remove();

        }


        const dialogue=
            document.getElementById(
                mosquito.id+"_dialogue"
            );


        if(dialogue){

            dialogue.remove();

        }

    });


    mosquitoes.length=0;

    playerDamageCount=0;

    hideGameUI();

    updateDamageDisplay();

}



// 更新
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



// 描画
function draw(){

    if(
        gameState===GAME_STATE.PLAYING ||
        gameState===GAME_STATE.DEATH
    ){

        drawMosquito();

        drawDialogueBubble();

    }

}



// ゲームループ
function gameLoop(timestamp){

    const deltaTime=
        timestamp-lastTime;


    lastTime=timestamp;


    update(deltaTime);

    draw();


    requestAnimationFrame(
        gameLoop
    );

}



// 開始処理
function startGame(){

    initPlayerInput();


    if(gameState===GAME_STATE.PLAYING){

        showGameUI();

        initMosquito();

    }


    if(gameState===GAME_STATE.TITLE){

        hideGameUI();

        initTitle();

    }


    updateDamageDisplay();

    draw();


    requestAnimationFrame(
        gameLoop
    );

}



// CSV読み込み後に開始
loadGameData()
.then(()=>{

    startGame();

})
.catch(error=>{

    console.error(
        error
    );

});