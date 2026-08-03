// ==========================================
// 断末蚊
// option.js
// ==========================================

// オプション画面表示

function openOption(){

    const title =
        document.getElementById(
            "titleScreen"
        );

    if(!title){
        return;
    }


    title.innerHTML =
    `
    <div class="titleOption">
        <img
            class="uiIcon"
            src="image/icon/close.png"
            alt="閉じる">
    </div>

    <div class="titleLogo">
        OPTION
    </div>

    <div class="gameButtonArea">

        <button id="encyclopediaButton"
                class="gameButton"
                type="button">
            アオリカとは？
        </button>

        <button id="shareButton"
                class="gameButton"
                type="button">
            友達に伝染する
        </button>

    </div>
    `;


    const close =
        document.querySelector(
            ".titleOption"
        );


    if(close){

        close.addEventListener(
            "click",
            closeOption
        );

    }


    const encyclopedia =
        document.getElementById(
            "encyclopediaButton"
        );


    if(encyclopedia){

        encyclopedia.addEventListener(
            "click",
            openEncyclopedia
        );

    }


    const share =
        document.getElementById(
            "shareButton"
        );


    if(share){

        share.addEventListener(
            "click",
            openShare
        );

    }

}


// オプション終了

function closeOption(){

    initTitle();

}