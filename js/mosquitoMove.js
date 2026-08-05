// ==========================================
// 断末蚊
// mosquitoMove.js
// ==========================================


// 乱数取得
function randomRange(min,max){

    return Math.floor(
        Math.random()*(max-min+1)
    )+min;

}


// 速度計算
function calculateSpeed(mosquito){

    const difficulty=
        DIFFICULTY_CONFIG[selectedDifficulty];


    const difficultyRate=
        difficulty
        ? difficulty.speedRate
        : 1;


    return COLOR_SETTINGS[mosquito.colorType].baseSpeed *
           LAYER_SETTINGS[mosquito.layer].speedRate *
           difficultyRate;

}


// layer設定反映
function setMosquitoPosition(mosquito){

    const range =
        LAYER_MOVE_RANGE[mosquito.layer];


    mosquito.y =
        randomRange(
            range.yMin,
            range.yMax
        );


    // 飛行揺れ基準位置
    mosquito.baseY=
        mosquito.y;


    // 揺れ初期化
    mosquito.wobbleTime=
        Math.random()*Math.PI*2;


    // 個体ごとに少し差を出す
    mosquito.wobbleSpeed=
        0.05+
        Math.random()*0.05;


    mosquito.wobbleSize=
        3+
        Math.random()*3;


    mosquito.scale =
        LAYER_SETTINGS[mosquito.layer].scale;


    mosquito.speed =
        calculateSpeed(mosquito);

}


// 蚊移動更新
function updateMosquitoMove(){

    mosquitoes.forEach(mosquito=>{

        if(!mosquito.alive){
            return;
        }


        // FAR・MIDDLE逃亡時安全弁
        if(
            mosquito.layer!==LAYER.FRONT &&
            (
                mosquito.x<-100 ||
                mosquito.x>SCREEN.width+100
            )
        ){

            resetMosquito(mosquito);
            return;

        }


        if(
            mosquito.phase!==PHASE.APPROACH
        ){
            return;
        }


        // 飛行揺れ
        mosquito.wobbleTime+=
            mosquito.wobbleSpeed;


        mosquito.y =
            mosquito.baseY+
            Math.sin(
                mosquito.wobbleTime
            )*
            mosquito.wobbleSize;



        // FRONT：WARNING位置へ移動
        if(
            mosquito.layer===LAYER.FRONT
        ){

            mosquito.x +=
                mosquito.speed *
                mosquito.direction;


            if(
                Math.abs(
                    mosquito.x-
                    mosquito.targetX
                )<5
            ){

                advanceMosquitoApproach(mosquito);

            }


            return;

        }


        // FAR・MIDDLE移動
        mosquito.x +=
            mosquito.speed *
            mosquito.direction;


        if(
            (mosquito.direction===1 &&
             mosquito.x>SCREEN.width+50)
            ||
            (mosquito.direction===-1 &&
             mosquito.x<-50)
        ){

            advanceMosquitoApproach(mosquito);

        }

    });

}