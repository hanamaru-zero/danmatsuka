// ==========================================
// 断末蚊
// config.js
// ==========================================

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

const ZONE={
    FAR:"far",
    MIDDLE:"middle",
    FRONT:"front"
};

// 蚊状態
const PHASE={
    APPROACH:"approach",
    WARNING:"warning",
    SUCKING:"sucking",
    COMPLETE:"complete"
};

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
    PAUSE:"pause",
    DEATH:"death",
    GAMEOVER:"gameover",
    OPTION:"option"
};

// 難易度状態
let selectedDifficulty="NORMAL";
let titleCursorIndex=1;

// 難易度設定
const DIFFICULTY_CONFIG={
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

// CSV保持
let ATTRIBUTE_SETTINGS={};
let DIALOGUE_DATA={};

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

// WARNING設定
const WARNING_POSITION={
    xMin:120,
    xMax:240
};

const WARNING_SETTINGS={
    duration:1500
};

// 吸血設定
const SUCKING_SETTINGS={
    duration:3000,
    damageCountLimit:3
};

// セリフ設定
const DIALOGUE_MODE={
    SINGLE:"single",
    MULTI:"multi"
};

const DIALOGUE_SETTINGS={
    mode:DIALOGUE_MODE.MULTI,
    duration:1200,
    offsetY:24
};

const DIALOGUE_HISTORY_SETTINGS={
    maxCount:8,
    enabled:true
};

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

// 蚊タイプ設定
const COLOR_SETTINGS={
    BLACK:{
        weight:80,
        baseSpeed:2,
        dialogueColor:"#222",
        score:100
    },
    RED:{
        weight:20,
        baseSpeed:3,
        dialogueColor:"#c00",
        score:200
    }
};

// プレイヤー設定
const PLAYER_SETTINGS={
    damageCountLimit:3
};