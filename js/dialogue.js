// ==========================================
// 断末蚊
// dialogue.js
// ==========================================

const DIALOGUE_DATA={

    rookie:{

        spawn:[
            "血を吸わせてもらうぞ！",
            "見つけたぞ！"
        ],

        evade:[
            "おっと危ない！"
        ],

        destroy:[
            "ぎゃー！"
        ],

        sucking:[
            "いただきます！"
        ],

        complete:[
            "勝った……！"
        ]

    },

    aggressive:{

        spawn:[
            "逃げられると思ったか！",
            "私は速いぞ！"
        ],

        evade:[
            "遅い遅い！"
        ],

        destroy:[
            "そんな馬鹿な！"
        ],

        sucking:[
            "その血、もらった！"
        ],

        complete:[
            "完全勝利だ！"
        ]

    },

    mobile:{

        spawn:[
            "ターゲット確認……",
            "任務了解！"
        ],

        evade:[
            "甘いな……",
            "当たりはしない！"
        ],

        destroy:[
            "直撃だと！？",
            "クッ！？調整不足か……"
        ],

        sucking:[
            "そこまでだ！"
        ],

        complete:[
            "任務完了……"
        ]

    },

    zawa:{

        spawn:[
            "勝てる……！"
        ],

        evade:[
            "僥倖っ…！"
        ],

        destroy:[
            "グ……！"
        ],

        sucking:[
            "悪魔的だ……！"
        ],

        complete:[
            "圧倒的血液……！"
        ]

    },

    jojo:{
        spawn:[
            "フフフ……"
        ],
        evade:[
            "ニヤリ……"
        ],
        destroy:[
            "バカな……"
        ],
        sucking:[
            "勝った！！",
            "ズギュウウウン！"
        ],
        complete:[
            "実に馴染むぞ！"
        ]
    }

};


// セリフ取得
function getMosquitoDialogue(
    attributeType,
    type
){

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