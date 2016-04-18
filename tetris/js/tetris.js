function $(id){
	return document.getElementById(id);
}
var tetris={
	CELL_SIZE:26,//每个格子的固定宽高。
	RN:20,
	CN:10,
	OFFSET:15,//游戏两边和上边需要修正的距离。
	shape:null,
	nextShape:null,

	NEXTTOP:1,//备用图形输出的top
	NEXTLEFT:10,//备用图形输出的left
	
	INTERVAL:1000,
	timer:null,
	wall:[],

	lines:0,
	score:0,
	SCORE:[0,10,50,80,200],
	level:1,

	state:1,//保存游戏的状态
	RUNNING:1,
	PAUSE:2,
	GAMEOVER:0,
	
	linesInc:5,//每5行升一级
	intervalDec:100,//每一级减100毫秒；

	start:function(){//游戏开始
		this.state=this.RUNNING;
		this.INTERVAL=1000;
		this.lines=0;
		this.score=0;
		this.level=1;
		
		for(var r=0;r<this.RN;r++){
			this.wall[r]=new Array(this.CN);
		}
		this.shape=this.randomShape();
		this.nextShape=this.randomShape();
		this.paint();
		this.timer=setInterval(
			this.moveDown.bind(this),
			this.INTERVAL
		);
		document.onkeydown=function(e){
			e=window.event||e;
			switch(e.keyCode){
				case 37:
					this.state==this.RUNNING&&
								this.moveLeft();break;
				case 38:
					this.state==this.RUNNING&&
								this.rotateR();break;
				case 39:
					this.state==this.RUNNING&&
								this.moveRight();break;
				case 40:
					this.state==this.RUNNING&&
								this.moveDown();break;
				case 90:
					this.state==this.RUNNING&&
								this.rotateL();break;
				case 80:
					this.state==this.RUNNING&&
								this.pause();break;//暂停
				case 81:
					this.state!=this.GAMEOVER&&
								this.gameOver();break;//结束
				case 67:
					this.state==this.PAUSE&&
								this.myContinue();break;
				case 83:
					this.state==this.GAMEOVER&&
								this.start();break;
			}
		}.bind(this);
	},
	
	paintState:function(){
		if(this.state!=this.RUNNING){
			var img=new Image();
			img.src=this.state==this.PAUSE?"img/pause.png":"img/game-over.png";
			$("pg").appendChild(img);
		}
	},
	pause:function(){
		this.state=this.PAUSE;
		clearInterval(this.timer);
		this.paint();
	},
	gameOver:function(){
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		this.paint();
	},
	myContinue:function(){
		this.state=this.RUNNING;
		this.timer=setInterval(
			this.moveDown.bind(this),this.INTERVAL	
		);
		this.paint();
	},
	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r>this.RN-1||cell.c<0||cell.c>this.CN-1){
				return false;
			}else if(cell.r<this.RN&&this.wall[cell.r][cell.c]){
				return false;
			}
		}
		return true;
		//遍历当前shape中每个格
		//	将当前格保存在cell中
		//	如果wall中和当前cell相同位置有格
		//		返回false
		//	否则 如果cell.r>RN-1或cell.c<0或cell.c>CN-1
		//		返回false
		//(遍历结束)返回true
	},

	rotateR:function(){//右旋转
		this.shape.rotateR();//this>shape
		if(!this.canRotate()){
			this.shape.rotateL();
		}
		this.paint();
	},

	rotateL:function(){//左旋转
		this.shape.rotateL();//this>shape
		if(!this.canRotate()){
			this.shape.rotateR();
		}
		this.paint();
	},

	moveLeft:function(){//左移一列
		if(this.canLeft()){
			this.shape.moveLeft();
			this.paint();
		}
	},
	
	canLeft:function(){//判断能否左移
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==0||this.wall[cell.r][cell.c-1]){
				return false;
			}
		}
		return true;
	},

	moveRight:function(){//右移一列
		if(this.canRight()){
			this.shape.moveRight();
			this.paint();
		}
	},

	canRight:function(){//判断能否右移
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==this.CN-1||this.wall[cell.r][cell.c+1]){
				return false;
			}
		}
		return true;
	},
	
	randomShape:function(){//随机选择下一个图形
		var randomNum=parseInt(Math.random()*7);
		switch(randomNum){
			case 0:return new I();
			case 1:return new J();
			case 2:return new L();
			case 3:return new O();
			case 4:return new S();
			case 5:return new T();
			case 6:return new Z();
		}
		//return new T();
	},

	paint:function(){//生成一切
		$("pg").innerHTML=$("pg").innerHTML.replace(/<img(.*?)>/g,"");
		this.paintShape();
		this.paintNext();
		this.paintWall();
		this.paintScore();
		this.paintState();
	},

	paintShape:function(){//生成图形
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			var img=document.createElement("img");
			img.style.top=this.OFFSET+cell.r*this.CELL_SIZE+"px";
			img.style.left=this.OFFSET+cell.c*this.CELL_SIZE+"px";
			img.src=cell.img;
			frag.appendChild(img);
		}
		$("pg").appendChild(frag);
	},

	paintNext:function(){//绘制备用图形
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			var img=document.createElement("img");
			img.style.top=this.OFFSET+(cell.r+this.NEXTTOP)*this.CELL_SIZE+"px";
			img.style.left=this.OFFSET+(cell.c+this.NEXTLEFT)*this.CELL_SIZE+"px";
			img.src=cell.img;
			frag.appendChild(img);
		}
		$("pg").appendChild(frag);
	},
	
	paintWall:function(){//绘制墙
		//创建文档片段frag
		var frag=document.createDocumentFragment();
		//遍历wall中所有格(二维数组)
		for(var r=0;r<this.wall.length;r++){
			for(var c=0;c<this.wall[r].length;c++){
		//	先将当前格存在变量cell中
				var cell=this.wall[r][c];
		//	如果cell有效
				if(cell){
		//		绘制每个cell的方法同绘制shape的方法
				var img=document.createElement("img");
				img.style.top=this.OFFSET+cell.r*this.CELL_SIZE+"px";
				img.style.left=this.OFFSET+cell.c*this.CELL_SIZE+"px";
				img.src=cell.img;
				frag.appendChild(img);
				}
			}
			$("pg").appendChild(frag);
		}	
	},

	moveDown:function(){//下落
		if(this.canDown()){
			this.shape.moveDown();
			this.paint();
		}else{
			this.landIntoWall();//一旦不能下落，放入墙中相同位置。
			
			var ls=this.deleteRows();
			this.lines+=ls;
			this.score+=this.SCORE[ls];
			
			this.levelInc();
			
			if(!this.isGameOver()){
				//备胎转正
				this.shape=this.nextShape;
				//生成新备胎
				this.nextShape=this.randomShape();
				this.paint();
			}else{
				this.gameOver();
			}
		}
		
	},
	levelInc:function(){
		if(parseInt(this.lines/this.linesInc)>this.level-1){
			this.level++;
			this.INTERVAL-=this.intervalDec;
			clearInterval(this.timer);
			this.timer=setInterval(
				this.moveDown.bind(this),this.INTERVAL	
			);
		}
	},

	isGameOver:function(){//判断游戏是否结束
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]){
				return true;
			}
		}
		return false;
	},

	paintScore:function(){//更新战绩
		$("score").innerHTML=this.score;
		$("lines").innerHTML=this.lines;
		$("level").innerHTML=this.level;
	},

	deleteRows:function(){//删除行
		for(var r=this.RN-1,ls=0;r>0;r--){
			if(this.isFullRow(r)){
				this.deleteRow(r);
				ls++;
				r++;
				//r留在原地
				if(ls==4){break;}
			}
		}
		return ls;
	},
	
	isFullRow:function(r){//是否满行
		return String(this.wall[r]).search(/^,|,,|,$/)==-1?true:false;
	},

	deleteRow:function(currR){//
		for(var r=currR;r>0;r--){
			this.wall[r]=this.wall[r-1];
			this.wall[r-1]=new Array(this.CN);
			for(var i=0;i<this.CN;i++){
				if(this.wall[r][i]){
					this.wall[r][i].r++;
				}
			}
			if(this.wall[r-2].join("")==""){break;}
		}
	},

	landIntoWall:function(){//放入墙中
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.wall[cell.r][cell.c]=cell;
		}
	},

	canDown:function(){//判断是否可以下落
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]){
				return false;
			}
		}
		return true;
	}
}
window.onload=function(){
	tetris.start();
	tetris.pause();
}