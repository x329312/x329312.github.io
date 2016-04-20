/**
 * Created by Administrator on 2016-4-8.
 */
$(function () {
    $('.main').onepage_scroll({
        sectionContainer: '.page',
        loop: false,//循环
        responsiveFallback: 998,
        keyboard:false,
        afterMove: function (index) {//分页
            if (index != 1) {
                $(".topdex").css({
                    "background-color": "#f8f8f8",
                    "box-shadow": "0 2px 4px rgba(0,0,0,.1)"
                });
                $(".nava").css({
                    "color":"#777",
                    "text-shadow": "2px 2px 4px rgba(0,0,0,0)"
                });
                $("#myc>ul>li>a").hover(
                    function () {
                        $(this).css({"background-color":"rgba(75, 191, 195,0.6)","color":"#fff"});
                    },
                    function () {
                        $(this).css({"background-color":"rgba(155,194,0,0.0)","color":"#777"});
                    }
                );
                $("#nomologo").css({
                    "color": "#4bbfc3",
                    "text-shadow": "2px 2px 4px rgba(0,0,0,0)"
                });
                $(" #hanbao>span").css({
                    "background": "#999"
                });
                $("#firsta").css({
                    "background": "#4bbfc3",
                    "color":"#fff"
                });
            }else {
                $(".topdex").css({
                    "background-color": "rgba(248, 248, 248, 0)",
                    "box-shadow": "1px 2px 3px rgba(0,0,0,0)"
                });
                $(".nava").css({
                    "color":"#f8f8f8",
                    "text-shadow": "2px 2px 4px rgba(0,0,0,0.4)"
                });
                $(".nava:hover").css({
                    "background": "rgba(231, 231, 231, 0.30)"
                });
                $("#nomologo").css({
                    "color": "#f8f8f8",
                    "text-shadow": "2px 2px 4px rgba(0,0,0,4)"
                });
                $(" #hanbao>span").css({
                    "background": "#f8f8f8"
                });
                $("#myc>ul>li>a").css({
                    "border-radius": "50%"
                });
                $("#firsta").css({
                    "background": "rgba(231, 231, 231, 0.35)"
                });
                $("#myc>ul>li>a").hover(
                    function () {
                        $(this).css({"background-color":"rgba(231, 231, 231, 0.20)","color":"#fff"});
                    },
                    function () {
                        $(this).css({"background-color":"rgba(155,194,0,0.0)","color":"#fff"});
                    }
                );
            }
        if(index == 2) {
            $(".game").css({
                "margin-top": "2em"
            });
        }
        if(index == 3) {
            $(".moblie1").css({
                "left": "200px"
            });
            $(".moblie2").css({
                "transform": "rotate(-15deg)",
                "left": "100px"
            });
            $(".ziyuan").css({
                "margin-left": "45%"
            });
        }

        }
    });

    //随机壁纸
    var randomNum = parseInt(Math.random() * 9);
    console.log(randomNum);
    var bgImage = document.getElementById("large-header");
    bgImage.style.backgroundImage = "url(img/demo-" + randomNum + "-bg.jpg)";

    //模态框
    $('#modala1').click(function(){
        $('#modal1').modal({backdrop:'static'});
    });
    $('#modala2').click(function(){
        $('#modal2').modal({backdrop:'static'});
    });
    $('#modala3').click(function(){
        $('#modal3').modal({backdrop:'static'});
    });
    $('#modala4').click(function(){
        $('#modal4').modal({backdrop:'static'});
    });

    $("#firsta").click(function(){$('.main').moveTo(1);});
    $("#in2").click(function(){$('.main').moveTo(2);});
    $("#in3").click(function(){$('.main').moveTo(3);});
    $("#in4").click(function(){$('.main').moveTo(4);});
});