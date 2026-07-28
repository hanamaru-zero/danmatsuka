// ==========================================
// 断末蚊
// dialogueHistory.js
// ==========================================

const dialogueHistory=[];


// 履歴追加
function addDialogueHistory(mosquito,text){

    dialogueHistory.unshift({
        name:getMosquitoName(mosquito),
        text:text,
        color:getMosquitoDialogueColor(mosquito)
    });

    if(dialogueHistory.length>DIALOGUE_HISTORY_SETTINGS.maxCount){
        dialogueHistory.pop();
    }

    drawDialogueHistory();

}


// 履歴描画
function drawDialogueHistory(){

    const element=document.getElementById("dialogueHistory");

    if(!element){
        return;
    }

    element.innerHTML="";

    dialogueHistory.forEach(line=>{

        const div=document.createElement("div");
        div.className="historyLine";

        const name=document.createElement("span");
        name.className="historyName";
        name.style.color=line.color;
        name.textContent=line.name;

        const text=document.createElement("span");
        text.className="historyText";
        text.style.color=line.color;
        text.textContent="「"+line.text+"」";

        div.appendChild(name);
        div.appendChild(text);
        element.appendChild(div);

    });

}


// タイトル表示用履歴
function drawTitleHistory(){

    const element=document.getElementById("dialogueHistory");

    if(!element){
        return;
    }

    element.innerHTML=
    `
    <div class="historyLine">
        蚊撃墜ランキング
    </div>
    <div class="historyLine">
        COMING SOON...
    </div>
    `;

}


// 履歴クリア
function clearDialogueHistory(){

    dialogueHistory.length=0;

    drawDialogueHistory();

}


// 蚊名取得
function getMosquitoName(mosquito){

    if(
        mosquito.attributeType &&
        ATTRIBUTE_SETTINGS[mosquito.attributeType].name
    ){
        return ATTRIBUTE_SETTINGS[mosquito.attributeType].name;
    }

    return "蚊";

}


// セリフ色取得
function getMosquitoDialogueColor(mosquito){

    if(
        mosquito.colorType &&
        COLOR_SETTINGS[mosquito.colorType].dialogueColor
    ){
        return COLOR_SETTINGS[mosquito.colorType].dialogueColor;
    }

    return "#222";

}