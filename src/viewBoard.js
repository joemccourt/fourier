"use strict";

FSG.drawBoardGame = function(){
	FSG.drawBoardBackground();
	FSG.drawBoardLevels();

	if(!FSG.noBorder){
		FSG.drawBoardBorder();
	}
};

FSG.setBoardTransform = function(ctx){

	//TODO: make this work for scaling
	var w  = FSG.getRenderBoxWidth();
	var h  = FSG.getRenderBoxHeight();
	var x1 = FSG.renderBox[0];
	var y1 = FSG.renderBox[1];

	var trans = FSG.drawBoardGameTransform;

	var offX = w*trans[3];
	var offY = h*trans[7];

	var scaleX = trans[0];
	var scaleY = trans[5];

	ctx.transform(1,0,0,1,offX,offY);
};

FSG.drawBoardBackground = function(){
	var gameBox = FSG.drawBoardGameBox;
	var ctx = FSG.ctx;

	ctx.clearRect(0,0,FSG.canvas.width,FSG.canvas.height);

	ctx.save();
	FSG.setBoardTransform(ctx);

	var w  = FSG.getRenderBoxWidth();
	var h  = FSG.getRenderBoxHeight();
	var trans = FSG.drawBoardGameTransform;

	var offX = w*trans[3];
	var offY = h*trans[7];
		
	var paraX = -0.25;
	var paraY = -0.25;

	var boardWidth  = w*(gameBox[2]-gameBox[0]);
	var boardHeight = h*(gameBox[3]-gameBox[1]);
	var boardStartX = FSG.renderBox[0]+gameBox[0]*w;
	var boardStartY = FSG.renderBox[1]+gameBox[1]*h;

	//Rather hacky, but it works :/
	var drawOffX = w * 0; //TODO: perfect
	var drawOffY = h * 0; //TODO: perfect

	if(!FSG.boardGameCanvas || FSG.dirtyBoardGameBackground){
		FSG.dirtyBoardGameBackground = false
		FSG.boardGameCanvas = document.createElement('canvas');
		FSG.boardGameCanvas.width  = boardWidth;
		FSG.boardGameCanvas.height = boardHeight;

		FSG.bgTriGrid(FSG.boardGameCanvas,FSG.colorSets['pastels'],15,0.5,40);
	}

	ctx.drawImage(FSG.boardGameCanvas,boardStartX+offX*paraX-drawOffX,boardStartY+offY*paraY-drawOffY);
	ctx.restore();
};

FSG.drawBoardLevels = function(){
	var ctx = FSG.ctx;
	ctx.save();
	FSG.setBoardTransform(ctx);

	var w  = FSG.getRenderBoxWidth();
	var h  = FSG.getRenderBoxHeight();
	var x1 = FSG.renderBox[0];
	var y1 = FSG.renderBox[1];

	// *** Draw Levels *** //
	var r = FSG.boardLevelRadius * (w+h)/2;
	var coords = FSG.levelCoords;

	ctx.beginPath();
	for(var i = 0; i < coords.length; i++){
			var i1x = x1+coords[i][0]*w;
			var i1y = y1+coords[i][1]*h;

		if(i == 0){
			var i2x = x1+coords[i+1][0]*w;
			var i2y = y1+coords[i+1][1]*h;
			ctx.moveTo(i1x,i1y);
			ctx.lineTo((i1x+i2x)/2,(i1y+i2y)/2);
		}else if(i == coords.length-1){
			var i0x = x1+coords[i-1][0]*w;
			var i0y = y1+coords[i-1][1]*h;
			ctx.moveTo((i0x+i1x)/2,(i0y+i1y)/2);
			ctx.lineTo(i1x,i1y);
		}else{
			var i2x = x1+coords[i+1][0]*w;
			var i2y = y1+coords[i+1][1]*h;
			var i0x = x1+coords[i-1][0]*w;
			var i0y = y1+coords[i-1][1]*h;

			ctx.quadraticCurveTo(i1x,i1y,(i1x+i2x)/2,(i1y+i2y)/2);
		}
	}
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 3;
	ctx.stroke();

	ctx.closePath();

	for(var i = 0; i < coords.length; i++){
		var stars = 0;//FSG.userStats['level'+i];

		var x = x1+coords[i][0]*w;
		var y = y1+coords[i][1]*h;
	
		for(var k = 0; k <= 1; k++){
			var color;

			if(FSG.canPlayLevel(i)) {
				color = {r:0x44,g:0xEE,b:0x88};
			}else{
				color = {r:0x88,g:0x88,b:0x88};
			}
			
			if(k == 1){
				color = {r:0,g:0,b:0};
			}
			// create radial gradient
			var grd = ctx.createRadialGradient(x-r*0.1,y-r*0.3,r*0.1,x,y,r);

			var colorShine  = {r:color.r,g:color.g,b:color.b};
			var colorShadow = {r:color.r,g:color.g,b:color.b};
			colorShine.r += 20;
			colorShine.g += 20;
			colorShine.b += 20;

			if(colorShine.r > 255){colorShine.r = 255;}
			if(colorShine.g > 255){colorShine.g = 255;}
			if(colorShine.b > 255){colorShine.b = 255;}

			colorShadow.r = colorShadow.r * 0.5 | 0;
			colorShadow.g = colorShadow.g * 0.5 | 0;
			colorShadow.b = colorShadow.b * 0.5 | 0;

			if(colorShadow.r < 0){colorShadow.r = 0;}
			if(colorShadow.g < 0){colorShadow.g = 0;}
			if(colorShadow.b < 0){colorShadow.b = 0;}

			grd.addColorStop(0, FSG.colorToStr(colorShine)); // center
			grd.addColorStop(0.9, FSG.colorToStr(color));
			grd.addColorStop(1, FSG.colorToStr(colorShadow));

			ctx.fillStyle = grd;

			if(k == 0){
				ctx.beginPath();
				ctx.arc(x, y, r, 0, 2 * Math.PI, false);
				ctx.closePath();
				ctx.fill();
			}else{	
				ctx.font = "" + (r) + "px Lucida Console";
				
				ctx.lineWidth = 1;
				ctx.strokeStyle = 'rgba(255,255,255,0.3)';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(""+i,x,y);
				ctx.strokeText(""+i,x,y);
			}
		}
	}

    ctx.restore();
};

FSG.drawBoardBorder = function(){
	var ctx = FSG.ctx;
	ctx.save();

	ctx.clearRect(0,0,FSG.canvas.width,FSG.renderBox[1]-0.5);
	ctx.clearRect(0,0,FSG.renderBox[0]-0.5,FSG.canvas.height);
	ctx.clearRect(0,FSG.renderBox[3]+0.5,FSG.canvas.width,FSG.canvas.height);
	ctx.clearRect(FSG.renderBox[2]+0.5,0,FSG.canvas.width,FSG.canvas.height);
	
	//Box border
	ctx.beginPath();
	ctx.moveTo(FSG.renderBox[0]-0.5,FSG.renderBox[1]-0.5);
	ctx.lineTo(FSG.renderBox[0]-0.5,FSG.renderBox[3]+0.5);
	ctx.lineTo(FSG.renderBox[2]+0.5,FSG.renderBox[3]+0.5);
	ctx.lineTo(FSG.renderBox[2]+0.5,FSG.renderBox[1]-0.5);
	ctx.lineTo(FSG.renderBox[0]-0.5,FSG.renderBox[1]-0.5);
	ctx.closePath();
	ctx.strokeStyle = '000';
	ctx.lineWidth = 3;
	ctx.stroke();
	
	ctx.restore();
};