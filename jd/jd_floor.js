//专门计算任意元素距离页面顶部的top值
function getElementTop(element){
	//获得当前元素element距离相对定位的父元素的top值
	var top=element.offsetTop;
	//将element换成相对定位的父元素，再取offsetTop
	while((element=element.offsetParent)!=null){
		top+=element.offsetTop;
	}
	return top;
}

var floor={
	MINTOP:100,//距文档显示区顶部的规定距离
	MAXTOP:0,//距文档显示区底部的规定距离
	init:function(){
		//使用变量me留住this
		var me=this;
		//初始化MAXTOP为innerHeight-MINTOP
		me.MAXTOP=window.innerHeight-me.MINTOP;
		//为document绑定onscroll事件
		document.onscroll=function(){
			//	获得所有.floor下的header下的左移第一个直接子元素的span，保存在spans中
			var spans=$(".floor>header>span:first-child");
			//  遍历spans中每个span
			for(var i=0;i<spans.length;i++){
			//		获得当前span距页面顶部的top值
				var top=getElementTop(spans[i]);
			//		获得页面滚动的scrollTop值
				var scrollTop=
					document.documentElement.scrollTop
					||document.body.scrollTop;
			//		计算距文档显示区顶部top:top-scrollTop,保存在变量innerTop中
				var innerTop=top-scrollTop;
			
				//找到该气泡对应的li下所有a
				var as=$("#elevator li[data-idx='"+
						parseInt(spans[i].innerHTML)
						+"']>a");
				//		如果innerTop>MINTOP&&<MAXTOP
				if(innerTop>me.MINTOP&&innerTop<me.MAXTOP){
			//			修改当前span的class为hover
					spans[i].className="hover";
					
					//	设置li下第1个a隐藏
					as[0].style.display="none";
					//  设置li下第2个a显示
					as[1].style.display="block";
				}else{//否则
			//			清除当前span的class属性
					spans[i].className="";
					//	设置li下第1个a显示
					as[0].style.display="block";
					//  设置li下第2个a隐藏
					as[1].style.display="none";
				}

				if(i==0){//如果当前元素是第1个span
					//如果top<=scrollTop+MAXTOP
					if(top<=scrollTop+me.MAXTOP){
						//将id为elevator的元素显示
						$("#elevator")[0].style.display=
												"block";
					}else{//否则
						//将id为elevator的元素隐藏
						$("#elevator")[0].style.display=
												"none";
					}
				}
			}
		}

		//找到id为elevator下的ul绑定onmouseover事件
		$("#elevator>ul")[0].onmouseover=function(e){
			e=window.event||e;//	获得事件对象e
			//	获得目标元素target
			var target=e.srcElement||e.target;
			target.nodeName=="A"//	如果target是a
			//		则target=target.parentNode
				&&(target=target.parentNode);
			if(target.nodeName=="LI"){//  如果target是Li
			//		找到target下的所有a
				var as=target.getElementsByTagName("a");
				//将第一个a隐藏
				as[0].style.display="none";
				//将第二个a显示
				as[1].style.display="block";
			}
		}
		$("#elevator>ul")[0].onmouseout=function(e){
			e=window.event||e;//	获得事件对象e
			//	获得目标元素target
			var target=e.srcElement||e.target;
			target.nodeName=="A"//	如果target是a
			//		则target=target.parentNode
				&&(target=target.parentNode);
			if(target.nodeName=="LI"){//  如果target是Li
				var span=$("#f"+target.dataset.idx
							+">header>span")[0];
				if(span.className!="hover"){
					//找到target下的所有a
					var as=
						target.getElementsByTagName("a");
					//将第一个a显示
					as[0].style.display="block";
					//将第二个a隐藏
					as[1].style.display="none";
				}
			}
		}
		$("#elevator>ul")[0].onclick=function(e){
			e=window.event||e;
			var target=e.srcElement||e.target;
			target.nodeName=="A"
				&&(target=target.parentNode);
			if(target.nodeName=="LI"){
				//找到target对应的楼层div下header下的span
				var span=$("#f"+target.dataset.idx
							+">header>span")[0];
				//获取span距页面顶部的top
				var top=getElementTop(span);
				//让页面滚动到(0,top-MINTOP)
				scrollTo(0,top-me.MINTOP-1);
			}
		}
	}
}
window.addEventListener(
	"load",floor.init.bind(floor),false
);