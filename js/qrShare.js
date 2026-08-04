// ==========================================
// 断末蚊
// qrShare.js
// ==========================================

// QR共有画面表示

function openQrShare(){

    const title=document.getElementById("titleScreen");

    if(!title){
        return;
    }

    const shareURL=
        "https://hanamaru-zero.github.io/danmatsuka/";

    title.innerHTML=
    `
    <div class="titleOption">
        <img class="uiIcon"
             src="image/icon/close.png"
             alt="閉じる">
    </div>

    <div class="qrShareTitle">
        友達に伝染する
    </div>

    <div class="qrShareArea">

        <div class="qrCode"
             id="qrCode">
        </div>

        <div class="qrShareText">

            <p>
                このQRコードを読み込むと、
                断末蚊を遊べます。
            </p>

            <p>
                初回通信 約4.3Mbyte（通信ほぼなし）
            </p>

            <p>
                プレイ中通信：蚊ほどもなし
            </p>

        </div>

    </div>
    `;


    const close=document.querySelector(".titleOption");

    if(close){

        close.addEventListener(
            "click",
            ()=>{

                playSE("confirm");

                openOption();

            }
        );

    }


    const qr=document.getElementById("qrCode");

    if(qr && typeof QRCode !== "undefined"){

        new QRCode(
            qr,
            {
                text:shareURL,
                width:180,
                height:180
            }
        );

    }

}