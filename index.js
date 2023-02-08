// JavaScript Document


//vhの定義
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// ここからリサイズの対応
let vw = window.innerWidth;
window.addEventListener('resize', () => {
  if (vw === window.innerWidth) {
  // 画面の横幅にサイズ変動がないので処理を終える
    return;
  }

  // 画面の横幅のサイズ変動があった時のみ高さを再計算する
  vw = window.innerWidth;
  setFillHeight();
});

// 実行
setFillHeight();


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
        if (windowWidth >= 600){
            progressBar.css({ width: current*3.2 + "px" });
        }else{
            progressBar.css({ width: current*2.6 + "px" });
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
              progress.dequeue();
            })
            progress.delay(1200).queue(function(){
              $(".tap").animate({opacity:1});
              progress.dequeue();
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
    cursorDot = $(".cursor_dot"),
    follower = $(".cursor_follower"),
    mouseX = 0,
    mouseY = 0,
    fWidth = 100;

    //mouseが移動した時
    document.addEventListener('mousemove', function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;

        cursorDot.css({
            transform: "translate(" + (mouseX - 10) + "px," + (mouseY - 10) + "px)"
        })
        follower.css({
            transform: "translate(" + (mouseX - fWidth / 2) + "px," + (mouseY - fWidth / 2) + "px)"
        })
    })
    //mouseが画面外に出た時
    document.addEventListener("mouseleave", function(){
        cursorDot.css({
            display: "none"
        })
        follower.css({
            display: "none"
        })
    })
    //mouseが画面内に入った時
    document.addEventListener("mouseenter", function(){
        cursorDot.css({
            display: "inline-block"
        })
        follower.css({
            display: "inline-block"
        })
    })
})

//TAPアニメーション

//TAP hover
$(function(){
  var
  cursorDot = $(".cursor_dot"),
  follower = $(".cursor_follower"),
  tapBtn = $(".tap_btn");

  tapBtn.hover(
    function(e){
      cursorDot.css({
        opacity: 0
      })
      follower.css({
        opacity: 0
      })
    },
    function(e){
      cursorDot.css({
        opacity: 1
      })
      follower.css({
        opacity: 1
      })
    }
  );
})

//TAP click

$(function(){

  var slideImg = $(".slide_img")
      slideAbout = $(".slide_img_about"),
      slideWorks = $(".slide_img_works"),
      progress = $(".progress"),
      progressBar = $(".progress_bar"),
      progressTitle = $(".progress_title"),
      bgText = $(".bg_text"),
      bgCp = $(".bg_cp"),
      linkWrapper = $(".link_wrapper"),
      cursorDot = $(".cursor_dot"),
      follower = $(".cursor_follower"),
      tap = $(".tap"),
      tapBtn = $(".tap_btn");

  tapBtn.click(function(){

    //色々なものを消す

    progress.animate({opacity: 0},700);
    progressBar.animate({opacity: 0},700);
    progressTitle.animate({opacity: 0},700);
    bgText.animate({opacity: 0},700);
    bgCp.animate({opacity: 0},700);
    tapBtn.animate({opacity: 0},700);
    tap.addClass("tap_click");

    tapBtn.delay(10).queue(function(){
      slideAbout.addClass("slideIn");
      slideWorks.addClass("slideIn");
      linkWrapper.css({
          visibility: "visible"
      })
      tapBtn.css({
        visibility: "hidden"
      })
      tapBtn.dequeue();
    })
    linkWrapper.delay(1500).queue(function(){
      linkWrapper.css({
        opacity: 1
      })
      slideImg.css({
        transition: "1s"
      })
      linkWrapper.dequeue();
    })
  })


})

//リンクアニメーション

//リンクホバー

$(function(){

    mouseenter("about","works","scale(3.5) translate(-30vw, -10vh)","scale(3.5) translate(-30vw,10vh)")
    mouseleave("about","works","scale(3.5) translate(-10vw, -10vh)","scale(3.5) translate(30vw,10vh)")
    mouseenter("works","about","scale(3.5) translate(30vw, 10vh)","scale(3.5) translate(30vw,-10vh)")
    mouseleave("works","about","scale(3.5) translate(10vw, 10vh)","scale(3.5) translate(-30vw,-10vh)")

    //マウスエンター関数
    function mouseenter(target,another,translate,anotherTranslate){

      var link = $("." + target + "_link_text"),
          slide = $(".slide_img_" + target),
          bar = $(".link_bar_" + target),
          anotherLink = $("." + another + "_link_text"),
          anotherSlide = $(".slide_img_" + another),
          anotherBar = $(".link_bar_" + another),
          bgImg = $("." + target + "_bg_img"),
          anotherBgImg = $("." + another + "_bg_img"),
          contents = $("." + target + "_contents"),
          anotherContents = $("." + another + "_contents");

      link.mouseenter(function(){

        var click = "slide_" + target + "_click",
            anotherClick = "slide_" + another + "_click";

        if($("img").hasClass(anotherClick)){
          //anotherをクリック中
          slide.removeClass("slideIn");
          slide.css({
            transform : translate ,
            opacity: 0
          })
          link.css({
            color : "#070707"
          })
          bar.css({
            height : "2px",
            backgroundColor : "#070707"
          })

          //another
          anotherLink.removeClass("link_text_click");
          anotherBar.removeClass("link_bar_click");
          anotherLink.css({
            color : "#f8f8f8"
          })
          anotherBar.css({
            height : "40px",
            backgroundColor : "#f8f8f8"
          })

          anotherSlide.css({
            transform : anotherTranslate ,
            opacity: 1
          });

          anotherContents.css({
            opacity: 0
          })

        }else if ($("img").hasClass(click)) {

        }else{
          //最初の初期状態

          link.delay(10).queue(function(){
            bgImg.css({
              opacity: 1
            })
            link.dequeue();
          })
          link.delay(100).queue(function(){
            slide.removeClass("slideIn");
            link.css({
              color : "#070707"
            })
            bar.css({
              height : "2px",
              backgroundColor : "#070707"
            })
            link.dequeue();
          })
        }
      })
    }

    function mouseleave(target,another,translate,anotherTranslate){

      var link = $("." + target + "_link_text"),
          slide = $(".slide_img_" + target),
          bar = $(".link_bar_" + target),
          anotherLink = $("." + another + "_link_text"),
          anotherSlide = $(".slide_img_" + another),
          anotherBar = $(".link_bar_" + another),
          bgImg = $("." + target + "_bg_img"),
          anotherBgImg = $("." + another + "_bg_img"),
          contents = $("." + target + "_contents"),
          anotherContents = $("." + another + "_contents");

      link.mouseleave(function(){

        var click = "slide_" + target + "_click",
            anotherClick = "slide_" + another + "_click";

        if($("img").hasClass(anotherClick)){
          slide.css({
            transform : translate ,
            opacity: 1
          })
          link.css({
            color : "#f8f8f8"
          })
          bar.css({
            height : "40px",
            backgroundColor : "#f8f8f8"
          })

          //another
          anotherLink.addClass("link_text_click");
          anotherBar.addClass("link_bar_click");
          anotherSlide.css({
            transform: anotherTranslate,
            opacity: 1
          });

          anotherContents.css({
            opacity: 1
          })

        }else if ($("img").hasClass(click)) {

        }else{

          link.delay(10).queue(function(){
            slide.addClass("slideIn");
            link.css({
              color : "#f8f8f8"
            })
            bar.css({
              height : "40px",
              backgroundColor : "#f8f8f8"
            })
            link.dequeue();
          })
          link.delay(100).queue(function(){
            bgImg.css({
              opacity: 0
            })
            link.dequeue();
          })
        }
      })
    }
})

//リンククリック
$(function(){
    var aboutWrapper = $(".link_wrapper_about"),
        worksWrapper = $(".link_wrapper_works");

    click("about","works","scale(3.5) translate(-30vw,-10vh)","scale(3.5) translate(10vw, 10vh)");
    click("works","about","scale(3.5) translate(30vw,10vh)","scale(3.5) translate(-10vw, -10vh)");

    function click(target,another,translate,anotherTranslate){

      var link = $("." + target + "_link_text"),
          slide = $(".slide_img_" + target),
          bar = $(".link_bar_" + target),
          wrapper = $(".link_wrapper_" + target),
          anotherLink = $("." + another + "_link_text"),
          anotherSlide = $(".slide_img_" + another),
          anotherBar = $(".link_bar_" + another),
          anotherWrapper = $(".link_wrapper_" + another),
          contents = $("." + target + "_contents"),
          anotherContents = $("." + another + "_contents"),
          bgImg = $("." + target + "_bg_img"),
          anotherBgImg = $("." + another + "_bg_img");



      link.click(function(){

        var click = "slide_" + target + "_click",
            anotherClick = "slide_" + another + "_click";

        anotherSlide.removeClass(anotherClick);
        slide.removeClass("slideIn");
        link.addClass("link_text_click");
        bar.addClass("link_bar_click");
        slide.addClass(click);
        anotherContents.css({
          opacity: 0
        })

        link.delay(500).queue(function(){
          aboutWrapper.css({
            transition: "1s",
            top: "5vh",
            left: "3vw"
          })
          worksWrapper.css({
            transition: "1s",
            bottom: "5vh",
            right: "3vw"
          })
          slide.css({
            transform: translate,
            opacity: 0
          })
          anotherSlide.css({
            transform: anotherTranslate,
            opacity: 1
          })
          contents.css({
            visibility: "visible"
          })
          bgImg.css({
            opacity: 0
          })


          link.dequeue();
        })

        link.delay(200).queue(function(){

          contents.css({
            opacity: 1
          })
          anotherContents.css({
            visibility: "hidden"
          })
          link.dequeue();
        })

        link.delay(500).queue(function(){
          if(target == "about"){
            $(".about_main_img_cover").css({
                transform: "scaleY(0)"
            })
          }
          link.dequeue();
        })
        link.delay(1500).queue(function(){
          if(target == "about"){
            $(".about_slide").css({
              transform: "translateX(0)",
              opacity: 1
            })
          }
          link.dequeue();
        })
      })
    }
})


//クリップパスアニメーション(移動)
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
});

//works

$(function(){

    var worksButton = $(".works_wrapper_button"),
        worksIntro = $(".works_intro_wrapper");

    mouseenter(stop)
    mouseleave(stop)

    function mouseenter(callback){
        worksButton.mouseenter(function(){
            var index = worksButton.index(this);
            worksIntro[index].style.opacity = 0.9;
            callback(worksIntro);
        })
    }

    function mouseleave(callback){
        worksButton.mouseleave(function(){
            var index = worksButton.index(this);
            worksIntro[index].style.opacity = 0;
            callback(worksIntro);
        })
    }

    function stop(worksIntro){
        worksIntro.stop(false, true);
    }
});

window.onload = function(){
    $(".page_title").addClass("slideUp");
    $(".works_wrapper").delay(500).queue(function(){
        $(".works_wrapper").addClass("slideUp");

    })
};

