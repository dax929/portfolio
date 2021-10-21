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

//ヘッダー
var startPos = 0, winScrollTop = 0;
$(window).scroll(function(){ 
    winScrollTop = $(this).scrollTop();
    if (winScrollTop<=60) {
        $("header").removeClass("header_fixed")
        $("header").removeClass("header_appear");
    }else if(winScrollTop>=120){
        $("header").addClass("header_fixed")
        if(winScrollTop <=startPos){
            $("header").addClass("header_appear");
        }else {
            $("header").removeClass("header_appear");
            //ヘッダーメニューも同時にしまう
            if($(".slideDown")[0] != undefined){
                $(".menu_button").toggleClass("active");
                $(".header_menu").toggleClass("pointerEventsOn");
                $(".header_menu").toggleClass("slideDown");
            }
        }
    }
    startPos = winScrollTop;
});
//ヘッダー終わり