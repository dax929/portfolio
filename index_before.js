// JavaScript Document

//ハンバーガーメニュー
$(function() {
  $(".menu_button").click(function () {
    $(this).toggleClass("active");
    if($(".slideDown")[0] == undefined){
        $(".header_menu").toggleClass("slideDown");
        $(".header_menu").delay(1000).queue(function(){
            $(".header_menu").toggleClass("pointerEventsOn");
            $(this).dequeue();
            //queueを何度も動かしたい時は一度リセットする!!
        })
    }else{
        $(".header_menu").toggleClass("pointerEventsOn");
        $(".header_menu").toggleClass("slideDown");
    }
  });
});
//ハンバーガー終わり

//progress bar
$(function () {
    imagesProgress();
    function imagesProgress () {
        var container = $("#progress"),
        mainIntro = container.find(".main_intro"),
        progressBar = container.find(".progress_bar"),
        progressText = container.find(".progress_text"),
        intro = container.find(".intro"),
        moreButton = container.find(".more_button"),
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
            var target = (imgLoaded / imgTotal) * 100;
            current += (target - current) * 0.1;
            var windowWidth = $(window).width();
            if (windowWidth >= 560){
                progressBar.css({ width: current*2.5 + "px" });
                //この書き方でcssいじれる!!!
            }else{
                progressBar.css({ width: current*1.8 + "px" });
            }
            progressText.text(Math.floor(current) + "%");
            if(current >= 100){
                clearInterval(progressTimer);
                container.addClass("progress_complete");
                progressBar.removeAttr("style");
                //これでタグ記載のstyleを消す
                progressBar.addClass("progress_bar_complete");
                mainIntro.delay(1750).animate({opacity: 1}, 10);
                progressText
                .delay(500)
                .animate({ opacity: 0 }, 250);
                $(".background").delay(1000).queue(function(){
                    $(this).addClass("colorInversion");
                    //なぜかthisを$()で囲ってる
                    $(".gray_zone_index").delay(2000).queue(function(){
                        $(".gray_zone_index")[0].style.top = "0px";
                        //スタイルに直接書き込むときは[]で引数必要!!!!!!
                        $(".footer_index")[0].style.bottom = "0px";
                        intro.add(moreButton).animate({opacity: 1}, 500);
                    })
                })
            }
            if (current > 99.9) {
                current = 100;
            }
        }
    }
});

//スライドイン
$(function() {
  $(".more_button").click(function () {
      $("#progress").animate({opacity: 0} ,500);
      $(".img_left").addClass("slideIn");
      $(".img_right").addClass("slideIn");
      $(".link_wrapper")[0].style.visibility = "visible";
      $(".link_wrapper").delay(100).animate({opacity: 1}, 500);
      //animateの時は[]いらないよ!
  });
});

$(function(){
    var about = $(".about_link"),
        works = $(".works_link"),
        aboutBar = $(".about_link_bar"),
        worksBar = $(".works_link_bar"),
        imgLeft = $(".img_left"),
        imgRight = $(".img_right"),
        backLeftText = $(".back_left_text"),
        backRightText = $(".back_right_text");

    mouseenter(about,imgLeft,aboutBar,backLeftText,stop)
    mouseleave(about,imgLeft,aboutBar,backLeftText,stop)
    mouseenter(works,imgRight,worksBar,backRightText,stop)
    mouseleave(works,imgRight,worksBar,backRightText,stop)

    function mouseenter(link,img,linkBar,backText,callback){
        link.mouseenter(function(){
            var windowWidth = $(window).width();
            if(windowWidth >= 560){
                $(img).removeClass("slideIn");
                link[0].style.color = "black";
                linkBar[0].style.backgroundColor = "black";
                linkBar[0].style.height = " 2px";
                backText[0].style.opacity = 0.2;
                callback(link,img,linkBar,backText);
            }
        })
    }

    function mouseleave(link,img,linkBar,backText,callback){
        link.mouseleave(function(){
            var windowWidth = $(window).width();
            if(windowWidth >= 560){
                $(img).addClass("slideIn");
                link[0].style.color = "white";
                linkBar[0].style.backgroundColor = "white";
                linkBar[0].style.height = " 40px";
                backText[0].style.opacity = 0;
                callback(link,img,linkBar,backText);
            }
        })
    }

    function stop(link,img,linkBar,backText){
        link.stop(false, true);
        $(img).stop(false, true);
        linkBar.stop(false, true);
        backText.stop(false, true);
    }
});

$(function(){

    $(".about_link").click(function() {
        var windowWidth = $(window).width();
            if(windowWidth >= 560){
                window.location.href = "about.html";
            }else{
                $(".img_left").removeClass("slideIn");
                $(".back_left_text")[0].style.opacity = 0.2;
                $(".about_link").delay(1000).queue(function(){
                    window.location.href = "about.html";
                })
            }
    });

    $(".works_link").click(function() {
        var windowWidth = $(window).width();
            if(windowWidth >= 560){
                window.location.href = "works.html";
            }else{
                $(".img_right").removeClass("slideIn");
                $(".back_right_text")[0].style.opacity = 0.2;
                $(".works_link").delay(1000).queue(function(){
                    window.location.href = "works.html";
                })
            }
    });
})
