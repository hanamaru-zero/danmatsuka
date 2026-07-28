// ==========================================
// 断末蚊
// mosquitoDialogue.js
// ==========================================

let lastDialogueMosquito=null;


// セリフ表示
function showMosquitoDialogue(mosquito,dialogueType){

    const text=
        getMosquitoDialogue(
            mosquito.attributeType,
            dialogueType
        );

    if(!text){
        return;
    }

    mosquito.dialogue=text;
    mosquito.dialogueTimer=
        DIALOGUE_SETTINGS.duration;

    lastDialogueMosquito=mosquito;

    addDialogueHistory(
        mosquito,
        text
    );

}


// セリフ更新
function updateMosquitoDialogue(deltaTime){

    mosquitoes.forEach(mosquito=>{

        if(mosquito.dialogueTimer<=0){
            return;
        }

        mosquito.dialogueTimer-=deltaTime;

        if(mosquito.dialogueTimer<=0){

            mosquito.dialogue="";
            mosquito.dialogueTimer=0;

            if(lastDialogueMosquito===mosquito){
                lastDialogueMosquito=null;
            }

        }

    });

}