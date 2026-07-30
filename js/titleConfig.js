// ==========================================
// 断末蚊
// titleConfig.js
// ==========================================


let selectedDifficulty="NORMAL";

let titleCursorIndex=1;


const TITLE_CONFIG={

    EASY:{
        background:"image/background/room_morning.png",
        mosquitoCount:5,
        speedRate:1.0,
        dialogue:"妥当だな！"
    },


    NORMAL:{
        background:"image/background/room_evening.png",
        mosquitoCount:8,
        speedRate:1.8,
        dialogue:"覚悟しろ！！"
    },


    HARD:{
        background:"image/background/room_night.png",
        mosquitoCount:12,
        speedRate:3.0,
        dialogue:"後悔するぞ！！！"
    }

};


const TITLE_DIFFICULTY_LIST=[

    "EASY",
    "NORMAL",
    "HARD"

];