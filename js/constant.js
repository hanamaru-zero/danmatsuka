// ==========================================
// 断末蚊
// constant.js
// ==========================================

// ゲーム設定
const GAME_SETTINGS={
    maxMosquito:5
};


// デバッグ設定
// true：ゲーム画面直接起動
// false：タイトル画面起動
const DEBUG_MODE=false;


// 画面設定
const SCREEN={
    width:360,
    height:720
};


// layer定義
const LAYER={
    FAR:"far",
    MIDDLE:"middle",
    FRONT:"front"
};


// zone定義
const ZONE={
    FAR:"far",
    MIDDLE:"middle",
    FRONT:"front"
};


// phase定義
const PHASE={
    APPROACH:"approach",
    WARNING:"warning",
    SUCKING:"sucking",
    COMPLETE:"complete"
};


// destroy状態定義
const DESTROY_PHASE={
    NONE:"none",
    HIT:"hit",
    FALL:"fall",
    END:"end"
};


// ゲーム状態
const GAME_STATE={
    TITLE:"title",
    PLAYING:"playing",
    DEATH:"death",
    GAMEOVER:"gameover",
    OPTION:"option"
};


// セリフ表示モード
const DIALOGUE_MODE={
    SINGLE:"single",
    MULTI:"multi"
};


// layer設定
const LAYER_SETTINGS={
    [LAYER.FAR]:{
        scale:0.4,
        speedRate:0.6
    },

    [LAYER.MIDDLE]:{
        scale:0.7,
        speedRate:0.7
    },

    [LAYER.FRONT]:{
        scale:1.0,
        speedRate:1.0
    }
};


// layer移動範囲
const LAYER_MOVE_RANGE={
    [LAYER.FAR]:{
        yMin:180,
        yMax:260
    },

    [LAYER.MIDDLE]:{
        yMin:60,
        yMax:470
    },

    [LAYER.FRONT]:{
        yMin:60,
        yMax:500
    }
};


// WARNING停止位置
const WARNING_POSITION={
    xMin:120,
    xMax:240
};


// WARNING設定
const WARNING_SETTINGS={
    duration:1500
};


// 吸血設定
const SUCKING_SETTINGS={
    duration:3000,
    damageCountLimit:3
};


// セリフ表示設定
const DIALOGUE_SETTINGS={
    mode:DIALOGUE_MODE.MULTI,
    duration:1200,
    offsetY:24
};


// セリフ履歴設定
const DIALOGUE_HISTORY_SETTINGS={
    maxCount:8,
    enabled:true
};


// セリフ表示倍率
const DIALOGUE_SCALE={
    [LAYER.FAR]:0.8,
    [LAYER.MIDDLE]:0.9,
    [LAYER.FRONT]:1.0
};


// 撃破演出設定
const DESTROY_SETTINGS={
    hitDuration:300,

    [LAYER.FAR]:{
        fallEndY:300,
        fallSpeed:3,
        rotationSpeed:8
    },

    [LAYER.MIDDLE]:{
        fallEndY:500,
        fallSpeed:3,
        rotationSpeed:12
    },

    [LAYER.FRONT]:{
        fallEndY:SCREEN.height,
        fallSpeed:3,
        rotationSpeed:15
    }
};


// 色タイプ設定
const COLOR_SETTINGS={
    BLACK:{
        weight:80,
        baseSpeed:2,
        dialogueColor:"#222"
    },

    RED:{
        weight:20,
        baseSpeed:3,
        dialogueColor:"#c00"
    }
};


// 蚊属性設定
const ATTRIBUTE_SETTINGS={
    rookie:{
        name:"蚊",
        weight:70,
        evadeRate:0.05
    },

    aggressive:{
        name:"好戦蚊",
        weight:20,
        evadeRate:0.10
    },

    mobile:{
        name:"モビル蚊",
        weight:20,
        evadeRate:0.20
    },

    zawa:{
        name:"ざわ…蚊",
        weight:10,
        evadeRate:0.05
    },

    jojo:{
        name:"奇妙な蚊",
        weight:10,
        evadeRate:0.10
    }

};