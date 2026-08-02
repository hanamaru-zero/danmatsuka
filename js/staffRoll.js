// ==========================================
// 断末蚊
// staffRoll.js
// ==========================================

let staffRollStarted=false;


// スタッフロールデータ

const STAFF_ROLL_DATA=[
    {text:"断末蚊"},
    {text:""},
    {text:""},

    {text:"◆制作"},

    {text:""},

    {text:"花丸　史"},

    {text:""},
    {text:""},

    {text:"◆プログラミング"},

    {text:""},

    {text:"ChatGPT"},

    {text:""},
    {text:""},

    {text:"◆素材提供"},

    {text:""},

    {text:"PNGTree 様"},
    {text:"copainter team 様"},
    {text:"効果音ラボ 様"},

    {text:""},
    {text:""},

    {text:"◆テストプレイ協力"},

    {text:""},

    {text:"バクの好物　マスター"},
    {text:"居酒屋しょうき　マスター"},
    {text:"みさみささん"},
    {text:"プレイヤーA"},
    {text:"プレイヤーB"},
    {text:"プレイヤーC"},

    {text:""},
    {text:""},

    {text:"◆セリフパターン協力"},

    {text:""},

    {text:"バクの好物　マスター"},
    {text:"プレイヤーX"},
    {text:"プレイヤーY"},
    {text:"プレイヤーZ"},

    {text:""},
    {text:""},

    {text:"◆スポンサー様"},

    {text:""},

    {text:"広告募集中"},

    {text:""},

    {text:"蚊帳メーカー様、大歓迎"},
    {text:"蚊取り線香メーカー様、大歓迎"},

    {text:""},
    {text:""},

    {text:"※広告掲載後も吸血活動は継続します"},

    {text:""},
    {text:""},
    {text:""},

    {text:"煽り蚊や　指先一つで　断末魔"},

    {text:""},
    {text:""},
    {text:""},

    {text:"THANK YOU FOR PLAYING"}
];


// ランダム１文字赤文字化
function randomDangerText(text){

    const indexes=[];

    for(let i=0;i<text.length;i++){

        if(text[i]!==" "&&text[i]!=="　"){
            indexes.push(i);
        }

    }

    if(indexes.length===0){
        return text;
    }

    const target=
        indexes[
            Math.floor(Math.random()*indexes.length)
        ];

    let result="";

    for(let i=0;i<text.length;i++){

        if(i===target){

            result+=
            `<span class="staffDanger">${text[i]}</span>`;

        }else{

            result+=text[i];

        }

    }

    return result;

}


// スタッフロール初期化
function resetStaffRoll(){

    staffRollStarted=false;

    const roll=document.getElementById("staffRoll");

    if(roll){

        roll.innerHTML="";
        roll.style.display="none";

    }

}


// スタッフロール開始
function startStaffRoll(){

    if(staffRollStarted){
        return;
    }

    staffRollStarted=true;

    const roll=document.getElementById("staffRoll");

    if(!roll){
        return;
    }


    const resultData=[
        {text:"◆リザルト"},
        {text:""},
        {text:"スコア"},
        {text:String(score).padStart(8,"0")},
        {text:""},
        {text:"撃墜数"},
        {text:String(destroyCount)},
        {text:""},
        {text:""},
        ...STAFF_ROLL_DATA
    ];


    let html="";


    resultData.forEach(item=>{

        html+=
            randomDangerText(item.text)
            +"<br>";

    });


    roll.innerHTML=
    `
    <div class="staffText">
        ${html}
    </div>
    `;


    roll.style.display="block";

}