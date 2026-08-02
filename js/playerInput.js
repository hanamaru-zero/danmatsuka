// ==========================================
// 断末蚊
// playerInput.js
// ==========================================

// 入力イベント登録
function initPlayerInput(){

    const gameArea=document.getElementById("gameArea");
    const soundButton=document.getElementById("soundButton");
    const pauseButton=document.getElementById("pauseButton");


    if(soundButton){

        soundButton.addEventListener(
            "pointerdown",
            function(event){

                event.stopPropagation();

                toggleSound();

            }
        );

    }


    if(pauseButton){

        pauseButton.addEventListener(
            "pointerdown",
            function(event){

                event.stopPropagation();

                togglePause();

            }
        );

    }


    gameArea.addEventListener(
        "pointerdown",
        function(event){

            const rect=gameArea.getBoundingClientRect();

            const x=event.clientX-rect.left;
            const y=event.clientY-rect.top;

            onPlayerTap(x,y);

        }
    );

}


// プレイヤー入力処理
function onPlayerTap(x,y){

    console.log(
        "tap:",
        x,
        y
    );


    if(gameState===GAME_STATE.TITLE){

        checkTitleTap(x,y);

        return;

    }


    if(gameState!==GAME_STATE.PLAYING){

        return;

    }


    checkMosquitoHit(x,y);

}