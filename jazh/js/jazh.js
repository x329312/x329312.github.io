/**
 * Created by _Nomo on 2016/8/1.
 */
var winWidth = 0;
var winHeight = 0;
function findDimensions() //函数：获取尺寸
{
//获取窗口宽度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
//获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
//通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }

//结果输出至两个文本框
//我想吃炒肝！——刘豆豆
//    document.form1.availHeight.value= winHeight;
//    document.form1.availWidth.value= winWidth;
    console.log(winHeight);
    console.log(winWidth);
    document.getElementsByClassName("bg")[0].style.height=winHeight+"px";
    if(winHeight<768){
        document.getElementsByClassName("logo-0")[0].style.paddingTop=winHeight/4+"px";
    }if(winHeight<1366){
        document.getElementsByClassName("logo-0")[0].style.paddingTop=winHeight/10+"px";
    }else{
        document.getElementsByClassName("logo-0")[0].style.paddingTop=(winHeight-614)/2+"px";
    }


}
findDimensions();
//调用函数，获取数值
window.onresize=findDimensions;
//滚轴事件
$(window).scroll( function() {
    var a = $(this).scrollTop();
    if(a >= 100){
        $('.navbar-default').css({'background-color':'rgba(248, 248, 248, 1)',"box-shadow":"0 3px 20px rgba(0,0,0,.1)"});
        $('.navbar-brand').css({'opacity':'1'});
    }else{
        $('.navbar-default').css({'background-color':'rgba(248, 248, 248, 0)',"box-shadow":"0 3px 20px rgba(0,0,0,.0)"});
        $('.navbar-brand').css({'opacity':'0'});
    }
    if(winWidth>768){
        if(a >= winHeight){
            $('.one-bg>.container').css({'opacity':'1',"padding-left":"70px"});
            $('.text-2').css({'opacity':'1',"padding":"40px 50px 0 0"});
            $('.side').css({'opacity':'1'});
        }
        if(a >= (winHeight+350)){
            $('.text-3').css({'opacity':'1',"padding":"110px 0 0 50px"});
        }
        if(a >= (winHeight+800)){
            $('.four-bg').css({'background-position-y':'130px'});
        }
        if(a >= (winHeight+850)){
            $('.text-4').css({'opacity':'1'});
        }
        if(a >= (winHeight+1150)){
            $('.five-bg').css({'background-position':'center'});
        }
        if(a < winHeight){
            $('.side').css({'opacity':'0'});
        }
    }

} );


$(document).ready(function() {
    $('.next-d').click(function () {
        $("html,body").animate({scrollTop: winHeight}, 600);
    });
    $('.nr').click(function () {
        $("html,body").animate({scrollTop: winHeight}, 600);
    });
    $('.sy').click(function () {
        $("html,body").animate({scrollTop: 0}, 600);
    });
    $('.kh').click(function () {
        $("html,body").animate({scrollTop: winHeight+1920 }, 600);
    });
    $('.lx').click(function () {
        $("html,body").animate({scrollTop: winHeight+2800 }, 600);
    });
    $('.side').click(function () {
        $("html,body").animate({scrollTop: 0}, 600);
    });
    //$('.logo-0').css({'transform':'rotateY(180deg)'});
});