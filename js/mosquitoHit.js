// ==========================================
// 断末蚊
// mosquitoHit.js
// ==========================================

// ヒット判定
function checkMosquitoHit(x,y){

    mosquitoes.forEach(mosquito=>{

        if(!mosquito.alive){
            return;
        }

        const size=80*mosquito.scale;

        const centerX=
            mosquito.x+
            (size/2)+
            (10*mosquito.scale);

        const centerY=
            mosquito.y+
            (size/2);

        let hitRange;

        if(mosquito.layer===LAYER.FAR){

            hitRange=28;

        }else{

            hitRange=size*0.5;

        }

        const hit=
            Math.abs(centerX-x)<hitRange &&
            Math.abs(centerY-y)<hitRange;

        if(!hit){
            return;
        }

        if(
            mosquito.phase===PHASE.APPROACH &&
            mosquito.layer!==LAYER.FRONT &&
            isMosquitoEvade(mosquito)
        ){

            evadeMosquito(mosquito);

            return;

        }

        killMosquito(mosquito);

    });

}


// 回避判定
function isMosquitoEvade(mosquito){

    const attribute=
        ATTRIBUTE_SETTINGS[mosquito.attributeType];

    if(!attribute){
        return false;
    }

    return Math.random()<attribute.evadeRate;

}


// 回避処理
function evadeMosquito(mosquito){

    mosquito.x+=
        mosquito.direction*30;

    mosquito.y+=
        randomRange(-25,25);

    showMosquitoDialogue(
        mosquito,
        "evade"
    );

}


// 撃破処理
function killMosquito(mosquito){

    addScore(mosquito);

    updateScoreDisplay();

    playSE("destroy");

    showMosquitoDialogue(
        mosquito,
        "destroy"
    );


    mosquito.destroyLayer=
        mosquito.layer;


    mosquito.alive=false;


    mosquito.destroyPhase=
        DESTROY_PHASE.HIT;


    mosquito.destroyTime=
        DESTROY_SETTINGS.hitDuration;


    mosquito.rotation=0;


    const destroySetting=
        DESTROY_SETTINGS[
            mosquito.destroyLayer
        ];


    mosquito.fallSpeed=
        destroySetting.fallSpeed;


    mosquito.spawnTimer=
        randomRange(
            1000,
            3000
        );


    playMosquitoDestroyEffect(
        mosquito
    );

}


// 撃破演出開始
function playMosquitoDestroyEffect(mosquito){

    const effect=
        document.createElement("div");


    effect.className=
        "hitEffect";


    const element=
        document.getElementById(
            mosquito.id
        );


    const gameArea=
        document.getElementById(
            "gameArea"
        );


    if(
        !element ||
        !gameArea
    ){
        return;
    }


    const rect=
        element.getBoundingClientRect();


    const gameRect=
        gameArea.getBoundingClientRect();


    const centerX=
        rect.left-
        gameRect.left+
        (rect.width/2);


    const centerY=
        rect.top-
        gameRect.top+
        (rect.height/2);


    effect.style.left=
        centerX+"px";


    effect.style.top=
        centerY+"px";


    gameArea.appendChild(
        effect
    );


    setTimeout(()=>{

        effect.remove();

    },300);

}