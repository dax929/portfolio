// JavaScript Document

//ロード画面
$(function () {
  imagesProgress();
  function imagesProgress () {
    //変数定義
    var
    progress = $(".progress"),
    progressBar = $(".progress_bar"),
    progressText = $(".progress_text"),
    progressTitle = $("progress_title"),
    progressBg = $(".progress_bg"),
    //エラーは気にしなくてよき
    imgLoad = imagesLoaded("body"),
    imgTotal = imgLoad.images.length,
    imgLoaded = 0,
    current = 0,
    progressTimer = setInterval(updateProgress, 1000 / 60);

    imgLoad.on("progress", function () {
        imgLoaded++;
    });

    function updateProgress () {
        //progressbarの動き
        var target = (imgLoaded / imgTotal) * 100;
        current += (target - current) * 0.1;
        var windowWidth = $(window).width();
        if (windowWidth >= 560){
            progressBar.css({ width: current*2.5 + "px" });
        }else{
            progressBar.css({ width: current*1.8 + "px" });
        }
        progressText.text(Math.floor(current) + "%");

        //ロード完了の動き
        if(current >= 100){
            clearInterval(progressTimer);
            //progressBarを変更
            progressBar.addClass("progress_bar_complete");
            //これでタグ記載のstyleを消す
            progressBar.removeAttr("style");
            //progressText消去
            progressText
            .delay(500)
            .animate({ opacity: 0 }, 250);
            //カラー変更
            progress.delay(1000).queue(function(){
                progressBg.addClass("colorInversion");
                //dequeue で終わりを示す
                progress.dequeue();
              })
            progress.delay(2010).queue(function(){

                //progressの色反転を全て無効に
                progress.css({
                    zIndex: "2" ,
                    backgroundColor: "transparent"
                });
                $(".colorInversion").delay({display: "none"});

                $(".progress_bar_complete").css({
                    backgroundColor: "#070707",
                    zIndex: "995"
                });
                progressTitle.css({
                    zIndex: "995"
                });

                $(".bg_text_top").addClass("slideIn");
                $(".bg_text_bottom").addClass("slideIn");
                $(".bg_cp").animate({opacity: 1});
                $(".cursor").animate({opacity:1});
                $(".colorInversion").animate({opacity: 0},1500);


            })

        }else if (current > 99.9) {
            current = 100;
        }
        }
    }
});

//カーソル
$(function(){
    //カーソル移動
    //定義
    var
    cursorText = $(".cursor_text"),
    follower = $(".cursor_follower"),
    cursorHold = $(".cursor_hold"),
    mouseX = 0,
    mouseY = 0,
    fWidth = 100,
    CHWidth = 100;

    //mouseが移動した時
    document.addEventListener('mousemove', function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;

        cursorText.css({
            transform: "translate(" + (mouseX - 50) + "px," + (mouseY - 50) + "px)"
        })
        follower.css({
            transform: "translate(" + (mouseX - fWidth / 2) + "px," + (mouseY - fWidth / 2) + "px)"
        })
        cursorHold.css({
            transform: "translate(" + (mouseX - CHWidth / 2) + "px," + (mouseY -
                       CHWidth / 2) +
            "px) rotate(-90deg)"
        })
    })
    //mouseが画面外に出た時
    document.addEventListener("mouseleave", function(){
        cursorText.css({
            display: "none"
        })
        follower.css({
            display: "none"
        })
        cursorHold.attr("class" ,function(index, classNames){
           return classNames.replace(" cursor_holding", "");
        });
        cursorHold.attr("class" ,function(index, classNames){
           return classNames.replace(" cursor_reverse", "");
        });
        cursorHold.css({
            display: "none"
        })
    })
    //mouseが画面内に入った時
    document.addEventListener("mouseenter", function(){
        cursorText.css({
            display: "inline-block"
        })
        follower.css({
            display: "inline-block"
        })
        cursorHold.css({
            display: "inline-block"
        })
    })

    //カーソル長押し

    var
    timer = 0;

    document.addEventListener("mousedown", function(e){
        if (e.which == 1){
            //左クリックを検出
            cursorHold.dequeue();
            e.preventDefault();
            cursorText.css({
                visibility: "hidden"
            })
            fWidth = 360;
            follower.css({
                transform: "translate(" + (mouseX - fWidth / 2) + "px," + (mouseY - fWidth / 2) + "px)"
            })
            follower.addClass("follower_hold");

            CHWidth = 360;
            cursorHold.css({
                transform: "translate(" + (mouseX - CHWidth / 2) + "px," + (mouseY -
                           CHWidth / 2) +
                "px) rotate(-90deg)"
            })
            //svgはaddClassできない!!!
            cursorHold.attr("class", function(index, classNames) {
                return classNames + " cursor_holding";
                //クラス名前のインデント必須
            })
            //長押し成功イベント発火
            timer = setTimeout(function(){
              var imgLeft = $(".bg_img_left"),
                  imgRight = $(".bg_img_right"),
                  progress = $(".progress"),
                  progressBar = $(".progress_bar"),
                  progressTitle = $(".progress_title"),
                  bgText = $(".bg_text"),
                  bgCp = $(".bg_cp"),
                  linkWrapper = $(".link_wrapper");

              //サークル光る
              //他の消える
              progress.animate({opacity: 0},500);
              progressBar.animate({opacity: 0},500);
              progressTitle.animate({opacity: 0},500);
              bgText.animate({opacity: 0},500);
              bgCp.animate({opacity: 0},500);
              //スライドイン
              imgLeft.addClass("slideIn");
              imgRight.addClass("slideIn");
              linkWrapper.css({
                  visibility: "visible"
              })
              linkWrapper.animate({opacity: 1},1000);
              //カーソルの変更



            },2100)
        }
    })
    //mouseを離したとき
    document.addEventListener("mouseup", function(e){
        if (e.which == 1){
            clearTimeout(timer);

            //cursor_reverse追加
            cursorHold.attr("class", function(index, classNames) {
                return classNames + " cursor_reverse";
                //クラス名前のインデント必須
            });

            cursorHold.delay(200).queue(function(){

              //cursor_text表示
              cursorText.css({
                visibility: "visible"
              })
              //followerもとに戻す
              follower.removeClass("follower_hold");
              fWidth = 100
              follower.css({
                transform: "translate(" + (mouseX - fWidth / 2) + "px," + (mouseY - fWidth / 2) + "px)"
              })

              //cursor_holdをもとに戻す。
              CHWidth = 100;
              cursorHold.css({
                transform: "translate(" + (mouseX - CHWidth / 2) + "px," + (mouseY - CHWidth / 2) + "px) rotate(-90deg)"
              })

              //class 消去
              cursorHold.attr("class" ,function(index, classNames){
                 return classNames.replace(" cursor_holding cursor_reverse", "");
              });
              cursorHold.dequeue();
            })
        }
    })

    document.addEventListener("mouseleave", function(e){
        e.preventDefault();
        cursorHold.attr("class" ,function(index, classNames){
            return classNames.replace("cursor_holding", "");
        });

    })
})

//クリップパスアニメーション
$(function(){

    var
    mouseX = 0,
    mouseY = 0,
    boxWidth = $("#boxA").width(),
    boxA = $("#boxA"),
    boxB = $("#boxB"),
    boxC = $("#boxC"),
    boxD = $("#boxD"),
    boxE = $("#boxE"),
    boxF = $("#boxF"),
    winWidth = $(window).width(),
    winHeight  =$(window).height();

    document.addEventListener("mousemove" ,function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
        boxWidth = $("#boxA").width();
        winWidth = $(window).width();
        winHeight  =$(window).height();

        function
        mouseMove(defaultPos, winRange , mousePos,boxRange){

            var
            //エラーは気にしない
            boxPostion =
            (defaultPos +
            ((winRange / 2) - mousePos) /
            (winRange / 2)
             * boxRange)
            return boxPostion;
        }

        if(mouseX <= (winWidth / 2 )){
            if(mouseY <= (winHeight / 2 )){
                //1
                boxA.css({
                    transform: "translate(" +
                    mouseMove(
                    //1
                    0,
                    winWidth,
                    mouseX,
                    (winWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //1
                    (winHeight / 2 - boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxB.css({
                    transform: "translate(" +
                    mouseMove(
                    //1
                    boxWidth,
                    winWidth,
                    mouseX,
                    (winWidth / 2 - boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //1
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxC.css({
                    transform: "translate(" +
                    mouseMove(
                    //1
                    (boxWidth * 1.5),
                    winWidth,
                    mouseX,
                    (winWidth / 2  - boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //1
                    0,
                    winHeight,
                    mouseY,
                    (winHeight - boxWidth * 2)
                    )
                    + "px)"
                })
                boxD.css({
                    transform: "translate(" +
                    mouseMove(
                    //1 C-4
                    (boxWidth * 3.5),
                    winWidth,
                    mouseX,
                    (boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //1 C-4
                    (winHeight - boxWidth),
                    winHeight,
                    mouseY,
                    0
                    )
                    + "px)"
                })
                boxE.css({
                    transform: "translate(" +
                    mouseMove(
                    //1 B-4
                    (boxWidth * 4),
                    winWidth,
                    mouseX,
                    (boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //1 B-4
                    (winHeight / 2 -boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxF.css({
                    transform: "translate(" +
                    mouseMove(
                    //1 F-4
                    (winWidth - boxWidth),
                    winWidth,
                    mouseX,
                    (0)
                    )
                    + "px," +
                    mouseMove(
                    //1 F-4
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })



            }else{
                //2
                boxA.css({
                    transform: "translate(" +
                    mouseMove(
                    //1と同じ
                    0,
                    winWidth,
                    mouseX,
                    (winWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //2
                    (winHeight / 2 - boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxB.css({
                    transform: "translate(" +
                    mouseMove(
                    //1と同じ
                    boxWidth,
                    winWidth,
                    mouseX,
                    (winWidth / 2 - boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //2
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxC.css({
                    transform: "translate(" +
                    mouseMove(
                    //1と同じ
                    (boxWidth * 1.5),
                    winWidth,
                    mouseX,
                    (winWidth / 2  - boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //2
                    0,
                    winHeight,
                    mouseY,
                    0
                    )
                    + "px)"
                })
                boxD.css({
                    transform: "translate(" +
                    mouseMove(
                    //2 C-3
                    (boxWidth * 3.5),
                    winWidth,
                    mouseX,
                    (boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //2 C-3
                    (winHeight - boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight - boxWidth * 2)
                    )
                    + "px)"
                })
                boxE.css({
                    transform: "translate(" +
                    mouseMove(
                    //2 B-3
                    (boxWidth * 4),
                    winWidth,
                    mouseX,
                    (boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //2 B-3
                    (winHeight / 2 -boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxF.css({
                    transform: "translate(" +
                    mouseMove(
                    //2 A-3
                    (winWidth - boxWidth),
                    winWidth,
                    mouseX,
                    (0)
                    )
                    + "px," +
                    mouseMove(
                    //2 A-3
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
            }

        }else{
            if(mouseY <= (winHeight / 2)){
                //3
                boxA.css({
                    transform: "translate(" +
                    mouseMove(
                    //3
                    0,
                    winWidth,
                    mouseX,
                    (0)
                    )
                    + "px," +
                    mouseMove(
                    //1と同じ
                    (winHeight / 2 - boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxB.css({
                    transform: "translate(" +
                    mouseMove(
                    //3
                    boxWidth,
                    winWidth,
                    mouseX,
                    (boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //1と同じ
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxC.css({
                    transform: "translate(" +
                    mouseMove(
                    //3
                    (boxWidth * 1.5),
                    winWidth,
                    mouseX,
                    (boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //1と同じ
                    0,
                    winHeight,
                    mouseY,
                    (winHeight - boxWidth * 2)
                    )
                    + "px)"
                })
                boxD.css({
                    transform: "translate(" +
                    mouseMove(
                    //3 C-2
                    (boxWidth * 3.5),
                    winWidth,
                    mouseX,
                    (winWidth / 2  - boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //3 C-2
                    (winHeight - boxWidth),
                    winHeight,
                    mouseY,
                    0
                    )
                    + "px)"
                })
                boxE.css({
                    transform: "translate(" +
                    mouseMove(
                    //3 B-2
                    (boxWidth * 4),
                    winWidth,
                    mouseX,
                    (winWidth / 2 - boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //3 B-2
                    (winHeight / 2 -boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxF.css({
                    transform: "translate(" +
                    mouseMove(
                    //3 A-2
                    (winWidth - boxWidth),
                    winWidth,
                    mouseX,
                    (winWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //3 A-2
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })

            }else{
                //4
                boxA.css({
                    transform: "translate(" +
                    mouseMove(
                    //3と同じ
                    0,
                    winWidth,
                    mouseX,
                    (0)
                    )
                    + "px," +
                    mouseMove(
                    //2と同じ
                    (winHeight / 2 - boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxB.css({
                    transform: "translate(" +
                    mouseMove(
                    //3と同じ
                    boxWidth,
                    winWidth,
                    mouseX,
                    (boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //2と同じ
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxC.css({
                    transform: "translate(" +
                    mouseMove(
                    //3と同じ
                    (boxWidth * 1.5),
                    winWidth,
                    mouseX,
                    (boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //2と同じ
                    0,
                    winHeight,
                    mouseY,
                    0
                    )
                    + "px)"
                })
                boxD.css({
                    transform: "translate(" +
                    mouseMove(
                    //4 C-1
                    (boxWidth * 3.5),
                    winWidth,
                    mouseX,
                    (winWidth / 2  - boxWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //4 C-1
                    (winHeight - boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight - boxWidth * 2)
                    )
                    + "px)"
                })
                boxE.css({
                    transform: "translate(" +
                    mouseMove(
                    //4 B-1
                    (boxWidth * 4),
                    winWidth,
                    mouseX,
                    (winWidth / 2 - boxWidth)
                    )
                    + "px," +
                    mouseMove(
                    //4 B-1
                    (winHeight / 2 -boxWidth),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })
                boxF.css({
                    transform: "translate(" +
                    mouseMove(
                    //4 A-1
                    (winWidth - boxWidth),
                    winWidth,
                    mouseX,
                    (winWidth / 2)
                    )
                    + "px," +
                    mouseMove(
                    //4 A-1
                    (winHeight / 2 ),
                    winHeight,
                    mouseY,
                    (winHeight / 2 - boxWidth)
                    )
                    + "px)"
                })



            }
        }

    })
})
//リンク

$(function(){
    var about = $(".about_link"),
        works = $(".works_link"),
        aboutBar = $(".link_bar_about"),
        worksBar = $(".link_bar_works"),
        imgLeft = $(".bg_img_left"),
        imgRight = $(".bg_img_right");

    mouseenter(about,imgLeft,aboutBar,stop)
    mouseleave(about,imgLeft,aboutBar,stop)
    mouseenter(works,imgRight,worksBar,stop)
    mouseleave(works,imgRight,worksBar,stop)

    function mouseenter(link,img,linkBar,callback){
        link.mouseenter(function(){
            var windowWidth = $(window).width();
            if(windowWidth >= 560){
                img.removeClass("slideIn");
                link.css({
                  color : "black"
                })
                linkBar.css({
                  height : "2px",
                  backgroundColor : "black"
                })
                callback(link,img,linkBar);
            }
        })
    }

    function mouseleave(link,img,linkBar,callback){
        link.mouseleave(function(){
            var windowWidth = $(window).width();
            if(windowWidth >= 560){
                img.addClass("slideIn");
                link.css({
                  color : "white"
                })
                linkBar.css({
                  height : "40px",
                  backgroundColor : "white"
                })
                callback(link,img,linkBar);
            }
        })
    }

    function stop(link,img,linkBar){
        link.stop(false, true);
        img.stop(false, true);
        linkBar.stop(false, true);
    }
});
