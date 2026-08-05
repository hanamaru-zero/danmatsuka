// ==========================================
// 断末蚊
// sound.js
// ==========================================

let soundEnabled=false;

const BGM_ENABLED=true;


// 音設定
const SOUND_SETTINGS={
    destroy:"sound/mosquito_hit.mp3",
    evade:"sound/mosquito_evade.mp3",
    select:"sound/ui_select.mp3",
    confirm:"sound/ui_confirm.mp3",
    bgm:"sound/bgm.mp3"
};


// 音初期化
function initSound(){

    updateSoundButton();

}


// 音ON/OFF切替
function toggleSound(){

    soundEnabled=!soundEnabled;

    updateSoundButton();

    if(soundEnabled){

        if(
            BGM_ENABLED &&
            gameState===GAME_STATE.PLAYING
        ){
            playBGM();
        }

    }else{

        stopBGM();

    }

}


// 音状態更新
function updateSoundButton(){

    const icon=
        document.getElementById("soundIcon");

    if(!icon){
        return;
    }

    if(soundEnabled){

        icon.src=
            "image/icon/volume_on.png";

    }else{

        icon.src=
            "image/icon/volume_off.png";

    }

}


// SE再生
function playSE(name){

    if(!soundEnabled){
        return;
    }

    const path=
        SOUND_SETTINGS[name];

    if(!path){
        return;
    }

    const audio=
        new Audio(path);

    audio.play()
    .catch(()=>{

        // 素材未配置時は無視

    });

}


// BGM再生
function playBGM(){

    if(
        !soundEnabled ||
        !BGM_ENABLED
    ){
        return;
    }

    if(window.gameBGM){
        return;
    }

    const audio=
        new Audio(
            SOUND_SETTINGS.bgm
        );

    audio.loop=true;

    audio.play()
    .catch(()=>{

    });

    window.gameBGM=
        audio;

}


// BGM停止
function stopBGM(){

    if(!window.gameBGM){
        return;
    }

    window.gameBGM.pause();

    window.gameBGM.currentTime=0;

    window.gameBGM=null;

}