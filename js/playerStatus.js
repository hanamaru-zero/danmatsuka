// ==========================================
// 断末蚊
// playerStatus.js
// ==========================================

let playerDamageCount=0;


// ==========================================
// プレイヤー状態リセット
// ==========================================

function resetPlayerStatus(){

    playerDamageCount=0;

}


// ==========================================
// 吸血被害追加
// ==========================================

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