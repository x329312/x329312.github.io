function $(selector){
	return document.querySelectorAll(selector);
}
/*广告图片数组*/
var imgs=[
    {"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
var slider={
	LIWIDTH:0,//每个li的宽度
	DURATION:500,//动画开始到结束的时间
	STEPS:50,//移动的总步数
	INTERVAL:0,//每一步的时间间隔
	moved:0,//动画已经移动的步数
	WAIT:3000,//自动轮播之间等待的时间
	timer:null,
	canAuto:true,
	init:function(){
		var me=this;
		me.INTERVAL=me.DURATION/me.STEPS;
		me.LIWIDTH=parseFloat(getComputedStyle($("#slider")[0]).width);
		$("#imgs")[0].style.width=me.LIWIDTH*imgs.length+"px";

		for(var i=1,idxs=[];i<=imgs.length;i++){
			idxs[i]="<li>"+i+"</li>";
		}
		$("#indexs")[0].innerHTML=idxs.join("");
		$("#indexs>li:first-child")[0].className="hover";
		
		$("#indexs")[0].onmouseover=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			if(target.nodeName=="LI"&&target.className!="hover"){
				var oldi=$("#indexs>.hover")[0].innerHTML;
				me.move(target.innerHTML-oldi);
			}
		}
		$("#slider")[0].onmouseover=function(){
			me.canAuto=false;
		}
		$("#slider")[0].onmouseout=function(){
			me.canAuto=true;
		}
		me.updateView();
		me.autoMove();
	},
	updateView:function(){//按数组内容更新ul
		for(var i=0,lis=[];i<imgs.length;i++){
			lis[i]='<li><img src="'+imgs[i].img+'"></li>';
		}
		$("#imgs")[0].innerHTML=lis.join("");
		$("#indexs>.hover")[0].className="";
		$("#indexs>li")[imgs[0].i].className="hover";
	},
	move:function(n){//移动n个li，n新的li-旧的li
		clearTimeout(this.timer);
		this.timer=null;
		if(n<0){//右移
			imgs=imgs.splice(imgs.length-(-n),-n).concat(imgs);
			this.updateView();
			$("#imgs")[0].style.left=this.LIWIDTH*n+"px";
		}
		var step=this.LIWIDTH*n/this.STEPS;
		this.moveStep(n,step);
	},
	moveStep:function(n,step){//只负责移动1步
		var left=parseFloat(
			getComputedStyle($("#imgs")[0]).left);
		$("#imgs")[0].style.left=left-step+"px";
		this.moved++;
		if(this.moved<=this.STEPS){//还可继续移动
			this.timer=setTimeout(
				this.moveStep.bind(this,n,step),
				this.INTERVAL
			);
		}else{//否则(移动完毕)
			this.moved=0;
			this.timer=null;
			$("#imgs")[0].style.left="";
			if(n>0){//	如果n>0,左移
				imgs=imgs.concat(imgs.splice(0,n));
				this.updateView();
			}
			this.autoMove();
		}
	},
	autoMove:function(){//启动自动轮播
		if(this.canAuto){
			this.timer=setTimeout(
				this.move.bind(this,1),
				this.WAIT
			);
		}else{
			clearTimeout(this.timer);
			this.timer=setTimeout(
				this.autoMove.bind(this),
				this.WAIT
			);
		}
	}
}
window.addEventListener("load",slider.init.bind(slider),false);