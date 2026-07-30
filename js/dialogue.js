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