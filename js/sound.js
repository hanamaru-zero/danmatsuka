// ==========================================
// 断末蚊
// sound.js
// ==========================================

let soundEnabled=false;


// 音設定
const SOUND_SETTINGS={
    destroy:"sound/mosquito_hit.mp3",
    evade:"sound/mosquito_evade.mp3",
    click:"sound/click.mp3",
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

}


// 音状態更新
function updateSoundButton(){

    const button=
        document.getElementById("soundButton");

    if(!button){
        return;
    }

    if(soundEnabled){
        button.textContent="🔊";
    }else{
        button.textContent="🔇";
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

    if(!soundEnabled){
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

}