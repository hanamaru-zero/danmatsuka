// ==========================================
// 断末蚊
// mosquitoState.js
// ==========================================

// 蚊初期化
function resetMosquito(mosquito){

    mosquito.phase=PHASE.APPROACH;
    mosquito.layer=LAYER.FAR;
    mosquito.zone=ZONE.FAR;

    mosquito.destroyPhase=DESTROY_PHASE.NONE;
    mosquito.destroyTime=0;
    mosquito.rotation=0;
    mosquito.destroyLayer=LAYER.FAR;

    mosquito.direction=Math.random()<0.5?1:-1;
    mosquito.x=mosquito.direction===1?-50:SCREEN.width+50;

    mosquito.targetX=0;
    mosquito.warningTime=0;
    mosquito.suckTime=0;

    mosquito.dialogue="";
    mosquito.dialogueTimer=0;

    setMosquitoPosition(mosquito);

    showMosquitoDialogue(
        mosquito,
        "spawn"
    );

}


// 接近段階進行
function advanceMosquitoApproach(mosquito){

    if(mosquito.layer===LAYER.FAR){

        mosquito.layer=LAYER.MIDDLE;
        mosquito.zone=ZONE.MIDDLE;
        mosquito.direction*=-1;

        setMosquitoPosition(mosquito);
        return;

    }


    if(mosquito.layer===LAYER.MIDDLE){

        mosquito.layer=LAYER.FRONT;
        mosquito.zone=ZONE.FRONT;
        mosquito.direction*=-1;

        mosquito.targetX=randomRange(
            WARNING_POSITION.xMin,
            WARNING_POSITION.xMax
        );

        setMosquitoPosition(mosquito);
        return;

    }


    if(mosquito.layer===LAYER.FRONT){

        startWarning(mosquito);

    }

}


// WARNING開始
function startWarning(mosquito){

    mosquito.phase=PHASE.WARNING;
    mosquito.warningTime=0;
    mosquito.x=mosquito.targetX;

}


// WARNING → SUCKING
function startSucking(mosquito){

    mosquito.phase=PHASE.SUCKING;
    mosquito.suckTime=0;


    // 吸血開始セリフ表示
    showMosquitoDialogue(
        mosquito,
        "sucking"
    );


    // 吸血開始時点でかゆみダメージ
    addSuckingDamage();

}


// 撃破演出更新
function updateMosquitoDestroy(deltaTime){

    mosquitoes.forEach(mosquito=>{

        if(mosquito.destroyPhase===DESTROY_PHASE.NONE){
            return;
        }


        if(mosquito.destroyPhase===DESTROY_PHASE.HIT){

            mosquito.destroyTime-=deltaTime;

            if(mosquito.destroyTime<=0){
                mosquito.destroyPhase=DESTROY_PHASE.FALL;
            }

            return;

        }


        if(mosquito.destroyPhase===DESTROY_PHASE.FALL){

            const setting=
                DESTROY_SETTINGS[mosquito.destroyLayer];

            mosquito.y+=setting.fallSpeed;
            mosquito.rotation+=setting.rotationSpeed;


            if(mosquito.y>=setting.fallEndY){

                mosquito.destroyPhase=DESTROY_PHASE.END;

            }

            return;

        }


        if(mosquito.destroyPhase===DESTROY_PHASE.END){

            mosquito.spawnTimer=randomRange(
                1000,
                3000
            );

            mosquito.destroyPhase=DESTROY_PHASE.NONE;

        }

    });

}


// 蚊状態更新
function updateMosquitoState(deltaTime){

    updateMosquitoDestroy(deltaTime);


    mosquitoes.forEach(mosquito=>{


        if(!mosquito.alive){
            return;
        }


        if(mosquito.phase===PHASE.WARNING){

            mosquito.warningTime+=deltaTime;


            if(mosquito.warningTime>=WARNING_SETTINGS.duration){

                startSucking(mosquito);

            }


            return;

        }



        if(mosquito.phase===PHASE.SUCKING){

            mosquito.suckTime+=deltaTime;


            if(mosquito.suckTime>=SUCKING_SETTINGS.duration){


                // 吸血完了セリフを残す
                showMosquitoDialogue(
                    mosquito,
                    "complete"
                );


                // 蚊は生存したまま断末演出
                mosquito.phase=PHASE.COMPLETE;


                startDeath();

            }

        }


    });

}