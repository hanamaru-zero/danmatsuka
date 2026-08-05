// ==========================================
// 断末蚊
// mosquito.js
// ==========================================

const mosquitoes=[];
let mosquitoId=1;


// 蚊生成
function createMosquito(){

    return {

        id:"mosquito"+mosquitoId++,

        // 色による性能差
        colorType:null,

        // 属性・セリフ・回避率
        attributeType:null,

        alive:false,

        destroyPhase:
            DESTROY_PHASE.NONE,

        phase:
            PHASE.APPROACH,

        layer:
            LAYER.FAR,

        zone:
            ZONE.FAR,

        x:0,
        y:0,


        // 飛行揺れ
        // APPROACH中のふらつき演出用
        baseY:0,
        wobbleTime:0,
        wobbleSpeed:0,
        wobbleSize:0,


        speed:0,
        direction:1,

        targetX:0,

        warningTime:0,
        suckTime:0,


        // セリフ
        dialogue:"",
        dialogueTimer:0,


        spawnTimer:0

    };

}


// 色タイプ取得
function getRandomColorType(){

    return weightedRandom(
        COLOR_SETTINGS
    );

}


// 属性タイプ取得
//
// weight:
// 出現重み
//
// 将来:
// セリフ設定
// 特殊行動設定

function getRandomAttributeType(){

    return weightedRandom(
        ATTRIBUTE_SETTINGS
    );

}


// 蚊出現
function spawnMosquito(mosquito){

    mosquito.colorType=
        getRandomColorType();

    mosquito.attributeType=
        getRandomAttributeType();

    mosquito.alive=true;

    resetMosquito(mosquito);

}


// スポーン更新
function updateMosquitoSpawn(deltaTime){

    mosquitoes.forEach(mosquito=>{

        if(
            mosquito.alive ||
            mosquito.destroyPhase!==DESTROY_PHASE.NONE
        ){
            return;
        }

        mosquito.spawnTimer-=deltaTime;

        if(mosquito.spawnTimer<=0){

            spawnMosquito(mosquito);

        }

    });

}


// 初期化
function initMosquito(){

    const maxMosquito=
        DIFFICULTY_CONFIG[selectedDifficulty]
        .mosquitoCount;


    for(
        let i=0;
        i<maxMosquito;
        i++
    ){

        const mosquito=
            createMosquito();


        mosquitoes.push(mosquito);


        createMosquitoElement(
            mosquito
        );


        mosquito.x=-100;
        mosquito.y=-100;


        mosquito.spawnTimer=
            randomRange(
                300,
                3000
            );

    }

}