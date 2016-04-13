function Cell(r,c,img){
	this.r=r;
	this.c=c;
	this.img=img;
}

function Shape(cells,states,orgi){
	this.cells=cells;//保存图形对象中所有格子对象
	this.states=states;//保存图形的不同状态
	this.orgi=orgi;//保存当前图形参照的下标
	this.statei=0;//保存当前状态的下标，默认为状态0
} 

Shape.prototype.IMGS={
	I:"img/I.png",
	O:"img/O.png",
	T:"img/T.png",
	J:"img/J.png",
	L:"img/L.png",
	S:"img/S.png",
	Z:"img/Z.png"
}

Shape.prototype.moveDown=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].r+=1;
	}
}
Shape.prototype.moveLeft=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c-=1;
	}
}
Shape.prototype.moveRight=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c+=1;
	}
}
Shape.prototype.rotateR=function(){
	//将shape的statei+1
	this.statei=this.statei+1;
	//如果statei大于shape的states的长度-1，就让statei回0
	if(this.statei>this.states.length-1){
		this.statei=0;
	}
	this.rotate();
}
Shape.prototype.rotateL=function(){
	//将shape的statei-1
	this.statei=this.statei-1;
	//如果statei小于0，就让statei回shape的states的长度-1
	if(this.statei<0){
		this.statei=this.states.length-1;
	}
	this.rotate();
}
Shape.prototype.rotate=function(){
	//获得参照格对象: cells[orgi],保存在cell中
	var cell=this.cells[this.orgi];
	//						        cell:{r:?, c:?}
	//获得新状态对象: states[statei],保存在state中
	var state=this.states[this.statei];
	//	state:{r0:?,c0:?, r1:?,c1:?, ...}
	//遍历cells中所有格对象
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].r=cell.r+state["r"+i];
		this.cells[i].c=cell.c+state["c"+i];
	}
	//	当前格的r=cell.r+state["r"+i]
	//  当前格的c=cell.c+state["c"+i]
}


function State(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0=r0;
	this.c0=c0;

	this.r1=r1;
	this.c1=c1;

	this.r2=r2;
	this.c2=c2;

	this.r3=r3;
	this.c3=c3;
}

//创建据图图像类型
function T(){//专门描述T型图像的结构
	Shape.call(this,[
		new Cell(0,3,this.IMGS.T),
		new Cell(0,4,this.IMGS.T),	
		new Cell(0,5,this.IMGS.T),	
		new Cell(1,4,this.IMGS.T),	
	],[
		new State(0,-1, 0,0, 0,+1, +1,0),
		new State(-1,0, 0,0, +1,0, 0,-1),	
		new State(0,+1, 0,0, 0,-1, -1,0),	
		new State(+1,0, 0,0, -1,0, 0,+1)	
	],1);
}
Object.setPrototypeOf(T.prototype,Shape.prototype);

function O(){//专门描述O型图像的结构
	Shape.call(this,[
		new Cell(0,4,this.IMGS.O),
		new Cell(0,5,this.IMGS.O),	
		new Cell(1,4,this.IMGS.O),	
		new Cell(1,5,this.IMGS.O),	
	],[
		new State(0,0, 0,+1, +1,0, +1,+1)	
	],0);
}
Object.setPrototypeOf(O.prototype,Shape.prototype);

function I(){//专门描述I型图像的结构
	Shape.call(this,[
		new Cell(0,3,this.IMGS.I),
		new Cell(0,4,this.IMGS.I),	
		new Cell(0,5,this.IMGS.I),	
		new Cell(0,6,this.IMGS.I),	
	],[
		new State(0,-1, 0,0, 0,+1, 0,+2),
		new State(-1,0, 0,0, +1,0, +2,0),	
	],1);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);

function J(){//专门描述J型图像的结构
	Shape.call(this,[
		new Cell(0,5,this.IMGS.J),
		new Cell(1,5,this.IMGS.J),	
		new Cell(2,5,this.IMGS.J),	
		new Cell(2,4,this.IMGS.J),	
	],[
		new State(-2,0, -1,0, 0,0, 0,-1),
		new State(0,+2, 0,+1, 0,0, -1,0),	
		new State(+2,0, +1,0, 0,0, 0,+1),	
		new State(0,-2, 0,-1, 0,0, +1,0)	
	],2);
}
Object.setPrototypeOf(J.prototype,Shape.prototype);

function L(){//专门描述I型图像的结构
	Shape.call(this,[
		new Cell(0,4,this.IMGS.L),
		new Cell(1,4,this.IMGS.L),	
		new Cell(2,4,this.IMGS.L),	
		new Cell(2,5,this.IMGS.L),	
	],[
		new State(-2,0, -1,0, 0,0, 0,+1),
		new State(0,+2, 0,+1, 0,0, +1,0),	
		new State(+2,0, +1,0, 0,0, 0,-1),	
		new State(0,-2, 0,-1, 0,0, -1,0)	
	],2);
}
Object.setPrototypeOf(L.prototype,Shape.prototype);

function Z(){//专门描述I型图像的结构
	Shape.call(this,[
		new Cell(0,4,this.IMGS.Z),
		new Cell(0,5,this.IMGS.Z),	
		new Cell(1,5,this.IMGS.Z),	
		new Cell(1,6,this.IMGS.Z),	
	],[	
		new State(0,-1, 0,0, +1,0, +1,+1),	
		new State(-1,0, 0,0, 0,-1, +1,-1),
		new State(0,+1, 0,0, -1,0, -1,-1),	
		new State(+1,0, 0,0, 0,+1, -1,+1)
	],1);
}
Object.setPrototypeOf(Z.prototype,Shape.prototype);

function S(){//专门描述I型图像的结构
	Shape.call(this,[
		new Cell(0,5,this.IMGS.S),
		new Cell(0,6,this.IMGS.S),	
		new Cell(1,4,this.IMGS.S),	
		new Cell(1,5,this.IMGS.S),	
	],[	
		new State(0,0, 0,+1, +1,-1, +1,0),	
		new State(0,0, +1,0, -1,-1, 0,-1),
		new State(0,0, 0,-1, -1,+1, -1,0),	
		new State(0,0, -1,0, +1,+1, 0,+1)
	],0);
}
Object.setPrototypeOf(S.prototype,Shape.prototype);
