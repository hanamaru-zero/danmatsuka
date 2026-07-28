// ==========================================
// 断末蚊
// mosquitoRender.js
// ==========================================

// 蚊表示生成
function createMosquitoElement(mosquito){

    const gameArea=
        document.getElementById("gameArea");

    const element=
        document.createElement("div");

    element.id=mosquito.id;
    element.className="mosquito";

    const image=
        document.createElement("img");

    image.src=
        "image/mosquito.png";

    image.className=
        "mosquitoImage";

    element.appendChild(image);

    gameArea.appendChild(element);

    const dialogue=
        document.createElement("div");

    dialogue.id=
        mosquito.id+"_dialogue";

    dialogue.className=
        "dialogue";

    dialogue.style.display="none";

    gameArea.appendChild(dialogue);

}


// 蚊画像取得
function getMosquitoImage(mosquito){

    const element=
        document.getElementById(
            mosquito.id
        );

    if(!element){
        return null;
    }

    return element.querySelector(
        ".mosquitoImage"
    );

}


// 蚊transform取得
function getMosquitoTransform(mosquito){

    let flip=1;

    if(
        mosquito.direction===1
    ){

        flip=-1;

    }

    return(
        `scaleX(${flip}) scale(${mosquito.scale})`
    );

}


// 蚊画像状態更新
function updateMosquitoImage(mosquito){

    const image=
        getMosquitoImage(
            mosquito
        );

    if(!image){
        return;
    }

    image.classList.remove(
        "BLACK",
        "RED",
        "sucking"
    );

    if(mosquito.colorType){

        image.classList.add(
            mosquito.colorType
        );

    }

    if(
        mosquito.phase===
        PHASE.SUCKING
    ){

        image.classList.add(
            "sucking"
        );

    }

}


// 蚊描画更新
function drawMosquito(){

    mosquitoes.forEach(mosquito=>{

        const element=
            document.getElementById(
                mosquito.id
            );

        if(!element){
            return;
        }

        const dialogue=
            document.getElementById(
                mosquito.id+"_dialogue"
            );

        if(!mosquito.alive){

            if(
                mosquito.destroyPhase!==
                DESTROY_PHASE.NONE
            ){

                drawMosquitoDestroy(
                    element,
                    mosquito
                );

            }else{

                element.style.display="none";

            }

            if(dialogue){

                dialogue.style.display="none";

            }

            return;

        }

        element.style.display="block";

        element.style.left=
            mosquito.x+"px";

        element.style.top=
            mosquito.y+"px";

        element.style.transform=
            getMosquitoTransform(
                mosquito
            );

        updateMosquitoImage(
            mosquito
        );

    });

}


// 撃破演出描画
function drawMosquitoDestroy(
    element,
    mosquito
){

    if(
        mosquito.destroyPhase===
        DESTROY_PHASE.END
    ){

        element.style.display="none";

        return;

    }

    element.style.display="block";

    element.style.left=
        mosquito.x+"px";

    element.style.top=
        mosquito.y+"px";

    let flip=1;

    if(
        mosquito.direction===1
    ){

        flip=-1;

    }

    element.style.transform=
        `scaleX(${flip}) scale(${mosquito.scale}) rotate(${mosquito.rotation}deg)`;

}