// JavaScript Document

window.onload = function(){
    $(".page_title").addClass("slideUp");
    $(".about_contents").delay(500).queue(function(){
        $(".about_contents").addClass("slideUp");
        $(".about_icon").addClass("slideUp");
    })    
};