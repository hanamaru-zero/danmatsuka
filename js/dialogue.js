// ==========================================
// 断末蚊
// dialogue.js
// ==========================================


// セリフ取得
function getMosquitoDialogue(attributeType,type){

    const data=
        DIALOGUE_DATA[
            attributeType
        ];

    if(!data){
        return "";
    }

    const list=
        data[type];

    if(!list){
        return "";
    }

    return list[
        randomRange(
            0,
            list.length-1
        )
    ];

}


// 吹き出し描画
function drawDialogueBubble(){

    if(
        DIALOGUE_SETTINGS.mode===
        DIALOGUE_MODE.MULTI
    ){

        mosquitoes.forEach(
            drawDialogueBubbleMulti
        );

        return;

    }

    // SINGLE時は他の吹き出しを消去
    mosquitoes.forEach(mosquito=>{

        const element=
            document.getElementById(
                mosquito.id+"_dialogue"
            );

        if(element){
            element.style.display="none";
        }

    });

    if(!lastDialogueMosquito){
        return;
    }

    const element=
        document.getElementById(
            lastDialogueMosquito.id+"_dialogue"
        );

    if(!element){
        return;
    }

    if(
        lastDialogueMosquito.dialogueTimer<=0
    ){

        element.style.display="none";
        return;

    }

    drawDialogueElement(
        element,
        lastDialogueMosquito,
        lastDialogueMosquito.dialogue
    );

}


// MULTI吹き出し描画
function drawDialogueBubbleMulti(mosquito){

    const element=
        document.getElementById(
            mosquito.id+"_dialogue"
        );

    if(!element){
        return;
    }

    if(
        mosquito.dialogueTimer<=0
    ){

        element.style.display="none";
        return;

    }

    drawDialogueElement(
        element,
        mosquito,
        mosquito.dialogue
    );

}


// 共通描画
function drawDialogueElement(
    element,
    mosquito,
    text
){

    element.style.display="block";
    element.textContent=text;

    let dialogueX=
        mosquito.x;

    const halfWidth=
        element.offsetWidth/2+10;

    if(dialogueX<halfWidth){
        dialogueX=halfWidth;
    }

    if(
        dialogueX>
        SCREEN.width-halfWidth
    ){

        dialogueX=
            SCREEN.width-halfWidth;

    }

    element.style.left=
        dialogueX+"px";

    element.style.top=
        (
            mosquito.y-
            DIALOGUE_SETTINGS.offsetY
        )+"px";

    element.style.transform=
        "translate(-50%,-100%) scale("+
        DIALOGUE_SCALE[
            mosquito.layer
        ]+
        ")";

}