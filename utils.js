// ==========================================
// 断末蚊
// utils.js
// ==========================================

// ==========================================
// 抽選系
// ==========================================

// 重みづけ抽選
function weightedRandom(data){

    let totalWeight=0;

    for(const key in data){
        totalWeight+=data[key].weight;
    }

    let random=Math.random()*totalWeight;

    for(const key in data){

        random-=data[key].weight;

        if(random<=0){
            return key;
        }

    }

    return null;

}


// ==========================================
// 座標系
// ==========================================


// 親要素基準の座標取得
function getRelativeRect(element,parent){

    const rect=
        element.getBoundingClientRect();

    const parentRect=
        parent.getBoundingClientRect();

    return {
        left:rect.left-parentRect.left,
        top:rect.top-parentRect.top,
        width:rect.width,
        height:rect.height
    };

}


// 座標範囲判定
function isPointInsideRect(x,y,rect){

    return(
        x>=rect.left &&
        x<=rect.left+rect.width &&
        y>=rect.top &&
        y<=rect.top+rect.height
    );

}


// ==========================================
// 難易度設定
// ==========================================


// 難易度反映
function applyDifficulty(){

    const config=
        DIFFICULTY_CONFIG[selectedDifficulty];

    if(!config){
        return;
    }

    const background=
        document.getElementById(
            "background"
        );

    if(background){

        background.style.backgroundImage=
            `url("${config.background}")`;

    }

}


// ==========================================
// CSV読み込み系
// ==========================================


// CSVファイル読み込み
async function loadCSV(path){

    const response=
        await fetch(path);

    if(!response.ok){

        throw new Error(
            "CSV読み込み失敗: "+path
        );

    }

    return await response.text();

}


// CSV解析
function parseCSV(text){

    const lines=
        text.trim().split("\n");

    const headers=
        lines[0].split(",");

    return lines.slice(1).map(line=>{

        const values=
            line.split(",");

        const row={};

        headers.forEach((header,index)=>{

            row[header.trim()]=
                values[index]
                ? values[index].trim()
                : "";

        });

        return row;

    });

}


// ==========================================
// 属性CSV変換
// ==========================================


// CSV行を属性設定へ変換
function createAttributeSettings(rows){

    const settings={};

    rows.forEach(row=>{

        settings[row.id]={

            name:row.name,

            weight:Number(row.weight),

            evadeRate:Number(row.evadeRate)

        };

    });

    return settings;

}


// ==========================================
// セリフCSV変換
// ==========================================


// CSV行をセリフ設定へ変換
function createDialogueData(rows){

    const data={};

    rows.forEach(row=>{

        if(!data[row.id]){

            data[row.id]={

                spawn:[],
                evade:[],
                destroy:[],
                sucking:[],
                complete:[]

            };

        }

        if(data[row.id][row.type]){

            data[row.id][row.type].push(
                row.text
            );

        }

    });

    return data;

}