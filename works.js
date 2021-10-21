// JavaScript Document

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

