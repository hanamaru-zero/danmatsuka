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

        <button class="gameButton">
            アオリカとは？
        </button>

        <button class="gameButton">
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


    // アオリカ図鑑ボタン

    const buttons =
        document.querySelectorAll(
            ".gameButton"
        );


    if(buttons[0]){

        buttons[0].addEventListener(
            "click",
            openEncyclopedia
        );

    }

}


// オプション終了

function closeOption(){

    initTitle();

}