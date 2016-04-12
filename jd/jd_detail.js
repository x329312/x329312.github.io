function $(selector){
	return document.querySelectorAll(selector);
}
window.onload=function(){
	$(".service")[0].onmouseover=
		$(".app_jd")[0].onmouseover=function(){
			$("."+this.className+">[id$='_items']")[0].style.display="block";
			$("."+this.className+">a")[0].className="hover";
		}
	$(".service")[0].onmouseout=
		$(".app_jd")[0].onmouseout=function(){
			$("."+this.className+">[id$='_items']")[0].style.display="none";
			$("."+this.className+">a")[0].className="";
		}
	var lis=$("#cate_box>li");
	for(var i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			this.children[1].style.display="block";
			this.children[0].className="hover";
		}
		lis[i].onmouseout=function(){
			this.children[1].style.display="none";
			this.children[0].className="";
		}
	}
	picture.init(picture);
	$("#product_detail>.main_tabs")[0].onclick=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			var li=null;
			if (target.nodeName=="A"){
				li=target.parentNode;
			}else if(target.nodeName=="LI"){
				li=target;
			}
			if (li){
				if(li.className!="current"){
					var currLi=$("#product_detail>.main_tabs>li.current")[0].className="";
					li.className="current";

					var i=li.dataset.i;
					var divs=$("#product_detail>[id^='product_']");
					//无论本次点哪个li，都先隐藏所有
					for(var n=0;n<divs.length;n++){
						divs[n].style.display="none";
					}
					if(i!==undefined){
					//在divs中找到下标为i的元素，将其显示
						divs[i].style.display="block";
					}
				}
			}
		}
}

var picture={
	count:0,//记录图片的总数
	moved:0,//图片左移的张数
	LIWIDTH:0,//每个LI的宽度
	STARTLEFT:0,//left的初始值

	SMHEIGHT:0,//superMask 的 宽高
	SMWIDTH:0,
	MHEIGHT:0,//mask 的 宽高
	MWIDTH:0,

	init:function(){
		var me=this;
		var lis=$("#icon_list>li");//找到ul下的所有li
		this.count=lis.length;//初始图片总数
		this.LIWIDTH=parseFloat(getComputedStyle(lis[0]).width);
		this.STARTLEFT=parseFloat(getComputedStyle($("#icon_list")[0]).left);
		//找到两个a 分别绑定move
		var btns=$("#preview>h1>a");
		btns[0].onclick=btns[1].onclick=function(){
			var btn=this;
			if (btn.className.indexOf("disabled")==-1)
			{
				me.moved+=
					btn.className=="forward"?1:-1;
				$("#icon_list")[0].style.left=-(me.moved*me.LIWIDTH)+me.STARTLEFT+"px";

				var btns=$("#preview>h1>a");
				if(me.moved==0){
					btns[0].className="backward_disabled";
				}else if(me.count-me.moved==5){
					btns[1].className="forward_disabled";
				}else{
					btns[0].className="backward";
					btns[1].className="forward";
				}
			}
		}

		//鼠标移入显示大图片
		$("#icon_list")[0].onmouseover=function(e){
			e=window.event||e;
			var target=e.target||e.srcElement;
			if (target.nodeName=="IMG")
			{
				var path=target.src;
				var i=path.lastIndexOf(".");
				$("#mImg")[0].src=path.slice(0,i)+"-m"+path.slice(i);
			}
		}

		$("#superMask")[0].onmouseover=
			$("#superMask")[0].onmouseout=function(){
			$("#mask")[0].style.display=
			$("#mask")[0].style.display!="block"?"block":"none";
			//超大图
			var path=$("#mImg")[0].src;
			var i=path.lastIndexOf(".");
			path=path.slice(0,i-1)+"l"+path.slice(i);
			$("#largeDiv")[0].style.backgroundImage='url('+path+')';
			$("#largeDiv")[0].style.display=$("#mask")[0].style.display;
		}

		var style=getComputedStyle($("#superMask")[0]);
		this.SMHEIGHT=parseFloat(style.height);
		this.SMWIDTH=parseFloat(style.width);
		style=getComputedStyle($("#mask")[0]);
		this.MHEIGHT=parseFloat(style.height);
		this.MWIDTH=parseFloat(style.width);

		$("#superMask")[0].onmousemove=function(e){
			e=window.event||e;
			var x=e.offsetX;
			var y=e.offsetY;
			var mTop=y-(me.MHEIGHT/2);
			var mLeft=x-(me.MWIDTH/2);
			if (mTop<0){
				mTop=0;
			}else if(mTop>me.SMHEIGHT-me.MHEIGHT){
				mTop=me.SMHEIGHT-me.MHEIGHT;
			}
			if(mLeft<0){
				mLeft=0;
			}else if(mLeft>me.SMWIDTH-me.MWIDTH){
				mLeft=me.SMWIDTH-me.MWIDTH;
			}
			$("#mask")[0].style.top=mTop+"px";
			$("#mask")[0].style.left=mLeft+"px";
			$("#largeDiv")[0].style.backgroundPosition=-2.2*mLeft+"px "+(-2.2*mTop)+"px";
		}

		
	}
	
}